"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md"
    >
      {/* Project Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={project.image} 
          alt={project.name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#fff1c7] text-[#140304] font-black text-[10px] uppercase tracking-[0.2em] rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-white"
          >
            View Project
          </a>
        </div>
      </div>

      {/* Content */}
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

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 bg-[#080b10] overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#b41e1e] blur-[200px] opacity-10 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col mb-16 text-center md:text-left">
          <span className="text-[10px] tracking-[0.4em] font-black text-[#b41e1e] uppercase mb-4">
            Projects
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-[#fff1c7] leading-[0.9] tracking-tighter uppercase mb-6">
            Selected Work
          </h2>
          <p className="text-[#fff1c7]/50 text-lg lg:text-xl font-bold uppercase tracking-[0.1em]">
            Some of the products I’ve built.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
