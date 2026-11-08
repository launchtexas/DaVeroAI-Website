import Link from "next/link";
import { ArrowRight, BookCheck, Workflow, Check, Layers, LibraryBig, ScanText, User, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroStripes, StripeBand } from "./art";
import {
  ADVISORY_FOOTNOTE,
  GOLDEN_RULE,
  CLOSE_LINE,
  CTA_HREF,
  CTA_LABEL,
  challenges,
  closingQuotes,
  comparison,
  differentiators,
  journey,
  pod,
  strategy,
} from "@/lib/content";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow t-mono", className)}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  center,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("section-head", center && "text-center [&_h2]:mx-auto [&_p]:mx-auto", className)}>
      {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
      <h2 id={id} className="t-h2">
        {title}
      </h2>
      {lead && <p className="t-lead mt-5">{lead}</p>}
    </div>
  );
}

export function CtaButton({ className }: { className?: string }) {
  return (
    <Button asChild className={cn("max-sm:w-full", className)}>
      <Link href={CTA_HREF}>
        {CTA_LABEL}
        <ArrowRight aria-hidden="true" className="transition-transform duration-150 group-hover/button:translate-x-0.5" />
      </Link>
    </Button>
  );
}

export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("link link-arrow", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="size-4" />
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  cta = true,
  art,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  cta?: boolean;
  /** Abstract page illustration (components/site/art.tsx PageArt). */
  art?: React.ReactNode;
}) {
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero">
      <HeroStripes />
      <div className={cn("container-x", art && "grid items-center gap-12 lg:grid-cols-12 lg:gap-8")}>
        <div className={cn(art && "lg:col-span-7")}>
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h1 id="hero-title" className="t-h1">
            {title}
          </h1>
          {lead && <div className="t-lead mt-6">{lead}</div>}
          {children}
          {cta && (
            <div className="mt-10">
              <CtaButton />
            </div>
          )}
        </div>
        {art && <div className="max-w-[300px] sm:max-w-[380px] lg:col-span-5 lg:col-start-8 lg:max-w-none">{art}</div>}
      </div>
    </section>
  );
}

export function CtaBand({ title, lead }: { title: string; lead?: string }) {
  return (
    <StripeBand id="cta" aria-labelledby="cta-title" className="py-[calc(var(--section-y)*1.1)]">
      <div className="container-x" data-reveal>
        <h2 id="cta-title" className="t-h1 max-w-[20ch]">
          {title}
        </h2>
        {lead && <p className="t-lead mt-5">{lead}</p>}
        <div className="mt-10">
          <CtaButton />
        </div>
      </div>
    </StripeBand>
  );
}

export function Quote({ text, by, size = "h2" }: { text: string; by?: string; size?: "h2" | "h3" }) {
  return (
    <figure>
      <blockquote className={cn(size === "h2" ? "t-h2" : "t-h3", "max-w-none")}>
        <p>&ldquo;{text}&rdquo;</p>
      </blockquote>
      {by && (
        <figcaption className="t-mono mt-4 text-faint">
          {by}
        </figcaption>
      )}
    </figure>
  );
}

