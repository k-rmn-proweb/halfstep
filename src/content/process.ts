export const processContent = {
  eyebrow: "How it goes",
  heading: {
    lead: "Four steps, and the last one is",
    accent: "a repository",
  },
  lead: "The handover is the part most engagements get wrong, so we work backwards from it.",

  steps: [
    {
      number: "01",
      title: "Read the product",
      body: "We start in the product rather than the brief: what exists, what breaks, where people give up. A brief describes the ask; the product describes the problem.",
      duration: "Week 1",
    },
    {
      number: "02",
      title: "Prototype in code",
      body: "The first prototype is a URL, not a file. Decisions get made against something that actually responds — on a real screen, at a real speed.",
      duration: "Weeks 2–3",
    },
    {
      number: "03",
      title: "Build for the edges",
      body: "Loading, empty, error, offline, keyboard-only, translated, at 200% zoom. The states that decide whether an interface feels finished.",
      duration: "Weeks 4–7",
    },
    {
      number: "04",
      title: "Hand over the repository",
      body: "You receive a repository your team can run, extend and review — with the reasoning written down next to the code it explains.",
      duration: "Week 8",
    },
  ],
} as const;
