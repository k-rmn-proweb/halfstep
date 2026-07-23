"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { heroContent } from "@/content/hero";
import { duration, easing, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

type State = "idle" | "sending" | "shipped";

const { visual } = heroContent;

/**
 * The hero's evidence: a fragment that works rather than a picture of one.
 *
 * It runs its cycle once on its own so the point lands without requiring a
 * click, then stays put — a permanent loop would be noise, and would keep the
 * main thread busy for the whole visit.
 */
export function HeroVisual() {
  const [state, setState] = useState<State>("idle");
  const reduceMotion = useReducedMotion();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const played = useRef(false);

  const run = () => {
    played.current = true;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState("sending");
    timers.current.push(setTimeout(() => setState("shipped"), 1100));
  };

  // One unattended run, so the fragment demonstrates itself.
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setTimeout(() => {
      if (!played.current) run();
    }, 2200);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative rounded-2xl border border-edge bg-surface p-6 shadow-[0_1px_2px_rgba(33,25,16,0.04),0_12px_32px_-12px_rgba(33,25,16,0.12)]">
      <div className="flex items-center justify-between">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-edge-strong" />
          <span className="size-2 rounded-full bg-edge-strong" />
          <span className="size-2 rounded-full bg-edge-strong" />
        </span>
        <span className="font-mono text-label text-ink-muted">
          {visual.filename}
        </span>
      </div>

      <div className="flex flex-col items-center gap-6 py-10">
        <button
          type="button"
          onClick={() => (state === "shipped" ? setState("idle") : run())}
          disabled={state === "sending"}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 font-medium transition-colors duration-200 ease-out-quart",
            state === "shipped"
              ? "border border-edge-strong bg-transparent text-ink"
              : "bg-brand text-brand-foreground hover:bg-brand-ink",
            state === "sending" && "cursor-progress",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={state}
              initial={reduceMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={transitions.hover}
              className="inline-flex items-center gap-2.5"
            >
              {state === "sending" && <Spinner />}
              {state === "shipped" && <Check reduceMotion={reduceMotion} />}
              {state === "shipped" ? "Shipped" : visual.action}
            </m.span>
          </AnimatePresence>
        </button>

        <p
          className="flex items-center gap-2 font-mono text-label text-ink-muted"
          aria-live="polite"
        >
          <span
            className={cn(
              "size-1.5 rounded-full transition-colors duration-300",
              state === "shipped" ? "bg-brand" : "bg-edge-strong",
            )}
            aria-hidden="true"
          />
          {visual.states[state]}
        </p>
      </div>

      <p className="border-t border-edge pt-4 text-center text-small text-ink-muted">
        {visual.label}
      </p>
    </div>
  );
}

function Spinner() {
  return (
    <m.span
      aria-hidden="true"
      className="size-4 rounded-full border-2 border-current border-t-transparent"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function Check({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="size-4 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <m.path
        d="M3 8.5L6.5 12L13 4.5"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: duration.fast, ease: easing.outQuart }}
      />
    </svg>
  );
}
