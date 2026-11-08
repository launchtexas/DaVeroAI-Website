# Architecture and trust boundaries (run-1)

- **Product:** DaVero AI marketing site. Next.js 16.4.5 App Router, React 19.3, Tailwind v4, `cacheComponents` + `partialPrefetching`. Deployed on Vercel (Node.js runtime, Fluid Compute).
- **Pages:** 11 static, prerendered routes under `app/` plus icons, manifest and OG images. No auth, no database, no user accounts, no cookies, no third-party scripts. Fonts are self-hosted.
- **Only server entry point:** `POST /api/contact` (`app/api/contact/route.ts`). It validates fields with `lib/contact-rules.ts` (shared with the client form), applies an in-memory per-IP limit and sends a plain-text email through Resend's REST API with `RESEND_API_KEY`. Returns 503 without a key.
- **Principals:** anonymous visitors (lower trust), third-party websites (via visitors' browsers), the site owner (receives the email), Resend (third-party mail service).
- **Secrets:** `RESEND_API_KEY`, optional `CONTACT_TO`/`CONTACT_FROM`, all from Vercel environment variables. `.env*` and `.vercel` are git-ignored; only `.env.example` (empty key) is tracked.
- **Platform controls outside the repo:** Vercel overwrites `x-forwarded-for` (documented), adds TLS, and offers Firewall/WAF rate limits and BotID. None are configured in source.
