import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

const SITE_URL = "https://heyitskunal.vercel.app";
const ABOUT_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: {
    absolute: "About Kunal Builds | Web & App Developer",
  },
  description:
    "Learn about Kunal Builds, a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products using React, Next.js, Tailwind CSS, React Native, Expo, Firebase, and Supabase.",
  alternates: {
    canonical: ABOUT_URL,
  },
  openGraph: {
    type: "profile",
    url: ABOUT_URL,
    siteName: "Kunal Builds",
    title: "About Kunal Builds | Web & App Developer",
    description:
      "Learn about Kunal Builds, a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kunal Builds - Web and App Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kunal Builds | Web & App Developer",
    description:
      "Learn about Kunal Builds, a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
    images: ["/og-image.svg"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://heyitskunal.vercel.app/#person",
  name: "Kunal",
  alternateName: ["Kunal Builds", "Kunal Dev", "Kunal Developer"],
  url: "https://heyitskunal.vercel.app",
  image: "https://heyitskunal.vercel.app/og-image.png",
  jobTitle: "Web and App Developer",
  description:
    "Kunal Builds is a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
  email: "mailto:kkunaall10@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Web Development",
    "App Development",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "Expo",
    "Firebase",
    "Supabase",
    "UI/UX Design",
    "Landing Pages",
    "Dashboards",
    "Mobile Apps",
  ],
  sameAs: [
    "https://instagram.com/iiblamekunal",
    "https://www.linkedin.com/in/kunalldev",
    "https://x.com/kunallbuilds",
    "https://github.com/Kunal17711",
    "https://www.fiverr.com/s/yv3DB6z",
    "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
  ],
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://heyitskunal.vercel.app/about#profilepage",
  url: "https://heyitskunal.vercel.app/about",
  name: "About Kunal Builds",
  about: {
    "@id": "https://heyitskunal.vercel.app/#person",
  },
  mainEntity: {
    "@id": "https://heyitskunal.vercel.app/#person",
  },
};

const socialProfiles = [
  ["Instagram", "https://instagram.com/iiblamekunal"],
  ["LinkedIn", "https://www.linkedin.com/in/kunalldev"],
  ["X", "https://x.com/kunallbuilds"],
  ["GitHub", "https://github.com/Kunal17711"],
  ["Fiverr", "https://www.fiverr.com/s/yv3DB6z"],
  [
    "Upwork",
    "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
  ],
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />

      <nav className="border-b border-white/10">
        <div className="mx-auto flex h-20 max-w-[1120px] items-center px-6 md:px-10">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
          >
            <ChevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-[1120px] px-6 py-20 md:px-10 md:py-28">
        <header className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-white/45">
            Haryana, India
          </p>
          <h1 className="mt-8 text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            About Kunal Builds
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-white/68 md:text-2xl md:leading-relaxed">
            Kunal Builds is the developer identity of Kunal, a web and app
            developer from Haryana, India. He builds clean, fast, and premium
            digital products including websites, landing pages, dashboards,
            mobile apps, and UI/UX interfaces.
          </p>
        </header>

        <div className="mt-20 space-y-16 border-t border-white/10 pt-14 md:mt-28 md:space-y-20 md:pt-20">
          <section className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-[280px_1fr] md:gap-12 md:pb-20">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              Who is Kunal Builds?
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed">
              Kunal focuses on building real digital products with clean user
              interfaces, practical functionality, and fast execution. His work
              includes portfolio websites, startup landing pages, admin
              dashboards, mobile app concepts, and full product interfaces.
            </p>
          </section>

          <section className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-[280px_1fr] md:gap-12 md:pb-20">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              What Kunal Builds
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed">
              Kunal builds websites, landing pages, dashboards, mobile apps,
              UI/UX designs, MVPs, and product interfaces for creators,
              startups, and businesses.
            </p>
          </section>

          <section className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-[280px_1fr] md:gap-12 md:pb-20">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              Skills and Technologies
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed">
              His work uses React, Next.js, TypeScript, Tailwind CSS, React
              Native, Expo, Firebase, Supabase, UI/UX design, product design,
              frontend development, deployment, and performance optimization.
            </p>
          </section>

          <section className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-[280px_1fr] md:gap-12 md:pb-20">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              Projects
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed">
              Projects connected with Kunal Builds include Vidora, Raksha Web,
              Raksha App, EduSync, Fashion Website, Solvare, WishWrap, Paradox,
              PicPrompt, and Beyond Reality.
            </p>
          </section>

          <section className="grid gap-6 border-b border-white/10 pb-14 md:grid-cols-[280px_1fr] md:gap-12 md:pb-20">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              Social Profiles
            </h2>
            <div className="space-y-4">
              {socialProfiles.map(([label, href]) => (
                <p
                  key={label}
                  className="text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed"
                >
                  {label}:{" "}
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-white/70"
                  >
                    {href}
                  </a>
                </p>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-[280px_1fr] md:gap-12">
            <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/45">
              Contact
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-white/68 md:text-xl md:leading-relaxed">
                Email:{" "}
                <a
                  href="mailto:kkunaall10@gmail.com"
                  className="text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-white/70"
                >
                  kkunaall10@gmail.com
                </a>
              </p>
              <p className="text-base leading-relaxed text-white/55 md:text-xl md:leading-relaxed">
                Location: Haryana, India
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
