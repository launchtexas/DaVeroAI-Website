import type { Metadata } from "next";
import Link from "next/link";
import { ASSESSMENT_HREF } from "@/components/site/v4/nav";

export const metadata: Metadata = {
  title: { absolute: "Page not found | DaVero AI" },
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section className="dark" aria-labelledby="nf-title">
      <div className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <h1 id="nf-title">Page not found</h1>
            <p className="lede">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
            <div className="actions">
              <Link className="btn btn-primary" href="/">
                Back to home
              </Link>
              <Link className="btn btn-ghost" href={ASSESSMENT_HREF}>
                Book an assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
