"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    number: "01",
    title: "websites",
    description: "clean business websites, portfolio sites, product pages, and modern brand experiences.",
    tags: ["responsive", "fast", "seo-ready"],
    word: "build"
  },
  {
    number: "02",
    title: "landing pages",
    description: "conversion-focused pages with strong hero sections, clear offers, and smooth responsive layouts.",
    tags: ["sales", "leads", "launch"],
    word: "impact"
  },
  {
    number: "03",
    title: "dashboards",
    description: "admin panels, school dashboards, service platforms, and data-driven interfaces.",
    tags: ["admin", "workflows", "tables"],
    word: "flow"
  },
  {
    number: "04",
    title: "mobile apps",
    description: "react native and expo apps with clean screens, auth flows, user dashboards, and real product UX.",
    tags: ["expo", "react native", "app ui"],
    word: "native"
  },
  {
    number: "05",
    title: "ui/ux design",
    description: "premium interface design focused on spacing, hierarchy, usability, and polished visual systems.",
    tags: ["wireframes", "polish", "design"],
    word: "polish"
  },
  {
    number: "06",
    title: "backend & supabase",
    description: "auth, database structure, storage, RLS policies, APIs, and working backend flows.",
    tags: ["supabase", "auth", "database"],
    word: "system"
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const progressLine = progressLineRef.current;

    const ctx = gsap.context(() => {
      // Amount to move horizontal
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + (window.innerWidth * 0.1));
      };

      // Create a dedicated ScrollTrigger for pinning and horizontal scroll
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=5000", // Force a long "freeze" duration
        pin: true,
        scrub: 1,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Sync horizontal track with the pin progress
          gsap.set(track, {
            x: self.progress * getScrollAmount()
          });

          // Sync progress line
          if (progressLine) {
            gsap.set(progressLine, { scaleX: self.progress });
          }

          // Update active index
          const index = Math.min(
            Math.floor(self.progress * items.length),
            items.length - 1
          );
          setActiveIndex(index);
        }
      });

    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative w-full overflow-hidden border-t border-white/10 bg-black text-white"
    >
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-0 h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[800px] w-[800px] rounded-full bg-white/[0.015] blur-[160px]" />

      <div className="relative min-h-screen flex flex-col justify-center py-4 md:py-6 overflow-hidden">
        
        {/* Top Header Content */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 w-full mb-3 md:mb-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 flex flex-col md:flex-row justify-between items-end gap-3"
          >
            <div className="space-y-1.5 md:space-y-2">
              <p className="text-[10px] md:text-xs text-white/40 tracking-[0.3em] uppercase">
                capabilities
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-0.06em] leading-[0.9] text-white">
                from idea to <br className="hidden md:block" />
                working product.
              </h2>
              <p className="max-w-xl text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-white/50">
                i help businesses, creators, and startups turn rough ideas into clean websites, apps, dashboards, and digital products that actually work.
              </p>
            </div>

            <a
              href="/contact"
              className="rounded-full bg-white px-5 py-2 text-[10px] md:text-xs font-bold text-black hover:bg-neutral-200 transition-all active:scale-95 whitespace-nowrap mb-1"
            >
              start a project
            </a>
          </motion.div>
        </div>

        {/* Timeline Track Stage */}
        <div className="relative w-full flex flex-col">
          
          {/* Horizontal Cards Track */}
          <div 
            ref={trackRef}
            className="flex gap-4 md:gap-8 px-[12vw] md:px-[18vw] lg:px-[22vw] will-change-transform z-10"
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={item.title}
                  className={`relative w-[240px] sm:w-[280px] md:w-[320px] shrink-0 rounded-[1.2rem] border border-white/10 bg-neutral-950/95 p-4 sm:p-6 md:p-7 min-h-[240px] sm:min-h-[280px] md:min-h-[300px] flex flex-col transition-all duration-700 ease-out shadow-2xl ${
                    isActive ? "scale-100 border-white/20" : "scale-[0.95] opacity-20 blur-[1px]"
                  }`}
                >
                  {/* Background Large Faded Word */}
                  <div className="absolute bottom-0 right-5 text-[4.5rem] sm:text-[6rem] md:text-[8rem] font-medium tracking-[-0.08em] text-white/[0.03] pointer-events-none select-none uppercase">
                    {item.word}
                  </div>

                  <div className={`absolute top-4 sm:top-6 right-4 sm:right-6 transition-colors duration-500 ${isActive ? "text-white/60" : "text-white/10"}`}>
                    <span className="text-lg sm:text-xl font-light">↗</span>
                  </div>

                  <span className={`text-[8px] md:text-[10px] tracking-[0.28em] transition-colors duration-500 ${isActive ? "text-white/50" : "text-white/20"}`}>
                    {item.number}
                  </span>

                  <h3 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-medium tracking-[-0.06em] leading-none text-white uppercase">
                    {item.title}
                  </h3>

                  <p className={`mt-2 sm:mt-3 text-[10px] sm:text-[11px] md:text-xs leading-relaxed transition-colors duration-500 ${isActive ? "text-white/60" : "text-white/30"}`}>
                    {item.description}
                  </p>

                  <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[8px] sm:text-[9px] transition-colors duration-500 ${
                          isActive ? "text-white/60 border-white/20" : "text-white/30"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dot connected to card bottom */}
                  <div 
                    className={`absolute left-1/2 bottom-[-30px] md:bottom-[-42px] -translate-x-1/2 w-2 h-2 rounded-full border-[2px] border-black transition-all duration-700 ${
                      isActive ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "bg-white/10 scale-75"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Timeline Horizontal Line */}
          <div className="absolute left-0 right-0 bottom-[-26px] md:bottom-[-38px] h-[1px] bg-white/10 z-0">
            <div 
              ref={progressLineRef}
              className="absolute left-0 top-0 h-full w-full bg-white origin-left scale-x-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
