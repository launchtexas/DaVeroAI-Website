// Visible marker for a fact still to be supplied (listed in docs/legal-review.md). Renders "[Label]".
// Remove each one when the fact arrives: grep for data-tbd or <Tbd>.
export function Tbd({ children }: { children: React.ReactNode }) {
  return (
    <span
      data-tbd=""
      className="rounded-sm border border-dashed border-[var(--mark)] bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-1.5 py-0.5 text-[0.9em] font-medium whitespace-normal text-fg"
    >
      [{children}]
    </span>
  );
}
