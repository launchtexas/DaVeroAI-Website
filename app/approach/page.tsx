import type { Metadata } from "next";
import { ArrowLink, CtaBand, Eyebrow, PageHero, PodCards, Quote, SectionHead } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { SkillLoop } from "@/components/site/skill-loop";
import { StepStory } from "@/components/site/step-story";
import { CLOSE_LINE, ENGAGEMENT_RESULT, GOLDEN_RULE, LIBRARY_LINE, POD_LINE, actors, engagement } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Approach: How an Engagement Runs | DaVero AI",
  description:
    "Five steps from the first conversation to a skill running inside the platform: engage, build, harden with a constitution, converge, review.",
};

const loop = [
  { title: "Develop", body: "Skills are built and hardened in a factory setting." },
  { title: "Reuse", body: "Each hardened skill becomes a reusable asset in the DaVero AI skill library for the next client." },
  { title: "Redeploy", body: "Forward Deployed Consultants move to the next client or process as skills mature." },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero art={<PageArt kind="stairs" />}
        eyebrow="Our approach"
        title="Our Approach"
        lead={<p>Five steps from the first conversation to a skill running inside the platform.</p>}
      />

      <section id="engagement" aria-labelledby="engagement-title" className="section band-paper">
        <div className="container-x">
          <StepStory
            id="step"
            head={
              <>
                <Eyebrow className="mb-5">The engagement</Eyebrow>
                <h2 id="engagement-title" className="t-h2">
                  How an engagement runs
                </h2>
              </>
            }
            steps={engagement.map((s, i) => ({ ...s, highlight: i === 2 }))}
            footer={<p className="t-h3 mt-10 !font-medium">{ENGAGEMENT_RESULT}</p>}
          />
        </div>
      </section>

      <section id="golden-rule" aria-labelledby="golden-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="golden-title" eyebrow="Our approach" title="The golden rule" />
          <ol className="border-t border-line">
            {GOLDEN_RULE.map((l, i) => (
              <li key={l} data-reveal className="flex gap-6 border-b border-line py-6">
                <span className="t-mono pt-3 text-mark">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-h2 max-w-none">{l}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="skill-factory" aria-labelledby="factory-title" className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              id="factory-title"
              eyebrow="Built to scale"
              title="Built to scale: the skill factory"
              lead="Capacity grows with the skill library, not linear headcount."
            />
            <p id="loop-cap" className="t-h3 !font-medium">
              {LIBRARY_LINE}
            </p>
            <ol className="mt-8 border-t border-line">
              {loop.map((l, i) => (
                <li key={l.title} className="flex gap-4 border-b border-line py-4">
                  <span className="t-mono pt-1 text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="font-medium">{l.title}</span>
                    <span className="block text-muted-fg">{l.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <SkillLoop />
        </div>
      </section>

      <section id="pod" aria-labelledby="pod-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="pod-title" eyebrow="The delivery pod" title="Led by the Forward Deployed Consultant" />
          <PodCards />
          <p className="t-h3 mt-10 !font-medium">{POD_LINE}</p>
        </div>
      </section>

      <section id="actors" aria-labelledby="actors-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="actors-title" eyebrow="Governance" title="Five actors around every agent" />
          <ul className="flex flex-wrap gap-3">
            {actors.map((a) => (
              <li key={a.key} className="chip t-mono min-h-11 px-4">
                <span className="text-faint">{a.key}</span> {a.name}
              </li>
            ))}
          </ul>
          <ArrowLink href="/governance#actors" className="mt-8">
            How governance works
          </ArrowLink>
          <div className="mt-16 max-w-[60ch]">
            <Quote
              size="h3"
              text="Finance teams are becoming product managers… we’re watching the finance engineer take shape."
              by="Nick Kopp, CEO, Rillet · Oct 2026"
            />
          </div>
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
