# Findings detail

Generated from findings.json (run-1). Baseline 26427a8.

## Other websites could submit contact enquiries through visitors' browsers

- Fingerprint: `contact-cross-site-post`
- Verdict: **confirmed** · severity **low** (likelihood medium, impact low)

POST /api/contact read the body as text and parsed JSON without checking Content-Type or the request origin. A text/plain POST is a CORS simple request, so any site could make its visitors' browsers send enquiries, each from a different IP, which also sidesteps the per-IP limit.

**Trace**

- entrypoint: `app/api/contact/route.ts:28` (POST handler): Accepts any Content-Type.
- propagation: `app/api/contact/route.ts:30` (body read): request.text() then JSON.parse regardless of type.
- sink: `app/api/contact/route.ts:75` (Resend call): Email sent for the cross-site request.

**Reproduction (local only)**

- Attacker: Unauthenticated third-party website.
- Start next start locally with a dummy key and the mock-resend.mjs fetch mock.
- Send the POST with content-type text/plain and sec-fetch-site cross-site (see repro-contact.sh).
- Observe 200 and a mocked email at baseline; 415/403 after the fix.
- Result: Baseline: {"ok":true} and an email payload built. Fixed: 415 unsupported_media_type and 403 forbidden.

**Fix:** Reject Sec-Fetch-Site cross-site and require application/json (forces a CORS preflight that the route never approves). Commit ca03825.

## Submitting the contact form before JavaScript loads put personal details in the URL

- Fingerprint: `contact-form-get-before-hydration`
- Verdict: **confirmed** · severity **low** (likelihood low, impact low)

The contact form is prerendered and had no method attribute. A submit before hydration (slow network, JS blocked) made the browser GET /contact?name=...&email=...&company=...&message=..., exposing the visitor's details in browser history, Vercel request logs and the Referer of later requests. Found by the independent verifier.

**Trace**

- entrypoint: `components/site/contact-form.tsx:138` (form element): No method/action; default GET.

**Reproduction (local only)**

- Attacker: Anyone who can read URLs later (shared device history, log readers).
- Run nojs-submit.cjs (Playwright, javaScriptEnabled false) against a local build.
- Result: Fixed build: POST to /contact, URL stays /contact. Baseline default method is GET per HTML spec, putting fields in the query string.

**Fix:** Add method="post" to the form. Commit bcac652.

## Rate limit is per server instance, so total email volume depends on Vercel settings

- Fingerprint: `contact-rate-limit-per-instance`
- Verdict: **needs_validation**

The 5-per-10-minutes limit lives in an in-memory Map, so each Vercel instance and each cold start has its own counter. A determined sender can exceed it across instances and flood ask@daveroai.com or use up Resend quota.

**Trace**

- entrypoint: `app/api/contact/route.ts:45` (limit check): rateLimited(ip).
- sink: `app/api/contact/route.ts:12` (store): const hits = new Map() per instance.

**Blocked on:** Instance count and any Vercel Firewall/WAF rate-limit or BotID rules are deployment settings not in the repository.

**Plan:** Not reproducible meaningfully on one local process. Add a Vercel Firewall rate-limit rule on POST /api/contact (e.g. 5 per 10 minutes per IP, action deny) and optionally BotID; then the in-app limiter is a second layer.

## Email check accepted address lists used as reply_to

- Fingerprint: `contact-replyto-address-list`
- Verdict: **rejected**

The email regex allowed commas and angle brackets, e.g. 'a,victim@evil.example', which was sent as reply_to.

**Trace**

- entrypoint: `lib/contact-rules.ts:19` (email check): EMAIL_RE allows , ; < >.
- sink: `app/api/contact/route.ts:81` (reply_to): data.email used as reply_to.

**Why rejected:** The sender already chooses reply_to freely, so a list crosses no new boundary: staff would see the addresses before replying. Tightened anyway in commit 9c909d3 as input hygiene.

## CR/LF in name or company reached the email subject sent to Resend

- Fingerprint: `contact-subject-control-chars`
- Verdict: **needs_validation**

