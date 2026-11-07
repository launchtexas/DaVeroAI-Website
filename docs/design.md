# Davero AI website: design spec

> Owner: Designer. Source of truth for the Builder. Inputs: `docs/brief.md` and the live site daveroai.com (fetched 2026-11-07).
> Status: **Complete.** Sitemap locked. Builder can build from this file alone; copy comes from `docs/content.md`.

## 1. Sitemap (locked)

| # | Page | Route | Nav label | Sections, top to bottom (section id) |
|---|------|-------|-----------|--------------------------------------|
| 1 | Home | `/` | (logo) | Hero `#hero` · Problem `#problem` · Services overview (6) `#services` · Approach (4 steps + orchestrator diagram) `#approach` · Industries (9) `#industries` · Final CTA `#cta` |
| 2 | Services | `/services` | Services | Intro `#intro` · one section per service (6): `#multi-agent-systems`, `#intelligent-automation`, `#ai-strategy`, `#enterprise-integration`, `#platform-engineering`, `#security-governance` · Approach (same 4 steps, short) `#approach` · FAQ `#faq` · CTA `#cta` |
| 3 | Industries | `/industries` | Industries | Intro `#intro` · 9 industry blocks: `#cybersecurity`, `#itsm`, `#financial-services`, `#customer-experience`, `#enterprise-knowledge`, `#supply-chain`, `#automotive`, `#business-operations`, `#data-analytics` · CTA `#cta` |
| 4 | About | `/about` | About | Mission `#mission` · How we work (principles) `#principles` · Team `#team` **[TBD, hidden until supplied]** · CTA `#cta` |
| 5 | Contact | `/contact` | Contact (as button) | Heading + short text `#intro` · Contact form `#form` · Direct email hello@davero.ai `#email` |
| 6 | Privacy | `/privacy` | footer only | Placeholder legal text |
| 7 | Terms | `/terms` | footer only | Placeholder legal text |
| — | 404 | `/404` | — | Short message + links to Home and Contact |

Decisions:
- **No Product page** (services firm) and **no Pricing page** (no public pricing). Nav slot goes to the CTA button.
- **Approach is a section, not a page**: full on Home, short on Services. Saves a page with no unique content.
- **No proof section** (clients, logos, numbers, testimonials, case studies) anywhere until real material exists. Do not build empty placeholders for it.
- Every "CTA" section and button points to `/contact`. `mailto:hello@davero.ai` appears on Contact and in the footer.

**Header (all pages):** logo "DAVERO AI." left → Services, Industries, About → primary button "Start a conversation" (`/contact`).
**Footer (all pages):** logo + one-line tagline · page links · Privacy, Terms · hello@davero.ai · © {year} Davero AI.

## 2. Direction

- **Style:** dark, engineering-led enterprise. Keep the live site look (near-black green + lime accent, Inter, heavy tight headlines). Calm and precise, not "cyber neon".
- **Keywords:** precise, confident, quiet, technical, production-grade.
- **Interaction tier:** L1+ (refined static). CSS transitions plus one IntersectionObserver for fade-up reveals. **No GSAP, Lenis, WebGL, custom cursor, scroll-jacking or parallax.**
- **Tech assumption for the Builder:** static site (plain HTML/CSS or any static generator). Nothing in this spec needs JavaScript beyond the reveal observer, the mobile menu and form validation.

## 3. Colour tokens

Taken from the live site's CSS variables; extra tokens added for states and accessibility. Contrast checked against `--bg`.

