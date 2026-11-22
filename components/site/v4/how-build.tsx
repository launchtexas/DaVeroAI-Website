"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import "./how-build.css";

// Isometric build line for #how: same visual family as LastMileFloor, different story. Server HTML is the finished
// state (owners validated, agent live, manual work gone); JS adds m-play only while on screen and with motion allowed.

const S = 36;
const r = (n: number) => Math.round(n * 10) / 10;
const P = (x: number, y: number, z = 0) => [r((x - y) * S * 0.866), r((x + y) * S * 0.5 - z * S)];
const pts = (...ps: number[][]) => ps.map((p) => P(p[0], p[1], p[2]).join(",")).join(" ");
const d = (s: number) => ({ "--d": `${r(s)}s` }) as React.CSSProperties;
/** Screen offset from b to a, as px CSS vars the loop keyframes read. */
const off = (name: string, a: number[], b: number[]) => {
  const [ax, ay] = P(a[0], a[1], a[2]);
  const [bx, by] = P(b[0], b[1], b[2]);
  return { [`--${name}x`]: `${r(ax - bx)}px`, [`--${name}y`]: `${r(ay - by)}px` };
};

function Box({ x, y, w, d: dp, h, z = 0, c }: { x: number; y: number; w: number; d: number; h: number; z?: number; c: string }) {
  const z1 = z + h;
  return (
    <g className={c}>
      <polygon className="l" points={pts([x, y + dp, z], [x + w, y + dp, z], [x + w, y + dp, z1], [x, y + dp, z1])} />
      <polygon className="r" points={pts([x + w, y, z], [x + w, y + dp, z], [x + w, y + dp, z1], [x + w, y, z1])} />
      <polygon className="t" points={pts([x, y, z1], [x + w, y, z1], [x + w, y + dp, z1], [x, y + dp, z1])} />
    </g>
  );
}

/** Mono label on a leader line with a diamond base. Phones swap to the one-word short label so text stays >= 10px. */
function Flag({ at, up, text, sub, short, c = "", i }: { at: number[]; up: number; text: string; sub: string; short: string; c?: string; i: number }) {
  const [bx, by] = P(at[0], at[1], at[2]);
  const w = text.length * 7.6 + 18;
  const top = by - up - 34;
  const ws = short.length * 7.6 + 18;
  return (
    <g className={`flag ${c}`} style={d(2.2 + i * 0.15)}>
      <line x1={bx} y1={by} x2={bx} y2={by - up} />
      <path className="dia" d={`M${bx} ${by - 4}l4 4-4 4-4-4z`} />
      <g className="lbl">
        <rect x={bx} y={r(top)} width={r(w)} height={34} rx="3" />
        <text x={r(bx + w / 2)} y={r(top + 15)}>
          {text}
        </text>
        <text className="sub" x={r(bx + w / 2)} y={r(top + 27)}>
          {sub}
        </text>
      </g>
      <g className="lbl sh">
        <rect x={bx} y={r(top + 12)} width={r(ws)} height={22} rx="3" />
        <text x={r(bx + ws / 2)} y={r(top + 27)}>
          {short}
        </text>
      </g>
    </g>
  );
}

const L = 3; // the build line runs along x at y = L
const BENCH = [4.4, L, 0.35];
const GATE = [7.45, L, 0];
const TURN = [11.1, L, 0];
const LIVE = [11.1, 2.15, 0]; // cube's resting place, against the rack face
const PILE = [1.25, 3.05, 0.3];
const RING = P(LIVE[0], LIVE[1]);

function Tile({ x, y, z }: { x: number; y: number; z: number }) {
  return <Box x={x - 0.3} y={y - 0.24} w={0.6} d={0.48} h={0.05} z={z} c="tile" />;
}

