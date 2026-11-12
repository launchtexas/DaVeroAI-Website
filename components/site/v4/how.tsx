const KICKERS = ["Step 1 · Weeks 1–5", "Step 2 · Within the 6–10 week embed", "Step 3 · Ongoing"] as const;
const TITLES = ["Embed", "Build & harden", "Run & improve"] as const;

/** #how. Kickers and step titles are shared by every page; function pages pass FunctionPage["how"] from lib/functions.ts. */
export function How({
  eyebrow = "How we work",
  title = "From first conversation to agents in production",
  lede = "Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside finance and operations leaders from day one.",
  stepTexts = [
    "A Forward Deployed Consultant embeds with the business, maps the process and identifies which last-mile workflows agents can take over.",
    "We turn each workflow into an agent skill, harden it with rules, controls and edge cases, and business owners validate it before go-live.",
    "We run, monitor and tune the agents every month, and every engagement adds to our workflow library.",
  ],
  expand = "Then we expand to the next workflow, entity or function. Advisory and assurance roles remain with existing advisors and auditors.",
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  stepTexts?: readonly [string, string, string];
  expand?: string;
}) {
  return (
    <section className="section alt" id="how">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lede">{lede}</p>
        <div className="grid">
          {stepTexts.map((text, i) => (
            <div className="card step" key={KICKERS[i]}>
              <p className="kicker">{KICKERS[i]}</p>
              <h3 style={{ fontSize: 24 }}>{TITLES[i]}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "28px 0 0", fontSize: 15, color: "var(--muted)" }}>{expand}</p>
      </div>
    </section>
  );
}
