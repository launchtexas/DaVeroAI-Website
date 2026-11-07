import { Tbd } from "./tbd";
import { EMAIL } from "@/lib/content";

export function LegalPage({ title }: { title: string }) {
  return (
    <section aria-labelledby="legal-title" className="section">
      <div className="container-narrow">
        <h1 id="legal-title" className="t-h1">
          {title}
        </h1>
        <p className="mt-4 text-sm text-faint">
          Last updated: <Tbd />
        </p>
        <div className="card mt-10 p-6 sm:p-8">
          <p>
            <Tbd>placeholder. Legal text to be supplied by the client.</Tbd>
          </p>
          <p className="mt-4 text-muted-foreground">
            Questions:{" "}
            <a className="link" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
