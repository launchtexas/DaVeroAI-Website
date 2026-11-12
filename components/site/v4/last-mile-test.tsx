"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mark } from "./icons";
import { ASSESSMENT_HREF, ASSESSMENT_LABEL } from "./nav";

export type Mile = { title: string; text: string; chip: string };

const ICON_PATHS = [
  <g key="target">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" />
  </g>,
  <path key="puzzle" d="M4 7h7v4a2 2 0 1 0 4 0V7h5v13H4z" />,
  <path key="building" d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />,
  <g key="sheet">
    <rect height="16" rx="2" width="18" x="3" y="4" />
    <path d="M3 10h18M9 4v16" />
  </g>,
];

const STEP_MS = 1100; // time between miles while the demo plays
const HOLD_STEPS = 3; // extra steps the finished state stays on screen before the demo restarts

/**
 * The four-mile test: tap each statement that is true; all four pressed marks a last-mile workflow.
 * While it is on screen and nobody has touched it, it plays itself: miles pass one by one, the last mile
 * lights up, then it starts over. The first tap stops the demo and hands control to the visitor.
 * No demo under reduced motion.
 */
export function LastMileTest({ id, title, miles }: { id: string; title: string; miles: Mile[] }) {
  const [on, setOn] = useState([false, false, false, false]);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const n = on.filter(Boolean).length;
  const done = n === 4;

  useEffect(() => {
    const el = ref.current;
    if (!auto || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    let timer: number | undefined;
    const tick = () => {
      step = (step + 1) % (4 + HOLD_STEPS + 1);
      setOn([0, 1, 2, 3].map((i) => i < Math.min(step, 4)));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        window.clearInterval(timer);
        timer = e.isIntersecting ? window.setInterval(tick, STEP_MS) : undefined;
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto]);

  const toggle = (i: number) => {
    if (auto) {
      setAuto(false);
      setOn([0, 1, 2, 3].map((j) => j === i));
      return;
    }
    setOn((s) => s.map((v, j) => (j === i ? !v : v)));
  };

  return (
    <div ref={ref} className={`lmt${done ? " is-done" : ""}`} id={id}>
      <div className="lmt-head">
        <div>
          <h3>{title}</h3>
          <p>Tap each statement that&apos;s true for a workflow in your operation.</p>
        </div>
        <p aria-live={auto ? "off" : "polite"} className="lmt-count">
          <b>{n}</b> of 4 passed
        </p>
      </div>
      <div className="lmt-road">
        {miles.map((m, i) => (
          <button
            key={m.title}
            aria-pressed={on[i]}
            className="gate"
            type="button"
            onClick={() => toggle(i)}
          >
            <span className="marker">
              <span className="num">
                <small>MILE</small>
                {i + 1}
              </span>
              <svg aria-hidden="true" className="tick" fill="none" height="26" stroke="#081630" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="26">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span className="card">
              <span className="ico">
                <svg aria-hidden="true" fill="none" stroke="#FF6500" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  {ICON_PATHS[i]}
                </svg>
              </span>
              <h4>{m.title}</h4>
              <p>{m.text}</p>
              <span className="lchip">{m.chip}</span>
            </span>
          </button>
        ))}
        <div className="finish">
          <span className="flag">
            <Mark size={26} fill={done ? "#081630" : "#FF6500"} />
          </span>
          <div className="result">
            <span className="k">THE LAST MILE</span>
            <h4>{done ? "It's a last-mile workflow" : "Pass all four and it's last-mile work"}</h4>
            <p aria-live={auto ? "off" : "polite"}>
              {done
                ? "DaVero AI agents can run it, with every result approved by process owners."
                : "That's where DaVero AI agents take over, approved by process owners."}
            </p>
            <Link className="go" href={ASSESSMENT_HREF}>
              {ASSESSMENT_LABEL} →
            </Link>
          </div>
        </div>
      </div>
      <p className="lmt-hint">{auto ? "Tap any mile to try it yourself." : "Tip: tap a mile again to undo it."}</p>
    </div>
  );
}
