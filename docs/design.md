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

_Sections 2–11 follow._
