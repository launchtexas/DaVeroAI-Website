"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import "./assess-desk.css";

// Isometric "your desk" for #assessment: same family as HowBuild and LastMileFloor. Server HTML is the finished
// state (agent on the desk, manual work cleared, approved); JS adds m-play only while on screen and with motion allowed.

const S = 36;
const r = (n: number) => Math.round(n * 10) / 10;
const P = (x: number, y: number, z = 0) => [r((x - y) * S * 0.866), r((x + y) * S * 0.5 - z * S)];
const pts = (...ps: number[][]) => ps.map((p) => P(p[0], p[1], p[2]).join(",")).join(" ");
const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

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

/** Desk with a navy monitor at its back edge; `cube` seats a running agent on it (the faint neighbours). */
function Desk({ x, y, cube }: { x: number; y: number; cube?: boolean }) {
  return (
    <>
      <Box x={x} y={y} w={1.4} d={1} h={0.35} c="desk" />
      <Box x={x + 0.4} y={y + 0.05} w={0.6} d={0.06} h={0.34} z={0.35} c="mon" />
      {cube && (
        <g className="bob">
          <Box x={x + 0.15} y={y + 0.35} w={0.5} d={0.5} h={0.5} z={0.35} c="cube" />
        </g>
      )}
    </>
  );
}

const DX = 3.4; // main desk origin
const DY = 2.6;
const TILE = [4.4, 3.15, 0.35];
const SH = P(3.8, 3.2, 0.35); // cube's landing spot (shadow centre)
const TICK = P(3.8, 3.2, 1.3);
const FLAG = P(4.1, DY + 0.08, 0.69);
const FW = 14 * 9 + 18;

export function AssessDesk() {
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
  for (let i = 0.8; i < 6.4; i += 1.2) grid.push(pts([i, 0], [i, 4.6]));
  for (let j = 0.8; j < 4.6; j += 1.2) grid.push(pts([0, j], [6.4, j]));

  return (
    <svg
      ref={ref}
      className="asd"
      viewBox="-170 8 410 232"
      role="img"
      aria-label="Your last mile: one team's desk with a stack of manual work. A DaVero AI agent lands on the desk, clears the work one item at a time, and the result is approved. Neighbouring desks already run agents."
    >
      <g className="rise">
        <g className="fade" style={d(0.45)}>
          <Box x={0.3} y={0.3} w={6.4} d={4.6} h={0.14} z={-0.8} c="slab under" />
        </g>
        <g className="fade" style={d(0.25)}>
          <Box x={0.15} y={0.15} w={6.4} d={4.6} h={0.14} z={-0.48} c="slab under" />
        </g>
        <Box x={0} y={0} w={6.4} d={4.6} h={0.2} z={-0.2} c="slab" />
        <g className="fade" style={d(0.6)}>
          {grid.map((g) => (
            <polyline key={g} className="grid" points={g} />
          ))}
        </g>

        {/* other teams, already running */}
        <g className="nb dk" style={d(0.8)}>
          <Desk x={4.4} y={0.4} cube />
        </g>
        <g className="nb dk" style={d(0.9)}>
          <Desk x={0.5} y={2.4} cube />
        </g>

        <g className="dk" style={d(1.05)}>
          <Desk x={DX} y={DY} />
          <ellipse className="shadow" cx={SH[0]} cy={SH[1]} rx="14" ry="8" />
          <g className="drop">
            <Box x={3.55} y={2.95} w={0.5} d={0.5} h={0.5} z={0.35} c="cube" />
          </g>
          {[0, 1, 2, 3].map((k) => (
            <g key={k} className={`tile t${k}`}>
              <Box x={TILE[0] - 0.3} y={TILE[1] - 0.24} w={0.6} d={0.48} h={0.05} z={TILE[2] + k * 0.07} c="" />
            </g>
          ))}
        </g>

        <g className="tick">
          <circle cx={TICK[0]} cy={TICK[1]} r="10" />
          <path d={`M${TICK[0] - 4.5} ${TICK[1]}l3 3 6-6.5`} />
        </g>

        <g className="flag" style={d(1.35)}>
          <line x1={FLAG[0]} y1={FLAG[1]} x2={FLAG[0]} y2={FLAG[1] - 56} />
          <path className="dia" d={`M${FLAG[0]} ${FLAG[1] - 4}l4 4-4 4-4-4z`} />
          <rect x={FLAG[0]} y={r(FLAG[1] - 80)} width={r(FW)} height={24} rx="3" />
          <text x={r(FLAG[0] + FW / 2)} y={r(FLAG[1] - 63.5)}>
            YOUR LAST MILE
          </text>
        </g>
      </g>
    </svg>
  );
}