```css
:root {
  /* Surfaces */
  --bg:            #080b0a;  /* page background (live --bg) */
  --surface:       #111613;  /* cards, panels, header when scrolled (live --panel) */
  --surface-2:     #17271a;  /* alternate sections, hover surface */
  /* Lines */
  --line:          #263029;  /* decorative dividers, card borders (live --line) */
  --line-strong:   #5d6e62;  /* form input borders, focusable outlines: 3.6:1 on --bg */
  /* Text */
  --text:          #f5f8f4;  /* headings, body on dark (live --white) ~18:1 */
  --text-muted:    #9aa99f;  /* body secondary, descriptions (live --muted) ~8:1 */
  --text-faint:    #7d8a81;  /* captions, footer legal ~5.5:1; never smaller than 13px */
  /* Accent */
  --accent:        #b8ff70;  /* lime: CTA fill, eyebrows, focus ring, key words (live --lime) */
  --accent-hover:  #ccff99;
  --accent-press:  #9fe655;
  --on-accent:     #080b0a;  /* text on lime */
  --accent-rgb:    184, 255, 112;
  --bg-rgb:        8, 11, 10;
  /* Semantic (forms) */
  --error:         #ff7a7a;  /* ~7:1 on --bg */
  --success:       var(--accent);
}
```

Rules:
- All colours come from these tokens. No other hex values in site code.
- Lime is for **action and emphasis only**: buttons, eyebrows, the focus ring, at most one highlighted word per headline. Never for body text or large fills beyond buttons.
- Lime glow allowed only as a soft radial behind the hero: `radial-gradient(600px circle at 70% 20%, rgba(var(--accent-rgb), .10), transparent 60%)`.
- `--text-faint` is for 13px+ only; never put it on `--surface-2`.

## 4. Type scale

