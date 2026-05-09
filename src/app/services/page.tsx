import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  CtaBand,
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { absoluteUrl, breadcrumbSchema, createMetadata, webPageSchema } from "@/lib/seo";
import { professionalServiceSchema, services } from "@/lib/site-data";

const description =
  "Web and app development services by Kunal Builds including websites, landing pages, dashboards, mobile apps, UI/UX design, startup MVPs, and website redesigns.";

export const metadata: Metadata = createMetadata({
  title: "Services by Kunal Builds | Web & App Development",
  description,
  path: "/services",
});

export default function ServicesPage() {
  const offerCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Services by Kunal Builds",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        url: absoluteUrl(service.path),
        description: service.short,
      },
    })),
  };

  return (
    <>
      <SeoJsonLd
        data={[
          webPageSchema({
            path: "/services",
            name: "Services by Kunal Builds",
            description,
            pageType: "CollectionPage",
          }),
          { "@context": "https://schema.org", ...professionalServiceSchema },
          offerCatalogSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        eyebrow="Services"
        title="Services by Kunal Builds"
        intro={
          <p>
            Kunal Builds offers web and app development services for creators,
            startups, students, small businesses, and early-stage product ideas.
            The focus is clean UI, practical functionality, responsive
            execution, and digital products that can be launched and shared.
          </p>
        }
      >
        <EditorialSection title="What you can build">
          <p>
            Services cover websites, landing pages, dashboards, mobile apps,
            UI/UX interfaces, startup MVPs, and website redesigns. Each service
            page explains the intent, what is included, who it is for,
            technologies used, related projects, and contact steps.
          </p>
          <p>
            If you want to see finished examples first, visit the{" "}
            <TextLink href="/projects">projects page</TextLink>. If you already
            know the kind of project you need, use the contact page and share the
            scope clearly.
          </p>
        </EditorialSection>

        <section className="divide-y divide-white/10 border-y border-white/10">
          {services.map((service) => (
            <article
              key={service.slug}
              className="grid gap-5 py-10 md:grid-cols-[280px_1fr] md:gap-12 md:py-12"
            >
              <h2 className="text-2xl font-medium tracking-[-0.04em] md:text-4xl">
                <TextLink href={service.path}>{service.name}</TextLink>
              </h2>
              <div>
                <p className="text-base leading-relaxed text-white/72 md:text-lg">
                  {service.short}
                </p>
                <p className="mt-4 text-sm text-white/60">
                  Focus: {service.focus}
                </p>
                <p className="mt-5 text-sm">
                  <TextLink href={service.path}>
                    Read about {service.name}
                  </TextLink>
                </p>
              </div>
            </article>
          ))}
        </section>

        <CtaBand text="Not sure which service fits your idea? Send the goal, examples you like, and the pages or features you need. Kunal Builds can help shape the right scope." />
      </SeoPageShell>
    </>
  );
}
