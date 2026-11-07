import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/site/cta-band";
import { IndustryTiles } from "@/components/site/industry-tiles";
import { SectionHead } from "@/components/site/section-head";
import { industries } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Enterprise AI by Industry | Davero AI" },
  description:
    "Agentic AI for SecOps, IT service management, financial services, customer experience, supply chain, data and more. See where Davero AI applies.",
};

export default function IndustriesPage() {
  return (
    <>
      <section id="intro" aria-labelledby="intro-title" className="section">
        <div className="container-x">
          <SectionHead
            as="h1"
            id="intro-title"
            title="Intelligence across every function"
            lead="Nine areas where we design and deploy agentic AI."
          />
          <IndustryTiles />
        </div>
      </section>

      <div className="container-x">
        {industries.map(({ id, name, icon: Icon }) => (
          <section
            key={id}
            id={id}
            aria-labelledby={`${id}-title`}
            className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:py-16"
            data-reveal
          >
            <div className="flex items-center gap-4 lg:col-span-4 lg:block">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-surface-2">
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 text-accent" />
              </span>
              <h2 id={`${id}-title`} className="t-h3 lg:mt-5 lg:text-[30px]">
                {name}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="t-lead">
                Multi-agent systems, automation and integration, designed around how your teams work. Start a
                conversation about your use case.
              </p>
              <Link
                href={`/contact?industry=${id}`}
                className="link mt-6 inline-flex min-h-11 items-center gap-1 font-semibold"
              >
                Talk to us about {name}
                <ArrowRight aria-hidden="true" className="size-4 text-accent" />
              </Link>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Don't see your function?" body="Tell us the process. We'll tell you where agents fit." />
    </>
  );
}
