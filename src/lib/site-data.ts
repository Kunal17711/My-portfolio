import { SITE_URL } from "./seo";

export const socialProfiles = [
  { label: "Instagram", href: "https://instagram.com/iiblamekunal" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kunalldev" },
  { label: "X", href: "https://x.com/kunallbuilds" },
  { label: "GitHub", href: "https://github.com/Kunal17711" },
  { label: "Fiverr", href: "https://www.fiverr.com/s/yv3DB6z" },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share",
  },
] as const;

export const siteNavigation = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
] as const;

export const personSchema = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Kunal",
  alternateName: ["Kunal Builds", "Kunal Dev", "Kunal Developer", "Kunal17711"],
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  jobTitle: "Web and App Developer",
  description:
    "Kunal Builds is a web and app developer from Haryana, India building websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
  email: "mailto:kkunaall10@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Haryana",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Web Development",
    "App Development",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "Expo",
    "Firebase",
    "Supabase",
    "UI/UX Design",
    "Landing Pages",
    "Dashboards",
    "Mobile Apps",
    "Website Redesign",
    "Startup MVP Development",
  ],
  sameAs: socialProfiles.map((profile) => profile.href),
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Kunal Builds",
  description:
    "Portfolio of Kunal Builds, a web and app developer building websites, apps, dashboards, landing pages, and digital products.",
  publisher: {
    "@id": `${SITE_URL}/#person`,
  },
};

export const professionalServiceSchema = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#service`,
  name: "Kunal Builds",
  url: SITE_URL,
  description:
    "Web and app development services for websites, landing pages, dashboards, mobile apps, UI/UX design, redesigns, and startup MVPs.",
  areaServed: "India",
  email: "kkunaall10@gmail.com",
  founder: {
    "@id": `${SITE_URL}/#person`,
  },
  sameAs: socialProfiles.map((profile) => profile.href),
  serviceType: [
    "Website Development",
    "Landing Page Development",
    "Dashboard Development",
    "Mobile App Development",
    "UI/UX Design",
    "Website Redesign",
    "Startup MVP Development",
  ],
};

export const brandSchema = {
  "@type": "Brand",
  "@id": `${SITE_URL}/#brand`,
  name: "Kunal Builds",
  alternateName: ["Kunal Dev", "Kunal Developer", "Kunal17711"],
  url: SITE_URL,
  sameAs: socialProfiles.map((profile) => profile.href),
};

export const navigationSchema = {
  "@type": "SiteNavigationElement",
  "@id": `${SITE_URL}/#site-navigation`,
  name: siteNavigation.map((item) => item.name),
  url: siteNavigation.map((item) => `${SITE_URL}${item.path === "/" ? "" : item.path}`),
};

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    professionalServiceSchema,
    brandSchema,
    navigationSchema,
  ],
};

