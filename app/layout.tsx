import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";

// Inter (brand kit typeface), self-hosted: variable weight 100–900, Latin subset (OFL, app/fonts/Inter-OFL.txt).
const inter = localFont({
  src: "./fonts/InterVariable-latin.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://daveroai.com"),
  title: { default: "DaVero AI | Own the Last Mile", template: "%s" },
  description:
    "DaVero AI turns your business platforms into finished, end-to-end workflows, run by AI agents, with your team approving every result.",
  applicationName: "DaVero AI",
  openGraph: { siteName: "DaVero AI", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#081630",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-accent px-4 py-3 font-medium text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
