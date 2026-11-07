# DaveroAI website: design spec (v2)

> Owner: Designer 2. Source of truth for the Builder. Replaces v1 (commit f6c0b84).
> Inputs: client content deck `docs/source/content-brief.txt` (25 slides, "REFERENCE nn" = deck reference number), competitor site withnative.com (patterns only), existing build (Next.js 16, Tailwind v4, shadcn, Geist fonts).
> Copy comes from `docs/content.md` (Writer). This file says **what goes where and how it looks/behaves**; it quotes deck lines only to pin a section's job.

## 0. Content rules (defaults until the client answers the deck's CAUTION notes; god relays changes)

1. Brand is spelled **DaveroAI** everywhere (logo, titles, copy, alt text).
2. Third-party stats appear **only with their source named** next to the number (visible, not tooltip-only).
3. Third-party quotes (Sequoia, Goldberg, Nick Kopp/Rillet) appear **only attributed** (name + organisation) or are rephrased as our own words without quote marks.
4. **No logos** of partners, clients or platforms. Platforms (Rillet, Tabs, Maxio, Campfire) are named in plain text only, and only as "platforms we work around", never "partners".
5. **No competitor names.** The landscape 2×2 shows axes and DaveroAI only, unnamed categories elsewhere.
6. **No pricing, margins or market-size charts on Home.** Those live on Insights only. Engagement models show names only, no prices or margin logic.
7. Methodology: **4-step model on Home** (Embed → Develop skill → Harvest → Scale); **5-step engagement on Our Approach** (Engage → Build the skill → Harden with a constitution → Converge into the platform → Review and approve). Services links to Our Approach, it does not show a third variant.
8. One role vocabulary: **Forward Deployed Accountant** (pod lead), **Solutions Engineer** (integrations), **Forward Deployed Agent Engineer** (agents). Never "Agent Builder".
9. **DaveroAI owns and runs the agents.** In the five-actors view the Owner/Operator is DaveroAI, never "Platform".
10. Founder: **Hemang Bhatt, Founder & CEO**, bio from deck REFERENCE 23 minus the "First hires (funded)" block; advisory roles described as advisory (non-commercial). Headshot is a placeholder until supplied. No personal email anywhere.
11. One CTA label: **"Start a conversation"** → `/contact#form`.
12. Deck slide 22 right column ("What the Platform gets") is never published.
13. No invented clients, case studies, testimonials, metrics or certifications.

## 1. Sitemap and per-page sections (LOCKED)

Section ids are anchor ids (`<section id="…">`). "Ref nn" = deck reference that supplies the content. ★ = interactive piece specified in §6.

### 1.1 Pages

| # | Page | Route | Header nav label | Footer |
|---|------|-------|------------------|--------|
| 1 | Home | `/` | (logo) | yes |
| 2 | Agentic AI | `/agentic-ai` | Agentic AI | yes |
| 3 | Services | `/services` | Services | yes |
| 4 | Our Approach | `/approach` | Approach | yes |
| 5 | Technology & governance | `/governance` | Governance | yes |
| 6 | Industries & ecosystem | `/industries` | Industries | yes |
| 7 | Insights | `/insights` | Insights | yes |
| 8 | About | `/about` | About | yes |
| 9 | Contact | `/contact` | (CTA button "Start a conversation") | yes |
| 10 | Privacy | `/privacy` | — | legal row |
| 11 | Terms | `/terms` | — | legal row |
| 12 | 404 | not-found | — | — |

Header: logo "DaveroAI" (links `/`) · Agentic AI · Services · Approach · Governance · Industries · Insights · About · button "Start a conversation".
Footer: logo + close line "The last mile is where software, services and context meet." · column "Company" (About, Our Approach, Insights, Contact) · column "What we do" (Agentic AI, Services, Governance, Industries) · legal row (Privacy, Terms, © {year} DaveroAI). No email, no social icons until supplied.

### 1.2 Home `/` — ten numbered sections

| § | Section | id | Content (deck ref) |
|---|---------|----|--------------------|
| 1 | Hero | `hero` | Positioning line (Ref 01), sub-line "Platforms deliver the capability. DaveroAI delivers the finished outcome." CTA + secondary link "See how agents work" → `#in-action`. Visual: animated last-mile line (§6.0). |
| 2 | The evolution of AI | `evolution` | Platform vs DaveroAI contrast (Ref 03) + ★ Labor arbitrage → agent arbitrage before/after (Ref 05, **no $ bar chart**; that goes to Insights). |
| 3 | Business challenges | `challenges` | ★ Last-mile three-state explainer, compact (Ref 02) · ★ six stat tiles with sources (Ref 07) + line "Delivery, not models, is the bottleneck." · five challenge → our answer cards (Ref 08). |
| 4 | Services | `services` | Three service cards: Implement · Build agents · Run & tune, each with its outcome (Ref 12). Link → `/services`. |
| 5 | Agentic AI in action | `in-action` | ★ Human-in-the-loop demo Prepare → Review → Approve → Record (Ref 16). Line "Humans review and approve. Agents do the rest." Link → `/governance`. |
| 6 | Business outcomes | `outcomes` | Four outcome items, left column of Ref 21 only · ecosystem strip: client journey Platform referral → Embed and prove → Expand → Replicate (Ref 22), platforms named in text as "platforms we work around". Link → `/industries`. |
| 7 | Methodology | `methodology` | ★ 4-step journey Embed → Develop skill → Harvest → Scale + Golden Rule (Ref 11). Link → `/approach`. |
| 8 | Why partner with us | `why-us` | Four differentiators: Context captured · Platform-native · Human-validated · Compounding library (Ref 19) · Where/What/How strip (Ref 04). |
| 9 | Insights | `insights` | Three latest Insights cards → `/insights`. Hidden (not rendered, not empty) when fewer than 1 published item. |
| 10 | Final CTA | `cta` | Close line "The last mile is where software, services and context meet." + attributed quote trio (Sequoia, Goldberg, Kopp) (Ref 24) + "Start a conversation". |

