"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  BadgePercent,
  Boxes,
  Calculator,
  CalendarDays,
  ChartColumnIncreasing,
  ChevronDown,
  CircleCheck,
  ClipboardList,
  Coins,
  CreditCard,
  FileCheck,
  FileText,
  Layers,
  Package,
  Pause,
  Percent,
  Play,
  RefreshCw,
  ScanLine,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  Tag,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { ECOSYSTEM_SUMMARY, ECOSYSTEM_TITLE, ecosystem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./hooks";
import { useHydrated } from "./tabs";
import "./ecosystem.css";

type Id = (typeof ecosystem)[number]["id"];

// Line icons per domain and per item, in the order of lib/content.ts `ecosystem`.
const ICONS: Record<Id, { head: LucideIcon; items: LucideIcon[] }> = {
  ar: { head: Coins, items: [FileText, Layers, CreditCard, RefreshCw, Users] },
  ap: { head: Wallet, items: [Settings, ScanLine, UsersRound, CreditCard, CalendarDays] },
  pr: { head: ShoppingCart, items: [UserPlus, ClipboardList, ShoppingCart, CircleCheck] },
  in: { head: Boxes, items: [Tag, Warehouse, Package, ChartColumnIncreasing] },
  tx: { head: Percent, items: [Calculator, Coins, BadgePercent, SlidersHorizontal, FileCheck] },
};

/** Kit icon (brand-kit 01_Vector_Logos/DaVero_Icon_OnDark.svg), unmodified, for Midnight surfaces. */
function KitMark({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  return (
    <svg viewBox="24 26 366 252" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF980F" />
          <stop offset="0.43" stopColor="#FF7100" />
          <stop offset="1" stopColor="#F65300" />
        </linearGradient>
      </defs>
      <path
        d="M 94 32 L 247 32 C 269 32 279 38 291 49 L 370 128 C 386 144 385 162 369 179 L 297 252 C 282 267 271 271 249 271 L 119 271 L 181 197 L 238 197 C 249 197 258 193 265 185 L 300 147 C 314 133 312 125 301 115 C 295 109 284 106 272 106 L 166 106 Z"
        fill={`url(#${gid})`}
      />
      <path d="M 31 271 L 166 125 L 244 125 L 120 271 Z" fill="#FFFFFF" />
    </svg>
  );
}

type Phase = "static" | "armed" | "in";
const css = (v: Record<string, string | number>) => v as React.CSSProperties;

/** A connector segment. `seg` a = domain to agent, b = agent to ERP. Pulses run domain → agent → ERP and back. */
function Link({ id, seg, i, on, dim, motion }: { id: Id; seg: "a" | "b"; i: number; on: boolean; dim: boolean; motion: boolean }) {
  return (
    <div aria-hidden="true" className={cn("eco-link", `eco-${seg === "a" ? "x" : "y"}-${id}`, on && "is-on", dim && "is-dim")} style={css({ "--i": i })}>
      <div className="eco-flow">
        <span className="eco-line" />
        {motion && (
          <>
            <span className="eco-run eco-run-in">
              <span className="eco-dot eco-dot-in" />
            </span>
            <span className="eco-run eco-run-out">
              <span className="eco-dot eco-dot-out" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function Ecosystem({ headingId = "ecosystem-title" }: { headingId?: string }) {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motion = hydrated && !reduced;
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("static");
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState<Id | null>(null);
  const [focus, setFocus] = useState<Id | null>(null);
  const [pinned, setPinned] = useState<Id | null>(null);
  const active = hover ?? focus ?? pinned;
  const listId = useId();

  // One observer: the first report decides whether the entrance plays (only if the diagram starts off-screen);
  // after that it tracks visibility so the loop pauses off-screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !motion) return;
    let state: Phase | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (state === null) {
          state = e.isIntersecting ? "in" : "armed";
          setPhase(state);
        } else if (state === "armed" && e.intersectionRatio >= 0.2) {
          state = "in";
          setEntered(true);
          setPhase(state);
        }
      },
      { threshold: [0, 0.2] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [motion]);

  const hoverProps = (id: Id) => ({
    onMouseEnter: () => setHover(id),
    onMouseLeave: () => setHover(null),
  });
  const btnProps = (id: Id) => ({
    type: "button" as const,
    "aria-pressed": pinned === id,
    onFocus: () => setFocus(id),
    onBlur: () => setFocus(null),
    onClick: () => setPinned((p) => (p === id ? null : id)),
  });
  const dimOf = (id: Id) => active !== null && active !== id;

  return (
    <figure
      ref={ref}
      className="eco"
      data-phase={motion ? phase : "static"}
      data-paused={!motion || paused || !visible ? "" : undefined}
      style={css({ "--start": entered ? "2.2s" : "0.3s" })}
      aria-labelledby={headingId}
    >
      {/* Text equivalent for screen readers at tablet and desktop (the mobile layout is itself a text list). */}
      <div className="eco-sr sr-only">
        <p>
          The diagram shows the core ERP at the centre. Five DaVero AI agents connect it to five domains, and data moves both
          ways: from each domain through its agent to the ERP, and back.
        </p>
        <ul>
          {ecosystem.map((d) => (
            <li key={d.id}>
              {d.name}, connected to the core ERP by the DaVero AI Agent for {d.agent}: {d.items.join(", ")}.
            </li>
          ))}
        </ul>
      </div>

      {/* Tablet and desktop: radial map (CSS grid places every node; connectors are grid cells, so nothing is measured). */}
      <div className="eco-map" role="group" aria-label="Highlight a domain or agent to trace its path to the ERP">
        <svg className="eco-orbit" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <ellipse cx="50" cy="46" rx="49.6" ry="45" pathLength="1" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="eco-spine" aria-hidden="true" />

        <div className="eco-core" aria-hidden="true">
          <span className="eco-core-word">CORE</span>
          <span className="eco-core-word">ERP</span>
        </div>

        {ecosystem.map((d, i) => {
          const I = ICONS[d.id];
          const on = active === d.id;
          const dim = dimOf(d.id);
          return (
            <div key={d.id} className="contents">
              <Link id={d.id} seg="b" i={i} on={on} dim={dim} motion={motion} />
              <Link id={d.id} seg="a" i={i} on={on} dim={dim} motion={motion} />

              <button
                {...btnProps(d.id)}
                {...hoverProps(d.id)}
                className={cn("eco-agent", `eco-a-${d.id}`, on && "is-on", dim && "is-dim")}
                style={css({ "--i": i })}
              >
                <KitMark className="eco-agent-mark" />
                <span className="eco-agent-text">
                  <span className="eco-agent-name">DaVero AI Agent</span>
                  <span className="eco-agent-role">{d.agent}</span>
                </span>
              </button>

              <div
                {...hoverProps(d.id)}
                className={cn("eco-domain", `eco-d-${d.id}`, on && "is-on", dim && "is-dim")}
                style={css({ "--i": i })}
              >
                <h3 className="eco-domain-head">
                  <I.head aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
                  <button {...btnProps(d.id)} className="eco-domain-btn stretched">
                    {d.name}
                  </button>
                </h3>
                <ul className="eco-items" aria-hidden="true">
                  {d.items.map((item, k) => {
                    const Icon = I.items[k];
                    return (
                      <li key={item}>
                        <Icon aria-hidden="true" className="eco-item-icon" strokeWidth={1.75} />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: the core, then each agent + domain pair as an expandable card on a spine. */}
      <div className="eco-stack">
        <span className="eco-m-spine" aria-hidden="true">
          {motion && (
            <>
              <span className="eco-m-run eco-m-run-in">
                <span className="eco-dot eco-dot-in" />
              </span>
              <span className="eco-m-run eco-m-run-out">
                <span className="eco-dot eco-dot-out" />
              </span>
            </>
          )}
        </span>
        <div className="eco-m-core" aria-hidden="true">
          CORE ERP
        </div>
        <ul className="eco-m-list" aria-label={`${ECOSYSTEM_TITLE}: agents and domains`}>
          {ecosystem.map((d, i) => {
            const I = ICONS[d.id];
            return (
              <li key={d.id} className="eco-m-item" style={css({ "--i": i })}>
                <details className="eco-m-card">
                  <summary>
                    <span className="eco-m-agent">
                      <KitMark className="eco-m-mark" />
                      <span>
                        <span className="eco-m-agent-name">DaVero AI Agent</span>
                        <span className="eco-m-agent-role">{d.agent}</span>
                      </span>
                    </span>
                    <span className="eco-m-domain">
                      <I.head aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.75} />
                      <span className="eco-m-domain-name">{d.name}</span>
                      <ChevronDown aria-hidden="true" className="eco-m-chev" />
                    </span>
                  </summary>
                  <ul className="eco-m-items" id={`${listId}-${d.id}`}>
                    {d.items.map((item, k) => {
                      const Icon = I.items[k];
                      return (
                        <li key={item}>
                          <Icon aria-hidden="true" className="eco-item-icon" strokeWidth={1.75} />
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </li>
            );
          })}
        </ul>
      </div>

      <figcaption className="eco-solution">
        <span className="eco-solution-name">
          <KitMark className="eco-solution-mark" />
          DaVero AI Solution
        </span>
        <span className="eco-solution-line">{ECOSYSTEM_SUMMARY}</span>
      </figcaption>

      {motion && (
        <button type="button" className="eco-pause t-small" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          {paused ? "Play animation" : "Pause animation"}
        </button>
      )}
    </figure>
  );
}
