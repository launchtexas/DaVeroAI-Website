"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useInView, useReducedMotion } from "./hooks";

const nodes = [
  { label: "Develop", x: 160, y: 40, delay: "0s" },
  { label: "Reuse", x: 264, y: 220, delay: "4s" },
  { label: "Redeploy", x: 56, y: 220, delay: "8s" },
];
const LOOP = "M 160 40 A 120 120 0 1 1 159.9 40";

// §6.6 Skill-factory loop: 12s lap, pause button, paused off-screen, static under reduced motion.
export function SkillLoop() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inView = useInView(wrap);
  const reduced = useReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const paused = userPaused || !inView;

  useEffect(() => {
    const s = svg.current;
    if (!s) return;
    if (paused) s.pauseAnimations();
    else s.unpauseAnimations();
  }, [paused]);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[420px]">
      <svg
        ref={svg}
        viewBox="0 0 320 320"
        role="img"
        aria-labelledby="loop-cap"
        className={cn("h-auto w-full", paused && "loop-paused")}
      >
        <g aria-hidden="true">
          <circle cx="160" cy="160" r="120" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="2 6" />
          {/* arrow heads between nodes, clockwise */}
          {[60, 180, 300].map((a) => (
            <path key={a} d="M -5 -5 L 2 0 L -5 5" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" transform={`rotate(${a} 160 160) translate(160 40) `} />
          ))}
          <text x="160" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.08em" fill="var(--text-faint)">
            DAVEROAI
          </text>
          <text x="160" y="174" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" letterSpacing="0.08em" fill="var(--text-faint)">
            LIBRARY
          </text>
          {nodes.map((n) => (
            <g key={n.label} className={reduced ? undefined : "loop-node"} style={{ animationDelay: n.delay }}>
              <rect x={n.x - 48} y={n.y - 18} width="96" height="36" rx="8" fill="var(--surface-2)" stroke="var(--accent)" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="14" fontWeight="500" fill="var(--text)">
                {n.label}
              </text>
            </g>
          ))}
          {!reduced && (
            <circle r="5" fill="var(--accent)">
              <animateMotion dur="12s" repeatCount="indefinite" path={LOOP} />
            </circle>
          )}
        </g>
      </svg>
      {!reduced && (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? "Play loop animation" : "Pause loop animation"}
          className="absolute right-0 bottom-0"
        >
          {userPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </Button>
      )}
    </div>
  );
}