### 1.3 Other pages

| Page | Sections top to bottom (id) — deck ref |
|------|----------------------------------------|
| **Agentic AI** `/agentic-ai` | `hero` page intro (concept: "Everything between 'the software is live' and 'the final outcome is delivered'") · `last-mile` ★ full three-state explainer + 4-point test + four domain examples Finance, Procurement & Supply Chain, IT Services, Insurance (Ref 02) · `platform-vs-outcome` contrast table (Ref 03) · `agent-arbitrage` ★ before/after (Ref 05) · `strategy` Where / What / How (Ref 04) · `who-for` "Our wedge" audience statement, text only, no chart (Ref 10) · `cta` |
| **Services** `/services` | `hero` · `service-lines` three service lines in depth: Implement (ledger live), Build agents (agents running the close; examples reconciliations, accruals, flux analysis, AR/collections, audit prep), Run & tune (agents that keep getting better) (Ref 12) · `challenges` five challenge → answer pairs (Ref 08) · `engagement-models` "How we engage": Deployment (6–10 week embed) · Agent subscription · Managed outcome (close-as-a-service), names + one line each, no prices (Ref 14) · `approach-link` one-line bridge to `/approach` · `cta` |
| **Our Approach** `/approach` | `hero` · `engagement` ★ 5-step engagement (Ref 13) with the constitution called out · `golden-rule` (Ref 11 Golden Rule) · `skill-factory` ★ Develop → Reuse → Redeploy loop, "Every engagement adds to the library, so the next client starts further ahead." (Ref 15) · `pod` delivery pod, three roles, "One pod per client." (Ref 18) · `actors` five actors summary, link to `/governance#actors` (Ref 17) · `cta` |
| **Technology & governance** `/governance` | `hero` ("Humans review and approve. Agents do the rest.") · `hitl` ★ full Prepare → Review → Approve → Record demo with audit trail (Ref 16) · `actors` five actors around every agent: Subject expert, Forward Deployed Agent Engineer (builds), Validator, Operator, Owner — Operator and Owner = DaveroAI; client defines and approves (Ref 17) · `constitution` what "harden with a constitution" means (Ref 13) · `platform-native` agents run inside the client's platform, data stays there (Ref 19 "Platform-native") · `cta` |
| **Industries & ecosystem** `/industries` | `hero` · `domains` four domains: Finance (lead), Procurement & Supply Chain, IT Services, Insurance, each with a last-mile example (Ref 02) · `journey` Platform referral → Embed and prove → Expand → Replicate (Ref 22) · `platforms` text list "AI-native platforms we work around: Rillet, Tabs, Maxio, Campfire" + note that these are platforms, not partners; no logos (Ref 22) · `cta` |
| **Insights** `/insights` | `hero` · `market-shift` ★ $0.5T software vs $2T services bar, sourced (Ref 05) · `market` $80–115B outsourced US accounting, audit and tax work, sourced (Ref 10) · `stats` all six stat tiles with sources (Ref 07) · `landscape` 2×2 "sells the tool ↔ sells the work" × "depth of platform context", DaveroAI dot only, no other names, + "Our edge" bullets (Ref 20) · `articles` list of posts (card grid; empty state "First articles coming soon." until content exists) · `cta` |
| **About** `/about` | `hero` positioning (Ref 01 positioning + concept) · `mission` "Not software seats. Not billable hours." · `strategy` Where / What / How (Ref 04) · `pod` delivery pod short (Ref 18) · `founder` Hemang Bhatt, Founder & CEO, bio + headshot placeholder (Ref 23) · `cta` |
| **Contact** `/contact` | `intro` heading + what you get: four outcome items (Ref 21 left column) · `form` contact form (§7) · `next` "What happens next" three short steps (reply → conversation → scoping). No email address, no phone. |
| **Privacy** `/privacy`, **Terms** `/terms` | `legal` single prose column, placeholder text marked [TBD legal review], "Last updated" date. |
| **404** | Heading "This page took a wrong turn." · links Home, Agentic AI, Contact. |

### 1.4 Decisions

- Home §9 is not assigned in the deck; it is an Insights teaser so the Insights page has an entry point. It renders only when content exists.
- `/industries` keeps its existing route; the deck's "Industries / Ecosystem" is one page.
- Existing pages `/services`, `/industries`, `/about`, `/contact`, `/privacy`, `/terms`, 404 are rebuilt to this sitemap; v1's nine-industry and six-service structure is retired.
- No Pricing, Product, Careers or Case studies pages.


## 2. Direction and what we borrow from withnative.com

**Direction:** "Ledger-calm." A dark, precise, finance-grade site where one idea, the last mile, is shown working rather than described. Fewer, larger words; diagrams that move only to explain; every number sourced. Keywords: precise, accountable, calm, engineered, finished.

**Studied:** withnative.com home page HTML and CSS (fetched 2026-11-07; desktop and mobile breakpoints read from its stylesheet). We take **patterns only**. Never copy its brand, orange accent, fonts (Favorit, Lausanne), wording, images, illustrations or code.

