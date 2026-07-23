import { siteConfig } from "@/config/site";

export const heroContent = {
  eyebrow: "Design engineering studio",
  /**
   * Split so the accent can be italic: Instrument Serif has no bold, so
   * emphasis inside a headline is made with italic and colour instead.
   */
  headline: {
    lead: "Design that arrives",
    accent: "already built",
  },
  lead: "We don't hand off mockups for someone else to interpret. The interface you approve is the interface that ships.",
  primaryCta: {
    href: `#${siteConfig.anchors.contact}`,
    label: "Start a project",
  },
  secondaryCta: { href: `#${siteConfig.anchors.work}`, label: "See work" },

  /** The working fragment beside the headline — the section's own evidence. */
  visual: {
    label: "Not a screenshot",
    filename: "approve.tsx",
    action: "Approve design",
    states: {
      idle: "waiting for approval",
      sending: "building",
      shipped: "shipped to production",
    },
  },
} as const;
