// v4 function pages: copy extracted verbatim from docs/source/design-v4.html (pages page-finance-accounting,
// page-supply-chain, page-procurement, page-security-governance, page-insurance). Only copy that differs from
// page-index lives here; everything else is shared with the home page. Section map: docs/v4-map.md.
// The mock's [bracketed] placeholders (unsourced stats, unconfirmed platform names) are left out; `tbd` "" renders nothing.

export type FunctionSlug =
  | "finance-accounting"
  | "supply-chain"
  | "procurement"
  | "security-governance"
  | "insurance";

/** Section ids in render order. Ids match the mock's anchor ids; "hero" and "explore" have none in the mock. */
export type FunctionSectionId =
  | "hero"
  | "platforms"
  | "problem"
  | "why-now"
  | "workflows"
  | "agents-at-work"
  | "how"
  | "controls"
  | "pricing"
  | "about"
  | "explore"
  | "estimate"
  | "assessment";

/** Inline text with the mock's <strong>/<em> runs kept as segments (no HTML strings). */
export type RichText = (string | { strong: string } | { em: string })[];

export type FlowStep = { kind: "agent" | "owner" | "sys"; title: string; text: string; who: string };
export type Stat = { value: string; text: string; source: string; accent?: true; placeholder?: true };
export type FeedEvent = {
  time: string;
  title: string;
  detail: string;
  status: "wait" | "done" | "run";
  label: string;
};

export type FunctionPage = {
  slug: FunctionSlug;
  href: `/${FunctionSlug}`;
  navLabel: string;
  metadata: { title: string; description: string };
  sections: readonly FunctionSectionId[];
  hero: {
    /** Breadcrumb tail after "Home /" (same as navLabel). */
    crumb: string;
    eyebrow: string;
    /** Second h1 line, orange; the first line is FUNCTION_SHARED.heroTitle. */
    titleAccent: string;
    lede: string;
    flow: { title: string; subtitle: string; steps: FlowStep[] };
    /** Logo strip under the hero. `names` are platform names in text, `tbd` the trailing muted label. */
    strip: { label: string; names: string[]; tbd: string };
  };
  platforms: { lede: string; existing: string[]; outcomes: string[] };
  problem: {
    title: string;
    lede: RichText;
    /** Body text of zones 1-3; zone tags and titles are shared with page-index. */
    zoneTexts: [string, string, string];
    /** Four-mile test. Hint, result title and result copy are shared with page-index. */
    test: { title: string; gates: { title: string; text: string; chip: string }[] };
  };
  whyNow: { title: string; stats: Stat[] };
  workflows: {
    title: string;
    lede: string;
    /** `icon` is the inner markup of a 24x24 stroke icon (stroke="#FF6500", width 2, round caps/joins). */
    cards: { icon: string; title: string; text: string; items: string[] }[];
  };
  agentsAtWork: { feedLabel: string; events: FeedEvent[] };
  how: {
    lede: string;
    /** Step kickers and titles are shared with page-index; only the body differs. */
    stepTexts: [string, string, string];
    expand: string;
  };
  /** First of the four controls cards; cards 2-4 are shared with page-index. */
  controls: { firstCard: { title: string; text: string } };
  /** Body of the third ("Managed outcome") pricing card. */
  pricing: { outcomeText: string };
  explore: { cards: { slug: FunctionSlug; icon: string; title: string; text: string }[] };
  estimate: { peopleHint: string };
  assessment: { title: string; deliverables: string[] };
};

/** Copy identical on all five function pages but absent from (or different on) page-index. */
export const FUNCTION_SHARED = {
  heroTitle: "Own the last mile",
  workflowsEyebrow: "Workflows we own",
  agentsAtWork: {
    eyebrow: "Agents at work",
    title: "See the last mile running",
    heading: "Human in the loop, always.",
    lede: "Every action is logged, every result waits for sign-off, and nothing posts without approval.",
    kpis: [
      {
        value: "100%",
        label: "of agent actions logged"
      },
      {
        value: "Every",
        label: "result approved"
      },
      {
        value: "0",
        label: "posted without sign-off"
      }
    ],
    foot: "Sample activity for illustration. Not client data.",
    visible: 5,
    intervalMs: 2600
  },
  explore: {
    eyebrow: "Explore other areas",
    title: "The same model, across the enterprise",
    more: "Explore →"
  }
} as const;

const ORDER = ["hero", "platforms", "problem", "why-now", "workflows", "agents-at-work", "how", "controls", "pricing", "about", "explore", "estimate", "assessment"] as const satisfies readonly FunctionSectionId[];

