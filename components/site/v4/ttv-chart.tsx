"use client";

import { useEffect, useRef } from "react";
import { Mark } from "./icons";

// Illustrative time-to-value chart, ported from the design's inline script. Points are placed along the
// SVG paths at runtime (getPointAtLength), so the dynamic parts are built in an effect and torn down on unmount.
const STALLS: Record<string, [string, string]> = {
  clean: ["Clean the data", "Agents work from native platform data and APIs, so cleanup is part of the workflow, not a separate project."],
  fix: ["Fix broken steps", "Each workflow is hardened with company rules, controls and edge cases before it goes live."],
  map: ["Map workarounds", "A Forward Deployed Consultant maps the real process, workarounds included, in the first weeks."],
  doubt: ["Team doubts it", "Human in the loop, always. Process owners validate and approve every result, so trust is earned from day one."],
  exc: ["Exceptions appear", "Agents handle exceptions inside approved thresholds and route the rest to the right process owner."],
  again: ["Clean data again", "Agents keep running and improving after go-live, so the data stays clean instead of being fixed twice."],
};
const POS: [string, number, "above" | "below"][] = [
  ["clean", 0.07, "below"],
  ["fix", 0.18, "below"],
  ["map", 0.29, "above"],
  ["doubt", 0.42, "above"],
  ["exc", 0.49, "below"],
  ["again", 0.62, "above"],
];
const MILESTONES: [string, number, number, number, string][] = [
  ["Embed", 0.19, 4, 22, "middle"],
  ["Build & harden", 0.34, 16, 24, "start"],
  ["Run & improve", 0.58, 14, 26, "start"],
];
const NS = "http://www.w3.org/2000/svg";

function el(tag: string, attrs: Record<string, string | number>, text?: string) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  if (text) e.textContent = text;
  return e as SVGGraphicsElement;
}

