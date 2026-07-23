export const workContent = {
  eyebrow: "Selected work",
  heading: {
    lead: "Four fragments,",
    accent: "all of them running",
  },
  lead: "Every project below is represented by a piece of its actual interface rather than a screenshot of one. Use them — they respond.",

  /**
   * Fictional projects, deliberately neutral: no real company is implied.
   * Each `fragment` key maps to a component in this folder.
   */
  cases: [
    {
      id: "ledgerline",
      name: "Ledgerline",
      meta: "2026 · Financial operations",
      summary:
        "A command palette that reaches every account, ledger and report without leaving the keyboard.",
      fragment: "palette",
    },
    {
      id: "tideway",
      name: "Tideway",
      meta: "2025 · Logistics dashboard",
      summary:
        "Loading, empty and error states designed as first-class screens instead of afterthoughts.",
      fragment: "states",
    },
    {
      id: "sundial",
      name: "Sundial",
      meta: "2025 · Health platform",
      summary:
        "A token layer the product team can read, so design decisions survive contact with the codebase.",
      fragment: "tokens",
    },
    {
      id: "overtone",
      name: "Overtone",
      meta: "2024 · Subscription billing",
      summary:
        "A pricing switch where the numbers move as deliberately as the copy reads.",
      fragment: "pricing",
    },
  ],

  fragments: {
    palette: {
      placeholder: "Search accounts, ledgers…",
      hint: "Type to filter",
      items: [
        { label: "Open ledger", group: "Navigate" },
        { label: "Reconcile account", group: "Action" },
        { label: "Export statement", group: "Action" },
        { label: "Payment runs", group: "Navigate" },
        { label: "Audit trail", group: "Navigate" },
      ],
      empty: "No matches",
    },
    states: {
      label: "Shipment queue",
      options: [
        { id: "loading", label: "Loading" },
        { id: "empty", label: "Empty" },
        { id: "ready", label: "Ready" },
      ],
      rows: [
        { code: "TW-4182", route: "Rotterdam → Leeds", status: "In transit" },
        { code: "TW-4187", route: "Gdańsk → Malmö", status: "Customs" },
        { code: "TW-4193", route: "Bilbao → Nantes", status: "Loading" },
      ],
      emptyTitle: "Nothing in the queue",
      emptyBody: "Shipments appear here the moment a carrier accepts them.",
    },
    tokens: {
      hint: "Pick a token",
      items: [
        { name: "surface/raised", value: "oklch(1 0 0)", swatch: "bg-surface" },
        {
          name: "text/primary",
          value: "oklch(0.22 0.02 70)",
          swatch: "bg-ink",
        },
        {
          name: "text/quiet",
          value: "oklch(0.544 0.02 70)",
          swatch: "bg-ink-muted",
        },
        {
          name: "accent/default",
          value: "oklch(0.55 0.19 35)",
          swatch: "bg-brand",
        },
      ],
      note: "Contrast checked against every surface it lands on.",
    },
    pricing: {
      terms: [
        { id: "monthly", label: "Monthly", price: 48, note: "per seat" },
        {
          id: "yearly",
          label: "Yearly",
          price: 39,
          note: "per seat, billed annually",
        },
      ],
      saving: "Save 19%",
    },
  },
} as const;
