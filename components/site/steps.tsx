import { steps } from "@/lib/content";

// Approach steps. "full" uses the long text (Home); "short" the one-liners (Services).
export function Steps({ variant = "full" }: { variant?: "full" | "short" }) {
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span aria-hidden="true" className="absolute top-[10px] right-0 left-0 hidden h-px bg-line lg:block" />
      {steps.map((s, i) => (
        <li key={s.title} data-reveal className="relative border-l border-line pl-5 lg:border-l-0 lg:pl-0">
          <span className="relative inline-block bg-bg pr-3 text-sm font-semibold text-accent tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          {variant === "full" ? (
            <>
              <h3 className="t-h3 mt-4">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </>
          ) : (
            <p className="mt-4 text-lg text-muted-foreground">
              <strong className="font-semibold text-fg">{s.title}</strong> {s.short}.
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
