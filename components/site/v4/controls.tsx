import { Check } from "./icons";

// #controls from docs/source/design-v4.html plus the trust showcase. Function pages pass their own first card;
// cards 2-4 and the showcase are shared. `defences` adds the AI-specific block (security-governance only).
type Card = { title: string; text: string };

const CARDS: Card[] = [
  { title: "Control ownership stays with management", text: "Management keeps control ownership; auditors get the evidence." },
  {
    title: "Least-privilege agent access",
    text: "Each agent gets only the permissions its workflow needs, through scoped, revocable credentials. No shared logins, no standing admin rights.",
  },
  {
    title: "Guardrails and kill switch",
    text: "Agents run inside defined rules and thresholds, are monitored continuously, and can be paused instantly by the business.",
  },
  {
    title: "Client data stays protected",
    text: "Data is encrypted in transit and at rest, never used to train shared models, and stays within approved systems.",
  },
];

// kind drives the dot colour, as in the hero flow: agent = orange, sys = mist, none = white (a person).
const RUN: { title: string; text: string; who: string; kind?: "agent" | "sys" }[] = [
  { title: "Reads only scoped data", text: "Read access to the records this workflow needs, nothing else.", who: "AGENT", kind: "agent" },
  { title: "Proposes a change", text: "Drafts the update with its reasoning and sources attached.", who: "AGENT", kind: "agent" },
  { title: "Policy checks", text: "Rules, thresholds and segregation of duties checked first.", who: "GUARDRAILS", kind: "sys" },
  { title: "Human approves", text: "The process owner reviews and signs off, or sends it back.", who: "OWNER" },
  { title: "Writes to the system of record", text: "Only the approved change, through a scoped credential.", who: "SYSTEM", kind: "sys" },
  { title: "Logged", text: "Who, what, when, data touched and approver, on record.", who: "AUDIT LOG", kind: "sys" },
];

const NEVER = [
  "Approves its own work",
  "Moves money or changes access without human sign-off",
  "Uses shared logins",
  "Treats instructions inside documents or emails as commands",
  "Trains shared models on client data",
];

const LOG: [string, string][] = [
  ["Who", "Reconciliation agent, scoped credential"],
  ["What", "Proposed accrual adjustment"],
  ["When", "Timestamped at each step"],
  ["Data touched", "Vendor ledger (read), open invoices (read)"],
  ["Approver", "Controller, signed off"],
  ["Outcome", "Written to the ERP, evidence pack updated"],
];

const FRAMEWORKS = ["SOC 2", "ISO 27001", "NIST AI RMF", "EU AI Act"];

export function Controls({ firstCard = CARDS[0], defences }: { firstCard?: Card; defences?: Card[] }) {
  return (
    <section className="section dark" id="controls">
      <div className="wrap split">
        <div className="a">
          <p className="eyebrow">Controls</p>
          <h2>Controls your auditors will recognize.</h2>
          <p className="lede">Every agent runs inside the business&apos;s controls, with a human sign-off on every result and a full audit trail.</p>
        </div>
        <div className="b">
          <div className="grid grid-4" style={{ marginTop: 0 }}>
            {[firstCard, ...CARDS.slice(1)].map((c) => (
              <div className="card" key={c.title}>
                <h3 style={{ fontSize: 18 }}>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap trust">
        <div className="trust-row">
          <div aria-label="Guardrails on every run" role="group" className="flow guard">
            <div className="flow-head">
              <b>Guardrails on every run</b>
              <span>Illustrative</span>
            </div>
            <ol>
              {RUN.map((s, i) => (
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
              <span>Approved, written and on record</span>
            </div>
          </div>

          <div className="trust-col">
            <div className="card never">
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

            <div className="card audit">
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
        </div>

        {defences && (
          <div className="defences">
            <h3>AI-specific defences</h3>
            <div className="grid">
              {defences.map((d) => (
                <div className="card" key={d.title}>
                  <h4>{d.title}</h4>
                  <p>{d.text}</p>
                </div>
              ))}
            </div>
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
