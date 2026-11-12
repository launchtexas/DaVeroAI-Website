import Link from "next/link";
import { FUNCTIONS, functionHref } from "./v4/nav";

// Markup 1:1 with docs/source/design-v4.html <footer>; the mock's "#" legal links point at the real pages.
const company = [
  { href: "/#how", label: "How we work" },
  { href: "/#controls", label: "Controls" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
];

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="col">
      <strong>{title}</strong>
      {links.map((l) => (
        <Link key={l.href} href={l.href}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div style={{ flex: "1 1 280px" }}>
          <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff" }}>
            DaVero <span className="accent">AI</span>
          </p>
          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>The last mile is where software, services and context meet.</p>
        </div>
        <div className="cols">
          <Col title="Solutions" links={FUNCTIONS.map((f) => ({ href: functionHref(f.slug), label: f.label }))} />
          <Col title="Company" links={company} />
          <Col title="Legal" links={legal} />
        </div>
      </div>
      <div className="wrap legal">© 2026 DaVero AI. All rights reserved.</div>
    </footer>
  );
}
