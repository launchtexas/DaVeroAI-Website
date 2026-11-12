# v4 page and section map

> Integration (worker-davero-v4-integrate): the site ships the mock 1:1, including every `[placeholder]`, the
> placeholder A-Team cards, the "+7" bench, the employer logos and the "Davero" spelling. The "Copy that conflicts
> with the rules" list below records open questions for the client; it is not what was built.

Source: `docs/source/design-v4.html` (7 pages switched by `navTo()`). Copy for the five function pages is in
`lib/functions.ts`, extracted verbatim by script from the mock (only what differs from `page-index`).

## Routes

| Mock page | v4 route | Content source |
|---|---|---|
| `page-index` | `/` | home (core builder) |
| `page-finance-accounting` | `/finance-accounting` | `FUNCTION_PAGES[0]` |
| `page-supply-chain` | `/supply-chain` | `FUNCTION_PAGES[1]` |
| `page-procurement` | `/procurement` | `FUNCTION_PAGES[2]` |
| `page-security-governance` | `/security-governance` | `FUNCTION_PAGES[3]` |
| `page-insurance` | `/insurance` | `FUNCTION_PAGES[4]` |
| `page-contact` | `/contact` | existing contact backend; one `contact-card` with h1 "Start a conversation" |

`navTo(page, anchor)` becomes `href="/page#anchor"` (`index` is `/`). Header, mobile menu and footer are shared by
every page. Header: "Functions we support" dropdown (5 function pages), Why Now `/#why-now`, How we work
`/#how`, Controls `/#controls`, About `/#about`, Estimate Savings `/#estimate`, CTA "Book an assessment" `/contact`.
Mobile menu adds Home and drops Controls. Footer columns: Solutions (5 pages), Company (How we work, Controls,
About, Contact), Legal (Privacy, Terms, Security: the mock links are `#`, point them at `/privacy`, `/terms`,
`/security`, which stay).

## Sections per page, in order

`S` = shared markup and copy with home, `V` = shared markup, copy varies per page (in `lib/functions.ts`),
`H` = home only, `F` = function pages only.

| # | Home (`page-index`) | Function pages | Kind | Notes |
|---|---|---|---|---|
| 1 | hero (`section.dark`, no id) | hero | V | Function hero adds breadcrumb `Home / <label>`, h1 first line `Own the last mile` (FUNCTION_SHARED.heroTitle) + orange `titleAccent`; drops the home chip row; flow card title, subtitle and step text/who vary; `lede-sub`, tagline, buttons, flow "done" line are shared. "See how it works" goes to `#how` on the same page. |
| 1b | logo strip (`.strip`, inside hero) | strip | V | Label + platform names + muted `tbd` text. |
| 2 | `#platforms` | `#platforms` | V | Lede, "Existing platforms" list and "Business outcomes" list vary; eyebrow, h2, middle layer, 3 benefit cards, signoff shared. |
| 3 | `#problem` | `#problem` | V | h2, lede, zone body texts and four-mile test title + gates vary; zone tags/titles, test hint, result title/copy shared. Each page's test needs its own DOM id (mock uses lmt1..lmt6). |
| 4 | `#why-now` | `#why-now` | V | h2 and stats vary (home 3, finance 4, others 3); time-to-value chart, legend and signoff shared. |
| 5 | `#solutions` | — | H | "Functions we support", 3+2 link cards to the function pages. |
| 5 | — | `#workflows` | F | Eyebrow "Workflows we own" (shared), h2, lede, 3 cards with icon + list. |
| 6 | — | `#agents-at-work` | F | Copy column + KPIs shared (FUNCTION_SHARED.agentsAtWork); feed label and 6 events vary. Mock shows 5 rows and prepends one every 2600 ms; no animation under reduced motion. Render rows as React, not `innerHTML`. |
| 7 | `#how` | `#how` | V | Lede, step bodies and the "Then we expand" line vary; kickers and titles shared. |
| 7b | pod (`section`, no id) | — | H | "One pod per client" 3 role cards. |
| 8 | `#controls` (dark) | `#controls` | V | Only card 1 varies (`controls.firstCard`). |
| 9 | `#pricing` | `#pricing` | V | Only the "Managed outcome" card body varies. No prices anywhere. |
| 10 | `#about` (A-Team) | `#about` | S | Identical except the bench link goes to the current page's `#assessment`. |
| 11 | — | explore (`section.alt`, no id) | F | "Explore other areas", 4 cards = the other four function pages. |
| 12 | `#estimate` | `#estimate` | V | Only the hint under "People doing manual last-mile work" varies. Calculator identical. |
| 13 | `#assessment` (dark) | `#assessment` | V | h2 and first deliverable vary; lede and button shared. |

