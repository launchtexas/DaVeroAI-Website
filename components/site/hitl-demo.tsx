"use client";

import { useEffect, useRef, useState } from "react";
import { BookCheck, Bot, Check, ChevronLeft, ChevronRight, Pause, Play, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hitlSteps, HITL_ALT } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ActorChip, Legend } from "./blocks";
import { useInViewOnce, useReducedMotion } from "./hooks";
import { useHydrated } from "./tabs";

const icons = [Bot, User, UserCheck, BookCheck];
const LAST = hitlSteps.length - 1;
const TICK = 2400;
const trailActor = ["Agent", "Human · SME team", "Human · SME team", "Platform · system of record"];

// §6.3 Human-in-the-loop demo. Compact (Home) autoplays once at 50% in view; full (Governance) waits for Play.
export function HitlDemo({ variant = "compact" }: { variant?: "compact" | "full" }) {
  const ref = useRef<HTMLDivElement>(null);
  const js = useHydrated();
  const reduced = useReducedMotion();
  const seen = useInViewOnce(ref, 0.5);
  const [chosen, setChosen] = useState<number | null>(null);
  const [mode, setMode] = useState<"auto" | "playing" | "paused" | "done">("auto");

  // Untouched + reduced motion: show the complete state.
  const step = chosen ?? (reduced ? LAST : 0);
  const playing = mode === "playing" || (mode === "auto" && variant === "compact" && seen && !reduced && js);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      const next = Math.min(step + 1, LAST);
      setChosen(next);
      setMode(next === LAST ? "done" : "playing");
    }, TICK);
    return () => clearTimeout(t);
  }, [playing, step]);

  const go = (i: number) => {
    setChosen(Math.max(0, Math.min(LAST, i)));
    setMode("done"); // any interaction stops autoplay for good
  };
  const togglePlay = () => {
    if (playing) return setMode("paused");
    if (step === LAST) setChosen(0);
    setMode("playing");
  };

  const s = hitlSteps[step];
  const announce = js && (chosen !== null || playing) ? `Step ${step + 1} of 4: ${s.title}. ${s.line}` : "";

  return (
    <div ref={ref}>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>
      <div className="rounded-[var(--r-card)] border border-line bg-surface-2 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Legend />
          <span className="t-mono text-faint">Illustrative example</span>
        </div>

        {/* Task card: moves across the columns at ≥1024 */}
        <div className="relative hidden h-24 lg:block" aria-hidden="true">
          <div
            className="absolute inset-y-0 left-0 w-1/4 pr-4 transition-transform duration-[400ms] ease-[var(--ease)]"
            style={{ transform: `translateX(${step * 100}%)` }}
          >
            <TaskCard done={step === LAST} />
          </div>
        </div>
        <div className="mb-4 lg:hidden">
          <TaskCard done={step === LAST} />
        </div>

        <ol className="grid gap-3 lg:mt-4 lg:grid-cols-4 lg:gap-4">
          {hitlSteps.map((h, i) => {
            const Icon = icons[i];
            const on = i === step;
            const past = i < step;
            return (
              <li
                key={h.id}
                className={cn(
                  "rounded-[var(--r-box)] border p-4 transition-colors duration-200 lg:min-h-56",
                  on ? (h.actor === "human" ? "border-mark-human bg-surface" : "border-mark bg-surface") : "border-line",
                )}
              >
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={on ? "step" : undefined}
                  className="-m-2 flex min-h-11 w-[calc(100%+1rem)] items-center gap-3 rounded-[var(--r-ctl)] p-2 text-left"
                >
                  <span className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="t-h3 flex-1">{h.title}</span>
                  {(past || (on && i === LAST)) && <Check aria-hidden="true" className="size-5 text-mark" />}
                  {past && <span className="sr-only">(done)</span>}
                </button>
                <div className="mt-3 flex items-center gap-2">
                  <Icon aria-hidden="true" strokeWidth={1.5} className={cn("size-5", h.actor === "human" ? "text-mark-human" : "text-mark")} />
                  <ActorChip actor={h.actor} label={h.actorLabel} />
                </div>
                <p className={cn("t-small mt-3 transition-colors duration-200", on || !js ? "text-fg" : "text-muted-fg")}>{variant === "full" ? h.detail : h.line}</p>
                {h.id === "approve" && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-4 inline-flex min-h-9 items-center rounded-[var(--r-ctl)] border px-3 text-sm",
                      on ? "border-mark-human text-fg" : "border-line-strong text-muted-fg",
                    )}
                  >
                    Approve
                  </span>
                )}
                {h.id === "record" && <p className="t-mono mt-4 text-faint">Full audit trail</p>}
              </li>
            );
          })}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={togglePlay} disabled={!js} className="min-w-28">
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button type="button" variant="secondary" size="icon" onClick={() => go(step - 1)} disabled={!js || step === 0} aria-label="Previous step">
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button type="button" variant="secondary" size="icon" onClick={() => go(step + 1)} disabled={!js || step === LAST} aria-label="Next step">
            <ChevronRight aria-hidden="true" />
          </Button>
          <p className="t-mono text-muted-fg">
            Step {step + 1} of {hitlSteps.length}
          </p>
        </div>
      </div>

      {variant === "full" && (
        <div className="mt-10">
          <h3 className="t-h3">Audit trail</h3>
          <ol className="mt-4 border-t border-line">
            {hitlSteps.map((h, i) =>
              js && i > step ? null : (
                <li key={h.id} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[7rem_14rem_1fr] sm:gap-6">
                  <span className="t-mono text-faint">Step {i + 1}</span>
                  <span className="t-mono text-muted-fg">{trailActor[i]}</span>
                  <span>{h.detail}</span>
                </li>
              ),
            )}
          </ol>
        </div>
      )}
      <p className="sr-only">{HITL_ALT}</p>
    </div>
  );
}

function TaskCard({ done }: { done: boolean }) {
  return (
    <div className="flex h-full flex-col justify-center rounded-[var(--r-box)] border border-line-strong bg-surface px-4 py-3">
      <span className="chip t-mono w-fit !py-0.5">Example</span>
      <p className="t-small mt-2 flex items-center gap-2 font-medium">
        Bank reconciliation &middot; Month-end
        {done && <Check aria-hidden="true" className="size-4 text-mark" />}
      </p>
    </div>
  );
}
