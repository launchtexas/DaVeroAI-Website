import { Eyebrow } from "@/components/site/blocks";
import { Ecosystem } from "@/components/site/ecosystem";
import { ECOSYSTEM_TAGLINE, ECOSYSTEM_TITLE } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Full-bleed band carrying the Enterprise Ecosystem graph (Home and /industries). */
export function EcosystemSection({ band = "band-paper" }: { band?: "band-paper" | "band-cloud" }) {
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className={cn("section eco-section", band)}>
      <div className="container-x">
        <Ecosystem
          head={
            <>
              <Eyebrow className="mb-4">{ECOSYSTEM_TAGLINE}</Eyebrow>
              <h2 id="ecosystem-title" className="t-h2">
                {ECOSYSTEM_TITLE}
              </h2>
            </>
          }
        />
      </div>
    </section>
  );
}
