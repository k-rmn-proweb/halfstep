import Link from "next/link";

import { siteConfig } from "@/config/site";
import { footerContent } from "@/content/footer";
import { Container } from "@/components/ui/container";

const { call, colophon, columns, disclaimer, copyright } = footerContent;

export function Footer() {
  return (
    <footer className="overflow-hidden border-t border-edge bg-canvas-subtle">
      <Container className="pt-20 pb-10">
        {/* The closing call, at heading scale rather than tucked into a corner. */}
        <p className="max-w-lead font-display text-h1 text-balance">
          {call.lead} <em className="text-brand-ink italic">{call.accent}</em>
        </p>

        <a
          href={`mailto:${call.email}`}
          className="group mt-6 inline-flex items-baseline gap-3 text-lead text-ink transition-colors duration-200 hover:text-brand-ink"
        >
          <span className="underline decoration-1 underline-offset-4">
            {call.email}
          </span>
          <span
            aria-hidden="true"
            className="transition-transform duration-200 ease-out-quart group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <div className="mt-16 grid gap-10 border-t border-edge pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-label text-ink-muted uppercase">
              {colophon.heading}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {colophon.lines.map((line) => (
                <li key={line} className="flex gap-3 text-small text-ink-muted">
                  <span className="shrink-0 text-brand-ink" aria-hidden="true">
                    —
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.heading} className="md:col-span-3">
              <p className="font-mono text-label text-ink-muted uppercase">
                {column.heading}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-small text-ink transition-colors duration-200 hover:text-brand-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      {/*
        The wordmark as a closing mark rather than a logo: oversized, cropped by
        the viewport edge, and hidden from assistive tech — the name is already
        announced by the header link, so repeating it here would be noise.

        `ink-faint` rather than a lighter tone on purpose: an audit checks the
        contrast of anything visible, `aria-hidden` or not, and this is the one
        place on the site large enough for the 3:1 tone to be legal.
      */}
      <div
        aria-hidden="true"
        className="mt-12 overflow-hidden px-6 md:px-8"
        // The crop is the point: the descender is cut off by the container
        // rather than allowed to overlap the line below it.
      >
        <p className="-mb-[0.24em] font-display text-[clamp(4rem,17vw,16rem)] leading-[0.8] tracking-tighter text-ink-faint select-none">
          {siteConfig.name}
        </p>
      </div>

      <Container className="border-t border-edge py-6">
        <div className="flex flex-col gap-2 text-small text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lead">{disclaimer}</p>
          <p className="shrink-0">
            {copyright} {siteConfig.legalName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