## Old routes and v4 redirects

All permanent (308) in `next.config.ts` `redirects()`.

| Old route | v4 target | Why |
|---|---|---|
| `/agentic-ai` | `/#problem` | "What is the last mile?" is now the problem section. |
| `/services` | `/#how` | Implement/build/run is now "How we work" + pricing. |
| `/approach` | `/#how` | Engagement steps live in `#how`. |
| `/governance` | `/#controls` | Technology & governance is now the Controls section. |
| `/industries` | `/#solutions` | Replaced by the five function pages, listed in `#solutions`. |
| `/insights` | `/#why-now` | Market data now sits in Why Now. |
| `/about` | `/#about` | Founder now in the A-Team section. |

Keep: `/contact`, `/privacy`, `/terms`, `/cookies`, `/legal`, `/security`, `/api/contact`. A `#fragment` in the redirect
destination is kept by the browser, so the anchors above work.

## Copy that conflicts with the rules

1. **Placeholder people (rule: no fake people).** Every page's A-Team shows 3 `[Full name]` / `[Role]` /
   `[Company]` / `[URL to add]` cards. Omit them; render Hemang Bhatt only (`public/images/hemang-bhatt.jpg`, the
   mock's embedded photo is the same person). The bench line "+7 Specialist profiles ready to scale with each
   engagement." implies unnamed staff; god to decide whether to keep.
2. **Logos.** Hemang's card shows JPMorgan Chase, American Express and Oracle logos (embedded `data:` images) as
   past employers. Not client or platform logos, but they are third-party marks: god to confirm before shipping;
   if kept, move them to `public/images/v4/`.
3. **Platform names.** Home and Finance strips name "Rillet" and "Tabs" ("Built for AI-native platforms") plus
   "More coming soon +". Text only, no logos, but it implies a partnership: confirm with the client.
4. **Bracketed placeholders on 4 function pages** (supply chain, procurement, security & governance, insurance):
   - strip `tbd`: "[Platform names to confirm]" → render the label only, drop the `tbd` span.
   - two why-now stats each with `value: "[Sourced stat]"`, `source: "[Source to add]"` (flagged
     `placeholder: true`) → omit them; those pages then show one stat (the Gartner 40%+). Rule: third-party
     stats only with a source.
5. **Spelling.** Home hero lede says "Davero AI agents extend…"; the brand is "DaVero AI". Fix to "DaVero AI".
6. **Pricing figures.** The pricing section has no prices (fine). The estimate calculator shows default dollar
   figures ($110K loaded cost, $308K, $154K, 5,824 hours); they are user-adjustable inputs labelled
   "Illustrative estimate… Not a quote", not prices. Keep, unless god rules out any dollar figure.
7. **Unsourced numbers.** Agents-at-work KPIs ("100% of agent actions logged", "0 posted without sign-off") are
   product claims, not client results; feed events are labelled "Sample activity for illustration. Not client
   data." Keep as in the mock.
8. **Mock banner.** "Clickable design mockup · not the live site · [bracketed] items need confirmation" is mock
   chrome; do not ship it.
9. **Inline scripts / `innerHTML`.** The mock's per-section `<script>` blocks (feed, four-mile test, chart,
   calculator, dropdown) must become React client components (site rule: no inline scripts).

## Not in `lib/functions.ts`

Copy shared with home (benefit cards, zone tags, controls cards 2-4, pricing cards 1-2, A-Team, calculator
labels, chart) belongs to the home content owner. `metadata.title` uses the existing `"<Label> | DaVero AI"`
pattern; the mock has a single `<title>DaVero AI</title>`, so `metadata.description` reuses each hero lede.
