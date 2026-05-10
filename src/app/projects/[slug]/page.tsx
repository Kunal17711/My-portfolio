import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  CtaBand,
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { absoluteUrl, breadcrumbSchema, createMetadata, webPageSchema } from "@/lib/seo";
import { getProject, getService, projects } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

type ProjectSeoFields = NonNullable<ReturnType<typeof getProject>> & {
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  const projectWithSeo = project as ProjectSeoFields;
  const title = projectWithSeo.seoTitle || `${project.name} Project | Kunal Builds`;
  const description = projectWithSeo.seoDescription || `Explore ${project.name}, a ${project.type} project by Kunal Builds focused on clean UI, responsive design, practical functionality, and premium digital product execution.`;

  return createMetadata({
    title,
    description,
    path: project.path,
    image: project.image,
    keywords: projectWithSeo.keywords,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const detailDescription = `Explore ${project.name}, a ${project.type} project by Kunal Builds focused on clean UI, responsive design, practical functionality, and premium digital product execution.`;
  const creativeType =
    project.type.toLowerCase().includes("app") ||
    project.type.toLowerCase().includes("dashboard") ||
    project.type.toLowerCase().includes("platform")
      ? "SoftwareApplication"
      : "CreativeWork";

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": creativeType,
    "@id": `${absoluteUrl(project.path)}#project`,
    name: `${project.name} by Kunal Builds`,
    url: absoluteUrl(project.path),
    image: absoluteUrl(project.image),
    description: project.description,
    creator: {
      "@id": "https://heyitskunal.vercel.app/#person",
    },
    applicationCategory:
      creativeType === "SoftwareApplication" ? "WebApplication" : undefined,
    operatingSystem:
      creativeType === "SoftwareApplication" ? "Web browser" : undefined,
    programmingLanguage: project.tech,
  };

  return (
    <>
      <SeoJsonLd
        data={[
          webPageSchema({
            path: project.path,
            name: `${project.name} Project | Kunal Builds`,
            description: detailDescription,
          }),
          creativeWorkSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.name, path: project.path },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.name, href: project.path },
        ]}
        eyebrow={project.type}
        title={`${project.name} by Kunal Builds`}
        intro={
          <div className="space-y-6">
            <p>{detailDescription}</p>
            {project.liveUrl && (
              <p>
                <TextLink href={project.liveUrl}>
                  Visit Live Project →
                </TextLink>
              </p>
            )}
          </div>
        }
      >
        <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1120px) 100vw, 1120px"
            className="object-cover"
            priority
          />
        </div>

        <EditorialSection title="Project Overview">
          <p>{project.overview}</p>
        </EditorialSection>

        <EditorialSection title="Problem">
          <p>{project.problem}</p>
        </EditorialSection>

        <EditorialSection title="Solution">
          <p>{project.solution}</p>
        </EditorialSection>

        <EditorialSection title="Features">
          <ul className="space-y-3">
            {project.features.map((feature) => (
              <li key={feature}>- {feature}</li>
            ))}
          </ul>
        </EditorialSection>

        <EditorialSection title="Tech Stack">
          <p>{project.tech.join(", ")}</p>
          <p>
            The stack was chosen to support clean frontend execution,
            responsive layout, and practical product development. The project is
            presented as a portfolio case study, so no unverified traffic,
            revenue, user, or client claims are included.
          </p>
        </EditorialSection>

        <EditorialSection title="Design Approach">
          <p>{project.designApproach}</p>
        </EditorialSection>

        <EditorialSection title="What This Project Shows">
          <p>{project.shows}</p>
          <p>
            You can also browse the full{" "}
            <TextLink href="/projects">projects archive</TextLink> or compare
            related services below.
          </p>
        </EditorialSection>

        <EditorialSection title="Related Services">
          <div className="space-y-3">
            {project.relevantServices.map((serviceSlug) => {
              const service = getService(serviceSlug);
              if (!service) {
                return null;
              }

              return (
                <p key={service.slug}>
                  <TextLink href={service.path}>{service.name}</TextLink> -{" "}
                  {service.short}
                </p>
              );
            })}
          </div>
        </EditorialSection>

        <EditorialSection title="Work With Kunal Builds">
          <p>
            If you want a project with a similar level of structure, clean UI,
            responsive execution, and practical product thinking, contact Kunal
            Builds with the type of website, app, dashboard, or interface you
            want to create.
          </p>
        </EditorialSection>

        <CtaBand text={`Interested in a project like ${project.name}? Share the idea, target users, required pages or screens, and any references through the contact page.`} />
      </SeoPageShell>
    </>
  );
}