export function ClosingCta({ title = CLOSE_LINE, withQuotes }: { title?: string; withQuotes?: boolean }) {
  if (!withQuotes) return <CtaBand title={title} />;
  return (
    <>
      <section aria-labelledby="quotes-title" className="section band-cloud">
        <div className="container-x">
          <h2 id="quotes-title" className="sr-only">
            In their words
          </h2>
          <ul className="grid gap-10 md:grid-cols-3">
            {closingQuotes.map((q) => (
              <li key={q.text} data-reveal className="border-t-2 border-[var(--brand)] pt-6">
                <Quote text={q.text} by={q.by} size="h3" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand title={title} />
    </>
  );
}

export function ComparisonTable() {
  return (
    <table className="w-full border-collapse text-left">
      <caption className="sr-only">Platforms deliver the capability. DaVero AI delivers the finished outcome.</caption>
      <thead className="max-sm:sr-only">
        <tr className="border-b border-line-strong">
          <th scope="col" className="w-1/2 pr-6 pb-4 align-bottom font-normal">
            <span className="t-h3 block">{comparison.platform.title}</span>
            <span className="t-mono text-faint">{comparison.platform.sub}</span>
          </th>
          <th scope="col" className="w-1/2 pb-4 align-bottom font-normal">
            <span className="t-h3 flex items-center gap-2">
              <span aria-hidden="true" className="dot bg-mark" />
              {comparison.davero.title}
            </span>
            <span className="t-mono text-faint">{comparison.davero.sub}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {comparison.rows.map((r) => (
          <tr key={r.platform} className="border-b border-line max-sm:block max-sm:py-4">
            <td className="py-5 pr-6 align-top text-muted-fg max-sm:block max-sm:py-1">
              <span className="t-mono mb-1 block text-faint sm:hidden">{comparison.platform.title}</span>
              {r.platform}
            </td>
            <td className="py-5 align-top max-sm:block max-sm:py-1">
              <span className="t-mono mb-1 block text-faint sm:hidden">{comparison.davero.title}</span>
              {r.davero}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Challenge → our answer rows (Home §3c on paper, Services dark). */
export function ChallengeRows() {
  return (
    <ol className="border-t border-line">
      {challenges.map((c, i) => (
        <li key={c.title} data-reveal className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
          <p className="t-mono text-faint md:col-span-1">{String(i + 1).padStart(2, "0")}</p>
          <div className="md:col-span-5">
            <p className="t-mono mb-2 text-faint">Challenge</p>
            <h3 className="t-h3">{c.title}</h3>
            {c.stat && (
              <p className="t-small mt-3 text-muted-fg">
                <strong className="font-medium text-fg">{c.stat.value}</strong> {c.stat.label}
                <span className="t-mono mt-1 block text-faint">
                  Source: {c.stat.source}
                </span>
              </p>
            )}
          </div>
          <div className="md:col-span-6">
            <p className="t-mono mb-2 text-faint">Our answer</p>
            <p>{c.answer}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function WhereWhatHow({ large }: { large?: boolean }) {
  return (
    <ol className="grid border-t border-line md:grid-cols-3">
      {strategy.parts.map((p, i) => (
        <li
          key={p.label}
          data-reveal
          className={cn("border-b border-line py-8 md:border-b-0 md:px-8 md:first:pl-0", i > 0 && "md:border-l")}
        >
          <p className="t-mono mb-3 text-mark">{p.label}</p>
          <h3 className={large ? "t-h3" : "t-h3 text-lg"}>{p.title}</h3>
          <p className="t-small mt-3 text-muted-fg">
            {p.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

const diffIcons = [ScanText, Layers, UserCheck, LibraryBig];

export function Differentiators() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {differentiators.map((d, i) => {
        const Icon = diffIcons[i];
        return (
          <li key={d.title} data-reveal className="card">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 text-mark" />
            <h3 className="t-h3 mt-6">{d.title}</h3>
            <p className="t-small mt-3 text-muted-fg">
              {d.body}
              {d.quote && (
                <>
                  {" "}
                  As {d.quote.by} puts it, &ldquo;{d.quote.text}&rdquo;
                </>
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export function PodCards({ compact }: { compact?: boolean }) {
  if (compact)
    return (
      <ul className="border-t border-line">
        {pod.map((p) => (
          <li key={p.role} data-reveal className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-6">
            <h3 className="t-h3 md:col-span-5">{p.role}</h3>
            <p className="t-mono text-faint md:col-span-2 md:pt-1.5">{p.tag}</p>
            <p className="t-small text-muted-fg md:col-span-5">{p.body}</p>
          </li>
        ))}
      </ul>
    );
  return (
    <ul className="grid gap-6 lg:grid-cols-2">
      {pod.map((p) => (
        <li key={p.role} data-reveal className="card">
          <span className={cn("chip t-mono", p.tag === "Pod lead" && "border-mark text-fg")}>{p.tag}</span>
          <h3 className="t-h3 mt-6">{p.role}</h3>
          <p className="t-small mt-3 text-muted-fg">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** Client journey: Embed and prove → Expand → Replicate. */
export function Journey({ large }: { large?: boolean }) {
  return (
    <ol className={cn("grid gap-6", large ? "md:grid-cols-3" : "sm:grid-cols-3")}>
      {journey.map((s, i) => (
        <li key={s.title} data-reveal className="relative border-t border-line-strong pt-5">
          <span aria-hidden="true" className="absolute -top-[5px] left-0 size-2.5 rounded-full bg-mark" />
          {i < journey.length - 1 && (
            <ArrowRight aria-hidden="true" className="absolute -top-[9px] right-0 hidden size-4 text-line-strong lg:block" />
          )}
          <p className="t-mono text-faint">{String(i + 1).padStart(2, "0")}</p>
          <h3 className={large ? "t-h3 mt-2" : "mt-2 font-bold"}>{s.title}</h3>
          <p className="t-small mt-2 text-muted-fg">
            {s.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function GoldenRule({ withFootnote }: { withFootnote?: boolean }) {
  return (
    <div className="card bg-surface-2">
      <p className="t-mono text-faint">The golden rule</p>
      <ol className="mt-5 space-y-3">
        {GOLDEN_RULE.map((l, i) => (
          <li key={l} className="flex gap-4">
            <span className="t-mono pt-1 text-mark">{String(i + 1).padStart(2, "0")}</span>
            <span className="t-h3">{l}</span>
          </li>
        ))}
      </ol>
      {withFootnote && <p className="t-small mt-6 text-muted-fg">{ADVISORY_FOOTNOTE}</p>}
    </div>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((o) => (
        <li key={o} className="flex gap-3">
          <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-mark" />
          <span>{o}</span>
        </li>
      ))}
    </ul>
  );
}

const actorIcon = { agent: Workflow, human: User, record: BookCheck } as const;

export function ActorChip({ actor, label }: { actor: keyof typeof actorIcon; label: string }) {
  const Icon = actorIcon[actor];
  return (
    <span
      className={cn(
        "chip t-mono",
        actor === "agent" && "border-mark text-fg",
        actor === "human" && "border-mark-human text-fg",
        actor === "record" && "text-fg",
      )}
    >
      <Icon aria-hidden="true" className={cn("size-3.5", actor === "human" ? "text-mark-human" : "text-mark")} />
      {label}
    </span>
  );
}

export function Legend() {
  return (
    <ul className="t-mono flex flex-wrap gap-x-5 gap-y-2 text-muted-fg" aria-label="Legend">
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="dot bg-mark" />
        <Workflow aria-hidden="true" className="size-4" /> Agent
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="dot bg-mark-human" />
        <User aria-hidden="true" className="size-4" /> Human
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden="true" className="dot border border-mark" />
        <BookCheck aria-hidden="true" className="size-4" /> System of record
      </li>
    </ul>
  );
}
