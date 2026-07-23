import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { siteHost } from "@/config/site-url";
import { metaContent } from "@/content/meta";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = metaContent.og.alt;

/**
 * Generated at build time into a static PNG.
 *
 * Satori supports a narrow subset of CSS — flexbox only, no custom properties,
 * no oklch — so colours come from the hex mirrors in config/brand.ts and every
 * element declares its display. Two traps worth naming, because both fail
 * silently rather than erroring:
 *
 *   1. There is no blur filter. A soft glow has to be a radial gradient.
 *   2. An absolutely positioned element gets no size from `inset` alone, and a
 *      zero-sized element paints no background at all.
 */
export default async function OpengraphImage() {
  // Instrument Serif ships as a static font, so it can be handed to Satori as
  // is — a variable font would need an instance extracted first.
  const displayFont = await readFile(
    join(process.cwd(), "public/fonts/instrument-serif.ttf"),
  );

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: brandColors.canvas,
        color: brandColors.ink,
        fontFamily: "sans-serif",
      }}
    >
      {/* Vermilion bloom — a gradient, since Satori cannot blur a circle. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          // Explicit box: without it Satori gives this element no size and
          // the gradient never paints.
          width: size.width,
          height: size.height,
          display: "flex",
          background:
            "radial-gradient(circle at 88% 8%, rgba(253, 104, 68, 0.42) 0%, rgba(253, 104, 68, 0.12) 32%, rgba(254, 251, 249, 0) 62%)",
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
          <div
            style={{
              width: 18,
              height: 44,
              borderRadius: 6,
              background: brandColors.brand,
            }}
          />
          <div
            style={{
              width: 18,
              height: 22,
              borderRadius: 6,
              background: brandColors.brand,
              opacity: 0.55,
              marginTop: 22,
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontFamily: "Instrument Serif",
          }}
        >
          {siteConfig.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: brandColors.inkMuted,
          }}
        >
          {metaContent.og.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
            fontFamily: "Instrument Serif",
          }}
        >
          {metaContent.og.headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: `1px solid ${brandColors.edge}`,
          fontSize: 24,
          color: brandColors.inkMuted,
        }}
      >
        <div style={{ display: "flex" }}>{metaContent.og.footer}</div>
        <div style={{ display: "flex" }}>{siteHost}</div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: displayFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
