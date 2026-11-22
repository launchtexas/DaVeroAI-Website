"use client";

import { useEffect, useRef } from "react";

// Isometric "last mile" floor (home Problem section). Inline SVG; the loop is CSS (globals.css, .lmf). Server HTML is the
// finished state (approved, outcome reached, recorded); JS adds m-play only while on screen and only with motion allowed.

const S = 36; // one floor unit in px
const r = (n: number) => Math.round(n * 10) / 10;
/** Floor (x right-down, y left-down, z up) to screen. */
const P = (x: number, y: number, z = 0) => [r((x - y) * S * 0.866), r((x + y) * S * 0.5 - z * S)];
const pts = (...ps: number[][]) => ps.map((p) => P(p[0], p[1], p[2]).join(",")).join(" ");

/** Box with its three visible faces; c is the class that colours them (.t top, .l left, .r right). */
function Box({ x, y, w, d, h, z = 0, c }: { x: number; y: number; w: number; d: number; h: number; z?: number; c: string }) {
  const z1 = z + h;
  return (
    <g className={c}>
      <polygon className="l" points={pts([x, y + d, z], [x + w, y + d, z], [x + w, y + d, z1], [x, y + d, z1])} />
      <polygon className="r" points={pts([x + w, y, z], [x + w, y + d, z], [x + w, y + d, z1], [x + w, y, z1])} />
      <polygon className="t" points={pts([x, y, z1], [x + w, y, z1], [x + w, y + d, z1], [x, y + d, z1])} />
    </g>
  );
}

/** Mono label on a thin leader line with a small diamond at its base. */
function Flag({ at, up, text, sub, c = "", left }: { at: number[]; up: number; text: string; sub?: string; c?: string; left?: boolean }) {
  const [bx, by] = P(at[0], at[1], at[2]);
  const w = text.length * 7.6 + 18;
  const h = sub ? 34 : 22;
  const top = by - up - h;
  return (
    <g className={`flag ${c}`}>
      <line x1={bx} y1={by} x2={bx} y2={by - up} />
      <path className="dia" d={`M${bx} ${by - 4}l4 4-4 4-4-4z`} />
      <g className={left ? "lbl l" : "lbl"}>
        <rect x={left ? r(bx - w) : bx} y={r(top)} width={r(w)} height={h} rx="3" />
        <text x={r(left ? bx - w / 2 : bx + w / 2)} y={r(top + 15)}>
          {text}
        </text>
        {sub && (
          <text className="sub" x={r(left ? bx - w / 2 : bx + w / 2)} y={r(top + 27)}>
            {sub}
          </text>
        )}
      </g>
    </g>
  );
}

const ZONES = [
  { name: "FINANCE", x: 3, y: 0.6, cube: [0, 1] },
  { name: "PROCUREMENT", x: 6.6, y: 0.6, cube: [1, 0] },
  { name: "SUPPLY CHAIN", x: 3, y: 4.5, cube: [1, 1] },
  { name: "INSURANCE", x: 6.6, y: 4.5, cube: [1, 1] },
];
// Work-item route: rack → agent desk (finance) → process owner desk (insurance) → front edge. Stops match lmf-move.
const ROUTE = [[1.1, 1.7], [1.1, 4], [3.9, 4], [6.3, 4], [6.3, 5.2], [6.3, 8]];
const END = P(6.3, 8);

function Desk({ x, y, cube, owner }: { x: number; y: number; cube?: boolean; owner?: boolean }) {
  return (
    <g className={owner ? "owner" : undefined}>
      <Box x={x} y={y} w={1} d={0.6} h={0.3} c="desk" />
      <Box x={x + 0.25} y={y + 0.06} w={0.5} d={0.06} h={0.34} z={0.3} c="mon" />
      {cube && <Box x={x + 0.35} y={y + 0.22} w={0.3} d={0.3} h={0.3} z={0.3} c="cube" />}
    </g>
  );
}

