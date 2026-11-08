import type { Metadata } from "next";
import { CtaBand, ComparisonTable, Eyebrow, PageHero, Quote, SectionHead, WhereWhatHow } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { Arbitrage } from "@/components/site/arbitrage";
import { LastMile } from "@/components/site/last-mile";
import { WEDGE, arbitrage, strategy } from "@/lib/content";

export const metadata: Metadata = {
  title: "What Is the Last Mile? | DaVero AI",
  description:
    "The last mile is everything between “the software is live” and “the final outcome is delivered.” Here is how agentic AI closes it.",
};

export default function AgenticAiPage() {
  return (
    <>
      <PageHero art={<PageArt kind="gap" />}
        eyebrow="Why agentic AI"
        title="AI enablement is the bottleneck."
        lead={
          <p>
            We enable and deliver finished outcomes.
          </p>
        }
      />

      <section id="last-mile" aria-labelledby="last-mile-title" className="section band-paper">
        <div className="container-x">
          <SectionHead
            id="last-mile-title"
            eyebrow="The last mile"
            title={<>What we mean by &ldquo;The Last Mile&rdquo;</>}
            lead={<>Everything between &ldquo;the software is live&rdquo; and &ldquo;the final outcome is delivered.&rdquo;</>}
          />
          <p className="prose-body mb-12 text-muted-fg">
            The last mile is the set of domain-specific workflows in and around a core business platform, where business-domain expertise,
            applied on the platform, decides the outcome. Today it runs on disparate tools and manual effort. We run it with purpose-built
            agents tightly coupled to the business platform.
          </p>
          <h3 className="t-mono mb-6 text-faint">How every client workflow meets the platform</h3>
          <LastMile variant="full" />
        </div>
      </section>

      <section id="platform-vs-outcome" aria-labelledby="pvo-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="pvo-title" eyebrow="Platform vs. DaVero AI" title="Platforms deliver the capability. DaVero AI delivers the finished outcome" />
          <div data-reveal>
            <ComparisonTable />
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <div data-reveal className="card">
              <p className="t-mono text-faint">Where DaVero AI wins first</p>
              <p className="t-h3 mt-4">
                Close, reconciliations, billing and collections are rules-heavy, outsourced and already budgeted. That is the wedge Sequoia
                describes, and it is where we start.
              </p>
            </div>
            <div data-reveal className="self-end">
              <p className="text-muted-fg">
                The higher the intelligence ratio in any field, the sooner outcome sellers like DaVero AI win.
              </p>
              <p className="t-mono mt-3 text-faint">
                Source: Julien Bek, &ldquo;Services: The New Software,&rdquo; Sequoia Capital, Mar 2026 (paraphrased)
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="agent-arbitrage" aria-labelledby="arb-title" className="section">
        <div className="container-x">
          <SectionHead id="arb-title" eyebrow="The shift" title={arbitrage.title} />
          <Arbitrage />
          <p className="t-h2 mt-20 max-w-[28ch]">Whoever controls the quality of the agents controls client stickiness.</p>
          <ul className="mt-16 grid gap-10 md:grid-cols-2">
            <li data-reveal className="border-t border-line pt-6">
              <Quote
                size="h3"
                text="Half a trillion dollars in software spend, another $2T in services wrapped around it."
                by="Nick Kopp, CEO, Rillet · Nasdaq, Oct 2026"
              />
              <p className="mt-4 text-muted-fg">The last mile lives in the eco-system layer.</p>
            </li>
            <li data-reveal className="border-t border-line pt-6">
              <Quote
                size="h3"
                text="For every $1 companies spend on software, they spend about $6 on services."
                by="Matt Baskovc on Sequoia’s thesis · Oct 2026"
              />
              <p className="mt-4 text-muted-fg">Services will be the new software.</p>
            </li>
          </ul>
        </div>
      </section>

      <section id="strategy" aria-labelledby="strategy-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="strategy-title" eyebrow="Strategy" title="Our core strategy" />
          <blockquote data-reveal className="mb-16 max-w-[56ch] border-l-2 border-mark pl-6">
            <p className="t-h3">{strategy.quote}</p>
          </blockquote>
          <WhereWhatHow large />
        </div>
      </section>

      <section id="who-for" aria-labelledby="who-for-title" className="section band-cloud">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <Eyebrow className="mb-5">Who it is for</Eyebrow>
            <h2 id="who-for-title" className="t-h2">
              Our wedge
            </h2>
            <p className="t-lead mt-5">{WEDGE}</p>
          </div>
          <dl data-reveal className="self-end border-t border-line lg:col-span-5 lg:col-start-8">
            <div className="border-b border-line py-5">
              <dt className="t-mono text-faint">Who</dt>
              <dd className="mt-2">Mid-market and enterprise companies</dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="t-mono text-faint">Moving onto</dt>
              <dd className="mt-2">AI-native platforms (ERP, CRM, procurement, etc.)</dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="t-mono text-faint">Where the last mile is</dt>
              <dd className="mt-2">New, unowned and budgeted</dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand title="Find your last mile" />
    </>
  );
}
