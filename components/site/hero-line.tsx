// §6.0 Hero last-mile line. CSS-only draw on load; reduced motion shows the drawn state.
const nodes = ["Platform live", "Configured", "Data in", "…", "Workflow run", "Outcome delivered"];
const X = [40, 128, 216, 304, 392, 480];
const Y = 210;

export function HeroLine() {
  return (
    <figure className="hidden sm:block">
      <svg viewBox="0 80 520 240" className="h-auto w-full" role="img" aria-labelledby="hero-line-cap">
        <g aria-hidden="true" fontFamily="var(--font-mono)" fontSize="12" letterSpacing="0.08em">
          {/* zone brackets */}
          <path d={`M${X[0]} 130 V122 H${X[3]} V130`} fill="none" stroke="var(--line-strong)" />
          <text x={(X[0] + X[3]) / 2} y="110" textAnchor="middle" fill="var(--text-faint)">
            PLATFORM COVERS IT
          </text>
          <path d={`M${X[3]} 130 V122 H${X[5]} V130`} fill="none" stroke="var(--accent)" className="lm-ring" />
          <text x={(X[3] + X[5]) / 2} y="110" textAnchor="middle" fill="var(--accent)" className="lm-ring">
            THE LAST MILE
          </text>

          <line x1={X[0]} y1={Y} x2={X[3]} y2={Y} stroke="var(--line-strong)" strokeWidth="2" />
          <line x1={X[3]} y1={Y} x2={X[5]} y2={Y} stroke="var(--line)" strokeWidth="2" strokeDasharray="4 6" />
          <line x1={X[3]} y1={Y} x2={X[5]} y2={Y} stroke="var(--accent)" strokeWidth="3" className="lm-draw" />

          {X.map((x, i) => (
            <g key={x}>
              <circle cx={x} cy={Y} r="6" fill={i < 4 ? "var(--line-strong)" : "var(--surface-2)"} stroke={i < 4 ? "none" : "var(--accent)"} strokeWidth="2" className={i >= 4 ? "lm-ring" : undefined} />
              <text
                x={x}
                y={i % 2 ? Y + 38 : Y - 24}
                textAnchor={i === 0 ? "start" : i === 5 ? "end" : "middle"}
                dx={i === 0 ? -8 : i === 5 ? 8 : 0}
                fill={i < 4 ? "var(--text-faint)" : "var(--text-muted)"}
              >
                {nodes[i].toUpperCase()}
              </text>
            </g>
          ))}
          <g className="lm-ring">
            <circle cx={X[5]} cy={Y} r="16" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
            <circle cx={X[5]} cy={Y} r="6" fill="var(--accent)" />
            <text x={X[5] + 8} y={Y + 80} textAnchor="end" fill="var(--accent)">
              FINISHED OUTCOME
            </text>
          </g>
        </g>
      </svg>
      <figcaption id="hero-line-cap" className="t-small mt-4 text-muted-fg">
        The last mile: everything between &lsquo;the software is live&rsquo; and the finished outcome.
      </figcaption>
    </figure>
  );
}
