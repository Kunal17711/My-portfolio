import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { DEFAULT_OG_IMAGE, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Kunal Builds",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Kunal Builds",
    "kunal.dev",
    "web developer India",
    "app developer India",
    "freelance web developer",
    "freelance app developer",
    "Next.js developer",
    "React developer",
    "React Native developer",
    "Expo developer",
    "Tailwind CSS developer",
    "Supabase developer",
    "landing page developer",
    "dashboard developer",
    "mobile app developer",
    "portfolio website developer",
    "website redesign developer",
    "startup MVP developer",
  ],
  authors: [{ name: "Kunal Builds", url: SITE_URL }],
  creator: "Kunal Builds",
  publisher: "Kunal Builds",
  category: "technology",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Kunal Builds",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Kunal Builds — Web and App Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@kunallbuilds",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={readexPro.className}>
        {children}
      </body>
    </html>
  );
}
