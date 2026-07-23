"use client";

import { useReducedMotion } from "motion/react";
// Namespace import: this entry exports each element separately, and pulling
// them in this way keeps the full `motion.*` bundle out of the graph.
import * as m from "motion/react-m";

import { revealUp, revealViewport, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Seconds of stagger, for revealing a list one item after another. */
  delay?: number;
};

/**
 * Fades content up as it scrolls into view, once.
 *
 * Above-the-fold content is deliberately left alone — starting the hero at
 * `opacity: 0` would push out the LCP it is measured by.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      // Hook for the no-JavaScript fallback in the root layout: the server
      // renders this element at opacity 0, so without JS it would never appear.
      data-reveal
      className={cn(className)}
      variants={revealUp}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      transition={{ ...transitions.reveal, delay }}
    >
      {children}
    </m.div>
  );
}
