# Architecture (run-2)

Static marketing site on Next.js 16 (App Router, Cache Components, PPR), deployed on Vercel. 14 prerendered pages, no database, no login, no cookies.

**Only dynamic surface:** `app/api/contact/route.ts`.
- `GET` issues a time-trap token: `<ms timestamp>.<HMAC-SHA256(FORM_SECRET)>` (unsigned without the secret).
- `POST` (same-origin JSON, 10 KB cap) runs: honeypot → token check (3 s to 2 h) → per-IP limits (in memory; Upstash REST when configured; IPv6 per /64) → field validation (`lib/contact-rules.ts`) → content rules → Turnstile siteverify (when both keys set) → duplicate claim (SHA-256 of email+message, 10 min) → Resend `POST /emails` (plain text).
- Outbound calls are to fixed hosts only: `api.resend.com`, `challenges.cloudflare.com`, and the Upstash URL from the environment.

**Trust boundaries:** anonymous browser/bot → contact API; contact API → Resend, Cloudflare, Upstash (secrets in env vars); browser → third-party Turnstile script and iframe (CSP allows `challenges.cloudflare.com` for script and frame only).

**Client:** React components with static content; the ecosystem diagram and legal pages render only constants from `lib/content.ts` and page files. Headers set in `next.config.ts`.
