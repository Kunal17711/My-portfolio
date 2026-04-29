"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ── Shared animation variants (desktop only) ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: "easeOut" as const, delay },
});

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#140304] via-[#1e0405] to-[#080b10] flex flex-col"
    >
      {/* ── Background glow blobs ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#b41e1e] blur-[200px] opacity-20 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3b0708] blur-[180px] opacity-30 rounded-full pointer-events-none" />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-10" />

      {/* ── Watermark ── */}
      <div className="absolute top-16 md:top-10 left-0 right-0 flex justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[22vw] md:text-[16vw] font-black text-white/[0.03] tracking-tight leading-none whitespace-nowrap">
          PORTFOLIO
        </span>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (< md)
      ══════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col items-center justify-start pt-28 px-6 z-20 flex-1 text-center">

        {/* Label — slide in from left */}
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b41e1e] mb-4 block"
        >
          Web · App · UI/UX
        </motion.span>

        {/* Name — slide in from right */}
        <motion.h1
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15vw] font-black text-[#fff1c7] leading-[0.85] tracking-tighter uppercase"
        >
          KUNAL
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[15vw] font-black leading-[0.85] tracking-tighter uppercase bg-gradient-to-r from-[#fff1c7] to-[#b41e1e] bg-clip-text text-transparent mb-4"
        >
          DEVELOPER
        </motion.h1>

        {/* Character image — zoom in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-[240px] aspect-[3/4] my-4"
        >
          <div className="absolute inset-0 bg-[#b41e1e] blur-[80px] opacity-30 rounded-full" />
          <Image
            src="/assets/hero-character.png"
            alt="Kunal Developer"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Bio — fade up */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          className="text-[#fff1c7]/50 text-[11px] font-medium uppercase tracking-[0.2em] leading-loose mb-8"
        >
          15-year-old builder · Real digital products
        </motion.p>

        {/* CTA Buttons — fade up staggered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.75 }}
          className="flex gap-4 w-full max-w-xs"
        >
          <a
            href="#projects"
            className="flex-1 py-3.5 bg-[#fff1c7] text-[#140304] text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-center hover:bg-white transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="flex-1 py-3.5 bg-white/5 text-[#fff1c7] text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-center border border-white/10 hover:bg-white/10 transition-colors"
          >
            Contact
          </a>
        </motion.div>

        {/* Scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#fff1c7]">Scroll</span>
          <div className="w-[1px] h-8 bg-[#fff1c7]" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (≥ md)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-1 items-center relative z-20">
        <div className="container mx-auto px-16 grid grid-cols-[auto_1fr_auto] items-center gap-8 h-full py-32">

          {/* LEFT: Vertical labels */}
          <motion.div
            {...fadeUp(0.3)}
            className="flex flex-col space-y-1 text-[#fff1c7] font-black text-[44px] leading-[0.88] uppercase tracking-tighter"
          >
            <span>WEB</span>
            <span>APP</span>
            <span>UI/UX</span>
          </motion.div>

          {/* CENTER: Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[82vh] flex items-end justify-center pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#b41e1e] blur-[150px] opacity-35 rounded-full" />
            <div className="relative w-full max-w-[520px] h-full">
              <Image
                src="/assets/hero-character.png"
                alt="Kunal Developer"
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* RIGHT: Title + info */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-col items-end text-right"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b41e1e] mb-6 block">
              Portfolio
            </span>

            <h1 className="text-[9vw] font-black text-[#fff1c7] leading-[0.82] tracking-tighter uppercase">
              KUNAL<br />
              <span className="bg-gradient-to-r from-[#fff1c7] to-[#b41e1e] bg-clip-text text-transparent">
                DEV
              </span>
            </h1>

            <div className="mt-8 space-y-1 text-[#fff1c7]/40 text-[10px] font-bold uppercase tracking-[0.25em]">
              <p>15-year-old web &amp; app developer</p>
              <p>Building real digital products</p>
            </div>

            {/* Desktop CTAs */}
            <div className="flex gap-4 mt-10">
              <motion.a
                {...fadeUp(0.75)}
                href="#projects"
                className="px-8 py-3 bg-[#fff1c7] text-[#140304] text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,241,199,0.2)]"
              >
                Projects
              </motion.a>
              <motion.a
                {...fadeUp(0.85)}
                href="#contact"
                className="px-8 py-3 bg-white/5 text-[#fff1c7] text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator (bottom center) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#fff1c7]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-[#fff1c7] to-transparent"
          />
        </motion.div>
      </div>

    </section>
  );
};

export default Hero;
