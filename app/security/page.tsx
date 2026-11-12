import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, Mail, type LegalSection } from "@/components/site/legal-doc";

// Protections listed here must match the code (next.config.ts, app/api/contact/route.ts, lib/contact-shield.ts)
// and docs/security/REPORT.md. Governance: docs/governance.md. "Designed to align with", never a certification claim.
export const metadata: Metadata = {
  title: { absolute: "Security | DaVero AI" },
  description:
    "How to report a security vulnerability to DaVero AI, our safe harbour for good-faith research, and how the website and our agent work are protected.",
  alternates: { canonical: "/security" },
};

const sections: LegalSection[] = [
  {
    id: "report",
    title: "Report a vulnerability",
    body: (
      <>
        <p>
          If you believe you have found a security vulnerability in the DaVero AI website, email <Mail subject="Security report" />{" "}
          with &ldquo;Security report&rdquo; in the subject line. Please include:
        </p>
        <ul>
          <li>the affected URL or component and the type of issue;</li>
          <li>step-by-step instructions to reproduce it, with any proof-of-concept code, requests or screenshots;</li>
          <li>the impact you believe it has;</li>
          <li>how we can reach you, and whether you would like to be credited.</li>
        </ul>
        <p>
          We will acknowledge your report, investigate it, keep you informed of our progress and tell you when it is fixed.
          Please keep the details private until we confirm a fix, or until we agree a disclosure date with you.
        </p>
        <p>
          Our contact details are also published in machine-readable form at{" "}
          <a className="link" href="/.well-known/security.txt">
            /.well-known/security.txt
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        <h3>In scope</h3>
        <ul>
          <li>daveroai.com and its pages;</li>
          <li>the contact form and its endpoint, /api/contact.</li>
        </ul>
        <h3>Out of scope</h3>
        <ul>
          <li>
            services run by third parties, including our hosting, email and bot-check providers; report those to the provider;
          </li>
          <li>denial-of-service testing, or sending high volumes of requests or contact form messages;</li>
          <li>social engineering, phishing or physical attacks against our people or premises;</li>
          <li>reports from automated scanners without a demonstrated, exploitable impact;</li>
          <li>
            missing best-practice settings with no demonstrated impact, such as absent headers on pages that hold no
            sensitive data.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "safe-harbour",
    title: "Safe harbour",
    body: (
      <>
        <p>If you act in good faith and follow this policy, we will:</p>
        <ul>
          <li>consider your research authorised, and not take or support legal action against you for it;</li>
          <li>work with you to understand and resolve the issue quickly;</li>
          <li>credit you publicly for the finding if you wish, once it is fixed.</li>
        </ul>
        <p>Good faith means that you:</p>
        <ul>
          <li>test only within the scope above and stop as soon as you have confirmed a vulnerability;</li>
          <li>
            do not access, modify, keep or share data that is not yours beyond what is needed to show the issue, and tell us
            if you encounter any;
          </li>
          <li>do not degrade the website or disrupt other people&apos;s use of it;</li>
          <li>do not demand payment or other benefit in exchange for disclosure.</li>
        </ul>
        <p>
          This safe harbour covers only our own systems and claims we control; we cannot authorise testing of third-party
          services. If you are unsure whether something is allowed, ask us first.
        </p>
      </>
    ),
  },
  {
    id: "bounty",
    title: "No bug bounty",
    body: (
      <p>
        We do not run a bug bounty programme and do not offer payment for reports. We are grateful for responsible reports and
        will credit researchers who want it.
      </p>
    ),
  },
  {
    id: "website",
    title: "How the website is protected",
    body: (
      <>
        <ul>
          <li>
            <strong>Encrypted connections.</strong> The website is served only over HTTPS, and browsers are told to keep using
            HTTPS for two years (HTTP Strict Transport Security).
          </li>
          <li>
            <strong>Browser security headers.</strong> A Content Security Policy limits where scripts, frames and other content
            can load from; the website cannot be embedded in other sites; content types are not guessed; referrer data is
            limited; and camera, microphone, location, payment and USB access are switched off.
          </li>
          <li>
            <strong>A hardened contact form.</strong> The endpoint accepts same-origin JSON requests only, caps request size at
            10 KB, validates every field on the server, and rate-limits each IP address. Spam controls include a hidden field,
            a signed time check, content rules, a repeat-message check and, when enabled, Cloudflare Turnstile.
          </li>
          <li>
            <strong>Minimal data.</strong> The website has no accounts, no database, no analytics and no advertising tools.
            A contact form submission is sent as a plain-text email and not stored on the website. See our{" "}
            <Link className="link" href="/privacy">
              Privacy Policy
            </Link>
            .
          </li>
          <li>
            <strong>Secrets and dependencies.</strong> Keys are kept in the hosting environment, not in the code. Dependencies are
            checked with automated vulnerability audits.
          </li>
          <li>
            <strong>Security review.</strong> The website&apos;s code was reviewed for security in November 2026 and the issues
            found were fixed.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governance",
    title: "How we govern agent work",
    body: (
      <>
        <p>
          For client work, our{" "}
          <Link className="link" href="/#controls">
            governance approach
          </Link>{" "}
          is built on these practices:
        </p>
        <ul>
          <li>
            <strong>Human approval.</strong> Agents prepare the work; an authorised person on the client&apos;s side approves the
            result before the workflow proceeds.
          </li>
          <li>
            <strong>Least privilege.</strong> Each person and agent gets only the access its task needs, and preparation is
            separated from approval.
          </li>
          <li>
            <strong>Audit trail.</strong> Agent actions, human decisions and resulting changes are recorded so decisions can be
            reconstructed.
          </li>
          <li>
            <strong>Change control.</strong> Prompts, models, tools and workflow rules are versioned and tested, with a rollback
            path.
          </li>
          <li>
            <strong>Incident response.</strong> Defined steps to pause an agent, contain an issue, preserve evidence and notify
            the right people.
          </li>
          <li>
            <strong>Data boundaries.</strong> Agents are designed to run inside the client&apos;s platform, with collection limited
            to the task.
          </li>
        </ul>
        <p>
          This approach is designed to align with the NIST AI Risk Management Framework, ISO/IEC 42001 and SOC 2 practices. We
          do not claim certification or attestation against any of them.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Security reports and questions: <Mail subject="Security report" />.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalDoc
      title="Security"
      lead={<p>How to report a vulnerability to us, how we treat good-faith research, and how the website and our agent work are protected.</p>}
      sections={sections}
    />
  );
}
