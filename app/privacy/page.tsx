import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: { absolute: "Privacy Policy | DaveroAI" },
  description: "How DaveroAI handles personal information.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
