import type { Metadata } from "next";
import { HeroStripes } from "@/components/site/art";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CTA_HREF, CTA_LABEL } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Page not found | DaVero AI" },
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="hero">
      <HeroStripes />
      <div className="container-prose text-center">
        <h1 id="nf-title" className="t-h1 mx-auto">
          Page not found
        </h1>
        <p className="t-lead mx-auto mt-6">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild>
            <Link href={CTA_HREF}>{CTA_LABEL}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
