import Link from "next/link";
import { ASSESSMENT_HREF, ASSESSMENT_LABEL } from "./nav";

/** Closing call to action. `scope` names the workflows, e.g. "last-mile finance workflows". */
export function Assessment({ title, scope = "last-mile workflows" }: { title: string; scope?: string }) {
  return (
    <section className="section dark" id="assessment">
      <div className="wrap split center">
        <div className="b">
          <h2 style={{ fontSize: "clamp(34px,4.4vw,48px)" }}>{title}</h2>
          <p className="lede">Book a last-mile assessment. We&apos;ll show you where agents deliver impact first.</p>
        </div>
        <div className="a" style={{ flex: "1 1 380px" }}>
          <div className="cta-box">
            <p style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700 }}>Assessment deliverables:</p>
            <ul>
              <li>A map of {scope}</li>
              <li>The two or three best first candidates for agents</li>
              <li>A rough timeline and engagement shape</li>
            </ul>
            <Link className="btn btn-primary" href={ASSESSMENT_HREF}>
              {ASSESSMENT_LABEL} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