export const FUNCTION_PAGES: FunctionPage[] = [
  {
    slug: "finance-accounting",
    href: "/finance-accounting",
    navLabel: "Finance & Accounting",
    metadata: {
      title: "Finance & Accounting | DaVero AI",
      description: "AI agents that extend the ERP into company-specific close work, from intercompany eliminations to reconciliations, approved by the controller."
    },
    sections: ORDER,
    hero: {
      crumb: "Finance & Accounting",
      eyebrow: "Finance & Accounting",
      titleAccent: "of the financial close.",
      lede: "AI agents that extend the ERP into company-specific closing and audit work, from intercompany eliminations to revenue edge cases and entity reconciliations. Every result is approved by the controller.",
      flow: {
        title: "Month-end close · Illustrative",
        subtitle: "Entity reconciliation",
        steps: [
          {
            kind: "agent",
            title: "Prepare",
            text: "Agent matches entries, flags exceptions",
            who: "AGENT"
          },
          {
            kind: "owner",
            title: "Review & Validate",
            text: "Controller reviews the exceptions",
            who: "CONTROLLER"
          },
          {
            kind: "owner",
            title: "Approve",
            text: "Sign-off stays with the controller",
            who: "CONTROLLER"
          },
          {
            kind: "sys",
            title: "Record",
            text: "Posted in the ERP with a full audit trail",
            who: "ERP"
          }
        ]
      },
      strip: {
        label: "Built for AI-native platforms",
        names: [
          "Rillet",
          "Tabs"
        ],
        tbd: "More coming soon +"
      }
    },
    platforms: {
      lede: "DaVero AI orchestrates agents around existing ERP, billing and finance systems, so platform investments deliver a higher return and AI moves from pilot to business results faster.",
      existing: [
        "AI-native ERP",
        "Billing and revenue",
        "Bank and card feeds",
        "Expense and AP tools"
      ],
      outcomes: [
        "Faster close",
        "Fewer reconciliation breaks",
        "Audit-ready books",
        "Cash collected sooner"
      ]
    },
    problem: {
      title: "The ERP is live. The close still runs on spreadsheets.",
      lede: [
        "The ",
        {
          strong: "last mile"
        },
        " is everything between ",
        {
          em: "“the ERP is live”"
        },
        " and ",
        {
          em: "“the books are closed”"
        },
        ": the client-specific workflows unique to each company's close. That's where close delays and audit findings come from."
      ],
      zoneTexts: [
        "Matches a native ERP feature.",
        "Covered after process standardization.",
        "Company-specific work beyond standard configuration, run today on spreadsheets, consultants or other tools."
      ],
      test: {
        title: "Is it a last-mile finance workflow? Take the four-mile test.",
        gates: [
          {
            title: "Needed for the outcome",
            text: "The close, cash or compliance depends on it.",
            chip: "Business-critical"
          },
          {
            title: "Beyond standard configuration",
            text: "Not native to the ERP, or only after a process change.",
            chip: "Beyond standard setup"
          },
          {
            title: "Business-specific",
            text: "Shaped by company rules, entities or industry.",
            chip: "Unique to the company"
          },
          {
            title: "Done by hand today",
            text: "Run on spreadsheets, email and disparate tools.",
            chip: "Manual effort"
          }
        ]
      }
    },
    whyNow: {
      title: "Finance teams are stretched, and AI alone isn't closing the gap",
      stats: [
        {
          value: "61%",
          text: "of finance leaders report accounting talent shortages",
          source: "Controllers Council, 2026"
        },
        {
          value: "340K",
          text: "US accountants lost over five years",
          source: "Sequoia Capital, Mar 2026"
        },
        {
          value: "12%",
          text: "of finance teams run AI in core processes",
          source: "insightsoftware, 2026 (311 leaders)"
        },
        {
          value: "14%",
          text: "of mid-market CFOs fully trust AI with accounting data",
          source: "Wakefield Research, Feb 2026 (100 CFOs)",
          accent: true
        }
      ]
    },
    workflows: {
      title: "Finance workflows, run by agents",
      lede: "We start with the workflows that hold up the close and expand from there.",
      cards: [
        {
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Close & reconciliation",
          text: "Get to a clean, audit-ready close faster.",
          items: [
            "Intercompany eliminations",
            "Entity reconciliations",
            "Accruals",
            "Flux analysis",
            "Audit prep"
          ]
        },
        {
          icon: "<path d=\"M3 17l6-6 4 4 8-8M14 7h7v7\"></path>",
          title: "Revenue & collections",
          text: "Bill correctly and collect sooner.",
          items: [
            "Revenue-recognition edge cases",
            "Billing exceptions",
            "AR application",
            "Collections workflow"
          ]
        },
        {
          icon: "<path d=\"M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6\"></path>",
          title: "Expansion areas",
          text: "Where clients typically go next.",
          items: [
            "AP and accruals",
            "Treasury",
            "FP&A reporting packs",
            "Revenue operations"
          ]
        }
      ]
    },
    agentsAtWork: {
      feedLabel: "MONTH-END CLOSE · ILLUSTRATIVE",
      events: [
        {
          time: "09:02",
          title: "Bank reconciliation",
          detail: "1,248 lines matched, 6 exceptions flagged",
          status: "wait",
          label: "AWAITING CONTROLLER"
        },
        {
          time: "09:05",
          title: "Intercompany elimination",
          detail: "Entity US-02 ↔ UK-01 balanced",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:11",
          title: "Accrual review",
          detail: "14 accruals proposed from open POs",
          status: "wait",
          label: "AWAITING CONTROLLER"
        },
        {
          time: "09:14",
          title: "Revenue recognition",
          detail: "3 contract modifications re-allocated",
          status: "run",
          label: "IN PROGRESS"
        },
        {
          time: "09:20",
          title: "Flux analysis",
          detail: "Variance commentary drafted for 9 accounts",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:26",
          title: "Collections",
          detail: "22 cash receipts applied to open invoices",
          status: "done",
          label: "APPROVED"
        }
      ]
    },
    how: {
      lede: "Every engagement is led by a Forward Deployed Accountant, a domain expert who works alongside finance and accounting leaders from day one.",
      stepTexts: [
        "A Forward Deployed Accountant embeds with the finance team in the last weeks of ERP implementation, maps the close and identifies which workflows agents can take over.",
        "We turn each workflow into an agent skill, harden it with rules, controls and edge cases, and business owners validate it before go-live.",
        "We run, monitor and tune the agents every month."
      ],
      expand: "Then we expand: AP, treasury, FP&A, revenue ops, the next entity. Advisory and assurance roles remain with existing advisors and auditors."
    },
    controls: {
      firstCard: {
        title: "Control ownership stays with management",
        text: "Management and external auditors retain control ownership."
      }
    },
    pricing: {
      outcomeText: "Close-as-a-service priced on results: days to close, reconciliations cleared."
    },
    explore: {
      cards: [
        {
          slug: "supply-chain",
          icon: "<path d=\"M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"></path>",
          title: "Supply Chain",
          text: "Inventory, fulfilment, logistics and landed cost."
        },
        {
          slug: "procurement",
          icon: "<path d=\"M3 7h18v13H3zM8 7V4h8v3\"></path>",
          title: "Procurement",
          text: "Supplier onboarding, requisition-to-PO and match exceptions."
        },
        {
          slug: "security-governance",
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Security & Governance",
          text: "Access reviews, compliance controls and audit evidence."
        },
        {
          slug: "insurance",
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Insurance",
          text: "Claims exceptions, bordereaux reconciliation and premium accruals."
        }
      ]
    },
    estimate: {
      peopleHint: "Finance and accounting staff"
    },
    assessment: {
      title: "How much of the close still runs by hand?",
      deliverables: [
        "A map of last-mile finance workflows",
        "The two or three best first candidates for agents",
        "A rough timeline and engagement shape"
      ]
    }
  },
  {
    slug: "supply-chain",
    href: "/supply-chain",
    navLabel: "Supply Chain",
    metadata: {
      title: "Supply Chain | DaVero AI",
      description: "AI agents that extend ERP, WMS and planning platforms into supply chain exceptions, from stock reconciliation to landed-cost accruals, with human approval."
    },
    sections: ORDER,
    hero: {
      crumb: "Supply Chain",
      eyebrow: "Supply Chain",
      titleAccent: "of the supply chain.",
      lede: "AI agents that extend ERP, WMS and planning platforms into exception-heavy supply chain work, from stock reconciliation to landed-cost accruals. Every result is approved by operations and finance owners.",
      flow: {
        title: "Inbound receipt · Illustrative",
        subtitle: "Landed-cost accrual",
        steps: [
          {
            kind: "agent",
            title: "Prepare",
            text: "Agent allocates freight, duty and broker charges to receipts",
            who: "AGENT"
          },
          {
            kind: "owner",
            title: "Review & Validate",
            text: "Supply chain controller reviews variances",
            who: "OPS CONTROLLER"
          },
          {
            kind: "owner",
            title: "Approve",
            text: "Sign-off stays with the ops controller",
            who: "OPS CONTROLLER"
          },
          {
            kind: "sys",
            title: "Record",
            text: "Inventory value updated in the ERP, with audit trail",
            who: "ERP"
          }
        ]
      },
      strip: {
        label: "Built around existing ERP, WMS and TMS",
        names: [],
        tbd: ""
      }
    },
    platforms: {
      lede: "DaVero AI orchestrates agents around existing ERP, warehouse and transportation systems, so platform investments deliver a higher return and AI moves from pilot to business results faster.",
      existing: [
        "ERP",
        "WMS",
        "TMS",
        "Carrier and supplier portals"
      ],
      outcomes: [
        "Accurate inventory",
        "Fewer fulfilment exceptions",
        "Correct landed cost",
        "Faster month-end accruals"
      ]
    },
    problem: {
      title: "The systems are live. Exceptions still run on spreadsheets and email.",
      lede: [
        "Between the warehouse, the carrier, the supplier and the ledger sits a layer of work no single platform owns: mismatched receipts, stranded inventory, unallocated freight. Planners and analysts patch it by hand every week."
      ],
      zoneTexts: [
        "Standard receiving, picking and costing.",
        "Covered once the process conforms to the system.",
        "Exceptions across warehouse, carrier, supplier and ledger, handled in spreadsheets, email and portals."
      ],
      test: {
        title: "Is it a last-mile supply chain workflow? Take the four-mile test.",
        gates: [
          {
            title: "Needed for the outcome",
            text: "Shipped orders, accurate inventory and correct costs depend on it.",
            chip: "Operations-critical"
          },
          {
            title: "Beyond standard configuration",
            text: "Not native to the platform, or only after re-engineering the process.",
            chip: "Beyond standard setup"
          },
          {
            title: "Network-specific",
            text: "Shaped by SKUs, sites, carriers and trading partners.",
            chip: "Unique to the network"
          },
          {
            title: "Done by hand today",
            text: "Run across ERP, WMS, carrier portals and spreadsheets.",
            chip: "Manual effort"
          }
        ]
      }
    },
    whyNow: {
      title: "Supply chain teams are stretched, and AI alone isn't closing the gap",
      stats: [
        {
          value: "40%+",
          text: "of agentic AI projects will be scrapped by end-2027",
          source: "Gartner via Reuters, Jun 2025",
          accent: true
        }
      ]
    },
    workflows: {
      title: "Supply chain workflows, run by agents",
      lede: "We start where exceptions pile up and inventory or cost accuracy suffers, then expand site by site.",
      cards: [
        {
          icon: "<path d=\"M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8\"></path>",
          title: "Inventory & warehouse",
          text: "Keep what the system says in line with what's on the shelf.",
          items: [
            "Item master clean-up and sync",
            "Stock movement reconciliation",
            "Cycle-count variance investigation",
            "Inventory valuation true-ups"
          ]
        },
        {
          icon: "<path d=\"M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"></path>",
          title: "Order fulfilment & logistics",
          text: "Ship complete and on time, with fewer manual touches.",
          items: [
            "Order fulfilment exceptions: backorders, splits, substitutions",
            "ASN vs. receipt mismatches",
            "Carrier freight invoice audit",
            "Returns and RMA processing"
          ]
        },
        {
          icon: "<path d=\"M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6\"></path>",
          title: "Landed cost & inventory accounting",
          text: "Get product cost right before it reaches the P&L.",
          items: [
            "Landed-cost accruals: freight, duty, brokerage",
            "Received-not-invoiced reconciliation",
            "Intercompany inventory transfers",
            "COGS and inventory valuation support"
          ]
        }
      ]
    },
    agentsAtWork: {
      feedLabel: "WAREHOUSE & LOGISTICS · ILLUSTRATIVE",
      events: [
        {
          time: "08:41",
          title: "Cycle-count variance",
          detail: "Bin A-14: 12 units short, traced to a mis-pick",
          status: "wait",
          label: "AWAITING OPS CONTROLLER"
        },
        {
          time: "08:47",
          title: "ASN vs. receipt",
          detail: "PO 4471: 3 line mismatches resolved, 1 flagged",
          status: "wait",
          label: "AWAITING OPS CONTROLLER"
        },
        {
          time: "08:52",
          title: "Landed-cost accrual",
          detail: "Freight and duty allocated to 38 receipts",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:03",
          title: "Order fulfilment",
          detail: "17 backorders re-promised with new ship dates",
          status: "run",
          label: "IN PROGRESS"
        },
        {
          time: "09:10",
          title: "Carrier invoice audit",
          detail: "2 freight overcharges flagged for dispute",
          status: "wait",
          label: "AWAITING OPS CONTROLLER"
        },
        {
          time: "09:18",
          title: "Stock movement reconciliation",
          detail: "DC-East WMS and ERP balanced",
          status: "done",
          label: "APPROVED"
        }
      ]
    },
    how: {
      lede: "Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside supply chain and operations leaders from day one.",
      stepTexts: [
        "A Forward Deployed Consultant walks the inbound, warehouse and outbound flows with operations leaders and identifies the exceptions agents can take over.",
        "We turn each workflow into an agent skill, harden it with company tolerances, routing rules and edge cases, and business owners validate it before go-live.",
        "We run, monitor and tune the agents as volumes, sites and partners change."
      ],
      expand: "Then we expand: the next site, the next entity, the next trading partner. Existing 3PL, carrier and audit relationships remain unchanged."
    },
    controls: {
      firstCard: {
        title: "Management-set tolerances",
        text: "Agents work inside approved limits and variance thresholds."
      }
    },
    pricing: {
      outcomeText: "Priced on results, such as exceptions cleared, inventory accuracy, or accruals reconciled on time."
    },
    explore: {
      cards: [
        {
          slug: "finance-accounting",
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Finance & Accounting",
          text: "Close, reconciliations, revenue and collections."
        },
        {
          slug: "procurement",
          icon: "<path d=\"M3 7h18v13H3zM8 7V4h8v3\"></path>",
          title: "Procurement",
          text: "Supplier onboarding, requisition-to-PO and match exceptions."
        },
        {
          slug: "security-governance",
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Security & Governance",
          text: "Access reviews, compliance controls and audit evidence."
        },
        {
          slug: "insurance",
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Insurance",
          text: "Claims exceptions, bordereaux reconciliation and premium accruals."
        }
      ]
    },
    estimate: {
      peopleHint: "Supply chain and operations staff"
    },
    assessment: {
      title: "What are supply chain exceptions costing the business?",
      deliverables: [
        "A map of last-mile supply chain workflows",
        "The two or three best first candidates for agents",
        "A rough timeline and engagement shape"
      ]
    }
  },
  {
    slug: "procurement",
    href: "/procurement",
    navLabel: "Procurement",
    metadata: {
      title: "Procurement | DaVero AI",
      description: "AI agents that extend sourcing and ERP platforms across procure-to-pay, from supplier onboarding to three-way-match exceptions, approved by AP leads."
    },
    sections: ORDER,
    hero: {
      crumb: "Procurement",
      eyebrow: "Procurement",
      titleAccent: "of procure-to-pay.",
      lede: "AI agents that extend sourcing and ERP platforms across procure-to-pay, from supplier onboarding to three-way-match exceptions. Every result is approved by procurement and AP leads.",
      flow: {
        title: "Invoice received · Illustrative",
        subtitle: "Three-way match exception",
        steps: [
          {
            kind: "agent",
            title: "Prepare",
            text: "Agent compares PO, receipt and invoice and drafts a resolution",
            who: "AGENT"
          },
          {
            kind: "owner",
            title: "Review & Validate",
            text: "Buyer or AP lead reviews the variance",
            who: "BUYER / AP"
          },
          {
            kind: "owner",
            title: "Approve",
            text: "Approved within delegated authority limits",
            who: "BUYER / AP"
          },
          {
            kind: "sys",
            title: "Record",
            text: "Invoice released in the ERP, with audit trail",
            who: "ERP"
          }
        ]
      },
      strip: {
        label: "Built around existing procurement suites and ERP",
        names: [],
        tbd: ""
      }
    },
    platforms: {
      lede: "DaVero AI orchestrates agents around existing procurement and ERP systems, so platform investments deliver a higher return and AI moves from pilot to business results faster.",
      existing: [
        "Procurement suite",
        "ERP",
        "Supplier portals",
        "AP and invoice capture tools"
      ],
      outcomes: [
        "Faster supplier onboarding",
        "Fewer match exceptions",
        "Spend under policy",
        "Suppliers paid right"
      ]
    },
    problem: {
      title: "The procurement suite is live. Exceptions still run on email.",
      lede: [
        "Every company's approval matrices, supplier records and match rules are unique, so standard configuration only goes so far. The remaining work falls to buyers chasing approvals, AP chasing receipts and suppliers chasing payment."
      ],
      zoneTexts: [
        "Standard requisitions, POs and catalog buying.",
        "Covered once company policy fits the standard workflow.",
        "Exceptions, onboarding and policy checks handled through email, spreadsheets and supplier portals."
      ],
      test: {
        title: "Is it a last-mile procurement workflow? Take the four-mile test.",
        gates: [
          {
            title: "Needed for the outcome",
            text: "Paying suppliers right and controlling spend depend on it.",
            chip: "Business-critical"
          },
          {
            title: "Beyond standard configuration",
            text: "Not native to the platform, or only after a policy change.",
            chip: "Beyond standard setup"
          },
          {
            title: "Business-specific",
            text: "Shaped by the company approval matrix, contracts and supplier base.",
            chip: "Unique to the company"
          },
          {
            title: "Done by hand today",
            text: "Run across email, portals and spreadsheets.",
            chip: "Manual effort"
          }
        ]
      }
    },
    whyNow: {
      title: "Procurement teams are stretched, and AI alone isn't closing the gap",
      stats: [
        {
          value: "40%+",
          text: "of agentic AI projects will be scrapped by end-2027",
          source: "Gartner via Reuters, Jun 2025",
          accent: true
        }
      ]
    },
    workflows: {
      title: "Procurement workflows, run by agents",
      lede: "We start where requests stall and exceptions pile up, then expand across categories and entities.",
      cards: [
        {
          icon: "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8\"></path>",
          title: "Supplier management",
          text: "Get suppliers ready to transact, safely.",
          items: [
            "Supplier onboarding and vendor readiness",
            "Vendor master data validation",
            "Bank-detail change verification",
            "Supplier compliance document tracking"
          ]
        },
        {
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Requisition to PO",
          text: "Turn requests into compliant POs faster.",
          items: [
            "Purchase requisition intake and routing",
            "Approvals and controls against the approval policy matrix",
            "PO creation from approved requests",
            "Contract and price compliance checks"
          ]
        },
        {
          icon: "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6\"></path>",
          title: "Invoice & match exceptions",
          text: "Pay the right amount, on time, once.",
          items: [
            "PO-receipt-invoice (three-way match) exceptions",
            "Vendor bill capture",
            "Duplicate invoice detection",
            "Received-not-invoiced accruals"
          ]
        }
      ]
    },
    agentsAtWork: {
      feedLabel: "PROCURE-TO-PAY · ILLUSTRATIVE",
      events: [
        {
          time: "08:35",
          title: "Supplier onboarding",
          detail: "4 vendor packets validated, tax IDs verified",
          status: "wait",
          label: "AWAITING BUYER"
        },
        {
          time: "08:44",
          title: "Three-way match",
          detail: "212 invoices matched, 9 exceptions routed",
          status: "wait",
          label: "AWAITING AP LEAD"
        },
        {
          time: "08:51",
          title: "Requisition routing",
          detail: "15 requests routed against the approval matrix",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:02",
          title: "Duplicate invoice check",
          detail: "1 potential duplicate held for review",
          status: "wait",
          label: "AWAITING AP LEAD"
        },
        {
          time: "09:09",
          title: "Bank-detail change",
          detail: "Request held for human verification",
          status: "wait",
          label: "AWAITING AP LEAD"
        },
        {
          time: "09:15",
          title: "PO creation",
          detail: "11 POs drafted from approved requests",
          status: "run",
          label: "IN PROGRESS"
        }
      ]
    },
    how: {
      lede: "Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside procurement and AP leaders from day one.",
      stepTexts: [
        "A Forward Deployed Consultant maps the procure-to-pay flow, approval matrix and exception queues with procurement and AP leads.",
        "We turn each workflow into an agent skill, harden it with company policies, authority limits and edge cases, and business owners validate it before go-live.",
        "We run, monitor and tune the agents as suppliers, categories and policies change."
      ],
      expand: "Then we expand: new categories, new entities, new supplier segments. Procurement, AP and audit responsibilities remain unchanged."
    },
    controls: {
      firstCard: {
        title: "Segregation of duties kept",
        text: "No agent approves its own output, and vendor bank details never change without human review."
      }
    },
    pricing: {
      outcomeText: "Priced on results, such as suppliers onboarded, exceptions cleared or invoices matched."
    },
    explore: {
      cards: [
        {
          slug: "finance-accounting",
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Finance & Accounting",
          text: "Close, reconciliations, revenue and collections."
        },
        {
          slug: "supply-chain",
          icon: "<path d=\"M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"></path>",
          title: "Supply Chain",
          text: "Inventory, fulfilment, logistics and landed cost."
        },
        {
          slug: "security-governance",
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Security & Governance",
          text: "Access reviews, compliance controls and audit evidence."
        },
        {
          slug: "insurance",
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Insurance",
          text: "Claims exceptions, bordereaux reconciliation and premium accruals."
        }
      ]
    },
    estimate: {
      peopleHint: "Procurement and AP staff"
    },
    assessment: {
      title: "Where is procure-to-pay still waiting on someone's inbox?",
      deliverables: [
        "A map of last-mile procurement workflows",
        "The two or three best first candidates for agents",
        "A rough timeline and engagement shape"
      ]
    }
  },
  {
    slug: "security-governance",
    href: "/security-governance",
    navLabel: "Security & Governance",
    metadata: {
      title: "Security & Governance | DaVero AI",
      description: "AI agents that keep access certifications, policy exceptions and audit evidence current, so security and compliance teams chase less and decide more."
    },
    sections: ORDER,
    hero: {
      crumb: "Security & Governance",
      eyebrow: "Security & Governance",
      titleAccent: "of risk & controls.",
      lede: "AI agents that keep access certifications, policy exceptions and audit evidence current, so security and compliance teams spend less time chasing and more time on decisions.",
      flow: {
        title: "Access review triggered · Illustrative",
        subtitle: "Certification exception",
        steps: [
          {
            kind: "agent",
            title: "Prepare",
            text: "Agent compiles entitlement data, flags anomalies and drafts a resolution",
            who: "AGENT"
          },
          {
            kind: "owner",
            title: "Review & Validate",
            text: "Security or compliance lead reviews the exception",
            who: "SECURITY / COMPLIANCE"
          },
          {
            kind: "owner",
            title: "Approve",
            text: "Approved within delegated authority limits",
            who: "SECURITY / COMPLIANCE"
          },
          {
            kind: "sys",
            title: "Record",
            text: "Decision logged in the GRC platform with a full audit trail",
            who: "GRC / IAM"
          }
        ]
      },
      strip: {
        label: "Built around existing GRC, IAM and ITSM platforms",
        names: [],
        tbd: ""
      }
    },
    platforms: {
      lede: "DaVero AI orchestrates agents around existing GRC, IAM and ITSM systems, so platform investments deliver a higher return and AI moves from pilot to business results faster.",
      existing: [
        "GRC platform",
        "Identity and access management (IAM)",
        "ITSM",
        "SIEM",
        "HR and ERP systems"
      ],
      outcomes: [
        "Faster access certification cycles",
        "Fewer open policy exceptions",
        "Audit-ready evidence packs",
        "Less manual chasing for compliance"
      ]
    },
    problem: {
      title: "The GRC platform is live. Certification cycles still run on spreadsheets.",
      lede: [
        "Every organization's access policies, approval hierarchies and risk tolerances are unique, so standard GRC configuration only goes so far. The remaining work falls to security analysts chasing reviewers, compliance teams compiling evidence and risk managers tracking exceptions through email."
      ],
      zoneTexts: [
        "Standard policy templates, risk registers and certification workflows.",
        "Covered once the process conforms to the tool's data model.",
        "Exception follow-up, evidence collection and cross-system access comparisons done through email and spreadsheets."
      ],
      test: {
        title: "Is it a last-mile security workflow? Take the four-mile test.",
        gates: [
          {
            title: "Needed for the outcome",
            text: "Audit readiness and access integrity depend on it.",
            chip: "Compliance-critical"
          },
          {
            title: "Beyond standard configuration",
            text: "Not native to the platform, or only after a process redesign.",
            chip: "Beyond standard setup"
          },
          {
            title: "Organization-specific",
            text: "Shaped by the company's access model, risk appetite and regulatory obligations.",
            chip: "Unique to the organization"
          },
          {
            title: "Done by hand today",
            text: "Run across GRC, IAM, ITSM and spreadsheets.",
            chip: "Manual effort"
          }
        ]
      }
    },
    whyNow: {
      title: "Security and compliance teams are stretched, and AI alone isn't closing the gap",
      stats: [
        {
          value: "40%+",
          text: "of agentic AI projects will be scrapped by end-2027",
          source: "Gartner via Reuters, Jun 2025",
          accent: true
        }
      ]
    },
    workflows: {
      title: "Security and governance workflows, run by agents",
      lede: "We start where certification cycles stall and evidence requests pile up, then expand across access domains and compliance frameworks.",
      cards: [
        {
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Access reviews & certification",
          text: "Keep entitlements accurate and certifications on time.",
          items: [
            "User access review and certification campaigns",
            "Privileged account and service-account reviews",
            "Role and entitlement anomaly flagging",
            "Joiners, movers and leavers access reconciliation"
          ]
        },
        {
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Policy & compliance management",
          text: "Track exceptions and obligations without chasing.",
          items: [
            "Policy exception intake and approval routing",
            "Compliance control testing and evidence collection",
            "Regulatory change impact triage",
            "Third-party and vendor risk document tracking"
          ]
        },
        {
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Audit & risk reporting",
          text: "Produce evidence packs and risk reports without heroics.",
          items: [
            "Audit evidence compilation across GRC and source systems",
            "Control deficiency tracking and remediation follow-up",
            "Risk register updates and owner notifications",
            "Board and committee reporting pack preparation"
          ]
        }
      ]
    },
    agentsAtWork: {
      feedLabel: "ACCESS CERTIFICATION & COMPLIANCE · ILLUSTRATIVE",
      events: [
        {
          time: "08:30",
          title: "Access certification campaign",
          detail: "340 entitlements reviewed, 18 anomalies flagged",
          status: "wait",
          label: "AWAITING SECURITY LEAD"
        },
        {
          time: "08:38",
          title: "Privileged account review",
          detail: "6 standing admin rights flagged for removal",
          status: "wait",
          label: "AWAITING SECURITY LEAD"
        },
        {
          time: "08:45",
          title: "Policy exception intake",
          detail: "4 exception requests routed with risk assessments",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "08:54",
          title: "Audit evidence collection",
          detail: "Controls evidence compiled across GRC and IAM",
          status: "run",
          label: "IN PROGRESS"
        },
        {
          time: "09:06",
          title: "Joiner / mover / leaver reconciliation",
          detail: "11 access changes validated against HR",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:14",
          title: "Control deficiency follow-up",
          detail: "3 open findings updated with remediation status",
          status: "wait",
          label: "AWAITING COMPLIANCE LEAD"
        }
      ]
    },
    how: {
      lede: "Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside security, compliance and risk leaders from day one.",
      stepTexts: [
        "A Forward Deployed Consultant maps the access certification, policy exception and audit evidence workflows with security, compliance and risk leads.",
        "We turn each workflow into an agent skill, harden it with the organization's access policies, risk tolerances and regulatory obligations, and business owners validate it before go-live.",
        "We run, monitor and tune the agents as access models, policies and frameworks evolve."
      ],
      expand: "Then we expand: the next access domain, the next compliance framework, the next risk category. Security, compliance and audit responsibilities remain unchanged."
    },
    controls: {
      firstCard: {
        title: "Segregation of duties kept",
        text: "No agent approves its own access decisions, and high-risk entitlement changes always require human review."
      }
    },
    pricing: {
      outcomeText: "Priced on results, such as certifications completed, exceptions closed or audit evidence packs delivered."
    },
    explore: {
      cards: [
        {
          slug: "finance-accounting",
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Finance & Accounting",
          text: "Close, reconciliations, revenue and collections."
        },
        {
          slug: "supply-chain",
          icon: "<path d=\"M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"></path>",
          title: "Supply Chain",
          text: "Inventory, fulfilment, logistics and landed cost."
        },
        {
          slug: "procurement",
          icon: "<path d=\"M3 7h18v13H3zM8 7V4h8v3\"></path>",
          title: "Procurement",
          text: "Supplier onboarding, requisition-to-PO and match exceptions."
        },
        {
          slug: "insurance",
          icon: "<path d=\"M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6\"></path>",
          title: "Insurance",
          text: "Claims exceptions, bordereaux reconciliation and premium accruals."
        }
      ]
    },
    estimate: {
      peopleHint: "Security, compliance and risk staff"
    },
    assessment: {
      title: "Where are access reviews and compliance cycles still running on email?",
      deliverables: [
        "A map of last-mile security and governance workflows",
        "The two or three best first candidates for agents",
        "A rough timeline and engagement shape"
      ]
    }
  },
  {
    slug: "insurance",
    href: "/insurance",
    navLabel: "Insurance",
    metadata: {
      title: "Insurance | DaVero AI",
      description: "AI agents that extend core insurance platforms across claims triage, bordereaux reconciliation and premium accruals, approved by operations and finance."
    },
    sections: ORDER,
    hero: {
      crumb: "Insurance",
      eyebrow: "Insurance",
      titleAccent: "of claims processing.",
      lede: "AI agents that extend core insurance platforms across claims triage, bordereaux reconciliation and premium accruals. Every result is approved by operations and finance leads.",
      flow: {
        title: "Claim received · Illustrative",
        subtitle: "Coverage exception",
        steps: [
          {
            kind: "agent",
            title: "Prepare",
            text: "Agent reviews claim data, flags coverage anomalies and drafts a resolution",
            who: "AGENT"
          },
          {
            kind: "owner",
            title: "Review & Validate",
            text: "Claims handler reviews the exception and coverage determination",
            who: "CLAIMS / FINANCE"
          },
          {
            kind: "owner",
            title: "Approve",
            text: "Approved within delegated authority limits",
            who: "CLAIMS / FINANCE"
          },
          {
            kind: "sys",
            title: "Record",
            text: "Decision logged in the policy admin system with a full audit trail",
            who: "POLICY ADMIN / ERP"
          }
        ]
      },
      strip: {
        label: "Built around existing policy admin, claims and finance platforms",
        names: [],
        tbd: ""
      }
    },
    platforms: {
      lede: "DaVero AI orchestrates agents around existing policy admin, claims and finance systems, so platform investments deliver a higher return and AI moves from pilot to business results faster.",
      existing: [
        "Policy administration system",
        "Claims management platform",
        "Bordereaux and MGA tools",
        "Finance and ERP",
        "Reinsurance systems"
      ],
      outcomes: [
        "Faster claims exception resolution",
        "Accurate bordereaux reconciliation",
        "Premium and commission accruals on time",
        "Fewer manual touches per claim"
      ]
    },
    problem: {
      title: "The policy admin system is live. Exceptions still run on email and spreadsheets.",
      lede: [
        "Every carrier's coverage rules, authority limits and bordereaux formats are unique, so standard platform configuration only goes so far. The remaining work falls to claims handlers chasing approvals, finance teams reconciling bordereaux by hand and actuarial staff patching premium accruals outside the system."
      ],
      zoneTexts: [
        "Standard policy issuance, claims intake and premium billing.",
        "Covered once the process conforms to the carrier's standard workflow.",
        "Coverage exceptions, bordereaux mismatches and accrual adjustments handled through email and spreadsheets."
      ],
      test: {
        title: "Is it a last-mile insurance workflow? Take the four-mile test.",
        gates: [
          {
            title: "Needed for the outcome",
            text: "Claims resolution accuracy and premium integrity depend on it.",
            chip: "Operations-critical"
          },
          {
            title: "Beyond standard configuration",
            text: "Not native to the platform, or only after a process redesign.",
            chip: "Beyond standard setup"
          },
          {
            title: "Carrier-specific",
            text: "Shaped by the carrier's coverage rules, authority matrix and distribution model.",
            chip: "Unique to the carrier"
          },
          {
            title: "Done by hand today",
            text: "Run across policy admin, claims, bordereaux tools and spreadsheets.",
            chip: "Manual effort"
          }
        ]
      }
    },
    whyNow: {
      title: "Insurance operations teams are stretched, and AI alone isn't closing the gap",
      stats: [
        {
          value: "40%+",
          text: "of agentic AI projects will be scrapped by end-2027",
          source: "Gartner via Reuters, Jun 2025",
          accent: true
        }
      ]
    },
    workflows: {
      title: "Insurance workflows, run by agents",
      lede: "We start where claims exceptions pile up and bordereaux cycles slip, then expand across lines and entities.",
      cards: [
        {
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Claims exception triage",
          text: "Resolve coverage exceptions faster without compromising controls.",
          items: [
            "Coverage determination for borderline claims",
            "Claims authority escalation routing",
            "Duplicate and fraud indicator flagging",
            "Reserve adjustment review and documentation"
          ]
        },
        {
          icon: "<path d=\"M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2zM9 8h6M9 12h6\"></path>",
          title: "Bordereaux & reinsurance",
          text: "Keep bordereaux accurate and reinsurance settlements on time.",
          items: [
            "Bordereaux data validation and reconciliation",
            "MGA and coverholder statement processing",
            "Reinsurance bordereau preparation",
            "Premium and loss fund reconciliation"
          ]
        },
        {
          icon: "<path d=\"M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6\"></path>",
          title: "Premium & commission accruals",
          text: "Close the books on time with accurate premium and commission figures.",
          items: [
            "Unearned premium and DAC accruals",
            "Commission statement reconciliation",
            "Premium adjustment and endorsement processing",
            "Finance-to-policy admin reconciliation"
          ]
        }
      ]
    },
    agentsAtWork: {
      feedLabel: "CLAIMS & BORDEREAUX · ILLUSTRATIVE",
      events: [
        {
          time: "08:33",
          title: "Claims triage",
          detail: "47 new claims reviewed, 6 coverage exceptions flagged",
          status: "wait",
          label: "AWAITING CLAIMS HANDLER"
        },
        {
          time: "08:41",
          title: "Coverage exception resolution",
          detail: "Policy terms checked, draft determination prepared",
          status: "wait",
          label: "AWAITING CLAIMS HANDLER"
        },
        {
          time: "08:49",
          title: "Bordereaux reconciliation",
          detail: "MGA submission matched to policy admin, 3 mismatches flagged",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "08:57",
          title: "Premium accrual",
          detail: "28 unearned premium adjustments calculated",
          status: "run",
          label: "IN PROGRESS"
        },
        {
          time: "09:08",
          title: "Reinsurance bordereau",
          detail: "Ceded premiums reconciled to treaty terms",
          status: "done",
          label: "APPROVED"
        },
        {
          time: "09:17",
          title: "Commission calculation",
          detail: "Broker commissions validated against binding authority",
          status: "wait",
          label: "AWAITING FINANCE LEAD"
        }
      ]
    },
    how: {
      lede: "Every engagement is led by a Forward Deployed Consultant, a domain expert who works alongside claims operations and finance leaders from day one.",
      stepTexts: [
        "A Forward Deployed Consultant maps the claims exception, bordereaux and premium accrual workflows with operations and finance leads.",
        "We turn each workflow into an agent skill, harden it with the carrier's coverage rules, authority limits and bordereaux formats, and business owners validate it before go-live.",
        "We run, monitor and tune the agents as products, distribution channels and regulatory requirements change."
      ],
      expand: "Then we expand: the next line of business, the next entity, the next bordereaux format. Claims, underwriting and finance responsibilities remain unchanged."
    },
    controls: {
      firstCard: {
        title: "Segregation of duties kept",
        text: "No agent approves its own claims decisions, and reserve changes always require human review."
      }
    },
    pricing: {
      outcomeText: "Priced on results, such as claims exceptions resolved, bordereaux cycles completed or accruals reconciled on time."
    },
    explore: {
      cards: [
        {
          slug: "finance-accounting",
          icon: "<path d=\"M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01\"></path>",
          title: "Finance & Accounting",
          text: "Close, reconciliations, revenue and collections."
        },
        {
          slug: "supply-chain",
          icon: "<path d=\"M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"></path>",
          title: "Supply Chain",
          text: "Inventory, fulfilment, logistics and landed cost."
        },
        {
          slug: "procurement",
          icon: "<path d=\"M3 7h18v13H3zM8 7V4h8v3\"></path>",
          title: "Procurement",
          text: "Supplier onboarding, requisition-to-PO and match exceptions."
        },
        {
          slug: "security-governance",
          icon: "<path d=\"M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z\"></path>",
          title: "Security & Governance",
          text: "Access reviews, compliance controls and audit evidence."
        }
      ]
    },
    estimate: {
      peopleHint: "Claims, operations and finance staff"
    },
    assessment: {
      title: "Where are claims exceptions and bordereaux cycles still running on spreadsheets?",
      deliverables: [
        "A map of last-mile insurance workflows",
        "The two or three best first candidates for agents",
        "A rough timeline and engagement shape"
      ]
    }
  }
];

export const getFunctionPage = (slug: string) => FUNCTION_PAGES.find((p) => p.slug === slug);
