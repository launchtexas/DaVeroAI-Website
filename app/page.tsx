import { Hero } from "@/components/site/v4/hero";
import { Platforms } from "@/components/site/v4/platforms";
import { MILES, Problem } from "@/components/site/v4/problem";
import { WhyNow } from "@/components/site/v4/why-now";
import { Solutions } from "@/components/site/v4/solutions";
import { How } from "@/components/site/v4/how";
import { Pod } from "@/components/site/v4/pod";
import { Controls } from "@/components/site/v4/controls";
import { Pricing } from "@/components/site/v4/pricing";
import { About } from "@/components/site/v4/about";
import { Estimate } from "@/components/site/v4/estimate";
import { Assessment } from "@/components/site/v4/assessment";

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
        lede="DaVero AI orchestrates agents around existing ERP, procurement and supply chain systems, so platform investments deliver a higher return and AI moves from pilot to business results faster."
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
      <Solutions />
      <How />
      <Pod />
      <Controls />
      <Pricing />
      <About />
      <Estimate />
      <Assessment />
    </>
  );
}
