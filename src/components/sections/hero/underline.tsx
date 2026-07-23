"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { duration, easing } from "@/lib/motion";

/**
 * A hand-drawn rule under the italic accent.
 *
 * The headline itself never animates — it is the LCP element, and hiding it for
 * even a frame delays the metric. Decoration is where the motion goes instead:
 * this is drawn after paint, over text that was already there.
 */
export function HeroUnderline() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-[0.5em] w-full overflow-visible text-brand-vivid md:-bottom-2"
      fill="none"
    >
      <m.path
        d="M2 8.5C48 4.2 122 2.4 190 3.6C232 4.3 272 5.8 298 7.4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: duration.slow,
          delay: 0.35,
          ease: easing.outExpo,
        }}
      />
    </svg>
  );
}
