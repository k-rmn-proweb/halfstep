"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { navContent } from "@/content/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";

/**
 * Client-side as a whole, unusually for this codebase: the bar reacts to scroll
 * position, so there is no meaningful server part left to split out.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 transition-colors duration-300 ease-out-quart",
        scrolled
          ? "border-b border-edge bg-canvas/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-full items-center justify-between">
        <Link href="/" aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navContent.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button href={navContent.cta.href}>{navContent.cta.label}</Button>
        </nav>

        <MobileNav />
      </Container>
    </header>
  );
}
