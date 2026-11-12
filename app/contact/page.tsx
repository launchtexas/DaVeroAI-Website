import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormWithParams } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Start a Conversation | DaVero AI",
  description:
    "Tell us the last-mile workflow you want finished. Expert help, your own workflows automated, AI at work under your approval.",
};

// Markup 1:1 with docs/source/design-v4.html page-contact.
export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-inner">
        <div>
          <p className="cl-eyebrow">CONTACT</p>
          <h1 className="cl-h1">Start a conversation</h1>
          <p className="cl-sub">Tell us the workflow your platform doesn&apos;t finish.</p>
          <p className="cl-section-label">WHAT YOU GET</p>
          <ul className="cl-checks">
            <li>
              <span className="cl-check-icon">✓</span>Expert help in your platform
            </li>
            <li>
              <span className="cl-check-icon">✓</span>Its own last-mile workflows automated
            </li>
            <li>
              <span className="cl-check-icon">✓</span>Client teams move to higher-value work
            </li>
            <li>
              <span className="cl-check-icon">✓</span>AI put to work under your own approval
            </li>
          </ul>
          <p className="cl-section-label">WHAT HAPPENS NEXT</p>
          <ul className="cl-steps">
            <li>
              <span className="cl-step-num">01</span>We reply
            </li>
            <li>
              <span className="cl-step-num">02</span>We talk through your last mile
            </li>
            <li>
              <span className="cl-step-num">03</span>We scope a first agent
            </li>
          </ul>
        </div>
        <div className="contact-card" id="form">
          <Suspense fallback={<ContactForm />}>
            <ContactFormWithParams />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
