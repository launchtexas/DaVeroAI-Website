import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { CtaBand, PageHero, SectionHead } from "@/components/site/blocks";
import { HitlDemo } from "@/components/site/hitl-demo";
import { ACTORS_KEY, HITL_HEADLINE, actors } from "@/lib/content";
import { cn } from "@/lib/utils";

// Copy: docs/governance.md (six sections). Design principles only; no certification, audit or compliance claim.
export const metadata: Metadata = {
  title: "Technology & Governance | DaveroAI",
  description:
    "Human approval, clear responsibilities and traceable agent actions. Governance designed around your workflows, platform and data.",
};

const controls = [
  {
    title: "Access control",
    body: "Apply least privilege: give each person and agent only the access needed for its task. Separate preparation from approval; review and revoke permissions as responsibilities change.",
  },
  {
    title: "Monitoring",
    body: "Check model and agent performance against agreed acceptance criteria. Track errors, unexpected behaviour and changes in output quality; route exceptions to a named person.",
  },
  {
    title: "Change control",
    body: "Version prompts, models, tools and workflow rules. Test changes, document review and approval, and keep a rollback path before release.",
  },
  {
    title: "Incident response",
    body: "Define how to pause an agent, contain an issue, preserve evidence and notify responsible people. Investigate the cause and validate corrections before restarting.",
  },
];

const sources = [
  { n: 1, label: "NIST, AI RMF Playbook: Manage", href: "https://airc.nist.gov/airmf-resources/playbook/manage/" },
  { n: 2, label: "ISO, ISO/IEC 42001 explained", href: "https://www.iso.org/insights/iso-42001-explained" },
  {
    n: 3,
    label: "AICPA & CIMA, SOC 2 description criteria",
    href: "https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report",
  },
];

function Ref({ n }: { n: number }) {
  return (
    <sup>
      <a href={`#source-${n}`} className="link px-0.5 text-xs" aria-label={`Source ${n}`}>
        {n}
      </a>
    </sup>
  );
}

function ActorCard({ a }: { a: (typeof actors)[number] }) {
  const ours = a.who === "DaveroAI" || a.who === "DaveroAI pod";
  return (
    <li data-reveal className={cn("card !p-6", ours && "border-mark/60")}>
      <div className="flex items-center justify-between gap-3">
        <span className="t-mono text-faint">{a.key}</span>
        <span className={cn("chip t-mono", ours && "border-mark text-fg")}>{a.who}</span>
      </div>
      <h3 className="t-h3 mt-4">{a.name}</h3>
      <p className="t-small mt-2 text-muted-fg">{a.body}</p>
    </li>
  );
}

export default function GovernancePage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & governance"
        title={HITL_HEADLINE}
        lead={
          <p>
            Agents prepare the work. Your team keeps authority over the outcome. Our governance approach starts with clear
            responsibilities, defined boundaries and evidence you can review.
          </p>
        }
      />

      <section id="hitl" aria-labelledby="hitl-title" className="section">
        <div className="container-x">
          <SectionHead id="hitl-title" eyebrow="Prepare · Review · Approve · Record" title="Human in the loop" />
          <HitlDemo variant="full" />
          <p className="mt-10 max-w-[60ch] text-muted-fg">
            The audit trail should identify who did what, when, which version ran and what was approved. Protect logs against
            alteration, restrict access and agree retention periods. Capture the evidence needed to reconstruct decisions without
            copying unnecessary sensitive data.
          </p>
        </div>
      </section>

      <section id="actors" aria-labelledby="actors-title" className="section">
        <div className="container-x">
          <SectionHead id="actors-title" eyebrow="Who does what" title="Five actors around every agent" />
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {actors.slice(0, 3).map((a) => (
              <ActorCard key={a.key} a={a} />
            ))}
          </ul>
          <div aria-hidden="true" className="my-4 hidden items-center gap-4 lg:flex">
            <span className="h-px flex-1 bg-line-strong" />
            <span className="flex items-center gap-2 rounded-full border border-mark bg-surface-2 px-5 py-3">
              <Bot className="size-5 text-mark" strokeWidth={1.5} />
              <span className="t-mono text-fg">Agent</span>
            </span>
            <span className="h-px flex-1 bg-line-strong" />
          </div>
          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:mx-auto lg:mt-0 lg:w-2/3">
            {actors.slice(3).map((a) => (
              <ActorCard key={a.key} a={a} />
            ))}
          </ul>
          <p className="t-h3 mt-12 !font-light">{ACTORS_KEY}</p>
        </div>
      </section>

      <section id="constitution" aria-labelledby="constitution-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHead id="constitution-title" eyebrow="Constitution" title="Hardened with a constitution" />
            <p className="t-lead">Rules, controls and edge cases that make the skill reliable.</p>
            <p className="mt-6 text-muted-fg">
              The constitution defines permitted actions, required approvals and when to stop and escalate.
            </p>
            <p className="mt-6 text-muted-fg">
              <span className="font-medium text-fg">Frameworks we align with:</span> This approach is designed to align with the NIST
              Artificial Intelligence Risk Management Framework (AI RMF)
              <Ref n={1} />, ISO/IEC 42001
              <Ref n={2} /> and SOC 2 practices
              <Ref n={3} />.
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-6 lg:col-start-7">
            {controls.map((c, i) => (
              <li key={c.title} data-reveal className="flex gap-4 border-b border-line py-6">
                <span className="t-mono pt-1 text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h3">{c.title}</h3>
                  <p className="t-small mt-2 text-muted-fg">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="platform-native" aria-labelledby="pn-title" className="section">
        <div className="container-x">
          <SectionHead id="pn-title" eyebrow="Platform-native" title="Work inside your platform. Keep data within agreed boundaries." />
          <p className="max-w-[60ch] text-muted-fg">
            The design aim is for agents to run inside your platform and for business data to stay there. Confirm any model-provider or
            integration data flows before deployment. Limit collection to the task, define approved uses, protect sensitive fields and
            agree retention and deletion rules.
          </p>
        </div>
      </section>

      <CtaBand title="Start a conversation" lead="Bring a workflow. Define the approvals, data boundaries and evidence it needs." />

      <aside aria-labelledby="sources-title" className="container-x pb-16">
        <h2 id="sources-title" className="t-mono text-faint">
          Sources
        </h2>
        <ol className="t-small mt-3 space-y-1 text-muted-fg">
          {sources.map((s) => (
            <li key={s.n} id={`source-${s.n}`}>
              {s.n}.{" "}
              <a href={s.href} className="link" target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </>
  );
}
