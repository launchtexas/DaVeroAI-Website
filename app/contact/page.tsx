import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckList, Eyebrow } from "@/components/site/blocks";
import { ContactForm, ContactFormWithParams } from "@/components/site/contact-form";
import { Tbd } from "@/components/site/tbd";
import { outcomes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a Conversation | DaveroAI",
  description:
    "Tell us the last-mile workflow you want finished. Expert help, your own workflows automated, AI at work under your approval.",
};

const next = ["We reply", "We talk through your last mile", "We scope a first agent"];

export default function ContactPage() {
  return (
    <div className="hero">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <section id="intro" aria-labelledby="intro-title" className="lg:col-span-5">
          <Eyebrow className="mb-6">Contact</Eyebrow>
          <h1 id="intro-title" className="t-h1">
            Start a conversation
          </h1>
          <p className="t-lead mt-6">
            Tell us the workflow your platform doesn&apos;t finish. We reply by email. Reply time: <Tbd />
          </p>
          <h2 className="t-mono mt-12 mb-5 text-faint">What you get</h2>
          <CheckList items={outcomes} />

          <div id="next" className="mt-12">
            <h2 className="t-mono mb-5 text-faint">What happens next</h2>
            <ol className="border-t border-line">
              {next.map((n, i) => (
                <li key={n} className="flex gap-4 border-b border-line py-4">
                  <span className="t-mono pt-1 text-mark">{String(i + 1).padStart(2, "0")}</span>
                  {n}
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section id="form" aria-label="Contact form" className="card self-start lg:col-span-7 lg:p-10">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
