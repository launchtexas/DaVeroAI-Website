"use client";

import { useEffect, useState } from "react";

export type FeedEvent = { time: string; title: string; detail: string; status: "wait" | "done" | "run"; label: string };

// Defaults: page-finance-accounting copy (the home page has no #agents-at-work).
const EVENTS: FeedEvent[] = [
  { time: "09:02", title: "Bank reconciliation", detail: "1,248 lines matched, 6 exceptions flagged", status: "wait", label: "AWAITING CONTROLLER" },
  { time: "09:05", title: "Intercompany elimination", detail: "Entity US-02 ↔ UK-01 balanced", status: "done", label: "APPROVED" },
  { time: "09:11", title: "Accrual review", detail: "14 accruals proposed from open POs", status: "wait", label: "AWAITING CONTROLLER" },
  { time: "09:14", title: "Revenue recognition", detail: "3 contract modifications re-allocated", status: "run", label: "IN PROGRESS" },
  { time: "09:20", title: "Flux analysis", detail: "Variance commentary drafted for 9 accounts", status: "done", label: "APPROVED" },
  { time: "09:26", title: "Collections", detail: "22 cash receipts applied to open invoices", status: "done", label: "APPROVED" },
];

const VISIBLE = 5;
const INTERVAL_MS = 2600;

/** Rows as [key, event]; key is the mock's running counter so React keeps rows stable while they shift down. */
function useFeed(events: FeedEvent[]) {
  const [rows, setRows] = useState(() => events.slice(0, VISIBLE).map((e, k) => [k, e] as const));
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let i = VISIBLE;
    const t = setInterval(() => {
      const k = i++;
      setRows((r) => [[k, events[k % events.length]] as const, ...r].slice(0, VISIBLE));
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [events]);
  return rows;
}

/** Function-page #agents-at-work. `feedLabel` and `events` match FunctionPage["agentsAtWork"] in lib/functions.ts. */
export function AgentsAtWork({
  eyebrow = "Agents at work",
  title = "See the last mile running",
  heading = "Human in the loop, always.",
  lede = "Every action is logged, every result waits for sign-off, and nothing posts without approval.",
  kpis = [
    { value: "100%", label: "of agent actions logged" },
    { value: "Every", label: "result approved" },
    { value: "0", label: "posted without sign-off" },
  ],
  feedLabel = "MONTH-END CLOSE · ILLUSTRATIVE",
  events = EVENTS,
  foot = "Sample activity for illustration. Not client data.",
}: {
  eyebrow?: string;
  title?: string;
  heading?: string;
  lede?: string;
  kpis?: readonly { value: string; label: string }[];
  feedLabel?: string;
  events?: FeedEvent[];
  foot?: string;
}) {
  const rows = useFeed(events);
  return (
    <section className="section" id="agents-at-work">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="feed-wrap">
          <div className="feed-copy">
            <h3 style={{ fontSize: 26, margin: 0 }}>{heading}</h3>
            <p className="lede" style={{ margin: 0 }}>
              {lede}
            </p>
            <div className="kpi">
              {kpis.map((k) => (
                <div key={k.label}>
                  <b>{k.value}</b>
                  <span>{k.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div aria-label="Illustrative agent activity feed" className="feed" id="feed">
            <div className="feed-top">
              <span>{feedLabel}</span>
              <span className="live">
                <i></i>LIVE
              </span>
            </div>
            <div id="evs" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rows.map(([k, e]) => (
                <div className="ev" key={k}>
                  <time>{e.time}</time>
                  <div className="t">
                    <b>{e.title}</b> <span>· {e.detail}</span>
                  </div>
                  <span className={`st ${e.status}`}>{e.label}</span>
                </div>
              ))}
            </div>
            <p className="foot">{foot}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
