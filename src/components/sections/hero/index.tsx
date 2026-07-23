import { heroContent } from "@/content/hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section";

import { HeroUnderline } from "./underline";
import { HeroVisual } from "./visual";

/**
 * Editorial left flag: headline on the left, working evidence on the right.
 *
 * A server component — only the underline and the fragment are interactive, and
 * both sit behind their own client boundary. Nothing here fades in: the
 * headline is the LCP element and is painted at full opacity in the first frame.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-28">
      {/*
        Vermilion bloom. Decorative, sits behind everything, and never carries
        text — `brand-vivid` at low alpha would fail contrast if it did.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 -z-10 size-[42rem] rounded-full bg-radial from-glow from-0% to-transparent to-70% blur-2xl"
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Eyebrow>{heroContent.eyebrow}</Eyebrow>

            <h1 className="mt-6 font-display text-display text-balance">
              {heroContent.headline.lead}{" "}
              <span className="relative inline-block whitespace-nowrap">
                <em className="text-brand-ink italic">
                  {heroContent.headline.accent}
                </em>
                <HeroUnderline />
              </span>
            </h1>

            <p className="mt-8 max-w-measure text-lead text-ink-muted">
              {heroContent.lead}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href={heroContent.primaryCta.href} size="lg">
                {heroContent.primaryCta.label}
              </Button>
              <Button
                href={heroContent.secondaryCta.href}
                variant="ghost"
                size="lg"
              >
                {heroContent.secondaryCta.label}
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </Container>
    </section>
  );
}
