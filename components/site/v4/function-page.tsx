import { Fragment } from "react";
import { FUNCTION_SHARED, type FunctionPage, type RichText } from "@/lib/functions";
import { Hero } from "./hero";
import { Platforms } from "./platforms";
import { MILES, Problem } from "./problem";
import { WhyNow } from "./why-now";
import { Workflows } from "./workflows";
import { AgentsAtWork } from "./agents-at-work";
import { How } from "./how";
import { Controls } from "./controls";
import { Pricing } from "./pricing";
import { About } from "./about";
import { Explore } from "./explore";
import { Estimate } from "./estimate";
import { Assessment } from "./assessment";
import { functionHref } from "./nav";

const rich = (t: RichText) =>
  t.map((r, i) =>
    typeof r === "string" ? <Fragment key={i}>{r}</Fragment> : "strong" in r ? <strong key={i}>{r.strong}</strong> : <em key={i}>{r.em}</em>,
  );

// The mock numbers its four-mile tests lmt1 (home) .. lmt6 (insurance).
const TEST_IDS = { "finance-accounting": "lmt2", "supply-chain": "lmt3", procurement: "lmt4", "security-governance": "lmt5", insurance: "lmt6" };

/** A function page (mock page-<slug>), sections in the mock's order, copy from lib/functions.ts. */
export function FunctionPageView({ page: p }: { page: FunctionPage }) {
  const A = FUNCTION_SHARED.agentsAtWork;
  return (
    <>
      <Hero
        crumb={p.hero.crumb}
        eyebrow={p.hero.eyebrow}
        title={
          <>
            {FUNCTION_SHARED.heroTitle}
            <br />
            <span className="accent">{p.hero.titleAccent}</span>
          </>
        }
        lede={p.hero.lede}
        flowTitle={p.hero.flow.title}
        flowLabel={p.hero.flow.subtitle}
        steps={p.hero.flow.steps.map((s) => ({ ...s, kind: s.kind === "owner" ? undefined : s.kind }))}
        strip={p.hero.strip}
      />
      <Platforms lede={p.platforms.lede} existing={p.platforms.existing} outcomes={p.platforms.outcomes} />
      <Problem
        title={p.problem.title}
        lede={rich(p.problem.lede)}
        zone1={p.problem.zoneTexts[0]}
        zone2={p.problem.zoneTexts[1]}
        zone3={p.problem.zoneTexts[2]}
        testId={TEST_IDS[p.slug]}
        testTitle={p.problem.test.title}
        miles={p.problem.test.gates.length === 4 ? p.problem.test.gates : MILES}
      />
      <WhyNow
        title={p.whyNow.title}
        stats={p.whyNow.stats.map((s) => ({ num: s.value, text: s.text, src: s.source, highlight: s.accent, placeholder: s.placeholder }))}
      />
      <Workflows eyebrow={FUNCTION_SHARED.workflowsEyebrow} title={p.workflows.title} lede={p.workflows.lede} cards={p.workflows.cards} />
      <AgentsAtWork
        eyebrow={A.eyebrow}
        title={A.title}
        heading={A.heading}
        lede={A.lede}
        kpis={[...A.kpis]}
        feedLabel={p.agentsAtWork.feedLabel}
        events={p.agentsAtWork.events}
        foot={A.foot}
      />
      <How lede={p.how.lede} stepTexts={p.how.stepTexts} expand={p.how.expand} />
      <Controls firstCard={p.controls.firstCard} defences={p.controls.defences} />
      <Pricing outcomeText={p.pricing.outcomeText} />
      <About />
      <Explore cards={p.explore.cards.map((c) => ({ href: functionHref(c.slug), icon: c.icon, title: c.title, text: c.text }))} />
      <Estimate hint={p.estimate.peopleHint} />
      <Assessment title={p.assessment.title} deliverables={p.assessment.deliverables} />
    </>
  );
}
