# Davero AI website: copy

> Owner: Writer. Written 2026-11-07 from `docs/brief.md` (source: daveroai.com).
> Rules: lines in quotes or marked *(site)* are verbatim from daveroai.com. Nothing else states a fact the brief does not. Unknowns are **[TBD]**.
> Working defaults from god (may change): name "Davero AI"; services firm, so a **Services** page replaces Product; **no Pricing page**; all nine industries; main call to action (CTA) is the contact form plus hello@davero.ai; no clients, numbers, team or testimonials; Privacy and Terms are placeholders.
> Pages, routes and section ids match the locked sitemap in `docs/design.md` §1 (commit 88ea9bb).
> SEO title limit 60 characters, meta description limit 155.

---

## Global

### header
- Logo: "DAVERO AI." (accessible name: Davero AI, link to `/`)
- Nav: Services (`/services`) · Industries (`/industries`) · About (`/about`)
- Primary button: **Start a conversation** → `/contact`
- Mobile menu button label (screen readers): "Open menu" / "Close menu"
- Skip link: "Skip to main content"

### footer
- Tagline: "Enterprise Intelligence, Delivered." *(site title)*
- Links: Services · Industries · About · Contact
- Legal: Privacy · Terms
- Email: hello@davero.ai
- Copyright: © {year} Davero AI. [TBD: legal entity name, if different]

### Shared CTA labels (reuse, all from the site)
- "Start a Conversation" (primary)
- "Let's Build Together"
- "Build with Davero"

---

## Home `/`
- **SEO title:** Davero AI | Enterprise Intelligence, Delivered.
- **Meta description:** Davero AI builds and deploys multi-agent AI systems, enterprise automation, and last-mile AI solutions.

### #hero
- Eyebrow: "Enterprise Agentic AI Engineering"
- Headline: "Intelligence is easy. Execution is everything."
- Subhead: "We bridge the last mile of enterprise AI. From multi-agent orchestration to production deployment, Davero AI transforms complex business challenges into autonomous, intelligent workflows."
- Primary CTA: Start a conversation → `/contact`
- Secondary CTA: See our services → `/services`
- Proof points (three, from the site):
  - **Multi-Agent AI**: Intelligent orchestration
  - **Enterprise-Ready**: Secure, scalable architecture
  - **Last-Mile Delivery**: From concept to operations

### #problem
- Headline: "Beyond prototypes. Into production."
- Body: "The hardest part of enterprise AI is not building a demo. It's integrating intelligence into real systems, processes, and decisions."

### #services
- Headline: What we do
- Subhead: "We combine AI engineering, enterprise consulting, and systems integration to deliver intelligent solutions designed around your operations."
- Six cards (title / one line; full text on `/services`):
  1. **Multi-Agent Systems**: Specialised agents that coordinate, reason, delegate and run complex workflows.
  2. **Intelligent Automation**: Manual processes turned into AI-driven workflows, with human oversight.
  3. **Enterprise AI Strategy**: Find high-value opportunities and build a roadmap from strategy to implementation.
  4. **Enterprise Integration**: Connect agents to your existing APIs, data platforms, cloud and business apps.
  5. **AI Platform Engineering**: Production AI infrastructure with orchestration, observability, evaluation and scalable deployment.
  6. **AI Security & Governance**: Access controls, auditability, policy enforcement and human-in-the-loop.
- CTA: Explore services → `/services`

### #approach
- Headline: The Davero Approach
- Subhead: Four steps from first conversation to running system.
- Steps:
  1. **Discover**: Understand your operations and where AI adds the most value.
  2. **Architect**: Design the agents, integrations and controls.
  3. **Deploy**: Execute and put the system into production.
  4. **Optimize**: Measure, improve and evolve it over time.
- Diagram caption (also its text alternative): An Enterprise AI Orchestrator coordinates Research, Operations, Security and Analytics agents, which connect to Enterprise APIs, Cloud & Data, and Business Systems.

### #industries
- Headline: "Intelligence across every function" *(site)*
- Subhead: Where we apply agentic AI.
- Tiles (names only, each links to its section on `/industries`): Cybersecurity & SecOps · IT Service Management · Financial Services · Customer Experience · Enterprise Knowledge · Supply Chain · Automotive & Mobility · Business Operations · Data & Analytics
- CTA: See industries → `/industries`

### #cta
- Headline: "Let's Build Together"
- Body: Tell us the workflow you want to move from demo to production.
- Primary CTA: Start a conversation → `/contact`
- Secondary: or email hello@davero.ai

---

## Services `/services`
- **SEO title:** AI Engineering Services | Davero AI
- **Meta description:** Multi-agent systems, intelligent automation, AI strategy, integration, platform engineering and AI security & governance for the enterprise.

### #intro
- Headline: From strategy to production systems
- Subhead: "We combine AI engineering, enterprise consulting, and systems integration to deliver intelligent solutions designed around your operations."

One block per service (section ids below). Eyebrow in brackets where the site gives one.

1. `#multi-agent-systems` [Agentic AI]
   - Headline: Multi-Agent Systems
   - Body: Specialised AI agents that coordinate, reason and delegate to run complex workflows end to end.
2. `#intelligent-automation`
   - Headline: Intelligent Automation
   - Body: We turn manual processes into AI-driven workflows, with people kept in the loop where it matters.
3. `#ai-strategy` [Consulting]
   - Headline: Enterprise AI Strategy
   - Body: We find your high-value AI opportunities and build an adoption roadmap that runs from strategy to implementation.
4. `#enterprise-integration`
   - Headline: Enterprise Integration
   - Body: We connect agents to the systems you already run: APIs, data platforms, cloud and business applications.
5. `#platform-engineering`
   - Headline: AI Platform Engineering
   - Body: Production AI infrastructure with orchestration, observability, evaluation and scalable deployment.
