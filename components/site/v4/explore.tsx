// "Explore other areas" (section.alt, no id) after #about on function pages, from docs/source/design-v4.html.
// Each page passes the other four function pages; `d` is the card icon's path data.
import Link from "next/link";

export type ExploreCard = { href: string; d: string; title: string; text: string };

export function Explore({ cards }: { cards: readonly ExploreCard[] }) {
  return (
    <section className="section alt">
      <div className="wrap">
        <p className="eyebrow">Explore other areas</p>
        <h2>The same model, across the enterprise</h2>
        <div className="grid">
          {cards.map((c) => (
            <Link className="card link" href={c.href} key={c.href}>
              <svg aria-hidden="true" className="icon" fill="none" stroke="#C2410C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d={c.d} />
              </svg>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <span className="more">Explore →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
