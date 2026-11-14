import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, Mail, type LegalSection } from "@/components/site/legal-doc";

// Third-party names listed here are the ones that appear on the site (lib/content.ts, app/governance/page.tsx).
export const metadata: Metadata = {
  title: { absolute: "Legal Notice | DaVero AI" },
  description: "Company information, trademarks, third-party names, sources and copyright for the DaVero AI website.",
  alternates: { canonical: "/legal" },
};

const sections: LegalSection[] = [
  {
    id: "company",
    title: "Company information",
    body: (
      <>
        <p>This website is operated by:</p>
        <ul>
          <li>
            DaVero AI
          </li>
          <li>
            Registered address: 2100 N Greenville Ave, Ste 217, Richardson, TX 75082, United States
          </li>
          <li>
            Email: <Mail />
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "trademarks",
    title: "Trademarks",
    body: (
      <p>
        &ldquo;DaVero AI&rdquo; and the DaVero AI logo are trademarks of DaVero AI. You may not use them without our prior
        written permission, except to refer to us accurately and in a way that does not suggest endorsement.
      </p>
    ),
  },
  {
    id: "third-parties",
    title: "Third-party names",
    body: (
      <>
        <p>
          The website refers to other companies, products and organisations, including Rillet, Tabs, Oracle
          NetSuite, Sequoia Capital, Gartner, Reuters, Controllers Council, insightsoftware, Wakefield Research, NIST, ISO and
          AICPA &amp; CIMA. Their names and marks belong to their respective owners.
        </p>
        <p>
          We use these names only to identify the sources we cite, our team&apos;s advisory roles and our team&apos;s past employers. Their use does not mean that
          any of these organisations endorses DaVero AI, or that we are partnered or affiliated with them, unless we say so
          expressly.
        </p>
      </>
    ),
  },
  {
    id: "sources",
    title: "Statistics, quotes and sources",
    body: (
      <p>
        Statistics and quotes on the website are attributed to their sources, with the publisher and date. They are the work
        of those sources, reproduced for reference; we have not independently verified them, and they may change after
        publication. If you believe a figure is attributed incorrectly, email <Mail subject="Source correction" /> and we will
        review it.
      </p>
    ),
  },
  {
    id: "no-advice",
    title: "No professional advice",
    body: (
      <p>
        Content on the website is general information. It is not legal, accounting, tax, financial or other professional
        advice, and it does not create a client relationship. Our{" "}
        <Link className="link" href="/terms">
          Terms of Use
        </Link>{" "}
        apply to your use of the website.
      </p>
    ),
  },
  {
    id: "copyright",
    title: "Copyright",
    body: (
      <p>
        &copy; 2026 DaVero AI. All rights reserved. The text, graphics, illustrations and design of this website are protected
        by copyright. The Inter typeface is used under the SIL Open Font License.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Legal questions and notices: email <Mail subject="Legal notice" /> or write to DaVero AI,{" "}
        2100 N Greenville Ave, Ste 217, Richardson, TX 75082, United States.
      </p>
    ),
  },
];

export default function LegalNoticePage() {
  return (
    <LegalDoc
      title="Legal Notice"
      lead={<p>Who operates this website, who owns the names on it, and where its figures come from.</p>}
      sections={sections}
    />
  );
}
