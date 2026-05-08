import React from "react";

const SITE_URL = "https://heyitskunal.vercel.app";

const SeoJsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kunal Builds",
    "alternateName": ["Kunal", "Kunal Developer", "kunal.dev"],
    "url": SITE_URL,
    "jobTitle": "Web and App Developer",
    "description": "Web and app developer building websites, landing pages, dashboards, mobile apps, and digital products.",
    "email": "mailto:kkunaall10@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sampla",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://instagram.com/iiblamekunal",
      "https://www.linkedin.com/in/kunalldev",
      "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
      "https://www.fiverr.com/s/yv3DB6z",
      "https://x.com/kunallbuilds",
      "https://github.com/Kunal17711"
    ],
    "knowsAbout": [
      "Web Development",
      "App Development",
      "Next.js",
      "React",
      "React Native",
      "Expo",
      "Tailwind CSS",
      "Supabase",
      "UI/UX Design",
      "Landing Pages",
      "Dashboards"
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kunal Builds",
    "url": SITE_URL,
    "description": "Portfolio of Kunal Builds, a web and app developer building premium websites, apps, dashboards, landing pages, and digital products.",
    "publisher": {
      "@type": "Person",
      "name": "Kunal Builds"
    }
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Kunal Builds",
    "url": SITE_URL,
    "description": "Freelance web and app development services for websites, landing pages, dashboards, mobile apps, redesigns, and MVPs.",
    "areaServed": "India",
    "email": "kkunaall10@gmail.com",
    "sameAs": [
      "https://instagram.com/iiblamekunal",
      "https://www.linkedin.com/in/kunalldev",
      "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
      "https://www.fiverr.com/s/yv3DB6z",
      "https://x.com/kunallbuilds",
      "https://github.com/Kunal17711"
    ],
    "serviceType": [
      "Website Development",
      "Mobile App Development",
      "Landing Page Development",
      "Dashboard Development",
      "UI/UX Design",
      "Website Redesign",
      "Startup MVP Development"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
};

export default SeoJsonLd;
