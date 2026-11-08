import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, Journey, PageHero, SectionHead } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { EcosystemSection } from "@/components/site/ecosystem-section";
import { CLOSE_LINE, WEDGE, domains } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Industries and Platforms | DaVero AI",
  description: "Last-mile workflows in finance, procurement and supply chain, IT services and insurance, run by agents on AI-native platforms.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero art={<PageArt kind="tiles" />} eyebrow="Industries & ecosystem" title="Where the last mile lives" lead={<p>Our focus: {WEDGE}</p>} />

      <EcosystemSection band="band-cloud" />

      <section id="domains" aria-labelledby="domains-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="domains-title" eyebrow="Domains" title="Four domains" />
          <ul className="grid gap-6 md:grid-cols-2">
            {domains.map((d) => (
              <li key={d.id} id={d.id} data-reveal className={cn("card card-link flex flex-col", d.lead && "border-mark/60")}>
                {d.lead && <span className="chip t-mono mb-6 w-fit border-mark text-fg">Where we start</span>}
                <h3 className="t-h2">
                  <Link href={`/contact?domain=${d.id}#form`} className="stretched">
                    {d.name}
                  </Link>
                </h3>
                <p className="t-mono mt-8 text-faint">The last mile here</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {d.examples.map((x) => (
                    <li key={x} className="chip t-small normal-case tracking-normal text-fg">
                      {x}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="journey" aria-labelledby="journey-title" className="section">
        <div className="container-x">
          <SectionHead id="journey-title" eyebrow="Client journey" title="How a client starts" />
          <Journey large />
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
