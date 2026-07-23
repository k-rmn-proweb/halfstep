import { siteConfig } from "@/config/site";

/** Header and footer navigation labels. Hrefs come from `config/site.ts`. */
export const navContent = {
  items: [
    { href: `#${siteConfig.anchors.services}`, label: "Services" },
    { href: `#${siteConfig.anchors.work}`, label: "Work" },
    { href: `#${siteConfig.anchors.process}`, label: "Process" },
  ],
  cta: { href: `#${siteConfig.anchors.contact}`, label: "Start a project" },
  /** Accessible labels for the mobile menu toggle. */
  menu: {
    open: "Open menu",
    close: "Close menu",
  },
  skipToContent: "Skip to content",
} as const;
