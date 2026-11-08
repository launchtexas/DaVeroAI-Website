import { FIELDS, validateField, type Field } from "@/lib/contact-rules";
import { EMAIL } from "@/lib/content";
import {
  checkFormToken,
  claimSubmission,
  contentHash,
  durableRateLimited,
  issueFormToken,
  looksLikeSpam,
  releaseSubmission,
  turnstileEnabled,
  verifyTurnstile,
} from "@/lib/contact-shield";
import { connection } from "next/server";

// POST /api/contact: validates a contact form entry and emails it via Resend's REST API.
// Spam layers, in order: honeypot, time trap (signed render-time token), per-IP rate limits (in memory, plus
// Upstash when configured), field validation, content rules, Cloudflare Turnstile (when configured), duplicates.
// Spam gets a fake 200 so bots learn nothing; only genuine validation problems get a 400 with field errors.
// Runs on the default Node.js runtime (Cache Components does not allow a `runtime` export).

const MAX_BYTES = 10 * 1024;
const LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;

// Best-effort per-IP limit. In memory, so it resets on restart and is per instance.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  // Hard cap so the map cannot grow without bound; drop the oldest entries (insertion order).
  while (hits.size > 10000) hits.delete(hits.keys().next().value!);
  return false;
}

// Reads the body but stops at MAX_BYTES, so a chunked upload without Content-Length is never fully buffered.
async function readCapped(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString("utf8");
}

const json = (body: object, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const fakeOk = () => json({ ok: true }, 200);

// GET /api/contact: a fresh form token. The form fetches it on load; the POST must carry it (field "t").
export async function GET() {
  await connection(); // request time, never prerendered
  return json({ token: issueFormToken() }, 200);
}

export async function POST(request: Request) {
  // Same-origin JSON only. A JSON content type forces a CORS preflight (which this route never approves),
  // so other sites cannot post enquiries through their visitors' browsers; Sec-Fetch-Site blocks the rest.
  if (request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "forbidden" }, 403);
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))
    return json({ error: "unsupported_media_type" }, 415);
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BYTES) return json({ error: "too_large" }, 413);
  const raw = await readCapped(request);
  if (raw === null) return json({ error: "too_large" }, 413);

  let input: Record<string, unknown>;
  try {
    input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Spam trap: bots fill the hidden "website" field. Report success, send nothing.
  if (typeof input.website === "string" && input.website.trim()) return fakeOk();
  // Time trap: no token, a forged one, under 3 seconds or over 2 hours old. Report success, send nothing.
  if (checkFormToken(input.t) === "spam") return fakeOk();

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip) || (await durableRateLimited(ip))) return json({ error: "rate_limited" }, 429);

  const data = {} as Record<Field, string>;
  const errors: Partial<Record<Field, string>> = {};
  for (const f of FIELDS) {
    const v = input[f] ?? "";
    data[f] = typeof v === "string" ? v.trim() : "";
    const err = typeof v === "string" ? validateField(f, v) : "Invalid value.";
    if (err) errors[f] = err;
  }
  if (Object.keys(errors).length) return json({ error: "invalid", fields: errors }, 400);
  // HTML tags, BBCode or a message that is mostly links.
  if (looksLikeSpam(data)) return fakeOk();
  if (turnstileEnabled() && !(await verifyTurnstile(input.turnstileToken, ip))) return json({ error: "challenge_failed" }, 403);

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("contact: RESEND_API_KEY is not set");
    return json({ error: "unavailable" }, 503);
  }

  // Same email and message within 10 minutes: already sent, so report success again and send nothing.
  const hash = contentHash(data.email, data.message);
  if (!(await claimSubmission(hash))) return fakeOk();

  const text = [
    `Name: ${data.name}`,
    `Work email: ${data.email}`,
    `Company: ${data.company}`,
    `Platform: ${data.platform || "-"}`,
    `Domain: ${data.domain || "-"}`,
    "",
    "Which workflow do you want finished?",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "DaVero AI Website <website@daveroai.com>",
        to: [process.env.CONTACT_TO || EMAIL],
        reply_to: data.email,
        subject: `Website enquiry from ${data.name}, ${data.company}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error(`contact: Resend responded ${res.status}`);
      await releaseSubmission(hash);
      return json({ error: "send_failed" }, 502);
    }
  } catch (e) {
    console.error(`contact: Resend request failed (${e instanceof Error ? e.name : "error"})`);
    await releaseSubmission(hash);
    return json({ error: "send_failed" }, 502);
  }
  return json({ ok: true }, 200);
}
