// Shared copy, verbatim from docs/content.md. Page-only copy lives in each page.

// Enquiry inbox: delivery target for lib/contact.ts (mailto). Never rendered on the site (design.md §0.10, §7).
export const EMAIL = "ask@daveroai.com";
export const CTA_LABEL = "Start a conversation";
export const CTA_HREF = "/contact#form";
export const CLOSE_LINE = "The last mile is where software, services and context meet.";

export const nav = [
  { href: "/agentic-ai", label: "Agentic AI" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/governance", label: "Governance" },
  { href: "/industries", label: "Industries" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

export const footerCols = [
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/approach", label: "Our Approach" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "What we do",
    links: [
      { href: "/agentic-ai", label: "Agentic AI" },
      { href: "/services", label: "Services" },
      { href: "/governance", label: "Governance" },
      { href: "/industries", label: "Industries" },
    ],
  },
] as const;

export type Stat = { value: string; spoken?: string; label: string; source: string };

// §6.5: a tile without a source is never rendered.
export const stats: Stat[] = [
  { value: "340K", spoken: "340 thousand", label: "US accountants lost over five years", source: "Sequoia Capital, Mar 2026" },
  { value: "~75%", spoken: "about 75%", label: "of CPAs nearing retirement", source: "Sequoia Capital, Mar 2026" },
  { value: "61%", label: "of finance leaders report accounting talent shortages", source: "Controllers Council, 2026" },
  { value: "12%", label: "of finance teams run AI in core processes", source: "insightsoftware, 2026 (311 leaders)" },
  { value: "14%", label: "of mid-market CFOs fully trust AI with accounting data", source: "Wakefield Research, Feb 2026 (100 CFOs)" },
  { value: "40%+", spoken: "more than 40%", label: "of agentic AI projects will be scrapped by end-2027", source: "Gartner via Reuters, 29 Jun 2025" },
];
export const STATS_TAKEAWAY =
  "Top row: the people who do the work are leaving. Bottom row: companies buy AI but can't deploy or trust it alone.";
export const STATS_KEY_LINE = "Delivery, not models, is the bottleneck. We sell delivery.";

export type Challenge = {
  title: string;
  stat?: { value: string; label: string; source: string };
  answer: string;
};

// The 70%+ ERP stat is hidden until sourced (content.md).
export const challenges: Challenge[] = [
  {
    title: "The trust gap",
    stat: { value: "14%", label: "of mid-market CFOs fully trust AI with accounting data", source: "Wakefield Research, Feb 2026" },
    answer: "A Forward Deployed Accountant beside the team; every change human-approved.",
  },
  {
    title: "Fear of switching platforms",
    answer:
      "Strong collaboration between our Forward Deployed Accountant and the client's subject expert. We upskill the client's subject expert to be a builder.",
  },
  {
    title: "Stretched finance teams",
    stat: { value: "61%", label: "of finance leaders report accounting talent shortages", source: "Controllers Council, 2026" },
    answer: "Our pod does the build work, so lean teams gain capacity, not more load.",
  },
  {
    title: "AI bought, not used",
    stat: { value: "12%", label: "of finance teams run AI in core processes", source: "insightsoftware, 2026" },
    answer: "Our pod develops skills and deploys working agents in days.",
  },
  {
    // G2 "missing features" stat hidden until its report and date are known.
    title: "Product gaps (client-specific gaps)",
    answer: "Real client gaps become product candidates, and our pod is the bridge between them.",
  },
];

export const comparison = {
  platform: { title: "Platform", sub: "Traditional tools" },
  davero: { title: "DaVero AI", sub: "Agentic outcomes" },
  rows: [
    { platform: "Sells a tool to a professional", davero: "Sells the finished outcome to the buyer" },
    { platform: "Professional stays responsible for the output", davero: "Provider owns delivery, exceptions and quality" },
    { platform: "Each model release risks making it a feature", davero: "Each model release makes delivery faster and cheaper" },
  ],
};

export const arbitrage = {
  title: "From labor arbitrage to agent arbitrage",
  yesterday: {
    label: "Yesterday",
    title: "Labor arbitrage",
    rows: [
      "Move finance work to lower-cost people",
      "Stickiness comes from people and process know-how",
      "Value goes to outsourcers and consultants",
    ],
  },
  tomorrow: {
    label: "Tomorrow",
    title: "Agent arbitrage",
    rows: [
      "Agents tuned to each business do the work",
      "Stickiness comes from agents fitted to the client's own workflows",
      "Value goes to whoever owns agent quality",
    ],
  },
};

export const lastMileStates = [
  { id: "covers", title: "Platform covers it", body: "Matches a native feature", covered: true },
  { id: "adopts", title: "Client adopts the platform's way", body: "Covered once the client changes its process", covered: true },
  { id: "last-mile", title: "The last mile", body: "Outside scope or roadmap: disparate tools, repetitive manual work", covered: false },
] as const;

export const lastMileTest = [
  { title: "Needed for the outcome", body: "close, cash, claims, orders" },
  { title: "Not covered natively", body: "or only after a process change" },
  { title: "Client- or industry-specific", body: "own rules or vertical" },
  { title: "Done by hand today", body: "disparate tools, manual effort" },
];

export const domains = [
  { id: "finance", name: "Finance", lead: true, examples: ["Intercompany eliminations", "Revenue-recognition edge cases", "Entity reconciliations"] },
  { id: "procurement-supply-chain", name: "Procurement & Supply Chain", examples: ["PO-receipt-invoice exceptions", "Supplier onboarding", "Landed-cost accruals"] },
  { id: "it-services", name: "IT Services", examples: ["Access reviews", "License true-ups", "System-to-ledger data feeds"] },
  { id: "insurance", name: "Insurance", examples: ["Claims exceptions", "Bordereaux reconciliation", "Premium and commission accruals"] },
];

export const services = [
  {
    id: "implement",
    title: "Implement",
    line: "Platform implementation through first close.",
    outcome: "Ledger live, first close done",
  },
  {
    id: "build-agents",
    title: "Build agents",
    line: "Fine-tuned agents on the platform for reconciliations, accruals, flux analysis, AR/collections and audit prep.",
    outcome: "Agents running the close",
    // Deck REFERENCE 12 "Agent examples". The only per-service list the deck gives.
    agents: ["Reconciliations", "Accruals", "Flux analysis", "AR/collections", "Audit prep"],
  },
  {
    id: "run-and-tune",
    title: "Run and tune",
    line: "Managed agents that improve after go-live.",
    outcome: "Agents that keep getting better",
  },
];

export const hitlSteps = [
  // `detail` is the /governance wording (docs/governance.md); `line` is the short Home wording.
  { id: "prepare", actor: "agent", actorLabel: "Agent", title: "Prepare", line: "Agents prepare the work end to end.", detail: "Prepare the work end to end, with supporting evidence and exceptions ready for review." },
  { id: "review", actor: "human", actorLabel: "Human", title: "Review", line: "The client’s subject-matter expert (SME) team reviews.", detail: "Your subject-matter experts check the work against the workflow, rules and business context." },
  { id: "approve", actor: "human", actorLabel: "Human", title: "Approve", line: "The SME team approves the result.", detail: "An authorised person approves the result before the workflow proceeds. Unresolved exceptions return for correction." },
  { id: "record", actor: "record", actorLabel: "Platform", title: "Record", line: "Every action sits inside the Platform, with a full audit trail.", detail: "Keep a full audit trail of agent actions, human decisions and resulting changes inside the platform." },
] as const;
export const HITL_HEADLINE = "Humans review and approve. Agents do the rest.";
export const HITL_BAND = { title: "Controls CFOs and auditors trust", body: "Human approval plus a full audit trail on every agent action." };
export const HITL_ALT =
  "Agents prepare the work; the client's subject-matter experts review and approve it; every action is recorded in the platform with a full audit trail.";

export const outcomes = [
  "Expert help in your platform",
  "Its own last-mile workflows automated",
  "Client teams move to higher-value work",
  "AI put to work under your own approval",
];

// The "Referral" step is hidden until a referral relationship exists.
export const journey = [
  { title: "Embed and prove", body: "First agents live in weeks; before-and-after close metrics." },
  { title: "Expand", body: "AP, treasury, FP&A, revenue ops; then the next entity." },
  { title: "Replicate", body: "Library agents reused across the platform's customer base." },
];

export const PLATFORMS = ["Rillet", "Tabs", "Maxio", "Campfire"];
export const PLATFORMS_FOOTNOTE =
  "DaVero AI has no commercial partnership with these platforms. Names are used to describe the platforms we work around.";

export const GOLDEN_RULE = ["The client identifies the gap.", "We build.", "The client validates.", "We own, run and improve the agent."];
export const ADVISORY_FOOTNOTE = "Consultants and auditors keep their advisory and assurance roles.";

export const engagement = [
  { title: "Engage", body: "Embed with the client and understand the process." },
  { title: "Build the skill", body: "Turn the process into an agent skill." },
  { title: "Harden with a constitution", body: "Rules, controls and edge cases that make the skill reliable." },
  { title: "Converge into the platform", body: "Deploy the skill into the client's platform ecosystem." },
  { title: "Review and approve", body: "The client team stays in the loop; the skill keeps improving." },
];
export const ENGAGEMENT_RESULT = "A hardened skill running inside the platform, with the client’s team in the loop.";

export const strategy = {
  quote:
    "A platform's biggest opportunity to widen its moat and stickiness with enterprise clients lies in the complex workflows in and around the partner platform, where business-domain expertise is the key ingredient.",
  parts: [
    { label: "Where", title: "Complex enterprise workflows in and around the platform", body: "Business-domain expertise is the key ingredient, and no one owns it today." },
    { label: "What", title: "Purpose-built agents, tightly coupled to the platform", body: "Agents built on the platform's own data and APIs close or narrow the existing gaps." },
    { label: "How", title: "A partner firm dedicated to each platform ecosystem", body: "Focused on one platform, aligned with its roadmap, not competing with it." },
  ],
};

export const pod = [
  { role: "Forward Deployed Accountant", tag: "Pod lead", body: "Domain expert who engages enterprise clients, understands their processes, builds the skill and writes its constitution. A peer to controllers and CFOs." },
  { role: "Solutions Engineer", tag: "Integrations", body: "Platform integrations, data and APIs. Connects the client’s data so agents have what they need." },
];
export const POD_LINE = "One pod per client.";

// docs/governance.md #actors. The builder is the pod (Forward Deployed Accountant + Solutions Engineer).
export const actors = [
  { key: "A", name: "Subject expert", who: "Client or consultant", body: "Defines the workflow, rules and edge cases." },
  { key: "B", name: "Forward Deployed Accountant", who: "DaVero AI pod", body: "Builds the agent around those requirements, with the Solutions Engineer." },
  { key: "C", name: "Validator", who: "Client or consultant", body: "Checks controls and approves results in the platform." },
  { key: "D", name: "Operator", who: "DaVero AI", body: "Runs the agent, monitors exceptions and coordinates resolution." },
  { key: "E", name: "Owner", who: "DaVero AI", body: "Owns the agent and its ongoing improvement." },
];
export const ACTORS_KEY = "The client defines and approves. DaVero AI owns and runs the agents.";

export const differentiators = [
  { title: "Context captured", body: "Every engagement turns client-specific rules and exceptions into agents we own.", quote: { text: "context is the moat.", by: "Nick Kopp, CEO, Rillet" } },
  { title: "Platform-native", body: "Built only on AI-native platforms (ERP, CRM, procurement, etc.), working alongside the platform, not a rival integrator." },
  { title: "Human-validated", body: "Every change client-approved; controls stay with the client and auditor. Answers the 14% trust gap (Wakefield Research, Feb 2026)." },
  { title: "Compounding library", body: "Each deployment is harvested. More agents mean faster deployments." },
];

export const LIBRARY_LINE = "Every engagement adds to the library, so the next client starts further ahead.";

export const closingQuotes = [
  { text: "The next $1T company sells the work, not the tool.", by: "Sequoia" },
  { text: "Reasoning without context is guessing with confidence.", by: "Goldberg" },
  { text: "Context is the moat.", by: "Nick Kopp, CEO, Rillet" },
];

export const WEDGE =
  "Mid-market and enterprise companies moving onto AI-native platforms (ERP, CRM, procurement, etc.), where the last mile is new, unowned and budgeted.";
