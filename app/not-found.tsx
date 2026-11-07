import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Davero AI" },
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="section">
      <div className="container-narrow text-center">
        <h1 id="nf-title" className="t-h1">
          Page not found
        </h1>
        <p className="t-lead mx-auto mt-5">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
