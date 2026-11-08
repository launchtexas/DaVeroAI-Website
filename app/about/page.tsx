import type { Metadata } from "next";
import Image from "next/image";
import headshot from "@/public/images/hemang-bhatt.jpg";
import { CtaBand, PageHero, PodCards, SectionHead, WhereWhatHow } from "@/components/site/blocks";
import { PageArt } from "@/components/site/art";
import { CLOSE_LINE, POD_LINE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About DaVero AI | Founder Hemang Bhatt",
  description:
    "DaVero AI delivers finished outcomes around AI-native platforms. Meet founder Hemang Bhatt and the pod that runs every engagement.",
};

const experience = [
  { org: "Consero Global", note: "BV Investment Partners", line: "EVP, Client Services and Product Modernization. $48M P&L, 310 people." },
  { org: "Oracle NetSuite", line: "Senior Director, Customer Success. Grew professional services revenue $10M → $36M." },
  { org: "Gordian", note: "Warburg Pincus", line: "Director, SaaS product. Subscription model across $120M+ ARR." },
  { org: "JPMorgan Chase · American Express", line: "Technology product and strategic programs; legacy-to-SaaS transformation." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero art={<PageArt kind="people" />}
        eyebrow="About"
        title="An AI-agentic company that delivers finished outcomes around AI-native platforms."
        lead={<p>Everything between &ldquo;the software is live&rdquo; and &ldquo;the final outcome is delivered.&rdquo;</p>}
      />

      <section id="mission" aria-labelledby="mission-title" className="section band-paper">
        <div className="container-x">
          <h2 id="mission-title" className="t-h2" data-reveal>
            Not software seats. Not billable hours.
          </h2>
          <p className="t-lead mt-5">Platforms deliver the capability. DaVero AI delivers the finished outcome.</p>
        </div>
      </section>

      <section id="strategy" aria-labelledby="strategy-title" className="section">
        <div className="container-x">
          <SectionHead id="strategy-title" eyebrow="Strategy" title="Our core strategy" />
          <WhereWhatHow />
        </div>
      </section>

      <section id="pod" aria-labelledby="pod-title" className="section band-paper">
        <div className="container-x">
          <SectionHead id="pod-title" eyebrow="The delivery pod" title="Led by the Forward Deployed Consultant" />
          <PodCards compact />
          <p className="mt-8 text-muted-fg">
            <span className="t-mono mr-3 text-faint">The unit of delivery</span>
            {POD_LINE}
          </p>
        </div>
      </section>

      <section id="founder" aria-labelledby="founder-title" className="section band-cloud">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <div className="relative max-w-sm">
              <div aria-hidden="true" className="absolute -right-3 -bottom-3 h-full w-full rounded-[var(--r-card)] bg-[var(--brand)]" />
              <Image
                src={headshot}
                alt="Hemang Bhatt, Founder and CEO"
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
                placeholder="blur"
                className="relative aspect-[4/5] w-full rounded-[var(--r-card)] object-cover object-top"
              />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p className="eyebrow t-mono mb-5">Leadership</p>
            <h2 id="founder-title" className="t-h2">
              Hemang Bhatt
            </h2>
            <p className="t-mono mt-3 text-faint">Founder &amp; CEO</p>
            <p className="t-lead mt-6">
              20+ years scaling SaaS, FinTech and professional services. Led 300+ people across North America, EMEA, LATAM and APAC.
            </p>
            <ul className="mt-10 border-t border-line">
              {experience.map((e) => (
                <li key={e.org} className="grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:gap-6">
                  <h3 className="font-bold sm:col-span-5">
                    {e.org}
                    {e.note && <span className="t-small block text-faint">{e.note}</span>}
                  </h3>
                  <p className="text-muted-fg sm:col-span-7">{e.line}</p>
                </li>
              ))}
              <li className="grid gap-1 border-b border-line py-5 sm:grid-cols-12 sm:gap-6">
                <h3 className="font-bold sm:col-span-5">Advisory boards (advisory)</h3>
                <div className="sm:col-span-7">
                  <p className="text-muted-fg">Founding member, Rillet PAB (1 of 22). Tabs Advisory Board (1 of 13).</p>
                  <p className="t-small mt-2 text-faint">Advisory board roles are non-commercial.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title={CLOSE_LINE} />
    </>
  );
}
