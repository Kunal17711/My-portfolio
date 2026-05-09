import type { Metadata } from "next";
import Image from "next/image";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  CtaBand,
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { absoluteUrl, breadcrumbSchema, createMetadata, webPageSchema } from "@/lib/seo";
import { projects } from "@/lib/site-data";

const description =
  "Explore projects by Kunal Builds including websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products built with React, Next.js, Tailwind CSS, React Native, Expo, Firebase, and Supabase.";

export const metadata: Metadata = createMetadata({
  title: "Projects by Kunal Builds | Websites, Apps & Dashboards",
  description,
  path: "/projects",
});

export default function ProjectsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Kunal Builds",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.name,
      url: absoluteUrl(project.path),
    })),
  };

  return (
    <>
      <SeoJsonLd
        data={[
          webPageSchema({
            path: "/projects",
            name: "Projects by Kunal Builds",
            description,
            pageType: "CollectionPage",
          }),
          itemListSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
        eyebrow="Project archive"
        title="Projects by Kunal Builds"
        intro={
          <p>
            Explore product-style builds by Kunal Builds across websites,
            mobile apps, dashboards, landing pages, UI/UX interfaces, and
            digital products. Each project page explains what was built, the
            stack used, the design direction, and what the project shows.
          </p>
        }
      >
        <EditorialSection title="Project list">
          <p>
            This project archive is built for people who want to understand the
            actual work behind Kunal Builds, not just scroll screenshots. The
            list includes web interfaces, mobile app concepts, dashboard-style
            products, creative interfaces, and landing pages built with tools
            such as React, Next.js, Tailwind CSS, React Native, Expo, Firebase,
            and Supabase.
          </p>
          <p>
            If you are comparing project types before starting your own build,
            also see the <TextLink href="/services">services page</TextLink> or
            contact Kunal Builds through the{" "}
            <TextLink href="/contact">contact page</TextLink>.
          </p>
        </EditorialSection>

        <section className="divide-y divide-white/10 border-y border-white/10">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="grid gap-8 py-12 md:grid-cols-[280px_1fr] md:gap-12 md:py-14"
            >
              <TextLink href={project.path}>
                <span className="text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                  {project.name}
                </span>
              </TextLink>
              <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
                <TextLink href={project.path}>
                  <span className="relative block aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/10 bg-neutral-950">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 240px"
                      className="object-cover"
                    />
                  </span>
                </TextLink>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                    {project.type}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-white/72 md:text-lg">
                    {project.description}
                  </p>
                  <p className="mt-4 text-sm text-white/60">
                    Tech stack: {project.tech.join(", ")}
                  </p>
                  <p className="mt-5 text-sm">
                    <TextLink href={project.path}>
                      Read the {project.name} case study
                    </TextLink>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        <CtaBand text="If one of these project directions is close to what you want to build, share your idea with Kunal Builds and include the pages, screens, or features you need." />
      </SeoPageShell>
    </>
  );
}
