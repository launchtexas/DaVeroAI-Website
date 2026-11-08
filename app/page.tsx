import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowLink,
  ChallengeRows,
  ClosingCta,
  ComparisonTable,
  CtaButton,
  Differentiators,
  Eyebrow,
  GoldenRule,
  Journey,
  SectionHead,
  WhereWhatHow,
} from "@/components/site/blocks";
import { Arbitrage } from "@/components/site/arbitrage";
import { HeroArt, HeroStripes, StripeBand } from "@/components/site/art";
import { HitlDemo } from "@/components/site/hitl-demo";
import { LastMile } from "@/components/site/last-mile";
import { StatTiles } from "@/components/site/stat-tiles";
import { StepStory } from "@/components/site/step-story";
import {
  HITL_BAND,
  HITL_HEADLINE,
  LIBRARY_LINE,
  PLATFORMS,
  POD_LINE,
  STATS_KEY_LINE,
  STATS_TAKEAWAY,
  arbitrage,
  engagement,
  outcomes,
  services,
  stats,
} from "@/lib/content";

// Home §9 (Insights teaser) renders only when posts exist (design.md §1.2). None are published yet.
const posts: { title: string }[] = [];

export default function Home() {
  return (
    <>
      {/* 1 Hero */}
      <section id="hero" aria-labelledby="hero-title" className="hero flex min-h-[min(900px,100svh)] flex-col">
        <HeroStripes />
        <div className="container-x grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-6">Agentic AI &middot; Finished outcomes</Eyebrow>
            <h1 id="hero-title" className="t-display">
              Own the <span className="text-mark">Last Mile</span>
            </h1>
            <p className="t-lead mt-8">
              DaVero AI is an agentic AI company that turns your business platforms into finished, end-to-end workflows, built, run and
              continuously improved by AI agents, with your team approving every result.
            </p>
            <p className="mt-4 font-medium">Not software seats. Not billable hours.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CtaButton />
              <Button asChild variant="secondary" className="max-sm:w-full">
                <Link href="/agentic-ai">What is the last mile?</Link>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6">
            <HeroArt />
          </div>
        </div>
        <p className="container-x t-mono mt-12 text-faint">Built, run and improved by agents &middot; Approved by your team</p>
      </section>

      {/* 2 Evolution */}
      <section id="evolution" aria-labelledby="evolution-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="evolution-title" eyebrow="The shift" title="Platforms deliver the capability. DaVero AI delivers the finished outcome" />
          <div data-reveal>
            <ComparisonTable />
          </div>
          <h3 className="t-h3 mt-24 mb-8">{arbitrage.title}</h3>
          <Arbitrage />
        </div>
      </section>

      {/* 3 Challenges (paper band) */}
      <section id="challenges" aria-labelledby="challenges-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead
            id="challenges-title"
            eyebrow="Why now"
            title="Demand is rising and DIY AI is stalling"
            lead={<>Everything between &ldquo;the software is live&rdquo; and &ldquo;the final outcome is delivered.&rdquo;</>}
          />
          <LastMile variant="compact" />

          <div className="mt-24">
            <h3 className="t-h3 mb-8">Top five challenges and our response</h3>
            <ChallengeRows />
          </div>
        </div>
      </section>

      {/* 3b Why-now numbers: full-bleed Midnight moment */}
      <StripeBand id="why-now" aria-labelledby="why-now-title" className="section">
        <div className="container-x">
          <h2 id="why-now-title" className="t-h2 mb-12 max-w-[22ch]">{STATS_KEY_LINE}</h2>
          <StatTiles stats={stats} />
          <p className="t-small mt-6 max-w-[70ch] text-muted-fg">{STATS_TAKEAWAY}</p>
        </div>
      </StripeBand>

      {/* 4 Services */}
      <section id="services" aria-labelledby="services-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="services-title" eyebrow="What we do" title="From first close to agents that keep getting better." />
          <ul className="grid gap-6 lg:grid-cols-3">
            {services.map((s, i) => (
              <li key={s.id} data-reveal className="card flex flex-col">
                <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="t-h3 mt-6">{s.title}</h3>
                <p className="t-small mt-3 text-muted-fg">{s.line}</p>
                <p className="mt-6 flex gap-2 border-t border-line pt-6 font-medium">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-mark" />
                  {s.outcome}
                </p>
                {s.agents && (
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Agent examples">
                    {s.agents.map((a) => (
                      <li key={a} className="chip t-mono">
                        {a}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ArrowLink href="/services" className="mt-8">
            See our services
          </ArrowLink>
        </div>
      </section>

      {/* 5 In action */}
      <section id="in-action" aria-labelledby="in-action-title" className="section">
        <div className="container-x">
          <SectionHead id="in-action-title" eyebrow="Agentic AI in action" title={HITL_HEADLINE} lead={`${HITL_BAND.title}. ${HITL_BAND.body}`} />
          <HitlDemo variant="compact" />
          <ArrowLink href="/governance" className="mt-8">
            How we govern agents
          </ArrowLink>
        </div>
      </section>

      {/* 6 Outcomes */}
      <section id="outcomes" aria-labelledby="outcomes-title" className="section band-cloud">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-5">
              <SectionHead id="outcomes-title" eyebrow="Business outcomes" title="What you get" />
            </div>
            <ul className="grid gap-px self-start overflow-hidden rounded-[var(--r-card)] border border-line bg-line sm:grid-cols-2 lg:col-span-7">
              {outcomes.map((o, i) => (
                <li key={o} data-reveal className="bg-bg p-6 sm:p-8">
                  <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="t-h3 mt-4">{o}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-20">
            <h3 className="t-mono mb-8 text-faint">How a client starts</h3>
            <Journey />
            <p className="t-small mt-8 text-muted-fg">
              Platforms we work around: {PLATFORMS.join(" · ")}.
            </p>
            <ArrowLink href="/industries" className="mt-4">
              Industries and platforms
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 7 Methodology */}
      <section id="methodology" aria-labelledby="methodology-title" className="section band-paper">
        <div className="container-x">
          <StepStory
            id="method"
            head={
              <>
                <Eyebrow className="mb-5">An outcomes company</Eyebrow>
                <h2 id="methodology-title" className="t-h2">
                  We build, own and run the agents around the platform
                </h2>
              </>
            }
            steps={engagement}
            aside={<GoldenRule withFootnote />}
            footer={
              <ArrowLink href="/approach" className="mt-8">
                How an engagement runs
              </ArrowLink>
            }
          />
        </div>
      </section>

      {/* 8 Why us */}
      <section id="why-us" aria-labelledby="why-us-title" className="section">
        <div className="container-x">
          <SectionHead id="why-us-title" eyebrow="Why partner with us" title="Why we win and keep winning" />
          <Differentiators />
          <p className="t-small mt-8 text-muted-fg">
            {POD_LINE} Forward Deployed Consultant (pod lead) &middot; Solutions Engineer (integrations).{" "}
            <Link href="/about#pod" className="link">
              Meet the pod
            </Link>
          </p>
          <div className="mt-20">
            <WhereWhatHow />
          </div>
          <p className="t-h3 mt-16 max-w-[40ch]">{LIBRARY_LINE}</p>
        </div>
      </section>

      {/* 9 Insights: only when posts exist */}
      {posts.length > 0 && (
        <section id="insights" aria-labelledby="insights-title" className="section">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <SectionHead id="insights-title" eyebrow="Insights" title="Latest insights" />
              <Link href="/insights" className="link link-arrow mb-[var(--head-gap)] shrink-0">
                View all insights <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 10 CTA */}
      <ClosingCta withQuotes title="The last mile is where software, services and context meet" />
    </>
  );
}
