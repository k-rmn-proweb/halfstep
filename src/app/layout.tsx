import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
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
  title: siteConfig.name,
  description: "Design engineering studio.",
  applicationName: siteConfig.name,
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

        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
