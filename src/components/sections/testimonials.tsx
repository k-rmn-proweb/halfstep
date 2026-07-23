import { siteConfig } from "@/config/site";
import { testimonialsContent } from "@/content/testimonials";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <Section id={siteConfig.anchors.testimonials} tone="subtle">
      <Reveal>
        <Eyebrow>{testimonialsContent.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-h2 text-balance">
          {testimonialsContent.heading.lead}{" "}
          <em className="text-brand-ink italic">
            {testimonialsContent.heading.accent}
          </em>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonialsContent.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.06}>
            <figure className="flex h-full flex-col rounded-2xl border border-edge bg-surface p-6">
              {/*
                The quote sits in the display face at lead size: large enough
                for the serif to hold its contrast, small enough to read as
                speech rather than as a headline.
              */}
              <blockquote className="flex-1 font-display text-lead text-ink italic">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-6 border-t border-edge pt-5">
                <p className="text-small font-medium text-ink">{item.name}</p>
                <p className="mt-1 font-mono text-label text-ink-muted">
                  {item.role} · {item.company}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 font-mono text-label text-ink-muted">
          {testimonialsContent.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}
