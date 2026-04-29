"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#140304] via-[#3b0708] to-[#b41e1e] pt-20 md:pt-0">
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

      {/* Background Serif Text: "Portfolio" */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-[80px] md:top-[40px] left-4 md:left-[40px] text-[20vw] md:text-[15vw] font-serif italic text-black leading-none select-none z-0 whitespace-nowrap"
      >
        Portfolio
      </motion.h1>

      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 relative z-20">
        
        {/* LEFT SIDE: Stacked Labels */}
        <motion.div 
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-2 static md:absolute md:left-[64px] md:top-[34%] text-[#fff1c7] font-black text-2xl md:text-[48px] leading-[0.9] uppercase tracking-tighter mb-8 md:mb-0"
        >
          <span>WEB</span>
          <span className="hidden md:block">APP</span>
          <span className="md:hidden">/</span>
          <span className="md:hidden">APP</span>
          <span className="hidden md:block">UI/UX</span>
          <span className="md:hidden">/</span>
          <span className="md:hidden">UIUX</span>
        </motion.div>

        {/* CENTER/MOBILE-CENTER: Character Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="relative md:absolute left-1/2 md:left-[55%] md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full h-[45vh] md:h-[88vh] flex items-center justify-center pointer-events-none"
        >
          {/* Subtle Glow behind character */}
          <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#b41e1e] blur-[100px] md:blur-[150px] opacity-40 rounded-full" />
          
          <div className="relative h-full w-full max-w-[320px] md:max-w-[600px]">
            <Image 
              src="/assets/hero-character.png" 
              alt="Kunal Developer" 
              fill
              className="object-contain z-20"
              priority
            />
          </div>
        </motion.div>

        {/* MAIN TITLE: Overlapping Title */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative md:absolute right-0 md:right-16 md:top-[50%] md:-translate-y-1/2 flex flex-col items-center md:items-end text-center md:text-right z-30 mt-8 md:mt-0 w-full md:w-auto"
        >
          <h2 className="text-[clamp(3.5rem,15vw,10rem)] md:text-[10vw] font-black text-[#fff1c7] leading-[0.8] tracking-tighter uppercase drop-shadow-2xl">
            KUNAL<br />
            <span className="bg-gradient-to-r from-[#fff1c7] to-[#b41e1e] bg-clip-text text-transparent">DEVELOPER</span>
          </h2>

          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-8 md:hidden">
            <a href="#projects" className="px-8 py-3 bg-[#fff1c7] text-[#140304] text-[10px] font-black uppercase tracking-[0.2em] rounded-sm">
              Projects
            </a>
            <a href="#contact" className="px-8 py-3 bg-white/5 text-[#fff1c7] text-[10px] font-black uppercase tracking-[0.2em] rounded-sm border border-white/10">
              Contact
            </a>
          </div>
        </motion.div>

        {/* BOTTOM LEFT/CENTER: Small Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1 }}
          className="static md:absolute bottom-12 left-0 md:left-16 flex flex-col items-center md:items-start space-y-1 text-[#fff1c7] text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] mt-12 md:mt-0 w-full md:w-auto"
        >
          <span>15-year-old web & app developer</span>
          <span>Building real digital products</span>
        </motion.div>

      </div>

    </section>
  );
};

export default Hero;
