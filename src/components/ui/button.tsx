import Link from "next/link";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-colors duration-200 ease-out-quart whitespace-nowrap";

/**
 * `primary` is the only vermilion that may sit behind a label: the brand token
 * clears 4.5:1 against white text, while the vivid one does not.
 */
const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-ink",
  secondary:
    "border border-edge-strong bg-surface text-ink hover:bg-surface-hover",
  ghost: "text-ink hover:bg-canvas-subtle",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-small",
  lg: "h-13 px-7 text-body",
};

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href">)
  | ({ href?: undefined } & React.ComponentProps<"button">)
);

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
