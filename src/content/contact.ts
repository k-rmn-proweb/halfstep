export const contactContent = {
  eyebrow: "Start something",
  heading: {
    lead: "Tell us what needs",
    accent: "to be built",
  },
  lead: "A paragraph about the product and where it hurts is enough to start. We reply with a view on scope, not a questionnaire.",

  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    project: {
      label: "Company or project",
      placeholder: "Optional",
      optional: "Optional",
    },
    message: {
      label: "What needs building",
      placeholder:
        "The product, the part that is not working, and roughly when you need it.",
    },
  },

  submit: { idle: "Send enquiry", pending: "Sending…" },

  /**
   * Stated before submitting rather than after: a visitor who wants a real
   * reply should know where to send it while they still have the choice.
   */
  demoNotice: {
    text: "This form validates on the server but stores nothing — Halfstep is a portfolio piece. For a real reply, email",
    email: "konrmn.webdev@gmail.com",
  },

  success: {
    title: "Validated, not delivered",
    body: "Everything checked out on the server. Nothing was stored, because there is no studio waiting on the other end — the demonstration is the validation path itself.",
    again: "Send another",
  },

  formError: "Something went wrong on our side. Try again in a moment.",
} as const;
