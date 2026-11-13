import { Check } from "./icons";

// #controls from docs/source/design-v4.html plus the trust showcase, in a compact layout. Function pages pass
// their own first card; cards 2-4 and the showcase are shared. `defences` adds the AI-specific block
// (security-governance only).
type Card = { title: string; text: string };

const CARDS: Card[] = [
  { title: "Control ownership stays with management", text: "Management keeps control ownership; auditors get the evidence." },
  { title: "Least-privilege agent access", text: "Scoped, revocable credentials per workflow. No shared logins, no standing admin rights." },
  { title: "Guardrails and kill switch", text: "Set rules and thresholds, continuous monitoring, and an instant pause for the business." },
  { title: "Client data stays protected", text: "Encrypted in transit and at rest, kept in approved systems, never used to train shared models." },
];

// kind drives the dot colour, as in the hero flow: agent = orange, sys = mist, none = white (a person).
const RUN: { title: string; text: string; who: string; kind?: "agent" | "sys" }[] = [
  { title: "Reads only scoped data", text: "Just the records this workflow needs.", who: "AGENT", kind: "agent" },
  { title: "Proposes a change", text: "Reasoning and sources attached.", who: "AGENT", kind: "agent" },
  { title: "Policy checks", text: "Rules, thresholds, segregation of duties.", who: "GUARDRAILS", kind: "sys" },
  { title: "Human approves", text: "The owner signs off or sends it back.", who: "OWNER" },
  { title: "Writes to the system of record", text: "Only the approved change.", who: "SYSTEM", kind: "sys" },
  { title: "Logged", text: "Who, what, when, data and approver.", who: "AUDIT LOG", kind: "sys" },
];

const NEVER = [
  "Approves its own work",
  "Moves money or changes access without human sign-off",
  "Uses shared logins",
  "Treats instructions inside documents or emails as commands",
  "Trains shared models on client data",
];

const LOG: [string, string][] = [
  ["Who", "Access-review agent, scoped credential"],
  ["What", "Proposed removing 3 stale entitlements"],
  ["When", "Timestamped at each step"],
  ["Data touched", "User roster, entitlements (read)"],
  ["Approver", "System owner, signed off"],
  ["Outcome", "Written to IAM, evidence pack updated"],
];

const FRAMEWORKS = ["SOC 2", "ISO 27001", "NIST AI RMF", "EU AI Act"];

export function Controls({ firstCard = CARDS[0], defences }: { firstCard?: Card; defences?: Card[] }) {
  return (
    <section className="section dark" id="controls">
      <div className="wrap">
        <div className="ctl-head">
          <div>
            <p className="eyebrow">Controls</p>
            <h2>Controls your auditors will recognize.</h2>
          </div>
          <p className="lede">Every agent runs inside the business&apos;s controls, with a human sign-off on every result and a full audit trail.</p>
        </div>
        <div className="ctl-cards">
          {[firstCard, ...CARDS.slice(1)].map((c) => (
            <div className="card" key={c.title}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="wrap trust">
        <div aria-label="Guardrails on every run" role="group" className="flow guard">
          <div className="flow-head">
            <b>Guardrails on every run</b>
            <span>Illustrative</span>
          </div>
          <ol>
            {RUN.map((s, i) => (
              <li key={s.title}>
                <span className="step-top">
                  <span className={`dot${s.kind ? ` ${s.kind}` : ""}`} aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className={`who${s.kind ? ` ${s.kind}` : ""}`}>{s.who}</span>
                </span>
                <strong>{s.title}</strong>
                <span className="step-txt">{s.text}</span>
              </li>
            ))}
          </ol>
          <div className="done">
            <Check size={16} />
            <span>Approved, written and on record</span>
          </div>
        </div>

        <div className="trust-row">
          <div className="never">
            <h3>What an agent can never do</h3>
            <ul>
              {NEVER.map((t) => (
                <li key={t}>
                  <span className="sr-only">Never: </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="audit">
            <div className="audit-head">
              <h3>Every action leaves evidence</h3>
              <span className="pill">Illustrative</span>
            </div>
            <dl>
              {LOG.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {defences && (
          <div className="defences">
            <h3>AI-specific defences</h3>
            <ul>
              {defences.map((d) => (
                <li key={d.title}>
                  <span className="ic" aria-hidden="true">
                    <Check size={12} stroke="#FF962E" width={3} />
                  </span>
                  <span>
                    <strong>{d.title}</strong>
                    <span>{d.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="frameworks">
          <p>Built to support the frameworks your auditors use</p>
          <ul>
            {FRAMEWORKS.map((f) => (
              <li key={f}>Designed to support {f}</li>
            ))}
          </ul>
          <p className="note">Not a certification. Your auditors decide what counts as evidence.</p>
        </div>
      </div>
    </section>
  );
}