export const projects = [
  {
    slug: "profileos",
    name: "ProfileOS",
    path: "/projects/profileos",
    image: "/assets/profileos.webp",
    imageAlt: "ProfileOS digital product landing page preview by Kunal Builds",
    type: "Digital Product / Landing Page",
    tech: [
      "Next.js",
      "Tailwind CSS",
      "Product Design",
      "Landing Page",
      "Digital Product",
      "Personal Branding",
    ],
    liveUrl: "https://profile-os-lilac.vercel.app/",
    description:
      "ProfileOS is a playful, conversion-focused digital product landing page built around the idea of upgrading a user’s online profile. It presents ready-made bios, photo ideas, DM starters, profile checklists, Canva templates, and AI prompts in a clean, friendly, and visually memorable interface.",
    overview:
      "ProfileOS is a digital product landing page designed to turn a simple profile-improvement kit into a polished, trust-building product experience. The page communicates the value of profile glow-ups through playful visuals, clear messaging, strong CTAs, and a friendly conversion-focused layout.",
    problem:
      "Many personal-branding and profile-help products look generic or unclear. The goal was to create a landing page that immediately feels useful, fun, and trustworthy while clearly explaining what users get: bios, photo ideas, DM starters, profile checklists, Canva templates, and AI prompts.",
    solution:
      "I designed ProfileOS as a clean, bright, product-led landing page with strong hero messaging, soft visual hierarchy, playful elements, clear benefit-driven copy, and direct CTAs. The experience focuses on making the product feel easy to understand, easy to buy, and memorable.",
    features: [
      "Conversion-focused hero section",
      "Clear product positioning for profile upgrades",
      "Ready-made bios and profile checklist messaging",
      "Photo ideas, DM starters, Canva templates, and AI prompts",
      "Friendly playful visual style",
      "Strong CTA flow",
      "Responsive layout",
      "Clean product storytelling",
    ],
    designApproach:
      "The visual direction uses a soft, playful, creator-focused style with light backgrounds, purple accents, rounded UI elements, sticker-like details, and a confident “glow-up” product feeling. The design is meant to feel approachable, modern, and useful rather than overly corporate.",
    shows:
      "ProfileOS presents a small digital product with a strong brand feel, clear messaging, and a polished landing-page experience suitable for selling profile-improvement resources online.",
    relevantServices: [
      "landing-page-development",
      "website-development",
      "ui-ux-design",
    ],
    seoTitle: "ProfileOS Case Study | Digital Product Landing Page by Kunal Builds",
    seoDescription:
      "ProfileOS is a digital product landing page by Kunal Builds for profile glow-ups, ready-made bios, photo ideas, DM starters, Canva templates, AI prompts, and personal branding resources.",
    keywords: [
      "ProfileOS",
      "ProfileOS landing page",
      "digital product landing page",
      "profile glow up kit",
      "Instagram bio ideas",
      "dating profile ideas",
      "Canva templates",
      "AI prompts",
      "personal branding website",
      "Kunal Builds project",
      "Kunal Dev portfolio",
      "web app developer portfolio",
      "landing page designer India",
      "product website designer",
    ],
  },
  {
    slug: "vidora",
    name: "Vidora",
    path: "/projects/vidora",
    image: "/assets/vidora.webp",
    imageAlt: "Vidora website landing page project by Kunal Builds",
    type: "Website / platform interface",
    tech: ["Next.js", "Tailwind CSS", "Cloudinary"],
    liveUrl: "https://vidora.co.in/",
    description:
      "A video editor marketplace landing page focused on clean positioning, responsive UI, and creator-focused product storytelling.",
    overview:
      "Vidora is a website and platform interface project built around a clear product story: helping video creators understand an offer quickly and move through the page without confusion. The page direction focuses on strong first-screen positioning, clean sections, visual hierarchy, and a polished responsive layout that feels useful on both desktop and mobile.",
    problem:
      "Creator and service marketplaces can become visually noisy when every section tries to explain everything at once. The challenge for Vidora was to present a product-style offer with enough clarity for a visitor to understand the purpose, trust the interface, and keep exploring without being overloaded.",
    solution:
      "The interface uses focused section structure, confident spacing, and direct product storytelling. The build keeps the landing page fast, readable, and visually premium while still making room for platform-style details such as service positioning, creator context, and clear calls to action.",
    features: [
      "Responsive landing page sections",
      "Creator-focused product messaging",
      "Clean hero and service positioning",
      "Visual hierarchy for quick scanning",
      "Cloudinary-ready media direction",
    ],
    designApproach:
      "The visual approach is minimal and high contrast, with a layout that gives the core offer room to breathe. The goal was not to overdecorate the page, but to make the product feel sharp, modern, and easy to understand.",
    shows:
      "This project shows Kunal Builds' ability to create a product-style website with clean design, responsive execution, and practical storytelling for a digital platform.",
    relevantServices: ["website-development", "landing-page-development", "ui-ux-design"],
  },
  {
    slug: "raksha-web",
    name: "Raksha Web",
    path: "/projects/raksha-web",
    image: "/assets/raksha-web.webp",
    imageAlt: "Raksha Web product website project by Kunal Builds",
    type: "Safety product website",
    tech: ["React", "Supabase", "Node.js"],
    liveUrl: "https://get-raksha.web.app/",
    description:
      "A women-safety product website concept focused on strong messaging, product positioning, and clean digital presence.",
    overview:
      "Raksha Web is a safety product website concept designed to communicate a serious product idea with clarity and trust. The page direction avoids gimmicks and focuses on strong messaging, simple navigation, and a clean product presence that helps visitors understand the safety use case.",
    problem:
      "Safety-focused products need careful communication. If the interface feels confusing, too decorative, or too vague, the product can lose trust quickly. The challenge was to keep the website direct while still making it feel modern and complete.",
    solution:
      "The website uses clear section flow, focused copy areas, and a product-first layout. React handles the interface, while Supabase and Node.js fit the idea of a product that can connect to real data, accounts, and backend flows when expanded.",
    features: [
      "Product-focused website structure",
      "Safety-first messaging",
      "Responsive interface sections",
      "Backend-ready product direction",
      "Clear navigation and call-to-action areas",
    ],
    designApproach:
      "The design keeps contrast, spacing, and readability at the center. The tone is practical and serious, using a clean digital presence rather than exaggerated claims.",
    shows:
      "This project shows how Kunal Builds can shape a sensitive product idea into a readable, credible, and responsive web presence.",
    relevantServices: ["website-development", "startup-mvp-development", "ui-ux-design"],
  },
  {
    slug: "raksha-app",
    name: "Raksha App",
    path: "/projects/raksha-app",
    image: "/assets/raksha-app.webp",
    imageAlt: "Raksha mobile app interface project by Kunal Builds",
    type: "Mobile app interface",
    tech: ["React Native", "Firebase", "Maps"],
    liveUrl: "https://get-raksha-app.web.app/",
    description:
      "A personal safety mobile app concept with SOS flows, live location ideas, trusted contacts, and safety-first UX.",
    overview:
      "Raksha App is a mobile app interface concept centered on personal safety flows. The project explores how SOS actions, trusted contacts, location ideas, and simple mobile navigation can come together inside an app experience that needs to feel quick and understandable.",
    problem:
      "A safety app must be fast to read and simple to use. Complicated screens, unclear buttons, or weak hierarchy can create friction in moments where users need immediate action. The challenge was to keep the mobile experience focused without making it feel unfinished.",
    solution:
      "The app concept uses React Native and Firebase-friendly thinking to organize screens around action, location, and trusted contacts. The interface gives important actions visual priority and keeps secondary details easy to find.",
    features: [
      "SOS-oriented mobile screen flow",
      "Trusted contact interface ideas",
      "Location and map-ready product thinking",
      "Mobile-first visual hierarchy",
      "App prototype direction for MVP planning",
    ],
    designApproach:
      "The design approach is direct, readable, and mobile-native. Buttons, spacing, and screen structure are shaped around quick use rather than heavy decoration.",
    shows:
      "This project shows Kunal Builds' ability to think through mobile app structure, React Native interfaces, and safety-first product UX.",
    relevantServices: ["mobile-app-development", "startup-mvp-development", "ui-ux-design"],
  },
  {
    slug: "edusync",
    name: "EduSync",
    path: "/projects/edusync",
    image: "/assets/edusync.webp",
    imageAlt: "EduSync education dashboard project by Kunal Builds",
    type: "Education dashboard / platform",
    tech: ["React", "Next.js", "Supabase"],
    liveUrl: "https://edusync-frontend-beta.vercel.app/",
    description:
      "An education-focused dashboard/project interface for school or learning workflows.",
    overview:
      "EduSync is an education dashboard and platform interface project built around learning workflows, school-style organization, and clean admin usability. The project focuses on making data-heavy education tasks feel easier to scan and manage.",
    problem:
      "Education dashboards often need to hold many different workflows: students, classes, teachers, updates, records, and administrative actions. Without structure, those screens can become dense and tiring.",
    solution:
      "The EduSync interface uses dashboard patterns such as grouped sections, readable layout, and clear navigation. React, Next.js, and Supabase fit the project direction because they support a modern frontend with room for database-backed workflows.",
    features: [
      "Education dashboard layout",
      "Admin-style workflow sections",
      "Student and learning data interface direction",
      "Responsive page structure",
      "Supabase-ready product thinking",
    ],
    designApproach:
      "The design is functional and quiet, built for scanning rather than show. Spacing, labels, and section hierarchy help the interface feel practical for repeated use.",
    shows:
      "This project shows how Kunal Builds can create dashboard-style interfaces that balance clean visuals with operational clarity.",
    relevantServices: ["dashboard-development", "startup-mvp-development", "ui-ux-design"],
  },
  {
    slug: "fashion-website",
    name: "Fashion Website",
    path: "/projects/fashion-website",
    image: "/assets/fashion-website.webp",
    imageAlt: "Fashion website landing page project by Kunal Builds",
    type: "Fashion landing page / ecommerce UI",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://fashion-landing-page-kappa-ten.vercel.app/",
    description:
      "A fashion website interface focused on premium product presentation, clean layout, and responsive sections.",
    overview:
      "Fashion Website is a landing page and ecommerce-style UI project focused on product presentation. The page direction uses clean visual hierarchy, strong imagery, and responsive sections to make a fashion brand or product line feel polished online.",
    problem:
      "Fashion pages depend heavily on first impression. If the layout feels cluttered or the product hierarchy is weak, the page can look generic even when the visuals are strong.",
    solution:
      "The interface keeps product areas, text blocks, and calls to action organized. React and Tailwind CSS make it easy to build responsive sections while keeping the visual system consistent across screen sizes.",
    features: [
      "Premium landing page layout",
      "Responsive fashion product sections",
      "Clean call-to-action placement",
      "Strong image and text hierarchy",
      "Ecommerce-style presentation direction",
    ],
    designApproach:
      "The design approach is restrained and product-led. The page gives the fashion visuals space while keeping the interface simple enough for visitors to understand quickly.",
    shows:
      "This project shows Kunal Builds' ability to create polished landing pages for visual products and ecommerce-style experiences.",
    relevantServices: ["landing-page-development", "website-development", "website-redesign"],
  },
  {
    slug: "solvare",
    name: "Solvare",
    path: "/projects/solvare",
    image: "/assets/solvare.webp",
    imageAlt: "Solvare web interface project by Kunal Builds",
    type: "Web interface",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://solvare.art/",
    description:
      "A polished web interface focused on visual clarity, clean sections, and product-style UI.",
    overview:
      "Solvare is a polished web interface project focused on clear sections and product-style presentation. The build explores how a modern web page can feel complete without relying on cluttered visuals or exaggerated messaging.",
    problem:
      "Many product interfaces become difficult to read when the layout gives every element equal importance. The challenge was to keep Solvare visually interesting while preserving clarity.",
    solution:
      "The page uses strong spacing, readable sections, and a clean component rhythm. React and Tailwind CSS support quick iteration while keeping the interface consistent.",
    features: [
      "Polished web interface sections",
      "Responsive frontend structure",
      "Clear product-style layout",
      "Readable content hierarchy",
      "Modern visual direction",
    ],
    designApproach:
      "The approach is clean and deliberate, using contrast and spacing to guide attention. Each section is designed to feel useful rather than decorative.",
    shows:
      "This project shows Kunal Builds' ability to build clean web interfaces with a practical product feel.",
    relevantServices: ["website-development", "ui-ux-design", "landing-page-development"],
  },
  {
    slug: "wishwrap",
    name: "WishWrap",
    path: "/projects/wishwrap",
    image: "/assets/wishwrap.webp",
    imageAlt: "WishWrap product interface project by Kunal Builds",
    type: "Product interface",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://wishwrap.in/",
    description:
      "A gifting/product-style interface focused on simple user flow and clean presentation.",
    overview:
      "WishWrap is a gifting and product-style interface project focused on simple flow, friendly presentation, and clean user movement through the page. The product idea needs to feel approachable while still looking polished.",
    problem:
      "Gift-oriented products can easily become too playful or unclear. The challenge was to keep the interface warm enough for the concept while still building a page structure that feels professional.",
    solution:
      "The interface organizes the product idea into readable sections with clear visual pacing. React and Tailwind CSS keep the build flexible and responsive.",
    features: [
      "Product-style web interface",
      "Simple user flow direction",
      "Responsive layout",
      "Clear product presentation",
      "Clean frontend structure",
    ],
    designApproach:
      "The design uses a clean structure and readable hierarchy so the product idea can be understood quickly without relying on noisy decoration.",
    shows:
      "This project shows how Kunal Builds can turn a consumer product idea into a clean, readable web interface.",
    relevantServices: ["website-development", "landing-page-development", "ui-ux-design"],
  },
  {
    slug: "paradox",
    name: "Paradox",
    path: "/projects/paradox",
    image: "/assets/paradox.webp",
    imageAlt: "Paradox creative web interface project by Kunal Builds",
    type: "Creative web interface",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://paradox-verse.web.app/",
    description:
      "A creative web interface focused on bold visuals and modern interaction design.",
    overview:
      "Paradox is a creative web interface project focused on bold visual presentation and modern layout direction. The goal was to explore a more expressive digital experience while keeping the page structure understandable.",
    problem:
      "Creative interfaces can become hard to use when visual impact is treated as more important than page clarity. The challenge was to keep the project visually strong without losing the visitor.",
    solution:
      "The interface uses React and Tailwind CSS to shape a bold first impression, structured content areas, and responsive behavior. The result is a creative page direction that still has a clear flow.",
    features: [
      "Bold creative interface",
      "Modern responsive layout",
      "High-impact visual sections",
      "Clean frontend implementation",
      "Interaction-ready structure",
    ],
    designApproach:
      "The design leans into contrast, scale, and strong spacing. It keeps the visual experience expressive while maintaining enough structure for usability.",
    shows:
      "This project shows Kunal Builds' ability to handle creative web direction without losing practical frontend execution.",
    relevantServices: ["ui-ux-design", "website-development", "landing-page-development"],
  },
  {
    slug: "picprompt",
    name: "PicPrompt",
    path: "/projects/picprompt",
    image: "/assets/picprompt.webp",
    imageAlt: "PicPrompt AI product interface project by Kunal Builds",
    type: "AI/product interface",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "https://www.picprompt.shop/",
    description:
      "A prompt/product interface concept focused on usability and clean UI.",
    overview:
      "PicPrompt is an AI and product interface concept focused on prompt workflows, tool usability, and clean interface structure. The project explores how an AI-oriented page can feel useful instead of confusing.",
    problem:
      "AI tools often need to explain a workflow clearly. If the interface hides the main action or adds too much visual noise, users may not understand what to do next.",
    solution:
      "The interface organizes the product idea around clear actions, readable sections, and a simple visual system. React and Tailwind CSS keep the tool-like experience fast to build and easy to refine.",
    features: [
      "AI product interface direction",
      "Prompt-focused user flow",
      "Clean responsive UI",
      "Tool-style layout patterns",
      "Readable product sections",
    ],
    designApproach:
      "The design keeps the interface practical and focused. Visual polish supports the workflow instead of distracting from it.",
    shows:
      "This project shows Kunal Builds' ability to design and build interfaces for AI product ideas with clean usability.",
    relevantServices: ["ui-ux-design", "startup-mvp-development", "website-development"],
  },
  {
    slug: "beyond-reality",
    name: "Beyond Reality",
    path: "/projects/beyond-reality",
    image: "/assets/beyond-reality.webp",
    imageAlt: "Beyond Reality creative digital interface project by Kunal Builds",
    type: "Creative digital interface",
    tech: ["React", "Tailwind CSS"],
    liveUrl: "http://beyond-reality-six.vercel.app/",
    description:
      "A creative digital interface focused on immersive visual presentation and modern layout.",
    overview:
      "Beyond Reality is a creative digital interface project focused on immersive presentation and modern layout. It explores how a website can create a strong visual mood while still functioning as a structured web experience.",
    problem:
      "Immersive web concepts can become visually heavy or difficult to navigate. The challenge was to keep the creative direction strong while preserving responsive structure and readable sections.",
    solution:
      "The project uses React and Tailwind CSS to balance visual presentation with clean layout. The interface is shaped around bold imagery, section rhythm, and a modern digital-product feel.",
    features: [
      "Immersive visual presentation",
      "Creative responsive layout",
      "Modern frontend structure",
      "High-impact page sections",
      "Clean visual hierarchy",
    ],
    designApproach:
      "The design approach uses scale, contrast, and strong imagery while keeping the page organized enough for visitors to follow the experience.",
    shows:
      "This project shows Kunal Builds' ability to build creative digital interfaces with strong presentation and frontend discipline.",
    relevantServices: ["website-development", "ui-ux-design", "landing-page-development"],
  },
] as const;

