import { siteConfig } from "@/config/site";

export const footerContent = {
  /** The closing call, set large — the footer's own hero line. */
  call: {
    lead: "Something that needs",
    accent: "building?",
    email: "konrmn.webdev@gmail.com",
  },

  /**
   * A colophon, in the printed sense: what this page is made of. A studio whose
   * claim is "we hand over the code" can afford to publish its own — and every
   * line of it is true of the repository you are reading.
   */
  colophon: {
    heading: "Colophon",
    lines: [
      "Set in Instrument Serif, Geist and Geist Mono.",
      "Colour declared in oklch; every quiet tone solved for its contrast target rather than picked by eye.",
      "Next.js and Tailwind, animated with Motion under a strict feature set.",
      "No images: the fragments above are running code.",
    ],
  },

  columns: [
    {
      heading: "Studio",
      links: [
        { href: `#${siteConfig.anchors.services}`, label: "Services" },
        { href: `#${siteConfig.anchors.work}`, label: "Work" },
        { href: `#${siteConfig.anchors.process}`, label: "Process" },
        { href: `#${siteConfig.anchors.contact}`, label: "Contact" },
      ],
    },
    {
      heading: "Elsewhere",
      links: [
        {
          href: "https://github.com/k-rmn-proweb/halfstep",
          label: "Source on GitHub",
        },
        { href: "https://vercel.com/", label: "Deployed on Vercel" },
      ],
    },
  ],

  /**
   * Required by the PRD: the studio and its work are fictional, and the page
   * says so rather than implying a real practice.
   */
  disclaimer:
    "Halfstep is a fictional studio, built as a portfolio piece. Projects and testimonials are illustrative.",
  copyright: "© 2026",
} as const;
