"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ASSESSMENT_HREF, ESTIMATE_HREF, FUNCTIONS, SECTION_LINKS, functionHref } from "./v4/nav";
import { Mark } from "./v4/icons";

// Markup 1:1 with docs/source/design-v4.html <header class="top">; the dropdown script is React state (CSP).
export function Header() {
  const [open, setOpen] = useState(false);
  const dd = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dd.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const closeMenu = () => menu.current?.removeAttribute("open");

  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/">
          <Mark />
          <span>
            DaVero <span className="accent">AI</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="links">
          <div
            ref={dd}
            className={`dd${open ? " open" : ""}`}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
                btn.current?.focus();
              }
            }}
          >
            <button ref={btn} aria-expanded={open} aria-haspopup="true" className="dd-btn" type="button" onClick={() => setOpen((o) => !o)}>
              Functions we support
              <svg aria-hidden="true" fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="12">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="dd-menu" role="menu">
              {FUNCTIONS.map((f) => (
                <Link key={f.slug} href={functionHref(f.slug)} role="menuitem" onClick={() => setOpen(false)}>
                  {f.label}
                </Link>
              ))}
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
        <Link className="btn btn-primary btn-sm cta-desktop" href={ASSESSMENT_HREF}>
          Book an assessment
        </Link>
        <details className="menu" ref={menu}>
          <summary>Menu</summary>
          <nav aria-label="Mobile">
            <Link href="/" onClick={closeMenu}>
              Home
            </Link>
            {FUNCTIONS.map((f) => (
              <Link key={f.slug} href={functionHref(f.slug)} onClick={closeMenu}>
                {f.label}
              </Link>
            ))}
            {SECTION_LINKS.filter((l) => l.href !== "/#controls").map((l) => (
              <Link key={l.href} href={l.href} onClick={closeMenu}>
                {l.label}
              </Link>
            ))}
            <Link href={ESTIMATE_HREF} onClick={closeMenu}>
              Estimate Savings
            </Link>
            <Link href={ASSESSMENT_HREF} onClick={closeMenu}>
              Book an assessment
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
