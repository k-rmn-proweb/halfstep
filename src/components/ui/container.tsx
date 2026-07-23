import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /**
   * `page` is the full content width; `lead` and `measure` cap prose so it
   * stays inside a readable 45-85 characters per line.
   */
  width?: "page" | "lead" | "measure";
};

const widths = {
  page: "max-w-page",
  lead: "max-w-lead",
  measure: "max-w-measure",
} as const;

export function Container({
  children,
  className,
  width = "page",
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-6 md:px-8", widths[width], className)}
    >
      {children}
    </div>
  );
}
