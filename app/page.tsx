import { Hero } from "@/components/site/v4/hero";
import { Platforms } from "@/components/site/v4/platforms";
import { MILES, Problem } from "@/components/site/v4/problem";
import { WhyNow } from "@/components/site/v4/why-now";
import { FunctionCards } from "@/components/site/v4/solutions";
import { How, Pod } from "@/components/site/v4/how";
import { Controls } from "@/components/site/v4/controls";
import { Pricing } from "@/components/site/v4/pricing";
import { ATeam } from "@/components/site/v4/ateam";
import { Estimate } from "@/components/site/v4/estimate";
import { Assessment } from "@/components/site/v4/assessment";
import { ICONS } from "@/components/site/v4/icons";
import { functionHref } from "@/components/site/v4/nav";

// Copy verbatim from docs/source/design-v4.html, page-index.
export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Agentic AI for enterprise and mid-market companies"
        title={
          <>
            Own the
            <br />
            <span className="accent">Last Mile.</span>
          </>
        }
        lede="Davero AI agents extend enterprise platforms through the last mile, from system of record to business outcome. Designed alongside domain experts, managed end to end, and approved by process owners."
        chips
        flowTitle="Any last-mile workflow · Illustrative"
        steps={[
          { title: "Prepare", text: "Agent does the work end to end", who: "AGENT", kind: "agent" },
          { title: "Review & Validate", text: "Process owner reviews the work", who: "PROCESS OWNER" },
          { title: "Approve", text: "Sign-off stays with the process owner", who: "PROCESS OWNER" },
          { title: "Record", text: "Posted with a full audit trail", who: "PLATFORM", kind: "sys" },
        ]}
      />
      <Platforms
        systems="ERP, procurement and supply chain systems"
        existing={["ERP", "Procurement suite", "WMS and TMS", "Billing and revenue"]}
        outcomes={["Faster close", "Fewer exceptions", "Accurate inventory and cost", "Suppliers paid right"]}
      />
      <Problem
        title="The platform is live. The outcome still depends on manual work."
        lede={
          <>
            The <strong>last mile</strong> is everything between <em>“the software is live”</em> and <em>“the outcome is delivered”</em>: the
            domain-specific workflows in and around the core platform. Today these workflows run on disparate tools and manual effort. DaVero agents
            are purpose-built and <em>tightly coupled</em> to the platform.
          </>
        }
        zone1="Matches a native feature."
        zone3="Company-specific work beyond standard configuration, run today on disparate tools and manual effort."
        testTitle="Is it a last-mile workflow? Take the four-mile test."
        miles={MILES}
      />
      <WhyNow
        title="Buying AI is easy. Making it work inside enterprise operations isn't."
        stats={[
          { num: "40%+", text: "of agentic AI projects will be scrapped by end-2027", src: "Gartner via Reuters, Jun 2025", highlight: true },
          { num: "12%", text: "of finance teams run AI in core processes", src: "insightsoftware, 2026 (311 leaders)" },
          { num: "14%", text: "of mid-market CFOs fully trust AI with accounting data", src: "Wakefield Research, Feb 2026 (100 CFOs)" },
        ]}
      />
      <FunctionCards
        id="solutions"
        eyebrow="Solutions"
        title="Functions we support"
        lede="Each function is led by its own domain specialists, with a dedicated workflow library and controls playbook."
        firstRow={3}
        cards={[
          {
            href: functionHref("finance-accounting"),
            icon: ICONS.list,
            title: "Finance & Accounting",
            text: "Get to a faster, audit-ready close on AI-native ERPs.",
            bullets: ["Intercompany eliminations", "Entity reconciliations", "Revenue-recognition edge cases"],
            more: "Explore Finance & Accounting →",
          },
          {
            href: functionHref("supply-chain"),
            icon: ICONS.truck,
            title: "Supply Chain",
            text: "Clear the exceptions between warehouse, carrier, supplier and ledger.",
            bullets: ["Inventory and stock movement reconciliation", "Order fulfilment exceptions", "Landed-cost accruals"],
            more: "Explore Supply Chain →",
          },
          {
            href: functionHref("procurement"),
            icon: ICONS.bag,
            title: "Procurement",
            text: "Keep procure-to-pay moving without breaking internal controls.",
            bullets: ["Supplier onboarding", "Requisition-to-PO approvals", "PO-receipt-invoice exceptions"],
            more: "Explore Procurement →",
          },
          {
            href: functionHref("security-governance"),
            icon: ICONS.shield,
            title: "Security & Governance",
            text: "Keep access, compliance and risk controls current without manual overhead.",
            bullets: ["Access review and certification cycles", "Policy exception tracking", "Audit evidence collection"],
            more: "Explore Security & Governance →",
          },
          {
            href: functionHref("insurance"),
            icon: ICONS.doc,
            title: "Insurance",
            text: "Reduce manual effort across claims, bordereaux and premium workflows.",
            bullets: ["Claims exception triage", "Bordereaux reconciliation", "Premium and commission accruals"],
            more: "Explore Insurance →",
          },
        ]}
      />
      <How
        lede="Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside finance and operations leaders from day one."
        steps={[
          {
            kicker: "Step 1 · Weeks 1–5",
            title: "Embed",
            text: "A Forward Deployed Consultant embeds with the business, maps the process and identifies which last-mile workflows agents can take over.",
          },
          {
            kicker: "Step 2 · Within the 6–10 week embed",
            title: "Build & harden",
            text: "We turn each workflow into an agent skill, harden it with rules, controls and edge cases, and business owners validate it before go-live.",
          },
          {
            kicker: "Step 3 · Ongoing",
            title: "Run & improve",
            text: "We run, monitor and tune the agents every month, and every engagement adds to our workflow library.",
          },
        ]}
        note="Then we expand to the next workflow, entity or function. Advisory and assurance roles remain with existing advisors and auditors."
      />
      <Pod />
      <Controls />
      <Pricing />
      <ATeam />
      <Estimate />
      <Assessment title="How much of the operation still runs by hand?" />
    </>
  );
}
