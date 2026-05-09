"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

type Project = {
  number: string;
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  image: string;
  objectPosition: string;
  slug: string;
  imageAlt: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "ProfileOS",
    type: "Digital Product",
    year: "2024",
    description:
      "a playful digital product landing page for profile glow-ups, bios, photo ideas, DM starters, Canva templates, and AI prompts.",
    tags: ["next.js", "tailwind", "product"],
    image: "/assets/profileos.webp",
    objectPosition: "object-center",
    slug: "profileos",
    imageAlt: "ProfileOS digital product landing page preview by Kunal Builds",
  },
  {
    number: "02",
    title: "Vidora",
    type: "Website / Platform",
    year: "2024",
    description:
      "a high-end video editor marketplace interface built with a clean landing-page experience, strong hero section, and creator-focused positioning.",
    tags: ["next.js", "tailwind", "cloudinary"],
    image: "/assets/vidora.webp",
    objectPosition: "object-top",
    slug: "vidora",
    imageAlt: "Vidora website landing page project by Kunal Builds",
  },
  {
    number: "03",
    title: "Raksha Web",
    type: "Safety Product Website",
    year: "2024",
    description:
      "a bold product website for a women-safety ecosystem with strong storytelling, product positioning, and conversion-focused sections.",
    tags: ["react", "supabase", "product"],
    image: "/assets/raksha-web.webp",
    objectPosition: "object-top",
    slug: "raksha-web",
    imageAlt: "Raksha Web product website project by Kunal Builds",
  },
  {
    number: "04",
    title: "Raksha App",
    type: "Mobile App",
    year: "2024",
    description:
      "a women-safety mobile app concept with SOS flows, live location ideas, trusted contacts, and safety-first UX.",
    tags: ["react native", "expo", "maps"],
    image: "/assets/raksha-app.webp",
    objectPosition: "object-center",
    slug: "raksha-app",
    imageAlt: "Raksha mobile app interface project by Kunal Builds",
  },
  {
    number: "05",
    title: "EduSync",
    type: "Education Dashboard",
    year: "2024",
    description:
      "a school management interface built around clean workflows, student records, teachers, classes, and admin operations.",
    tags: ["dashboard", "education", "react"],
    image: "/assets/edusync.webp",
    objectPosition: "object-top",
    slug: "edusync",
    imageAlt: "EduSync education dashboard project by Kunal Builds",
  },
  {
    number: "06",
    title: "Fashion Website",
    type: "E-commerce Landing Page",
    year: "2024",
    description:
      "a premium fashion landing page concept with bold visuals, strong product hierarchy, and conversion-focused layout.",
    tags: ["next.js", "tailwind", "ui/ux"],
    image: "/assets/fashion-website.webp",
    objectPosition: "object-top",
    slug: "fashion-website",
    imageAlt: "Fashion website landing page project by Kunal Builds",
  },
  {
    number: "07",
    title: "Solvare",
    type: "Website Concept",
    year: "2024",
    description:
      "a clean modern website concept focused on trust, clarity, responsive layout, and premium digital presentation.",
    tags: ["web design", "responsive", "ui"],
    image: "/assets/solvare.webp",
    objectPosition: "object-center",
    slug: "solvare",
    imageAlt: "Solvare web interface project by Kunal Builds",
  },
  {
    number: "08",
    title: "WishWrap",
    type: "Web Experience",
    year: "2024",
    description:
      "a polished web experience with focused visual presentation, smooth layout, and modern interface direction.",
    tags: ["web app", "ui", "frontend"],
    image: "/assets/wishwrap.webp",
    objectPosition: "object-center",
    slug: "wishwrap",
    imageAlt: "WishWrap product interface project by Kunal Builds",
  },
  {
    number: "09",
    title: "Paradox",
    type: "Creative Web Concept",
    year: "2024",
    description:
      "a creative digital interface concept exploring bold visuals, modern layout structure, and strong first-screen impact.",
    tags: ["creative", "frontend", "design"],
    image: "/assets/paradox.webp",
    objectPosition: "object-center",
    slug: "paradox",
    imageAlt: "Paradox creative web interface project by Kunal Builds",
  },
  {
    number: "10",
    title: "PicPrompt",
    type: "AI Tool Interface",
    year: "2024",
    description:
      "an AI-focused interface concept designed around prompt creation, visual generation, and clean tool-like usability.",
    tags: ["ai", "product", "ui"],
    image: "/assets/picprompt.webp",
    objectPosition: "object-top",
    slug: "picprompt",
    imageAlt: "PicPrompt AI product interface project by Kunal Builds",
  },
  {
    number: "11",
    title: "Beyond Reality",
    type: "Experimental Website",
    year: "2024",
    description:
      "an experimental visual website concept with immersive presentation, bold design direction, and high-impact layout.",
    tags: ["experimental", "web", "visual"],
    image: "/assets/beyond-reality.webp",
    objectPosition: "object-center",
    slug: "beyond-reality",
    imageAlt: "Beyond Reality creative digital interface project by Kunal Builds",
  },
];

