// Inline icons from docs/source/design-v4.html. All decorative (aria-hidden).

export const Mark = ({ size = 28, fill = "#FF7A2E" }: { size?: number; fill?: string }) => (
  <svg aria-hidden="true" height={size} width={size} viewBox="0 0 28 28">
    <path d="M3 4h12l10 10-10 10H3l10-10z" fill={fill} />
  </svg>
);

export const Check = ({ size = 20, stroke = "#081630", width = 2.5 }: { size?: number; stroke?: string; width?: number }) => (
  <svg aria-hidden="true" fill="none" height={size} width={size} stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={width} viewBox="0 0 24 24">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

/** Card icon: one or more stroke paths, drawn in deep orange (`.icon`). */
export const CardIcon = ({ d }: { d: string }) => (
  <svg aria-hidden="true" className="icon" fill="none" stroke="#C2410C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
    <path d={d} />
  </svg>
);

export const ICONS = {
  database: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  trend: "M3 17l6-6 4 4 8-8M14 7h7v7",
  gauge: "M12 14l4-4M3.5 15a9 9 0 1 1 17 0M12 14h.01",
  list: "M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01",
  truck: "M1 6h13v10H1zM14 10h4l3 3v3h-7M5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  bag: "M3 7h18v13H3zM8 7V4h8v3",
  shield: "M12 3 4 6v6c0 5 3.4 8.4 8 9 4.6-.6 8-4 8-9V6z",
  doc: "M14 3H6v18h12V7zM14 3v4h4M9 13h6M9 17h6",
} as const;
