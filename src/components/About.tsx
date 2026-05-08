"use client";

import { motion } from "framer-motion";

const aboutRows = [
  { label: "focus", value: "websites, apps, dashboards, landing pages" },
  { label: "stack", value: "next.js, react, react native, expo, tailwind, supabase" },
  { label: "style", value: "clean ui, premium layouts, fast execution" },
  { label: "available for", value: "freelance projects, startup mvps, business websites" },
];

export default function About() {
  const revealAnimation = {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any },
  };

  const placeholderGradient = "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),rgba(0,0,0,1)_55%)]";

  return (
    <section id="about" className="relative w-full overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background Ambient Depth */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <img 
          src="/assets/about-bg.webp" 
          alt="" 
          className="h-full w-full object-cover opacity-[0.07] grayscale"
        />
      </div>
      <div className="pointer-events-none absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32">
        
        {/* Top Editorial Header */}
        <motion.div {...revealAnimation}>
          <p className="text-sm text-white/50 tracking-[0.28em] uppercase">
            about
          </p>
          <h2 className="mt-8 text-5xl md:text-8xl font-medium tracking-[-0.07em] leading-[0.86] max-w-6xl text-white">
            building with speed, taste, and real execution.
          </h2>
          <p className="mt-8 max-w-5xl text-xl md:text-3xl leading-[1.25] tracking-[-0.035em] text-white/70">
            i’m kunal, a web and app developer focused on building clean digital products, from landing pages and websites to mobile apps, dashboards, and working backend flows.
          </p>
        </motion.div>

        {/* Main About Split */}
        <div className="mt-20 lg:mt-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column Image */}
          <motion.div 
            {...revealAnimation}
            className="lg:col-span-5 relative h-[520px] md:h-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950"
          >
            <div className={`absolute inset-0 w-full h-full ${placeholderGradient}`} />
            <img 
              src="/assets/about-character.webp" 
              alt="Kunal"
              className="relative h-full w-full object-cover opacity-90 object-center transition-transform duration-1000 hover:scale-105"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.24em] text-white/55">
              developer / builder / 2024
            </div>
          </motion.div>

          {/* Right Column Text Area */}
          <div className="lg:col-span-7">
            <motion.div {...revealAnimation} transition={{ ...revealAnimation.transition, delay: 0.1 }}>
              <p className="text-sm text-white/45 tracking-[0.28em] uppercase">
                what i care about
              </p>
              <h3 className="mt-6 text-2xl md:text-4xl leading-[1.18] tracking-[-0.05em] text-white">
                i care about making digital products feel sharp, fast, and useful. a website should not just look nice, it should explain the offer clearly, load fast, work on every screen, and make people trust the business behind it.
              </h3>
              <p className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
                my work usually sits between design and development: i think about layout, spacing, user flow, responsiveness, backend structure, and the final launch experience. the goal is always simple: build something that looks premium and actually works.
              </p>
              <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/50">
                based in Haryana, India — i use tools like next.js, react, react native, expo, tailwind css, supabase, and modern ai-assisted workflows to turn ideas into clean digital products faster for businesses, creators, and startups.
              </p>
            </motion.div>

            {/* Inline Detail Rows */}
            <div className="mt-12 md:mt-16 border-t border-white/10">
              {aboutRows.map((row, index) => (
                <motion.div
                  key={row.label}
                  {...revealAnimation}
                  transition={{ ...revealAnimation.transition, delay: 0.2 + (index * 0.05) }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 border-b border-white/10 py-6 md:py-8"
                >
                  <div className="sm:col-span-4">
                    <span className="text-xs uppercase tracking-[0.22em] text-white/35 font-medium">
                      {row.label}
                    </span>
                  </div>
                  <div className="sm:col-span-8">
                    <span className="text-base md:text-lg text-white/70">
                      {row.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Editorial Image Row */}
        <motion.div 
          {...revealAnimation}
          className="mt-24 md:mt-40 relative h-[360px] md:h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950"
        >
          <div className={`absolute inset-0 w-full h-full ${placeholderGradient}`} />
          <img 
            src="/assets/about-workflow.webp" 
            alt="Workflow"
            className="relative h-full w-full object-cover opacity-85 transition-transform duration-1000 hover:scale-105"
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.24em] text-white/55">
            workspace / design / development
          </div>
        </motion.div>

        {/* Closing Belief Line */}
        <motion.div 
          {...revealAnimation}
          className="mt-24 md:mt-40 border-t border-white/10 pt-14"
        >
          <h2 className="max-w-5xl text-4xl md:text-7xl lg:text-8xl font-medium tracking-[-0.07em] leading-[0.9] text-white">
            good design gets attention. <br className="hidden md:block" />
            clean execution builds trust.
          </h2>
          <p className="mt-8 max-w-xl text-base md:text-xl text-white/55 leading-relaxed">
            that’s the standard i try to bring into every project.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
