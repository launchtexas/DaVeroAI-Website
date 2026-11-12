import Image from "next/image";
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
  { href: "/cookies", label: "Cookies" },
  { href: "/legal", label: "Legal notice" },
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
          {/* Official brand-kit lockup, reversed for the Deep Midnight footer. */}
          <Image alt="DaVero AI" height={28} src="/brand/davero-primary-reversed.png" style={{ width: 101, height: 28 }} width={101} />
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