export function HowBuild() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.classList.add("m-in");
        el.classList.toggle("m-play", e.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("m-in", "m-play");
    };
  }, []);

  const grid = [];
  for (let i = 0; i <= 13; i += 2) grid.push(pts([i, -1.5], [i, 5.9]));
  for (let j = 0; j <= 4; j += 2) grid.push(pts([-1.5, j], [14.5, j]));

  const cubeVars = {
    ...off("b", BENCH, [0, 0]),
    ...off("g", GATE, [0, 0]),
    ...off("t", TURN, [0, 0]),
    ...off("l", LIVE, [0, 0]),
  } as React.CSSProperties;

  return (
    <svg
      ref={ref}
      className="hbl"
      viewBox="-200 -50 680 420"
      role="img"
      aria-label="How we build, as a production line: a Forward Deployed Consultant maps the manual steps of a workflow, we build those steps into a DaVero AI agent, business owners validate the agent before go-live, and the agent goes live on the system of record while the manual work leaves the expert's desk."
    >
      <g className="rise">
        <g className="fade" style={d(0.45)}>
          <Box x={0.3} y={0.3} w={13} d={4.4} h={0.14} z={-0.8} c="slab under" />
        </g>
        <g className="fade" style={d(0.25)}>
          <Box x={0.15} y={0.15} w={13} d={4.4} h={0.14} z={-0.48} c="slab under" />
        </g>
        <Box x={0} y={0} w={13} d={4.4} h={0.2} z={-0.2} c="slab" />
        <g className="fade" style={d(0.6)}>
          {grid.map((g) => (
            <polyline key={g} className="grid" points={g} />
          ))}
        </g>
        <polyline className="route fade" style={d(0.9)} points={pts([1.7, L], TURN, [11.1, 1.8])} />
        <polygon className="pad fade" style={d(1)} points={pts([6.95, 2.3], [7.95, 2.3], [7.95, 3.7], [6.95, 3.7])} />

        {/* system of record: the agent plugs into its front face */}
        <g className="grow" style={d(1.05)}>
          <Box x={10.4} y={0.4} w={1.4} d={1.4} h={2.4} c="rack" />
          {[0.5, 0.9, 1.3, 1.7, 2.1].map((z) => (
            <g key={z} className="slot">
              <polyline points={pts([10.52, 1.8, z], [11.68, 1.8, z])} />
              <polyline points={pts([11.8, 0.52, z], [11.8, 1.68, z])} />
            </g>
          ))}
        </g>

        <g className="dk" style={d(1.2)}>
          <Box x={0.5} y={2.5} w={1.2} d={0.9} h={0.3} c="desk" />
          <Box x={0.7} y={2.56} w={0.5} d={0.06} h={0.34} z={0.3} c="mon" />
          <g className="pile">
            {[0, 1, 2].map((k) => (
              <Tile key={k} x={PILE[0]} y={PILE[1]} z={PILE[2] + k * 0.07} />
            ))}
          </g>
        </g>
        <g className="dk" style={d(1.35)}>
          <Box x={3.7} y={2.45} w={1.4} d={1.1} h={0.35} c="desk" />
          <Box x={4.1} y={2.5} w={0.6} d={0.06} h={0.34} z={0.35} c="mon" />
        </g>
        <g className="dk" style={d(1.5)}>
          <Box x={7.35} y={2.25} w={0.2} d={0.2} h={1.3} c="gate" />
        </g>

        {/* manual steps leave the expert's desk for the bench */}
        {[0, 1, 2].map((k) => (
          <g key={k} className="mv" style={{ ...off("m", [BENCH[0] - 0.3 + k * 0.3, BENCH[1], BENCH[2]], [PILE[0], PILE[1], PILE[2] + 0.18]), ["--k" as string]: `${k * 0.2}s` }}>
            <Tile x={PILE[0]} y={PILE[1]} z={PILE[2] + 0.18} />
          </g>
        ))}

        <g className="item" style={cubeVars}>
          <ellipse className="shadow" cx="0" cy="0" rx="12" ry="7" />
          <g className="cb">
            <Box x={-0.3} y={-0.3} w={0.6} d={0.6} h={0.6} c="cube" />
          </g>
        </g>

        <g className="dk" style={d(1.55)}>
          <Box x={7.35} y={3.55} w={0.2} d={0.2} h={1.3} c="gate" />
          <Box x={7.35} y={2.25} w={0.2} d={1.5} h={0.18} z={1.3} c="gate" />
        </g>
        <ellipse className="ring" cx={RING[0]} cy={RING[1]} rx="24" ry="14" />

        <Flag at={[1.1, 2.95, 0.64]} up={50} text="MAP THE PROCESS" sub="EMBED" short="MAP" i={0} />
        <Flag at={[4.4, 2.55, 0.69]} up={60} text="BUILD THE AGENT" sub="BUILD & HARDEN" short="BUILD" i={1} />
        <Flag at={[7.45, 2.35, 1.48]} up={42} text="OWNERS VALIDATE" sub="BEFORE GO-LIVE" short="TEST" c="ok" i={2} />
        <Flag at={[11.1, 1.1, 2.4]} up={60} text="LIVE IN PRODUCTION" sub="RUN & IMPROVE" short="LIVE" c="hot" i={3} />
      </g>
    </svg>
  );
}
