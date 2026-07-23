"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { navContent } from "@/content/nav";
import { transitions } from "@/lib/motion";
import { Button } from "@/components/ui/button";

/**
 * The interactive leaf of the header. Kept in its own file so the header can
 * stay as thin as possible above it.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  // Escape closes; the body stops scrolling while the panel covers it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? navContent.menu.close : navContent.menu.open}
        className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-ink"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="size-6"
        >
          {open ? (
            <>
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </>
          ) : (
            <>
              <line x1="3" y1="8" x2="21" y2="8" />
              <line x1="3" y1="16" x2="21" y2="16" />
            </>
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={transitions.hover}
            className="fixed inset-x-0 top-16 bottom-0 border-t border-edge bg-canvas px-6 py-8"
          >
            <nav className="flex flex-col gap-1">
              {navContent.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-edge py-4 font-display text-h3"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <Button
              href={navContent.cta.href}
              size="lg"
              className="mt-8 w-full"
              onClick={() => setOpen(false)}
            >
              {navContent.cta.label}
            </Button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
