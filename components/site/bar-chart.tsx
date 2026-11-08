"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "./hooks";
import { useHydrated } from "./tabs";

type Bar = { label: string; value: number; display: string; range?: string; ours?: boolean };

// §6.7 Horizontal bars on paper. Grow once in view; reduced motion is static (CSS).
export function BarChart({ title, bars, source, id, note }: { title: string; bars: Bar[]; source: string; id: string; note?: string }) {
  const ref = useRef<HTMLElement>(null);
  const js = useHydrated();
  const seen = useInViewOnce(ref, 0.4);
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure ref={ref} className={cn(js && !seen && "bar-wait")} aria-labelledby={`${id}-cap`}>
      {bars.length > 4 ? (
        // Dense variant (10-category chart): label column + bar, one row per category.
        <div aria-hidden="true" className="space-y-3 sm:space-y-2">
          {bars.map((b) => (
            <div key={b.label} className="grid gap-1 sm:grid-cols-[13.5rem_1fr] sm:items-center sm:gap-4">
              <span className={cn("t-small", b.ours ? "font-semibold text-fg" : "text-muted-fg")}>{b.label}</span>
              <div className="flex items-center gap-3">
                <span
                  className={cn("bar block h-6 shrink-0 rounded-r-[var(--r-chip)] sm:h-7", b.ours ? "bg-[var(--brand)]" : "bg-line-strong")}
                  style={{ width: `${(b.value / max) * 62}%` }}
                />
                <span className="t-small leading-tight font-semibold tabular-nums sm:whitespace-nowrap">
                  {b.display}
                  {b.range && <span className="block font-normal text-muted-fg sm:ml-1.5 sm:inline">{b.range}</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div aria-hidden="true" className="space-y-6 border-l border-line-strong py-2">
        {bars.map((b) => (
          <div key={b.label} className="grid grid-cols-[1fr] gap-2 pl-4">
            <span className="t-mono text-muted-fg">{b.label}</span>
            <div className="flex items-center gap-4">
              <span
                className={cn("bar block h-10 rounded-r-[var(--r-chip)]", b.ours ? "bg-[var(--brand)]" : "bg-line-strong")}
                style={{ width: `${(b.value / max) * 80}%` }}
              />
              <span className="t-h3 tabular-nums">{b.display}</span>
            </div>
          </div>
        ))}
      </div>
      )}
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <tbody>
          {bars.map((b) => (
            <tr key={b.label}>
              <th scope="row">{b.label}</th>
              <td>
                {b.display}
                {b.range && ` (range ${b.range})`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <figcaption id={`${id}-cap`} className="mt-6">
        <span className="block font-semibold">{title}</span>
        {note && <span className="t-small mt-1 block text-muted-fg">{note}</span>}
        <span className="t-mono mt-2 block text-faint">Source: {source}</span>
      </figcaption>
    </figure>
  );
}
