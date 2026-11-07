import Link from "next/link";
import { Logo } from "./logo";
import { EMAIL } from "@/lib/content";
import { Tbd } from "./tbd";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const company = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
const legal = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold text-fg">{title}</h2>
      {children}
    </div>
  );
}

const linkClass = "inline-flex min-h-11 items-center text-muted-foreground transition-colors duration-150 hover:text-fg";

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="border-t border-line pt-16 pb-8">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-muted-foreground">Enterprise Intelligence, Delivered.</p>
        </div>
        <Col title="Company">
          <ul>
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col title="Legal">
          <ul>
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Col>
        <Col title="Contact">
          <a href={`mailto:${EMAIL}`} className={linkClass}>
            {EMAIL}
          </a>
        </Col>
      </div>
      <p className="container-x mt-12 text-sm text-faint">
        © {year} Davero AI. <Tbd>legal entity name, if different</Tbd>
      </p>
    </footer>
  );
}
