// #controls from docs/source/design-v4.html. Function pages pass their own first card; cards 2-4 are shared.
type Card = { title: string; text: string };

const CARDS: Card[] = [
  { title: "Control ownership stays with management", text: "Management and external auditors retain control ownership." },
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

export function Controls({ firstCard = CARDS[0] }: { firstCard?: Card }) {
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
    </section>
  );
}
