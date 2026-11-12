import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content Security Policy. Next.js inlines its bootstrap scripts and styles, and a nonce would force every
// page to render dynamically (no static prerendering), so scripts are limited to this origin plus inline.
// Dev mode also needs eval for React's debugging tools. Cloudflare Turnstile (contact form spam check) needs
// its script and its challenge iframe from challenges.cloudflare.com; nothing else is allowed from there.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://challenges.cloudflare.com`,
  "frame-src 'self' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  // Pre-v4 pages, folded into the Home sections.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/approach", destination: "/#how", permanent: true },
      { source: "/agentic-ai", destination: "/#problem", permanent: true },
      { source: "/services", destination: "/#solutions", permanent: true },
      { source: "/industries", destination: "/#solutions", permanent: true },
      { source: "/insights", destination: "/#why-now", permanent: true },
      { source: "/governance", destination: "/#controls", permanent: true },
      { source: "/functions/:slug(finance-accounting|supply-chain|procurement|security-governance|insurance)", destination: "/:slug", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
