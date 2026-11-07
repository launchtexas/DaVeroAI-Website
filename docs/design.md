# Davero AI website: design spec

> Owner: Designer. Source of truth for the Builder. Inputs: `docs/brief.md` and the live site daveroai.com (fetched 2026-11-07).
> Status: **Sitemap LOCKED.** Rest of spec follows below.

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
