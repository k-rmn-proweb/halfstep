"use client";

import { useId, useState } from "react";
import * as m from "motion/react-m";

import { workContent } from "@/content/work";
import { transitions } from "@/lib/motion";

const { palette } = workContent.fragments;

/** Ledgerline: keyboard-first navigation, filtered as you type. */
export function FragmentPalette() {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const matches = palette.items.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="flex flex-1 flex-col gap-3">
      <label htmlFor={inputId} className="sr-only">
        {palette.hint}
      </label>
      <div className="flex items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-2">
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          className="size-4 shrink-0 text-ink-faint"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M10.5 10.5L14 14" strokeLinecap="round" />
        </svg>
        <input
          id={inputId}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={palette.placeholder}
          className="w-full bg-transparent text-small outline-none placeholder:text-ink-faint"
        />
        <kbd className="rounded border border-edge px-1.5 py-0.5 font-mono text-label text-ink-faint">
          ⌘K
        </kbd>
      </div>

      <ul
        className="flex flex-col gap-0.5"
        role="listbox"
        aria-label={palette.hint}
      >
        {matches.map((item, index) => (
          <m.li
            key={item.label}
            role="option"
            aria-selected={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...transitions.hover, delay: index * 0.03 }}
            className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-canvas-subtle"
          >
            <span className="text-small">{item.label}</span>
            <span className="font-mono text-label text-ink-faint">
              {item.group}
            </span>
          </m.li>
        ))}

        {matches.length === 0 && (
          <li className="px-2 py-1.5 text-small text-ink-muted">
            {palette.empty}
          </li>
        )}
      </ul>
    </div>
  );
}
