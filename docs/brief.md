# DaVeroAI website: research brief

> Owner: Researcher (temp). Written 2026-11-07.
> Rule used: every fact below is quoted or summarised from a source named next to it. Anything not sourced is marked **Assumption**.

## 0. Sources and what was found

| Source | Result |
|---|---|
| Live site **https://daveroai.com** (fetched 2026-11-07) | One-page site, title "Davero AI \| Enterprise Intelligence, Delivered." This is the main source for this brief. |
| Web search "DaVeroAI", "DaVero AI", "davero.ai" (standard and extended) | **No third-party coverage found**: no press, LinkedIn, funding, directory or review listings. Results were only similarly named, unrelated companies (DaveAI / iamdave.ai, davero dialog GmbH, Davero Sonoma winery). |
| https://davero.ai | Did not load through our network proxy (502). The site's contact email uses this domain. Not verified. |
| README.md in this repo | Only lists doc owners; no business facts. |

Brand spelling: the live site writes **"Davero AI"** (logo "DAVERO AI."); the repo and team write "DaVeroAI". See Open Questions.

## 1. What Davero AI is and does

From daveroai.com:
- Meta description: "Davero AI builds and deploys multi-agent AI systems, enterprise automation, and last-mile AI solutions."
- Eyebrow: "Enterprise Agentic AI Engineering". (Agentic AI = AI agents that plan and carry out multi-step tasks, not just answer questions.)
- Hero: "Intelligence is easy. Execution is everything." / "We bridge the last mile of enterprise AI. From multi-agent orchestration to production deployment, Davero AI transforms complex business challenges into autonomous, intelligent workflows."
- How they describe the work: "We combine AI engineering, enterprise consulting, and systems integration to deliver intelligent solutions designed around your operations."

**Reading:** a services firm (consultancy plus engineering), not a self-serve software product. **Assumption** based on the copy and on there being no sign-up, pricing or product login on the site.

## 2. Target audience

From the site: enterprises. Industries listed under "Intelligence across every function":
Cybersecurity & SecOps · IT Service Management · Financial Services · Customer Experience · Enterprise Knowledge · Supply Chain · Automotive & Mobility · Business Operations · Data & Analytics.

**Assumption:** buyers are CIO/CTO, heads of IT operations, security, and digital transformation at mid-size to large companies that have tried AI pilots and want them in production. Company size and region are not stated anywhere.

## 3. Value proposition

Stated: getting enterprise AI past the demo stage and into real systems ("the last mile").
- "Beyond prototypes. Into production."
- "The hardest part of enterprise AI is not building a demo. It's integrating intelligence into real systems, processes, and decisions."
- Three hero proof points: Multi-Agent AI (intelligent orchestration), Enterprise-Ready (secure, scalable architecture), Last-Mile Delivery (from concept to operations).

## 4. Key offers (six services, verbatim titles from the site)

1. **Multi-Agent Systems** (Agentic AI): specialised agents that coordinate, reason, delegate and run complex workflows.
2. **Intelligent Automation**: manual processes turned into AI-driven workflows with human oversight.
3. **Enterprise AI Strategy** (Consulting): find high-value opportunities, adoption roadmaps, strategy to implementation.
4. **Enterprise Integration**: connect agents to existing APIs, data platforms, cloud and business apps.
5. **AI Platform Engineering**: production AI infrastructure with orchestration, observability, evaluation, scalable deployment.
6. **AI Security & Governance**: access controls, auditability, policy enforcement, human-in-the-loop.

**Process ("The Davero Approach")**, four steps: Discover/Understand → Architect/Design → Deploy/Execute → Optimize/Evolve.
The site also shows a simple diagram: Enterprise AI Orchestrator → Research, Operations, Security, Analytics agents → Enterprise APIs, Cloud & Data, Business Systems.

**Calls to action on the site:** "Let's Build Together", "Build with Davero", "Start a Conversation" → all go to `mailto:hello@davero.ai`. No form, no booking link.