| Pattern on withnative | How DaveroAI uses it |
|---|---|
| **Light-weight display type** at large sizes (weight 300, tracking about -0.04em, `text-wrap: balance`, max ~16ch) instead of heavy bold | Headlines in Geist 300/400, tight tracking. Retires v1's 800-weight headlines. Weight contrast (300 display vs 500 labels) does the work. |
| **Generous, fixed section rhythm** (120px vertical on desktop, 80px on mobile) | `--section-y` 128px / 80px; every section uses it, no ad-hoc gaps. |
| **Sticky left column, scrolling right column** for step stories (left sticks at top on ≥1024px, static on mobile) | Methodology (Home §7), 5-step engagement (Approach), HITL demo (Governance). |
| **Stacked sticky cards** that pile up as you scroll | Service lines on `/services`. |
| **Big-number result tiles** with a one-line caption | Stat tiles, but every tile carries a named source line (rule 0.2). |
| **Mono micro-labels** for categories, dates, step numbers | Geist Mono 12–13px uppercase for eyebrows, step indices, sources, timestamps in the audit trail. |
| **Alternating dark and light bands** to pace a long page | Dark is default; a light "paper" band is used for data-dense sections (Home §3 stats, Insights charts) so numbers read like a report. Max two paper bands per page. |
| **One accent colour, used sparingly** | Lime stays our one accent; on paper bands it switches to deep lime for contrast. |
| **Small radius scale** (chip 6 / control 8 / box 10 / card 14) | Same four steps (values in §3.4). |
| **Insights cards** with category · date · author line | Home §9 and `/insights` card. |
| **Closing CTA band** that restates the promise, then one action | Home §10 and every page `cta`. |
| **Footer with an oversized wordmark** | Footer ends with "DaveroAI" set in display type, clipped at the bottom edge, `aria-hidden` (the real logo link is above it). |

Not borrowed: per-character split-text reveals (they break screen readers and reading flow), client logo walls and customer stats (we have none; rule 0.13), booking widget with revenue question, "Ask an AI about us" block.

## 3. Tokens

The dark + lime identity holds up next to withnative's polish once the type gets lighter and a paper band is added; the gap was type and rhythm, not colour. Tokens below replace v1. All pairs checked (WCAG relative-luminance formula); ratios shown.

### 3.1 Colour

```css
:root {
  /* Dark (default) */
  --bg:           #0a0d0c;
  --surface:      #121815;  /* cards, header after scroll */
  --surface-2:    #18201c;  /* raised panels, demo stage */
  --line:         #2a332d;  /* decorative borders only (1.5:1) */
  --line-strong:  #5f6f64;  /* input borders, chart axes, focusable outlines (3.7:1 on --bg, 3.1:1 on --surface-2) */
  --text:         #f2f5f0;  /* 17.8:1 */
  --text-muted:   #a3b0a7;  /* 8.7:1 */
  --text-faint:   #83918a;  /* 5.9:1 on --bg, 5.1:1 on --surface-2; 13px+ only */
  --accent:       #c4ff6b;  /* lime: 16.6:1; CTA fill, focus ring, agent steps, one key word */
  --accent-hover: #d4ff8f;
  --accent-press: #aee84f;
  --on-accent:    #0a0d0c;  /* 16.6:1 on lime */
  --human:        #f5c26b;  /* amber: human steps in demos, 11:1 on --surface */
  --error:        #ff8080;  /* 8:1 */

  /* Paper band (class .band-paper sets these) */
  --paper:            #f3f5f1;
  --paper-2:          #e7ebe4;
  --ink:              #0d1210;  /* 17.2:1 */
  --ink-muted:        #4a564f;  /* 7.0:1 */
  --ink-faint:        #5f6b64;  /* 5.1:1; sources, captions */
  --paper-line:       #c9d1c6;  /* decorative */
  --paper-line-strong:#6b7770;  /* axes, borders that matter (3.9:1 on --paper-2) */
  --accent-deep:      #3f6b00;  /* lime for text/marks on paper, 5.8:1 */
  --human-deep:       #8a5a00;  /* amber on paper, 5.4:1 */
  --error-deep:       #b42318;  /* 6.0:1 */
}
```

Rules:
- `.band-paper` remaps: `--bg→--paper`, `--surface→#ffffff`, `--text→--ink`, `--text-muted→--ink-muted`, `--text-faint→--ink-faint`, `--line→--paper-line`, `--line-strong→--paper-line-strong`, `--accent` (as text/marks) → `--accent-deep`. Buttons on paper: fill `--ink`, text `--paper`.
- Lime fill (`--accent`) never sits on paper; lime text never on paper (1.07:1).
- Agent = lime, human = amber, everywhere a diagram distinguishes them, **always with an icon and a text label too** (never colour alone).
- Only these tokens in code. Charts use `--accent`/`--accent-deep` for DaveroAI-side data and `--text-muted`/`--ink-muted` for the comparison side.
- Hero glow only: `radial-gradient(720px circle at 75% 10%, rgb(196 255 107 / .08), transparent 60%)`. No other gradients, no glass, no text shadows.

### 3.2 Type

Fonts from the `geist` npm package via `next/font/local` (no network at build): **Geist** (sans) and **Geist Mono**. Fluid sizes:

