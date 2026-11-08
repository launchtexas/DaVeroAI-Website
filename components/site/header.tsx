"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { CTA_HREF, CTA_LABEL, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        // Solid surfaces only (no translucency): transparent over the Midnight hero at the top,
        // solid White with the Primary_Color lockup once the page scrolls.
        "sticky top-0 z-40 h-[var(--header-h)] border-b transition-[background-color,border-color] duration-200",
        scrolled ? "band-paper border-line" : "border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-full items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-7 nav:flex">
          <ul className="flex items-center gap-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center text-[15px] font-medium transition-colors duration-150 hover:text-fg",
                    isActive(item.href)
                      ? "text-fg after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-[var(--brand)]"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild>
            <Link href={CTA_HREF} aria-current={pathname === "/contact" ? "page" : undefined}>
              {CTA_LABEL}
            </Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="nav:hidden" aria-label="Open menu">
              <Menu className="size-5" aria-hidden="true" />
              <span aria-hidden="true">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" showCloseButton={false} className="h-dvh gap-0 overflow-y-auto border-0 bg-bg p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <div className="container-x flex h-[var(--header-h)] items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X className="size-6" aria-hidden="true" />
                </Button>
              </SheetClose>
            </div>
            <nav aria-label="Main" className="container-x pb-6">
              <ul>
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex min-h-14 items-center text-2xl font-medium tracking-[-0.025em]",
                          isActive(item.href) ? "text-accent" : "text-fg",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <SheetClose asChild>
                <Button asChild className="mt-6 w-full">
                  <Link href={CTA_HREF}>{CTA_LABEL}</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
