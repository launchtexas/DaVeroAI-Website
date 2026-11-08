# Needs validation (run-1)

These depend on facts outside the repository. They carry no severity. Do not test them by sending real email or probing the live site.

## contact-rate-limit-per-instance: rate limit is per server instance

- **Where:** `app/api/contact/route.ts:12` (in-memory `Map`), checked at line 45.
- **Why it matters:** each Vercel instance and each cold start has its own counter, so the 5-per-10-minutes limit does not cap total email volume. A determined sender could flood ask@daveroai.com or use up the Resend quota.
- **Blocked on:** the number of instances and any Vercel Firewall rules are deployment settings, not in the repo.
- **Owner action (recommended):** in Vercel → Project → Firewall, add a rate-limit rule for `POST /api/contact` (for example 5 requests per 10 minutes per IP, action Deny or Challenge). Optionally enable BotID. The in-app limit then stays as a second layer.

## contact-subject-control-chars: CR/LF reached the email subject

- **Where:** `lib/contact-rules.ts` (validation) and `app/api/contact/route.ts:82` (subject).
- **Status:** fixed in source (commit 9c909d3): control characters are rejected with 400 before any email is built. What Resend would have done with CR/LF in a subject was not tested (that needs a real send) and no longer matters after the fix.
