import type { Metadata } from "next";

export const SITE_NAME = "DriveTest Pro";
export const SITE_URL = "https://www.driverguide.ca";
export const SITE_DESCRIPTION =
  "Prepare for Ontario's G1 knowledge test with MTO-based study guides, road sign and rules practice, realistic 40-question simulations, and AI explanations.";
export const ORGANIZATION_AUTHOR = {
  name: SITE_NAME,
  url: SITE_URL,
};
export const SOCIAL_IMAGE_PATH = "/opengraph-image";

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

export function conciseDescription(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;

  const shortened = normalized.slice(0, maxLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const boundary = lastSpace > maxLength * 0.6 ? lastSpace : shortened.length;
  return `${shortened.slice(0, boundary).trimEnd()}…`;
}

type PublicMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function publicMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
  absoluteTitle = false,
}: PublicMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;
  const image = {
    url: absoluteUrl(SOCIAL_IMAGE_PATH),
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} — Ontario G1 test preparation`,
  };

  return {
    title: absoluteTitle ? { absolute: socialTitle } : title,
    description,
    authors: [ORGANIZATION_AUTHOR],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          noarchive: true,
          nosnippet: true,
          googleBot: {
            index: false,
            follow: false,
            noarchive: true,
            nosnippet: true,
          },
        }
      : {
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
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_CA",
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image.url],
    },
  };
}

export const privateMetadata: Metadata = {
  title: "Private Area",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    },
  },
};