| Token | Size (min → max, 360 → 1440px) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | `clamp(2.75rem, 1.6rem + 5vw, 5.5rem)` | 300 | 1.02 | -0.045em | Home hero H1 only |
| `h1` | `clamp(2.25rem, 1.5rem + 3.2vw, 4rem)` | 300 | 1.05 | -0.04em | page heroes |
| `h2` | `clamp(1.875rem, 1.35rem + 2.2vw, 3rem)` | 300 | 1.1 | -0.035em | section titles |
| `h3` | `clamp(1.25rem, 1.1rem + .6vw, 1.5rem)` | 500 | 1.25 | -0.015em | card titles, step titles |
| `stat` | `clamp(2.5rem, 1.8rem + 3vw, 4.5rem)` | 300 | 1 | -0.04em, `font-variant-numeric: tabular-nums` | stat tiles |
| `lead` | `clamp(1.125rem, 1.05rem + .35vw, 1.3125rem)` | 400 | 1.5 | -0.005em | intro paragraphs, max 60ch |
| `body` | 1rem (17px ≥1024: 1.0625rem) | 400 | 1.6 | 0 | body, max 68ch |
| `small` | 0.875rem | 400 | 1.5 | 0 | card body, form help |
| `mono` | 0.75rem (12px) → 0.8125rem ≥1024 | 500 | 1.4 | 0.08em, uppercase | eyebrows, step indices, sources, chips |

- Headings use `text-wrap: balance`; body uses `text-wrap: pretty`. H1 max 16ch, H2 max 22ch.
- One key word per headline may be `--accent` (not on paper). No gradient text.
- Quotes: `h2` size, weight 300, curly quotes, attribution in `mono` below.

### 3.3 Spacing and layout

- 4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- `--section-y`: 128px ≥1024, 96px 640–1023, 80px <640. Section header → content gap 48px (32 mobile).
- Container: max 1240px content, side gutter `clamp(16px, 4vw, 40px)`. Prose column max 720px.
- 12-column grid ≥1024 (gap 24), 6 columns 640–1023 (gap 20), 4 columns <640 (gap 16).
- Sticky split: `grid-template-columns: 5fr 7fr`; left `position: sticky; top: calc(var(--header-h) + 48px)` ≥1024 only.

### 3.4 Shape and elevation

- Radii: `--r-chip 6px`, `--r-ctl 8px` (buttons, inputs), `--r-box 10px` (small panels, tiles), `--r-card 14px` (cards, demo stage).
- Borders do the separation: 1px `--line`. No drop shadows on dark; on paper, cards may use `0 1px 2px rgb(13 18 16 / .06)`.
- Header: transparent over hero; after 24px scroll, `--surface` at 92% opacity + 1px bottom `--line`. Height 72px (64 mobile).

## 4. Components

| Component | Spec |
|---|---|
| **Button primary** | Fill `--accent`, text `--on-accent` 15px/500, padding 12×20, min-height 44, radius `--r-ctl`, trailing arrow icon 16px that shifts 2px right on hover. Hover `--accent-hover`; active `--accent-press`. On paper: fill `--ink`, text `--paper`. |
| **Button secondary** | Transparent, 1px `--line-strong`, text `--text`. Hover border `--text-muted`. |
| **Text link** | `--text` with 1px underline `--line-strong` offset 4px; hover underline `--accent`. Inline links in body always underlined. |
| **Eyebrow** | `mono` token, `--text-faint`, preceded by a 6px lime square (decorative). On paper the square is `--accent-deep`. |
| **Section header** | Eyebrow → H2 → optional lead. Left aligned (centre only for CTA band and stat intro). |
| **Card** | `--surface`, 1px `--line`, radius `--r-card`, padding 32 (24 mobile). Optional mono index top-left ("01"). Whole card clickable only when it has one link (link on the title, stretched with `::after`). Hover: border `--line-strong`, translateY(-2px). |
| **Stat tile** | See §6.5. |
| **Step list** | Mono index + H3 + small text, separated by 1px `--line` rules. Active step (in sticky stories) gets a 2px lime left rule and `--text`; inactive `--text-muted`. |
| **Chip** | `mono` text, 1px `--line`, radius `--r-chip`, padding 4×8. Variants: agent (lime dot + "Agent"), human (amber dot + "Human"). |
| **Quote** | Large quote (h2 300), attribution `mono`: "NAME, ROLE, ORGANISATION". Optional source link. |
| **CTA band** | Full-width `--surface` panel, radius `--r-card` inside the container, padding 96/48. Centred H2 + one lead line + primary button. |
| **Comparison table** | Two columns ("Platforms deliver" / "DaveroAI delivers"), rows separated by `--line`; DaveroAI column header has the lime square. On mobile becomes stacked pairs with row label repeated. Uses real `<table>` with `<th scope>`. |
| **Founder card** | Headshot placeholder 1:1, 320px max, `--surface-2` with initials "HB" in display type (`aria-hidden`), `alt=""` until a real photo; name H3, role mono, bio body, advisory line in `small`. |
| **Insight card** | mono category · date · author; H3 title (2 lines max); small excerpt (3 lines max); whole card link. |
| **Icons** | lucide-react, 20px, stroke 1.5, `aria-hidden` when paired with text. Differentiators: Context captured `ScanText`, Platform-native `Layers`, Human-validated `UserCheck`, Compounding library `LibraryBig`. Agent `Bot`, human `User`, record `BookCheck`. |

## 5. Page layouts

Desktop (≥1024) described; responsive changes in §8. Every page: header, `main#main`, footer. Every page hero: eyebrow (page name), H1, lead, primary button (except Contact), padding-top `--section-y` + header height, padding-bottom 96.

### 5.1 Home

