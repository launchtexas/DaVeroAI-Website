import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | DaVero AI" },
  description: "How DaVero AI handles personal information.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
