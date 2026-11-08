// §6.8 Landscape 2×2. Categories only, no company names; DaVero AI dot top-right.
const quadrants = [
  { pos: "Top left", where: "Sells the tool, deep platform context", name: "AI-native platforms", body: "own the ledger, sell the tool" },
  { pos: "Top right", where: "Sells the work, deep platform context", name: "Own the Last Mile (DaVero AI)", body: "Platform-native agents, sold as outcomes", ours: true },
  { pos: "Bottom left", where: "Sells the tool, shallow platform context", name: "Platforms & legacy firms", body: "tools for firms, firms selling hours" },
  { pos: "Bottom right", where: "Sells the work, shallow platform context", name: "AI roll-ups & labs", body: "generic or enterprise-first" },
];

export function Landscape() {
  return (
    <figure aria-labelledby="landscape-cap">
      <div className="flex gap-3">
        <p aria-hidden="true" className="t-mono flex items-center text-faint [writing-mode:vertical-rl] rotate-180">
          Depth of platform context &rarr;
        </p>
        <div className="flex-1">
          <div aria-hidden="true" className="relative grid aspect-square grid-cols-2 grid-rows-2 border border-line-strong">
            {quadrants.map((q, i) => (
              <div
                key={q.name}
                className={[
                  "flex flex-col p-3 sm:p-5",
                  i % 2 === 0 ? "border-r border-line-strong" : "",
                  i < 2 ? "border-b border-line-strong" : "",
                  q.ours ? "bg-surface-2" : "",
                ].join(" ")}
              >
                <span className={`t-mono ${q.ours ? "text-fg" : "text-faint"}`}>{q.name}</span>
                <span className="t-small mt-2 text-muted-fg max-sm:hidden">{q.body}</span>
                {q.ours && (
                  <span className="mt-auto flex items-center gap-2 self-end">
                    <span className="size-4 rounded-full bg-mark ring-4 ring-mark/25" />
                    <span className="t-mono text-fg">DaVero AI</span>
                  </span>
                )}
              </div>
            ))}
          </div>
          <p aria-hidden="true" className="t-mono mt-3 flex justify-between text-faint">
            <span>Sells the tool</span>
            <span>Sells the work &rarr;</span>
          </p>
        </div>
      </div>
      <ul className="sr-only">
        {quadrants.map((q) => (
          <li key={q.name}>
            {q.pos} ({q.where}): {q.name}, {q.body}.
          </li>
        ))}
      </ul>
      <figcaption id="landscape-cap" className="t-mono mt-6 text-faint">
        Positioning is the author&rsquo;s own assessment. Classifications adapted from Sequoia, Mar 2026.
      </figcaption>
    </figure>
  );
}
