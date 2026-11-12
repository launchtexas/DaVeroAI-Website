import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/site/contact-form";
import s from "@/components/site/v4/forms.module.css";
import { outcomes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a Conversation | DaVero AI",
  description:
    "Tell us the last-mile workflow you want finished. Expert help, your own workflows automated, AI at work under your approval.",
};

const next = ["We reply", "We talk through your last mile", "We scope a first agent"];

export default function ContactPage() {
  return (
    <div className={s.contactPage}>
      <div className={s.contactInner}>
        <section aria-labelledby="intro-title">
          <p className={s.clEyebrow}>Contact</p>
          <h1 id="intro-title" className={s.clH1}>
            Start a conversation
          </h1>
          <p className={s.clSub}>Tell us the workflow your platform doesn&apos;t finish.</p>
          <h2 className={s.clSectionLabel}>What you get</h2>
          <ul className={s.clChecks}>
            {outcomes.map((o) => (
              <li key={o}>
                <span aria-hidden="true" className={s.clCheckIcon}>
                  ✓
                </span>
                {o}
              </li>
            ))}
          </ul>
          <h2 className={s.clSectionLabel}>What happens next</h2>
          <ol className={s.clSteps}>
            {next.map((n, i) => (
              <li key={n}>
                <span aria-hidden="true" className={s.clStepNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {n}
              </li>
            ))}
          </ol>
        </section>
        <section id="form" aria-label="Contact form" className={s.contactCard}>
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
