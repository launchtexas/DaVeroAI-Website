"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import reversed from "@/public/brand/davero-primary-reversed.png";
import { ASSESSMENT_HREF, ESTIMATE_HREF, FUNCTIONS, SECTION_LINKS, functionHref } from "./v4/nav";

const Chevron = () => (
  <svg aria-hidden="true" fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="12">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dd = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!dd.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  const onFunctions = pathname.startsWith("/functions/");
  const closeMenu = () => menu.current?.removeAttribute("open");

  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="DaVero AI home">
          <Image src={reversed} alt="" sizes="180px" priority />
        </Link>
        <nav aria-label="Primary" className="links">
          <div
            ref={dd}
            className={`dd${open ? " open" : ""}${onFunctions ? " is-current" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Escape" && open) {
                setOpen(false);
                dd.current?.querySelector("button")?.focus();
              }
            }}
            onBlur={(e) => {
              if (!dd.current?.contains(e.relatedTarget as Node)) setOpen(false);
            }}
          >
            <button aria-expanded={open} aria-controls="dd-functions" className="dd-btn" type="button" onClick={() => setOpen((o) => !o)}>
              Functions we support
              <Chevron />
            </button>
            <div className="dd-menu" id="dd-functions" onClick={() => setOpen(false)}>
              <ul>
                {FUNCTIONS.map((f) => (
                  <li key={f.slug}>
                    <Link href={functionHref(f.slug)} aria-current={pathname === functionHref(f.slug) ? "page" : undefined}>
                      {f.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {SECTION_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="nav-est" href={ESTIMATE_HREF}>
            Estimate Savings
          </Link>
        </nav>
        <Link className="btn btn-primary btn-sm cta-desktop" href={ASSESSMENT_HREF} aria-current={pathname === "/contact" ? "page" : undefined}>
          Book an assessment
        </Link>
        <details className="menu" ref={menu}>
          <summary>Menu</summary>
          <nav aria-label="Mobile">
            <ul>
              <li>
                <Link href="/" onClick={closeMenu}>
                  Home
                </Link>
              </li>
              {FUNCTIONS.map((f) => (
                <li key={f.slug}>
                  <Link href={functionHref(f.slug)} onClick={closeMenu} aria-current={pathname === functionHref(f.slug) ? "page" : undefined}>
                    {f.label}
                  </Link>
                </li>
              ))}
              {SECTION_LINKS.filter((l) => l.href !== "/#controls").map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={closeMenu}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={ESTIMATE_HREF} onClick={closeMenu}>
                  Estimate Savings
                </Link>
              </li>
              <li>
                <Link href={ASSESSMENT_HREF} onClick={closeMenu}>
                  Book an assessment
                </Link>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
