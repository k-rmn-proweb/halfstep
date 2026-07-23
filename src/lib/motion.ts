import type { Transition, Variants } from "motion/react";

/**
 * The single source of easing and duration for JavaScript animations.
 *
 * Framer Motion cannot resolve CSS custom properties, so these mirror the
 * `--ease-*` tokens in `app/globals.css` — the same documented-mirror pattern
 * as `config/brand.ts` does for Satori. Change one, change the other.
 */
export const easing = {
  /** --ease-out-expo */
  outExpo: [0.22, 1, 0.36, 1],
  /** --ease-out-quart */
  outQuart: [0.25, 1, 0.5, 1],
} as const;

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.8,
} as const;

export const transitions = {
  reveal: {
    duration: duration.base,
    ease: easing.outExpo,
  },
  hover: {
    duration: duration.fast,
    ease: easing.outQuart,
  },
} as const satisfies Record<string, Transition>;

/**
 * Fade up, the default entrance. Only opacity and transform animate, so
 * nothing reflows and the page keeps its zero CLS.
 */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Parent of a staggered list. Children opt in by using `revealUp` themselves —
 * the parent only schedules them.
 */
export const staggerChildren = (stagger = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

/** Viewport settings shared by every scroll-triggered animation. */
export const revealViewport = {
  once: true,
  margin: "0px 0px -80px 0px",
} as const;
