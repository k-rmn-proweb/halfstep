/** Identity and structural values. Prose belongs in `src/content/`. */
export const siteConfig = {
  name: "Halfstep",
  /** Used in metadata and the wordmark's accessible label. */
  legalName: "Halfstep Studio",
  locale: "en_US",
  author: {
    name: "Konstantin",
    url: "https://github.com/",
  },
  /** Section anchors, in page order. Labels live in `content/nav.ts`. */
  anchors: {
    services: "services",
    work: "work",
    process: "process",
    testimonials: "testimonials",
    contact: "contact",
  },
} as const;
