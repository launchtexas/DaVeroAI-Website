// Shared copy from docs/content.md. Page-specific copy lives in each page.
import {
  BarChart3,
  BookOpen,
  Boxes,
  Briefcase,
  Building2,
  Car,
  Compass,
  Headset,
  Landmark,
  MessagesSquare,
  Network,
  Plug,
  Rocket,
  Server,
  ShieldCheck,
  ShieldHalf,
  Truck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const EMAIL = "hello@davero.ai";
export const CTA_LABEL = "Start a conversation";

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
] as const;

export type Service = {
  id: string;
  title: string;
  short: string;
  body: string;
  eyebrow?: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "multi-agent-systems",
    title: "Multi-Agent Systems",
    short: "Specialised agents that coordinate, reason, delegate and run complex workflows.",
    body: "Specialised AI agents that coordinate, reason and delegate to run complex workflows end to end.",
    eyebrow: "Agentic AI",
    icon: Network,
  },
  {
    id: "intelligent-automation",
    title: "Intelligent Automation",
    short: "Manual processes turned into AI-driven workflows, with human oversight.",
    body: "We turn manual processes into AI-driven workflows, with people kept in the loop where it matters.",
    icon: Workflow,
  },
  {
    id: "ai-strategy",
    title: "Enterprise AI Strategy",
    short: "Find high-value opportunities and build a roadmap from strategy to implementation.",
    body: "We find your high-value AI opportunities and build an adoption roadmap that runs from strategy to implementation.",
    eyebrow: "Consulting",
    icon: Compass,
  },
  {
    id: "enterprise-integration",
    title: "Enterprise Integration",
    short: "Connect agents to your existing APIs, data platforms, cloud and business apps.",
    body: "We connect agents to the systems you already run: APIs, data platforms, cloud and business applications.",
    icon: Plug,
  },
  {
    id: "platform-engineering",
    title: "AI Platform Engineering",
    short: "Production AI infrastructure with orchestration, observability, evaluation and scalable deployment.",
    body: "Production AI infrastructure with orchestration, observability, evaluation and scalable deployment.",
    icon: Server,
  },
  {
    id: "security-governance",
    title: "AI Security & Governance",
    short: "Access controls, auditability, policy enforcement and human-in-the-loop.",
    body: "Access controls, auditability, policy enforcement and human-in-the-loop, built in from the start.",
    icon: ShieldCheck,
  },
];

export type Industry = { id: string; name: string; icon: LucideIcon };

export const industries: Industry[] = [
  { id: "cybersecurity", name: "Cybersecurity & SecOps", icon: ShieldHalf },
  { id: "itsm", name: "IT Service Management", icon: Headset },
  { id: "financial-services", name: "Financial Services", icon: Landmark },
  { id: "customer-experience", name: "Customer Experience", icon: MessagesSquare },
  { id: "enterprise-knowledge", name: "Enterprise Knowledge", icon: BookOpen },
  { id: "supply-chain", name: "Supply Chain", icon: Truck },
  { id: "automotive", name: "Automotive & Mobility", icon: Car },
  { id: "business-operations", name: "Business Operations", icon: Briefcase },
  { id: "data-analytics", name: "Data & Analytics", icon: BarChart3 },
];

export const steps = [
  {
    title: "Discover",
    body: "Understand your operations and where AI adds the most value.",
    short: "your operations",
  },
  {
    title: "Architect",
    body: "Design the agents, integrations and controls.",
    short: "the agents, integrations and controls",
  },
  {
    title: "Deploy",
    body: "Execute and put the system into production.",
    short: "into production",
  },
  {
    title: "Optimize",
    body: "Measure, improve and evolve it over time.",
    short: "over time",
  },
];

export const proofPoints = [
  { title: "Multi-Agent AI", body: "Intelligent orchestration", icon: Boxes },
  { title: "Enterprise-Ready", body: "Secure, scalable architecture", icon: Building2 },
  { title: "Last-Mile Delivery", body: "From concept to operations", icon: Rocket },
];

export const DIAGRAM_ALT =
  "An Enterprise AI Orchestrator coordinates Research, Operations, Security and Analytics agents, which connect to Enterprise APIs, Cloud & Data, and Business Systems.";
