import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * The mark is the name made literal: a full step and a half one. Drawn rather
 * than imported so it inherits `currentColor` and needs no asset request.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 shrink-0 text-brand"
        fill="currentColor"
      >
        <rect x="2" y="4" width="8" height="16" rx="2" />
        <rect x="14" y="12" width="8" height="8" rx="2" opacity="0.55" />
      </svg>
      <span className="font-display text-h3 leading-none tracking-tight">
        {siteConfig.name}
      </span>
    </span>
  );
}
