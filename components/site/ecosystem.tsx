"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Boxes, Coins, Pause, Percent, Play, ShoppingCart, Wallet, type LucideIcon } from "lucide-react";
import { ECOSYSTEM_SUMMARY, ecosystem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./hooks";
import { tabKeys, useHydrated } from "./tabs";
import "./ecosystem.css";

type Id = (typeof ecosystem)[number]["id"];

/* Geometry in the SVG's own units (viewBox 0 0 560 460). Domains sit evenly on the orbit (radius 176) from the top;
   each agent sits on its spoke at radius 90. Overlay positions are the same points as percentages. */
const W = 560;
const H = 460;
const C = { x: 280, y: 232 };
const NODES: Record<Id, { icon: LucideIcon; short: string; d: [number, number]; a: [number, number]; above?: boolean }> = {
  ar: { icon: Coins, short: "AR", d: [280, 56], a: [280, 142], above: true },
  ap: { icon: Wallet, short: "AP", d: [447.4, 177.6], a: [365.6, 204.2] },
  pr: { icon: ShoppingCart, short: "Procurement", d: [383.5, 374.4], a: [332.9, 304.8] },
  in: { icon: Boxes, short: "Inventory", d: [176.5, 374.4], a: [227.1, 304.8] },
  tx: { icon: Percent, short: "Tax", d: [112.6, 177.6], a: [194.4, 204.2] },
};
const CYCLE_MS = 4000;

type Phase = "static" | "armed" | "in";
const css = (v: Record<string, string | number>) => v as React.CSSProperties;
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

/** Kit icon (brand-kit DaVero_Icon_Color.svg geometry) with the beam in Midnight so it reads on White/Cloud, placed inside an SVG. */
function KitMark({ x, y, w, gid }: { x: number; y: number; w: number; gid: string }) {
  return (
    <svg x={x} y={y} width={w} height={(w * 252) / 366} viewBox="24 26 366 252" aria-hidden="true" focusable="false">
      <path
        d="M 94 32 L 247 32 C 269 32 279 38 291 49 L 370 128 C 386 144 385 162 369 179 L 297 252 C 282 267 271 271 249 271 L 119 271 L 181 197 L 238 197 C 249 197 258 193 265 185 L 300 147 C 314 133 312 125 301 115 C 295 109 284 106 272 106 L 166 106 Z"
        fill={`url(#${gid}o)`}
      />
      <path d="M 31 271 L 166 125 L 244 125 L 120 271 Z" fill="var(--midnight)" />
    </svg>
  );
}

/** Small kit mark for HTML text (panel label). */
function KitGlyph({ gid }: { gid: string }) {
  return (
    <svg viewBox="24 26 366 252" aria-hidden="true" focusable="false" className="eco-glyph">
      <path
        d="M 94 32 L 247 32 C 269 32 279 38 291 49 L 370 128 C 386 144 385 162 369 179 L 297 252 C 282 267 271 271 249 271 L 119 271 L 181 197 L 238 197 C 249 197 258 193 265 185 L 300 147 C 314 133 312 125 301 115 C 295 109 284 106 272 106 L 166 106 Z"
        fill={`url(#${gid}o)`}
      />
      <path d="M 31 271 L 166 125 L 244 125 L 120 271 Z" fill="var(--midnight)" />
    </svg>
  );
}

export function Ecosystem({ head }: { head: React.ReactNode }) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motion = hydrated && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const [phase, setPhase] = useState<Phase>("static");
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(true);
  const [sel, setSel] = useState(0);
  const active = ecosystem[sel];
  const tabId = (id: Id) => `${uid}-tab-${id}`;
  const panelId = (id: Id) => `${uid}-panel-${id}`;

  // The first report decides whether the entrance plays (only when the graph starts off-screen); after that it tracks
  // visibility, so the cycle and the pulse stop off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !motion) return;
    let state: Phase | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (state === null) {
          state = e.isIntersecting ? "static" : "armed";
          setPhase(state);
        } else if (state === "armed" && e.intersectionRatio >= 0.25) {
          state = "in";
          setPhase(state);
        }
      },
      { threshold: [0, 0.25] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motion]);

  // Slow default tour through the domains until the visitor picks one.
  const running = motion && auto && !paused && visible;
  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => setSel((s) => (s + 1) % ecosystem.length), CYCLE_MS);
    return () => window.clearInterval(t);
  }, [running]);

  const pick = useCallback((i: number) => {
    setAuto(false);
    setSel(i);
  }, []);

  const still = !motion || paused || !visible;

  return (
    <div
      ref={ref}
      className="eco"
      data-phase={motion ? phase : "static"}
      data-paused={still ? "" : undefined}
    >
      <div className="eco-intro">
        {head}
        <p className="eco-summary">{ECOSYSTEM_SUMMARY}</p>
      </div>

      <div className="eco-graph">
        <div className="eco-canvas">
          <svg className="eco-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id={`${uid}o`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FF980F" />
                <stop offset="0.43" stopColor="#FF7100" />
                <stop offset="1" stopColor="#F65300" />
              </linearGradient>
            </defs>

            <circle className="eco-ring" cx={C.x} cy={C.y} r={176} pathLength={1} />

            {ecosystem.map((d, i) => {
              const n = NODES[d.id];
              return (
                <line
                  key={d.id}
                  className={cn("eco-spoke", i === sel && "is-on")}
                  x1={C.x}
                  y1={C.y}
                  x2={n.d[0]}
                  y2={n.d[1]}
                  pathLength={1}
                  style={css({ "--i": i })}
                />
              );
            })}

            {motion && (
              <circle
                key={`${active.id}-${sel}`}
                className="eco-pulse"
                r={3.5}
                cx={0}
                cy={0}
                style={css({
                  "--fx": `${NODES[active.id].d[0]}px`,
                  "--fy": `${NODES[active.id].d[1]}px`,
                  "--tx": `${C.x}px`,
                  "--ty": `${C.y}px`,
                })}
              />
            )}

            {ecosystem.map((d, i) => {
              const n = NODES[d.id];
              const on = i === sel;
              const Icon = n.icon;
              return (
                <g key={d.id} className={cn("eco-node", on && "is-on")} style={css({ "--i": i })}>
                  <circle className="eco-agent" cx={n.a[0]} cy={n.a[1]} r={12} />
                  <KitMark x={n.a[0] - 7} y={n.a[1] - 5} w={14} gid={uid} />
                  <circle className="eco-dom" cx={n.d[0]} cy={n.d[1]} r={17} />
                  <Icon x={n.d[0] - 8} y={n.d[1] - 8} width={16} height={16} strokeWidth={1.75} className="eco-dom-icon" />
                </g>
              );
            })}
          </svg>

          <div className="eco-core" aria-hidden="true">
            <span>CORE</span>
            <span>ERP</span>
          </div>

          {motion && (
            <button type="button" className="eco-pause" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
              {paused ? <Play aria-hidden="true" className="size-3.5" /> : <Pause aria-hidden="true" className="size-3.5" />}
              {paused ? "Play" : "Pause"}
              <span className="sr-only"> animation</span>
            </button>
          )}
        </div>

        {/* One set of controls: labels on the graph from 640 px, a segmented selector under it on phones. */}
        <div className="eco-tabs" role="tablist" aria-label="Domains">
          {ecosystem.map((d, i) => {
            const n = NODES[d.id];
            const on = i === sel;
            return (
              <button
                key={d.id}
                id={tabId(d.id)}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls={panelId(d.id)}
                tabIndex={on ? 0 : -1}
                className={cn("eco-tab", n.above && "is-above", on && "is-on")}
                style={css({ "--x": pct(n.d[0], W), "--y": pct(n.d[1], H), "--i": i })}
                onClick={() => pick(i)}
                onFocus={() => pick(i)}
                onMouseEnter={() => pick(i)}
                onKeyDown={(e) => tabKeys(e, ecosystem.length, sel, pick)}
              >
                <span className="eco-tab-hit" aria-hidden="true" />
                <span className="eco-tab-long">{d.name}</span>
                <span className="eco-tab-short">{n.short}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* One panel per domain, stacked in one grid cell so the height never changes while the tour runs (no layout shift). */}
      <div className="eco-panels">
        {ecosystem.map((d, i) => {
          const on = i === sel;
          return (
            <div
              key={d.id}
              id={panelId(d.id)}
              role="tabpanel"
              aria-labelledby={tabId(d.id)}
              className={cn("eco-panel", on && "is-on")}
              inert={!on}
            >
              <h3 className="eco-p-title">{d.name}</h3>
              <p className="eco-p-agent">
                <KitGlyph gid={uid} />
                <span>
                  DaVero AI Agent <span aria-hidden="true">·</span> {d.agent}
                </span>
              </p>
              <ul className="eco-p-items">
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Full structure for screen readers (the panel shows one domain at a time). */}
      <div className="sr-only">
        <p>
          Diagram: the core ERP sits at the centre. Five DaVero AI agents connect it to five domains, and data moves both
          ways between each domain, its agent and the ERP.
        </p>
        <ul>
          {ecosystem.map((d) => (
            <li key={d.id}>
              {d.name}, connected to the core ERP by the DaVero AI Agent for {d.agent}: {d.items.join(", ")}.
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
