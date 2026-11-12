export type Step = { kicker: string; title: string; text: string };

export function How({ lede, steps, note }: { lede: string; steps: Step[]; note: string }) {
  return (
    <section className="section alt" id="how">
      <div className="wrap">
        <p className="eyebrow">How we work</p>
        <h2>From first conversation to agents in production</h2>
        <p className="lede">{lede}</p>
        <div className="grid">
          {steps.map((s) => (
            <div key={s.title} className="card step">
              <p className="kicker">{s.kicker}</p>
              <h3 style={{ fontSize: 24 }}>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "28px 0 0", fontSize: 15, color: "var(--muted)" }}>{note}</p>
      </div>
    </section>
  );
}

const POD = [
  {
    role: "POD LEAD",
    title: "Forward Deployed Consultant",
    text: "Domain expert who engages business leaders, understands the process, builds the skill and writes its rules. A peer to controllers, supply chain and procurement leaders.",
  },
  {
    role: "INTEGRATIONS",
    title: "Solutions Engineer",
    text: "Connects platform data, integrations and APIs so agents work from complete, current information.",
  },
  { role: "AGENTS", title: "Forward Deployed Agent Engineer", text: "Builds, tunes and deploys the agents." },
];

export function Pod() {
  return (
    <section className="section" aria-labelledby="pod-title">
      <div className="wrap">
        <p className="eyebrow">Our pod</p>
        <h2 id="pod-title">One pod per client, led by a domain expert</h2>
        <div className="pod">
          {POD.map((p) => (
            <div key={p.title} className="card">
              <p className="role">{p.role}</p>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
