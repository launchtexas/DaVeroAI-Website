"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type RefObject } from "react";

// Scroll motion. Server HTML is always the finished state; JS hides (arms) only elements below the fold and only
// when motion is allowed, so a failed script or reduced motion shows everything as-is. CSS lives in globals.css (m-*).

/** Runs enter() once when el scrolls into view. Returns undefined, and never arms, under reduced motion or when el is
 *  already on screen; otherwise returns a cleanup, and the caller arms el. */
export function onEnter(el: Element | null, enter: () => void): (() => void) | undefined {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  if (el.getBoundingClientRect().top < window.innerHeight) return;
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      enter();
    },
    { rootMargin: "0px 0px -10% 0px" },
  );
  io.observe(el);
  return () => io.disconnect();
}

/** 0 → 1 (ease-out) over `ms` the first time ref enters view; 1 in every other case, so callers can multiply by it. */
export function useCountIn(ref: RefObject<Element | null>, ms = 1400) {
  const [k, setK] = useState(1);
  useEffect(() => {
    let raf = 0;
    const stop = onEnter(ref.current, () => {
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / ms, 1);
        setK(1 - (1 - p) ** 3);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    // Armed below the fold: start from zero (off screen, so nothing visible jumps). Otherwise show the final value,
    // also when a hidden (kept-mounted) page comes back mid-count.
    setK(stop ? 0 : 1);
    return () => {
      stop?.();
      cancelAnimationFrame(raf);
    };
  }, [ref, ms]);
  return k;
}

const NUM = /^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/;

/** Counts the number inside `text` up from 0, keeping prefix, suffix, decimals and grouping ("40%+", "$4.2M", "340K"). */
export function CountUp({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const k = useCountIn(ref);
  const m = NUM.exec(text);
  if (!m || k === 1) return <span ref={ref}>{text}</span>;
  const [, pre, num, post] = m;
  const dec = num.split(".")[1]?.length ?? 0;
  const v = (parseFloat(num.replace(/,/g, "")) * k).toLocaleString("en-US", {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
    useGrouping: num.includes(","),
  });
  return (
    <span ref={ref}>
      <span aria-hidden="true" className="m-num">
        {pre}
        {v}
        {post}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

// Pages without scroll reveals: legal pages and the contact form.
const SKIP = /^\/(contact|legal|privacy|terms|cookies|security)(\/|$)/;
// Groups: the element stays, its children enter in sequence (CSS per group).
const GROUPS = ".layers, #how .grid, #controls .grid";
// Items: each fades and rises; siblings stagger.
const ITEMS =
  "main .section :is(.eyebrow, h2, .lede, .card, .zone, .stat, .member):not(.lmt *, #how .grid *, #controls .grid *, .card *)";

/** Mounted once in the layout: arms the site-wide reveals on each page and pauses the hero loop off screen. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    const off: (() => void)[] = [];
    const arm = (el: Element, cls: string, delay = 0) => {
      const stop = onEnter(el, () => el.classList.add("m-go"));
      if (!stop) return;
      if (delay) (el as HTMLElement).style.setProperty("--m-d", `${delay}ms`);
      el.classList.add(cls);
      // Un-arm on leave: Next keeps the previous page mounted (hidden), and it must come back visible.
      off.push(() => {
        stop();
        el.classList.remove(cls);
      });
    };
    if (!SKIP.test(path)) {
      document.querySelectorAll(GROUPS).forEach((el) => arm(el, "m-grp"));
      const seen = new Map<Element | null, number>();
      document.querySelectorAll(ITEMS).forEach((el) => {
        const i = seen.get(el.parentElement) ?? 0;
        seen.set(el.parentElement, i + 1);
        arm(el, "m-rv", Math.min(i, 6) * 80);
      });
    }
    const flows = document.querySelectorAll(".flow");
    if (flows.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("m-off", !e.isIntersecting)));
      flows.forEach((f) => io.observe(f));
      off.push(() => io.disconnect());
    }
    return () => off.forEach((f) => f());
  }, [path]);
  return null;
}
