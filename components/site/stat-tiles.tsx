"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useInViewOnce, useReducedMotion } from "./hooks";

// §6.5 Stat tiles. Source is required: a tile without one is not rendered.
export function StatTiles({ stats, className }: { stats: Stat[]; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  const seen = useInViewOnce(ref, 0.4);
  const reduced = useReducedMotion();
  return (
    <ul ref={ref} className={cn("grid gap-px overflow-hidden rounded-[var(--r-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3", className)}>
      {stats
        .filter((s) => s.source)
        .map((s) => (
          <li key={s.value + s.label} className="flex flex-col bg-bg p-6 sm:p-8">
            <StatNumber stat={s} run={seen && !reduced} />
            <p className="t-small mt-4 text-fg">{s.label}</p>
            <p className="t-mono mt-auto pt-6 text-faint">Source: {s.source}</p>
          </li>
        ))}
    </ul>
  );
}

const DURATION = 900;

function StatNumber({ stat, run }: { stat: Stat; run: boolean }) {
  const m = stat.value.match(/^(\D*)(\d+)(.*)$/);
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (!run || !m) return;
    const [, pre, num, post] = m;
    const target = Number(num);
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(p < 1 ? `${pre}${Math.round(target * eased)}${post}` : null);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run]);

  return (
    <p className="t-stat">
      {stat.spoken ? (
        <>
          <span aria-hidden="true" className={cn(shown !== null && "hidden")}>
            {stat.value}
          </span>
          <span className="sr-only">{stat.spoken}</span>
        </>
      ) : (
        <span className={cn(shown !== null && "sr-only")}>{stat.value}</span>
      )}
      {shown !== null && <span aria-hidden="true">{shown}</span>}
    </p>
  );
}