| § | Layout |
|---|---|
| 1 Hero `hero` | 12-col: text cols 1–7 (display H1 = positioning line, lead = contrast line, buttons primary + secondary "See how agents work" → `#in-action`). Visual cols 8–12: ★ last-mile line (§6.0). Hero glow. Min-height `min(860px, 100svh)`. Below the fold edge: mono row "Built, run and improved by agents · Approved by your team". |
| 2 Evolution `evolution` | Header (eyebrow "The shift", H2). Row 1: comparison table platform vs DaveroAI (cols 1–6) next to short lead (cols 8–12). Row 2: ★ agent arbitrage before/after (§6.2), full width. |
| 3 Challenges `challenges` | **Paper band.** (a) ★ last-mile three-state explainer, compact variant (§6.1). (b) Stat intro centred line "Delivery, not models, is the bottleneck." then ★ six stat tiles, 3×2 (§6.5). (c) Five challenge → answer cards: 5 columns would be too narrow, so a 2-column list of rows: left "Challenge" (h3, `--ink`), right "Our answer" (body), mono index; rows separated by rules. |
| 4 Services `services` | Header + 3 cards in a row, each: mono index, title (Implement / Build agents / Run & tune), outcome line in `lead`, 2–3 example chips (Build agents: reconciliations, accruals, flux analysis, AR/collections, audit prep). Link "Explore services" → `/services`. |
| 5 In action `in-action` | Header H2 "Humans review and approve. Agents do the rest." ★ HITL demo, compact variant (§6.3), full container width. Link → `/governance`. |
| 6 Outcomes `outcomes` | Split 5/7: left header + lead; right 2×2 outcome items (icon, h3, small). Below: ecosystem strip, 4 connected nodes Platform referral → Embed and prove → Expand → Replicate (static horizontal line with arrow heads, mono labels), then one text line naming the platforms we work around. Link → `/industries`. |
| 7 Methodology `methodology` | ★ Sticky story (§6.4 model A): left sticky H2 + Golden Rule as a quote card; right the four steps. |
| 8 Why us `why-us` | 4 cards (icon, h3, small) in a row. Below, a 3-column Where / What / How strip: mono label, h3, small; separated by vertical rules. |
| 9 Insights `insights` | Header row (H2 left, "View all insights" link right), 3 insight cards. Not rendered if no posts. |
| 10 CTA `cta` | Quote trio: 3 columns of attributed quotes (small quote size `h3` 300), then CTA band with close line as H2 and "Start a conversation". |

### 5.2 Agentic AI `/agentic-ai`

hero → `last-mile` ★ full explainer (§6.1 full variant) with the 4-point test as a numbered checklist beside it (split 7/5) and the four domain examples as tabs (Finance default) under it → `platform-vs-outcome` comparison table, full width → `agent-arbitrage` ★ §6.2 → `strategy` Where/What/How as three large columns with the deck's strategy quote as pull-quote (attributed if third-party, else unquoted) → `who-for` split: H2 + "Our wedge" lead; right a definition list (who: mid-market and enterprise; moving onto: AI-native ERP, CRM, procurement platforms) → `cta`.

### 5.3 Services `/services`

