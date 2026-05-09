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
  title: "About Kunal Builds | Web & App Developer",
  description,
  path: "/about",
  type: "profile",
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
    description,
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
            developer from Haryana, India. He builds clean, fast, and premium
            digital products including websites, landing pages, dashboards,
            mobile apps, and UI/UX interfaces.
          </p>
        }
      >
        <EditorialSection title="Who is Kunal Builds?">
          <p>
            Kunal Builds is the public developer identity used by Kunal for his
            web development, app development, UI/UX, and digital product work.
            The identity keeps the portfolio focused on what he builds: clean
            websites, usable interfaces, practical dashboards, mobile app
            concepts, and product-style pages that can be shared, tested, and
            launched.
          </p>
          <p>
            Kunal is based in Haryana, India and works with an India Remote
            mindset. That means the work is built to be clear online: readable
            pages, responsive layouts, useful project explanations, and links
            that make it easy for someone to understand the work without needing
            private personal details.
          </p>
          <p>
            The portfolio is not trying to make inflated claims. It is meant to
            show the real direction of the work: frontend development, product
            interface thinking, fast execution, and a clean visual standard.
          </p>
        </EditorialSection>

        <EditorialSection title="What Kunal Builds">
          <p>
            Kunal builds websites, landing pages, dashboards, mobile apps,
            UI/UX designs, MVPs, and product interfaces for creators, startups,
            students, small businesses, and early product ideas. The work often
            sits between design and development, so the final result is not only
            a static mockup but a usable digital experience.
          </p>
          <p>
            A typical project can include page structure, visual hierarchy,
            frontend implementation, responsive behavior, backend connection
            planning, deployment, and polishing. Kunal focuses on making pages
            feel premium without losing clarity. The goal is a product that
            looks clean, loads well, and helps people understand the offer or
            workflow quickly.
          </p>
          <p>
            Explore the full <TextLink href="/services">services</TextLink> page
            to see how this work is separated into website development, landing
            pages, dashboards, mobile apps, UI/UX design, startup MVPs, and
            redesigns.
          </p>
        </EditorialSection>

        <EditorialSection title="Skills and Technologies">
          <p>
            Kunal works with React, Next.js, TypeScript, Tailwind CSS, React
            Native, Expo, Firebase, Supabase, UI/UX design, product design,
            frontend development, deployment, and performance optimization. The
            tools are chosen because they fit practical product work: fast
            interfaces, reusable components, reliable responsive layouts, and
            clean deployment paths.
          </p>
          <p>
            React and Next.js are used for modern websites and product pages.
            Tailwind CSS helps keep spacing, typography, and responsive styling
            consistent. React Native and Expo support mobile app interfaces and
            MVPs. Firebase and Supabase are useful for authentication, storage,
            databases, and backend flows when a project needs more than static
            pages.
          </p>
        </EditorialSection>

        <EditorialSection title="Projects">
          <p>
            Projects connected with Kunal Builds include{" "}
            {projects.map((project, index) => (
              <span key={project.slug}>
                <TextLink href={project.path}>{project.name}</TextLink>
                {index < projects.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <p>
            These projects cover websites, product interfaces, mobile app
            concepts, dashboards, fashion landing pages, AI interface concepts,
            and creative digital interfaces. The{" "}
            <TextLink href="/projects">projects page</TextLink> gives each build
            more context, including the type of project, the technology stack,
            and what the project shows about Kunal Builds.
          </p>
        </EditorialSection>

        <EditorialSection title="Services">
          <p>
            Kunal Builds offers practical development and interface services
            across {services.map((service) => service.name).join(", ")}. Each
            service page explains what is included, who the service is for,
            relevant project examples, and how to contact Kunal Builds without
            adding private personal information.
          </p>
        </EditorialSection>

        <EditorialSection title="Social Profiles">
          <div className="space-y-3">
            {socialProfiles.map((profile) => (
              <p key={profile.label}>
                {profile.label}:{" "}
                <TextLink href={profile.href}>{profile.href}</TextLink>
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
