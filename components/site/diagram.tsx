import { DIAGRAM_ALT } from "@/lib/content";
import { cn } from "@/lib/utils";

type Box = { x: number; y: number; w: number; h: number; label: string; lead?: boolean };

const agents = ["Research", "Operations", "Security", "Analytics"];
const bases = ["Enterprise APIs", "Cloud & Data", "Business Systems"];
const TOP = "Enterprise AI Orchestrator";

const wide: { vb: string; boxes: Box[]; lines: string[] } = {
  vb: "0 0 960 380",
  boxes: [
    { x: 310, y: 10, w: 340, h: 64, label: TOP, lead: true },
    ...agents.map((label, i) => ({ x: 20 + i * 240, y: 160, w: 200, h: 56, label })),
    ...bases.map((label, i) => ({ x: 20 + i * 320, y: 300, w: 280, h: 56, label })),
  ],
  lines: [
    "M480 74 V117 M120 117 H840 M120 117 V160 M360 117 V160 M600 117 V160 M840 117 V160",
    "M120 216 V258 M360 216 V258 M600 216 V258 M840 216 V258 M120 258 H840 M160 258 V300 M480 258 V300 M800 258 V300",
  ],
};

const narrow: typeof wide = {
  vb: "0 0 360 500",
  boxes: [
    { x: 20, y: 10, w: 320, h: 60, label: TOP, lead: true },
    ...agents.map((label, i) => ({ x: 20 + (i % 2) * 170, y: 130 + Math.floor(i / 2) * 72, w: 150, h: 52, label })),
    ...bases.map((label, i) => ({ x: 20, y: 320 + i * 60, w: 320, h: 48, label })),
  ],
  lines: [
    "M180 70 V105 M95 105 H265 M95 105 V130 M265 105 V130",
    "M95 254 V290 M265 254 V290 M95 290 H265 M180 290 V320 M180 368 V380 M180 428 V440",
  ],
};

function Svg({ d, className }: { d: typeof wide; className?: string }) {
  return (
    <svg viewBox={d.vb} role="img" aria-label={DIAGRAM_ALT} className={cn("h-auto w-full", className)}>
      <title>{DIAGRAM_ALT}</title>
      {d.lines.map((path) => (
        <path key={path} d={path} fill="none" strokeWidth={1} className="diagram-line stroke-line-strong" />
      ))}
      {d.boxes.map((b) => (
        <g key={b.label}>
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={8}
            strokeWidth={b.lead ? 1.5 : 1}
            className={cn("fill-surface", b.lead ? "stroke-accent" : "stroke-line")}
          />
          <text
            x={b.x + b.w / 2}
            y={b.y + b.h / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={b.lead ? 16 : 14}
            fontWeight={b.lead ? 700 : 500}
            className="fill-fg"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

// Orchestrator diagram (docs/design.md §6). Wide layout ≥ 640px, stacked tiers below.
// `compact` always uses the stacked layout, so labels stay readable in the narrow hero column.
export function Diagram({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div className={className} data-reveal>
      {!compact && <Svg d={wide} className="hidden sm:block" />}
      <Svg d={narrow} className={cn("mx-auto max-w-[420px]", !compact && "sm:hidden")} />
    </div>
  );
}
