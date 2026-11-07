# DaVeroAI website: design spec

> Status: **DRAFT, sitemap provisional.** Waiting for `docs/brief.md`. Everything below the sitemap is still to be written. Owner: Designer.

## 1. Sitemap (provisional, locks when the brief lands)

| # | Page | Route | Sections, top to bottom |
|---|------|-------|--------------------------|
| 1 | Home | `/` | Hero, Problem, What DaVeroAI does, How it works (3 steps), Use cases, Proof [TBD], Final CTA |
| 2 | Product | `/product` | Overview, Features, Integrations [TBD], FAQ, CTA |
| 3 | Solutions | `/solutions` | Intro, one section per audience (audiences from brief), CTA |
| 4 | Pricing | `/pricing` | Only if the brief confirms public pricing. If not: no page, and the nav item becomes "Book a demo" |
| 5 | About | `/about` | Mission, Values, Team [TBD], CTA |
| 6 | Contact / Book a demo | `/contact` | Form + email address |
| 7 | Privacy, Terms | `/privacy`, `/terms` | Placeholder legal text |

**Global on every page**
- Header nav: Product, Solutions, Pricing (or omitted, see row 4), About, plus primary button "Book a demo" pointing to `/contact`.
- Footer: logo, page links, legal links, contact email, copyright.

**Section ids** (for anchors and for the Writer's headings in content.md): use kebab-case names of the sections above, for example `#how-it-works`, `#use-cases`, `#final-cta`.
