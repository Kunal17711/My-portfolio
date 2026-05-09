import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  CtaBand,
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { breadcrumbSchema, createMetadata, SITE_URL } from "@/lib/seo";
import { personSchema, projects, services, socialProfiles } from "@/lib/site-data";

const description =
  "Learn about Kunal Builds, a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.";

export const metadata: Metadata = createMetadata({
  title: "About Kunal Builds | Web & App Developer from Haryana, India",
  description:
    "Learn about Kunal Builds, the developer identity of Kunal, a web and app developer from Haryana, India building premium websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and real digital products.",
  path: "/about",
  type: "profile",
  keywords: [
    "Kunal Builds",
    "Kunal Dev",
    "about Kunal Builds",
    "web developer Haryana",
    "app developer India",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Tailwind CSS developer",
    "React Native developer",
    "Expo developer",
    "Supabase developer",
    "Firebase developer",
    "portfolio developer India",
    "freelance web developer India",
    "UI UX developer",
    "landing page developer",
    "dashboard developer",
  ],
});

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function AboutPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: "About Kunal Builds",
    description:
      "Learn about Kunal Builds, the developer identity of Kunal, a web and app developer from Haryana, India building premium websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and real digital products.",
    about: {
      "@id": `${SITE_URL}/#person`,
    },
    mainEntity: {
      "@id": `${SITE_URL}/#person`,
    },
  };

  return (
    <>
      <SeoJsonLd
        data={[
          { "@context": "https://schema.org", ...personSchema },
          pageSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={breadcrumbs}
        eyebrow="Haryana, India"
        title="About Kunal Builds"
        intro={
          <p>
            Kunal Builds is the developer identity of Kunal, a web and app
            developer from Haryana, India. I design and build clean, fast, and
            practical digital products across websites, landing pages,
            dashboards, and mobile apps. My work focuses on premium UI, strong
            product structure, responsive layouts, and real-world functionality.
          </p>
        }
      >
        <EditorialSection title="Who is Kunal Builds?">
          <p>
            Kunal Builds is the developer identity of Kunal, a web and app
            developer from Haryana, India. I build clean, fast, and practical
            digital products across websites, landing pages, dashboards, mobile
            apps, and UI/UX interfaces. My work focuses on premium UI, strong
            product structure, and real-world functionality using modern tools
            like React, Next.js, TypeScript, Tailwind CSS, React Native, Expo,
            Supabase, Firebase, and Vercel.
          </p>
          <p>
            Based in Haryana, India, I operate with a digital-first mindset,
            ensuring that every project is built to be clear, responsive, and
            effective. The portfolio is not just about screenshots; it is about
            real execution, practical product thinking, and a clean visual
            standard that helps early-stage ideas turn into polished products.
          </p>
        </EditorialSection>

        <EditorialSection title="What I Build">
          <p>
            I specialize in turning startup ideas and business goals into
            launch-ready digital experiences. This includes high-converting
            landing pages, data-driven dashboards, mobile app prototypes, and
            premium business websites. I sit between design and development,
            meaning I care about both how a product looks and how it actually
            works in the hands of users.
          </p>
          <p>
            From visual hierarchy and frontend implementation to responsive
            layouts and backend connections, I handle the full build cycle. My
            goal is always to create a product that feels premium, loads fast,
            and communicates value clearly.
          </p>
        </EditorialSection>

        <EditorialSection title="Stack & Tools">
          <p>
            My technical stack is built around efficiency and performance. I use
            React and Next.js for web projects, Tailwind CSS for modern
            responsive styling, and React Native with Expo for mobile app
            development. When a project needs a backend, I integrate Firebase or
            Supabase for authentication, real-time databases, and storage.
          </p>
          <p>
            These tools allow me to build reusable, maintainable, and fast
            interfaces that scale with your idea. Every build is optimized for
            performance and follows clean coding standards to ensure a solid
            foundation for future growth.
          </p>
        </EditorialSection>

        <EditorialSection title="Project History">
          <p>
            Some of the work built under the Kunal Builds identity includes{" "}
            {projects.map((project, index) => (
              <span key={project.slug}>
                <TextLink href={project.path}>{project.name}</TextLink>
                {index < projects.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <p>
            These builds cover everything from safety apps and education
            dashboards to creative web concepts and AI product interfaces. You
            can explore the full{" "}
            <TextLink href="/projects">project archive</TextLink> for more
            details on the stack and design direction of each build.
          </p>
        </EditorialSection>

        <EditorialSection title="Services Offered">
          <p>
            I offer specialized development and design services across{" "}
            {services.map((service) => service.name).join(", ")}. Each service
            is tailored to help creators, founders, and small teams launch
            faster and with more polish.
          </p>
          <p>
            Check out the <TextLink href="/services">services</TextLink> page
            for a detailed breakdown of how I can help you with your next build.
          </p>
        </EditorialSection>

        <EditorialSection title="Social Profiles">
          <div className="space-y-3">
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

        <EditorialSection title="Contact">
          <p>
            Email:{" "}
            <TextLink href="mailto:kkunaall10@gmail.com">
              kkunaall10@gmail.com
            </TextLink>
          </p>
          <p>Location: Haryana, India</p>
          <p>
            For a website, landing page, dashboard, mobile app, UI/UX interface,
            redesign, or MVP, use the{" "}
            <TextLink href="/contact">contact page</TextLink> to reach Kunal
            Builds.
          </p>
        </EditorialSection>

        <CtaBand text="Have a project idea, a page that needs redesigning, or an MVP that needs a clean first version? Contact Kunal Builds with the goal, pages, and features you have in mind." />
      </SeoPageShell>
    </>
  );
}
