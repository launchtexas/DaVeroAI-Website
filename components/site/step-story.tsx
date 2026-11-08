"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./hooks";
import { useHydrated } from "./tabs";

type Step = { title: string; body: string; highlight?: boolean };

// §6.4 Sticky step story. ≥1024 with motion: sticky left column + rail, step in the middle is active.
// Otherwise a plain ordered list at full contrast.
export function StepStory({
  id,
  head,
  steps,
  aside,
  footer,
}: {
  id: string;
  head: React.ReactNode;
  steps: Step[];
  aside?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const js = useHydrated();
  const reduced = useReducedMotion();
  const live = js && !reduced;
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (!live || !listRef.current) return;
    const items = Array.from(listRef.current.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(items.indexOf(e.target));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [live]);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
      <div className="lg:col-span-5">
        <div className={cn(live && "sticky-col")}>
          {head}
          {live && (
            <ol aria-label="Steps" className="mt-10 hidden border-l border-line lg:block">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <a
                    href={`#${id}-${i + 1}`}
                    aria-current={active === i ? "step" : undefined}
                    className={cn(
                      "relative -ml-px flex min-h-11 items-center gap-3 border-l-2 pl-5 text-sm transition-colors duration-200",
                      active === i ? "border-mark text-fg" : "border-transparent text-muted-fg hover:text-fg",
                    )}
                  >
                    <span className="t-mono">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          )}
          {aside && <div className="mt-10">{aside}</div>}
        </div>
      </div>
      <div className="lg:col-span-7">
        <ol ref={listRef} className="border-t border-line">
          {steps.map((s, i) => (
            <li
              key={s.title}
              id={`${id}-${i + 1}`}
              className={cn(
                "flex flex-col justify-center border-b border-line py-8",
                live && "lg:min-h-[60vh] lg:border-l-2 lg:pl-8",
                live && (active === i ? "lg:border-l-mark" : "lg:border-l-transparent"),
              )}
            >
              <div className={cn(s.highlight && "card border-mark bg-surface-2")}>
                <p className="t-mono text-faint">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className={cn("t-h3 mt-3 transition-colors duration-200", live && active !== i && "lg:text-muted-fg")}>{s.title}</h3>
                <p className={cn("mt-3 max-w-[52ch] transition-colors duration-200", live && active !== i ? "lg:text-faint" : "text-muted-fg")}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        {footer}
      </div>
    </div>
  );
}
