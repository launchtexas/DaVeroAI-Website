import type { Metadata } from "next";
import { CtaBand, PageHero, SectionHead } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { BarChart } from "@/components/site/bar-chart";
import { Landscape } from "@/components/site/landscape";
import { StatTiles } from "@/components/site/stat-tiles";
import { CLOSE_LINE, WEDGE, stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights: The Market for the Last Mile | DaVero AI",
  description:
    "Why services, not software, are the bigger prize: market size, the shift to agent arbitrage and where DaVero AI sits in the landscape.",
};

const edge = [
  "Platforms sell to the firms we replace; selling the work would cut out their own customers (Sequoia’s innovator’s dilemma).",
  "Roll-ups buy hours and retrofit AI; we start agent-native.",
  "Labs target the Fortune 500; we go deep on one platform layer and the mid-market.",
];

// docs/content.md /insights #market: midpoints of Sequoia's ranges; finance categories highlighted.
const labourSpend = [
  { label: "Management consulting", value: 350, display: "$350B", range: "$300–400B" },
  { label: "Supply chain & procurement", value: 200, display: "$200B", range: "$200B+" },
  { label: "Recruitment & staffing", value: 200, display: "$200B", range: "$200B+" },
  { label: "Insurance brokerage", value: 170, display: "$170B", range: "$140–200B" },
  { label: "IT managed services", value: 100, display: "$100B", range: "$100B+" },
  { label: "Accounting & audit", value: 65, display: "$65B", range: "$50–80B", ours: true },
  { label: "Healthcare revenue cycle", value: 65, display: "$65B", range: "$50–80B" },
  { label: "Claims adjusting", value: 65, display: "$65B", range: "$50–80B" },
  { label: "Tax advisory", value: 33, display: "$33B", range: "$30–35B", ours: true },
  { label: "Legal, transactional", value: 23, display: "$23B", range: "$20–25B" },
];

export default function InsightsPage() {
  return (
    <>
      <PageHero art={<PageArt kind="bars" />} eyebrow="Insights" title="The market for the last mile" lead={<p>{WEDGE}</p>} />

      <section id="market-shift" aria-labelledby="shift-title" className="section band-paper">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <SectionHead id="shift-title" eyebrow="The bigger prize" title="Services are the bigger prize" />
            <p className="t-stat">4&ndash;6&times;</p>
            <p className="mt-3">more is spent on services than on software</p>
            <p className="t-mono mt-4 text-faint">
              Sources: Nick Kopp, CEO, Rillet (Nasdaq, Oct 2026); Sequoia, via Matt Baskovc (Oct 2026)
            </p>
            <p className="t-h3 mt-8">The last mile is the bigger prize.</p>
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

      <section id="market" aria-labelledby="market-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="market-title" eyebrow="Market for DaVero AI" title="Finance is one of the largest markets for DaVero AI" />
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div data-reveal className="card self-start lg:col-span-4">
              <p className="t-stat text-[clamp(3rem,2rem+4vw,4.5rem)]">$80&ndash;115B</p>
              <p className="t-lead mt-6">US accounting, audit and tax advisory work already bought from outside providers</p>
              <p className="t-mono mt-6 text-faint">
                Source: Sequoia Capital, &ldquo;Services: The New Software,&rdquo; Mar 2026 (labour TAM ranges)
              </p>
            </div>
            <div className="lg:col-span-8">
              <BarChart
                id="labour-chart"
                title="US outsourced labour spend by category"
                note="Bars show range midpoints; finance categories highlighted."
                source="Sequoia Capital, Mar 2026"
                bars={labourSpend}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="stats" aria-labelledby="stats-title" className="section">
        <div className="container-x">
          <SectionHead id="stats-title" eyebrow="Why now" title="Delivery, not models, is the bottleneck. We sell delivery." />
          <StatTiles stats={stats} />
        </div>
      </section>

      <section id="landscape" aria-labelledby="landscape-title" className="section band-paper">
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

      <section id="articles" aria-labelledby="articles-title" className="section band-cloud">
        <div className="container-x">
          <SectionHead id="articles-title" eyebrow="Articles" title="Articles" />
          <p className="text-muted-fg">First articles coming soon.</p>
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
