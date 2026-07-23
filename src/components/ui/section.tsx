import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Alternating bands: `subtle` sets the warmer paper tone. */
  tone?: "canvas" | "subtle";
  width?: React.ComponentProps<typeof Container>["width"];
};

const tones = {
  canvas: "bg-canvas",
  subtle: "bg-canvas-subtle",
} as const;

/**
 * A band of the page. Owns vertical rhythm and background, nothing else —
 * headings and layout belong to the section component that renders it.
 */
export function Section({
  children,
  id,
  className,
  tone = "canvas",
  width = "page",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32", tones[tone], className)}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}

/**
 * The small mono label above a section heading. Uses `ink-faint`, which is only
 * legal here because it is uppercase mono at label size with wide tracking —
 * see the contrast note in ARCHITECTURE.md before reusing it on body copy.
 */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn("font-mono text-label text-ink-muted uppercase", className)}
    >
      {children}
    </p>
  );
}
