# Findings detail (run-2)

## contact-ratelimit-ipv6-rotation: IPv6 address rotation skipped the rate limits (confirmed, low, fixed in c44422d)

- **Who:** any unauthenticated sender with IPv6 and a /64 (normal for a home line or VPS).
- **Control defeated:** the per-IP limits on `POST /api/contact`: 5 per 10 minutes in memory, plus 5 per 10 minutes and 20 per day in Upstash when configured.
- **Root cause:** both limits were keyed on the full address (`app/api/contact/route.ts:95-97`, `lib/contact-shield.ts:110`). A /64 holds 2^64 addresses, so every request could come from a fresh one.
- **Result:** with Turnstile off (the default unless both keys are set), no cap on enquiry emails sent through Resend to the inbox. No data exposure.
- **Reproduction (local, no real email):** `agents/parent/artifacts/repro-run2.sh` against `next start` with `RESEND_API_KEY=re_dummy`, `FORM_SECRET=test-secret` and `mock-resend.mjs`. Before: six sends from `2001:db8:1:2::1..6` all 200, six mocked emails; the same from one IPv4 address got 429 on the 6th. After: 200 x5 then 429; `2001:db8:1:3::1` still 200.
- **Fix:** `rateLimitKey()` in `lib/contact-shield.ts` returns the /64 prefix for IPv6 and the address for IPv4 (including IPv4-mapped IPv6); the route uses it for both limits. Turnstile verification still receives the full address.
- **Severity:** likelihood medium (common setup, trivial rotation), impact low (spam and Resend quota) → low.
- **Verification:** reproduced before and after; independently confirmed from source by a second agent.

## Rejected

- **contact-token-replay:** a token works for 2 hours and many POSTs, but `GET /api/contact` gives anyone a fresh one, so reuse adds nothing. The time trap targets naive bots; volume is the rate limits' and Turnstile's job.
- **contact-token-signature-timing:** `lib/contact-shield.ts:31` compares with `crypto.timingSafeEqual`; the only early exit is the fixed, public 43-character length.
- **contact-token-unsigned-without-secret:** without `FORM_SECRET` a script can compute a token, but a signed one is free from GET, so no control is defeated. Set the secret anyway (owner action 1).
- **turnstile-hostname-not-checked:** Cloudflare issues tokens for the site key only on the owner's allowed hostnames and accepts each once; a hostname check would be defense in depth.
