const CONTROLS = [
  ["Control ownership stays with management", "Management and external auditors retain control ownership."],
  [
    "Least-privilege agent access",
    "Each agent gets only the permissions its workflow needs, through scoped, revocable credentials. No shared logins, no standing admin rights.",
  ],
  [
    "Guardrails and kill switch",
    "Agents run inside defined rules and thresholds, are monitored continuously, and can be paused instantly by the business.",
  ],
  ["Client data stays protected", "Data is encrypted in transit and at rest, never used to train shared models, and stays within approved systems."],
];

export function Controls() {
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
            {CONTROLS.map(([t, p]) => (
              <div key={t} className="card">
                <h3 style={{ fontSize: 18 }}>{t}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
