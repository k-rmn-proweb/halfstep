import { siteConfig } from "@/config/site";
import { servicesContent } from "@/content/services";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

export function Services() {
  return (
    <Section id={siteConfig.anchors.services}>
      <Reveal>
        <Eyebrow>{servicesContent.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-h2 text-balance">
          {servicesContent.heading.lead}{" "}
          <em className="text-brand-ink italic">
            {servicesContent.heading.accent}
          </em>
        </h2>
        <p className="mt-6 max-w-measure text-lead text-ink-muted">
          {servicesContent.lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {servicesContent.items.map((item, index) => (
          <Reveal key={item.number} delay={index * 0.06}>
            <article className="flex h-full flex-col rounded-2xl border border-edge bg-surface p-6">
              <p className="font-mono text-label text-brand-ink">
                {item.number}
              </p>
              <h3 className="mt-3 font-display text-h3">{item.title}</h3>
              <p className="mt-3 text-small text-ink-muted">{item.body}</p>

              <ul className="mt-6 flex flex-col gap-2 border-t border-edge pt-5">
                {item.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-small"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      {/* The refusal, stated plainly — it is what makes the list above a specialism. */}
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-col gap-3 border-t border-edge pt-6 sm:flex-row sm:items-center sm:gap-6">
          <p className="shrink-0 font-mono text-label text-ink-muted uppercase">
            {servicesContent.exclusions.label}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-small text-ink-muted">
            {servicesContent.exclusions.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
