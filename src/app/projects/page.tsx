"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const projects = [
  {
    name: "Vidora",
    description: "High-end video processing platform.",
    tech: ["Next.js", "Cloudinary", "Tailwind"],
    image: "/assets/vidora.png",
    liveUrl: "https://vidora.co.in/"
  },
  {
    name: "Raksha Web",
    description: "Emergency response dashboard.",
    tech: ["React", "Supabase", "Node.js"],
    image: "/assets/raksha-web.png",
    liveUrl: "https://get-raksha.web.app/"
  },
  {
    name: "Raksha App",
    description: "Personal safety mobile application.",
    tech: ["React Native", "Firebase", "Maps"],
    image: "/assets/raksha-app.png",
    liveUrl: "https://get-raksha-app.web.app/"
  },
  {
    name: "Solvare",
    description: "AI-powered problem solving tool.",
    tech: ["Python", "OpenAI", "Next.js"],
    image: "/assets/solvare.png",
    liveUrl: "https://solvare.art/"
  },
  {
    name: "WishWrap",
    description: "Digital gifting and wishlist platform.",
    tech: ["Next.js", "Stripe", "Prisma"],
    image: "/assets/wishwrap.png",
    liveUrl: "https://wishwrap.in/"
  },
  {
    name: "ClashZone Arena",
    description: "Competitive gaming platform for enthusiasts.",
    tech: ["React", "Firebase", "WebSockets"],
    image: "/assets/vidora.png", // Fallback image
    liveUrl: "https://clashzone-arena.web.app/"
  },
  {
    name: "EduSync",
    description: "Collaborative learning management system.",
    tech: ["WebSockets", "React", "Express"],
    image: "/assets/edusync.png",
    liveUrl: "https://edusync-frontend-beta.vercel.app/"
  },
  {
    name: "PicPrompt",
    description: "AI image generation prompt builder.",
    tech: ["React", "Stable Diffusion", "Vercel"],
    image: "/assets/picprompt.png",
    liveUrl: "https://www.picprompt.shop/"
  },
  {
    name: "Paradox Verse",
    description: "Immersive metaverse exploration site.",
    tech: ["Three.js", "React", "GSAP"],
    image: "/assets/paradox.png",
    liveUrl: "https://paradox-verse.web.app/"
  },
  {
    name: "Beyond Reality",
    description: "Future of web exploration and interaction.",
    tech: ["Next.js", "Three.js", "GSAP"],
    image: "/assets/beyond-reality.png",
    liveUrl: "http://beyond-reality-six.vercel.app/"
  },
  {
    name: "Fashion Landing",
    description: "Premium luxury fashion experience.",
    tech: ["Next.js", "Tailwind", "Framer"],
    image: "/assets/fashion-website.png",
    liveUrl: "https://fashion-landing-page-kappa-ten.vercel.app/"
  }
];

const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#fff1c7] text-[#140304] font-black text-[10px] uppercase tracking-[0.2em] rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
          >
            Visit Live
          </a>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-[#fff1c7] uppercase tracking-tighter">{project.name}</h3>
          <div className="flex flex-wrap gap-2 justify-end max-w-[150px]">
            {project.tech.map((t: string) => (
              <span key={t} className="text-[8px] font-bold text-[#b41e1e] uppercase tracking-widest bg-[#b41e1e]/10 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="text-[#fff1c7]/50 text-sm font-medium leading-relaxed">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-[#080b10] flex flex-col">
      <CustomCursor />
      
      {/* Simple Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0608]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-16 h-[72px] flex items-center">
          <Link href="/" className="flex items-center text-[#fff1c7]/50 hover:text-[#fff1c7] transition-colors text-[10px] font-black uppercase tracking-[0.25em]">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-40 pb-24 flex-1">
        <div className="container mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col mb-16 text-center md:text-left">
            <span className="text-[10px] tracking-[0.4em] font-black text-[#b41e1e] uppercase mb-4">
              Archive
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-[#fff1c7] leading-[0.9] tracking-tighter uppercase mb-6">
              All Projects
            </h1>
            <p className="text-[#fff1c7]/50 text-lg lg:text-xl font-bold uppercase tracking-[0.1em]">
              A complete list of everything I've built.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
