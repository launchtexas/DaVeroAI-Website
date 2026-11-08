"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Start every new page at the very top (links with a #hash keep their anchor).
 * Without this, Home could open 100-250 px below the hero after the logo was clicked on a scrolled page:
 * Next.js scrolls the new page into view, but a smooth scroll still running on the old page carried on.
 * Smooth scrolling is switched off for the reset (which cancels any scroll in progress), the reset is
 * repeated on the next frame, then smooth scrolling is restored. Rendered last in the layout so it runs
 * after Next.js's own scroll handling.
 */
export function ScrollReset() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      html.style.scrollBehavior = prev;
    });
    return () => {
      cancelAnimationFrame(id);
      html.style.scrollBehavior = prev;
    };
  }, [pathname]);
  return null;
}
