import type { Metadata } from "next";

export const SITE_URL = "https://heyitskunal.vercel.app";
export const SITE_NAME = "Kunal Builds";
export const SITE_TITLE = "Kunal Builds | Web & App Developer";
export const SITE_DESCRIPTION =
  "Kunal Builds is a web and app developer portfolio showcasing premium websites, landing pages, dashboards, mobile apps, UI/UX work, and real digital products built with React, Next.js, Tailwind CSS, React Native, Expo, Firebase, and Supabase.";
export const DEFAULT_OG_IMAGE = "/og-image.png";
export const TWITTER_CREATOR = "@kunallbuilds";

export const DEFAULT_KEYWORDS = [
  "Kunal Builds",
  "Kunal Dev",
  "Kunal Developer",
  "Kunal17711",
  "web developer Haryana",
  "app developer India",
  "React developer",
  "Next.js developer",
  "TypeScript developer",
  "Tailwind CSS developer",
  "React Native developer",
  "Expo developer",
  "Firebase developer",
  "Supabase developer",
  "landing page developer",
  "dashboard developer",
  "UI UX designer",
  "startup MVP developer",
  "website redesign developer",
];

type CreateMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) {
    return path;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  keywords = DEFAULT_KEYWORDS,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
}: CreateMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      absolute: title,
    },
    description,
    keywords: keywords || DEFAULT_KEYWORDS,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_IN",
      url,
      siteName: SITE_NAME,
      title: openGraphTitle || title,
      description: openGraphDescription || description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: TWITTER_CREATOR,
      title: twitterTitle || openGraphTitle || title,
      description: twitterDescription || openGraphDescription || description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageSchema({
  path,
  name,
  description,
  pageType = "WebPage",
}: {
  path: string;
  name: string;
  description: string;
  pageType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#person`,
    },
  };
}
