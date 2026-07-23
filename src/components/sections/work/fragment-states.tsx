"use client";

import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { workContent } from "@/content/work";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { states } = workContent.fragments;
type StateId = (typeof states.options)[number]["id"];

/** Tideway: the three screens most products leave until last. */
export function FragmentStates() {
  const [active, setActive] = useState<StateId>("ready");
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div
        className="flex gap-0.5 self-start rounded-lg border border-edge bg-surface p-0.5"
        role="tablist"
        aria-label={states.label}
      >
        {states.options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active === option.id}
            onClick={() => setActive(option.id)}
            className={cn(
              "rounded-md px-2.5 py-1 font-mono text-label transition-colors duration-200",
              active === option.id
                ? "bg-ink text-canvas"
                : "text-ink-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={active}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={transitions.hover}
          className="flex flex-1 flex-col"
        >
          {active === "loading" && (
            <ul className="flex flex-col gap-2" aria-hidden="true">
              {states.rows.map((row, index) => (
                <li
                  key={row.code}
                  className="h-9 animate-pulse rounded-md bg-canvas-subtle"
                  style={{ animationDelay: `${index * 120}ms` }}
                />
              ))}
            </ul>
          )}

          {active === "empty" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
              <p className="text-small font-medium text-ink">
                {states.emptyTitle}
              </p>
              <p className="max-w-[34ch] text-small text-ink-muted">
                {states.emptyBody}
              </p>
            </div>
          )}

          {active === "ready" && (
            <ul className="flex flex-col">
              {states.rows.map((row) => (
                <li
                  key={row.code}
                  className="flex items-center justify-between gap-3 border-b border-edge py-2 last:border-b-0"
                >
                  <span className="font-mono text-label text-ink-muted">
                    {row.code}
                  </span>
                  <span className="flex-1 truncate text-small">
                    {row.route}
                  </span>
                  <span className="shrink-0 font-mono text-label text-brand-ink">
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
}
