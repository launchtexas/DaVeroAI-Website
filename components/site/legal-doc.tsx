import { EMAIL } from "@/lib/content";

// Long-form legal page: hero, then a table of contents and numbered sections with anchor links.
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
              <p className="lede">{lead}</p>
              <p className="crumb" style={{ margin: "24px 0 0" }}>
                Effective {effective} · Last updated {updated}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section aria-label={`${title} text`} className="section legal-body">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <nav aria-labelledby="toc-title" className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
              <h2 id="toc-title" className="t-mono mb-4 text-faint">
                Contents
              </h2>
              <ol className="legal-toc">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span className="tabular-nums text-faint">{i + 1}.</span> {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <div className="legal-prose lg:col-span-8">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`}>
                <h2 id={`${s.id}-title`} className="t-h3">
                  <a href={`#${s.id}`} className="legal-anchor">
                    <span className="tabular-nums">{i + 1}.</span> {s.title}
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
