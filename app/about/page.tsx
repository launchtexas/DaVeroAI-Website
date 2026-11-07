import type { Metadata } from "next";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHead } from "@/components/site/section-head";

export const metadata: Metadata = {
  title: { absolute: "About Davero AI | Enterprise Agentic AI Engineering" },
  description:
    "Davero AI bridges the last mile of enterprise AI, taking intelligent systems from prototype into production across real operations.",
};

const principles = [
  ["Production, not prototypes.", "We build for real systems, processes and decisions, not demos."],
  [
    "Designed around your operations.",
    "AI engineering, enterprise consulting and systems integration, shaped to how you work.",
  ],
  ["People stay in control.", "Human oversight and human-in-the-loop are part of the design."],
  ["Secure by design.", "Access controls, auditability and policy enforcement from day one."],
];

// #team is hidden until real names and photos are supplied (docs/design.md §7).
export default function AboutPage() {
  return (
    <>
      <section id="mission" aria-labelledby="mission-title" className="section">
        <div className="container-narrow" data-reveal>
          <h1 id="mission-title" className="t-h1">
            Intelligence is easy. <span className="text-accent">Execution is everything.</span>
          </h1>
          <div className="t-lead mt-6 space-y-4">
            <p>We bridge the last mile of enterprise AI.</p>
            <p>
              The hardest part is not the demo. It is integrating intelligence into real systems, processes and
              decisions. That is the part we do.
            </p>
          </div>
        </div>
      </section>

      <section id="principles" aria-labelledby="principles-title" className="section">
        <div className="container-x">
          <SectionHead id="principles-title" eyebrow="Principles" title="How we work" />
          <ul className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-2">
            {principles.map(([title, body]) => (
              <li key={title} data-reveal className="card p-6 sm:p-8">
                <h3 className="t-h3">{title}</h3>
                <p className="mt-2 text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Let's Build Together" />
    </>
  );
}
