import { CardIcon, ICONS } from "./icons";

export type PlatformsProps = {
  lede: string;
  existing: readonly string[];
  outcomes: readonly string[];
};

const BENEFITS = [
  {
    icon: ICONS.database,
    title: "Higher ROI from existing platforms",
    text: "No rip-and-replace. Agents extend current platforms through native data and APIs, so more of the process runs around systems the business already licenses.",
  },
  {
    icon: ICONS.trend,
    title: "Reach accurate results faster",
    text: "First agents go live in weeks, validated against company rules and approved by process owners, so speed never comes at the cost of accuracy.",
  },
  {
    icon: ICONS.gauge,
    title: "Keep AI running costs low",
    text: "Our agents optimize token usage, so spend goes to completed work, not wasted AI compute, even as volumes grow.",
  },
];

export function Platforms({ lede, existing, outcomes }: PlatformsProps) {
  return (
    <section className="section" id="platforms">
      <div className="wrap">
        <p className="eyebrow">Platform investments, made to deliver</p>
        <h2>We build on existing platforms.</h2>
        <p className="lede">{lede}</p>
        <div aria-label="Existing platforms, DaVero AI agents, business outcomes" role="group" className="layers">
          <div className="layer">
            <p className="kicker">Existing platforms</p>
            <ul>
              {existing.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="arrow">
            →
          </div>
          <div className="layer ours">
            <p className="kicker">DaVero AI agents</p>
            <p>Orchestrated across enterprise systems through native platform data and APIs, approved by process owners.</p>
          </div>
          <div aria-hidden="true" className="arrow">
            →
          </div>
          <div className="layer results">
            <p className="kicker">Business outcomes</p>
            <ul>
              {outcomes.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="card">
              <CardIcon d={b.icon} />
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
        <p className="signoff">
          <span className="navy">Existing Platforms</span> <span className="op">+</span> <span className="orange">DaVero AI Agents</span>{" "}
          <span className="op">=</span> <span className="navy">Accurate Results</span>
        </p>
      </div>
    </section>
  );
}
