/**
 * The canonical origin, resolved once.
 *
 * `NEXT_PUBLIC_SITE_URL` wins when set — it is the only value that survives a
 * custom domain. Vercel's own variable covers preview and production builds
 * before a domain exists; localhost is the last resort so `next build` never
 * fails for want of a URL.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
export const siteHost = new URL(siteUrl).host;
