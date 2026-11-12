import Link from "next/link";
import { Icon } from "./icon";

export type SolutionCard = { href: string; icon: string; title: string; text: string; items: string[]; more: string };

const CARDS: SolutionCard[] = [
  {
    href: "/finance-accounting",
    icon: '<path d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01"></path>',
    title: "Finance & Accounting",
    text: "Get to a faster, audit-ready close on AI-native ERPs.",
    items: ["Intercompany eliminations", "Entity reconciliations", "Revenue-recognition edge cases"],
    more: "Explore Finance & Accounting →",
  },
  {
    href: "/supply-chain",
    icon: '<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>',
    title: "Supply Chain",
    text: "Clear the exceptions between warehouse, carrier, supplier and ledger.",
    items: ["Inventory and stock movement reconciliation", "Order fulfilment exceptions", "Landed-cost accruals"],
    more: "Explore Supply Chain →",
  },
  {
    href: "/procurement",
    icon: '<path d="M3 7h18v13H3zM8 7V4h8v3"></path>',
    title: "Procurement",
    text: "Keep procure-to-pay moving without breaking internal controls.",
    items: ["Supplier onboarding", "Requisition-to-PO approvals", "PO-receipt-invoice exceptions"],
    more: "Explore Procurement →",
  },
  {
    href: "/security-governance",
    icon: '<path d="M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z"></path>',
    title: "Security & Governance",
    text: "Keep access, compliance and risk controls current without manual overhead.",
    items: ["Access review and certification cycles", "Policy exception tracking", "Audit evidence collection"],
    more: "Explore Security & Governance →",
  },
  {
    href: "/insurance",
    icon: '<path d="M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6"></path>',
    title: "Insurance",
    text: "Reduce manual effort across claims, bordereaux and premium workflows.",
    items: ["Claims exception triage", "Bordereaux reconciliation", "Premium and commission accruals"],
    more: "Explore Insurance →",
  },
];

function Card({ c }: { c: SolutionCard }) {
  return (
    <Link className="card link" href={c.href}>
      <Icon paths={c.icon} />
      <h3>{c.title}</h3>
      <p>{c.text}</p>
      <ul>
        {c.items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <span className="more">{c.more}</span>
    </Link>
  );
}

/** Home #solutions. The mock puts the first 3 cards in .grid and the rest in .grid.grid-2c. */
export function Solutions({
  eyebrow = "Solutions",
  title = "Functions we support",
  lede = "Each function is led by its own domain specialists, with a dedicated workflow library and controls playbook.",
  cards = CARDS,
}: {
  eyebrow?: string;
  title?: string;
  lede?: string;
  cards?: SolutionCard[];
}) {
  return (
    <section className="section" id="solutions">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="lede">{lede}</p>
        <div className="grid">
          {cards.slice(0, 3).map((c) => (
            <Card key={c.href} c={c} />
          ))}
        </div>
        <div className="grid grid-2c" style={{ marginTop: 20 }}>
          {cards.slice(3).map((c) => (
            <Card key={c.href} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
