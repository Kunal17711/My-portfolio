import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  CtaBand,
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { absoluteUrl, breadcrumbSchema, createMetadata, webPageSchema } from "@/lib/seo";
import { getProject, getService, services } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return {};
  }

  return createMetadata({
    title: service.title,
    description: service.description,
    path: service.path,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(service.path)}#service`,
    name: service.name,
    url: absoluteUrl(service.path),
    description: service.description,
    provider: {
      "@id": "https://heyitskunal.vercel.app/#service",
    },
    areaServed: "India",
    serviceType: service.name,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
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
          webPageSchema({
            path: service.path,
            name: service.title,
            description: service.description,
          }),
          serviceSchema,
          faqSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: service.path },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: service.path },
        ]}
        eyebrow="Service"
        title={service.name}
        intro={
          <p>
            {service.short} Kunal Builds keeps the work clean, responsive, and
            practical so the final page or product can be understood quickly and
            shared with real users.
          </p>
        }
      >
        <EditorialSection title="Service Overview">
          <p>
            {service.name} by Kunal Builds is focused on {service.focus}. The
            goal is to create something useful, visually clean, and technically
            ready for the way the project needs to be used.
          </p>
          <p>{service.process}</p>
        </EditorialSection>

        <EditorialSection title="What the Service Includes">
          <ul className="space-y-3">
            {service.includes.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </EditorialSection>

        <EditorialSection title="Who It Is For">
          <p>{service.forWho}</p>
          <p>
            It is also useful if you want a developer who thinks about interface
            quality, page flow, responsive behavior, and deployment instead of
            only writing isolated code.
          </p>
        </EditorialSection>

        <EditorialSection title="Technologies Used">
          <p>{service.tech}</p>
          <p>
            The exact stack depends on the project scope. A static marketing
            page does not need the same backend as a dashboard or app MVP, so
            the build is scoped around what the product actually needs.
          </p>
        </EditorialSection>

        <EditorialSection title="Relevant Project Examples">
          <div className="space-y-4">
            {service.examples.map((projectSlug) => {
              const project = getProject(projectSlug);
              if (!project) {
                return null;
              }

              return (
                <p key={project.slug}>
                  <TextLink href={project.path}>{project.name}</TextLink> -{" "}
                  {project.description}
                </p>
              );
            })}
          </div>
        </EditorialSection>

        <EditorialSection title="FAQ">
          <div className="space-y-8">
            {service.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
                  {faq.question}
                </h3>
                <p className="mt-3">{faq.answer}</p>
              </div>
            ))}
          </div>
        </EditorialSection>

        <EditorialSection title="Start a Project">
          <p>
            To start this kind of work, send a short message with the goal, page
            or screen count, examples you like, and the features you need. You
            can also compare all services on the{" "}
            <TextLink href="/services">services page</TextLink>.
          </p>
        </EditorialSection>

        <CtaBand
          title={`Need ${service.name}?`}
          text="Contact Kunal Builds with your project idea, timeline, references, and the most important outcome you want from the build."
        />
      </SeoPageShell>
    </>
  );
}
