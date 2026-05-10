import type { Metadata } from "next";
import Link from "next/link";
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
import { personSchema, projects, socialProfiles } from "@/lib/site-data";

const pagePath = "/who-is-kunal";
const pageUrl = `${SITE_URL}${pagePath}`;

const description =
  "Kunal Builds is the developer identity of Kunal, a young web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products using React, Next.js, Tailwind CSS, React Native, Expo, Supabase, Firebase, and AI-assisted workflows.";

const ogDescription =
  "Kunal Builds is the developer identity of Kunal, a young web and app developer from Haryana, India building websites, apps, dashboards, landing pages, UI/UX interfaces, and digital products.";

export const metadata: Metadata = createMetadata({
  title: "Who is Kunal? | Kunal Builds Web & App Developer",
  description,
  path: pagePath,
  type: "profile",
  image: "/og-image.png",
  openGraphTitle: "Who is Kunal Builds? | Web & App Developer",
  openGraphDescription: ogDescription,
  twitterTitle: "Who is Kunal Builds? | Web & App Developer",
  twitterDescription: ogDescription,
  keywords: [
    "Kunal Builds",
    "who is Kunal",
    "who is Kunal Builds",
    "about Kunal",
    "about Kunal Builds",
    "Kunal developer",
    "Kunal web developer",
    "Kunal app developer",
    "Kunal Dev",
    "Kunal17711",
    "Kunal portfolio",
    "Kunal Builds portfolio",
    "web developer Haryana",
    "app developer India",
    "AI web developer",
    "AI-assisted developer",
    "React developer",
    "Next.js developer",
    "React Native developer",
    "Supabase developer",
    "Firebase developer",
    "Tailwind CSS developer",
    "freelance web developer India",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Who is Kunal?", href: pagePath },
];

const buildTypes = [
  {
    name: "Websites",
    text: "Clean portfolio, business, product, and personal-brand websites built to feel fast and polished.",
  },
  {
    name: "Landing pages",
    text: "Focused launch pages with clear messaging, responsive sections, and direct calls to action.",
  },
  {
    name: "Dashboards",
    text: "Admin and product dashboards designed for scanning, structure, and practical workflows.",
  },
  {
    name: "Mobile apps",
    text: "React Native and Expo app interfaces for prototypes, MVPs, and mobile-first product ideas.",
  },
  {
    name: "UI/UX interfaces",
    text: "Readable screens, clean flows, and visual systems that can move into real implementation.",
  },
  {
    name: "Product websites",
    text: "Product-style pages that explain what the idea does and help visitors understand the offer quickly.",
  },
  {
    name: "Startup MVPs",
    text: "Focused early versions of product ideas with useful frontend, backend flow, and deployment planning.",
  },
  {
    name: "Website redesigns",
    text: "Sharper versions of older pages with improved hierarchy, responsiveness, and visual trust.",
  },
  {
    name: "AI-assisted website concepts",
    text: "Concept directions shaped with AI support, then refined into practical responsive web builds.",
  },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "React Native",
  "Expo",
  "Supabase",
  "Firebase",
  "Vercel",
  "UI/UX design",
  "SEO",
  "responsive design",
  "frontend development",
  "product design",
  "API integration",
  "database flows",
  "deployment",
];

const entityFacts = [
  { label: "Primary identity", value: "Kunal Builds" },
  { label: "Person name", value: "Kunal" },
  { label: "Also known as", value: "Kunal Dev, Kunal Developer, Kunal17711" },
  { label: "Role", value: "Web & App Developer" },
  { label: "Based in", value: "Haryana, India" },
  {
    label: "Builds",
    value:
      "Websites, landing pages, dashboards, mobile apps, UI/UX interfaces, product websites, redesigns, and MVPs",
  },
  {
    label: "Main stack",
    value:
      "React, Next.js, TypeScript, Tailwind CSS, React Native, Expo, Supabase, Firebase, and Vercel",
  },
  { label: "Portfolio", value: "https://heyitskunal.vercel.app" },
];

const featuredProjectSlugs = [
  "profileos",
  "vidora",
  "raksha-web",
  "raksha-app",
  "edusync",
  "fashion-website",
  "solvare",
  "wishwrap",
  "paradox",
  "picprompt",
  "beyond-reality",
];

const faqs = [
  {
    question: "Who is Kunal Builds?",
    answer:
      "Kunal Builds is the developer identity of Kunal, a young web and app developer from Haryana, India who builds websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
  },
  {
    question: "What does Kunal Builds do?",
    answer:
      "Kunal Builds creates websites, landing pages, dashboards, mobile app interfaces, product websites, website redesigns, and startup-style MVPs.",
  },
  {
    question: "What technologies does Kunal use?",
    answer:
      "Kunal uses React, Next.js, TypeScript, Tailwind CSS, React Native, Expo, Supabase, Firebase, Vercel, and modern AI-assisted workflows.",
  },
  {
    question: "Does Kunal Builds use AI for websites?",
    answer:
      "Yes, Kunal uses AI-assisted workflows for ideation, UI direction, copy improvement, and faster development, while still focusing on real implementation, responsive design, testing, and deployment.",
  },
  {
    question: "Where is Kunal Builds based?",
    answer: "Kunal Builds is based in Haryana, India and can work remotely.",
  },
  {
    question: "How can I contact Kunal Builds?",
    answer:
      "You can contact Kunal Builds by email at kkunaall10@gmail.com or through Instagram, LinkedIn, X, GitHub, Fiverr, and Upwork.",
  },
];

export default function WhoIsKunalPage() {
  const selectedProjects = featuredProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  const enrichedPersonSchema = {
    ...personSchema,
    mainEntityOfPage: {
      "@id": `${pageUrl}#profilepage`,
    },
    hasOccupation: {
      "@type": "Occupation",
      name: "Web and App Developer",
      occupationLocation: {
        "@type": "Country",
        name: "India",
      },
      skills: techStack,
    },
    subjectOf: {
      "@id": `${pageUrl}#webpage`,
    },
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${pageUrl}#profilepage`,
    url: pageUrl,
    name: "Who is Kunal Builds?",
    description:
      "A profile page about Kunal Builds, the developer identity of Kunal, a web and app developer from Haryana, India.",
    inLanguage: "en-IN",
    dateModified: "2026-05-10",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
  };

  const projectItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#projects`,
    name: "Projects by Kunal Builds",
    itemListElement: selectedProjects.map((project, index) => {
      if (!project) {
        return null;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: `${SITE_URL}${project.path}`,
      };
    }).filter(Boolean),
  };

  const sameAsItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}#social-profiles`,
    name: "Official profiles for Kunal Builds",
    itemListElement: socialProfiles.map((profile, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: profile.label,
      url: profile.href,
    })),
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
          profilePageSchema,
          { "@context": "https://schema.org", ...enrichedPersonSchema },
          webPageSchema({
            path: pagePath,
            name: "Who is Kunal Builds?",
            description,
          }),
          projectItemListSchema,
          sameAsItemListSchema,
          faqSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Who is Kunal?", path: pagePath },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={breadcrumbs}
        eyebrow="who is kunal?"
        title="Who is Kunal Builds?"
        intro={
          <div className="space-y-8">
            <p>
              Kunal Builds is the developer identity of Kunal, a young web and
              app developer from Haryana, India. He builds websites, landing
              pages, dashboards, mobile apps, UI/UX interfaces, and digital
              products using modern tools like React, Next.js, TypeScript,
              Tailwind CSS, React Native, Expo, Supabase, Firebase, and
              AI-assisted workflows.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                View Portfolio
              </Link>
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                Contact
              </Link>
            </div>
          </div>
        }
      >
        <EditorialSection title="Quick answer">
          <p>
            Kunal Builds is a web and app developer focused on building clean,
            fast, and practical digital products. His work includes portfolio
            websites, landing pages, admin dashboards, mobile app interfaces,
            product websites, and startup-style MVPs. He combines design taste,
            development skills, and AI-assisted workflows to move from idea to
            execution faster.
          </p>
        </EditorialSection>

        <EditorialSection title="Entity snapshot">
          <div className="divide-y divide-white/10 border-y border-white/10">
            {entityFacts.map((fact) => (
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

        <EditorialSection title="About Kunal">
          <p>
            Kunal is a developer from Haryana, India who works under the
            identity Kunal Builds. His focus is on creating useful, polished,
            and responsive digital experiences for creators, businesses,
            students, and startup ideas.
          </p>
          <p>
            Instead of only making visuals, he focuses on real implementation:
            layout structure, UI polish, responsive design, backend flow,
            deployment, and performance. You can also read the broader{" "}
            <TextLink href="/about">about page</TextLink> or compare his{" "}
            <TextLink href="/services">services</TextLink>.
          </p>
        </EditorialSection>

        <EditorialSection title="What does Kunal build?">
          <p>
            Kunal Builds works across web, mobile, product, and interface
            projects where the goal is a usable digital experience instead of a
            static mockup.
          </p>
          <div className="space-y-4">
            {buildTypes.map((item) => (
              <p key={item.name}>
                <span className="font-medium text-white">{item.name}:</span>{" "}
                {item.text}
              </p>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="How Kunal uses AI in development">
          <p>
            Kunal uses AI-assisted tools to speed up ideation, design direction,
            UI exploration, copy refinement, and development workflows. AI
            helps in generating ideas and improving speed, but the final work
            still depends on implementation, product thinking, responsive
            design, testing, and deployment.
          </p>
          <p>
            This makes AI a support layer, not a replacement for careful
            frontend work, product judgement, or real build quality.
          </p>
        </EditorialSection>

        <EditorialSection title="Skills and technologies">
          <p>
            Kunal Builds uses a modern stack for responsive web and app work:
            {techStack.map((item, index) => (
              <span key={item}>
                {" "}
                {item}
                {index < techStack.length - 1 ? "," : "."}
              </span>
            ))}
          </p>
          <p>
            For service-specific work, see{" "}
            <TextLink href="/services/website-development">
              website development
            </TextLink>
            ,{" "}
            <TextLink href="/services/mobile-app-development">
              mobile app development
            </TextLink>
            , and{" "}
            <TextLink href="/services/startup-mvp-development">
              startup MVP development
            </TextLink>
            .
          </p>
        </EditorialSection>

        <EditorialSection title="Projects by Kunal Builds">
          <p>
            These internal project pages show the kind of websites, apps,
            dashboards, and digital products built under the Kunal Builds
            identity. You can browse the full{" "}
            <TextLink href="/projects">projects archive</TextLink> for more
            context.
          </p>
          <div className="space-y-3">
            {selectedProjects.map((project) => {
              if (!project) {
                return null;
              }

              return (
                <p key={project.slug}>
                  <TextLink href={project.path}>{project.name}</TextLink> -{" "}
                  {project.type}
                </p>
              );
            })}
          </div>
        </EditorialSection>

        <EditorialSection title="Related pages">
          <p>
            These pages help explain Kunal Builds from different angles:
            background, services, project examples, and contact.
          </p>
          <div className="space-y-3">
            <p>
              <TextLink href="/about">About Kunal Builds</TextLink> - longer
              background and working style.
            </p>
            <p>
              <TextLink href="/projects">Projects</TextLink> - crawlable
              archive of portfolio builds and case studies.
            </p>
            <p>
              <TextLink href="/services">Services</TextLink> - development and
              design services offered by Kunal Builds.
            </p>
            <p>
              <TextLink href="/services/website-development">
                Website development
              </TextLink>{" "}
              - responsive web builds using modern frontend tools.
            </p>
            <p>
              <TextLink href="/services/mobile-app-development">
                Mobile app development
              </TextLink>{" "}
              - React Native and Expo app interface work.
            </p>
            <p>
              <TextLink href="/services/startup-mvp-development">
                Startup MVP development
              </TextLink>{" "}
              - focused early product builds for testing ideas.
            </p>
            <p>
              <TextLink href="/contact">Contact</TextLink> - the safest way to
              reach Kunal Builds for project work.
            </p>
          </div>
        </EditorialSection>

        <EditorialSection title="Where to find Kunal Builds">
          <div className="space-y-3">
            <p>
              Portfolio:{" "}
              <TextLink href={SITE_URL}>https://heyitskunal.vercel.app</TextLink>
            </p>
            {socialProfiles.map((profile) => (
              <p key={profile.label}>
                {profile.label}:{" "}
                <span className="break-all">
                  <TextLink href={profile.href}>{profile.href}</TextLink>
                </span>
              </p>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="Contact Kunal Builds">
          <p>
            For websites, landing pages, dashboards, mobile apps, UI/UX
            interfaces, redesigns, and MVP work, Kunal Builds can be contacted
            through email or social profiles.
          </p>
          <p>
            Email:{" "}
            <TextLink href="mailto:kkunaall10@gmail.com">
              kkunaall10@gmail.com
            </TextLink>
          </p>
          <p>
            <TextLink href="/contact">Contact Kunal Builds</TextLink>
          </p>
        </EditorialSection>

        <EditorialSection title="Frequently asked questions">
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                  {faq.question}
                </h3>
                <p className="mt-3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </EditorialSection>
      </SeoPageShell>
    </>
  );
}
