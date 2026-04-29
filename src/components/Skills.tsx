"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Database, 
  Zap, 
  Lightbulb,
  ChevronRight
} from "lucide-react";

const capabilities = [
  {
    title: "Web Development",
    icon: <Globe className="w-8 h-8" />,
    features: ["Landing Pages", "Portfolio Websites", "Admin Dashboards", "SaaS Interfaces"],
    tech: ["React", "Next.js", "Tailwind"],
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-8 h-8" />,
    features: ["React Native Apps", "Expo Projects", "Functional UI"],
    tech: ["React Native", "Expo", "Firebase"],
  },
  {
    title: "UI/UX Design",
    icon: <Palette className="w-8 h-8" />,
    features: ["Figma Designs", "Wireframing", "Clean Interfaces"],
    tech: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    title: "Backend & APIs",
    icon: <Database className="w-8 h-8" />,
    features: ["Firebase", "Supabase", "Auth Systems", "API Integration"],
    tech: ["Supabase", "Node.js", "Express"],
  },
  {
    title: "Performance & Deploy",
    icon: <Zap className="w-8 h-8" />,
    features: ["Vercel Deployment", "Optimization", "Hosting Setup"],
    tech: ["Vercel", "Netlify", "SEO"],
  },
  {
    title: "Product Thinking",
    icon: <Lightbulb className="w-8 h-8" />,
    features: ["Idea to Execution", "UX Decisions", "Real-world usability"],
    tech: ["Strategy", "Feedback", "Launch"],
  }
];

const CapabilityCard = ({ capability, index }: { capability: any, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(180, 30, 30, 0.2)"
      }}
      className="relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group overflow-hidden transition-all duration-500 hover:bg-white/[0.08] hover:border-[#b41e1e]/40"
    >
      {/* Subtle Animated Border Glow (Gradient mask effect) */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute inset-[-1px] bg-gradient-to-r from-transparent via-[#b41e1e]/30 to-transparent animate-border-flow" />
      </div>

      {/* Spot Glow following cursor */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(127, 17, 21, 0.1), transparent 40%)`
        }}
      />

      <style jsx>{`
        div {
          --mouse-x: ${mouseX.get()}px;
          --mouse-y: ${mouseY.get()}px;
        }
      `}</style>
      
      {/* Icon with Subtle Lift */}
      <motion.div 
        variants={{
          hover: { y: -4 }
        }}
        className="text-[#fff1c7] mb-6 inline-block group-hover:text-[#b41e1e] transition-all duration-500 ease-out"
      >
        {capability.icon}
      </motion.div>

      <h3 className="text-2xl font-black text-[#fff1c7] uppercase tracking-tighter mb-4">
        {capability.title}
      </h3>

      <ul className="space-y-3 mb-8 relative z-10">
        {capability.features.map((feature: string, i: number) => (
          <li key={i} className="flex items-center text-sm font-bold text-[#fff1c7]/60 tracking-wide transition-all duration-500">
            <div className="flex items-center transition-transform duration-500 group-hover:translate-x-2">
              <ChevronRight className="w-4 h-4 mr-2 text-[#b41e1e] shrink-0" />
              <span className="group-hover:text-[#fff1c7] transition-colors duration-500">{feature}</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Tech Pill Chips */}
      <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 relative z-10">
        {capability.tech.map((t: string, i: number) => (
          <span 
            key={i} 
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-[#fff1c7]/40 hover:text-[#fff1c7] hover:bg-[#b41e1e]/30 hover:border-[#b41e1e]/40 transition-all duration-500 cursor-default"
          >
            {t}
          </span>
        ))}
      </div>

    </motion.div>
  );
};

const Capabilities = () => {
  return (
    <section id="skills" className="relative py-32 bg-[#080b10] overflow-hidden">
      
      {/* Background Decorative Grid Lines (More subtle) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        {[25, 50, 75].map((pos) => (
          <div key={pos} className="absolute top-0 bottom-0 w-[1px] bg-white" style={{ left: `${pos}%` }} />
        ))}
        {[33, 66].map((pos) => (
          <div key={pos} className="absolute left-0 right-0 h-[1px] bg-white" style={{ top: `${pos}%` }} />
        ))}
      </div>

      {/* Huge Background "CAPABILITIES" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[20vw] font-black text-white/[0.015] tracking-tighter leading-none uppercase translate-y-20">
          Capabilities
        </h1>
      </div>

      {/* Very Subtle Radial Glows */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#b41e1e] blur-[250px] opacity-[0.03] rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[#b41e1e] blur-[250px] opacity-[0.03] rounded-full" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-20 text-center md:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] tracking-[0.4em] font-black text-[#b41e1e] uppercase mb-4"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black text-[#fff1c7] leading-[0.9] tracking-tighter uppercase mb-6"
          >
            What I Can Build
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-[#fff1c7] text-lg lg:text-xl font-bold uppercase tracking-[0.1em]"
          >
            From idea to real working product.
          </motion.p>
        </div>

        {/* Infinite Tech Marquee */}
        <div className="relative flex overflow-hidden whitespace-nowrap mb-20 border-y border-white/[0.03] py-6 md:py-10 w-screen left-1/2 -translate-x-1/2 bg-white/[0.01]">
          <div className="flex animate-marquee w-max">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center space-x-12 md:space-x-20 px-6 md:px-10">
                {["REACT", "NEXT.JS", "TAILWIND CSS", "FRAMER MOTION", "TYPESCRIPT", "REACT NATIVE", "NODE.JS", "SUPABASE", "FIGMA"].map((tech) => (
                  <div key={tech} className="flex items-center space-x-12 md:space-x-20">
                    <span className="text-3xl md:text-6xl font-black text-transparent hover:text-[#fff1c7] uppercase tracking-tight transition-colors duration-500 cursor-default" style={{ WebkitTextStroke: "1px rgba(255, 241, 199, 0.2)" }}>
                      {tech}
                    </span>
                    <span className="text-[#b41e1e] text-3xl md:text-5xl font-black">•</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => (
            <CapabilityCard key={idx} capability={cap} index={idx} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes border-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-border-flow {
          animation: border-flow 4s ease-in-out infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
};

export default Capabilities;
