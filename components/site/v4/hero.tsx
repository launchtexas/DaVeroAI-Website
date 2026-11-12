import Link from "next/link";
import type { ReactNode } from "react";
import { Check } from "./icons";
import { ASSESSMENT_HREF, ASSESSMENT_LABEL, FUNCTIONS, functionHref } from "./nav";

export type FlowStep = { title: string; text: string; who: string; kind?: "agent" | "sys" };

export type HeroProps = {
  /** Shown as "Home / {crumb}" above the eyebrow on function pages. */
  crumb?: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  /** Hash of the "See how it works" section on the same page. */
  howHref?: string;
  /** Function chips under the buttons (Home only). */
  chips?: boolean;
  flowTitle: string;
  /** Right-hand label of the card head; defaults to the "AGENT + PROCESS OWNER" pair. */
  flowLabel?: string;
  steps: FlowStep[];
  strip?: { label: string; names: readonly string[]; tbd: string };
};

const HOME_STRIP = { label: "Built for AI-native platforms", names: ["Rillet", "Tabs"], tbd: "More coming soon +" };

export function Hero({ crumb, eyebrow, title, lede, howHref = "#how", chips, flowTitle, flowLabel, steps, strip = HOME_STRIP }: HeroProps) {
  return (
    <section className="dark" aria-labelledby="hero-title">
      <div className="hero">
        <div className="wrap">
          <div className="hero-copy">
            {crumb && (
              <p className="crumb">
                <Link href="/">Home</Link> / {crumb}
              </p>
            )}
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="hero-title">{title}</h1>
            <p className="lede lede-sub">
              The <span style={{ color: "var(--orange)" }}>last mile</span> is everything <span style={{ color: "var(--orange)" }}>between</span>{" "}
              <em>the software is live</em> and <em>the outcome is delivered</em>.
            </p>
            <p className="lede lede-main">{lede}</p>
            <p className="tagline">Business-approved, Expert-built, Fully managed</p>
            <div className="actions">
              <Link className="btn btn-primary" href={ASSESSMENT_HREF}>
                {ASSESSMENT_LABEL} →
              </Link>
              <Link className="btn btn-ghost" href={howHref}>
                See how it works
              </Link>
            </div>
            {chips && (
              <div className="chips">
                {FUNCTIONS.map((f) => (
                  <Link key={f.slug} className="chip" href={functionHref(f.slug)}>
                    {f.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div aria-label="Illustrative agent workflow" role="group" className="flow">
            <div className="flow-head">
              <b>{flowTitle}</b>
              {flowLabel ? (
                <span>{flowLabel}</span>
              ) : (
                <span>
                  <b className="flow-pair">
                    <span className="flow-agent">AGENT</span> + PROCESS OWNER
                  </b>
                </span>
              )}
            </div>
            <ol>
              {steps.map((s, i) => (
                <li key={s.title}>
                  <span className={`dot${s.kind ? ` ${s.kind}` : ""}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="txt">
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </span>
                  <span className={`who${s.kind ? ` ${s.kind}` : ""}`}>{s.who}</span>
                </li>
              ))}
            </ol>
            <div className="done">
              <Check />
              <span>Accurate result, approved and on record</span>
            </div>
          </div>
        </div>
      </div>
      <div className="strip">
        <div className="wrap">
          <span className="label">{strip.label}</span>
          {strip.names.map((p) => (
            <span key={p} className="name">
              {p}
            </span>
          ))}
          <span className="tbd">{strip.tbd}</span>
        </div>
      </div>
    </section>
  );
}
