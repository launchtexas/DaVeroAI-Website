// Brand illustration set, docs/design.md §6.9. Structural geometry from the kit's visual language
// (brand guidelines p.8: diagonal stripes, tight colour control). No AI-brain motifs, circuitry, glows,
// photos of people or deck images. All decorative art is aria-hidden; the home hero art has a caption.
import { cn } from "@/lib/utils";
import { Boxes, Calculator, FileText, Landmark, Percent, Receipt, Server, ShieldCheck, ShoppingCart, Truck, Wallet, Workflow } from "lucide-react";

// Industries hero: the four domains first (finance lead), then the workflows agents run.
const TILE_ICONS = [Landmark, Truck, Server, ShieldCheck, Receipt, Wallet, ShoppingCart, Boxes, Percent, FileText, Workflow, Calculator];

const label = { fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" } as const;

/** §6.0 Home hero: platform go-live → the last mile (agent and human steps) → finished outcome. */
export function HeroArt() {
  // Track: a kit-style stripe climbing from the platform card to the outcome card.
  const A = [196, 336];
  const v = [232, -196];
  const w = 92;
  const steps = [
    { t: 0.17, text: "Prepare", who: "agent" },
    { t: 0.39, text: "Review", who: "human" },
    { t: 0.61, text: "Approve", who: "human" },
    { t: 0.83, text: "Record", who: "record" },
  ] as const;
  const cx = (t: number) => A[0] + w / 2 + v[0] * t;
  const cy = (t: number) => A[1] + v[1] * t;
  return (
    <figure className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 600 560" className="h-auto w-full overflow-visible" role="img" aria-labelledby="hero-art-cap">
        <g aria-hidden="true" {...label}>
          {/* Platform covers it */}
          <text x="0" y="318" fill="var(--text-faint)">
            PLATFORM COVERS IT
          </text>
          <g className="ha-in" style={{ animationDelay: "100ms" }}>
            <rect x="0" y="336" width="236" height="196" rx="14" fill="var(--surface)" stroke="var(--line)" />
            <text x="24" y="372" fill="var(--text-muted)">
              PLATFORM LIVE
            </text>
            {["Configured", "Data in"].map((t, i) => (
              <g key={t} transform={`translate(24 ${396 + i * 44})`}>
                <rect width="188" height="32" rx="8" fill="var(--surface-2)" />
                <path d="M12 16.5l4 4 8-9" fill="none" stroke="var(--text-faint)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <text x="36" y="21" fill="var(--text-muted)" fontSize="13" fontWeight="500" letterSpacing="0">
                  {t}
                </text>
              </g>
            ))}
            <rect x="24" y="484" width="118" height="8" rx="4" fill="var(--surface-2)" />
            <rect x="24" y="500" width="76" height="8" rx="4" fill="var(--surface-2)" />
          </g>

          {/* The last mile */}
          <polygon
            className="ha-track"
            points={`${A[0]},${A[1]} ${A[0] + w},${A[1]} ${A[0] + w + v[0]},${A[1] + v[1]} ${A[0] + v[0]},${A[1] + v[1]}`}
            fill="var(--brand)"
          />
          <polygon
            className="ha-in"
            style={{ animationDelay: "500ms" }}
            points={`${A[0] + w + 22},${A[1]} ${A[0] + w + 34},${A[1]} ${A[0] + w + 34 + v[0]},${A[1] + v[1]} ${A[0] + w + 22 + v[0]},${A[1] + v[1]}`}
            fill="var(--white)"
            opacity="0.9"
          />
          <g className="ha-in" style={{ animationDelay: "700ms" }}>
            <text x="372" y="330" fill="var(--brand)" fontSize="14">
              THE LAST MILE
            </text>
          </g>
          {steps.map((s, i) => (
            <g key={s.text} transform={`translate(${cx(s.t) - 56} ${cy(s.t) - 17})`}>
              <g className="ha-in" style={{ animationDelay: `${800 + i * 160}ms` }}>
              <rect width="112" height="34" rx="17" fill="var(--white)" stroke="var(--midnight)" strokeWidth="2" />
              {s.who === "agent" && <rect x="12" y="12" width="10" height="10" rx="2" fill="var(--brand)" />}
              {s.who === "human" && <circle cx="17" cy="17" r="5" fill="none" stroke="var(--midnight)" strokeWidth="2" />}
              {s.who === "record" && <rect x="12" y="12" width="10" height="10" rx="2" fill="none" stroke="var(--midnight)" strokeWidth="2" />}
              <text x="30" y="22" fill="var(--midnight)" fontSize="13" fontWeight="700" letterSpacing="0">
                {s.text}
              </text>
              </g>
            </g>
          ))}

          {/* Finished outcome */}
          <g className="ha-in" style={{ animationDelay: "1500ms" }}>
            <rect x="344" y="8" width="256" height="132" rx="14" fill="var(--white)" />
            <circle cx="390" cy="74" r="24" fill="var(--brand)" />
            <path d="M379 74.5l7.5 7.5 15-16" fill="none" stroke="var(--midnight)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="428" y="56" fill="var(--slate)" fontSize="11">
              OUTCOME DELIVERED
            </text>
            <text x="428" y="82" fill="var(--midnight)" fontSize="19" fontWeight="800" letterSpacing="-0.02em">
              Finished outcome
            </text>
            <text x="428" y="104" fill="var(--slate)" fontSize="12.5" fontWeight="500" letterSpacing="0">
              Approved by your team
            </text>
          </g>
        </g>
      </svg>
      <figcaption id="hero-art-cap" className="t-small mt-4 max-w-[46ch] text-muted-fg">
        The last mile: everything between &lsquo;the software is live&rsquo; and the finished outcome. Agents prepare, your team reviews
        and approves, every action is recorded.
      </figcaption>
    </figure>
  );
}

/** Full-bleed kit stripes behind a hero (decorative). Sits to the right, clear of the text column. */
export function HeroStripes({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 top-[var(--header-h)] bottom-0 -z-10 overflow-hidden", className)}>
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 h-full w-full">
        <polygon points="1010,0 1250,0 1640,900 1400,900" fill="var(--midnight-2)" />
        <polygon points="1290,0 1330,0 1720,900 1680,900" fill="var(--brand)" className="max-lg:hidden" />
        <polygon points="1350,0 1362,0 1752,900 1740,900" fill="var(--midnight-line)" />
      </svg>
    </div>
  );
}

type ArtKind = "gap" | "layers" | "stairs" | "controls" | "tiles" | "bars" | "people" | "path";

/** Page hero illustrations: abstract, one idea each, drawn from the page's own subject. */
export function PageArt({ kind }: { kind: ArtKind }) {
  return (
    <svg viewBox="0 0 400 320" aria-hidden="true" className="ha-in h-auto w-full max-w-[440px]">
      {ART[kind]}
    </svg>
  );
}

const S = { surface: "var(--surface)", s2: "var(--surface-2)", line: "var(--line)", brand: "var(--brand)", white: "var(--white)", strong: "var(--line-strong)" };

const ART: Record<ArtKind, React.ReactNode> = {
  // Agentic AI: platform block, the gap, outcome block; an orange stripe bridges the gap.
  gap: (
    <>
      <rect x="10" y="150" width="130" height="150" rx="14" fill={S.surface} stroke={S.line} />
      <rect x="30" y="176" width="90" height="10" rx="5" fill={S.s2} />
      <rect x="30" y="198" width="64" height="10" rx="5" fill={S.s2} />
      <rect x="260" y="40" width="130" height="150" rx="14" fill={S.white} />
      <circle cx="325" cy="115" r="26" fill={S.brand} />
      <path d="M312 115.5l8.5 8.5 17-18" fill="none" stroke="var(--midnight)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="120,300 196,300 330,150 254,150" fill={S.brand} />
      <path d="M150 40 L240 40" stroke={S.strong} strokeDasharray="4 6" />
      <path d="M160 300 L260 300" stroke={S.strong} strokeDasharray="4 6" />
    </>
  ),
  // Services: three stacked layers (implement, build, run), top layer in brand orange.
  layers: (
    <>
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points={`${70 + i * 0},${230 - i * 70} ${330},${230 - i * 70} ${370},${190 - i * 70} ${110},${190 - i * 70}`}
          fill={i === 2 ? S.brand : i === 1 ? S.s2 : S.surface}
          stroke={i === 2 ? "none" : S.line}
          transform={`translate(${i * 0} 40)`}
        />
      ))}
      <path d="M70 270 L70 300 L330 300 L330 270" fill="none" stroke={S.strong} />
    </>
  ),
  // Approach: five ascending steps, the last one finished in orange.
  stairs: (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={20 + i * 74} y={250 - i * 48} width="64" height={50 + i * 48} rx="8" fill={i === 4 ? S.brand : i % 2 ? S.s2 : S.surface} stroke={i === 4 ? "none" : S.line} />
      ))}
      <polygon points="20,40 60,40 150,140 110,140" fill={S.white} opacity="0.9" />
    </>
  ),
  // Governance: nested control frames with checkpoints on the path through them.
  controls: (
    <>
      <rect x="20" y="20" width="360" height="280" rx="18" fill="none" stroke={S.line} />
      <rect x="60" y="56" width="280" height="208" rx="14" fill={S.surface} stroke={S.line} />
      <rect x="104" y="96" width="192" height="128" rx="10" fill={S.s2} />
      <path d="M0 160 H400" stroke={S.strong} strokeDasharray="4 6" />
      {[40, 82, 200, 318, 360].map((x, i) => (
        <rect key={x} x={x - 9} y="151" width="18" height="18" rx="4" fill={i === 2 ? S.brand : S.white} transform={`rotate(45 ${x} 160)`} />
      ))}
    </>
  ),
  // Industries: a grid of domains; finance lit first, the rest outlined.
  tiles: (
    <>
      {TILE_ICONS.map((Icon, i) => {
        const x = 20 + (i % 4) * 94;
        const y = 24 + Math.floor(i / 4) * 94;
        const lead = i === 0;
        return (
          <g key={i}>
            <rect x={x} y={y} width="80" height="80" rx="12" fill={lead ? S.brand : i < 4 ? S.s2 : S.surface} stroke={lead ? "none" : S.line} />
            <Icon x={x + 26} y={y + 26} width={28} height={28} strokeWidth={1.75} color={lead ? "var(--midnight)" : "var(--white)"} opacity={lead ? 1 : 0.85} />
          </g>
        );
      })}
    </>
  ),
  // Insights: market bars, one highlighted.
  bars: (
    <>
      <path d="M20 300 H380" stroke={S.strong} />
      {[70, 120, 96, 210, 150].map((h, i) => (
        <rect key={i} x={36 + i * 70} y={300 - h} width="48" height={h} rx="6" fill={i === 3 ? S.brand : i % 2 ? S.s2 : S.surface} stroke={i === 3 ? "none" : S.line} />
      ))}
      <polygon points="250,20 290,20 330,70 290,70" fill={S.white} opacity="0.9" />
    </>
  ),
  // About: the pod, two roles side by side on one track toward the outcome.
  people: (
    <>
      <polygon points="40,300 140,300 360,40 260,40" fill={S.surface} stroke={S.line} />
      <polygon points="150,300 196,300 400,60 354,60" fill={S.brand} />
      <circle cx="120" cy="200" r="30" fill={S.s2} stroke={S.line} />
      <circle cx="210" cy="96" r="30" fill={S.white} />
    </>
  ),
  // Contact: many paths converging on one point.
  path: (
    <>
      {[40, 100, 160, 220, 280].map((y, i) => (
        <path key={y} d={`M10 ${y} C 160 ${y}, 220 160, 330 160`} fill="none" stroke={i === 2 ? S.brand : S.strong} strokeWidth={i === 2 ? 4 : 1.5} />
      ))}
      <circle cx="342" cy="160" r="28" fill={S.brand} />
      <path d="M330 160.5l8 8 15-16" fill="none" stroke="var(--midnight)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

/** A full-bleed statement band: Midnight with kit stripes. Copy comes from the page. */
export function StripeBand({ children, className, ...rest }: React.ComponentProps<"section">) {
  return (
    <section {...rest} className={cn("band-deep relative isolate overflow-hidden", className)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <svg viewBox="0 0 1440 480" preserveAspectRatio="xMaxYMid slice" className="h-full w-full">
          <polygon points="860,0 1080,0 1300,480 1080,480" fill="var(--midnight-3)" />
          <polygon points="1120,0 1240,0 1460,480 1340,480" fill="var(--brand)" className="max-lg:hidden" />
          <polygon points="1270,0 1290,0 1510,480 1490,480" fill="var(--white)" className="max-lg:hidden" />
        </svg>
      </div>
      {children}
    </section>
  );
}
