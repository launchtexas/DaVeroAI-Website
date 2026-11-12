import Image from "next/image";
import Link from "next/link";
import reversed from "@/public/brand/davero-primary-reversed.png";
import { FUNCTIONS, functionHref } from "./v4/nav";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const company = [
  { href: "/#how", label: "How we work" },
  { href: "/#controls", label: "Controls" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Cookies and Legal notice stay alongside the design's three legal links (the pages exist and must stay reachable).
const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
  { href: "/cookies", label: "Cookies" },
  { href: "/legal", label: "Legal notice" },
];

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} className="col">
      <strong>{title}</strong>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export async function Footer() {
  const year = await currentYear();
  return (
    <footer>
      <div className="wrap">
        <div style={{ flex: "1 1 280px" }}>
          <Link className="brand" href="/" aria-label="DaVero AI home">
            <Image src={reversed} alt="" sizes="200px" />
          </Link>
          <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>The last mile is where software, services and context meet.</p>
        </div>
        <div className="cols">
          <Col title="Solutions" links={FUNCTIONS.map((f) => ({ href: functionHref(f.slug), label: f.label }))} />
          <Col title="Company" links={company} />
          <Col title="Legal" links={legal} />
        </div>
      </div>
      <div className="wrap legal">&copy; {year} DaVero AI. All rights reserved.</div>
    </footer>
  );
}