6. `#security-governance`
   - Headline: AI Security & Governance
   - Body: Access controls, auditability, policy enforcement and human-in-the-loop, built in from the start.

### #approach
- Headline: How we work
- Steps (one line each): **Discover** your operations · **Architect** the agents, integrations and controls · **Deploy** into production · **Optimize** over time.
- Link: See the full approach → `/#approach`

### #faq
- **What does Davero AI do?** We design, build and deploy multi-agent AI systems and enterprise automation, and take them from prototype to production.
- **How does an engagement work?** Four steps: Discover, Architect, Deploy, Optimize.
- **Can you work with our existing systems?** Yes. Enterprise Integration connects agents to your existing APIs, data platforms, cloud and business applications.
- **How do you handle security and governance?** With access controls, auditability, policy enforcement and human-in-the-loop oversight.
- **What does it cost?** **[TBD]**: engagement model and pricing not published. Until confirmed: "Every engagement is scoped to your needs. Start a conversation to talk it through."

### #cta
- Headline: "Build with Davero"
- Primary CTA: Start a conversation → `/contact`

---

## Industries `/industries`
- **SEO title:** Enterprise AI by Industry | Davero AI
- **Meta description:** Agentic AI for SecOps, IT service management, financial services, customer experience, supply chain, data and more. See where Davero AI applies.

### #intro
- Headline: "Intelligence across every function"
- Subhead: Nine areas where we design and deploy agentic AI.

### Industry sections
Each: headline = industry name. Body = **[TBD]**: the site lists the industry only, with no use cases. Do not add examples until the client confirms them. Until then, use the one shared line below so no section is empty:
> Shared body: Multi-agent systems, automation and integration, designed around how your teams work. Start a conversation about your use case.

| Section id | Headline |
|---|---|
| `#cybersecurity` | Cybersecurity & SecOps |
| `#itsm` | IT Service Management |
| `#financial-services` | Financial Services |
| `#customer-experience` | Customer Experience |
| `#enterprise-knowledge` | Enterprise Knowledge |
| `#supply-chain` | Supply Chain |
| `#automotive` | Automotive & Mobility |
| `#business-operations` | Business Operations |
| `#data-analytics` | Data & Analytics |

Per-section link: Talk to us about [industry] → `/contact?industry=<section id>`

### #cta
- Headline: Don't see your function?
- Body: Tell us the process. We'll tell you where agents fit.
- Primary CTA: Start a conversation → `/contact`

---

## Pricing
No page (god's default: no public pricing). Nav has no Pricing item.

---

## About `/about`
- **SEO title:** About Davero AI | Enterprise Agentic AI Engineering
- **Meta description:** Davero AI bridges the last mile of enterprise AI, taking intelligent systems from prototype into production across real operations.

### #mission
- Headline: "Intelligence is easy. Execution is everything."
- Body: "We bridge the last mile of enterprise AI." The hardest part is not the demo. It is integrating intelligence into real systems, processes and decisions. That is the part we do.

### #principles
- Headline: How we work
- Principles (each restates a claim on the site):
  1. **Production, not prototypes.** We build for real systems, processes and decisions, not demos.
  2. **Designed around your operations.** AI engineering, enterprise consulting and systems integration, shaped to how you work.
  3. **People stay in control.** Human oversight and human-in-the-loop are part of the design.
  4. **Secure by design.** Access controls, auditability and policy enforcement from day one.
- Formal company values: **[TBD]** if the client supplies them.

### #team
**[TBD]**: no team, founders, founding year or location published. Hide this section until supplied.

### #cta
- Headline: "Let's Build Together"
- Primary CTA: Start a conversation → `/contact`

---

## Contact `/contact`
- **SEO title:** Contact Davero AI | Start a Conversation
- **Meta description:** Tell us about the AI workflow you want in production. Contact Davero AI through the form or at hello@davero.ai.

### #intro
- Headline: "Start a Conversation"
- Subhead: Tell us what you want to build. We'll reply by email. Reply time: **[TBD]**.

### #form
- Fields (label / required / hint):
  - Name / required
  - Work email / required
  - Company / required
  - Industry / optional / select: the nine industries from `/industries`, plus "Other". Pre-select from `?industry=`.
  - What do you want to build? / required / hint: "A sentence or two is enough."
- Consent line under the button: By sending this form you agree to our Privacy Policy. (link → `/privacy`)
- Submit button: Send message · while sending: "Sending…"
- Validation messages:
  - Empty required field: "Please enter your [field name]."
  - Bad email: "Please enter a valid email address, like name@company.com."
  - Error summary at top (when several fail): "Please fix the [n] fields marked below."
- Success: "Thanks. Your message is on its way. We'll reply by email."
- Failure: "Your message didn't send. Please try again, or email us at hello@davero.ai."

### #email
- Headline: Prefer email?
- Body: Write to hello@davero.ai. **[TBD: confirm this address works; the brief could not load davero.ai]**

---

## Privacy `/privacy`
- **SEO title:** Privacy Policy | Davero AI
- **Meta description:** How Davero AI handles personal information.
- Headline: Privacy Policy
- Body: **[TBD: placeholder. Legal text to be supplied by the client.]** Questions: hello@davero.ai
- Last updated: [TBD]

## Terms `/terms`
- **SEO title:** Terms of Use | Davero AI
- **Meta description:** The terms that apply to using the Davero AI website.
- Headline: Terms of Use
- Body: **[TBD: placeholder. Legal text to be supplied by the client.]** Questions: hello@davero.ai
- Last updated: [TBD]

## 404
- Headline: Page not found
- Body: The page you're looking for doesn't exist or has moved.
- Links: Back to home → `/` · Contact us → `/contact`
