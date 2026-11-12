import { EMAIL } from "@/lib/content";
import { LegalToc } from "@/components/site/legal-toc";

// Long-form legal page: dark hero, then a sticky index (left) beside numbered sections with anchor links.
// Copy lives in each app/<page>/page.tsx; open facts are <Tbd> markers listed in docs/legal-review.md.

export const LEGAL_EFFECTIVE = "8 November 2026";
export const LEGAL_UPDATED = "8 November 2026";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalDoc({
  title,
  lead,
  sections,
  effective = LEGAL_EFFECTIVE,
  updated = LEGAL_UPDATED,
}: {
  title: string;
  lead: React.ReactNode;
  sections: LegalSection[];
  effective?: string;
  updated?: string;
}) {
  return (
    <>
      <section className="dark" aria-labelledby="legal-title">
        <div className="hero">
          <div className="wrap">
            <div className="hero-copy">
              <p className="eyebrow">Legal</p>
              <h1 id="legal-title" style={{ fontSize: "clamp(36px,5vw,56px)" }}>
                {title}
              </h1>
              <div className="lede">{lead}</div>
              <p className="crumb" style={{ margin: "24px 0 0" }}>
                Effective {effective} · Last updated {updated}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section aria-label={`${title} text`} className="legal-body">
        <div className="wrap legal-layout">
          <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
          <div className="legal-prose">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`}>
                  <a href={`#${s.id}`} className="legal-anchor">
                    <span className="n">{i + 1}.</span> {s.title}
                  </a>
                </h2>
                {s.body}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Mail({ subject }: { subject?: string }) {
  const href = `mailto:${EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  return (
    <a className="link" href={href}>
      {EMAIL}
    </a>
  );
}

// Stacks into labelled cards below 640px (globals.css); scrollable as a fallback, so focusable and labelled.
export function LegalTable({ label, head, rows }: { label: string; head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="legal-table" role="region" aria-label={label} tabIndex={0}>
      <table>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} data-label={head[j]}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
