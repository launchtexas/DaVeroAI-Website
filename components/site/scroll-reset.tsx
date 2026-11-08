"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/**
 * Next.js scrolls a new route so its first changed element is in view, which with the sticky header and
 * full-bleed heroes can leave a page a little below the top. Start every new page at the very top
 * (links with a #hash keep their anchor).
 */
export function ScrollReset() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}
