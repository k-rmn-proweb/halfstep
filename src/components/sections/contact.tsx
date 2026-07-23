import { siteConfig } from "@/config/site";
import { contactContent } from "@/content/contact";
import { Eyebrow, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id={siteConfig.anchors.contact} width="lead">
      <Reveal>
        <Eyebrow>{contactContent.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-h2 text-balance">
          {contactContent.heading.lead}{" "}
          <em className="text-brand-ink italic">
            {contactContent.heading.accent}
          </em>
        </h2>
        <p className="mt-6 text-lead text-ink-muted">{contactContent.lead}</p>
      </Reveal>

      <Reveal delay={0.08} className="mt-12">
        <ContactForm />
      </Reveal>
    </Section>
  );
}
