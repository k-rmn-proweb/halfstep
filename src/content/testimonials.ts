export const testimonialsContent = {
  eyebrow: "What clients say",
  heading: {
    lead: "Reactions from",
    accent: "the other side",
  },
  /** Required by the PRD: these are illustrative, and the page says so. */
  disclaimer: "Illustrative quotes from the fictional projects above.",

  items: [
    {
      quote:
        "We had approved the design twice already. This was the first time the thing we approved was the thing that shipped.",
      name: "M. Halvorsen",
      role: "Head of Product",
      company: "Ledgerline",
    },
    {
      quote:
        "They spent a week on empty states. I thought it was a waste. Support tickets fell by a third that quarter.",
      name: "R. Okonkwo",
      role: "Operations Lead",
      company: "Tideway",
    },
    {
      quote:
        "The handover was a repository with the reasoning written next to the code. Our team was extending it the same week.",
      name: "J. Farrow",
      role: "Engineering Manager",
      company: "Sundial",
    },
  ],
} as const;
