"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

const projects = [
  {
    name: "Vidora",
    description: "High-end video processing platform.",
    tech: ["Next.js", "Cloudinary", "Tailwind"],
    image: "/assets/vidora.webp",
    liveUrl: "https://vidora.co.in/"
  },
  {
    name: "Raksha Web",
    description: "Emergency response dashboard.",
    tech: ["React", "Supabase", "Node.js"],
    image: "/assets/raksha-web.webp",
    liveUrl: "https://get-raksha.web.app/"
  },
  {
    name: "Raksha App",
    description: "Personal safety mobile application.",
    tech: ["React Native", "Firebase", "Maps"],
    image: "/assets/raksha-app.webp",
    liveUrl: "https://get-raksha-app.web.app/"
  },
  {
    name: "Solvare",
    description: "AI-powered problem solving tool.",
    tech: ["Python", "OpenAI", "Next.js"],
    image: "/assets/solvare.webp",
    liveUrl: "https://solvare.art/"
  },
  {
    name: "WishWrap",
    description: "Digital gifting and wishlist platform.",
    tech: ["Next.js", "Stripe", "Prisma"],
    image: "/assets/wishwrap.webp",
    liveUrl: "https://wishwrap.in/"
  },
  {
    name: "ClashZone Arena",
    description: "Competitive gaming platform for enthusiasts.",
    tech: ["React", "Firebase", "WebSockets"],
    image: "/assets/vidora.webp", // Fallback image
    liveUrl: "https://clashzone-arena.web.app/"
  },
  {
    name: "EduSync",
    description: "Collaborative learning management system.",
    tech: ["WebSockets", "React", "Express"],
    image: "/assets/edusync.webp",
    liveUrl: "https://edusync-frontend-beta.vercel.app/"
  },
  {
    name: "PicPrompt",
    description: "AI image generation prompt builder.",
    tech: ["React", "Stable Diffusion", "Vercel"],
    image: "/assets/picprompt.webp",
    liveUrl: "https://www.picprompt.shop/"
  },
  {
    name: "Paradox Verse",
    description: "Immersive metaverse exploration site.",
    tech: ["Three.js", "React", "GSAP"],
    image: "/assets/paradox.webp",
    liveUrl: "https://paradox-verse.web.app/"
  },
  {
    name: "Beyond Reality",
    description: "Future of web exploration and interaction.",
    tech: ["Next.js", "Three.js", "GSAP"],
    image: "/assets/beyond-reality.webp",
    liveUrl: "http://beyond-reality-six.vercel.app/"
  },
  {
    name: "Fashion Landing",
    description: "Premium luxury fashion experience.",
    tech: ["Next.js", "Tailwind", "Framer"],
    image: "/assets/fashion-website.webp",
    liveUrl: "https://fashion-landing-page-kappa-ten.vercel.app/"
  }
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col space-y-6"
    >
      <a 
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 border border-white/10"
      >
        <Image 
          src={project.image} 
          alt={project.name} 
          fill 
          className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute top-4 right-4 text-white/50 group-hover:text-white transition-colors">
          <span className="text-xl">↗</span>
        </div>
      </a>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium tracking-tight text-white group-hover:text-white/70 transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-2">
            {project.tech.slice(0, 2).map((t: string) => (
              <span key={t} className="text-[10px] font-medium text-white/30 uppercase tracking-widest">
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <CustomCursor />
      
      {/* Background Depth Blurs */}
      <div className="fixed top-0 left-0 h-[500px] w-[500px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-24 flex items-center">
          <Link href="/" className="flex items-center text-white/50 hover:text-white transition-colors text-xs font-medium uppercase tracking-[0.2em]">
            <ChevronLeft className="w-4 h-4 mr-2" />
            back to home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pt-40 pb-32 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 lg:mb-32"
        >
          <span className="text-sm text-white/50 tracking-[0.28em] uppercase">
            archive
          </span>
          <h1 className="mt-8 text-6xl md:text-8xl lg:text-9xl font-medium tracking-[-0.08em] leading-[0.85] text-white">
            all projects.
          </h1>
          <p className="mt-8 max-w-3xl text-xl md:text-3xl leading-[1.25] tracking-[-0.035em] text-white/65">
            a complete list of everything i’ve built, from startup mvps and dashboards to premium websites and mobile apps.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 lg:gap-y-24">
          {projects.map((project, idx) => (
            <ProjectCard key={project.name} project={project} index={idx} />
          ))}
        </div>

        {/* Footer Link */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-white/40 italic">
            curated with taste and real execution.
          </p>
          <Link 
            href="#contact" 
            className="text-sm text-white/50 hover:text-white transition-colors uppercase tracking-widest"
          >
            start a project ↗
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
