// Visible marker for facts docs/content.md leaves open. Remove each one when the fact arrives.
export function Tbd({ children }: { children?: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-line-strong px-1.5 py-0.5 text-[0.85em] whitespace-normal text-muted-foreground">
      [TBD{children ? <>: {children}</> : null}]
    </span>
  );
}
