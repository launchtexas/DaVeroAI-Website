import type { Metadata } from "next";
import Link from "next/link";
import { LegalDoc, Mail, type LegalSection } from "@/components/site/legal-doc";

// Terms for using the website only; client services are governed by a separate signed agreement.
export const metadata: Metadata = {
  title: { absolute: "Terms of Use | DaVero AI" },
  description: "The terms that apply when you use the DaVero AI website: acceptable use, intellectual property, disclaimers and liability.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "About these terms",
    body: (
      <>
        <p>
          These terms apply to your use of daveroai.com (the <strong>website</strong>), operated by DaVero AI LLC,
          of 2100 N Greenville Ave, Ste 217, Richardson, TX 75082, United States (<strong>DaVero AI</strong>, <strong>we</strong>,{" "}
          <strong>us</strong>). By using the website you accept them. If you do not accept them, do not use the website.
        </p>
        <p>
          These terms cover the website only. They are not an agreement for services: any services we provide are governed by
          a separate written agreement, which prevails over these terms for those services.
        </p>
      </>
    ),
  },
  {
    id: "using",
    title: "Using the website",
    body: (
      <>
        <p>You may view, download and print pages for your own information and internal business use. You must not:</p>
        <ul>
          <li>use the website in breach of any law, or to infringe anyone&apos;s rights;</li>
          <li>
            try to gain unauthorised access to the website, its servers or connected systems, or test their vulnerability
            except as our{" "}
            <Link className="link" href="/security">
              responsible disclosure policy
            </Link>{" "}
            allows;
          </li>
          <li>disrupt or overload the website, including by denial-of-service attacks or automated mass requests;</li>
          <li>send spam, malicious code or unlawful, misleading or abusive content through the contact form;</li>
          <li>
            scrape, copy or extract content in bulk, or use it to train or improve machine learning models, without our
            written permission;
          </li>
          <li>frame the website or suggest that we endorse you or your products.</li>
        </ul>
        <p>
          We may change, suspend or withdraw any part of the website at any time, and restrict access for anyone who breaches
          these terms.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The website and its content, including text, graphics, illustrations, the DaVero AI name and logo, and the selection
          and arrangement of material, are owned by us or our licensors and protected by copyright, trademark and other laws.
          Apart from the use allowed in section 2, these terms give you no right to use them.
        </p>
        <p>
          Third-party names, statistics and quotes are the property of their owners and are used for identification and
          reference. Our{" "}
          <Link className="link" href="/legal">
            Legal Notice
          </Link>{" "}
          explains more.
        </p>
      </>
    ),
  },
  {
    id: "your-content",
    title: "What you send us",
    body: (
      <p>
        When you contact us, you confirm that the information you send is accurate and that you are entitled to share it. Do
        not send confidential information through the contact form; sending it does not create a confidential relationship
        or a client relationship. We handle personal information as described in our{" "}
        <Link className="link" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>
    ),
  },
  {
    id: "no-advice",
    title: "Information only, no advice",
    body: (
      <p>
        Content on the website is general information about our services and the market. It is not legal, accounting, tax,
        financial or other professional advice, and it is not an offer capable of acceptance. Statistics and examples describe
        third-party research or typical situations, not promised results. Get advice suited to your situation before acting.
      </p>
    ),
  },
  {
    id: "warranty",
    title: "No warranty",
    body: (
      <p>
        We work to keep the website accurate and available, but it is provided &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo;. To the fullest extent the law allows, we make no warranties, express or implied, including about
        accuracy, completeness, fitness for a particular purpose, non-infringement or uninterrupted, error-free or secure
        operation.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent the law allows, we are not liable for any indirect, incidental, special, consequential or
          punitive loss, or for any loss of profit, revenue, business, goodwill or data, arising from your use of, or inability
          to use, the website or reliance on its content. As you do not pay to use the website, our total liability to you
          arising from the website is limited to one hundred US dollars (US$100).
        </p>
        <p>
          Nothing in these terms excludes or limits liability that cannot be excluded or limited by law, such as liability for
          death or personal injury caused by negligence, or for fraud or fraudulent misrepresentation.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Your responsibility",
    body: (
      <p>
        To the extent the law allows, you will compensate us for claims, losses and reasonable costs caused by your breach of
        section 2.
      </p>
    ),
  },
  {
    id: "links",
    title: "Third-party links",
    body: (
      <p>
        The website links to third-party websites, such as the sources of the research we cite. We do not control them and are
        not responsible for their content, availability or privacy practices. A link is not an endorsement.
      </p>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These terms and any dispute arising from them or the website are governed by the laws of the State of Texas, United States, without regard to its conflict-of-laws rules, and
        the state and federal courts located in Collin County, Texas, have exclusive jurisdiction. If you are a consumer, you also keep the protection of
        the mandatory laws of the country where you live and may bring proceedings there.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <p>
        If any part of these terms is found unenforceable, the rest stays in effect. If we do not enforce a right, we have not
        waived it. These terms, together with the policies they refer to, are the whole agreement between you and us about the
        website.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these terms and will show the new date at the top of the page. The terms in force when you use the
        website apply to that use.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms: email <Mail subject="Terms of Use" />.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      title="Terms of Use"
      lead={<p>The terms that apply when you use the DaVero AI website. Services for clients are covered by a separate agreement.</p>}
      sections={sections}
    />
  );
}
