import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, LegalTable, Mail, type LegalSection } from "@/components/site/legal-doc";

// Checked against the code: no cookies, localStorage or sessionStorage are set by the site, and no analytics or
// advertising scripts are loaded. The only third-party script is Cloudflare Turnstile, when its keys are set.
export const metadata: Metadata = {
  title: { absolute: "Cookie Notice | DaVero AI" },
  description: "The DaVero AI website sets no cookies of its own and uses no analytics or advertising. What Cloudflare Turnstile may store, and why there is no cookie banner.",
  alternates: { canonical: "/cookies" },
};

const sections: LegalSection[] = [
  {
    id: "summary",
    title: "Summary",
    body: (
      <ul>
        <li>The website sets no cookies of its own.</li>
        <li>It stores nothing in your browser&apos;s local or session storage.</li>
        <li>It uses no analytics, advertising, social media or tracking tools.</li>
        <li>
          The only third-party technology is Cloudflare Turnstile, a bot check on the contact form, and only when we switch it
          on.
        </li>
      </ul>
    ),
  },
  {
    id: "what-cookies-are",
    title: "What cookies and similar technologies are",
    body: (
      <p>
        Cookies are small text files a website places on your device. Similar technologies, such as local storage, store or
        read information on your device in other ways. Some are strictly necessary for a service you request; others are used
        for analytics or advertising, and those generally need your consent.
      </p>
    ),
  },
  {
    id: "what-we-use",
    title: "What this website uses",
    body: (
      <>
        <LegalTable
          label="Technologies used"
          head={["Technology", "Set by", "Purpose", "When"]}
          rows={[
            ["None of our own", "DaVero AI", "Not applicable", "Never"],
            [
              "Cloudflare Turnstile",
              "Cloudflare, Inc., from challenges.cloudflare.com",
              "Tells people from automated programs on the contact form, to prevent spam and abuse",
              "Only on the contact page, and only when the bot check is enabled",
            ],
          ]}
        />
        <p>
          When enabled, Turnstile runs inside its own frame and may read or store information in your browser, such as
          browser characteristics and short-lived tokens, to complete the check. Cloudflare describes what it collects in its
          Turnstile privacy addendum and{" "}
          <a className="link" href="https://www.cloudflare.com/privacypolicy/" rel="noopener noreferrer" target="_blank">
            privacy policy
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "no-banner",
    title: "Why there is no cookie banner",
    body: (
      <>
        <p>
          Consent is needed for cookies and similar technologies that are not strictly necessary. The website uses none of
          those: it has no analytics, advertising or tracking, and sets no cookies of its own.
        </p>
        <p>
          Turnstile, when enabled, runs only to protect the contact form you choose to use, and only for that security purpose.
          Security measures of this kind are strictly necessary for the service you request, so they do not need consent. If
          we ever add a technology that does need consent, we will ask for it before it runs and update this notice.
        </p>
      </>
    ),
  },
  {
    id: "control",
    title: "Controlling cookies",
    body: (
      <p>
        You can block or delete cookies and site data in your browser settings. Blocking Cloudflare&apos;s content may stop the
        contact form from passing the bot check when it is enabled; you can always email <Mail /> instead.
      </p>
    ),
  },
  {
    id: "more",
    title: "More information",
    body: (
      <p>
        Our{" "}
        <Link className="link" href="/privacy">
          Privacy Policy
        </Link>{" "}
        explains how we handle personal information. Questions about this notice: email <Mail />.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalDoc
      title="Cookie Notice"
      lead={<p>The website sets no cookies of its own and uses no analytics or advertising. Here is the one exception that may apply, and why there is no banner.</p>}
      sections={sections}
    />
  );
}
