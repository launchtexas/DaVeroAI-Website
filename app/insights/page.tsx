import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/site/blocks";
import { BarChart } from "@/components/site/bar-chart";
import { Landscape } from "@/components/site/landscape";
import { StatTiles } from "@/components/site/stat-tiles";
import { CLOSE_LINE, WEDGE, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights: The Market for the Last Mile | DaveroAI",
  description:
    "Why services, not software, are the bigger prize: market size, the shift to agent arbitrage and where DaveroAI sits in the landscape.",
};

const edge = [
  "Platforms sell to the firms we replace; selling the work would cut out their own customers (Sequoia’s innovator’s dilemma).",
  "Roll-ups buy hours and retrofit AI; we start agent-native.",
  "Labs target the Fortune 500; we go deep on one platform layer and the mid-market.",
];

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights" title="The market for the last mile" lead={<p>{WEDGE}</p>} />

      <section id="market-shift" aria-labelledby="shift-title" className="section band-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHead id="shift-title" eyebrow="The bigger prize" title="Services are the bigger prize" />
            <p className="t-stat">4&ndash;6&times;</p>
            <p className="mt-3">more is spent on services than on software</p>
            <p className="t-mono mt-4 text-faint">
              Sources: Nick Kopp, CEO, Rillet (Nasdaq, Oct 2026); Sequoia, via Matt Baskovc (Oct 2026)
            </p>
            <p className="t-h3 mt-8 !font-light">The last mile is the bigger prize.</p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <BarChart
              id="shift-chart"
              title="Platforms $0.5T vs services wrapped around them $2T"
              source="Nick Kopp, CEO, Rillet, Nasdaq, Oct 2026"
              bars={[
                { label: "Software", value: 0.5, display: "$0.5T" },
                { label: "Services", value: 2, display: "$2T", ours: true },
              ]}
            />
          </div>
        </div>
      </section>

      <section id="market" aria-labelledby="market-title" className="section">
        <div className="container-x">
          <SectionHead id="market-title" eyebrow="Market for DaveroAI" title="Finance is one of the largest markets for DaveroAI" />
          <div data-reveal className="card max-w-3xl">
            <p className="t-stat text-[clamp(3.5rem,2rem+6vw,7rem)]">$80&ndash;115B</p>
            <p className="t-lead mt-6">US accounting, audit and tax advisory work already bought from outside providers</p>
            <p className="t-mono mt-6 text-faint">
              Source: Sequoia Capital, &ldquo;Services: The New Software,&rdquo; Mar 2026 (labour TAM ranges)
            </p>
          </div>
        </div>
      </section>

      <section id="stats" aria-labelledby="stats-title" className="section">
        <div className="container-x">
          <SectionHead id="stats-title" eyebrow="Why now" title="Delivery, not models, is the bottleneck. We sell delivery." />
          <StatTiles stats={stats} />
        </div>
      </section>

      <section id="landscape" aria-labelledby="landscape-title" className="section">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <SectionHead id="landscape-title" eyebrow="Landscape" title="Where we sit in the landscape" />
            <Landscape />
          </div>
          <div className="self-center lg:col-span-5 lg:col-start-8">
            <h3 className="t-h3">Our edge</h3>
            <ul className="mt-6 border-t border-line">
              {edge.map((e) => (
                <li key={e} className="flex gap-3 border-b border-line py-4">
                  <span aria-hidden="true" className="dot mt-2.5 bg-mark" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="articles" aria-labelledby="articles-title" className="section">
        <div className="container-x">
          <SectionHead id="articles-title" eyebrow="Articles" title="Articles" />
          <p className="text-muted-fg">First articles coming soon.</p>
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
