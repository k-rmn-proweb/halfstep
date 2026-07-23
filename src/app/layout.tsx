import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { siteUrl } from "@/config/site-url";
import { metaContent } from "@/content/meta";
import { navContent } from "@/content/nav";
import { structuredData } from "@/lib/structured-data";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Display face. A serif's metrics sit far from the system fallback, so the
 * `size-adjust` fallback that next/font generates matters more here than usual:
 * without it the swap would shift the hero, which is the LCP element. It is on
 * by default — do not disable it.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below — canonical, OG image — absolute.
  metadataBase: new URL(siteUrl),
  title: {
    default: metaContent.title,
    template: metaContent.titleTemplate,
  },
  description: metaContent.description,
  applicationName: siteConfig.name,
  keywords: [...metaContent.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    title: metaContent.title,
    description: metaContent.description,
    locale: siteConfig.locale,
    // The image comes from app/opengraph-image.tsx by file convention.
  },
  twitter: {
    card: "summary_large_image",
    title: metaContent.title,
    description: metaContent.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: brandColors.canvas,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Scroll-reveal blocks are server-rendered at opacity 0 and only become
          visible once Motion runs. Without scripting they would stay invisible,
          so reveal them outright.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a
          href="#main"
          className="sr-only rounded-full bg-brand px-5 py-3 text-small text-brand-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          {navContent.skipToContent}
        </a>

        <Providers>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>

        {/* Structured data: rendered last so it never delays the content. */}
        <script
          type="application/ld+json"
          // Serialised from a typed object we control — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
