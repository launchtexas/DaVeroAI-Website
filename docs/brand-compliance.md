# DaVero AI website: brand compliance checklist

Source of truth: `docs/source/brand-kit/00_Brand_Guidelines/DaVero_AI_Brand_Guidelines.pdf` (v1.0, November 2026, 10 pages, every page read), the kit `README.txt`, `04_Design_Tokens/brand-tokens.css` + `brand-colors.json`, and the logo files.
Audited on `main` at `adaa4e7` (2026-11-07). Fixed in `9f990ed` (colour), `d8d960b` (type, naming, icon) and the commit that adds this file (heading weights, pull lines, docs).

Status: **PASS** (meets the rule), **FIXED** (was FAIL, now meets it, commit given), **N/A** (the guide sets no rule a website can follow, or it does not apply), **CLIENT** (met by the reading written here; the client should confirm).

Totals: 42 rules. PASS 25, FIXED 12, N/A 3, CLIENT 2 (both met by a stated reading). Open FAILs: 0.

## 1. Typography (guide p.6, README, tokens)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| T-1 | Primary typeface Inter, sans serif (p.6, tokens `font_family.brand`) | Inter Variable, self-hosted via `next/font/local`, `app/layout.tsx:9`, file `app/fonts/InterVariable-latin.woff2` (OFL, `app/fonts/Inter-OFL.txt`). One family for every element, SVG text included (`app/globals.css` `@theme --font-sans`). | PASS |
| T-2 | Fallback: Arial, sans-serif (p.6, tokens `font_family.fallback`) | `fallback: ["Arial", "sans-serif"]` in `app/layout.tsx:15`; `--font-sans: var(--font-inter), Inter, Arial, sans-serif` in `app/globals.css`. next/font also adds a size-adjusted Arial face to stop layout shift. | PASS |
| T-3 | Headlines: Inter Bold or ExtraBold (p.6, README) | `.t-display`/`.t-h1`/`.t-stat` 800, `.t-h2`/`.t-h3` 700. Was: pull lines and quotes styled as h3 at 500 (10 places), two `<h3>` at 500 (`app/about/page.tsx:83,91`, `components/site/blocks.tsx:314`). Now 700. | FIXED (this commit) |
| T-4 | Body and UI: Inter Regular or Medium (p.6, README) | Body 400; buttons, nav, form labels 500. Was: buttons and chart labels SemiBold (`components/ui/button.tsx:8`, `components/site/bar-chart.tsx`), mobile nav 700 (`components/site/header.tsx:91`). Now 500. | FIXED (`d8d960b`) |
| T-5 | Only the prescribed weights (400/500 body, 700/800 headlines) | Was: weight 650 in five places (labels `.t-mono`, legal `strong`/`th`, SVG labels in `components/site/art.tsx`). Labels are the kit's caps section labels, set Bold as in the guide; now 700. No 600/650 left. | FIXED (`d8d960b`) |
| T-6 | Type scale Display 48–72 px (p.6) | `.t-display` was 44–80 px; now `clamp(3rem, 2.2rem + 3.4vw, 4.5rem)` = 48–72. `.t-stat` (display numerals) was 40–68; now 48–68. | FIXED (`d8d960b`) |
| T-7 | H1 36–48 px (p.6) | `.t-h1` was 36–60; now `clamp(2.25rem, 1.9rem + 1.5vw, 3rem)` = 36–48. | FIXED (`d8d960b`) |
| T-8 | H2 24–32 px (p.6) | `.t-h2` was 30–46; now `clamp(1.5rem, 1.2rem + 1.1vw, 2rem)` = 24–32. | FIXED (`d8d960b`) |
| T-9 | Body 16–18 px (p.6) | Body 16 px (17 px ≥1024). `.t-lead` was 18–21; now 18. Labels (12–13 px) and small captions (15 px) are UI text, which the scale does not cover. | FIXED (`d8d960b`) |
| T-10 | Letter spacing, line height, text case | The guide states none. Site: tight negative tracking on display sizes, +0.08em caps labels (the guide's own labels are tracked caps), line height 1.02–1.6. | N/A |
| T-11 | Fonts obtained through their licensed channel; SVG wordmarks need Inter or must be outlined (README) | Font from `@fontsource-variable/inter` 5.3.0 (OFL). The site never uses the SVG wordmark: logos are the kit's transparent PNGs, so typography never depends on an installed font. | PASS |

Font setup after this work: one variable file, `InterVariable-latin.woff2`, weight axis 100–900, Latin subset, `display: swap`, preloaded by next/font, CSS variable `--font-inter`; weights used 400, 500, 700, 800. No new dependency or font file was needed.

## 2. Colour (guide p.5, p.8, p.10, tokens)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| C-1 | Primary palette Midnight #081630, DaVero Orange #FF6500, White #FFFFFF, Cloud #F3F6FA (p.5, README) | Defined verbatim in `app/globals.css:9-16`. | PASS |
| C-2 | Kit secondary tokens Deep Midnight #061126, Amber #FF962E, Mist #E6EAF0, Slate #536378, Ink #111827 (tokens) | Defined verbatim; used for the CTA stripe band, hover, light-band lines, light-band secondary text. | PASS |
| C-3 | No unapproved colours (p.10 rule 05, tokens `avoid`) | Was 13 non-kit hexes in `app/globals.css`: `--orange-deep #B34700`, accent hover `#FF7A1A` / press `#F25C00`, error `#FF8A80` / `#B42318`, five navy steps, two greys on dark, two greys on light. Now **the only hex values in site code are the nine kit colours** (plus `#081630` in `app/layout.tsx` and `app/manifest.ts` theme colour). Hover = Amber, press = Orange, light lines = Mist / Slate, errors = Amber on dark, Midnight on light. Dark surfaces, lines and secondary text are Mist mixed into Midnight (`color-mix`), see C-4. Sheet overlay was `bg-black/10`, now a Midnight tint. | FIXED (`9f990ed`) |
| C-4 | Tints of kit colours | The guide does not say whether tints are allowed. Its own pages use them: the cover subtitle is a light blue-grey on Midnight, the p.8 and p.1 art use a lighter navy stripe. The site keeps six tints, all Mist mixed into Midnight (`--midnight-2/-3/-line/-line-strong/-muted/-faint`), for card surfaces, borders and secondary text on dark. No new hue (the brown `--orange-deep` and the reds are gone). | CLIENT: confirm tints of kit colours are acceptable; the strict alternative is Deep Midnight cards, Slate borders and Mist secondary text, which flattens the hierarchy. |
| C-5 | Use orange as an accent, not for long paragraphs (p.5) | Orange is used for CTA fills, eyebrows on dark, one key word in heroes, agent marks, chart highlight and stripes. No orange paragraph anywhere. | PASS |
| C-6 | Prioritise accessible contrast (p.5) | Orange text on White/Cloud is 2.95:1, so orange is never text on light bands: there `--mark` is Midnight (16–17:1) and Orange appears only as a fill or a decorative stripe; buttons are Orange fill + Midnight text (6.1:1) on every band; Orange text only on Midnight (6.1:1). axe-core: 0 violations on all 15 routes at 375 and 1280 px, and on the contact form error state. Lighthouse Home mobile: Performance 96, Accessibility 100. | FIXED (`9f990ed`, removed `--orange-deep`) |
| C-7 | Primary ratio 70% Midnight / 20% Orange / 10% light surfaces (p.5) | Measured by pixel share of full-page screenshots: Home 42–44% Midnight, 1–2% Orange, 51–55% light; Services and About similar. The guide's own pages 2–10 are White pages with Midnight type and Orange accents, i.e. the ratio is a weight of use (Midnight as text and foundation, Orange as accent), not a page-area rule. The site follows the guide's own pattern: Midnight heroes, CTA bands, header, footer and all type; White/Cloud reading bands. Meeting 70/20/10 by area would need every reading band turned dark and orange areas ten times larger, against C-5. | CLIENT: confirm the reading; if area is meant, the light bands become Midnight (a layout change, not copy). |
| C-8 | Approved backgrounds White, Cloud, Midnight (p.10 rule 04) | Page bands are Midnight, Deep Midnight (kit token, CTA stripe band only), White and Cloud. | PASS |
| C-9 | Gradients only in the kit art; no gradients behind small copy (p.8, tokens) | No CSS gradient behind text. The footer edge (`components/site/footer.tsx:44`) is hard-stop stripes in Orange / White / navy, a kit stripe, not a gradient fade. Kit logo PNGs and `app/icon.svg` keep their own gradients. | PASS |

## 3. Logo (guide p.3, p.4, p.10, README)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| L-1 | On White use Primary_Color; on Midnight use Primary_Reversed (README, p.3) | `components/site/logo.tsx`: Reversed by default (Midnight header over hero, footer, mobile menu), Color inside `.band-paper`/`.band-cloud` (the scrolled White header). Files resized from `02_Transparent_PNG_Logos`, same aspect ratio (480×133 vs 2200×610). | PASS |
| L-2 | Product avatars and favicons use the App Icon (README, p.3, p.9) | `app/icon.svg` = kit `favicon.svg` (byte-identical), `app/favicon.ico` = kit `DaVero_Favicon.ico` (identical), `app/apple-icon.png` 180, manifest icons 192/512 from `03_Digital_Assets`. | PASS |
| L-3 | Standalone icon only where the audience already knows the name (README) | The icon appears alone only as favicon/app icon; on pages the full lockup is always used. | PASS |
| L-4 | Use supplied masters, not screenshots (p.10 rule 01) | All logos are the kit's PNG/SVG masters; OG and Twitter images are the kit `DaVero_OpenGraph_1200x630.png` (identical bytes). | PASS |
| L-5 | Never crop, stretch or rotate; fixed proportions (README, p.10 rule 02) | `w-auto` with a fixed height keeps the ratio; no transform or crop on logo images. | PASS |
| L-6 | Clear space ≈ 1/4 of the icon height (README, p.10 rule 03, tokens) | Measured in the browser: mark height 31.5 px (375) / 34.7 px (1280) needs 7.9 / 8.7 px; actual space ≥ 14.8 px left, ≥ 15.4 px top and bottom in the header; footer lockup has 16 px below (needs 12–14). | PASS |
| L-7 | No 3D effects, shadows, embellishment or recolouring (README, p.10 rule 05) | None on the logo. Also removed site-wide: the scrolled header's shadow line (now a plain border) and the menu sheet's `shadow-lg` + backdrop blur (`components/site/header.tsx`, `components/ui/sheet.tsx`). | FIXED (`9f990ed`) |
| L-8 | Minimum logo size | The guide sets none. Smallest use is 40 px tall (header, mobile), lockup 144 px wide. | N/A |
| L-9 | No gradient backgrounds behind small marks (tokens `avoid`) | Logo sits on flat Midnight or White only. | PASS |

## 4. Visual language, iconography and imagery (guide p.4, p.8, tokens)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| V-1 | Use the mark as a system: structural geometry, diagonal stripes, tight colour control (p.8) | `components/site/art.tsx`: `HeroArt`, `PageArt` and `StripeBand` are built from the kit's diagonal stripes in Midnight, Orange, White and navy. | PASS |
| V-2 | Avoid neural brains, circuitry, glow effects, stock robots (p.8, tokens) | Was: lucide `Bot` (a robot head) as the agent glyph in `components/site/blocks.tsx`, `components/site/hitl-demo.tsx`, `app/governance/page.tsx`. Now lucide `Workflow`. No brain, circuit or glow art; no stock imagery (one approved founder photo on About). | FIXED (`d8d960b`) |
| V-3 | Do: strong crop, generous whitespace, clear hierarchy, concise claims (p.8) | Section rhythm 80/96/128 px, one H2 per section, short claims; unchanged. | PASS |
| V-4 | Icon style | The guide sets no icon style. The site uses lucide line icons at 1.5–2 px stroke, in kit colours, always next to a text label. | N/A |
| V-5 | Mark: angular D, forward motion without arrows (p.4) | Applies to the mark itself, which is used unmodified. The site's arrow icons sit on links and buttons, not on the mark. | PASS |

## 5. Naming, tone of voice and messaging (guide p.1, p.2, p.7, README)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| N-1 | Name written "DaVero AI" (cover, wordmark, every footer) | Metadata, titles, alt text, legal pages and copy all read "DaVero AI". Was: the skill-loop diagram label `DAVEROAI` (`components/site/skill-loop.tsx:48`); now `DAVERO AI` (caps label, as the guide's own footers). The email domain `daveroai.com` is a domain and stays. `docs/content.md` still says "DaveroAI" but carries a note that the site reads "DaVero AI"; it is a working doc, not shown on the site. | FIXED (`d8d960b`) |
| N-2 | Lead with outcomes, not hype (p.7) | Copy leads with finished outcomes ("Own the Last Mile", "Not software seats. Not billable hours."). Copy was not changed (out of scope). | PASS |
| N-3 | Message pillars: domain-specific, platform-aligned, outcome-led (p.7) | All three are present in Home, Services and Industries copy. | PASS |
| N-4 | Primary brand line "Built for the last mile." and alternatives (p.7) | The site uses "Own the Last Mile" and "the last mile" framing, which the guide's alternatives allow ("lines are proposed brand content", README). Copy unchanged by brief. | PASS |
| N-5 | Brand position: enterprise agentic AI for the last mile (README, p.2) | Matches the hero and `/agentic-ai`. | PASS |

## 6. Layout and grid, governance (guide p.8, p.10)

| # | Rule (source) | Site state | Status |
|---|---|---|---|
| G-1 | Layout grid | The guide sets none beyond "generous whitespace" (V-3). Site: 12-column grid, 1240 px container, 16–40 px gutter. | PASS (no rule broken) |
| G-2 | Radii (tokens `--davero-radius-sm 8px`, `--davero-radius-md 14px`) | Controls 8 px, cards 14 px; chips 6 px and boxes 10 px are in-between steps. | PASS |
| G-3 | Supplied asset set: vector SVG, transparent PNG, social assets, CSS tokens (p.10) | Site uses the PNG lockups, kit favicon set, kit OG image and kit token values. | PASS |

## Decisions recorded

1. **Orange text on light bands** (C-6): `--orange-deep #B34700` deleted. On White/Cloud, eyebrows, marks, list markers and selected states are Midnight; Orange there is only a fill (buttons with Midnight text) or a decorative stripe (eyebrow bar, header underline, chart highlight). Orange as text only on Midnight.
2. **Errors** (C-3): the kit has no red. Errors use Amber on Midnight (8:1) and Midnight on light, always with a warning icon, a text message and a 2 px border on the field. If the client wants a red for errors, it must be added to the kit first.
3. **Tints** (C-4) and **ratio** (C-7): met by the readings above; listed for the client to confirm.

## Verification (after fixes)

- `npm run build` and `npm run lint`: pass.
- All 15 routes (14 pages + 404) at 375 and 1280 px: render, no horizontal overflow, axe-core 0 violations (WCAG 2.0/2.1/2.2 A and AA); contact form error state 0 violations.
- Lighthouse 12.8.2, Home, mobile: Performance 96, Accessibility 100, Best Practices 100, SEO 100.
