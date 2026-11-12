import { Icon } from "./icon";

export type WorkflowCard = { icon: string; title: string; text: string; items: string[] };

// Defaults: page-finance-accounting copy (the home page has no #workflows).
const CARDS: WorkflowCard[] = [
  {
    icon: '<path d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01"></path>',
    title: "Close & reconciliation",
    text: "Get to a clean, audit-ready close faster.",
    items: ["Intercompany eliminations", "Entity reconciliations", "Accruals", "Flux analysis", "Audit prep"],
  },
  {
    icon: '<path d="M3 17l6-6 4 4 8-8M14 7h7v7"></path>',
    title: "Revenue & collections",
    text: "Bill correctly and collect sooner.",
    items: ["Revenue-recognition edge cases", "Billing exceptions", "AR application", "Collections workflow"],
  },
  {
    icon: '<path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"></path>',
    title: "Expansion areas",
    text: "Where clients typically go next.",
    items: ["AP and accruals", "Treasury", "FP&A reporting packs", "Revenue operations"],
  },
];

/** Function-page #workflows. Props match FunctionPage["workflows"] in lib/functions.ts. */
export function Workflows({
  eyebrow = "Workflows we own",
  title = "Finance workflows, run by agents",
  lede = "We start with the workflows that hold up the close and expand from there.",
  cards = CARDS,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  cards?: WorkflowCard[];
}) {
  return (
    <section className="section" id="workflows">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lede">{lede}</p>
        <div className="grid">
          {cards.map((c) => (
            <div className="card" key={c.title}>
              <Icon paths={c.icon} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
