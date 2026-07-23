import { z } from "zod";

/**
 * Server-side only. Kept out of the action module because a `"use server"` file
 * may export nothing but async functions, and out of the client's import path
 * because anything a Client Component imports ships to the browser — a form
 * importing this would bundle all of Zod with it.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "That name is longer than we can store."),
  email: z.email("That address does not look right."),
  project: z
    .string()
    .trim()
    .max(80, "Keep this one short.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about the work, please.")
    .max(2000, "That is longer than this form accepts."),
});

export type ContactInput = z.infer<typeof contactSchema>;
