/** The mock's 24x24 stroke icon; `paths` is the inner SVG markup copied verbatim from docs/source/design-v4.html. */
export function Icon({ paths }: { paths: string }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      stroke="#C2410C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