One family, as on the live site:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
--font: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
```

| Token | Use | Size (fluid) | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| `--fs-display` | Home hero H1 | `clamp(44px, 7vw, 94px)` | 900 | 0.98 | -0.04em |
| `--fs-h1` | Inner page H1 | `clamp(36px, 5vw, 64px)` | 800 | 1.05 | -0.03em |
| `--fs-h2` | Section H2 | `clamp(30px, 4.5vw, 55px)` | 800 | 1.08 | -0.025em |
| `--fs-h3` | Card / block title | `clamp(20px, 2vw, 24px)` | 700 | 1.25 | -0.01em |
| `--fs-lead` | Intro paragraph under H1/H2 | `clamp(18px, 1.6vw, 21px)` | 400 | 1.55 | 0 |
| `--fs-body` | Body | 16px (17px ≥ 1024px) | 400 | 1.65 | 0 |
| `--fs-small` | Captions, footer, form help | 14px | 400 | 1.5 | 0 |
| `--fs-eyebrow` | Eyebrow label above H2 | 12px, UPPERCASE | 600 | 1.2 | 0.16em (≈2px) |

Rules:
- One H1 per page. Headings in order (H1 → H2 → H3), no skipped levels.
- Body text max width 68ch. Lead max width 60ch.
- Headline emphasis: one word or phrase may be `color: var(--accent)`. No gradient text, no text shadows.
- Never use: display/script fonts, a second sans, italic headlines.

## 5. Spacing and layout

```css
--space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
--space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
--space-9: 96px; --space-10: 128px;
--radius-sm: 6px;   /* buttons, inputs, tags (live) */
--radius-md: 12px;  /* cards, panels (live) */
--container: 1200px;
--container-narrow: 780px;  /* legal pages, About mission, Contact */
--gutter: clamp(16px, 4vw, 32px);
--section-y: clamp(64px, 10vw, 128px);  /* vertical padding of each section */
```

- Container: `max-width: var(--container); margin-inline: auto; padding-inline: var(--gutter);`
- Grid: 12 columns, `gap: var(--space-5)` (24px) desktop, 16px mobile.
- Section rhythm: eyebrow → 12px → H2 → 20px → lead → 48px → content.
- Sections are separated by `--section-y` padding. Where two `--bg` sections meet, add a 1px `--line` top border to the second. CTA bands use `--surface`.

## 6. Components

All interactive elements: visible focus ring `outline: 2px solid var(--accent); outline-offset: 3px;` on `:focus-visible`. Transitions `150ms ease-out` on colour/border/transform only.

| Component | Spec | States |
|---|---|---|
| **Button primary** | bg `--accent`, text `--on-accent`, 15px/600, padding 14px 22px, radius `--radius-sm`, min-height 48px, optional trailing arrow icon 16px | hover `--accent-hover` + arrow moves 3px right · active `--accent-press`, `translateY(1px)` · focus ring · disabled opacity .45, `cursor:not-allowed`, no hover |
| **Button secondary** | transparent, 1px `--line-strong` border, text `--text` | hover border `--accent`, text `--accent` · active `--surface` bg · focus ring · disabled opacity .45 |
| **Text link** | `--text`, underline 1px offset 3px, `text-decoration-color: rgba(var(--accent-rgb),.5)` | hover underline colour `--accent` · focus ring |
| **Header** | sticky, height 72px (64 mobile), transparent over hero; after 16px scroll: bg `rgba(var(--bg-rgb),.85)`, `backdrop-filter: blur(12px)`, 1px bottom `--line` | Active page link: `--text` + 2px lime underline; others `--text-muted`, hover `--text` |
| **Mobile menu** | < 900px: links collapse to a 44×44 menu button (`aria-expanded`, `aria-controls`). Opens a full-width panel below header, bg `--bg`, links 20px/600 stacked 56px tall, CTA button full width at bottom. Esc and link click close it; focus returns to button; body scroll locked while open. | |
| **Eyebrow** | `--fs-eyebrow`, `--accent`, preceded by a 16×1px lime line | — |
| **Service card** | bg `--surface`, 1px `--line`, radius `--radius-md`, padding 32px; icon 24px lime in a 44px square (`--surface-2`, radius 6) → H3 → 1–2 line text `--text-muted` → "Learn more →" link to `/services#<id>` | hover: border `rgba(var(--accent-rgb),.4)`, `translateY(-2px)`. Whole card clickable via the link's `::after` stretched overlay; focus ring on card |
| **Step (approach)** | number "01–04" 14px/600 `--accent` mono-style (`font-variant-numeric: tabular-nums`) → H3 → text. Connected by a 1px `--line` horizontal rule on desktop, vertical on mobile | static |
| **Industry tile** | bg `--surface`, 1px `--line`, radius `--radius-md`, padding 24px, icon 20px + name 17px/600 + one line `--text-muted`. Links to `/industries#<id>` | hover border `--line-strong`, name `--accent` · focus ring |
| **Tag** | 12px/500, padding 4px 10px, radius `--radius-sm`, bg `rgba(var(--accent-rgb),.08)`, text `--accent`, border 1px `rgba(var(--accent-rgb),.25)` | static |
| **Orchestrator diagram** | inline SVG (not an image), 3 tiers: top box "Enterprise AI Orchestrator" (lime border) → 4 agent boxes (Research, Operations, Security, Analytics) → 3 base boxes (Enterprise APIs, Cloud & Data, Business Systems). Boxes `--surface` + `--line`, connectors 1px `--line-strong`, labels 14px `--text`. Has `<title>` + `role="img"` + `aria-label` describing the flow. On < 640px stack tiers vertically, agents in a 2×2 grid | One-time fade-in of connectors on reveal; none under reduced motion |
| **FAQ accordion** | native `<details>/<summary>`; summary 18px/600, padding 20px 0, bottom 1px `--line`, plus icon rotates 45° when open | hover summary `--accent` · focus ring on summary |
| **CTA band** | full-width section, bg `--surface` with the hero radial glow, centred: H2 + one line + primary button + secondary "hello@davero.ai" mailto link | — |
| **Contact form** | see §8 | |
| **Footer** | bg `--bg`, top 1px `--line`, padding 64px 0 32px. Desktop 4 columns: brand+tagline · Company (Services, Industries, About, Contact) · Legal (Privacy, Terms) · Contact (email). Bottom row: © line `--fs-small` `--text-faint` | links `--text-muted`, hover `--text` |

Icons: one outline icon set, 1.5px stroke (Lucide, inline SVG). Decorative icons `aria-hidden="true"`. No emoji.

## 7. Per-page section layout

Desktop layout described; mobile in §9.

