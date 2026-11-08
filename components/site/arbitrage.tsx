"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { arbitrage } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useInViewOnce, useReducedMotion } from "./hooks";
import { useHydrated } from "./tabs";

type Side = "yesterday" | "tomorrow";

// §6.2 Labor arbitrage → agent arbitrage. Toggle below 1024px; pairwise reveal at ≥1024, once.
export function Arbitrage() {
  const ref = useRef<HTMLDivElement>(null);
  const js = useHydrated();
  const reduced = useReducedMotion();
  const seen = useInViewOnce(ref, 0.25);
  const [side, setSide] = useState<Side>("tomorrow");
  const animate = js && !reduced;
  const hide = animate && !seen;
  // Below 1024 with JS, only the selected column shows.
  const off = (k: Side) => js && side !== k && "max-lg:hidden";
  const fade = (delay: number) => ({
    className: cn("transition-[opacity,transform] duration-500", hide && "lg:translate-y-2 lg:opacity-0"),
    style: animate ? { transitionDelay: `${delay}ms` } : undefined,
  });

  return (
    <div ref={ref}>
      <div role="group" aria-label="Show column" className="mb-6 inline-flex rounded-[var(--r-ctl)] border border-line p-1 lg:hidden">
        {(["yesterday", "tomorrow"] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={side === k}
            onClick={() => setSide(k)}
            className={cn("t-mono min-h-11 rounded-[var(--r-chip)] px-4", side === k ? "bg-surface-2 text-fg" : "text-muted-fg hover:text-fg")}
          >
            {arbitrage[k].label}
          </button>
        ))}
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{arbitrage.title}</caption>
        <thead>
          <tr>
            {(["yesterday", "tomorrow"] as const).map((k, i) => (
              <th
                key={k}
                scope="col"
                className={cn(
                  "border-b pb-4 align-bottom font-normal lg:w-[46%]",
                  i ? "border-mark" : "border-line-strong",
                  i && "lg:pl-[8%]",
                  off(k),
                )}
              >
                <span className="t-mono block text-faint">{arbitrage[k].label}</span>
                <span className="t-h3 mt-1 block">{arbitrage[k].title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arbitrage.yesterday.rows.map((left, ri) => {
            const right = arbitrage.tomorrow.rows[ri];
            const l = fade(ri * 160);
            const r = fade(ri * 160 + 80);
            return (
              <tr key={left} className="border-b border-line">
                <td className={cn("py-5 align-top text-muted-fg lg:pr-8", off("yesterday"))}>
                  <span {...l} className={cn(l.className, "block")}>
                    {left}
                  </span>
                </td>
                <td className={cn("relative py-5 align-top lg:pl-[8%]", off("tomorrow"))}>
                  <ArrowRight
                    aria-hidden="true"
                    className={cn("absolute top-6 left-[2%] hidden size-5 text-mark transition-opacity duration-200 lg:block", hide && "opacity-0")}
                    style={animate ? { transitionDelay: `${ri * 160 + 120}ms` } : undefined}
                  />
                  <span {...r} className={cn(r.className, "block")}>
                    {right}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
