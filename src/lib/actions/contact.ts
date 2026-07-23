"use server";

import type {
  ContactFieldName,
  ContactFormState,
} from "@/lib/contact-form-state";
import { contactSchema } from "@/lib/schemas/contact";

/**
 * Validates a contact submission and reports the result.
 *
 * Deliberately stores nothing: Halfstep is a portfolio piece, and a form that
 * quietly discards a real enquiry while claiming to have received it would be
 * worse than no form at all. The page says as much next to the fields — what is
 * demonstrated here is the validation path, not a mailbox.
 *
 * Validation runs on the server, so it holds with JavaScript disabled too.
 */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    project: String(formData.get("project") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Partial<Record<ContactFieldName, string>> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactFieldName | undefined;
      if (field && !errors[field]) errors[field] = issue.message;
    }

    return { status: "error", errors, values };
  }

  // Stand in for the work a real submission would do, so the pending state is
  // visible rather than theoretical.
  await new Promise((resolve) => setTimeout(resolve, 700));

  return { status: "success", errors: {}, values: {} };
}
