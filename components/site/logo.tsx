import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import reversed from "@/public/brand/davero-primary-reversed.png";
import color from "@/public/brand/davero-primary-color.png";

/**
 * Brand kit lockups (docs/source/brand-kit/02_Transparent_PNG_Logos, resized):
 * Primary_Reversed on Midnight, Primary_Color on White/Cloud. Transparent PNGs, so the
 * wordmark never depends on an installed font. Never recolour, crop or add effects.
 * The light version shows automatically inside a .band-paper / .band-cloud ancestor.
 */
export function Logo({ onClick, size = "md", className }: { onClick?: () => void; size?: "md" | "lg"; className?: string }) {
  const h = size === "lg" ? "h-12 sm:h-14" : "h-10 lg:h-11";
  const img = cn("w-auto select-none", h);
  return (
    // Clear space: the link pads the lockup by more than 1/4 of the mark height.
    <Link href="/" onClick={onClick} aria-label="DaVero AI home" className={cn("logo -ml-1 inline-flex min-h-11 items-center", className)}>
      <Image src={reversed} alt="" sizes="180px" className={cn(img, "logo-dark")} />
      <Image src={color} alt="" sizes="180px" className={cn(img, "logo-light")} />
    </Link>
  );
}
