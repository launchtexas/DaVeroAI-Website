"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowRight, Check, CircleCheck, CircleX } from "lucide-react";
import { domains, lastMileStates, lastMileTest } from "@/lib/content";
import { cn } from "@/lib/utils";
import { tabKeys, useHydrated } from "./tabs";

// §6.1 Last-mile three-state explainer. Default: state 3. No autoplay.
export function LastMile({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const uid = useId();
  const js = useHydrated();
  const [active, setActive] = useState(2);
  const [domain, setDomain] = useState(0);
  const [msg, setMsg] = useState("");

  const selectState = (i: number) => {
    setActive(i);
    setMsg(`Showing: ${lastMileStates[i].title}.`);
  };
  const selectDomain = (i: number) => {
    setDomain(i);
    setMsg(`Showing last-mile examples in ${domains[i].name}.`);
  };

  const tabClass = (on: boolean) =>
    cn(
      "t-mono min-h-11 shrink-0 rounded-[var(--r-ctl)] border px-4 transition-colors duration-200",
      on ? "border-line-strong bg-surface text-fg" : "border-transparent text-muted-fg hover:text-fg",
    );

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {msg}
      </p>

      <div role="tablist" aria-label="How a workflow meets the platform" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {lastMileStates.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${uid}-stage`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => selectState(i)}
            onKeyDown={(e) => tabKeys(e, lastMileStates.length, active, selectState)}
            className={tabClass(active === i)}
          >
            {String(i + 1).padStart(2, "0")} {s.title}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-stage`}
        aria-labelledby={`${uid}-tab-${active}`}
        className="mt-6 grid gap-2 md:grid-cols-[1.1fr_1fr_1.4fr]"
      >
        {lastMileStates.map((s, i) => {
          const on = !js || active === i;
          const last = !s.covered;
          return (
            <div
              key={s.id}
              className={cn(
                "flex min-h-32 min-w-0 flex-col rounded-[var(--r-box)] border p-5 transition-colors duration-[240ms]",
                last ? "border-mark" : "border-line",
                on ? "bg-surface-2 text-fg" : "bg-transparent text-muted-fg",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="t-mono text-faint">Zone {i + 1}</span>
                {last && <span className="chip t-mono border-mark text-fg">DaVero AI</span>}
              </div>
              <p className={cn("mt-3", on && "font-medium")}>{s.title}</p>
              <p className="t-small mt-auto flex items-center gap-1.5 pt-3 text-muted-fg">
                {s.covered ? (
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0" />
                ) : (
                  <CircleX aria-hidden="true" className="size-4 shrink-0 text-mark" />
                )}
                {s.covered ? "Covered" : "Not covered"}
              </p>
              <p className={cn("t-small mt-2 text-muted-fg transition-opacity duration-200", js && active !== i && "invisible")}>
                {s.body}
              </p>
            </div>
          );
        })}
      </div>

      {variant === "compact" && (
        <Link href="/agentic-ai#last-mile" className="link link-arrow mt-6">
          What is the last mile?
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      )}

      {variant === "full" && (
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <h3 className="t-h3">The test: a workflow is last mile if it is&hellip;</h3>
            <ol className="mt-6 border-t border-line">
              {lastMileTest.map((t, i) => (
                <li key={t.title} className="flex gap-4 border-b border-line py-4">
                  <span className="t-mono pt-1 text-faint">{i + 1}</span>
                  <span className="flex-1">
                    <span className="font-medium">{t.title}</span>
                    <span className="block text-muted-fg">{t.body}</span>
                  </span>
                  <Check
                    aria-hidden="true"
                    className={cn("mt-1 size-5 shrink-0 text-mark transition-opacity duration-200", active === 2 ? "opacity-100" : "opacity-0")}
                  />
                </li>
              ))}
            </ol>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:row-start-1">
            <h3 className="t-h3">The last mile, by domain</h3>
            <div role="tablist" aria-label="Domains" className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1">
              {domains.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  id={`${uid}-dtab-${i}`}
                  aria-selected={domain === i}
                  aria-controls={`${uid}-dpanel-${i}`}
                  tabIndex={domain === i ? 0 : -1}
                  onClick={() => selectDomain(i)}
                  onKeyDown={(e) => tabKeys(e, domains.length, domain, selectDomain)}
                  className={tabClass(domain === i)}
                >
                  {d.name}
                </button>
              ))}
            </div>
            {domains.map((d, i) => (
              <div
                key={d.id}
                role="tabpanel"
                id={`${uid}-dpanel-${i}`}
                aria-labelledby={`${uid}-dtab-${i}`}
                hidden={js && domain !== i}
                className="mt-6 rounded-[var(--r-box)] border border-mark bg-surface-2 p-6"
              >
                <p className="t-mono text-faint">{js ? "The last mile here" : d.name}</p>
                <ul className="mt-4 space-y-2">
                  {d.examples.map((x) => (
                    <li key={x} className="flex gap-3">
                      <span aria-hidden="true" className="dot mt-2 bg-mark" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