**Not on the site (do not invent):** pricing, customers or logos, case studies, testimonials, numbers/metrics, team names, founding year, location, partnerships, certifications.

## 5. Reference sites (what to borrow)

Titles/descriptions below were fetched 2026-11-07. "Borrow" notes are recommendations, not facts about those sites' full content.

| Site | What it is (from its own meta tags) | Borrow |
|---|---|---|
| [Tribe AI](https://www.tribe.ai) | "Enterprise AI that ships, scales, and compounds… from ambition to production." | Closest positioning match (pilot → production). Borrow the outcome-led headline style and a case-study-first proof section. |
| [Fractional AI](https://www.fractional.ai) | "AI transformation, powered by engineering excellence." | Engineering-credibility framing: lead with how they build, named investors/partners as trust signals. Davero should only use trust signals it can prove. |
| [Faculty](https://faculty.ai) | "Frontier AI for the frontlines… driving real-world impact." | Industry pages with a problem → approach → outcome structure; good model for the Solutions page. |
| [Palantir AIP](https://www.palantir.com/platforms/aip/) | "Run LLMs and other models on your private network with full control." | Security/governance messaging aimed at enterprise risk owners; a dedicated trust/security section. |
| [Sierra](https://www.sierra.ai) | "Better, more human customer experiences with AI." | Clean, calm enterprise agent-product design; one clear CTA per page. Relevant for the Customer Experience use case. |

## 6. Recommended pages

Fits the provisional sitemap in `docs/design.md`, with these changes:
- **Home** `/`: keep. Hero, problem ("demos don't reach production"), six services, 4-step approach, industries, final CTA.
- **Services** (current `/product`): rename to "Services" or "What we do". **Assumption:** there is no single product to sell, so "Product" would mislead. One section per of the six offers; FAQ.
- **Solutions / Industries** `/solutions`: one section per industry (the nine above, or a shortlist; see Open Questions).
- **Approach** (`/approach` or a Home section): the 4 steps plus the orchestrator diagram.
- **Pricing:** drop. No public pricing exists; nav item becomes "Book a demo" / "Start a conversation", as `design.md` already plans.
- **About** `/about`: mission only until team/values are supplied.
- **Contact** `/contact`: form plus `hello@davero.ai` (verify the address first).
- **Privacy / Terms**: placeholders.
- Proof / case studies: leave out until real material exists.

## 7. Tone of voice

Observed on the site: confident, short declarative lines, engineering-led, enterprise vocabulary ("orchestration", "governance", "production"), punchy two-line headlines ("Intelligence is easy. Execution is everything."). Dark theme with a lime accent (`#b8ff70` on `#080b0a`).

Recommend: keep the confident, plain, outcome-first voice; cut buzzword stacking; back every claim with a concrete "how". No hype numbers unless sourced.

## 8. Open questions (for the client / god)

1. **No public footprint beyond the one-page site.** Web search found nothing else about Davero AI. Everything above comes from daveroai.com alone.
2. **Name and domain:** "Davero AI" (site) or "DaVeroAI" (repo)? Is the site at daveroai.com or davero.ai? Contact email is hello@davero.ai, but davero.ai did not load for us.
3. Is this a services firm only, or is there a product/platform coming? This decides "Product" vs "Services".
4. Company facts: founders/team, founding year, location, size.
5. Proof: any clients, case studies, metrics, testimonials, partners or certifications we may publish?
6. Industries: keep all nine, or focus on a few (e.g. Cybersecurity/SecOps, ITSM, Financial Services)?
7. Pricing or engagement model (pilot, retainer, fixed-scope) to show, if any?
8. Primary CTA: email, contact form, or a calendar booking link?
9. Is the existing site's look (dark + lime) the brand to keep, or is a new identity wanted? Any logo files?
10. Legal: who supplies Privacy and Terms text?
