import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/site/contact-form";
import { Tbd } from "@/components/site/tbd";
import { EMAIL } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Contact Davero AI | Start a Conversation" },
  description:
    "Tell us about the AI workflow you want in production. Contact Davero AI through the form or at hello@davero.ai.",
};

export default function ContactPage() {
  return (
    <section className="section" style={{ background: "var(--glow)" }}>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <div id="intro">
            <h1 className="t-h1">Start a Conversation</h1>
            <p className="t-lead mt-5">
              Tell us what you want to build. We&apos;ll reply by email. Reply time: <Tbd />.
            </p>
          </div>
          <div id="email" className="mt-12 border-t border-line pt-8">
            <h2 className="t-h3">Prefer email?</h2>
            <p className="mt-2 text-muted-foreground">
              Write to{" "}
              <a className="link" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              . <Tbd>confirm this address works; the brief could not load davero.ai</Tbd>
            </p>
          </div>
        </div>
        <div id="form" className="card p-6 sm:p-10 lg:col-span-7">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
