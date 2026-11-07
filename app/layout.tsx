import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Davero AI | Enterprise Intelligence, Delivered.",
  description:
    "Davero AI builds and deploys multi-agent AI systems, enterprise automation, and last-mile AI solutions.",
};

export const viewport: Viewport = {
  themeColor: "#080b0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-sm bg-accent px-4 py-3 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
