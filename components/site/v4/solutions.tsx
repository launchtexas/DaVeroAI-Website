import Link from "next/link";
import { CardIcon } from "./icons";

export type FunctionCard = { href: string; icon: string; title: string; text: string; bullets?: string[]; more: string };

export type FunctionCardsProps = {
  /** "solutions" gives the navy cards of the Home section; omit for the white "Explore other areas" cards. */
  id?: string;
  alt?: boolean;
  eyebrow: string;
  title: string;
  lede?: string;
  cards: FunctionCard[];
  /** Cards in the first row; the rest go in a centred second row (Home: 3 + 2). */
  firstRow?: number;
};

const Card = ({ c }: { c: FunctionCard }) => (
  <Link className="card link" href={c.href}>
    <CardIcon d={c.icon} />
    <h3>{c.title}</h3>
    <p>{c.text}</p>
    {c.bullets && (
      <ul>
        {c.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    )}
    <span className="more">{c.more}</span>
  </Link>
);

/** Grid of function cards: Home "Functions we support" and the function pages' "Explore other areas". */
export function FunctionCards({ id, alt, eyebrow, title, lede, cards, firstRow }: FunctionCardsProps) {
  const first = firstRow ? cards.slice(0, firstRow) : cards;
  const rest = firstRow ? cards.slice(firstRow) : [];
  return (
    <section className={`section${alt ? " alt" : ""}`} id={id}>
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
        <div className="grid">
          {first.map((c) => (
            <Card key={c.href} c={c} />
          ))}
        </div>
        {rest.length > 0 && (
          <div className="grid grid-2c" style={{ marginTop: 20 }}>
            {rest.map((c) => (
              <Card key={c.href} c={c} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
