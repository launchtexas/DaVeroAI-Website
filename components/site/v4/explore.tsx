// "Explore other areas" (section.alt, no id) after #about on function pages, from docs/source/design-v4.html.
// Each page passes the other four function pages; `icon` is the card icon's inner SVG markup.
import Link from "next/link";
import { Icon } from "./icon";

export type ExploreCard = { href: string; icon: string; title: string; text: string };

export function Explore({ cards }: { cards: readonly ExploreCard[] }) {
  return (
    <section className="section alt">
      <div className="wrap">
        <p className="eyebrow">Explore other areas</p>
        <h2>The same model, across the enterprise</h2>
        <div className="grid">
          {cards.map((c) => (
            <Link className="card link" href={c.href} key={c.href}>
              <Icon paths={c.icon} />
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