validateField only trimmed and length-checked name and company, so CR/LF and other control characters were placed in the subject passed to Resend. Whether Resend turns them into extra headers (for example Bcc) is outside the repository.

**Trace**

- entrypoint: `app/api/contact/route.ts:52` (validation): validateField accepts CR/LF in name/company.
- sink: `app/api/contact/route.ts:82` (subject): Subject built from data.name and data.company.

**Blocked on:** How Resend's API encodes CR/LF in the subject field is not visible in source and must not be tested by sending real email.

**Plan:** Fixed in source anyway (commit 9c909d3): control characters now return 400 before any email is built. Owner can confirm with Resend documentation or support that the subject is header-encoded; no action needed after the fix.

## Contact API buffered the whole request body before enforcing the 10 KB cap

- Fingerprint: `contact-unbounded-body-read`
- Verdict: **confirmed** · severity **low** (likelihood medium, impact low)

With no Content-Length (chunked upload) the route called request.text(), holding the full body in memory before the byteLength check.

**Trace**

- entrypoint: `app/api/contact/route.ts:29` (size check): Only checks the Content-Length header.
- sink: `app/api/contact/route.ts:30` (body read): request.text() buffers everything.

**Reproduction (local only)**

- Attacker: Unauthenticated client.
- Pipe 2 MB to POST /api/contact with chunked encoding (repro-contact.sh step 4).
- Result: Baseline returned 413 only after reading the full body; fixed build cancels the stream at 10 KB.

**Fix:** Stream the body with a capped reader and cancel past 10 KB. Commit ca03825.

## Rate limit keyed on a spoofable X-Forwarded-For

- Fingerprint: `contact-xff-spoofing`
- Verdict: **rejected**

The limiter keys on the first X-Forwarded-For entry, which a client could forge if passed through.

**Trace**

- entrypoint: `app/api/contact/route.ts:44` (client IP): Reads x-forwarded-for first entry.

**Why rejected:** Vercel overwrites x-forwarded-for and does not forward client-supplied values (vercel.com/docs/headers/request-headers), so the value is the real client IP in the intended deployment.

## Dependency advisories (minimatch GHSA-g3hv-75wg-m249, deepmerge GHSA-gcqx-w48m-w2h4)

- Fingerprint: `deps-dev-chain-advisories`
- Verdict: **rejected**

npm audit reported 13 issues (11 moderate, 2 low) through eslint/typescript-eslint and the shadcn CLI (ts-morph, @shadcn/registry), and shadcn sat in runtime dependencies.

**Trace**

- entrypoint: `package.json:19` (dependencies): shadcn ^4.23.0 under dependencies at 26427a8.

**Why rejected:** None of these packages is imported by shipped server or client code; they run only in lint or the shadcn CLI on developer input. Hygiene fixed anyway (commit 94769ae): shadcn moved to devDependencies, minimatch overridden to 11.0.5; npm audit now 3 low (deepmerge, no patched release exists), npm audit --omit=dev 0.

## No browser security headers; any site could frame the pages

- Fingerprint: `headers-missing-browser-hardening`
- Verdict: **confirmed** · severity **low** (likelihood low, impact low)

next.config.ts set no headers. Responses had no CSP, X-Frame-Options or frame-ancestors, nosniff, Referrer-Policy or Permissions-Policy, and advertised X-Powered-By: Next.js.

**Trace**

- entrypoint: `next.config.ts:3` (nextConfig): No headers() and no poweredByHeader:false.

**Reproduction (local only)**

- Attacker: Third-party website embedding the site in an iframe.
- curl -sI the home page and look for frame-ancestors / X-Frame-Options.
- Result: Baseline: none present. Fixed: CSP (frame-ancestors 'none'), X-Frame-Options DENY, HSTS, nosniff, Referrer-Policy, Permissions-Policy, COOP; X-Powered-By removed.

**Fix:** Add headers() in next.config.ts with a no-nonce CSP (nonces would disable static prerendering/PPR) and poweredByHeader:false. Commit d38a31e.
