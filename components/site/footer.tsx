import Link from "next/link";
import { Logo } from "./logo";
import { CLOSE_LINE, footerCols } from "@/lib/content";
import { CtaButton } from "./blocks";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const linkClass = "inline-flex min-h-11 items-center text-muted-fg transition-colors duration-150 hover:text-fg";

export async function Footer() {
  const year = await currentYear();
  return (
    <footer className="overflow-hidden border-t border-line pt-16 lg:pt-20">
      <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="sm:col-span-2 lg:col-span-6">
          <Logo size="lg" />
          <p className="t-lead mt-4 max-w-[34ch]">{CLOSE_LINE}</p>
          <div className="mt-8">
            <CtaButton />
          </div>
        </div>
        {footerCols.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-3">
            <h2 className="t-mono mb-3 text-faint">{col.title}</h2>
            <ul>
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x mt-12 flex flex-col gap-2 border-t border-line pt-4 text-sm text-faint sm:flex-row sm:items-center sm:gap-6">
        <ul className="flex gap-6">
          <li>
            <Link href="/privacy" className={linkClass}>
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className={linkClass}>
              Terms
            </Link>
          </li>
        </ul>
        <p>
          &copy; {year} DaVero AI.
        </p>
      </div>
      {/* Kit stripes as the footer's closing edge (decorative). */}
      <div aria-hidden="true" className="mt-12 h-3 w-full bg-[linear-gradient(115deg,var(--brand)_0_62%,var(--white)_62%_63%,var(--midnight-3)_63%_100%)]" />
    </footer>
  );
}
