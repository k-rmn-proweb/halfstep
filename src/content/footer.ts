import { siteConfig } from "@/config/site";

export const footerContent = {
  tagline: "The step between design and code.",
  columns: [
    {
      heading: "Studio",
      links: [
        { href: `#${siteConfig.anchors.services}`, label: "Services" },
        { href: `#${siteConfig.anchors.work}`, label: "Work" },
        { href: `#${siteConfig.anchors.process}`, label: "Process" },
      ],
    },
    {
      heading: "Elsewhere",
      links: [
        { href: "#", label: "GitHub" },
        { href: "#", label: "Read.cv" },
        { href: "#", label: "Email" },
      ],
    },
  ],
  /**
   * Required by the PRD: the studio and its work are fictional, and the page
   * says so rather than implying a real practice.
   */
  disclaimer:
    "Halfstep is a fictional studio built as a portfolio piece. Projects and testimonials are illustrative.",
  copyright: `© 2026 ${siteConfig.legalName}`,
} as const;
