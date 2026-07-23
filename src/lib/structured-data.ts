import { siteConfig } from "@/config/site";
import { siteUrl } from "@/config/site-url";
import { metaContent } from "@/content/meta";
import { servicesContent } from "@/content/services";

/**
 * JSON-LD for the studio. `ProfessionalService` rather than `Organization`:
 * it is the narrower type, and the services it exposes are the ones the page
 * actually lists.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteUrl,
  description: metaContent.description,
  areaServed: "Worldwide",
  knowsAbout: [...metaContent.keywords],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: servicesContent.eyebrow,
    itemListElement: servicesContent.items.map((item) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: item.title,
        description: item.body,
      },
    })),
  },
} as const;