export function TtvChart() {
  const panel = useRef<HTMLDivElement>(null);
  const blue = useRef<SVGPathElement>(null);
  const blueLbl = useRef<SVGTextElement>(null);
  const typ = useRef<SVGPathElement>(null);
  const dv = useRef<SVGPathElement>(null);
  const gap = useRef<SVGGElement>(null);
  const nodesG = useRef<SVGGElement>(null);
  const msG = useRef<SVGGElement>(null);
  const clipRect = useRef<SVGRectElement>(null);
  const callout = useRef<HTMLDivElement>(null);
  const q = useRef<HTMLParagraphElement>(null);
  const a = useRef<HTMLParagraphElement>(null);
  const replay = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const T = typ.current!, D = dv.current!, B = blue.current!, BL = blueLbl.current!, G = gap.current!, CR = clipRect.current!;
    const NG = nodesG.current!, P = panel.current!, Q = q.current!, A = a.current!, BOX = callout.current!;
    const L = T.getTotalLength(), LD = D.getTotalLength();
    const off: (() => void)[] = [];
    const on = (t: EventTarget, ev: string, fn: EventListener) => {
      t.addEventListener(ev, fn);
      off.push(() => t.removeEventListener(ev, fn));
    };

    // Stall points on the grey line
    const nodes = POS.map(([k, f, side]) => {
      const p = T.getPointAtLength(L * f);
      const n = el("g", { class: "stall", tabindex: 0, role: "button", "data-k": k, "aria-label": `${STALLS[k][0]}: how DaVero AI handles it` });
      n.appendChild(el("circle", { class: "hit", cx: p.x, cy: p.y, r: 22 }));
      n.appendChild(el("circle", { class: "pt", cx: p.x, cy: p.y, r: 8 }));
      n.appendChild(el("text", { x: p.x, y: side === "below" ? p.y + 30 : p.y - 18, "text-anchor": "middle" }, STALLS[k][0]));
      NG.appendChild(n);
      return n;
    });
    nodes.forEach((n) => {
      const go = () => {
        const v = STALLS[n.getAttribute("data-k")!];
        Q.textContent = `${v[0]} → how DaVero AI handles it`;
        A.textContent = v[1];
        BOX.classList.remove("idle");
        nodes.forEach((m) => m.classList.toggle("on", m === n));
      };
      on(n, "mouseenter", go);
      on(n, "focus", go);
      on(n, "click", go);
      on(n, "keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          go();
        }
      });
    });

    // Milestones and the end pill on the orange line
    const ms = msG.current!;
    for (const [label, f, dx, dy, anchor] of MILESTONES) {
      const p = D.getPointAtLength(LD * f);
      ms.appendChild(el("circle", { cx: p.x, cy: p.y, r: 7, fill: "#FF7A2E", stroke: "#081630", "stroke-width": 3 }));
      ms.appendChild(el("text", { x: p.x + dx, y: p.y + dy, "text-anchor": anchor, style: "fill:#FF9A5C;font-weight:700" }, label));
    }
    const end = D.getPointAtLength(LD);
    ms.appendChild(el("rect", { x: end.x - 150, y: end.y - 46, width: 150, height: 28, rx: 14, fill: "#FF7A2E" }));
    ms.appendChild(el("text", { x: end.x - 75, y: end.y - 27, "text-anchor": "middle", style: "fill:#081630;font-weight:800" }, "Accurate results"));

    // Gap bracket between the two lines
    const yAt = (path: SVGPathElement, x: number) => {
      const l = path.getTotalLength();
      let lo = 0, hi = l;
      for (let i = 0; i < 30; i++) {
        const m = (lo + hi) / 2;
        if (path.getPointAtLength(m).x < x) lo = m;
        else hi = m;
      }
      return path.getPointAtLength(lo).y;
    };
    const X = 740, y1 = yAt(D, X), y2 = yAt(T, X);
    G.appendChild(el("line", { x1: X, y1: y1 + 8, x2: X, y2: y2 - 8, stroke: "#FF9A5C", "stroke-width": 2, "stroke-dasharray": "4 4" }));
    G.appendChild(el("path", { d: `M${X - 6},${y1 + 8} h12 M${X - 6},${y2 - 8} h12`, stroke: "#FF9A5C", "stroke-width": 2 }));
    G.appendChild(el("text", { x: X + 12, y: (y1 + y2) / 2 - 4, style: "fill:#FF9A5C;font-weight:800" }, "Value unlocked"));
    G.appendChild(el("text", { x: X + 12, y: (y1 + y2) / 2 + 15, style: "fill:#FF9A5C;font-weight:800" }, "sooner"));

    // Story animation
    const kids = Array.from(ms.children) as SVGElement[];
    const pairs = [kids.slice(0, 2), kids.slice(2, 4), kids.slice(4, 6)];
    const pill = kids.slice(6, 8);
    let timers: ReturnType<typeof setTimeout>[] = [], raf: number[] = [];
    const fade = (e: SVGElement, show: boolean) => {
      e.style.transition = "opacity .45s ease";
      e.style.opacity = show ? "1" : "0";
    };
    const tween = (dur: number, fn: (k: number) => void, done?: () => void) => {
      let t0: number | null = null;
      const step = (t: number) => {
        if (t0 === null) t0 = t;
        let k = Math.min(1, (t - t0) / dur);
        k = 1 - Math.pow(1 - k, 3);
        fn(k);
        if (k < 1) raf.push(requestAnimationFrame(step));
        else done?.();
      };
      raf.push(requestAnimationFrame(step));
    };
    const at = (ms_: number, fn: () => void) => timers.push(setTimeout(fn, ms_));
    const say = (qq: string, aa: string) => {
      Q.textContent = qq;
      A.textContent = aa;
      BOX.classList.remove("idle");
    };
    const stopAll = () => {
      timers.forEach(clearTimeout);
      raf.forEach(cancelAnimationFrame);
      timers = [];
      raf = [];
    };
    const all = () => [...nodes, ...pairs.flat(), ...pill, G];
    const reset = () => {
      stopAll();
      B.setAttribute("clip-path", "url(#ttv-clip-blue)");
      CR.setAttribute("width", "0");
      fade(BL, false);
      [T, D].forEach((pth) => {
        const l = pth.getTotalLength();
        pth.style.transition = "none";
        pth.style.strokeDasharray = String(l);
        pth.style.strokeDashoffset = String(l);
      });
      all().forEach((e) => fade(e, false));
    };
    const showAll = () => {
      stopAll();
      B.removeAttribute("clip-path");
      fade(BL, true);
      [T, D].forEach((pth) => {
        pth.style.strokeDasharray = "none";
        pth.style.strokeDashoffset = "0";
      });
      all().forEach((e) => fade(e, true));
    };
    const draw = (pth: SVGPathElement, dur: number) => {
      const l = pth.getTotalLength();
      tween(dur, (k) => (pth.style.strokeDashoffset = String(l * (1 - k))), () => (pth.style.strokeDasharray = "none"));
    };
    const play = () => {
      reset();
      at(200, () => {
        say("1 · What business expects", "Buy AI, save time. A straight line from decision to results.");
        tween(1300, (k) => CR.setAttribute("width", String(1000 * k)), () => B.removeAttribute("clip-path"));
      });
      at(1400, () => fade(BL, true));
      const T2 = 2200, D2 = 3000;
      at(T2, () => {
        say("2 · What typically happens", "Data cleanup, workarounds, exceptions and doubt stall the rollout. Value arrives late.");
        draw(T, D2);
      });
      POS.forEach((st, i) => at(T2 + st[1] * D2 * 1.05, () => fade(nodes[i], true)));
      const T3 = T2 + D2 + 600, D3 = 2200;
      at(T3, () => {
        say("3 · With DaVero AI", "Embed, build & harden, then run & improve: a steady climb to accurate results.");
        draw(D, D3);
      });
      [0.19, 0.34, 0.58].forEach((f, i) => at(T3 + f * D3 * 1.1, () => pairs[i].forEach((e) => fade(e, true))));
      at(T3 + D3, () => pill.forEach((e) => fade(e, true)));
      at(T3 + D3 + 500, () => {
        fade(G, true);
        say("4 · Value unlocked sooner", "The gap is the value DaVero AI delivers earlier. Hover over or tap a grey point to see how each stall is handled.");
      });
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restart = () => (reduce ? showAll() : play());
    on(replay.current!, "click", (e) => {
      e.stopPropagation();
      restart();
    });
    on(P, "click", (e) => {
      if ((e.target as Element).closest(".stall")) return;
      restart();
    });
    let io: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) showAll();
    else {
      reset();
      io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting)) {
            play();
            io?.disconnect();
          }
        },
        { threshold: 0.4 },
      );
      io.observe(P);
    }

    return () => {
      stopAll();
      io?.disconnect();
      off.forEach((f) => f());
      NG.replaceChildren();
      ms.replaceChildren();
      G.replaceChildren();
    };
  }, []);

  return (
    <div className="ttv-panel" ref={panel}>
      <div className="ttv-legend">
        <span style={{ color: "#7FA6F2" }}>
          <i className="dash" />
          What business expects
        </span>
        <span>
          <i />
          Typical rollout
        </span>
        <span>
          <i className="or" />
          With DaVero AI
        </span>
        <span className="ttv-ill">ILLUSTRATIVE</span>
        <button ref={replay} aria-label="Replay the chart animation" className="ttv-replay" title="Click anywhere on the chart to replay" type="button">
          ↻ Replay
        </button>
      </div>
      <svg role="group" aria-label="Illustrative time-to-value chart" className="ttv" viewBox="0 0 1000 445">
        <defs>
          <clipPath id="ttv-clip-blue">
            <rect ref={clipRect} x="0" y="0" width="1000" height="445" />
          </clipPath>
        </defs>
        <g stroke="#1E2E4D" strokeWidth="1">
          <line x1="90" x2="960" y1="70" y2="70" />
          <line x1="90" x2="960" y1="160" y2="160" />
          <line x1="90" x2="960" y1="250" y2="250" />
        </g>
        <line stroke="#5A6E92" strokeWidth="2" x1="90" x2="960" y1="360" y2="360" />
        <line stroke="#5A6E92" strokeWidth="2" x1="90" x2="90" y1="40" y2="360" />
        <text textAnchor="end" x="960" y="425">
          Time →
        </text>
        <text textAnchor="middle" transform="rotate(-90 24 200)" x="24" y="200">
          Value delivered →
        </text>
        <text textAnchor="start" x="90" y="425">
          Decide to automate
        </text>
        <path ref={blue} d="M90,350 L560,62" fill="none" stroke="#5B8DEF" strokeDasharray="10 8" strokeWidth="3" />
        <text ref={blueLbl} style={{ fill: "#7FA6F2" }} x="570" y="56">
          Buy AI, save time
        </text>
        <path
          ref={typ}
          d="M90,350 C190,348 250,336 320,326 C380,318 410,342 460,350 C510,358 560,322 640,300 C740,272 860,210 960,176"
          fill="none"
          stroke="#5A6E92"
          strokeWidth="4"
        />
        <path ref={dv} d="M90,350 C220,346 300,270 400,190 C480,126 600,92 960,72" fill="none" stroke="#FF7A2E" strokeLinecap="round" strokeWidth="3.5" />
        <g ref={gap} />
        <g ref={nodesG} />
        <g ref={msG} />
      </svg>
      <div className="ttv-callout idle" ref={callout}>
        <Mark size={20} />
        <div>
          <p className="q" ref={q}>
            How DaVero AI handles it
          </p>
          <p className="a" ref={a} aria-live="polite">
            Hover over or tap a point on the grey line.
          </p>
        </div>
      </div>
    </div>
  );
}
