import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | Davero AI" },
  description: "How Davero AI handles personal information.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
