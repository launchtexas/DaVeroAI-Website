"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import { CTA_LABEL, nav } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-150",
        scrolled ? "border-line bg-[rgba(var(--bg-rgb),.85)] backdrop-blur-md" : "border-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 nav:h-[72px]">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-8 nav:flex">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center text-[15px] font-medium transition-colors duration-150 hover:text-fg",
                    isActive(item.href)
                      ? "text-fg after:absolute after:inset-x-0 after:bottom-1.5 after:h-0.5 after:bg-accent"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild>
            <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>
              {CTA_LABEL}
            </Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="nav:hidden" aria-label="Open menu">
              <Menu className="size-6" aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent side="top" showCloseButton={false} className="gap-0 border-line bg-bg p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <div className="container-x flex h-16 items-center justify-between">
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
                          "flex h-14 items-center text-xl font-semibold",
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
                  <Link href="/contact">{CTA_LABEL}</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
