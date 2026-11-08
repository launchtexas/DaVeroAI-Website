export type ContactData = {
  name: string;
  email: string;
  company: string;
  platform: string;
  domain: string;
  message: string;
};

// The only place that delivers a contact message: POSTs it to /api/contact, which emails it via Resend.
// Throws on any non-2xx response so the form shows its failure state.
// `t` is the form token from GET /api/contact; `turnstileToken` is sent only when Turnstile is on.
export async function submitContact(data: ContactData, extra: { t: string; turnstileToken?: string }): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ...extra }),
  });
  if (!res.ok) throw new Error(`Contact request failed (${res.status})`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Form token for the server's time trap: tokens under 3 s or over 2 h old are dropped as spam.
let cached: { token: string; at: number } | null = null;
async function fetchToken() {
  const res = await fetch("/api/contact", { cache: "no-store" });
  if (!res.ok) throw new Error(`Token request failed (${res.status})`);
  const { token } = (await res.json()) as { token: string };
  cached = { token, at: Date.now() };
}
// Called when the form mounts, so the token is usually old enough by the time someone submits.
export function prefetchFormToken() {
  if (!cached) fetchToken().catch(() => {});
}
// Returns a token the server will accept: refreshes one near the 2 h limit and waits out the 3 s minimum.
export async function getFormToken(): Promise<string> {
  if (!cached || Date.now() - cached.at > 110 * 60 * 1000) await fetchToken();
  const wait = 3_500 - (Date.now() - cached!.at);
  if (wait > 0) await sleep(wait);
  return cached!.token;
}
