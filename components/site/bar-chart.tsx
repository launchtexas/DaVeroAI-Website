"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useInViewOnce } from "./hooks";
import { useHydrated } from "./tabs";

type Bar = { label: string; value: number; display: string; ours?: boolean };

// §6.7 Horizontal bars on paper. Grow once in view; reduced motion is static (CSS).
export function BarChart({ title, bars, source, id }: { title: string; bars: Bar[]; source: string; id: string }) {
  const ref = useRef<HTMLElement>(null);
  const js = useHydrated();
  const seen = useInViewOnce(ref, 0.4);
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure ref={ref} className={cn(js && !seen && "bar-wait")} aria-labelledby={`${id}-cap`}>
      <div aria-hidden="true" className="space-y-6 border-l border-line-strong py-2">
        {bars.map((b) => (
          <div key={b.label} className="grid grid-cols-[1fr] gap-2 pl-4">
            <span className="t-mono text-muted-fg">{b.label}</span>
            <div className="flex items-center gap-4">
              <span
                className={cn("bar block h-10 rounded-r-[var(--r-chip)]", b.ours ? "bg-mark" : "bg-muted-fg")}
                style={{ width: `${(b.value / max) * 80}%` }}
              />
              <span className="t-h3 tabular-nums">{b.display}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="sr-only">
      <table>
        <caption>{title}</caption>
        <tbody>
          {bars.map((b) => (
            <tr key={b.label}>
              <th scope="row">{b.label}</th>
              <td>{b.display}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <figcaption id={`${id}-cap`} className="mt-6">
        <span className="block font-medium">{title}</span>
        <span className="t-mono mt-2 block text-faint">Source: {source}</span>
      </figcaption>
    </figure>
  );
}