export function LastMileFloor() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    // Plays (from the start) each time it scrolls into view; off screen it rests in the finished state.
    const io = new IntersectionObserver(([e]) => el.classList.toggle("m-play", e.isIntersecting), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove("m-play");
    };
  }, []);

  const grid = [];
  for (let i = 0; i <= 10; i += 2) grid.push(pts([i, -2.5], [i, 10.5]));
  for (let j = 0; j <= 8; j += 2) grid.push(pts([-2.5, j], [12.5, j]));

  return (
    <svg
      ref={ref}
      className="lmf"
      viewBox="-300 -150 640 500"
      role="img"
      aria-label="The last mile, as a work floor: a work item leaves the system of record (the ERP), a DaVero AI agent in Finance prepares it, the process owner reviews and approves it, the business outcome is delivered and the result is recorded back in the system of record. Finance, Procurement, Supply Chain and Insurance teams work on the same floor."
    >
      {/* under-layers, then the slab */}
      <Box x={0.3} y={0.3} w={10} d={8} h={0.14} z={-0.8} c="slab under" />
      <Box x={0.15} y={0.15} w={10} d={8} h={0.14} z={-0.48} c="slab under" />
      <Box x={0} y={0} w={10} d={8} h={0.2} z={-0.2} c="slab" />
      {grid.map((g) => (
        <polyline key={g} className="grid" points={g} />
      ))}
      {ZONES.map((z) => (
        <g key={z.name}>
          <polygon className="zone" points={pts([z.x, z.y], [z.x + 3, z.y], [z.x + 3, z.y + 2.9], [z.x, z.y + 2.9])} />
          <text className="zname" transform={`translate(${P(z.x + 0.15, z.y + 2.75).join(" ")}) matrix(.866 .5 -.866 .5 0 0) translate(0 -2)`}>
            {z.name}
          </text>
        </g>
      ))}
      {/* faint links between zones, then the story route */}
      <polyline className="link" points={pts([1.1, 4], [10, 4])} />
      <polyline className="link" points={pts([6.3, 0], [6.3, 8])} />
      <polyline className="route" points={pts(...ROUTE)} />
      <Box x={0.5} y={0.5} w={1.2} d={1.2} h={2.6} c="rack" />
      {[0.5, 0.9, 1.3, 1.7, 2.1].map((z) => (
        <g key={z} className="slot">
          <polyline points={pts([0.62, 1.7, z], [1.58, 1.7, z])} />
          <polyline points={pts([1.7, 0.62, z], [1.7, 1.58, z])} />
        </g>
      ))}
      {ZONES.map((z) =>
        [0, 1].map((i) =>
          [0, 1].map((j) => (
            <Desk
              key={`${z.name}${i}${j}`}
              x={z.x + 0.4 + i * 1.4}
              y={z.y + 0.4 + j * 1.4}
              cube={z.cube[0] === i && z.cube[1] === j}
              owner={z.name === "INSURANCE" && i === 0 && j === 0}
            />
          )),
        ),
      )}
      <g className="item" style={{ transform: `translate(${END[0]}px,${END[1]}px)` }}>
        <ellipse className="shadow" cx="0" cy="0" rx="9" ry="5" />
        <Box x={-0.2} y={-0.2} w={0.4} d={0.4} h={0.4} z={0.25} c="cube" />
      </g>
      <ellipse className="ring" cx={END[0]} cy={END[1]} rx="22" ry="12.7" />
      <Flag at={[1.1, 1.1, 2.6]} up={18} text="SYSTEM OF RECORD" sub="ERP" left />
      <g className="rec">
        <rect x={P(1.1, 1.1, 2.6)[0] + 10} y={P(1.1, 1.1, 2.6)[1] - 52} width="98" height="22" rx="11" />
        <path d={`M${P(1.1, 1.1, 2.6)[0] + 21} ${P(1.1, 1.1, 2.6)[1] - 41}l3.5 3.5 6-7`} />
        <text x={P(1.1, 1.1, 2.6)[0] + 64} y={P(1.1, 1.1, 2.6)[1] - 37}>
          RECORDED
        </text>
      </g>
      <Flag at={[3.9, 2.7, 0.6]} up={56} text="AGENT PREPARES" c="ag" />
      <Flag at={[7.5, 5.2, 0.6]} up={64} text="PROCESS OWNER" sub="APPROVES" c="ok" />
      <Flag at={[6.3, 8]} up={84} text="BUSINESS OUTCOME" c="hot" left />
    </svg>
  );
}
