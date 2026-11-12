export type PodRole = { role: string; title: string; text: string };

const ROLES: PodRole[] = [
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

/** Home-only, unnamed section between #how and #controls (the mock gives it no id). */
export function Pod({
  eyebrow = "Our pod",
  title = "One pod per client, led by a domain expert",
  roles = ROLES,
}: {
  eyebrow?: string;
  title?: string;
  roles?: PodRole[];
}) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="pod">
          {roles.map((r) => (
            <div className="card" key={r.title}>
              <p className="role">{r.role}</p>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
