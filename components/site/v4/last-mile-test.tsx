"use client";

import Link from "next/link";
import { useState } from "react";
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

/** The four-mile test: tap each statement that is true; all four pressed marks a last-mile workflow. */
export function LastMileTest({ id, title, miles }: { id: string; title: string; miles: Mile[] }) {
  const [on, setOn] = useState([false, false, false, false]);
  const n = on.filter(Boolean).length;
  const done = n === 4;

  return (
    <div className={`lmt${done ? " is-done" : ""}`} id={id}>
      <div className="lmt-head">
        <div>
          <h3>{title}</h3>
          <p>Tap each statement that&apos;s true for a workflow in your operation.</p>
        </div>
        <p aria-live="polite" className="lmt-count">
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
            onClick={() => setOn((s) => s.map((v, j) => (j === i ? !v : v)))}
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
                <svg aria-hidden="true" fill="none" stroke="#C2410C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
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
            <Mark size={26} fill={done ? "#081630" : "#FF7A2E"} />
          </span>
          <div className="result">
            <span className="k">THE LAST MILE</span>
            <h4>{done ? "It's a last-mile workflow" : "Pass all four and it's last-mile work"}</h4>
            <p aria-live="polite">
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
      <p className="lmt-hint">Tip: tap a mile again to undo it.</p>
    </div>
  );
}
