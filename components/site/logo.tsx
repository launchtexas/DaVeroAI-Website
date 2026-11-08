import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="inline-flex min-h-11 items-center text-[19px] font-medium tracking-[-0.03em]">
      Davero<span className="text-mark">AI</span>
    </Link>
  );
}
