import Link from "next/link";
import { industries } from "@/lib/content";

export function IndustryTiles() {
  return (
    <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {industries.map(({ id, name, icon: Icon }) => (
        <li key={id} data-reveal className="group card card-link p-6 hover:border-line-strong! hover:translate-y-0!">
          <Link href={`/industries#${id}`} className="stretched flex items-center gap-3">
            <Icon aria-hidden="true" strokeWidth={1.5} className="size-5 shrink-0 text-accent" />
            <span className="text-[17px] font-semibold transition-colors duration-150 group-hover:text-accent">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
