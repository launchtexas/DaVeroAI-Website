import { SectionHead } from "@/components/site/blocks";
import { Ecosystem } from "@/components/site/ecosystem";
import { ECOSYSTEM_TAGLINE, ECOSYSTEM_TITLE } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Full-bleed band carrying the Enterprise Ecosystem diagram (Home and /industries). Light band: Midnight nodes read best on White/Cloud. */
export function EcosystemSection({ band = "band-paper" }: { band?: "band-paper" | "band-cloud" }) {
  return (
    <section id="ecosystem" aria-labelledby="ecosystem-title" className={cn("section", band)}>
      <div className="container-x">
        <SectionHead id="ecosystem-title" eyebrow={ECOSYSTEM_TAGLINE} title={ECOSYSTEM_TITLE} center />
        <Ecosystem headingId="ecosystem-title" />
      </div>
    </section>
  );
}
