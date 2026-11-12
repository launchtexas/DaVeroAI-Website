"use client";

import Link from "next/link";
import { useState } from "react";
import s from "./forms.module.css";

const money = (v: number) => (v >= 1e6 ? `$${(v / 1e6).toFixed(1)}M` : `$${Math.round(v / 1e3)}K`);

// Same formula as the mock's script. Defaults (8, 35, 110, 50) give $308K / $154K / 2,912 h (the mock's static "5,824" is overwritten by its script).
function estimate(people: number, pct: number, costK: number, auto: number) {
  const cost = people * (pct / 100) * costK * 1000;
  return { cost, free: cost * (auto / 100), hours: Math.round(people * (pct / 100) * 2080 * (auto / 100)) };
}

type SliderProps = { id: string; label: string; hint: string; min: number; max: number; step?: number; value: number; text: string; onChange: (v: number) => void };

function Slider({ id, label, hint, min, max, step, value, text, onChange }: SliderProps) {
  return (
    <div>
      <div className={s.fldHead}>
        <label htmlFor={id}>{label}</label>
        <output htmlFor={id}>{text}</output>
      </div>
      <input
        className={s.range}
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={text}
        aria-describedby={`${id}-hint`}
        onChange={(e) => onChange(+e.target.value)}
      />
      <p id={`${id}-hint`} className={s.hint}>
        {hint}
      </p>
    </div>
  );
}

export function Estimate({ hint = "Finance, supply chain or procurement staff" }: { hint?: string }) {
  const [people, setPeople] = useState(8);
  const [peopleText, setPeopleText] = useState("8");
  const [pct, setPct] = useState(35);
  const [costK, setCostK] = useState(110);
  const [auto, setAuto] = useState(50);
  const r = estimate(people, pct, costK, auto);

  const setFromRange = (v: number) => {
    setPeople(v);
    setPeopleText(String(v));
  };
  const setFromText = (t: string) => {
    setPeopleText(t);
    setPeople(Math.min(Math.max(parseInt(t) || 1, 1), 9999));
  };

  return (
    <section className="section alt" id="estimate" aria-labelledby="estimate-title">
      <div className="wrap">
        <p className="eyebrow">Estimate</p>
        <h2 id="estimate-title">What is the last mile costing the business?</h2>
        <p className="lede">
          Move the sliders to see what manual last-mile work costs each year, and how much capacity agents could free up.
        </p>
        <div className={s.est}>
          <div className={s.estIn}>
            <div>
              <div className={s.fldHead}>
                <label htmlFor="e-ppl">People doing manual last-mile work</label>
                <span className={s.pplRight}>
                  <input
                    aria-label="Enter number of people"
                    className={s.numIn}
                    type="number"
                    min={1}
                    max={9999}
                    value={peopleText}
                    onChange={(e) => setFromText(e.target.value)}
                    onBlur={() => setPeopleText(String(people))}
                  />
                </span>
              </div>
              {/* The slider tops out at 500; the number box goes to 9999 and the result uses the box. */}
              <input
                className={s.range}
                id="e-ppl"
                type="range"
                min={1}
                max={500}
                value={Math.min(people, 500)}
                aria-valuetext={`${people} people`}
                aria-describedby="e-ppl-hint"
                onChange={(e) => setFromRange(+e.target.value)}
              />
              <p id="e-ppl-hint" className={s.hint}>
                {hint}
              </p>
            </div>
            <Slider id="e-pct" label="Share of their time on manual workflows" hint="Reconciliations, exceptions, re-keying, chasing approvals" min={5} max={80} step={5} value={pct} text={`${pct}%`} onChange={setPct} />
            <Slider id="e-cost" label="Average loaded cost per person" hint="Salary plus benefits and overhead" min={50} max={250} step={5} value={costK} text={`$${costK}K`} onChange={setCostK} />
            <Slider id="e-auto" label="Share agents could take over" hint="Your assumption. The assessment replaces it with a real number." min={10} max={90} step={5} value={auto} text={`${auto}%`} onChange={setAuto} />
          </div>
          <div className={s.estOut}>
            <p className={s.k}>ESTIMATED ANNUAL COST OF THE LAST MILE</p>
            <div aria-live="polite" aria-atomic="true">
              <p className={s.big}>{money(r.cost)}</p>
              <p className={s.lbl}>spent each year on manual last-mile work</p>
            </div>
            <div className={s.row}>
              <div>
                <p className={s.sm} style={{ color: "var(--orange)" }}>
                  {money(r.free)}
                </p>
                <p className={s.lbl}>capacity agents could free up</p>
              </div>
              <div>
                <p className={s.sm}>{r.hours.toLocaleString("en-US")}</p>
                <p className={s.lbl}>hours a year back to the team</p>
              </div>
            </div>
            <p className={s.note}>Illustrative estimate based only on the numbers entered above. Not a quote or a guaranteed result.</p>
            <Link className={s.btn} href="/contact">
              Validate it in a last-mile assessment <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
