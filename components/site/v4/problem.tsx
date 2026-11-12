import type { ReactNode } from "react";
import { Check, Mark } from "./icons";
import { LastMileTest, type Mile } from "./last-mile-test";

export type ProblemProps = {
  title: string;
  lede: ReactNode;
  /** Zone 1 text, e.g. "Matches a native feature." */
  zone1: string;
  /** Zone 2 text; same on every page except where a page overrides it. */
  zone2?: string;
  /** Zone 3 text. */
  zone3: string;
  /** DOM id of the four-mile test (the mock numbers them lmt1..lmt6). */
  testId?: string;
  testTitle: string;
  miles: Mile[];
};

/** Default four miles (Home). Function pages pass their own. */
export const MILES: Mile[] = [
  { title: "Needed for the outcome", text: "The close, cash, claims or orders depend on it.", chip: "Business-critical" },
  { title: "Beyond standard configuration", text: "Not native to the platform, or only after a process change.", chip: "Beyond standard setup" },
  { title: "Business-specific", text: "Shaped by company rules, entities or industry.", chip: "Unique to the company" },
  { title: "Done by hand today", text: "Run on spreadsheets, email and disparate tools.", chip: "Manual effort" },
];

const Covered = () => (
  <span aria-hidden="true" className="zcheck">
    <Check size={15} stroke="#fff" width={3.2} />
  </span>
);

export function Problem({ title, lede, zone1, zone2 = "Covered after process standardization.", zone3, testId = "lmt1", testTitle, miles }: ProblemProps) {
  return (
    <section className="section alt" id="problem">
      <div className="wrap">
        <p className="eyebrow">The last mile</p>
        <h2>{title}</h2>
        <p className="lede">{lede}</p>
        <div className="zones">
          <div className="zone">
            <p className="tag">
              <Covered />
              ZONE 1 · COVERED
            </p>
            <h3>Platform covers it</h3>
            <p>{zone1}</p>
          </div>
          <div className="zone">
            <p className="tag">
              <Covered />
              ZONE 2 · COVERED
            </p>
            <h3>Adopt the platform standard</h3>
            <p>{zone2}</p>
          </div>
          <div className="zone ours">
            <p className="tag">
              <span aria-hidden="true" className="zarrow">
                <Mark size={24} />
              </span>
              ZONE 3 · WHERE DAVERO AI WORKS
            </p>
            <h3>The last mile</h3>
            <p>{zone3}</p>
          </div>
        </div>
        <LastMileTest id={testId} title={testTitle} miles={miles} />
      </div>
    </section>
  );
}
