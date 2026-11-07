import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTA_LABEL, EMAIL } from "@/lib/content";

export function CtaBand({ title, body, showEmail = false }: { title: string; body?: string; showEmail?: boolean }) {
  return (
    <section id="cta" aria-labelledby="cta-title" className="section band">
      <div className="container-narrow text-center" data-reveal>
        <h2 id="cta-title" className="t-h2">
          {title}
        </h2>
        {body && <p className="t-lead mx-auto mt-5">{body}</p>}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/contact">
              {CTA_LABEL}
              <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover/button:translate-x-[3px]" />
            </Link>
          </Button>
          {showEmail && (
            <p className="text-muted-foreground">
              or email{" "}
              <a className="link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
