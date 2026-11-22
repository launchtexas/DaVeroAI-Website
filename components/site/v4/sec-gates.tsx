"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import "./sec-gates.css";

// Isometric checkpoint line for /security "How we govern agent work": same family as HowBuild and LastMileFloor.
// Server HTML is the end state (approved, written to the system of record, logged); JS adds m-play only on screen.

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
  const w = Math.max(text.length * 7.6, sub.length * 6.3) + 18;
  const top = by - up - 34;
  const ws = short.length * 7.6 + 18;
  return (
    <g className={`flag ${c}`} style={d(2 + i * 0.15)}>
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

const L = 3; // the lane runs along x at y = L
const GX = [4, 7, 10]; // least privilege, data boundaries, human approval
const START = [2, L, 0];
const TURN = [12.7, L, 0];
const LIVE = [12.7, 2.15, 0]; // against the system-of-record face
const LOG = [14.5, 1.1]; // audit trail stack, beside the rack
const RING = P(LIVE[0], LIVE[1]);

/** Gate posts: back post and front post are split so the cubes pass between them. */
const Post = ({ x, y }: { x: number; y: number }) => <Box x={x - 0.1} y={y} w={0.2} d={0.2} h={1.3} c="post" />;
const Beam = ({ x }: { x: number }) => <Box x={x - 0.1} y={2.25} w={0.2} d={1.5} h={0.18} z={1.3} c="beam" />;

function Entry({ k }: { k: number }) {
  return <Box x={LOG[0] - 0.36} y={LOG[1] - 0.36} w={0.72} d={0.72} h={0.07} z={0.16 + k * 0.11} c="entry" />;
}

export function SecGates() {
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
  for (let i = 0; i <= 15; i += 2) grid.push(pts([i, -1.5], [i, 5.9]));
  for (let j = 0; j <= 4; j += 2) grid.push(pts([-1.5, j], [17, j]));

  const cubeVars = {
    ...off("s", START, [0, 0]),
    ...off("a", [GX[0], L], [0, 0]),
    ...off("b", [GX[1], L], [0, 0]),
    ...off("c", [GX[2], L], [0, 0]),
    ...off("t", TURN, [0, 0]),
    ...off("l", LIVE, [0, 0]),
  } as React.CSSProperties;
  // unauthorised attempt: enters from the front, stops short of the first gate, bounces back
  const rogueVars = {
    ...off("e", [2.6, 4.3], [0, 0]),
    ...off("h", [GX[0] - 0.48, L], [0, 0]),
    ...off("k", [2.9, 3.6], [0, 0]),
  } as React.CSSProperties;

  return (
    <svg
      ref={ref}
      className="sgt"
      viewBox="-150 -30 690 440"
      role="img"
      aria-label="How agent work is kept safe: an unauthorised action is stopped at the first gate. The DaVero AI agent carries its work through least-privilege access and stays inside your data boundaries, waits until an authorised person approves, then writes the result to your system of record while the audit trail records a new entry."
    >
      <g className="rise">
        <g className="fade" style={d(0.45)}>
          <Box x={0.3} y={0.3} w={15.5} d={4.4} h={0.14} z={-0.8} c="slab under" />
        </g>
        <g className="fade" style={d(0.25)}>
          <Box x={0.15} y={0.15} w={15.5} d={4.4} h={0.14} z={-0.48} c="slab under" />
        </g>
        <Box x={0} y={0} w={15.5} d={4.4} h={0.2} z={-0.2} c="slab" />
        <g className="fade" style={d(0.6)}>
          {grid.map((g) => (
            <polyline key={g} className="grid" points={g} />
          ))}
        </g>
        <polyline className="route fade" style={d(0.9)} points={pts([1.5, L], TURN, [12.7, 1.9])} />
        <polygon className="pad fade" style={d(1)} points={pts([9.5, 2.3], [10.5, 2.3], [10.5, 3.7], [9.5, 3.7])} />

        {/* system of record: the agent writes into its front face */}
        <g className="grow" style={d(1.05)}>
          <Box x={12} y={0.4} w={1.4} d={1.4} h={2.4} c="rack" />
          {[0.5, 0.9, 1.3, 1.7, 2.1].map((z) => (
            <g key={z} className="slot">
              <polyline points={pts([12.12, 1.8, z], [13.28, 1.8, z])} />
              <polyline points={pts([13.4, 0.52, z], [13.4, 1.68, z])} />
            </g>
          ))}
        </g>
        {/* audit trail: past entries, then the one this run adds */}
        <g className="dk" style={d(1.15)}>
          <Box x={LOG[0] - 0.45} y={LOG[1] - 0.45} w={0.9} d={0.9} h={0.16} c="base" />
          {[0, 1, 2].map((k) => (
            <Entry key={k} k={k} />
          ))}
        </g>
        <g className="new" style={off("n", [LIVE[0] + 0.4, LIVE[1], 0.9], [LOG[0], LOG[1], 0.49])}>
          <Entry k={3} />
        </g>

        <g className="dk" style={d(1.2)}>
          <Box x={0.4} y={2.5} w={1.1} d={0.9} h={0.3} c="desk" />
          <Box x={0.6} y={2.56} w={0.5} d={0.06} h={0.34} z={0.3} c="mon" />
        </g>
        {GX.map((x, i) => (
          <g key={x} className={`dk gate g${i}`} style={d(1.3 + i * 0.12)}>
            <Post x={x} y={2.25} />
          </g>
        ))}

        <g className="rogue" style={rogueVars}>
          <ellipse className="shadow" cx="0" cy="0" rx="12" ry="7" />
          <Box x={-0.3} y={-0.3} w={0.6} d={0.6} h={0.6} c="cube" />
        </g>
        <g className="item" style={cubeVars}>
          <ellipse className="shadow" cx="0" cy="0" rx="12" ry="7" />
          <g className="cb">
            <Box x={-0.3} y={-0.3} w={0.6} d={0.6} h={0.6} c="cube" />
            <Box x={-0.2} y={-0.2} w={0.4} d={0.4} h={0.05} z={0.6} c="work" />
          </g>
        </g>

        {GX.map((x, i) => (
          <g key={x} className={`dk gate g${i}`} style={d(1.36 + i * 0.12)}>
            <Post x={x} y={3.55} />
            <Beam x={x} />
          </g>
        ))}
        <ellipse className="ring" cx={RING[0]} cy={RING[1]} rx="24" ry="14" />

        <Flag at={[GX[0], 2.35, 1.48]} up={42} text="LEAST PRIVILEGE" sub="SCOPED ACCESS" short="ACCESS" i={0} />
        <Flag at={[GX[1], 2.35, 1.48]} up={42} text="DATA BOUNDARIES" sub="INSIDE YOUR PLATFORM" short="DATA" i={1} />
        <Flag at={[GX[2], 2.35, 1.48]} up={42} text="HUMAN APPROVAL" sub="OWNER APPROVES" short="APPROVE" c="ok" i={2} />
        <Flag at={[12.7, 1.1, 2.4]} up={80} text="SYSTEM OF RECORD" sub="RESULT WRITTEN" short="SYSTEM" c="minor" i={3} />
        <Flag at={[LOG[0], LOG[1], 0.6]} up={44} text="AUDIT TRAIL" sub="ACTION RECORDED" short="AUDIT" c="hot" i={4} />
      </g>
    </svg>
  );
}
