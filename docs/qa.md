# DaVeroAI website: QA report (v2)

**Result: PASS.** Zero high-severity issues open. One brand defect found and fixed (8f478cb). Four medium/low items below are copy or design calls for the team, not blockers.

**Tested:** 2026-11-07, main at a186a60 (+ fix 8f478cb), production build (`next build` + `next start`), system Chrome via playwright-core, axe-core 4.x, Lighthouse 12.8.2.

## Test plan (12 v2 routes)
Routes: `/`, `/agentic-ai`, `/services`, `/approach`, `/governance`, `/industries`, `/insights`, `/about`, `/contact`, `/privacy`, `/terms`, 404 (`/nope`).

| # | Check | How | Result |
|---|---|---|---|
| 1 | Build and lint | `npm run build`, `npm run lint` | Pass. 14 static pages, no warnings; ESLint clean |
| 2 | Routes | Load all 12 routes | Pass. 11 × 200, `/nope` 404 with branded page |
| 3 | Links and anchors | Crawl every `a[href]`, check status and that each `#id` exists on its target page | Pass. 40 internal targets, 0 broken, 0 dead anchors. 3 external (NIST, ISO, AICPA on /governance) |
| 4 | Responsive | 375, 768, 1280, 1440 px, every route, full scroll | Pass. 0 horizontal overflow, 1 `h1` per page, no console errors (48 page loads) |
| 5 | Keyboard | Tab through every page at 1280 | Pass. Skip link first and lands on `#main`; every stop has a visible 2 px focus ring; no focused element hidden under the sticky header (WCAG 2.4.11) |
| 6 | Mobile menu | 375 px, keyboard only | Pass. Opens on Enter, focus moves to Close, Tab is trapped in the dialog, Esc closes and returns focus to Menu, links navigate and close it |
| 7 | Accessibility | axe-core (WCAG 2.0/2.1/2.2 A+AA + best practice) at 375 and 1280, every route | Pass. 0 violations (24 runs). Targets ≥ 24 px. Lighthouse a11y 100 |
| 8 | Reduced motion | `prefers-reduced-motion: reduce` on the pages with the 8 interactive pieces (§6.0–6.8: hero line, last-mile explainer, arbitrage, HITL demo, step stories, stat tiles, skill loop, bar chart, landscape) | Pass. 0 running animations under reduce on `/`, `/agentic-ai`, `/approach`, `/governance`, `/insights`, `/services`; with motion on, the pieces animate |
| 9 | Contact form | Submit empty, bad email, valid | Pass. Empty: 4 fields `aria-invalid`, error summary gets focus with links to fields. Bad email: "Please enter a valid email address, like name@company.com." Valid: opens `mailto:ask@daveroai.com` with subject "Website enquiry from {name}, {company}" and all fields in the body; confirmation screen explains nothing is sent until Send |
| 10 | SEO | `<title>` and meta description per page vs docs/content.md and docs/governance.md | Pass. All 12 match word for word; titles ≤ 60, descriptions ≤ 155 |
| 11 | Copy | Every quoted line and headline in docs/content.md and docs/governance.md searched in rendered text | Pass with notes (issues 2–5). Remaining differences are the client decisions in a186a60 (4-step model, Agent Engineer, TBD-hidden lines) |
| 12 | [TBD] | Count `[TBD…]` in rendered text | Pass. Only /privacy (4) and /terms (4) |
| 13 | Certification claims | Search for certif/ISO/SOC 2/compliant | Pass. Only "designed to align with NIST AI RMF, ISO/IEC 42001 and SOC 2 practices" (docs/governance.md wording), with source links |
| 14 | Third-party logos / deck images | Assets in `public/`, `app/`, all `<img>` | Pass after fix 8f478cb (issue 1). No `<img>` on any page; deck media stays in `docs/source/` (not served) |
| 15 | Lighthouse | Home and /governance, mobile and desktop | See below |

### Lighthouse (production build, local)
| Page | Form | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| Home | Mobile | 92 | 100 | 100 | 100 | 3.4 s | 0 | 10 ms |
| Home | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |
| Governance | Mobile | 95 | 100 | 100 | 100 | 2.9 s | 0 | 10 ms |
| Governance | Desktop | 100 | 100 | 100 | 100 | 0.6 s | 0 | 0 ms |

Mobile LCP element is the hero lead paragraph (text, slowed by the font swap under simulated 4G). Not a blocker.

## Severity
- **High:** build fails, page missing or broken, dead primary link or button, WCAG A failure, wrong or missing key copy, third-party logo or certification claim.
- **Medium:** layout broken at one width, WCAG AA failure, specified content missing.
- **Low:** cosmetic issues, copy placement.

## Issues
| # | Page | Steps | Expected | Actual | Severity | Status |
|---|---|---|---|---|---|---|
| 1 | All (browser tab), `/vercel.svg`, `/next.svg` | Open any page and look at the tab icon; request `/vercel.svg` | No other company's logo anywhere | Favicon was the Next.js "N" logo (scaffold default); public/ served the Vercel and Next.js logos (unused) | High | Fixed in 8f478cb: `app/icon.svg` DaveroAI "D" monogram on brand colours, scaffold SVGs removed. The monogram is a placeholder for the designer to confirm |
| 2 | /insights `#market` | Scroll to "Finance is one of the largest markets" | content.md: chart "US outsourced labour spend by category" (10 bars, Sequoia, Mar 2026) | Only the $80–115B stat card; the 10-category chart is not built (design.md §6.7 specifies only the software-vs-services chart) | Medium | Open: docs disagree; designer/writer to decide |
| 3 | /agentic-ai `#agent-arbitrage` | Read the section | content.md: 4–6× stat, "more is spent on services than on software", "The last mile is the bigger prize." | Stat and both lines appear on /insights instead (follows design.md "market figures Insights only") | Low | Open: confirm placement, then align content.md |
| 4 | /about `#pod` | Read pod section | content.md summary: "The Forward Deployed Accountant leads and owns the client relationship." "The Solutions Engineer connects the data." | Role cards shown, summary lines absent | Low | Open: copy call |
| 5 | /approach `#actors` | Read "Five actors" | content.md: full A–E list with descriptions and "Consultants keep their advisory and assurance role" | Short chip list plus link to /governance#actors (full list lives there per docs/governance.md) | Low | Open: likely intended after a186a60; confirm and update content.md |

## Top-notch? (vs withnative.com)
Technically yes: clean build, zero axe violations, Lighthouse 92–100, solid keyboard and reduced-motion work. Visually it is good but not yet at withnative's level. Gaps:
1. **No imagery.** Every page is type, lines and cards on dark/paper. withnative carries pages with product shots and illustration; here the only visuals are the small diagrams, so long pages read as text walls (Home is ~13,000 px tall at 1440).
2. **Hero diagram is thin.** The last-mile line is small, its "…" label reads like a glitch, and the right half of the hero is mostly empty. It needs to be the visual anchor.
3. **Sticky header over content.** Body text shows through the translucent header while scrolling (visible over the arbitrage rows); withnative's header sits on a solid or properly blurred surface.
4. **Pacing.** Many sections share one rhythm (eyebrow, H2, cards) with large empty bands between dark and paper sections; withnative varies layouts (split sticky columns, full-bleed media) more.
5. **No real founder photo or proof.** The About initials avatar and the absence of any client proof make it feel early-stage next to withnative.

## Result
**PASS.** 0 high issues open (1 found, fixed in 8f478cb). 1 medium and 3 low items are content or design calls for the team.
