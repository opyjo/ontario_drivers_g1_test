import type React from "react";
import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { AIAssistantButton } from "@/components/ai-assistant-button";
import { JsonLd } from "@/components/seo/json-ld";
import {
  absoluteUrl,
  ORGANIZATION_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Ontario G1 Practice Tests & Study Guide | DriveTest Pro",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  authors: [ORGANIZATION_AUTHOR],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  generator: "Next.js",
  category: "education",
  alternates: { canonical: SITE_URL },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Ontario G1 Practice Tests & Study Guide | DriveTest Pro",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_CA",
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "DriveTest Pro — Ontario G1 test preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ontario G1 Practice Tests & Study Guide | DriveTest Pro",
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/opengraph-image")],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} antialiased`}
    >
      <body className="font-sans">
        <JsonLd
          id="organization-json-ld"
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": organizationId,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Ontario, Canada",
            },
            knowsAbout: [
              "Ontario G1 knowledge test",
              "Ontario road signs",
              "Ontario rules of the road",
              "driver education",
            ],
          }}
        />
        <JsonLd
          id="website-json-ld"
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": websiteId,
            name: SITE_NAME,
            url: SITE_URL,
            description: SITE_DESCRIPTION,
            inLanguage: "en-CA",
            publisher: { "@id": organizationId },
          }}
        />
        <AuthProvider>
          <QueryProvider>
            <Navigation />
            {children}
            <AIAssistantButton />
          </QueryProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
      {googleAnalyticsId ? <GoogleAnalytics gaId={googleAnalyticsId} /> : null}
    </html>
  );
}
