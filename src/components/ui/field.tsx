import { cn } from "@/lib/utils";

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email";
  defaultValue?: string;
  error?: string;
  optional?: string;
  multiline?: boolean;
  rows?: number;
};

const control =
  "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-body " +
  "placeholder:text-ink-muted transition-colors duration-200 outline-none " +
  "focus-visible:border-brand";

/**
 * One labelled control. Errors are wired through `aria-describedby` rather than
 * colour alone, so the reason a field was rejected reaches a screen reader.
 */
export function Field({
  name,
  label,
  placeholder,
  type = "text",
  defaultValue,
  error,
  optional,
  multiline = false,
  rows = 5,
}: FieldProps) {
  const errorId = `${name}-error`;

  const shared = {
    id: name,
    name,
    placeholder,
    defaultValue,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: cn(control, error ? "border-brand" : "border-edge-strong"),
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="flex gap-2 text-small text-ink">
        {label}
        {optional && (
          <span className="font-normal text-ink-muted">({optional})</span>
        )}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          rows={rows}
          className={cn(shared.className, "resize-y")}
        />
      ) : (
        <input {...shared} type={type} />
      )}

      {error && (
        <p id={errorId} className="text-small text-brand-ink">
          {error}
        </p>
      )}
    </div>
  );
}
