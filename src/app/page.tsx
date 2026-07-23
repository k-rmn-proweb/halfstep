import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Phase 0 scaffold: a live proof sheet for the design system, not the landing
 * page. It exists so the type scale, palette and reveal behaviour can be looked
 * at in a browser before any section is built, and gets replaced in Phase 2.
 */

const swatches = [
  { token: "canvas", className: "bg-canvas" },
  { token: "canvas-subtle", className: "bg-canvas-subtle" },
  { token: "surface", className: "bg-surface" },
  { token: "edge", className: "bg-edge" },
  { token: "edge-strong", className: "bg-edge-strong" },
  { token: "ink-faint", className: "bg-ink-faint" },
  { token: "ink-muted", className: "bg-ink-muted" },
  { token: "ink", className: "bg-ink" },
  { token: "brand", className: "bg-brand" },
  { token: "brand-vivid", className: "bg-brand-vivid" },
];

const steps = [
  { token: "display", className: "text-display font-display" },
  { token: "h1", className: "text-h1 font-display" },
  { token: "h2", className: "text-h2 font-display" },
  { token: "h3", className: "text-h3 font-sans font-medium" },
  { token: "lead", className: "text-lead font-sans" },
  { token: "body", className: "text-body font-sans" },
  { token: "small", className: "text-small font-sans" },
];

export default function Home() {
  return (
    <div className="py-24 md:py-32">
      <Container>
        <p className="font-mono text-label text-ink-faint uppercase">
          Phase 0 — design system proof
        </p>

        {/*
          Not wrapped in Reveal on purpose: this is the LCP element, and
          starting it at opacity 0 would delay the metric it is measured by.
        */}
        <h1 className="mt-6 font-display text-display text-balance">
          We don&apos;t hand over{" "}
          <em className="text-brand-ink italic">mockups</em>. We hand over the
          interface.
        </h1>

        <p className="mt-8 max-w-lead text-lead text-ink-muted">
          Halfstep is the step between design and code — the one that usually
          goes missing. Everything below is a token, calculated rather than
          picked by eye.
        </p>
      </Container>

      <Container className="mt-24">
        <Reveal>
          <h2 className="font-display text-h2">Type scale</h2>
        </Reveal>

        <div className="mt-10 flex flex-col gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.token} delay={i * 0.04}>
              <div className="flex flex-col gap-2 border-t border-edge pt-4 md:flex-row md:gap-8">
                <span className="shrink-0 pt-2 font-mono text-label text-ink-faint uppercase md:w-32">
                  {step.token}
                </span>
                <span className={step.className}>
                  Interfaces that ship, not decks
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="mt-24">
        <Reveal>
          <h2 className="font-display text-h2">Palette</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {swatches.map((swatch) => (
              <div key={swatch.token} className="flex flex-col gap-2">
                <div
                  className={`h-20 rounded-lg border border-edge ${swatch.className}`}
                />
                <span className="font-mono text-label text-ink-muted">
                  {swatch.token}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>

      <Container className="mt-24">
        <Reveal>
          <h2 className="font-display text-h2">Contrast rules</h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-brand p-6 text-brand-foreground">
              <p className="text-small">
                <code className="font-mono">brand</code> under white text —
                5.31:1. The only vermilion that may sit behind a label.
              </p>
            </div>
            <div className="rounded-lg border border-edge bg-surface p-6">
              <p className="text-small text-brand-ink">
                <code className="font-mono">brand-ink</code> as text on paper —
                4.50:1.
              </p>
            </div>
            <div className="rounded-lg bg-canvas-subtle p-6">
              <p className="text-lead text-ink-faint">
                <code className="font-mono">ink-faint</code> clears 3:1 only, so
                it is legal at this size and above — never on a caption.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
