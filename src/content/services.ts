export const servicesContent = {
  eyebrow: "What we do",
  heading: {
    lead: "Three things,",
    accent: "done properly",
  },
  lead: "A short list on purpose. Everything here ends in code you own — not in a file someone else has to interpret.",

  items: [
    {
      number: "01",
      title: "Interface build",
      body: "An approved design becomes a working front end: components, states, keyboard paths, the parts that only appear once something is real.",
      points: [
        "Component library",
        "Every state covered",
        "Accessibility built in",
      ],
    },
    {
      number: "02",
      title: "Design systems",
      body: "Tokens and primitives your team can read and extend, documented where the code lives rather than in a separate deck.",
      points: [
        "Calculated colour scales",
        "Type and spacing",
        "Usage rules in the repo",
      ],
    },
    {
      number: "03",
      title: "Motion and interaction",
      body: "Movement with a reason: transitions that explain what changed, and stay inside the performance budget on a mid-range phone.",
      points: [
        "Reduced-motion respected",
        "No layout thrash",
        "Measured, not guessed",
      ],
    },
  ],

  /**
   * The refusal is the positioning. A studio that lists everything is not a
   * studio with a specialism.
   */
  exclusions: {
    label: "Not our work",
    items: [
      "Brand identity from scratch",
      "Marketing campaigns",
      "SEO retainers",
      "CMS migrations",
    ],
  },
} as const;
