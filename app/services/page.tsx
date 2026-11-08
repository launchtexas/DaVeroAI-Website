import type { Metadata } from "next";
import { Check } from "lucide-react";
import { ArrowLink, ChallengeRows, CtaBand, PageHero, SectionHead } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services: Implement, Build, Run Agents | DaVero AI",
  description:
    "Platform implementation through first close, agents for reconciliations, accruals and audit prep, and managed agents that improve after go-live.",
};

const models = [
  { name: "Deployment", line: "A 6–10 week embed per workflow set." },
  { name: "Agent subscription", line: "Agents we own and run, for your team." },
  { name: "Managed outcome", line: "“Close-as-a-service” and revenue ops." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero art={<PageArt kind="layers" />}
        eyebrow="Services"
        title="From first close to agents that keep getting better."
        lead={
          <p>
            One platform and one partner, from first close to agents that keep getting better.
          </p>
        }
      />

      <section id="service-lines" aria-labelledby="lines-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="lines-title" eyebrow="Service lines" title="Implement · Build agents · Run and tune" />
          <ol>
            {services.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className="mb-6 motion-safe:lg:sticky"
                style={{ top: `calc(var(--header-h) + 32px + ${i * 16}px)` }}
              >
                <article className="card grid gap-10 lg:min-h-[480px] lg:grid-cols-12 lg:gap-6 lg:p-12">
                  <div className="lg:col-span-7">
                    <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="t-h2 mt-6">{s.title}</h3>
                    <p className="t-lead mt-6">{s.line}</p>
                    <p className="mt-8 flex gap-2 text-lg font-medium">
                      <Check aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-mark" />
                      <span>
                        <span className="sr-only">Outcome: </span>
                        {s.outcome}
                      </span>
                    </p>
                  </div>
                  {s.agents && (
                    <div className="self-end rounded-[var(--r-box)] border border-line bg-surface-2 p-6 lg:col-span-4 lg:col-start-9">
                      <h4 className="t-mono text-faint">Agents we build</h4>
                      <ul className="mt-4">
                        {s.agents.map((a) => (
                          <li key={a} className="flex items-center gap-3 border-b border-line py-3 last:border-0">
                            <span aria-hidden="true" className="dot bg-mark" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="challenges" aria-labelledby="challenges-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="challenges-title" eyebrow="Why it matters" title="Top five challenges and our response" />
          <ChallengeRows />
        </div>
      </section>

      <section id="engagement-models" aria-labelledby="models-title" className="section">
        <div className="container-x">
          <SectionHead id="models-title" eyebrow="Engagement models" title="How we engage" />
          <ul className="grid gap-6 lg:grid-cols-3">
            {models.map((m, i) => (
              <li key={m.name} data-reveal className="card">
                <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-6">{m.name}</h3>
                <p className="mt-3 text-muted-fg">{m.line}</p>
              </li>
            ))}
          </ul>
          <p className="t-small mt-6 text-muted-fg">Scope and terms agreed per engagement.</p>
        </div>
      </section>

      <section id="approach-link" aria-labelledby="approach-link-title" className="pb-[var(--section-y)]">
        <div className="container-x">
          <div className="flex flex-col gap-4 border-y border-line py-8 md:flex-row md:items-center md:justify-between">
            <h2 id="approach-link-title" className="t-h3">
              Five steps from the first conversation to a skill running inside the platform.
            </h2>
            <ArrowLink href="/approach" className="shrink-0">
              See how an engagement runs
            </ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand title="Tell us your last-mile workflow" />
    </>
  );
}
