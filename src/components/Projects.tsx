"use client";

import Image from "next/image";
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
};

const projects: Project[] = [
  {
    number: "01",
    title: "Vidora",
    type: "Website / Platform",
    year: "2024",
    description:
      "a high-end video editor marketplace interface built with a clean landing-page experience, strong hero section, and creator-focused positioning.",
    tags: ["next.js", "tailwind", "cloudinary"],
    image: "/assets/vidora.webp",
    objectPosition: "object-top",
  },
  {
    number: "02",
    title: "Raksha Web",
    type: "Safety Product Website",
    year: "2024",
    description:
      "a bold product website for a women-safety ecosystem with strong storytelling, product positioning, and conversion-focused sections.",
    tags: ["react", "supabase", "product"],
    image: "/assets/raksha-web.webp",
    objectPosition: "object-top",
  },
  {
    number: "03",
    title: "Raksha App",
    type: "Mobile App",
    year: "2024",
    description:
      "a women-safety mobile app concept with SOS flows, live location ideas, trusted contacts, and safety-first UX.",
    tags: ["react native", "expo", "maps"],
    image: "/assets/raksha-app.webp",
    objectPosition: "object-center",
  },
  {
    number: "04",
    title: "EduSync",
    type: "Education Dashboard",
    year: "2024",
    description:
      "a school management interface built around clean workflows, student records, teachers, classes, and admin operations.",
    tags: ["dashboard", "education", "react"],
    image: "/assets/edusync.webp",
    objectPosition: "object-top",
  },
  {
    number: "05",
    title: "Fashion Website",
    type: "E-commerce Landing Page",
    year: "2024",
    description:
      "a premium fashion landing page concept with bold visuals, strong product hierarchy, and conversion-focused layout.",
    tags: ["next.js", "tailwind", "ui/ux"],
    image: "/assets/fashion-website.webp",
    objectPosition: "object-top",
  },
  {
    number: "06",
    title: "Solvare",
    type: "Website Concept",
    year: "2024",
    description:
      "a clean modern website concept focused on trust, clarity, responsive layout, and premium digital presentation.",
    tags: ["web design", "responsive", "ui"],
    image: "/assets/solvare.webp",
    objectPosition: "object-center",
  },
  {
    number: "07",
    title: "WishWrap",
    type: "Web Experience",
    year: "2024",
    description:
      "a polished web experience with focused visual presentation, smooth layout, and modern interface direction.",
    tags: ["web app", "ui", "frontend"],
    image: "/assets/wishwrap.webp",
    objectPosition: "object-center",
  },
  {
    number: "08",
    title: "Paradox",
    type: "Creative Web Concept",
    year: "2024",
    description:
      "a creative digital interface concept exploring bold visuals, modern layout structure, and strong first-screen impact.",
    tags: ["creative", "frontend", "design"],
    image: "/assets/paradox.webp",
    objectPosition: "object-center",
  },
  {
    number: "09",
    title: "PicPrompt",
    type: "AI Tool Interface",
    year: "2024",
    description:
      "an AI-focused interface concept designed around prompt creation, visual generation, and clean tool-like usability.",
    tags: ["ai", "product", "ui"],
    image: "/assets/picprompt.webp",
    objectPosition: "object-top",
  },
  {
    number: "10",
    title: "Beyond Reality",
    type: "Experimental Website",
    year: "2024",
    description:
      "an experimental visual website concept with immersive presentation, bold design direction, and high-impact layout.",
    tags: ["experimental", "web", "visual"],
    image: "/assets/beyond-reality.webp",
    objectPosition: "object-center",
  },
];

function ProjectTag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[11px] text-white/70 backdrop-blur">
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
      alt={`${project.title} screenshot`}
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
      scrollRef.current.scrollTo({
        left: activeIndex * cardWidth,
        behavior: "smooth"
      });
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
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/40 border-l border-white/20 pl-4 py-1">
                  selected work
                </span>
                <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
                  real products, <br className="hidden lg:block" />
                  not just <br className="hidden lg:block" />
                  concepts.
                </h2>
              </div>

              <p className="max-w-md text-base leading-relaxed text-white/50 md:text-lg">
                a collection of high-end builds across websites, mobile apps, and product interfaces built for real-world impact.
              </p>

              <div className="flex flex-wrap gap-2">
                {["websites", "mobile apps", "dashboards", "ui/ux"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-widest text-white/40"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <a
                href="/projects"
                className="group inline-flex items-center gap-3 text-sm font-medium text-white/80 transition-all hover:text-white"
              >
                view all projects 
                <span className="h-px w-8 bg-white/20 transition-all group-hover:w-12 group-hover:bg-white" />
              </a>
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
                    <div className="relative w-full h-full overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-[0_0_80px_rgba(0,0,0,0.8)]">
                      {/* Project Image */}
                      <ProjectImage project={activeProject} priority={true} className="opacity-80" />
                      
                      {/* Gradient Overlay for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      
                      {/* Content Panel */}
                      <div className="absolute inset-x-0 bottom-0 z-20 p-10 lg:p-12">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-xs tracking-[0.3em] text-white/30 font-bold">
                            {activeProject.number}
                          </span>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {activeProject.type} // {activeProject.year}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-6xl font-medium tracking-[-0.05em] leading-none text-white">
                            {activeProject.title}
                          </h3>
                          <p className="max-w-xl text-base leading-relaxed text-white/60 md:text-lg line-clamp-2">
                            {activeProject.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-2">
                            {activeProject.tags.map((tag) => (
                              <ProjectTag key={tag}>{tag}</ProjectTag>
                            ))}
                          </div>
                          <div className="pt-4">
                            <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:pr-12">
                              <span className="relative z-10">view case study</span>
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all group-hover:opacity-100">→</span>
                            </button>
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
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleDotClick(i)}
                      className={`transition-all duration-700 rounded-full bg-white cursor-pointer ${
                        i === activeIndex ? "h-10 w-1.5 opacity-100" : "h-1.5 w-1.5 opacity-20 hover:opacity-50"
                      }`}
                    />
                  ))}
                </div>
                
                {/* Bottom Title Strip */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-6 overflow-hidden py-2 px-4 pointer-events-none">
                  {projects.map((p, i) => (
                    <button 
                      key={p.title}
                      onClick={() => handleDotClick(i)}
                      className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap cursor-pointer pointer-events-auto ${
                        i === activeIndex ? "text-white opacity-100 scale-110" : "text-white/25 opacity-25 hover:opacity-50"
                      }`}
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
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-white/40 font-bold">
                      <span>{project.number} / {project.type}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <ProjectTag key={tag}>{tag}</ProjectTag>
                      ))}
                    </div>
                    <button className="w-full rounded-full bg-white py-3.5 text-sm font-bold text-black transition-colors hover:bg-neutral-200">
                      view case study
                    </button>
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
