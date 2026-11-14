import Image from "next/image";
import Link from "next/link";
import { ASSESSMENT_HREF, ASSESSMENT_LABEL, ESTIMATE_HREF, FUNCTIONS, SECTION_LINKS, functionHref } from "./v4/nav";

type L = { href: string; label: string };

const functions: L[] = FUNCTIONS.map((f) => ({ href: functionHref(f.slug), label: f.label }));

const company: L[] = [...SECTION_LINKS, { href: ESTIMATE_HREF, label: "Estimate savings" }, { href: "/contact", label: "Contact" }];

const legal: L[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/security", label: "Security" },
  { href: "/cookies", label: "Cookies" },
  { href: "/legal", label: "Legal notice" },
];

function Col({ title, links }: { title: string; links: L[] }) {
  return (
    <nav aria-label={`Footer: ${title}`} className="ft-col">
      <p className="ft-h">{title}</p>
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

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-main">
        <div className="ft-brand">
          {/* Official brand-kit lockup, reversed for the Deep Midnight footer (480×133). */}
          <Image alt="DaVero AI" height={32} src="/brand/davero-primary-reversed.png" style={{ width: 115, height: 32 }} width={115} />
          <p>DaVero AI agents extend enterprise platforms through the last mile, from system of record to business outcome.</p>
          <Link className="btn btn-primary btn-sm" href={ASSESSMENT_HREF}>
            {ASSESSMENT_LABEL}
          </Link>
        </div>
        <Col links={functions} title="Functions" />
        <Col links={company} title="Company" />
        <Col links={legal} title="Legal" />
        <div className="ft-col">
          <p className="ft-h">Contact</p>
          <ul>
            <li>
              <a href="mailto:ask@daveroai.com">ask@daveroai.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap">
        <div className="ft-bar">
          <p>© 2026 DaVero AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
