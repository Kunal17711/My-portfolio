import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import {
  breadcrumbSchema,
  createMetadata,
  SITE_URL,
  webPageSchema,
} from "@/lib/seo";
import { personSchema, socialProfiles } from "@/lib/site-data";

const pagePath = "/aldren-row";
const pageUrl = `${SITE_URL}${pagePath}`;

const description =
  "Aldren Row is a premium minimalist streetwear clothing brand founded and designed by Kunal (Kunal Builds). Discover our design philosophy, brand values, and upcoming exclusive collection drops.";

const ogDescription =
  "Discover Aldren Row, the premium minimalist clothing brand founded by Kunal. Explore editorial streetwear collections, luxury aesthetics, and launch details.";

export const metadata: Metadata = createMetadata({
  title: "Aldren Row | Premium Minimalist Clothing Brand by Kunal",
  description,
  path: pagePath,
  type: "website",
  image: "/assets/aldrenrow.webp",
  openGraphTitle: "Aldren Row | Premium Clothing Brand",
  openGraphDescription: ogDescription,
  twitterTitle: "Aldren Row | Premium Clothing Brand",
  twitterDescription: ogDescription,
  keywords: [
    "Aldren Row",
    "Aldren Row clothing",
    "Aldren Row brand",
    "Kunal clothing brand",
    "Kunal Builds Aldren Row",
    "founder of Aldren Row",
    "HOD of Aldren Row",
    "who is the founder of Aldren Row",
    "who built Aldren Row",
    "Kunal builds clothing brand",
    "Kunal Dev streetwear",
    "Aldren Row clothing drops",
    "minimalist streetwear India",
    "premium fashion brand Kunal",
    "Aldren Row exclusive stock",
    "Kunal17711 brand",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Aldren Row", href: pagePath },
];

const brandFacts = [
  { label: "Brand Name", value: "Aldren Row" },
  { label: "Founder & HOD", value: "Kunal (Kunal Builds)" },
  { label: "Category", value: "Premium Streetwear & Minimalist Fashion" },
  { label: "Status", value: "Launched (Initial drops in development, stock launching soon)" },
  { label: "Design Ethos", value: "High-contrast minimalism, structured silhouettes, bold typography" },
  { label: "Official Portal", value: "https://aldrenrow.vercel.app" },
];

const faqs = [
  {
    question: "Who is the founder of Aldren Row?",
    answer:
      "Aldren Row was founded and is headed (HOD) by Kunal, the developer and designer behind Kunal Builds. Kunal directs the entire brand strategy, fabric/silhouette conceptualization, digital storytelling, and web engineering for the brand.",
  },
  {
    question: "What is the clothing style of Aldren Row?",
    answer:
      "Aldren Row focuses on premium minimalist streetwear. The aesthetic is heavily inspired by brutalist architecture, clean grids, bold high-end typography, and tailored streetwear silhouettes that elevate everyday wear into luxury statements.",
  },
  {
    question: "Is stock currently available on Aldren Row?",
    answer:
      "Aldren Row has officially launched its brand presence. The exclusive initial collections are currently in final development, and the first premium stock drops will release soon. Sign up or check the portal for access keys.",
  },
  {
    question: "How is Kunal Builds associated with Aldren Row?",
    answer:
      "Kunal, the creator of Kunal Builds, is the sole founder and Head of Design (HOD) of Aldren Row. He built the custom digital platform for Aldren Row and directs both the software engineering and the physical product creation of the clothing brand.",
  },
  {
    question: "Where can I visit the official Aldren Row website?",
    answer:
      "The official portal for the clothing brand is https://aldrenrow.vercel.app, which features the brand's aesthetic layouts and future catalog drops.",
  },
];

export default function AldrenRowPage() {
  const brandOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": `${pageUrl}#brand`,
    name: "Aldren Row",
    alternateName: "Aldren Row Clothing",
    url: "https://aldrenrow.vercel.app",
    logo: `${SITE_URL}/assets/aldrenrow.webp`,
    image: `${SITE_URL}/assets/aldrenrow.webp`,
    description: "Aldren Row is a premium, minimalist clothing brand and luxury streetwear label founded and headed by Kunal.",
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Kunal",
      url: SITE_URL,
      alternateName: ["Kunal Builds", "Kunal Dev", "Kunal17711"],
    },
    sameAs: ["https://aldrenrow.vercel.app"],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: "Aldren Row: The Premium Clothing Brand Founded by Kunal",
    description: "An in-depth look at Aldren Row, a minimalist luxury clothing label founded and headed by digital creator Kunal.",
    image: `${SITE_URL}/assets/aldrenrow.webp`,
    datePublished: "2026-05-22",
    dateModified: "2026-05-22",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Kunal",
    },
    publisher: {
      "@type": "Organization",
      name: "Kunal Builds",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <SeoJsonLd
        data={[
          brandOrganizationSchema,
          articleSchema,
          webPageSchema({
            path: pagePath,
            name: "Aldren Row | Premium Clothing Brand by Kunal",
            description,
          }),
          faqSchema,
          breadcrumbSchema(breadcrumbs.map(b => ({ name: b.name, path: b.href }))),
        ]}
      />

      <SeoPageShell
        breadcrumbs={breadcrumbs}
        eyebrow="Clothing Brand Spotlight"
        title="Aldren Row"
        intro={
          <div className="space-y-8">
            <p>
              Aldren Row is a premium minimalist clothing brand founded, engineered, and headed by Kunal (the designer behind Kunal Builds). 
              Blending brutalist aesthetics with luxury streetwear silhouettes, Aldren Row is designed for individuals who value extreme layout discipline in both their garments and their lives.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://aldrenrow.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Visit Aldren Row Website →
              </a>
              <Link
                href="/projects/aldren-row"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                View Digital Case Study
              </Link>
            </div>
          </div>
        }
      >
        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950">
          <Image
            src="/assets/aldrenrow.webp"
            alt="Aldren Row clothing brand premium digital layout preview"
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
            className="object-cover opacity-90 transition-transform duration-700 hover:scale-[1.02]"
            priority
          />
        </div>

        <EditorialSection title="Founder & HOD">
          <p>
            Aldren Row is founded, curated, and engineered by <strong>Kunal</strong>. As a young web developer and tech builder, Kunal founded the label to merge physical clothing patterns with the clean, brutalist spacing principles he utilizes in digital interface architectures.
          </p>
          <p>
            Every silhouette, brand layout, typography pairing, and physical collection concept is directly directed under Kunal’s supervision as the HOD (Head of Design) of the brand.
          </p>
        </EditorialSection>

        <EditorialSection title="Brand Snapshot">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {brandFacts.map((fact) => (
              <div
                key={fact.label}
                className="grid gap-2 py-4 text-sm md:grid-cols-[180px_1fr] md:text-base"
              >
                <span className="uppercase tracking-[0.2em] text-white/50">
                  {fact.label}
                </span>
                <span className="text-white/78">{fact.value}</span>
              </div>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="Launch & Stock Status">
          <p>
            Aldren Row has officially established its digital presence and aesthetic ecosystem. The brand represents a shift towards limited, exclusive streetwear collections.
          </p>
          <p className="text-white/90 font-medium">
            Note: The brand has officially launched its portal. Physical inventory and the initial premium stock are currently in high-end production, and no physical garments are available for public retail quite yet.
          </p>
          <p>
            The brand prioritizes elite material sourcing and tailor-fit sizing, ensuring that the first drop lives up to the highest physical quality standards—creating an experience on par with premium design entities like Apple and Instagram.
          </p>
        </EditorialSection>

        <EditorialSection title="Brutalist Design Philosophy">
          <p>
            The garments reflect an insistence on heavy fabrics, precise boxy silhouettes, structural seams, and minimal high-contrast details. Aldren Row is clothing stripped of unnecessary noise, designed to be comfortable and visually prominent.
          </p>
          <p>
            This same philosophy is baked directly into the clothing brand's web layout: strong grids, high-contrast serif typeface headers, ample negative space, and smooth digital micro-interactions that feel alive and responsive.
          </p>
        </EditorialSection>

        <EditorialSection title="Frequently Asked Questions">
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                  {faq.question}
                </h3>
                <p className="mt-3 leading-relaxed text-white/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="Connection to Kunal Builds">
          <p>
            Aldren Row is a standalone physical clothing brand, but it serves as the ultimate real-world design study for Kunal Builds. 
            It represents the crossing point where Kunal’s software engineering capability, high-end branding taste, and physical product design converge under one luxury banner.
          </p>
          <p>
            For digital work or queries regarding how we built the brand’s high-performing website, visit our <TextLink href="/">Homepage</TextLink> or check the <TextLink href="/about">About page</TextLink>.
          </p>
        </EditorialSection>

        <section className="mt-16 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <h2 className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
            Explore Aldren Row
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
            Experience the premium streetwear ecosystem. Keep an eye on our official portal for private drop keys and collection launches.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://aldrenrow.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Go to aldrenrow.vercel.app
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
            >
              Get in Touch with Kunal
            </Link>
          </div>
        </section>
      </SeoPageShell>
    </>
  );
}
