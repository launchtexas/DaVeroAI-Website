"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades up [data-reveal] elements once (docs/design.md §10). Adds the hidden class from JS only.
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.reveal)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    for (const el of els) {
      const siblings = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal")) : [];
      const i = Math.min(siblings.indexOf(el), 5);
      if (i > 0) el.style.transitionDelay = `${i * 60}ms`;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) continue; // already on screen: leave visible
      el.classList.add("reveal");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
