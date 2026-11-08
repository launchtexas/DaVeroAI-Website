import { Tbd } from "./tbd";

export function LegalPage({ title }: { title: string }) {
  return (
    <section id="legal" aria-labelledby="legal-title" className="hero">
      <div className="container-prose">
        <p role="note" className="mb-10 rounded-[var(--r-ctl)] border border-dashed border-line-strong p-4 text-sm text-muted-fg">
          [TBD legal review]
        </p>
        <h1 id="legal-title" className="t-h1">
          {title}
        </h1>
        <p className="t-mono mt-4 text-faint">
          Last updated: <Tbd />
        </p>
        <p className="mt-12">
          <Tbd>legal text from the client</Tbd>
        </p>
      </div>
    </section>
  );
}
