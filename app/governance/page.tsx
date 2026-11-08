import type { Metadata } from "next";
import { Bot } from "lucide-react";
import { CtaBand, PageHero, Quote, SectionHead } from "@/components/site/blocks";
import { HitlDemo } from "@/components/site/hitl-demo";
import { Tbd } from "@/components/site/tbd";
import { ACTORS_KEY, CLOSE_LINE, HITL_BAND, HITL_HEADLINE, actors, differentiators } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Governance: Humans Approve, Agents Do the Rest",
  description: "Agents prepare the work; your team reviews and approves; every action sits in the platform with a full audit trail.",
};

const platformNative = [
  { title: "Platform-native", body: differentiators[1].body },
  { title: "Human-validated", body: "Every change client-approved; controls stay with the client and auditor." },
  { title: "Full audit trail", body: "Every action sits inside the Platform, with a full audit trail." },
];

function ActorCard({ a }: { a: (typeof actors)[number] }) {
  const ours = a.who === "DaveroAI" || a.who === "DaveroAI pod";
  return (
    <li data-reveal className={cn("card !p-6", ours && "border-mark/60")}>
      <div className="flex items-center justify-between gap-3">
        <span className="t-mono text-faint">{a.key}</span>
        <span className={cn("chip t-mono", ours && "border-mark text-fg")}>{a.who}</span>
      </div>
      <h3 className="t-h3 mt-4">{a.name}</h3>
      <p className="t-small mt-2 text-muted-fg">
        {a.body} {"tbd" in a && a.tbd && <Tbd>{a.tbd}</Tbd>}
      </p>
    </li>
  );
}

export default function GovernancePage() {
  return (
    <>
      <PageHero eyebrow="Technology & governance" title={HITL_HEADLINE} lead={<p>{HITL_BAND.body}</p>} />

      <section id="hitl" aria-labelledby="hitl-title" className="section">
        <div className="container-x">
          <SectionHead id="hitl-title" eyebrow="Prepare · Review · Approve · Record" title="Human in the loop" />
          <HitlDemo variant="full" />
          <div className="mt-16 max-w-[60ch]">
            <Quote
              size="h3"
              text="AI agents doing finance work inside a real-time general ledger, with human approval and a full audit trail."
              by="Rillet, Series C announcement, Aug 2026"
            />
          </div>
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
          <p className="t-h3 mt-12 !font-light">
            {ACTORS_KEY}. <Tbd>conservative version; deck says &ldquo;defines, approves and runs&rdquo;</Tbd>
          </p>
          <p className="mt-4 text-muted-fg">Consultants keep their advisory and assurance role.</p>
        </div>
      </section>

      <section id="constitution" aria-labelledby="constitution-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHead id="constitution-title" eyebrow="Constitution" title="Hardened with a constitution" />
            <p className="t-lead">Rules, controls and edge cases that make the skill reliable.</p>
            <p className="mt-6 text-muted-fg">
              Our Forward Deployed Accountant builds the skill and writes its constitution.
            </p>
          </div>
          <div data-reveal className="self-center rounded-[var(--r-card)] border border-line bg-surface-2 p-6 font-mono text-sm sm:p-8 lg:col-span-6 lg:col-start-7">
            <p className="t-mono text-faint">constitution</p>
            <ol className="mt-4 space-y-3">
              {["Rules", "Controls", "Edge cases"].map((r, i) => (
                <li key={r} className="flex gap-4 border-b border-line pb-3 last:border-0">
                  <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="platform-native" aria-labelledby="pn-title" className="section">
        <div className="container-x">
          <SectionHead id="pn-title" eyebrow="Platform-native" title={HITL_BAND.title} />
          <ul className="grid gap-6 lg:grid-cols-3">
            {platformNative.map((p, i) => (
              <li key={p.title} data-reveal className="border-t border-line-strong pt-6">
                <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-3">{p.title}</h3>
                <p className="mt-3 text-muted-fg">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