hero → `service-lines` three **stacked sticky cards** (each card full container width, min-height 480, `position: sticky; top: header+32px + n*16px` so the previous card's top edge stays visible; ≥1024 only, static on smaller screens and under reduced motion). Card: left title + outcome + body; right "Agents we build" list (Build agents) or "What's included" list → `challenges` 5 rows as Home §3c, but dark → `engagement-models` 3 cards: name, one line, "Best for" line; no prices; small note "Scope and terms agreed per engagement." → `approach-link` single row: text + link "See how an engagement runs" → `/approach` → `cta`.

### 5.4 Our Approach `/approach`

hero → `engagement` ★ sticky story (§6.4 model B, 5 steps; step 3 "Harden with a constitution" gets a highlighted card with a short definition) → `golden-rule` full-width quote-style statement (unquoted, our own words), four clauses as four mono-indexed lines: The client identifies the gap · We build · The client validates · We own, run and improve the agent → `skill-factory` ★ loop (§6.6) split 6/6 with copy → `pod` 3 role cards (role title, one line, "Pod lead" chip on Forward Deployed Accountant) + line "One pod per client." → `actors` short: 5 actor chips in a row and link "How governance works" → `/governance#actors` → `cta`.

### 5.5 Technology & governance `/governance`

hero → `hitl` ★ full HITL demo (§6.3 full variant with audit trail) → `actors` five-actor diagram: a centre node "Agent" with five actor cards around it (desktop: 3 above, 2 below; mobile: list). Each card: actor, who (Client / DaveroAI), what they do. Operator and Owner labelled "DaveroAI". Under it the line: the client defines and approves; DaveroAI builds, runs and owns the agent → `constitution` split 5/7: definition + a mock "constitution" panel (mono, `--surface-2`, 5 example rule lines marked "Example" in a chip, written by the Writer, not real client rules) → `platform-native` 3 short points (runs inside your platform · your data stays in your platform · every action recorded) → `cta`. Security certifications: none shown until supplied.

### 5.6 Industries & ecosystem `/industries`

hero → `domains` 4 large cards 2×2: domain name, "The last mile here" example, 3 example workflows as chips; Finance card marked with "Where we start" chip → `journey` 4-step horizontal sequence (as Home §6 strip, larger, each step with one line) → `platforms` a bordered `--surface` panel (dark band): H3 "Platforms we work around", platform names as plain text separated by middots, note line "Named for context. These are platforms our clients use, not commercial partners." → `cta`.

### 5.7 Insights `/insights`

hero → `market-shift` **paper band**: ★ horizontal bar chart software $0.5T vs services $2T (§6.7) with source → `market` single big figure "$80–115B" (stat tile, large) + caption + source → `stats` six stat tiles (same component as Home) → `landscape` 2×2 (§6.8) + "Our edge" bullets beside it → `articles` card grid 3 columns, filter chips by category only when ≥6 posts; empty state text → `cta`.

### 5.8 About `/about`

hero (positioning) → `mission` large statement "Not software seats. Not billable hours." in h2, with lead → `strategy` Where/What/How strip (same component as Home §8) → `pod` 3 role rows (compact) → `founder` split 4/8: founder card left, bio right; advisory roles listed with "(advisory)" → `cta`.

### 5.9 Contact `/contact`

Split 5/7 at ≥1024: left `intro` (H1 "Start a conversation", lead, the four outcome items as a checklist with lime check icons, then `next`: three mono-indexed steps "We reply · We talk through your last mile · We scope a first agent"); right `form` in a `--surface` card. No email or phone.

### 5.10 Privacy, Terms, 404

Legal: prose column 720px, H1, "Last updated" mono line, H2 per section, [TBD legal review] banner at top (`role="note"`). 404: centred, H1 "This page took a wrong turn.", lead, three links as secondary buttons; still has header and footer.

## 6. Interactive pieces (★)

Common rules for all ★ pieces:
- **Content first.** The full information is in the DOM as text (lists, tables, figure captions) and readable with JS off. JS only adds stepping, highlight and motion.
- Controls are real `<button>`s with visible labels; state changes announced through a single `aria-live="polite"` region per piece (one short sentence, not the whole panel).
- **No autoplay** except where stated; anything that moves for more than 5s has a visible Pause control (WCAG 2.2.2). Autoplay stops for good once the user interacts.
- Under `prefers-reduced-motion: reduce`: no autoplay, no transitions; show the final/complete state with all steps visible.
- SVG diagrams: `role="img"` + `<title>`/`aria-labelledby` pointing to a visible caption; decorative strokes `aria-hidden`.

### 6.0 Hero last-mile line

SVG, ~520×420. A horizontal track of 6 small nodes labelled in mono ("Platform live", "Configured", "Data in", "…", "Workflow run", "Outcome delivered"). The first 4 nodes and the track up to them are `--line-strong` ("platform covers it"); the final segment (last mile) draws in lime from node 4 to 6 (stroke-dashoffset, 1.6s ease-out, once on load, delay 300ms), and the last node gets a lime ring + label "Finished outcome". Caption below (visible, `small`): "The last mile: everything between 'the software is live' and the finished outcome." Reduced motion: drawn state. Hidden on <640 (the same idea appears in §3).

### 6.1 Last-mile three-state explainer (Ref 02)

- **States:** 1 "Platform covers it" · 2 "Client adopts" · 3 "The last mile". Segmented control (`role="tablist"`, three `role="tab"`, arrow keys move, Home/End supported) above a stage.
- **Stage:** one horizontal bar of work split into three zones. Selecting a state highlights its zone (full opacity, label, short description) and dims the others to 35% opacity (text stays ≥4.5:1 since the description shown is only the active one). Zone 3 is lime (agent-run) with a small "DaveroAI" chip.
- **Default:** state 3 selected. Autoplay: none.
- **Compact variant (Home §3):** stage + three tabs only; link "What is the last mile?" → `/agentic-ai#last-mile`.
- **Full variant (Agentic AI):** adds the 4-point test checklist (numbered list, each item gets a lime check when "The last mile" tab is active, purely decorative) and the domain tabs (Finance, Procurement & Supply Chain, IT Services, Insurance) that swap the three zone descriptions with domain examples. Two independent tablists; each tabpanel labelled by its tab.
- **Motion:** zone highlight 240ms ease; description cross-fade 200ms.
- **Mobile:** bar becomes vertical stack of three zones; tabs stay above, scroll horizontally if needed (no wrap).

### 6.2 Labor arbitrage → agent arbitrage before/after (Ref 05)

- Two columns "Yesterday: labor arbitrage" | "Tomorrow: agent arbitrage", with 4–5 matching row pairs from the deck (Writer supplies rows). A toggle button group "Yesterday / Tomorrow" (`aria-pressed`) sits above on ≤1023 where only one column shows at a time; on ≥1024 both columns show and the toggle is hidden.
- Scroll-in effect (≥1024, motion allowed): rows reveal pairwise, left then right, 80ms stagger; a lime arrow between each pair draws in (200ms). Once only.
- The Sequoia / Nick Kopp quotes, if used here, sit below as attributed quotes.
- **No dollar bar chart here** (Insights only).

### 6.3 Human-in-the-loop demo: Prepare → Review → Approve → Record (Ref 16)

- **Stage** (`--surface-2`, radius card): a sample task card, e.g. "Bank reconciliation · Example entity · Month-end" (all fictional, labelled "Example" chip). Four step columns/rails: Prepare (Agent, lime, `Bot`), Review (Human, amber, `User`), Approve (Human, amber, `UserCheck`), Record (System of record, lime outline, `BookCheck`, "full audit trail").
- **Controls:** "Play" / "Pause" button, "Previous step" / "Next step" buttons, step indicator "Step 2 of 4". Step buttons also act as a tablist-like list (each step clickable).
- **Behaviour:** Play advances every 2.4s; the task card moves to the active column (translateX, 400ms); the active column shows what happens in 1–2 lines (e.g., Prepare: "Agent matches 1,240 lines, flags 6 exceptions." — illustrative numbers, labelled "Illustrative"). Human steps show a mock "Approve" button **inside the demo** that is disabled visual only (`aria-hidden`), to avoid confusing real controls. Ends at Record with a lime check, then stops (no loop).
- **Autoplay:** Home compact variant starts playing when 50% in view, once, motion allowed only; Pause always visible. Governance full variant waits for Play.
- **Full variant adds:** an audit-trail list under the stage that appends one row per step: mono timestamp, actor (Agent/Human name role), action. It is an `<ol>`; new rows announced via the live region ("Step 3: Controller approved").
- **Mobile:** columns stack vertically, the card highlights the active step instead of moving.
- **Legend** always visible: lime square "Agent", amber square "Human", with icons.

### 6.4 Sticky step stories (Methodology 4-step on Home; 5-step engagement on Approach)

- Model A (Home, 4 steps: Embed, Develop skill, Harvest, Scale) and model B (Approach, 5 steps: Engage, Build the skill, Harden with a constitution, Converge into the platform, Review and approve). Never mixed on one page.
- ≥1024: left column sticky (H2, intro, a vertical progress rail with one dot per step); right column one block per step (min-height 60vh, mono index, h3, body, optional small diagram). An IntersectionObserver (rootMargin `-45% 0px -45% 0px`) marks the step in the middle as active: rail dot fills lime, step text goes from `--text-muted` to `--text`. Rail dots are links to step anchors.
- <1024 or reduced motion: plain ordered list, all steps full contrast, no sticky.
- Home adds the Golden Rule card at the end of the left column.

### 6.5 Stat tiles with sources (Ref 07)

- Six tiles: 340K accountants lost · ~75% of CPAs nearing retirement · 61% talent shortage · 12% run AI in core processes · 14% trust AI · 40%+ agentic projects scrapped. Exact wording and the source per stat come from the Writer; sources from the deck: Sequoia, Controllers Council, insightsoftware, Wakefield, Gartner.
- Tile: `stat` number, one-line caption (`small`), source line `mono` "SOURCE: GARTNER, 2025" (year if known; link if a public URL exists, `rel="noopener"`). Source is **required**; a tile without one is not rendered. Paper band: number `--ink`, rules `--paper-line`.
- Count-up: numbers count from 0 over 900ms ease-out when 40% in view, once. The final value is in the HTML; JS animates a visual copy with `aria-hidden` while the real value is visually hidden, then swaps. Reduced motion: no count-up.
- Grid: 3×2 ≥1024, 2×3 640–1023, 1 column <640.

### 6.6 Skill-factory loop (Ref 15)

- SVG circle of three nodes: Develop → Reuse → Redeploy, arrows between, and a centre label "DaveroAI library". A small lime dot travels the loop (12s per lap, CSS `offset-path` or SVG animateMotion) and each node pulses (scale 1→1.04, opacity) when the dot passes.
- Pause button bottom-right (required: it loops >5s). Off-screen: paused (IntersectionObserver). Reduced motion: static, no dot.
- Caption beside: "Every engagement adds to the library, so the next client starts further ahead." and three short lines, one per node, as a list (the real content).

### 6.7 Bar chart: software vs services (Insights only, Ref 05)

- Two horizontal bars: "Software" $0.5T (`--ink-muted`) and "Services" $2T (`--accent-deep`), on paper. Values printed at bar end. Axis line `--paper-line-strong`. Source line under the chart (required; from the deck, Sequoia). Bars grow from 0 width (700ms) once in view; reduced motion static.
- Accessible: `<figure>` with `<figcaption>`, plus a visually hidden `<table>` with the same values.

### 6.8 Landscape 2×2 (Insights only, Ref 20)

- Square plot: x "Sells the tool ↔ Sells the work", y "Depth of platform context". Quadrant labels in mono describe categories generically (e.g., "Software vendors", "Generalist service firms") with **no company names**. One lime dot "DaveroAI" top-right. Caption: "Our own assessment." Text alternative: a list of the four quadrants and where DaveroAI sits.

## 7. Contact form

Reuses the existing `components/site/contact-form.tsx` structure; update to this spec.

| Field | Type / autocomplete | Required | Validation |
|---|---|---|---|
| Name | text, `name` | yes | 2–100 chars |
| Work email | email, `email` | yes | valid format |
| Company | text, `organization` | yes | 2–120 |
| Role | text, `organization-title` | no | ≤100 |
| Platform you use | select: Rillet, Tabs, Maxio, Campfire, Other, Not sure | no | — |
| What's your last mile? | textarea, 5 rows, label hint "The workflow that still needs people after the software is live." | yes | 20–2000, live count announced only at 90% |
| Consent | checkbox "I agree to the Privacy Policy" (link) | yes | checked |
| Honeypot `website` | hidden, `tabindex=-1`, `aria-hidden` | — | empty |

- Visible labels above fields (never placeholder-only); required marked "(required)" in text. Inputs: bg `--bg`, 1px `--line-strong`, radius `--r-ctl`, 16px text, min-height 48. Focus: border `--accent` + focus ring.
- Errors on blur and submit, plus server-side: `aria-invalid`, message linked by `aria-describedby`, icon + text in `--error`. On submit with errors: error summary at top (`role="alert"`, links to each field), focus moves to the summary.
- Submit "Send message" (primary, full width). Sending: disabled + spinner + "Sending…". Success: form replaced by a panel (`role="status"`, focus to its heading) "Thanks. We'll reply within two working days." [TBD confirm wording]. Failure: keep input, show banner "Something went wrong. Please try again." **No email fallback shown** (no address published); if no backend exists, the Builder must not ship a form that pretends to send (show the failure banner).
- No CAPTCHA puzzle (WCAG 3.3.8); honeypot + server rate limit only.

## 8. Responsive rules

| Breakpoint | Width | Rules |
|---|---|---|
| Wide | ≥1440 | Container caps at 1240; type stops growing. |
| Desktop | 1024–1439 | Layouts as §5; sticky stories and stacked cards on. |
| Tablet | 640–1023 | 6-col grid. Splits stack (text above visual). Cards 2-up; 4-card rows 2×2; 3-card rows become 1 column (no orphan card). Sticky effects off. Header collapses to menu below 1180 (8 nav items don't fit). |
| Mobile | <640 | Single column. Hero visual hidden. Buttons full width. Tables become stacked pairs. Demo columns stack. Section-y 80. Footer stacked: wordmark, columns as two, legal row. |

- Mobile menu: button "Menu" (`aria-expanded`, `aria-controls`), full-screen panel `--bg`, links 24px, CTA at bottom; focus trapped while open, Esc closes and returns focus; body scroll locked.
- Touch targets ≥44×44 (WCAG 2.5.8 needs 24; we use 44). 8px gap minimum between targets.
- No horizontal scroll at 320px. Test widths: 320, 375, 390, 768, 1024, 1280, 1440. Zoom 200% and text-spacing override must not clip text (no fixed heights on text containers; use min-height).
- Images: explicit width/height, `next/image`, lazy below the fold. Deck media in `docs/source/media/` are reference only, **not** for publication (they contain partner logos and investor material).

## 9. Motion

| Motion | Spec |
|---|---|
| Reveal | Section children fade up once: opacity 0→1, translateY 16→0, 560ms `cubic-bezier(.2,.7,.2,1)`, stagger 60ms (max 6 items). Hidden class added by JS only (content visible with JS off). Threshold 0.15. |
| Hover | Colour/border 150ms; cards translateY(-2px) 200ms; button arrow translateX(2px). No scale >1.02. |
| Header | Background fade 200ms on scroll. |
| ★ pieces | As §6. |
| Page transitions | None. Smooth scroll only for in-page anchors, disabled under reduced motion. |

Banned: scroll-jacking, parallax, WebGL, custom cursor, split-character text animation, marquee, anything that flashes more than 3 times a second.

Reduced motion (`prefers-reduced-motion: reduce`): all of the above off; ★ pieces show complete state; stacked/sticky layouts become plain flow.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
  .reveal { opacity: 1 !important; transform: none !important; }
}
```

Motion code: CSS + IntersectionObserver + small React state. No animation library needed; if the Builder prefers one, `motion` (Framer Motion) only, with `useReducedMotion` respected.

## 10. Accessibility (WCAG 2.2 AA)

- Skip link "Skip to content" first; landmarks header, `nav aria-label="Main"`, main, footer; `lang="en"`; one H1 per page; heading levels in order.
- Unique `<title>` "Page | DaveroAI" and meta description per page (Writer supplies).
- Contrast: text ≥4.5:1, large text and UI parts/graphics ≥3:1; all tokens in §3.1 pass in their stated pairs. Diagram meaning never by colour alone (icon + label).
- Focus: visible ring `outline: 2px solid var(--accent); outline-offset: 3px` (on paper: `--ink`). Focus not hidden under the sticky header (`scroll-padding-top: calc(var(--header-h) + 16px)`) (2.4.11).
- Keyboard: every ★ control reachable and operable; tablists follow the ARIA tabs pattern; no keyboard traps except the open mobile menu (Esc exits).
- Moving content: pause controls (2.2.2); no autoplay under reduced motion.
- Target size ≥24×24 minimum, 44 by design (2.5.8). No drag-only interactions (2.5.7).
- Forms: labels, autocomplete, error identification and suggestions, accessible auth not applicable, no cognitive test (3.3.8), no re-entering data (3.3.7).
- Consistent help (3.2.6): "Start a conversation" in the same place (header right, footer) on every page.
- Charts and diagrams: figure + caption + text alternative (table or list).
- Stats: numbers read correctly by screen readers ("340 thousand" written as "340K" with `aria-label` "340 thousand" where needed).
- Test: axe with zero serious issues, keyboard pass, VoiceOver pass on Home, Governance and Contact, 200% zoom pass.

## 11. Do and don't

Do: one primary CTA per section; real copy from `docs/content.md`; `[TBD]` for missing facts; reuse components across pages; keep every stat sourced.

Don't:
- ❌ Logos of partners, clients or platforms; deck images on the live site.
- ❌ Competitor names; pricing, margins or market-size charts outside Insights.
- ❌ Unattributed third-party quotes; "Agent Builder"; "Platform" as agent owner.
- ❌ Personal email, any email address on Contact, fake testimonials, fake metrics.
- ❌ Hex values outside §3.1; heavy (700+) headlines; gradient text; glass; stock robot imagery.
- ❌ Autoplay without pause; motion ignoring reduced-motion; placeholder-only labels; removed focus outlines.

## 12. Builder checklist (done = all true)

- [ ] 12 routes from §1 exist; nav and footer as §1.1; old `/services` and `/industries` content replaced.
- [ ] Tokens §3 in `app/globals.css`; Geist + Geist Mono via `next/font/local`.
- [ ] Home has the ten sections with the ids in §1.2, in order.
- [ ] Eight ★ pieces built per §6, each readable with JS off and under reduced motion.
- [ ] Every stat tile and chart shows its source; no tile without one.
- [ ] Contact form per §7; no email address on the site.
- [ ] Responsive checks §8 and accessibility checks §10 pass.
