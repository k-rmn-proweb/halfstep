import { siteConfig } from "@/config/site";
import { workContent } from "@/content/work";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";

import { WorkCard } from "./card";

export function Work() {
  return (
    <Section id={siteConfig.anchors.work} tone="subtle">
      <Reveal>
        <Eyebrow>{workContent.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-h2 text-balance">
          {workContent.heading.lead}{" "}
          <em className="text-brand-ink italic">
            {workContent.heading.accent}
          </em>
        </h2>
        <p className="mt-6 max-w-measure text-lead text-ink-muted">
          {workContent.lead}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {workContent.cases.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06}>
            <WorkCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
