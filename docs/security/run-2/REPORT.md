# DaVero AI website: security audit (run-2)

**Date:** 2026-11-08 · **Baseline:** `d60262d` (main, clean) · **Fix:** `c44422d` · **Profile:** quick (focus on everything changed since run-1 at `7836299`, then a whole-app recheck; one hunting pass plus one independent verifier and coverage critic) · **Method:** source review plus local checks against `next start` with a dummy Resend key and a mocked `fetch`. No real email was sent, no live endpoint was probed, and no Vercel, Upstash or Cloudflare API was called.

## Result

No critical, high or medium issues. One low-severity issue was confirmed and fixed. One item still depends on production settings (owner action). Four candidates were rejected. Every run-1 fix still holds.

| # | Finding | Verdict / severity | Fix |
|---|---|---|---|
| 1 | IPv6 senders could rotate addresses inside their /64 to skip both contact rate limits | confirmed · low | `c44422d` |
| 2 | Total email volume still depends on production settings (Upstash, Turnstile, Vercel Firewall) | needs validation · **owner action** | see NEEDS-VALIDATION.md |
| 3 | Form token can be reused for 2 hours | rejected: fresh tokens are free from `GET /api/contact` | none needed |
| 4 | Timing attack on the token signature compare | rejected: `timingSafeEqual`, only the public fixed length is checked first | none needed |
| 5 | Tokens are unsigned when `FORM_SECRET` is unset | rejected as a vulnerability (signing only spares a bot one GET); still set it | owner action |
| 6 | Turnstile check ignores the hostname in Cloudflare's reply | rejected: defense in depth only | none needed |

Also checked with no issue: Upstash calls (commands sent as a JSON array, so request data cannot change them; 2 s timeout; errors log only a status), duplicate hashing (10-minute TTL, released when a send fails, matches the privacy page), Turnstile flow (fails closed, verified after the rate limit), error output (generic codes; 503 without `RESEND_API_KEY`), CSP (`challenges.cloudflare.com` allowed for scripts and frames only), `security.txt` (valid, `text/plain`), legal pages, brand changes and the ecosystem component (no raw HTML, no data-driven links or handlers), secrets in git history (none), Vercel config in the repo (none beyond `next.config.ts`).

## What changed

- **Rate-limit key** (`lib/contact-shield.ts` `rateLimitKey`, used in `app/api/contact/route.ts`): IPv6 addresses are limited by their /64 prefix, IPv4 and IPv4-mapped IPv6 per address. Applies to both the in-memory limit and the Upstash limits. Turnstile still gets the full address.

## Run-1 fixes re-verified

| Run-1 fix | Check | Result |
|---|---|---|
| Cross-site POST (`ca03825`) | `text/plain` POST; `Sec-Fetch-Site: cross-site` | 415; 403 |
| Unbounded body (`ca03825`) | 2 MB chunked body, no Content-Length | 413 |
| Browser headers (`d38a31e`) | headers on `/`; `X-Powered-By` | all present (CSP now also allows Turnstile); absent |
| Form GET before hydration (`bcac652`) | `method="post"` on the form | present |
| Control characters, single email (`9c909d3`) | validation in `lib/contact-rules.ts` | unchanged |

## npm audit

| | Total | Low | Moderate | High/Critical |
|---|---|---|---|---|
| Before (d60262d) | 3 | 3 | 0 | 0 |
| After (c44422d) | 3 | 3 | 0 | 0 |
| Runtime only (`--omit=dev`) | 0 | 0 | 0 | 0 |

The 3 are one advisory: deepmerge GHSA-gcqx-w48m-w2h4, pulled in only by the `shadcn` CLI (dev). No patched release exists. GitHub Dependabot shows the same: 1 open low (deepmerge, development); the minimatch alert is fixed.

## Regression checks (after the fix)

- `npm run lint`, `tsc --noEmit`, `npm run build`: pass.
- All 14 pages return 200, unknown route 404; no console errors or CSP violations in Chrome on any page.
- Contact form in the browser: empty submit shows field errors; a valid submit reaches "sent" (mocked Resend). API returns 503 without `RESEND_API_KEY`.
- Spam shield as documented: forged, unsigned and too-fast tokens get a silent 200 and send nothing; a link in the name gets 400; a duplicate gets a silent 200 with no second email; IPv4 6th send 429; IPv6 6th send from the same /64 now 429, another /64 still allowed.
- axe: Home and /contact 0 violations (after scroll-in animations settle). Lighthouse Home mobile 95 / 100 / 100 / 100.

## Owner actions

1. **Production settings** in Vercel: set `FORM_SECRET` (`openssl rand -base64 32`), both Turnstile keys and both Upstash keys; add the Vercel Firewall rule in `docs/security/vercel-firewall.md`. Turnstile is the control that actually caps automated sending. After a test enquiry, check the logs show no `contact: Upstash request failed`.
2. Renew `public/.well-known/security.txt` before its Expires date (2027-11-08).
3. Re-run `npm audit` when deepmerge or shadcn ships a fix.
4. Run-1 items still open: optional HSTS `includeSubDomains; preload`; add `https://vercel.live` to the CSP if the team uses preview comments.

## Coverage

Prior run: run-1 (`docs/security/`, profile quick). Its ledger and findings were read; units whose source changed were re-checked rather than carried. Fourteen units in `coverage-ledger.json` cover the spam shield (token, rate limits, Turnstile, Upstash, duplicates, responses), run-1 fixes, headers and CSP, client-side code, `security.txt`, secrets, dependencies and in-repo deployment config. This is a quick, partial pass and does not prove the site has no other issues. Out of scope: Vercel dashboard settings, DNS, and the Resend, Upstash, Cloudflare and GitHub account settings.

Files: `findings.json` and `coverage-ledger.json` (both validated), `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md`, `architecture.md`, `run-metadata.json`, local scripts and npm audit output in `agents/parent/artifacts/`.
