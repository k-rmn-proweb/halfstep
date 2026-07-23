"use client";

import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { workContent } from "@/content/work";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { pricing } = workContent.fragments;
type TermId = (typeof pricing.terms)[number]["id"];

/** Overtone: a switch where the number moves as deliberately as the copy. */
export function FragmentPricing() {
  const [term, setTerm] = useState<TermId>("monthly");
  const reduceMotion = useReducedMotion();

  const active = pricing.terms.find((option) => option.id === term)!;
  const yearly = term === "yearly";

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div
        className="flex gap-0.5 self-start rounded-full border border-edge bg-surface p-0.5"
        role="group"
        aria-label="Billing term"
      >
        {pricing.terms.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={term === option.id}
            onClick={() => setTerm(option.id)}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-label transition-colors duration-200",
              term === option.id
                ? "bg-ink text-canvas"
                : "text-ink-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span className="font-sans text-h3 text-ink-muted">$</span>
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={active.price}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={transitions.hover}
              className="font-display text-h1 leading-none"
            >
              {active.price}
            </m.span>
          </AnimatePresence>

          <AnimatePresence>
            {yearly && (
              <m.span
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={transitions.hover}
                className="ml-2 rounded-full bg-brand px-2 py-0.5 font-mono text-label text-brand-foreground"
              >
                {pricing.saving}
              </m.span>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-2 text-small text-ink-muted" aria-live="polite">
          {active.note}
        </p>
      </div>
    </div>
  );
}