### Home `/`
1. **Hero** (min-height `min(88vh, 820px)`): left 7 cols: eyebrow "Enterprise Agentic AI Engineering" → display H1 (two lines; second line lime-accented phrase) → lead → buttons: primary "Start a conversation", secondary "Our services" (`/services`). Below buttons: 3 proof points in a row (Multi-Agent AI · Enterprise-Ready · Last-Mile Delivery), each icon + 15px/600 title + 14px muted line. Right 5 cols: small version of the orchestrator diagram. Background: `--bg` + lime radial glow.
2. **Problem**: narrow container, centred. Eyebrow → H2 ("Beyond prototypes. Into production.") → lead paragraph. Text only.
3. **Services**: eyebrow + H2 + lead left-aligned; 3×2 grid of service cards.
4. **Approach**: eyebrow + H2; 4 steps in a row with connector line; full orchestrator diagram below, centred, max 960px.
5. **Industries**: eyebrow + H2; 3×3 grid of industry tiles.
6. **Final CTA**: CTA band.

### Services `/services`
1. **Intro**: H1 + lead, narrow, left-aligned. In-page jump list of the 6 services as tags (anchor links).
2. **Six service sections**, alternating layout: 5 cols text (eyebrow category tag e.g. "Agentic AI", H2, paragraph, 3–4 bullet "what you get" list with lime check icons) + 7 cols panel (`--surface` card listing deliverables or a small diagram). Odd sections text-left, even text-right. `scroll-margin-top: 96px` on each for the sticky header.
3. **Approach (short)**: 4 steps row, no diagram.
4. **FAQ**: narrow container, 5–8 `<details>` items (copy from content.md).
5. **CTA band**.

### Industries `/industries`
1. **Intro**: H1 + lead + 3×3 tile grid acting as jump links.
2. **Nine industry blocks**, single column, each: 4 cols left (icon, H2 at `--fs-h3`×1.25, tag) + 8 cols right with three labelled rows **Problem → Approach → Outcome** (labels as eyebrows). 1px `--line` between blocks. Outcome copy is qualitative only: no numbers unless sourced.
3. **CTA band**.

### About `/about`
1. **Mission**: narrow, H1 + 2–3 paragraphs.
2. **Principles**: 2×2 cards (title + text), e.g. production-first, human oversight, security by design, measurable outcomes (final wording from content.md).
3. **Team**: **not rendered** until real names and photos exist. When supplied: 4-col grid, square photo radius 12, name 17/600, role muted.
4. **CTA band**.

### Contact `/contact`
Two columns: left 5 cols: H1 "Start a conversation", lead, then "Prefer email?" + `mailto:hello@davero.ai` link, and a short "What happens next" 3-item list. Right 7 cols: form card (`--surface`, radius 12, padding 40px).

### Privacy, Terms
Narrow container, H1 + "Last updated" small line + `[TBD: legal text to be supplied]` notice in a `--surface` panel. Body styles for H2/H3/p/ul ready for when text arrives.

### 404
Centred, H1 "Page not found", one line, primary button Home, secondary Contact.

## 8. Contact form

Fields (all with visible `<label>`, never placeholder-only):

| Field | Type | Required | Validation |
|---|---|---|---|
| Name | text, `autocomplete="name"` | yes | 2–100 chars |
| Work email | email, `autocomplete="email"` | yes | valid email format |
| Company | text, `autocomplete="organization"` | yes | 2–120 chars |
| Role | text, `autocomplete="organization-title"` | no | max 100 |
| What are you working on? | textarea, 5 rows | yes | 20–2000 chars, show live count |
| Consent | checkbox "I agree to the Privacy Policy" (link) | yes | must be checked |
| Honeypot | hidden text field `website`, `tabindex="-1"`, `aria-hidden` | — | must be empty |

