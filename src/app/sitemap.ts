import type { MetadataRoute } from "next";

import { siteUrl } from "@/config/site-url";

/**
 * One page, by design — the cases live on it rather than behind their own
 * routes. Section anchors are deliberately absent: they are not separate URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
