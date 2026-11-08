# DaVero AI website: security audit (run-1)

**Date:** 2026-11-08 · **Baseline:** `26427a8` (main, clean) · **Fixes:** `9c909d3`..`bcac652` · **Profile:** quick (whole repo, one hunting pass, one independent verifier/critic pass) · **Method:** source review plus local checks against `next start` with a dummy key and a mocked Resend `fetch`. No real email was sent and no live endpoint was probed.

## Result

No critical, high or medium issues. Four low-severity issues were confirmed and fixed. Two items depend on Vercel settings (one needs an owner action). Four candidates were rejected.

| # | Finding | Verdict / severity | Fix |
|---|---|---|---|
| 1 | Other websites could submit enquiries through visitors' browsers (text/plain cross-site POST) | confirmed · low | `ca03825` |
| 2 | Contact API read the whole body before the 10 KB cap when no Content-Length | confirmed · low | `ca03825` |
| 3 | No browser security headers; pages could be framed; `X-Powered-By` sent | confirmed · low | `d38a31e` |
| 4 | Submitting the form before JavaScript loaded put personal details in the URL | confirmed · low | `bcac652` |
| 5 | CR/LF in name/company reached the email subject | needs validation (fixed anyway) | `9c909d3` |
| 6 | Rate limit is per instance, so total email volume is not capped | needs validation · **owner action** | Vercel Firewall rule (see NEEDS-VALIDATION.md) |
| 7 | Email field accepted address lists for reply_to | rejected (no new boundary); tightened anyway | `9c909d3` |
| 8 | Rate limit keyed on spoofable X-Forwarded-For | rejected: Vercel overwrites the header | none needed |
| 9 | Dependency advisories (minimatch, deepmerge) and shadcn CLI in runtime deps | rejected as vulnerability (dev/build only); hygiene fixed | `94769ae` |

Also checked with no issue: SSRF (fixed Resend URL), XSS (no raw HTML anywhere; email is plain text), open redirects (none), error leakage (generic error codes only), secrets in git history (none; only `.env.example` with an empty key is tracked).

## What changed

- **Contact API** (`app/api/contact/route.ts`): 403 for `Sec-Fetch-Site: cross-site`, 415 unless `application/json`; body streamed and cut off at 10 KB; hard cap on the limiter map.
- **Validation** (`lib/contact-rules.ts`, shared by form and API): control characters rejected in single-line fields (message still allows line breaks); email must be one plain address.
- **Headers** (`next.config.ts`): CSP (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`), HSTS 2 years, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, COOP; `poweredByHeader: false`. The CSP keeps `'unsafe-inline'` for scripts, as the Next.js 16 guide prescribes without nonces: nonces would disable static prerendering and PPR. The site has no XSS sink, so the trade-off is acceptable.
- **Form** (`components/site/contact-form.tsx`): `method="post"`.
- **Dependencies**: `shadcn` moved to devDependencies; `minimatch@^10` overridden to `^11.0.5`. ESLint now ignores `.claude/**` (agent tooling) so `npm run lint` passes.

## npm audit

| | Total | Low | Moderate | High/Critical |
|---|---|---|---|---|
| Before | 13 | 2 | 11 | 0 |
| After | 3 | 3 | 0 | 0 |
| After, runtime only (`--omit=dev`) | 0 | 0 | 0 | 0 |

`npm audit fix` changed nothing; `--force` would downgrade `shadcn` to 1.0.0 and `eslint-config-next` to 15, so it was not used. The 3 remaining are one advisory: deepmerge GHSA-gcqx-w48m-w2h4 (prototype pollution in `mergeObject`), pulled in only by the `shadcn` CLI. No patched deepmerge release exists (latest is 4.3.1). It runs only when a developer uses the CLI; nothing ships to the site.

## Regression checks (after all fixes)

- `npm run lint`, `tsc --noEmit`, `npm run build`: pass.
- All 11 pages, icon and manifest return 200; unknown route 404. No CSP violations or console errors in Chrome on any page.
- Contact form in the browser: client validation works, a real submit returns 200 (mocked Resend). API returns 503 without `RESEND_API_KEY`.
- Lighthouse Home: mobile 96 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100 (unchanged from before). axe on Home: 0 violations.

## Owner actions

1. **Vercel Firewall rate-limit rule** on `POST /api/contact` (see NEEDS-VALIDATION.md). This is the only fix that caps total email volume.
2. Optional: HSTS `includeSubDomains; preload` once every daveroai.com subdomain serves HTTPS. Left out because preload is hard to undo.
3. Note: the CSP blocks the Vercel preview toolbar (vercel.live) on preview deployments. Add `https://vercel.live` to `script-src`, `connect-src` and `frame-src` if the team uses preview comments.
4. Re-run `npm audit` when deepmerge or shadcn ships a fix.

## Coverage

This is the first run; no prior ledger exists. Ten coverage units (`coverage-ledger.json`) cover the contact API, the form, pages, headers, secrets and dependencies. Profile `quick`: one hunting pass by the parent and one independent source verifier that also acted as coverage critic (it found finding 4). This does not prove the site has no other issues. Out of scope: the Vercel project settings, DNS, the Resend account and GitHub repository settings.

Files: `findings.json` (validated), `coverage-ledger.json` (validated), `FINDINGS-DETAIL.md`, `NEEDS-VALIDATION.md`, `architecture.md`, `run-metadata.json`, local repro scripts in `agents/parent/artifacts/`.