export const sharedFaq = [
  {
    question: "What does Kunal Builds do?",
    answer:
      "Kunal Builds creates websites, landing pages, dashboards, mobile apps, UI/UX interfaces, and digital products.",
  },
  {
    question: "What technologies does Kunal Builds use?",
    answer:
      "Kunal uses React, Next.js, TypeScript, Tailwind CSS, React Native, Expo, Firebase, and Supabase.",
  },
  {
    question: "How can I contact Kunal Builds?",
    answer:
      "You can contact Kunal Builds by email at kkunaall10@gmail.com or through LinkedIn, Instagram, X, Fiverr, Upwork, or GitHub.",
  },
] as const;

export const services = [
  {
    slug: "website-development",
    name: "Website Development",
    path: "/services/website-development",
    title: "Website Development by Kunal Builds | React & Next.js Developer",
    description:
      "Website development by Kunal Builds for responsive portfolio sites, business websites, product pages, and clean React or Next.js builds.",
    short:
      "Responsive websites, portfolio sites, business websites, fast UI, and clean React or Next.js builds.",
    focus:
      "responsive websites, portfolio sites, business websites, fast UI, clean build",
    includes: [
      "Responsive website structure for desktop, tablet, and mobile",
      "Clean page sections with readable content hierarchy",
      "React or Next.js frontend development",
      "Tailwind CSS styling with consistent spacing and typography",
      "Deployment-ready build with metadata and basic technical SEO",
    ],
    forWho:
      "This service is for creators, students, small businesses, and early-stage ideas that need a real website instead of a quick template. It fits portfolio websites, business homepages, personal brands, and product-style websites that need a clean web presence.",
    process:
      "The work starts by understanding the purpose of the site, the audience, and the sections needed. From there, Kunal shapes the page structure, builds the interface, checks responsiveness, and prepares the website for launch.",
    tech:
      "Website builds can use React, Next.js, TypeScript, Tailwind CSS, Firebase, Supabase, and deployment platforms such as Vercel depending on the project requirements.",
    examples: ["vidora", "raksha-web", "solvare"],
    faqs: [
      {
        question: "Can Kunal Builds create a business website?",
        answer:
          "Yes, Kunal Builds can create responsive business websites with clear sections, clean UI, and a launch-ready frontend.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "landing-page-development",
    name: "Landing Page Development",
    path: "/services/landing-page-development",
    title: "Landing Page Development by Kunal Builds | High-Converting Pages",
    description:
      "Landing page development by Kunal Builds for responsive launch pages, product pages, hero sections, CTAs, and clean page structure.",
    short:
      "Hero sections, CTAs, responsive landing pages, launch pages, product pages, and clear offer presentation.",
    focus:
      "hero sections, CTAs, responsive landing pages, launch pages, product pages",
    includes: [
      "Clear hero section with offer-focused messaging",
      "Responsive landing page sections",
      "Call-to-action placement and clean page flow",
      "Product, service, or launch page structure",
      "Fast frontend build with polished visual details",
    ],
    forWho:
      "This service is for people launching a product, service, course, app idea, portfolio offer, or small campaign. It is useful when a single focused page needs to explain the offer and guide visitors toward contact, signup, or another next step.",
    process:
      "Kunal starts with the offer and audience, then plans the order of sections so the page reads naturally. The build focuses on clarity, responsiveness, visual trust, and a strong first impression without adding fake urgency or inflated claims.",
    tech:
      "Landing pages are usually built with React, Next.js, TypeScript, and Tailwind CSS. Firebase or Supabase can be connected when the page needs forms, waitlists, authentication, or stored submissions.",
    examples: ["vidora", "fashion-website", "wishwrap"],
    faqs: [
      {
        question: "Can Kunal Builds create a landing page?",
        answer:
          "Yes, Kunal Builds can create responsive landing pages with clean UI, strong messaging, and fast performance.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "dashboard-development",
    name: "Dashboard Development",
    path: "/services/dashboard-development",
    title: "Dashboard Development by Kunal Builds | Admin & SaaS Interfaces",
    description:
      "Dashboard development by Kunal Builds for admin panels, SaaS interfaces, data UI, tables, filters, and practical product workflows.",
    short:
      "Admin panels, SaaS dashboards, data UI, tables, filters, and role-based interface planning.",
    focus:
      "admin panels, SaaS dashboards, data UI, tables, filters, role-based interfaces",
    includes: [
      "Dashboard layout and navigation structure",
      "Tables, filters, empty states, and data views",
      "Admin or SaaS-style interface patterns",
      "Frontend components for repeated workflows",
      "Backend-ready planning for Supabase or Firebase data",
    ],
    forWho:
      "This service is for founders, students, builders, and small teams that need a practical interface for managing information. It fits admin panels, school dashboards, product dashboards, internal tools, and MVP interfaces.",
    process:
      "The work begins by mapping the user roles, data views, and repeated actions. Kunal then builds a clean interface that makes scanning, comparing, editing, and moving through data feel easier.",
    tech:
      "Dashboard work can use React, Next.js, TypeScript, Tailwind CSS, Supabase, Firebase, and chart or table libraries when the project needs richer data display.",
    examples: ["edusync", "raksha-web", "picprompt"],
    faqs: [
      {
        question: "Can Kunal Builds create dashboards?",
        answer:
          "Yes, Kunal Builds can create admin dashboards, SaaS-style interfaces, data views, tables, filters, and frontend workflows.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    path: "/services/mobile-app-development",
    title: "Mobile App Development by Kunal Builds | React Native & Expo",
    description:
      "Mobile app development by Kunal Builds using React Native and Expo for app interfaces, prototypes, and startup MVPs.",
    short:
      "React Native apps, Expo apps, mobile UI, app prototypes, MVP screens, and practical app flows.",
    focus:
      "React Native apps, Expo apps, mobile UI, app prototypes, MVPs",
    includes: [
      "Mobile app screen structure and navigation planning",
      "React Native and Expo interface development",
      "App prototype screens for MVP testing",
      "Authentication and backend-ready planning",
      "Responsive mobile UI patterns for real device use",
    ],
    forWho:
      "This service is for app ideas that need a real mobile interface before becoming a larger product. It fits startup concepts, student projects, safety apps, utility apps, dashboards on mobile, and MVP prototypes.",
    process:
      "Kunal starts with the core app flow: what the user opens first, what action matters most, and which screens are required. The build then focuses on clean mobile UI, predictable navigation, and practical product behavior.",
    tech:
      "Mobile app projects can use React Native, Expo, TypeScript, Firebase, Supabase, maps, authentication, storage, and API integrations depending on the scope.",
    examples: ["raksha-app", "edusync", "picprompt"],
    faqs: [
      {
        question: "Can Kunal Builds build mobile apps?",
        answer:
          "Yes, Kunal Builds works with React Native and Expo to create mobile app interfaces and MVPs.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    path: "/services/ui-ux-design",
    title: "UI/UX Design by Kunal Builds | Clean Product Interfaces",
    description:
      "UI/UX design by Kunal Builds for wireframes, product UI, app screens, website interfaces, and clean visual systems.",
    short:
      "Wireframes, product UI, app screens, website UI, clean visual systems, and practical user flow design.",
    focus:
      "wireframes, product UI, app screens, website UI, clean visual systems",
    includes: [
      "Interface direction for websites, apps, and dashboards",
      "Wireframe and section planning",
      "Clean visual systems for spacing, type, and layout",
      "User flow thinking for practical product actions",
      "Design-to-development friendly structure",
    ],
    forWho:
      "This service is for builders who know what they want to create but need the interface to feel more polished and easier to use. It fits app screens, dashboard views, landing pages, product interfaces, and redesign planning.",
    process:
      "The process focuses on understanding the main user action, simplifying the screen, and shaping a hierarchy that makes the interface easier to scan. Kunal designs with development in mind, so the UI can move cleanly into a React or Next.js build.",
    tech:
      "UI/UX work connects naturally with React, Next.js, Tailwind CSS, React Native, Expo, Firebase, and Supabase because the design decisions are shaped around real product implementation.",
    examples: ["raksha-app", "paradox", "beyond-reality"],
    faqs: [
      {
        question: "Can Kunal Builds design app screens?",
        answer:
          "Yes, Kunal Builds can design clean app screens, product interfaces, website UI, dashboard views, and user flows.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "startup-mvp-development",
    name: "Startup MVP Development",
    path: "/services/startup-mvp-development",
    title: "Startup MVP Development by Kunal Builds | Product Builds",
    description:
      "Startup MVP development by Kunal Builds for product ideas, frontend builds, backend connections, Supabase, Firebase, and launch-ready UI.",
    short:
      "Turning startup ideas into MVPs with frontend, backend connection, Supabase or Firebase, and launch-ready UI.",
    focus:
      "startup ideas, MVPs, frontend, backend connection, Supabase/Firebase, launch-ready UI",
    includes: [
      "MVP scope planning and feature prioritization",
      "Frontend product interface development",
      "Supabase or Firebase backend connection",
      "Authentication, storage, or database-ready flows when needed",
      "Launch-ready UI for testing an early product idea",
    ],
    forWho:
      "This service is for early-stage founders, students, creators, and small teams that need to turn an idea into something usable. It is suited for focused MVPs where the first version needs to prove the product direction without pretending to be a full company platform.",
    process:
      "The work starts by narrowing the MVP to the few features that matter most. Kunal then builds the interface, connects backend flows where needed, tests the core experience, and prepares the product for a live demo or early users.",
    tech:
      "MVP projects can use React, Next.js, TypeScript, Tailwind CSS, React Native, Expo, Firebase, Supabase, authentication, storage, and deployment on Vercel or similar platforms.",
    examples: ["raksha-app", "edusync", "picprompt"],
    faqs: [
      {
        question: "Can Kunal Builds help with startup MVPs?",
        answer:
          "Yes, Kunal Builds can help shape and build focused MVPs with clean UI, frontend development, and backend connections through Firebase or Supabase when needed.",
      },
      ...sharedFaq,
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    path: "/services/website-redesign",
    title: "Website Redesign by Kunal Builds | Modern Premium UI",
    description:
      "Website redesign by Kunal Builds for improving old websites with modern UI, responsiveness, clearer messaging, and cleaner page structure.",
    short:
      "Redesigning old websites, improving UI, responsiveness, clarity, and conversion flow.",
    focus:
      "old websites, improved UI, responsiveness, clarity, conversion flow",
    includes: [
      "Review of current page structure and visual issues",
      "Cleaner section flow and messaging hierarchy",
      "Modern responsive UI redesign",
      "Improved spacing, typography, and mobile experience",
      "Frontend rebuild or redesign implementation depending on scope",
    ],
    forWho:
      "This service is for people who already have a website but feel it looks outdated, unclear, slow, or weak on mobile. It fits portfolio websites, business pages, landing pages, and product sites that need a cleaner direction.",
    process:
      "Kunal looks at what the current website is trying to say, where the page loses clarity, and which sections should be improved. The redesign then focuses on better hierarchy, stronger responsiveness, and a more polished web presence.",
    tech:
      "Redesign projects can use React, Next.js, TypeScript, Tailwind CSS, performance improvements, image optimization, and cleaner metadata depending on the existing site.",
    examples: ["fashion-website", "solvare", "vidora"],
    faqs: [
      {
        question: "Can Kunal Builds redesign an existing website?",
        answer:
          "Yes, Kunal Builds can redesign existing websites with improved UI, better responsiveness, clearer messaging, and cleaner page structure.",
      },
      ...sharedFaq,
    ],
  },
] as const;

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export const sitemapPaths = [
  "/",
  "/about",
  "/projects",
  ...projects.map((project) => project.path),
  "/services",
  ...services.map((service) => service.path),
  "/contact",
];
