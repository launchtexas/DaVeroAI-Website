export function SectionHead({
  eyebrow,
  title,
  lead,
  id,
  as: H = "h2",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  id?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className} data-reveal>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <H id={id} className={H === "h1" ? "t-h1" : "t-h2"}>
        {title}
      </H>
      {lead && <p className="t-lead mt-5">{lead}</p>}
    </div>
  );
}