- Inputs: bg `--bg`, 1px `--line-strong`, radius 6, padding 12px 14px, 16px text (prevents iOS zoom), min-height 48px. Hover border `--text-muted`; focus border `--accent` + focus ring; disabled opacity .5.
- Errors: validate on blur and on submit (client) **and** on the server. Error state: border `--error`, message under field 14px `--error` with an icon, linked with `aria-describedby`, `aria-invalid="true"`. On submit with errors, focus the first invalid field and show a summary at top with `role="alert"`.
- Submit: primary button full width "Send message". While sending: disabled + spinner + "Sending…". Success: replace form with a confirmation panel (`role="status"`, focus moved to its heading) and the line "Or email us at hello@davero.ai". Failure: keep inputs, show error banner with the email fallback.
- Delivery backend is the Builder's choice (e.g. a form service or serverless function). Until one exists, the form must not silently fail: fall back to a `mailto:` link.

## 9. Mobile and responsive behaviour

| Breakpoint | Width | Changes |
|---|---|---|
| Desktop | ≥ 1024px | Layouts as in §7 |
| Tablet | 640–1023px | Service grid 2 cols; industry grid 2 cols (3×3 → 2-col); approach steps 2×2; Services/Industries alternating blocks stack (text then panel); header menu collapses below 900px |
| Mobile | < 640px | Everything single column; hero diagram hidden (diagram still shown in Approach, stacked); proof points stack; buttons full width; card padding 24px; footer 1 column (brand, links, legal, email) |

- Touch targets ≥ 44×44px; spacing between adjacent targets ≥ 8px.
- No horizontal scroll at 320px width. Test at 320, 390, 768, 1024, 1440.
- Font sizes are fluid via `clamp()`; body never below 16px on mobile.
- Images (if any are added later): `max-width: 100%`, explicit width/height, `loading="lazy"` below the fold.

## 10. Motion and accessibility

- **Reveal:** sections' direct content fades up once on entering the viewport: `opacity 0→1`, `translateY(16px→0)`, 500ms `cubic-bezier(.2,.7,.2,1)`, stagger 60ms across grid items (max 6). IntersectionObserver, threshold 0.15, unobserve after first reveal. Content must be visible if JS fails (add the hidden class from JS only).
- **Hover:** only colour, border and `translateY(-2px)`; no scale above 1.02, no blur on moving elements.
- **Reduced motion:**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
    .reveal { opacity: 1 !important; transform: none !important; }
  }
  ```
- Accessibility baseline (WCAG 2.2 AA): skip link "Skip to content" as first focusable element; landmarks `header`, `nav[aria-label="Main"]`, `main`, `footer`; `lang="en"`; every page has a unique `<title>` ("Page – Davero AI") and meta description; all text contrast ≥ 4.5:1 (tokens above pass); keyboard can reach and operate everything; `aria-current="page"` on active nav link.

## 11. Do's and don'ts

Do:
- Keep one primary CTA per section, always "Start a conversation" → `/contact`.
- Use real copy from `docs/content.md`; mark missing facts `[TBD]` in content, not with fake data.
- Keep generous whitespace; let the heavy headlines carry the page.
- Use the orchestrator diagram as the one signature visual.
- Reuse the same card, step and CTA band components across pages.

Don't:
- ❌ Invent clients, logos, metrics, testimonials, team members or certifications.
- ❌ Add a Pricing or Product page.
- ❌ Use lime for body text or large background areas.
- ❌ Use stock photos of robots, glowing brains or handshakes.
- ❌ Add hex colours or fonts outside the tokens.
- ❌ Use gradient text, text shadows or glassmorphism cards.
- ❌ Use GSAP, scroll-jacking, parallax, WebGL or a custom cursor.
- ❌ Use placeholder-only form labels or remove focus outlines.

## 12. Design references

| Reference | What we take |
|---|---|
| daveroai.com (live) | Colours, Inter at 800–900 with tight tracking, 6/12px radii, eyebrow style, copy voice, orchestrator diagram concept |
| tribe.ai | Outcome-led headlines; pilot → production story on Home |
| faculty.ai | Problem → Approach → Outcome structure for industry blocks |
| palantir.com/platforms/aip | Security & governance treated as its own clear service section |
| sierra.ai | Calm enterprise layout, one clear CTA per page |
