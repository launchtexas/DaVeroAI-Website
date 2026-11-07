import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Davero AI, home"
      className="inline-flex min-h-11 items-center text-[17px] font-extrabold tracking-[-0.02em]"
    >
      DAVERO AI<span className="text-accent">.</span>
    </Link>
  );
}
