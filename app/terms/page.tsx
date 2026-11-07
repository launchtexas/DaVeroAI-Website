import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Terms of Use | Davero AI" },
  description: "The terms that apply to using the Davero AI website.",
};

export default function TermsPage() {
  return <LegalPage title="Terms of Use" />;
}
