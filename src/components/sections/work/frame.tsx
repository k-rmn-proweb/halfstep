import { cn } from "@/lib/utils";

/**
 * The window every fragment sits in. Fixes a minimum height so a fragment
 * changing state never resizes the grid around it.
 */
export function Frame({
  children,
  caption,
  className,
}: {
  children: React.ReactNode;
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-56 flex-col rounded-xl border border-edge bg-canvas",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-edge px-4 py-2.5">
        <span className="font-mono text-label text-ink-muted">{caption}</span>
        <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col p-4">{children}</div>
    </div>
  );
}
