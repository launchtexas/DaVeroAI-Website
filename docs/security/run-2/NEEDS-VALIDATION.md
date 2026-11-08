# Needs validation (run-2)

These depend on facts outside the repository. They carry no severity. Do not test them by sending real email or probing the live site.

## contact-rate-limit-per-instance: total email volume depends on production settings (carried from run-1)

- **Where:** `app/api/contact/route.ts:28` (per-instance Map) and `:97` (limit check); `lib/contact-shield.ts:99` and `:116` (Upstash fails open).
- **Since run-1:** the code can now share limits across instances through Upstash and challenge each submission with Turnstile, and IPv6 is limited per /64 (`c44422d`). All of this is off unless the keys are set, and Upstash errors fall back to the per-instance limit.
- **Blocked on:** production environment variables and Vercel Firewall rules are not in the repository.
- **Owner action:** in Vercel set `FORM_SECRET`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` (redeploy after the public key), `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`; add the rule in `docs/security/vercel-firewall.md`. Then send one test enquiry and confirm the function logs show no `contact: Upstash request failed`.
