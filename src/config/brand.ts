/**
 * Hex mirrors of the oklch tokens in `app/globals.css`.
 *
 * A documented exception to "colours live in one stylesheet": Satori (the OG
 * image renderer) and the `theme-color` meta tag both sit outside the CSS
 * cascade and cannot read custom properties. These are the sRGB conversions of
 * the tokens — keep them in sync if the palette changes.
 */
export const brandColors = {
  brand: "#c83406",
  brandVivid: "#fd6844",
  brandInk: "#cd3a10",

  canvas: "#fefbf9",
  canvasSubtle: "#f6f3ef",
  surface: "#ffffff",

  ink: "#211910",
  inkMuted: "#786e64",
  inkFaint: "#8f877e",

  edge: "#e1ddd8",
  edgeStrong: "#c7c3bf",
} as const;
