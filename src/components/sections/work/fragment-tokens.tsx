"use client";

import { useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { workContent } from "@/content/work";
import { transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

const { tokens } = workContent.fragments;
type TokenName = (typeof tokens.items)[number]["name"];

/** Sundial: the token layer, readable by the people who consume it. */
export function FragmentTokens() {
  const [selected, setSelected] = useState<TokenName>(tokens.items[0]!.name);
  const reduceMotion = useReducedMotion();

  const active = tokens.items.find((item) => item.name === selected)!;

  return (
    <div className="flex flex-1 flex-col gap-3">
      <ul className="flex flex-col gap-0.5">
        {tokens.items.map((item) => (
          <li key={item.name}>
            <button
              type="button"
              onClick={() => setSelected(item.name)}
              aria-pressed={selected === item.name}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors duration-200",
                selected === item.name
                  ? "bg-canvas-subtle"
                  : "hover:bg-canvas-subtle/60",
              )}
            >
              <span
                className={cn(
                  "size-4 shrink-0 rounded border border-edge",
                  item.swatch,
                )}
                aria-hidden="true"
              />
              <span className="font-mono text-label text-ink">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-edge pt-3">
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={active.name}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={transitions.hover}
            className="font-mono text-label text-brand-ink"
          >
            {active.value}
          </m.p>
        </AnimatePresence>
        <p className="mt-1 text-small text-ink-muted">{tokens.note}</p>
      </div>
    </div>
  );
}
