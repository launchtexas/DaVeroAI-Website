import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { SectionHead } from "@/components/site/section-head";
import { Steps } from "@/components/site/steps";
import { Tbd } from "@/components/site/tbd";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: { absolute: "AI Engineering Services | Davero AI" },
  description:
    "Multi-agent systems, intelligent automation, AI strategy, integration, platform engineering and AI security & governance for the enterprise.",
};

const faq: { q: string; a: React.ReactNode }[] = [
  {
    q: "What does Davero AI do?",
    a: "We design, build and deploy multi-agent AI systems and enterprise automation, and take them from prototype to production.",
  },
  { q: "How does an engagement work?", a: "Four steps: Discover, Architect, Deploy, Optimize." },
  {
    q: "Can you work with our existing systems?",
    a: "Yes. Enterprise Integration connects agents to your existing APIs, data platforms, cloud and business applications.",
  },
  {
    q: "How do you handle security and governance?",
    a: "With access controls, auditability, policy enforcement and human-in-the-loop oversight.",
  },
  {
    q: "What does it cost?",
    a: (
      <>
        <Tbd /> Every engagement is scoped to your needs. Start a conversation to talk it through.
      </>
    ),
  },
];

export default function ServicesPage() {
  return (
    <>
      <section id="intro" aria-labelledby="intro-title" className="section">
        <div className="container-x">
          <SectionHead
            as="h1"
            id="intro-title"
            title="From strategy to production systems"
            lead="We combine AI engineering, enterprise consulting, and systems integration to deliver intelligent solutions designed around your operations."
          />
          <nav aria-label="Services on this page" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="tag">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {services.map(({ id, title, body, eyebrow, icon: Icon }, i) => (
        <section key={id} id={id} aria-labelledby={`${id}-title`} className="section">
          <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-6" data-reveal>
            <div className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
              <h2 id={`${id}-title`} className="t-h2">
                {title}
              </h2>
              <p className="t-lead mt-5">{body}</p>
            </div>
            <div
              aria-hidden="true"
              className={cn(
                "card hidden aspect-[7/4] items-center justify-center lg:col-span-6 lg:flex",
                i % 2 === 0 ? "lg:col-start-7" : "lg:order-1 lg:col-start-1",
              )}
              style={{ background: "var(--glow), var(--surface)" }}
            >
              <span className="flex size-20 items-center justify-center rounded-md bg-surface-2">
                <Icon strokeWidth={1.5} className="size-10 text-accent" />
              </span>
            </div>
          </div>
        </section>
      ))}

      <section id="approach" aria-labelledby="approach-title" className="section">
        <div className="container-x">
          <SectionHead id="approach-title" eyebrow="Approach" title="How we work" />
          <div className="mt-12">
            <Steps variant="short" />
          </div>
          <Link href="/#approach" className="link mt-10 inline-flex min-h-11 items-center font-semibold">
            See the full approach
          </Link>
        </div>
      </section>

      <section id="faq" aria-labelledby="faq-title" className="section">
        <div className="container-narrow">
          <SectionHead id="faq-title" eyebrow="FAQ" title="Questions" />
          <div className="faq mt-10 border-t border-line">
            {faq.map((f) => (
              <details key={f.q} className="border-b border-line">
                <summary>
                  <h3>{f.q}</h3>
                  <Plus aria-hidden="true" className="size-5 shrink-0 text-accent" />
                </summary>
                <p className="prose-body pb-6 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Build with Davero" />
    </>
  );
}
