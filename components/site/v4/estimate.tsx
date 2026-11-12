"use client";

import Link from "next/link";
import { useState } from "react";

const money = (v: number) =>
  v >= 1e9 ? `$${(v / 1e9).toFixed(1)}B` : v >= 999_500 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1e3)}K`;

// #estimate, markup 1:1 with docs/source/design-v4.html; the mock's calc() script is React state (CSP).
export function Estimate({ hint = "Finance, supply chain or procurement staff" }: { hint?: string }) {
  const [ppl, setPpl] = useState(8);
  const [pplText, setPplText] = useState("8");
  const [pct, setPct] = useState(35);
  const [cost, setCost] = useState(110);
  const [auto, setAuto] = useState(50);

  const total = ppl * (pct / 100) * cost * 1000;
  const free = total * (auto / 100);
  const hrs = Math.round(ppl * (pct / 100) * 2080 * (auto / 100));
  const on = (set: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    set(+e.target.value);
  };

  return (
    <section className="section alt" id="estimate">
      <div className="wrap">
        <p className="eyebrow">Estimate</p>
        <h2>What is the last mile costing the business?</h2>
        <p className="lede">Move the sliders to see what manual last-mile work costs each year, and how much capacity agents could free up.</p>
        <div className="est">
          <div className="est-in">
            <div className="fld">
              <label htmlFor="e-ppl">
                People doing manual last-mile work{" "}
                <span className="fld-ppl-right">
                  <output id="o-ppl">{ppl}</output>
                  <input
                    aria-label="Enter number of people"
                    className="num-in"
                    id="t-ppl"
                    max="9999"
                    min="1"
                    type="number"
                    value={pplText}
                    onChange={(e) => {
                      setPplText(e.target.value);
                      setPpl(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 9999));
                    }}
                    onBlur={() => setPplText(String(ppl))}
                  />
                </span>
              </label>
              <input
                id="e-ppl"
                max="500"
                min="1"
                type="range"
                value={ppl}
                onChange={(e) => {
                  setPpl(+e.target.value);
                  setPplText(e.target.value);
                }}
              />
              <p className="hint">{hint}</p>
            </div>
            <div className="fld">
              <label htmlFor="e-pct">
                Share of their time on manual workflows <output id="o-pct">{pct}%</output>
              </label>
              <input id="e-pct" max="80" min="5" step="5" type="range" value={pct} onChange={on(setPct)} />
              <p className="hint">Reconciliations, exceptions, re-keying, chasing approvals</p>
            </div>
            <div className="fld">
              <label htmlFor="e-cost">
                Average loaded cost per person <output id="o-cost">${cost}K</output>
              </label>
              <input id="e-cost" max="250" min="50" step="5" type="range" value={cost} onChange={on(setCost)} />
              <p className="hint">Salary plus benefits and overhead</p>
            </div>
            <div className="fld">
              <label htmlFor="e-auto">
                Share agents could take over <output id="o-auto">{auto}%</output>
              </label>
              <input id="e-auto" max="90" min="10" step="5" type="range" value={auto} onChange={on(setAuto)} />
              <p className="hint">Your assumption. The assessment replaces it with a real number.</p>
            </div>
          </div>
          <div aria-live="polite" className="est-out">
            <p className="k">ESTIMATED ANNUAL COST OF THE LAST MILE</p>
            <div>
              <p className="big" id="r-cost">
                {money(total)}
              </p>
              <p className="lbl">spent each year on manual last-mile work</p>
            </div>
            <div className="row">
              <div>
                <p className="sm" id="r-free" style={{ color: "var(--orange)" }}>
                  {money(free)}
                </p>
                <p className="lbl">capacity agents could free up</p>
              </div>
              <div>
                <p className="sm" id="r-hrs">
                  {hrs.toLocaleString("en-US")}
                </p>
                <p className="lbl">hours a year back to the team</p>
              </div>
            </div>
            <p className="note">Illustrative estimate based only on the numbers entered above. Not a quote or a guaranteed result.</p>
            <Link className="btn btn-primary" href="/contact">
              Validate it in a last-mile assessment →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
