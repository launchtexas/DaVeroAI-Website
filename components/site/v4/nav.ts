// Site navigation for the v4 design. Function pages live at /<slug> (the mock's navTo('<slug>')).
// shortcut: slugs and labels duplicated here for the header and footer; switch to lib/functions.ts once it exports them.
export const FUNCTIONS = [
  { slug: "finance-accounting", label: "Finance & Accounting" },
  { slug: "supply-chain", label: "Supply Chain" },
  { slug: "procurement", label: "Procurement" },
  { slug: "security-governance", label: "Security & Governance" },
  { slug: "insurance", label: "Insurance" },
] as const;

export const functionHref = (slug: string) => `/${slug}`;

export const SECTION_LINKS = [
  { href: "/#why-now", label: "Why now" },
  { href: "/#how", label: "How we work" },
  { href: "/#controls", label: "Controls" },
] as const;

export const ESTIMATE_HREF = "/#estimate";
export const ASSESSMENT_HREF = "/contact";
export const ASSESSMENT_LABEL = "Book a last-mile assessment";
