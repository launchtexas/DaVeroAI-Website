// #assessment (final CTA) from docs/source/design-v4.html. Title and deliverables vary per page.
import Link from "next/link";

export function Assessment({
  title = "How much of the operation still runs by hand?",
  deliverables = [
    "A map of last-mile workflows",
    "The two or three best first candidates for agents",
    "A rough timeline and engagement shape",
  ],
}: {
  title?: string;
  deliverables?: readonly string[];
}) {
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
              {deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Link className="btn btn-primary" href="/contact">
              Book a last-mile assessment →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
