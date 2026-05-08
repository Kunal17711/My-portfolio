import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import SeoJsonLd from "@/components/SeoJsonLd";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const viewport = {
  themeColor: "#000000",
};

const SITE_URL = "https://heyitskunal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kunal Builds | Web & App Developer",
    template: "%s | Kunal Builds",
  },
  description:
    "Kunal Builds is a web and app developer portfolio showcasing premium websites, landing pages, dashboards, mobile apps, UI/UX work, and real digital products built with React, Next.js, Tailwind, React Native, Expo, and Supabase.",
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
    title: "Kunal Builds | Web & App Developer",
    description:
      "Web & app developer portfolio showcasing premium websites, landing pages, dashboards, mobile apps, and real digital products.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kunal Builds — Web and App Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Builds | Web & App Developer",
    description:
      "Web & app developer portfolio showcasing premium websites, landing pages, dashboards, mobile apps, and real digital products.",
    creator: "@kunallbuilds",
    images: ["/og-image.svg"],
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <SeoJsonLd />
        {children}
      </body>
    </html>
  );
}
