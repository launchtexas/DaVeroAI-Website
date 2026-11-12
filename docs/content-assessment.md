# v4 content assessment

QA + content pass of the v4 site (main at 03849a3), 2026-11-12. Read against `docs/source/design-v4.html`,
`docs/source/content-brief.txt` (deck), `docs/content.md` and `docs/brand-compliance.md`.

## Fixed directly

| Page | Section | Was | Now |
|---|---|---|---|
| All | `<meta description>` (Home, 5 function pages) | 186–212 characters, cut off in search results | Rewritten to ≤ 155 (content.md rule) |
| Home | Problem lede | "DaVero agents are purpose-built" | "DaVero AI agents…" (brand name) |
| Home + function pages | Platforms kicker / label | "DaVero agents" | "DaVero AI agents" |
| Home + function pages | Problem, zone 3 heading | "The Last Mile" (other zone headings are sentence case) | "The last mile" |
| All | Header and mobile menu | "Why Now", "Estimate Savings" next to "How we work", "Functions we support" | "Why now", "Estimate savings" |
| Contact | "What you get" list | "Its own last-mile workflows automated", "Client teams move to higher-value work" (third person on a page that says "your") | "Your own…", "Your teams…" |
| Contact | "What happens next" step 1 | "We reply" | "We reply within one business day" (same promise as the success message) |
| Contact | `<title>` | "Start a Conversation" | "Start a conversation" (matches the h1) |
| Procurement | Hero strip | "Built around existing procurement suite and ERP" | "…procurement suites and ERP" |
| Security & Governance | Hero flow, step 4 | "Decision logged in GRC platform with full audit trail" | "…in the GRC platform with a full audit trail" |
| Insurance | Hero flow, step 4 | "Decision logged in policy admin system with full audit trail" | "…in the policy admin system with a full audit trail" |

## Needs the client's decision

Ranked by risk to a live launch.

| # | Page | Section | Issue | Suggested fix |
|---|---|---|---|---|
| 1 | Home + all function pages | Controls, card 1 | "Management and external auditors retain control ownership." External auditors do not own a company's controls (their independence depends on it); an auditor or CFO reading this will notice. | "Management keeps control ownership; external auditors keep their assurance role." |
| 2 | Home + all function pages | Controls cards 2–4, Platforms card 3, Pricing card 2, Agents at work KPIs | Product claims stated as fact with no source: "encrypted in transit and at rest", "never used to train shared models", "scoped, revocable credentials", "can be paused instantly", "optimize token usage", "100% of agent actions logged", "0 posted without sign-off". | Confirm each is true of the product today; drop or soften any that are not. They also feed the /security page. |
| 3 | Supply Chain, Procurement, Security & Governance, Insurance | Why now | Headline says "<function> teams are stretched, and AI alone isn't closing the gap", but the only stat left (after the placeholders were removed) is Gartner's 40%+ of agentic AI projects scrapped. Nothing supports "teams are stretched", and one stat makes the section thin. | Supply one sourced stat per function on team capacity, or retitle to "AI projects stall without delivery" to match the Gartner stat. |
| 4 | Home + all function pages | How we work kickers vs Pricing | "Step 1 · Weeks 1–5", "Step 2 · Within the 6–10 week embed", Pricing "A 6–10 week embed per workflow set". Reads as both "the embed is weeks 6–10" and "the embed lasts 6–10 weeks". | If the embed is 6–10 weeks in total: "Step 1 · Weeks 1–5", "Step 2 · Weeks 6–10", "Step 3 · Ongoing". |
| 5 | Finance & Accounting | How we work | Uses "Forward Deployed Accountant"; every other page and the Home pod use "Forward Deployed Consultant" (the deck uses Accountant, content.md says one vocabulary: Consultant). | Pick one. If Accountant is the finance-specific title, add it to the Home pod card; otherwise change to Consultant. |
| 6 | Home | Solutions lede | "Each function is led by its own domain specialists, with a dedicated workflow library and controls playbook." The A-Team shows one named person; a buyer can check this. | Confirm, or soften to "Each function draws on domain specialists and a growing workflow library." |
| 7 | Home, Finance & Accounting | Hero strip | "Built for AI-native platforms: Rillet, Tabs, More coming soon +" reads as a partnership. content.md said Rillet only in attributed quotes, never as a partner (also v4-map item 3). | Confirm a partnership or written permission; otherwise use a generic label as the other function pages do. |
| 8 | Insurance | Hero title | "Own the last mile of claims processing." The page also covers bordereaux, reinsurance and premium accruals. | "…of insurance operations." |
| 9 | All | Hero tagline | "Business-approved, Expert-built, Fully managed": capitals mid-list. | "Business-approved. Expert-built. Fully managed." or all lower case after the first word. |
| 10 | All | CTA wording | Four versions: "Book an assessment" (header), "Book a last-mile assessment" (hero, test, final CTA), "Validate it in a last-mile assessment" (estimate), "Start a conversation" (contact h1; content.md's old rule for every CTA). | Fine as is if intentional; otherwise use "Book a last-mile assessment" everywhere except the short header button. |

## Checked, no issue

- Numbers agree across pages: 61% (Controllers Council), 340K (Sequoia), 12% (insightsoftware), 14% (Wakefield), 40%+ (Gartner via Reuters) have the same value, wording and source wherever they appear; each carries a source.
- Estimate: defaults ($308K, $154K, 2,912 hours) match the formula (people × time share × loaded cost; hours = people × share × 2,080 × agent share). No prices anywhere.
- Feed rows are labelled "Sample activity for illustration. Not client data."; flows and the chart are labelled "Illustrative".
- No `[bracketed]` placeholders remain on any page; every image has alt text; one h1 per page; metadata titles follow "<Page> | DaVero AI".
- Brand name: no "Davero" or "DaveroAI" left in rendered copy.
