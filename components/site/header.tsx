"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ASSESSMENT_HREF, ESTIMATE_HREF, FUNCTIONS, SECTION_LINKS, functionHref } from "./v4/nav";

// Markup 1:1 with docs/source/design-v4.html <header class="top">; the dropdown script is React state (CSP).
export function Header() {
  const [open, setOpen] = useState(false);
  // Set after Escape or a pick, so a pointer still resting on the menu doesn't hold it open; cleared on mouse leave.
  const [hide, setHide] = useState(false);
  const path = usePathname();
  const dd = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!dd.current?.contains(e.target as Node)) setOpen(false);
      if (!menu.current?.contains(e.target as Node)) menu.current?.removeAttribute("open");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu.current?.open) {
        menu.current.removeAttribute("open");
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);
  const pick = () => {
    setOpen(false);
    setHide(true);
  };

  const closeMenu = () => menu.current?.removeAttribute("open");

  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href="/">
          {/* Official brand-kit lockup, reversed for the Midnight header. */}
          <Image alt="DaVero AI" height={36} priority src="/brand/davero-primary-reversed.png" style={{ width: 130, height: 36 }} width={130} />
        </Link>
        <nav aria-label="Primary" className="links">
          <div
            ref={dd}
            className={`dd${open ? " open" : ""}${hide ? " hide" : ""}${FUNCTIONS.some((f) => functionHref(f.slug) === path) ? " is-current" : ""}`}
            onMouseLeave={() => setHide(false)}
            onBlur={(e) => {
              if (!dd.current?.contains(e.relatedTarget as Node)) setOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                pick();
                btn.current?.focus();
              }
            }}
          >
            <button ref={btn} aria-expanded={open} className="dd-btn" type="button" onClick={() => {
                setHide(false);
                setOpen((o) => !o);
              }}>
              Functions we support
              <svg aria-hidden="true" fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="12">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="dd-menu">
              {FUNCTIONS.map((f) => (
                <Link key={f.slug} aria-current={functionHref(f.slug) === path ? "page" : undefined} href={functionHref(f.slug)} onClick={pick}>
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
            Estimate savings
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
              <Link key={f.slug} aria-current={functionHref(f.slug) === path ? "page" : undefined} href={functionHref(f.slug)} onClick={closeMenu}>
                {f.label}
              </Link>
            ))}
            {SECTION_LINKS.filter((l) => l.href !== "/#controls").map((l) => (
              <Link key={l.href} href={l.href} onClick={closeMenu}>
                {l.label}
              </Link>
            ))}
            <Link href={ESTIMATE_HREF} onClick={closeMenu}>
              Estimate savings
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
