# DaVeroAI website: QA report

**Status:** NOT STARTED. Waiting on god's "build ready" signal.
**Checked on 2026-11-07:** repo holds only README.md. docs/brief.md, docs/design.md, docs/content.md and site code do not exist yet (cards DSK-1 to DSK-4 not done).

## Test plan (runs once the build is ready)
1. `npm ci && npm run build`: must finish with no errors. Record warnings.
2. Pages: every route in the docs/design.md sitemap loads with HTTP 200 from `npm run start`. 404 page exists.
3. Links: crawl every internal link and anchor. Check external links and mailto/tel.
4. Responsive: 375, 768 and 1280 px widths. No horizontal scroll, nav usable, text readable, images scale.
5. Accessibility (design:accessibility-review, WCAG 2.1 AA): contrast, alt text, heading order, labels, keyboard focus, landmarks, lang attribute.
6. Copy: page text matches docs/content.md word for word (headings, body, buttons/CTAs, meta titles and descriptions).
7. Basics: page titles, meta description, favicon, no console errors.

## Severity
- **High:** build fails, page missing or broken, dead primary link or button, WCAG A failure, wrong or missing key copy.
- **Medium:** layout broken at one width, WCAG AA failure, minor copy mismatch.
- **Low:** cosmetic issues.

## Issues
| # | Page | Steps | Expected | Actual | Severity |
|---|---|---|---|---|---|
| (none yet) | | | | | |

## Result
Pending. Passes only with zero high-severity issues.
