import { siteConfig } from "@/config/site";
import { processContent } from "@/content/process";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Process() {
  return (
    <Section id={siteConfig.anchors.process}>
      <Reveal>
        <Eyebrow>{processContent.eyebrow}</Eyebrow>
        <h2 className="mt-4 max-w-lead font-display text-h2 text-balance">
          {processContent.heading.lead}{" "}
          <em className="text-brand-ink italic">
            {processContent.heading.accent}
          </em>
        </h2>
        <p className="mt-6 max-w-measure text-lead text-ink-muted">
          {processContent.lead}
        </p>
      </Reveal>

      <ol className="mt-14 flex flex-col">
        {processContent.steps.map((step, index) => (
          <Reveal
            key={step.number}
            as="li"
            delay={index * 0.05}
            className="grid gap-x-8 gap-y-3 border-t border-edge py-8 md:grid-cols-12"
          >
            <div className="flex items-baseline gap-4 md:col-span-3 md:flex-col md:gap-2">
              <span className="font-display text-h2 leading-none text-brand-ink">
                {step.number}
              </span>
              <span className="font-mono text-label text-ink-muted">
                {step.duration}
              </span>
            </div>

            <div className="md:col-span-9">
              <h3 className="font-display text-h3">{step.title}</h3>
              <p className="mt-3 max-w-measure text-body text-ink-muted">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
