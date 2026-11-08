import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | DaVero AI" },
  description: "The terms that apply to using the DaVero AI website.",
};

export default function TermsPage() {
  return <LegalPage title="Terms of Use" />;
}
