import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import {
  EditorialSection,
  SeoPageShell,
  TextLink,
} from "@/components/SeoPageShell";
import { breadcrumbSchema, createMetadata, webPageSchema } from "@/lib/seo";
import { socialProfiles } from "@/lib/site-data";

const description =
  "Contact Kunal Builds for websites, landing pages, dashboards, mobile apps, UI/UX design, redesigns, and MVP development.";

export const metadata: Metadata = createMetadata({
  title: "Contact Kunal Builds | Web & App Developer",
  description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SeoJsonLd
        data={[
          webPageSchema({
            path: "/contact",
            name: "Contact Kunal Builds",
            description,
            pageType: "ContactPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <SeoPageShell
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
        eyebrow="India Remote"
        title="Contact Kunal Builds"
        intro={
          <p>
            Kunal Builds is available for websites, landing pages, dashboards,
            mobile apps, redesigns, UI/UX interfaces, and startup MVP projects.
            Share the goal, pages or screens, features, and references you have
            in mind.
          </p>
        }
      >
        <EditorialSection title="Email">
          <p>
            Email:{" "}
            <TextLink href="mailto:kkunaall10@gmail.com">
              kkunaall10@gmail.com
            </TextLink>
          </p>
          <p>
            This is the safest direct contact option for project discussions,
            scope details, links, references, and follow-up questions.
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

        <EditorialSection title="Project Details to Send">
          <p>
            A useful first message includes the type of project, the number of
            pages or screens, the main goal, examples you like, required
            features, and whether the project needs backend tools such as
            Firebase or Supabase.
          </p>
          <p>
            You do not need a perfect brief. A short explanation is enough to
            begin shaping the scope. Kunal Builds can help turn the rough idea
            into a cleaner structure for a website, landing page, dashboard,
            mobile app, redesign, UI/UX interface, or MVP.
          </p>
        </EditorialSection>

        <EditorialSection title="Useful Links">
          <p>
            Learn more on the <TextLink href="/about">about page</TextLink>,
            explore <TextLink href="/projects">projects</TextLink>, or compare{" "}
            <TextLink href="/services">services</TextLink> before reaching out.
          </p>
          <p>Location: Haryana, India. Work availability: India Remote.</p>
        </EditorialSection>
      </SeoPageShell>
    </>
  );
}
