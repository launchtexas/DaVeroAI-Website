import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/cta-band";
import { Diagram } from "@/components/site/diagram";
import { SectionHead } from "@/components/site/section-head";
import { Steps } from "@/components/site/steps";
import { IndustryTiles } from "@/components/site/industry-tiles";
import { CTA_LABEL, proofPoints, services } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Davero AI | Enterprise Intelligence, Delivered." },
  description:
    "Davero AI builds and deploys multi-agent AI systems, enterprise automation, and last-mile AI solutions.",
};

export default function Home() {
  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="relative -mt-16 flex min-h-[min(88vh,820px)] items-center pt-16 pb-16 nav:-mt-[72px] nav:pt-[72px]"
        style={{ background: "var(--glow)" }}
      >
        <div className="container-x grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Enterprise Agentic AI Engineering</p>
            <h1 id="hero-title" className="t-display">
              Intelligence is easy. <span className="block text-accent">Execution is everything.</span>
            </h1>
            <p className="t-lead mt-6">
              We bridge the last mile of enterprise AI. From multi-agent orchestration to production deployment, Davero
              AI transforms complex business challenges into autonomous, intelligent workflows.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/contact">
                  {CTA_LABEL}
                  <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover/button:translate-x-[3px]" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/services">See our services</Link>
              </Button>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {proofPoints.map(({ title, body, icon: Icon }) => (
                <li key={title} className="flex gap-3">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <p className="text-[15px] font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Diagram compact className="hidden sm:block lg:col-span-5" />
        </div>
      </section>

      <section id="problem" aria-labelledby="problem-title" className="section">
        <SectionHead
          id="problem-title"
          className="container-narrow text-center [&_.t-lead]:mx-auto"
          title="Beyond prototypes. Into production."
          lead="The hardest part of enterprise AI is not building a demo. It's integrating intelligence into real systems, processes, and decisions."
        />
      </section>

      <section id="services" aria-labelledby="services-title" className="section">
        <div className="container-x">
          <SectionHead
            id="services-title"
            eyebrow="Services"
            title="What we do"
            lead="We combine AI engineering, enterprise consulting, and systems integration to deliver intelligent solutions designed around your operations."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map(({ id, title, short, icon: Icon }) => (
              <li key={id} data-reveal className="card card-link flex flex-col p-6 sm:p-8">
                <span className="flex size-11 items-center justify-center rounded-sm bg-surface-2">
                  <Icon aria-hidden="true" strokeWidth={1.5} className="size-6 text-accent" />
                </span>
                <h3 className="t-h3 mt-6">{title}</h3>
                <p className="mt-2 flex-1 text-muted-foreground">{short}</p>
                <Link href={`/services#${id}`} className="stretched mt-6 inline-flex items-center gap-1 font-semibold text-accent">
                  Learn more<span className="sr-only"> about {title}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/services" className="link mt-10 inline-flex min-h-11 items-center font-semibold">
            Explore services
          </Link>
        </div>
      </section>

      <section id="approach" aria-labelledby="approach-title" className="section">
        <div className="container-x">
          <SectionHead
            id="approach-title"
            eyebrow="Approach"
            title="The Davero Approach"
            lead="Four steps from first conversation to running system."
          />
          <div className="mt-12">
            <Steps />
          </div>
          <figure className="mx-auto mt-16 max-w-[960px]">
            <Diagram />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              An Enterprise AI Orchestrator coordinates Research, Operations, Security and Analytics agents, which
              connect to Enterprise APIs, Cloud &amp; Data, and Business Systems.
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="industries" aria-labelledby="industries-title" className="section">
        <div className="container-x">
          <SectionHead
            id="industries-title"
            eyebrow="Industries"
            title="Intelligence across every function"
            lead="Where we apply agentic AI."
          />
          <IndustryTiles />
          <Link href="/industries" className="link mt-10 inline-flex min-h-11 items-center font-semibold">
            See industries
          </Link>
        </div>
      </section>

      <CtaBand title="Let's Build Together" body="Tell us the workflow you want to move from demo to production." showEmail />
    </>
  );
}
