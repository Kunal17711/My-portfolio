"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const processRows = [
  {
    number: "01",
    title: "understand the goal",
    paragraph: "first, i understand the business, audience, pages, features, and the exact outcome the project needs to achieve.",
    deliverables: "goal · audience · feature list · content direction",
  },
  {
    number: "02",
    title: "shape the structure",
    paragraph: "next, i plan the sections, screens, user flow, database needs, and the cleanest technical direction for the build.",
    deliverables: "site flow · screen map · database plan · tech direction",
  },
  {
    number: "03",
    title: "design the experience",
    paragraph: "then i create a clean interface with proper spacing, typography, visual hierarchy, responsiveness, and a premium first impression.",
    deliverables: "layout · ui direction · responsive screens · polish",
  },
  {
    number: "04",
    title: "build the product",
    paragraph: "after the direction is clear, i develop the frontend, connect backend logic where needed, and turn the design into a working product.",
    deliverables: "frontend · backend · auth · storage · api flows",
  },
  {
    number: "05",
    title: "test, polish, launch",
    paragraph: "finally, i check responsiveness, fix rough edges, improve speed, deploy the project, and prepare it to be shared with users or clients.",
    deliverables: "testing · deployment · final polish · live link",
  },
];

const imageStrip = [
  { path: "/assets/process-planning.webp", label: "planning" },
  { path: "/assets/process-design.webp", label: "design" },
  { path: "/assets/process-launch.webp", label: "launch" },
];

export default function Process() {
  const revealAnimation = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  };

  const placeholderGradient = "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),rgba(0,0,0,1)_55%)]";

  return (
    <section id="process" className="relative w-full overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background Ambient Depth */}
      <div className="pointer-events-none absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        
        {/* Top Editorial Header */}
        <motion.div {...revealAnimation} className="relative z-10">
          <p className="text-sm text-white/50 tracking-[0.28em] uppercase">
            process
          </p>
          <h2 className="mt-8 text-5xl md:text-8xl font-medium tracking-[-0.07em] leading-[0.86] max-w-5xl text-white">
            from first message <br className="hidden md:block" />
            to final launch.
          </h2>
          <p className="mt-10 max-w-3xl text-xl md:text-3xl leading-[1.25] tracking-[-0.035em] text-white/70">
            i keep the process simple and focused: understand the goal, shape the experience, build the product, polish the details, and ship it live.
          </p>
        </motion.div>

        {/* Main Editorial Split */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column Image */}
          <motion.div 
            {...revealAnimation}
            className="lg:col-span-5 relative h-[520px] md:h-[680px] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950"
          >
            <div className={`absolute inset-0 w-full h-full ${placeholderGradient}`} />
            <img 
              src="/assets/process-workspace.webp" 
              alt="Workspace"
              className="relative h-full w-full object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.24em] text-white/55">
              build process / 2024
            </div>
          </motion.div>

          {/* Right Column Text */}
          <motion.div 
            {...revealAnimation}
            transition={{ ...revealAnimation.transition, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-sm text-white/45 tracking-[0.28em] uppercase">
              how the work moves
            </p>
            <h3 className="mt-8 text-2xl md:text-4xl leading-[1.18] tracking-[-0.05em] text-white">
              every project starts with clarity. before writing code, i understand what the product needs to do, who it is for, and what result it should create.
            </h3>
            <p className="mt-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
              then i turn that into a clean structure, a strong interface, and a working build that can be tested, improved, and launched. the goal is not to make something that only looks good in screenshots; the goal is to build something usable, responsive, fast, and ready for real people.
            </p>
          </motion.div>
        </div>

        {/* Numbered Paragraph Rows */}
        <div className="mt-24 md:mt-40 border-t border-white/10">
          {processRows.map((row, index) => (
            <motion.div
              key={row.number}
              {...revealAnimation}
              transition={{ ...revealAnimation.transition, delay: index * 0.05 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-white/10 py-10 md:py-14"
            >
              <div className="md:col-span-3">
                <span className="text-xs tracking-[0.28em] text-white/35 uppercase">
                  step {row.number}
                </span>
              </div>
              <div className="md:col-span-9">
                <h4 className="text-3xl md:text-5xl font-medium tracking-[-0.06em] leading-none text-white uppercase">
                  {row.title}
                </h4>
                <p className="mt-6 max-w-4xl text-base md:text-xl leading-relaxed text-white/65">
                  {row.paragraph}
                </p>
                <div className="mt-6 text-xs md:text-sm uppercase tracking-[0.18em] text-white/35 font-medium">
                  {row.deliverables}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Image Strip / Mobile Carousel */}
        <div className="mt-24 md:mt-40">
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {imageStrip.map((img, index) => (
              <motion.div
                key={img.label}
                {...revealAnimation}
                transition={{ ...revealAnimation.transition, delay: index * 0.1 }}
                className="relative h-[420px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950 group"
              >
                <div className={`absolute inset-0 w-full h-full ${placeholderGradient}`} />
                <img 
                  src={img.path} 
                  alt={img.label}
                  className="relative h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-sm uppercase tracking-[0.22em] text-white/70">
                  {img.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4 px-1">
              {imageStrip.map((img) => (
                <div
                  key={img.label}
                  className="relative min-w-[85vw] h-[400px] snap-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-950"
                >
                  <div className={`absolute inset-0 w-full h-full ${placeholderGradient}`} />
                  <img 
                    src={img.path} 
                    alt={img.label}
                    className="relative h-full w-full object-cover opacity-85"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-sm uppercase tracking-[0.22em] text-white/70">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Minimal Mobile Arrows */}
            <div className="flex justify-center gap-6 mt-8">
              <button 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:bg-white active:text-black active:border-white transition-all duration-300"
                onClick={(e) => {
                  const el = e.currentTarget.parentElement?.previousElementSibling as HTMLElement;
                  if (el) {
                    if (el.scrollLeft <= 10) {
                      el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
                    } else {
                      el.scrollBy({ left: -el.clientWidth * 0.85, behavior: 'smooth' });
                    }
                  }
                }}
                aria-label="Previous"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <button 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 active:bg-white active:text-black active:border-white transition-all duration-300"
                onClick={(e) => {
                  const el = e.currentTarget.parentElement?.previousElementSibling as HTMLElement;
                  if (el) {
                    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
                    if (isAtEnd) {
                      el.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                      el.scrollBy({ left: el.clientWidth * 0.85, behavior: 'smooth' });
                    }
                  }
                }}
                aria-label="Next"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Closing Editorial CTA */}
        <motion.div 
          {...revealAnimation}
          className="mt-24 md:mt-40 flex flex-col md:flex-row md:items-end md:justify-between gap-10 border-t border-white/10 pt-14"
        >
          <h2 className="max-w-3xl text-4xl md:text-7xl lg:text-8xl font-medium tracking-[-0.07em] leading-[0.9] text-white">
            have an idea that needs <br className="hidden md:block" />
            to become real?
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center justify-center w-fit rounded-full bg-white px-10 py-5 text-sm md:text-base font-bold text-black hover:bg-neutral-200 transition-all active:scale-95 whitespace-nowrap mb-2"
          >
            let’s build it
          </a>
        </motion.div>
      </div>
    </section>
  );
}
