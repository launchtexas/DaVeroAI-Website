"use client";

import { useEffect, useRef } from "react";

// Barometer bar: fills to 85% and the pin slides with it when the card scrolls into view, then the pin pulses.
// Server HTML (and reduced motion) shows the finished state, so nothing depends on JavaScript.
export function BaroTrack() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        requestAnimationFrame(() => el.classList.add("go"));
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="track">
      <span className="fill" />
      <span className="pin" />
    </div>
  );
}
