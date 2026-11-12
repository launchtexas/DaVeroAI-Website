import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ScrollReset } from "@/components/site/scroll-reset";
import { Motion } from "@/components/site/v4/motion";

// Inter (brand kit typeface), self-hosted: variable weight 100–900, Latin subset (OFL, app/fonts/Inter-OFL.txt).
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
  // The design falls back to the system font (as the mock does), not a metric-adjusted Arial.
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daveroai.com"),
  title: { default: "DaVero AI | Own the Last Mile", template: "%s" },
  description: "DaVero AI agents extend enterprise platforms through the last mile, from system of record to business outcome, approved by process owners.",
  applicationName: "DaVero AI",
  openGraph: { siteName: "DaVero AI", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#081630",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={inter.variable}>
      <body>
        <a href="#main" className="skip">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          {children}
        </main>
        <Footer />
        {/* Last in the tree so its layout effect runs after Next.js scrolls the new page into view. */}
        <ScrollReset />
        <Motion />
      </body>
    </html>
  );
}
