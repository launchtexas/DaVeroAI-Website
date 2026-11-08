import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { countUrls, URL_RE } from "./contact-rules";

// Server-only anti-spam checks for /api/contact. Every check here is cheap and needs no npm dependency.

// ---------- Time trap: a signed "form rendered at" token ----------
export const MIN_AGE_MS = 3_000;
export const MAX_AGE_MS = 2 * 60 * 60 * 1000;

const secret = () => process.env.FORM_SECRET || "";
const sign = (ts: string, key: string) => createHmac("sha256", key).update(`contact:${ts}`).digest("base64url");

// Token is "<ms timestamp>.<HMAC>" with FORM_SECRET, or "<ms timestamp>" when FORM_SECRET is not set (dev).
export function issueFormToken(now = Date.now()): string {
  const ts = String(now);
  const key = secret();
  return key ? `${ts}.${sign(ts, key)}` : ts;
}

let warned = false;
// "ok" | "spam": a missing, forged, too fast or expired token is spam (silent 200).
export function checkFormToken(token: unknown, now = Date.now()): "ok" | "spam" {
  if (typeof token !== "string" || token.length > 100) return "spam";
  const [ts, sig] = token.split(".");
  if (!/^\d{13}$/.test(ts)) return "spam";
  const key = secret();
  if (key) {
    if (!sig) return "spam";
    const want = Buffer.from(sign(ts, key));
    const got = Buffer.from(sig);
    if (want.length !== got.length || !timingSafeEqual(want, got)) return "spam";
  } else if (process.env.NODE_ENV === "production" && !warned) {
    warned = true;
    console.warn("contact: FORM_SECRET is not set; form tokens are unsigned");
  }
  const age = now - Number(ts);
  return age < MIN_AGE_MS || age > MAX_AGE_MS ? "spam" : "ok";
}

// ---------- Content rules that only spam breaks (silent 200) ----------
const HTML_RE = /<\/?[a-z][a-z0-9-]*(?:\s[^>]*)?\/?>|<!--/i;
const BBCODE_RE = /\[\/?(?:url|link|img|b|i|u|s|quote|code|color|size|font|center|email)(?:=[^\]]*)?\]/i;

export function looksLikeSpam(d: { name: string; company: string; message: string }): boolean {
  for (const v of [d.name, d.company, d.message]) if (HTML_RE.test(v) || BBCODE_RE.test(v)) return true;
  // Mostly links: what remains after removing the links is under 20 characters, or links are over half the text.
  if (countUrls(d.message) > 0) {
    const text = d.message.replace(/\s+/g, "");
    const rest = d.message.replace(URL_RE, "").replace(/\s+/g, "");
    if (rest.length < 20 || rest.length < text.length / 2) return true;
  }
  return false;
}

export const contentHash = (email: string, message: string) =>
  createHash("sha256").update(`${email.toLowerCase()}\n${message.replace(/\s+/g, " ").trim().toLowerCase()}`).digest("hex");

// ---------- Optional durable store: Upstash Redis REST API (fetch, no SDK) ----------
function upstash() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

// Runs Redis commands in one round trip. Returns null if Upstash is not configured or fails (fail open:
// the in-memory limits still apply).
async function pipeline(commands: (string | number)[][]): Promise<unknown[] | null> {
  const cfg = upstash();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(2_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(String(res.status));
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    if (!Array.isArray(out) || out.some((r) => r.error)) throw new Error("command error");
    return out.map((r) => r.result);
  } catch (e) {
    console.error(`contact: Upstash request failed (${e instanceof Error ? e.message : "error"})`);
    return null;
  }
}

// Fixed windows: 5 per IP per 10 minutes and 20 per IP per day, shared by every server instance.
const DURABLE_WINDOWS = [
  { name: "10m", ms: 10 * 60 * 1000, limit: 5 },
  { name: "1d", ms: 24 * 60 * 60 * 1000, limit: 20 },
];
export async function durableRateLimited(ip: string, now = Date.now()): Promise<boolean> {
  if (!upstash()) return false;
  const keys = DURABLE_WINDOWS.map((w) => `contact:rl:${w.name}:${Math.floor(now / w.ms)}:${ip}`);
  const cmds = DURABLE_WINDOWS.flatMap((w, i) => [
    ["INCR", keys[i]],
    ["PEXPIRE", keys[i], w.ms, "NX"],
  ]);
  const out = await pipeline(cmds);
  if (!out) return false;
  return DURABLE_WINDOWS.some((w, i) => Number(out[i * 2]) > w.limit);
}

// ---------- Duplicate submissions (same email + message within 10 minutes) ----------
const DUP_MS = 10 * 60 * 1000;
const seen = new Map<string, number>();

// Claims the hash. Returns false if it was already claimed in the last 10 minutes (a duplicate).
export async function claimSubmission(hash: string, now = Date.now()): Promise<boolean> {
  for (const [k, t] of seen) if (now - t >= DUP_MS) seen.delete(k);
  else break; // insertion order = time order
  if (seen.has(hash)) return false;
  const out = await pipeline([["SET", `contact:dup:${hash}`, "1", "PX", DUP_MS, "NX"]]);
  if (out && out[0] === null) return false;
  seen.set(hash, now);
  while (seen.size > 10000) seen.delete(seen.keys().next().value!);
  return true;
}

// Frees the hash when the email did not go out, so the person can retry.
export async function releaseSubmission(hash: string): Promise<void> {
  seen.delete(hash);
  await pipeline([["DEL", `contact:dup:${hash}`]]);
}

// ---------- Cloudflare Turnstile (only when both keys are set) ----------
export const turnstileEnabled = () => Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5_000),
      cache: "no-store",
    });
    const out = (await res.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!out.success) console.warn(`contact: Turnstile rejected (${(out["error-codes"] ?? []).join(",")})`);
    return out.success === true;
  } catch (e) {
    console.error(`contact: Turnstile verify failed (${e instanceof Error ? e.name : "error"})`);
    return false;
  }
}