function ProjectTag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] text-white/75 backdrop-blur">
      {children}
    </span>
  );
}

function ProjectImage({
  project,
  priority = false,
  className = "",
}: {
  project: Project;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 bg-neutral-900" />
    );
  }

  return (
    <Image
      src={project.image}
      alt={project.imageAlt}
      fill
      sizes="(max-width: 1024px) 100vw, 1200px"
      className={`object-cover ${project.objectPosition} ${className}`}
      onError={() => setFailed(true)}
      priority={priority}
    />
  );
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 2800);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Sync mobile scroll with activeIndex
  useEffect(() => {
    if (window.innerWidth < 1024 && scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth * 0.85 + 24; // 85vw + gap
      const frame = window.requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({
          left: activeIndex * cardWidth,
          behavior: "smooth"
        });
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  // When activeIndex changes, trigger the animating state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAnimating(true);
  }, [activeIndex]);

  const handleDotClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const activeProject = projects[activeIndex];
  const nextIndex = (activeIndex + 1) % projects.length;
  const thirdIndex = (activeIndex + 2) % projects.length;
  const nextProject = projects[nextIndex];
  const thirdProject = projects[thirdIndex];

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden border-t border-white/10 bg-black text-white py-24 md:py-32"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
          
          {/* Left Content Area (Sticky on Desktop) */}
          <div className="lg:col-span-5 self-start lg:sticky lg:top-28 lg:pb-12">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/55 border-l border-white/20 pl-4 py-1">
                  selected work
                </span>
                <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                  real products, <br className="hidden lg:block" />
                  not just <br className="hidden lg:block" />
                  concepts.
                </h2>
              </div>

              <p className="max-w-md text-base leading-relaxed text-white/65 md:text-lg">
                a collection of high-end builds across websites, mobile apps, and product interfaces built for real-world impact.
              </p>

              <div className="flex flex-wrap gap-2">
                {["websites", "mobile apps", "dashboards", "ui/ux"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-widest text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Link
                href="/projects"
                className="group inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white/80 transition-all hover:text-white"
              >
                view all projects 
                <span className="h-px w-8 bg-white/20 transition-all group-hover:w-12 group-hover:bg-white" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[620px]">
            
            {/* DESKTOP AUTO CAROUSEL (lg+) */}
            <div 
              className="hidden lg:block relative w-full h-[620px] perspective-1000"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative w-full h-full">
                
                {/* ACTIVE PROJECT CARD */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.title}
                    initial={{ opacity: 0, y: 60, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -40, scale: 0.97 }}
                    onAnimationComplete={() => setIsAnimating(false)}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full z-30"
                  >
                    <div className="group relative w-full h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 hover:border-white/20">
                      {/* Project Image */}
                      <ProjectImage project={activeProject} priority={true} className="opacity-80 transition-transform duration-700 group-hover:scale-[1.03]" />
                      
                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                      
                      {/* Content Panel */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-12 lg:p-14">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs tracking-[0.3em] text-white/55 font-bold">
                            {activeProject.number}
                          </span>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                            {activeProject.type} / {activeProject.year}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-6xl font-bold tracking-[-0.05em] leading-[0.9] text-white">
                            {activeProject.title}
                          </h3>
                          <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg line-clamp-2 font-medium">
                            {activeProject.description}
                          </p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            {activeProject.tags.map((tag) => (
                              <ProjectTag key={tag}>{tag}</ProjectTag>
                            ))}
                          </div>
                          <div className="pt-6">
                            <Link
                              href={`/projects/${activeProject.slug}`}
                              className="group relative inline-flex overflow-hidden rounded-full bg-white px-10 py-4 text-sm font-bold text-black transition-all hover:bg-neutral-200"
                            >
                              <span className="relative z-10">view case study</span>
                              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* NEXT PREVIEW CARD (IMAGE ONLY) */}
                <div 
                  className="absolute inset-0 w-full h-full z-20 pointer-events-none transition-opacity duration-500"
                  style={{
                    transform: "translate3d(0, 92px, 0) scale(0.94)",
                    opacity: isAnimating ? 0 : 0.4,
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/5 bg-black">
                    <ProjectImage project={nextProject} className="opacity-30 grayscale blur-[1px]" />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                </div>

                {/* THIRD PREVIEW CARD (IMAGE ONLY) */}
                <div 
                  className="absolute inset-0 w-full h-full z-10 pointer-events-none transition-opacity duration-700"
                  style={{
                    transform: "translate3d(0, 165px, 0) scale(0.88)",
                    opacity: isAnimating ? 0 : 0.2,
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/5 bg-black">
                    <ProjectImage project={thirdProject} className="opacity-20 grayscale blur-[2px]" />
                    <div className="absolute inset-0 bg-black/60" />
                  </div>
                </div>

                {/* Vertical Progress Indicators (Right Side) */}
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3">
                  {projects.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className="group flex min-h-8 min-w-8 items-center justify-center rounded-full cursor-pointer transition-all"
                      aria-label={`Go to ${p.title} project slide`}
                      aria-current={i === activeIndex ? "true" : undefined}
                    >
                      <div className="relative flex items-center justify-center">
                        <span
                          className={`rounded-full bg-white transition-all duration-700 ease-[0.22,1,0.36,1] ${
                            i === activeIndex 
                              ? "h-8 w-1.5 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                              : "h-1.5 w-1.5 opacity-20 group-hover:opacity-50"
                          }`}
                        />
                        {i === activeIndex && (
                          <motion.span 
                            layoutId="activeDot"
                            className="absolute -inset-1.5 rounded-full border border-white/10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Bottom Title Strip */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-6 overflow-hidden py-2 px-4 pointer-events-none">
                  {projects.map((p, i) => (
                    <button 
                      key={p.title}
                      onClick={() => handleDotClick(i)}
                      className={`min-h-11 px-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap cursor-pointer pointer-events-auto ${
                        i === activeIndex ? "text-white opacity-100 scale-110" : "text-white/60 opacity-65 hover:opacity-85"
                      }`}
                      aria-label={`Go to ${p.title} project slide`}
                      aria-current={i === activeIndex ? "true" : undefined}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* MOBILE DRAGGABLE CAROUSEL (Below lg) */}
            <div 
              ref={scrollRef}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => {
                setTimeout(() => setIsPaused(false), 2000);
              }}
              className="lg:hidden w-full mt-12 -mx-6 px-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-6 pb-8"
            >
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="flex-none w-[85vw] md:w-[60vw] snap-center flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-2xl"
                >
                  {/* Image Top */}
                  <div className={`relative aspect-[16/11] w-full overflow-hidden bg-neutral-900`}>
                    <ProjectImage project={project} className="opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  
                  {/* Content Bottom */}
                  <div className="p-7 space-y-5">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-white/60 font-bold">
                      <span>{project.number} / {project.type}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/65 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <ProjectTag key={tag}>{tag}</ProjectTag>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block w-full rounded-full bg-white py-3.5 text-center text-sm font-bold text-black transition-colors hover:bg-neutral-200"
                    >
                      view case study
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
