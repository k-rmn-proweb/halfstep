/**
 * The shape the client form needs, in its own module.
 *
 * This exists for weight, not tidiness: the form is a Client Component, so
 * everything it imports is downloaded by the browser. Importing this from the
 * schema module would ship Zod to every visitor. Types cross freely —
 * `import type` is erased before bundling.
 */
export type ContactFieldName = "name" | "email" | "project" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  /** One message per field that failed validation. */
  errors: Partial<Record<ContactFieldName, string>>;
  /** Echoed back so a rejected submission does not clear what was typed. */
  values: Partial<Record<ContactFieldName, string>>;
  /** Set when something failed that is not a field problem. */
  formError?: string;
};

export const initialContactFormState: ContactFormState = {
  status: "idle",
  errors: {},
  values: {},
};
