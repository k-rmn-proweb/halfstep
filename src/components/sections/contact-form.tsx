"use client";

import { useActionState, useState } from "react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import { contactContent } from "@/content/contact";
import { submitContact } from "@/lib/actions/contact";
import { initialContactFormState } from "@/lib/contact-form-state";
import { duration, easing, transitions } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

const { fields, submit, success, demoNotice } = contactContent;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactFormState,
  );
  // Lets a visitor return to an empty form after a successful submission
  // without the previous result reappearing.
  const [dismissed, setDismissed] = useState(false);
  const reduceMotion = useReducedMotion();

  const showSuccess = state.status === "success" && !dismissed;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showSuccess ? (
        <m.div
          key="success"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={transitions.reveal}
          className="flex flex-col items-start rounded-2xl border border-edge bg-surface p-8"
        >
          <span
            className="flex size-11 items-center justify-center rounded-full border border-brand text-brand"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 16 16"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <m.path
                d="M3 8.5L6.5 12L13 4.5"
                initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: duration.base,
                  ease: easing.outExpo,
                  delay: 0.1,
                }}
              />
            </svg>
          </span>

          <h3 className="mt-5 font-display text-h3">{success.title}</h3>
          <p className="mt-3 max-w-measure text-body text-ink-muted">
            {success.body}
          </p>

          <Button
            variant="secondary"
            className="mt-6"
            onClick={() => setDismissed(true)}
          >
            {success.again}
          </Button>
        </m.div>
      ) : (
        <m.form
          key="form"
          action={formAction}
          onSubmit={() => setDismissed(false)}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={transitions.reveal}
          className="flex flex-col gap-5"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              name="name"
              label={fields.name.label}
              placeholder={fields.name.placeholder}
              defaultValue={state.values.name}
              error={state.errors.name}
            />
            <Field
              name="email"
              type="email"
              label={fields.email.label}
              placeholder={fields.email.placeholder}
              defaultValue={state.values.email}
              error={state.errors.email}
            />
          </div>

          <Field
            name="project"
            label={fields.project.label}
            placeholder={fields.project.placeholder}
            optional={fields.project.optional}
            defaultValue={state.values.project}
            error={state.errors.project}
          />

          <Field
            name="message"
            multiline
            label={fields.message.label}
            placeholder={fields.message.placeholder}
            defaultValue={state.values.message}
            error={state.errors.message}
          />

          {state.formError && (
            <p className="text-small text-brand-ink" role="alert">
              {state.formError}
            </p>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="shrink-0 disabled:cursor-progress"
            >
              {isPending ? submit.pending : submit.idle}
            </Button>

            <p className="max-w-measure text-small text-ink-muted">
              {demoNotice.text}{" "}
              <a
                href={`mailto:${demoNotice.email}`}
                className="text-brand-ink underline underline-offset-2"
              >
                {demoNotice.email}
              </a>
              .
            </p>
          </div>
        </m.form>
      )}
    </AnimatePresence>
  );
}
