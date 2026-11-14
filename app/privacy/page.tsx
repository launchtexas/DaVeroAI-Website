import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalTable, Mail, type LegalSection } from "@/components/site/legal-doc";

// Every statement about data here must match the code: app/api/contact/route.ts, lib/contact-shield.ts,
// lib/contact-rules.ts, components/site/turnstile.tsx, next.config.ts. Open facts: docs/legal-review.md.
export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | DaVero AI" },
  description:
    "What personal information the DaVero AI website collects, why, who processes it, how long it is kept and how to exercise your rights.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          This policy explains how DaVero AI (
          <strong>DaVero AI</strong>, <strong>we</strong>, <strong>us</strong>) handles personal information collected through
          daveroai.com (the <strong>website</strong>).
        </p>
        <p>
          For that information we are the controller under the EU General Data Protection Regulation (GDPR) and the UK GDPR, and
          the business under the California Consumer Privacy Act as amended by the California Privacy Rights Act (CCPA).
        </p>
        <p>
          This policy covers the website only. Personal information we handle when delivering services to a client is governed
          by our agreement with that client.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>The website has no accounts, no analytics and no advertising. We collect personal information in two ways.</p>
        <h3>When you use the contact form</h3>
        <ul>
          <li>Required: your name, work email address, company and a description of the workflow you want help with.</li>
          <li>Optional: the business platform you use and your business domain.</li>
        </ul>
        <p>
          The form also sends a token recording when the form was loaded, used only to detect automated submissions. We do not
          receive anything you type until you submit the form.
        </p>
        <h3>When you visit any page</h3>
        <ul>
          <li>
            Request data that every website receives: your IP address, the page requested, the time, your browser&apos;s user
            agent and the referring page. Our hosting provider processes this to deliver the website and protect it.
          </li>
          <li>
            When you submit the contact form, your IP address is also used to limit how many messages can be sent from one
            address (see section 3).
          </li>
          <li>
            If our bot check is switched on, Cloudflare Turnstile collects signals from your browser and device (for example
            browser characteristics and how the page was interacted with) to tell people from automated programs.
          </li>
        </ul>
        <p>
          We do not ask for, and ask you not to send, special category data (such as health information) or financial account
          details through the form.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it and our legal bases",
    body: (
      <>
        <LegalTable
          label="Purposes and legal bases"
          head={["Purpose", "Information", "Legal basis (GDPR / UK GDPR)"]}
          rows={[
            [
              "Read and reply to your enquiry, and discuss a possible engagement",
              "Contact form fields",
              "Legitimate interests in responding to business enquiries; steps you ask us to take before entering into a contract",
            ],
            [
              "Block spam and abuse of the contact form",
              "IP address, form token, Turnstile signals, a one-way fingerprint of your email and message",
              "Legitimate interests in keeping the website and our inbox secure",
            ],
            [
              "Deliver and secure the website",
              "Request data, including IP address",
              "Legitimate interests in operating a secure, working website",
            ],
            [
              "Meet legal obligations and handle legal claims",
              "Any of the above, where relevant",
              "Legal obligation; legitimate interests in establishing or defending legal claims",
            ],
          ]}
        />
        <p>
          Where we rely on legitimate interests, we have weighed them against your rights. You can object at any time (see
          section 8).
        </p>
        <p>
          <strong>Automated checks.</strong> The contact form runs automated checks before a message is sent: a hidden field
          only programs fill in, the time since the form loaded, limits per IP address (5 messages per 10 minutes and, where
          shared limits are enabled, 20 per day), content rules (for example HTML code or a message made mostly of links), a
          repeat check for the same email and message within 10 minutes and, if enabled, Cloudflare Turnstile. A message that
          fails some of these checks is not delivered. These checks have no legal or similarly significant effect on you. If you
          think a genuine message was blocked, email <Mail />.
        </p>
        <p>We do not sell personal information, share it for cross-context behavioural advertising, or use it to profile you.</p>
      </>
    ),
  },
  {
    id: "processors",
    title: "Who processes it for us",
    body: (
      <>
        <p>We share personal information only with service providers that process it on our instructions:</p>
        <LegalTable
          label="Service providers"
          head={["Provider", "What it does", "Information"]}
          rows={[
            ["Vercel Inc.", "Hosts the website and runs the contact form endpoint", "Request data, including IP address; contact form submissions in transit"],
            ["Resend (Plus Five Five, Inc.)", "Sends each contact form submission to our inbox by email", "Contact form fields"],
            [
              "Cloudflare, Inc. (Turnstile), when enabled",
              "Bot check on the contact form",
              "IP address and browser and device signals",
            ],
            [
              "Upstash, Inc. (Redis), when enabled",
              "Stores short-lived rate-limit counters and repeat-message fingerprints shared across servers",
              "IP address; a one-way fingerprint of your email and message",
            ],
            ["Microsoft Corporation (Microsoft 365)", "Hosts the inbox that receives enquiries", "Contact form fields and our correspondence with you"],
          ]}
        />
        <p>
          We may also disclose information to professional advisers, to a buyer or successor if our business is reorganised or
          sold, or where the law requires it.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Our service providers are based in the United States and may process information there and in other countries. When
        personal information from the European Economic Area, the United Kingdom or Switzerland is transferred to a country
        without an adequacy decision, we rely on appropriate safeguards: an adequacy decision (including the EU-US Data Privacy
        Framework and its UK and Swiss extensions where the recipient participates) or the European Commission&apos;s Standard
        Contractual Clauses with the UK International Data Transfer Addendum. You can ask us for a copy of the relevant
        safeguards at <Mail subject="Privacy request" />.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <LegalTable
        label="Retention periods"
        head={["Information", "Kept for"]}
        rows={[
          [
            "Enquiries and our correspondence",
            <>
              Kept indefinitely as part of our business records, unless you ask us to delete them; we then delete them unless the law requires us to keep them
            </>,
          ],
          ["Per-IP rate-limit counters", "Up to 10 minutes, and up to 24 hours for the daily limit when shared limits are enabled"],
          ["Repeat-message fingerprint", "10 minutes"],
          ["Turnstile signals", "Processed by Cloudflare for the check, under Cloudflare's own retention terms"],
          ["Hosting request logs", "Under our hosting provider's log retention settings"],
        ]}
      />
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <p>
        The website is served only over HTTPS and sets strict browser security headers. The contact form endpoint accepts
        same-origin requests only, caps request size, validates every field and keeps no database: a submission is passed
        straight to our email provider, Microsoft 365. No method of transmission or
        storage is completely secure. See our <Link className="link" href="/security">Security</Link> page for more, including how
        to report a vulnerability.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <>
        <h3>EEA and UK</h3>
        <p>
          You have the right to access your personal information, have it corrected or erased, restrict or object to its use,
          and receive it in a portable format. You may also complain to your data protection supervisory authority; in the UK
          this is the Information Commissioner&apos;s Office. We would appreciate the chance to address your concern first.
        </p>
        <h3>California and other US states</h3>
        <p>
          Depending on where you live, you may have the right to know what personal information we collect and how we use and
          disclose it, to access, correct and delete it, and to opt out of its sale, sharing for targeted advertising or
          profiling. We do none of those three. In the last 12 months we collected identifiers (name, email address, IP
          address), professional information (company, platform, domain) and internet activity (request data), from you and your
          device, for the purposes in section 3, and disclosed them only to the service providers in section 4. We do not
          collect sensitive personal information. We will not discriminate against you for exercising your rights.
        </p>
        <h3>How to exercise them</h3>
        <p>
          Email <Mail subject="Privacy request" /> and tell us which right you want to exercise. We may ask for information to
          verify your identity, and we will respond within the time the law requires (one month under the GDPR and UK GDPR, 45
          days under the CCPA, each extendable where the law allows). You may use an authorised agent; we may ask the agent for
          proof of authority. If we decline your request, we will explain why and, where the law provides it, how to appeal.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        The website sets no cookies of its own and uses no analytics or advertising tools. Our{" "}
        <Link className="link" href="/cookies">
          Cookie Notice
        </Link>{" "}
        explains what Cloudflare Turnstile may store when the bot check is enabled.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <p>
        The website is for businesses and is not directed at children. We do not knowingly collect personal information from
        anyone under 16. If you believe a child has sent us information, email <Mail /> and we will delete it.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy when our practices change and show the new date at the top of the page. If a change
        materially affects how we use information we already hold, we will tell the people affected where we can.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        For any question about this policy or your personal information, email <Mail subject="Privacy request" />.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="Privacy Policy"
      lead={<p>What the website collects, why, who processes it, how long it is kept and how to exercise your rights.</p>}
      sections={sections}
    />
  );
}
