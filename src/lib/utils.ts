import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our type scale and palette
 * are custom, so `text-brand-foreground` and `text-small` looked like the same
 * class group to it and the colour was silently dropped — which is how every
 * primary button ended up with ink on vermilion at 3.26:1.
 *
 * Teaching it the two groups fixes that. Add new tokens here when the palette
 * or the scale grows.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: ["display", "h1", "h2", "h3", "lead", "body", "small", "label"],
        },
      ],
      "text-color": [
        {
          text: [
            "ink",
            "ink-muted",
            "ink-faint",
            "brand",
            "brand-ink",
            "brand-vivid",
            "brand-foreground",
            "canvas",
            "canvas-subtle",
            "surface",
          ],
        },
      ],
    },
  },
});

/** Merge conditional class names and resolve conflicting Tailwind utilities. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
