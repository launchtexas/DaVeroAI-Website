import { TtvChart } from "./ttv-chart";

export type Stat = { num: string; text: string; src: string; highlight?: boolean };

export function WhyNow({ title, stats }: { title: string; stats: Stat[] }) {
  return (
    <section className="section" id="why-now">
      <div className="wrap">
        <p className="eyebrow">Why now</p>
        <h2>{title}</h2>
        <TtvChart />
        <div className="stats">
          {stats.map((s) => (
            <div key={s.text} className="stat">
              <p className="num" style={s.highlight ? { color: "var(--orange-ink)" } : undefined}>
                {s.num}
              </p>
              <p>{s.text}</p>
              <p className="src">{s.src}</p>
            </div>
          ))}
        </div>
        <p className="signoff">
          <span className="navy">AI is ready.</span> <span className="navy">Adoption isn&apos;t.</span>{" "}
          <span className="orange">DaVero AI closes that gap.</span>
        </p>
      </div>
    </section>
  );
}
