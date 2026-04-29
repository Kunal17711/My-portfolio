"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = ["Home", "About", "Projects", "Skills", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "projects", "skills", "contact"];
      let current = "home";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = section;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* ── Main Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0608]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[#0a0608]/60 backdrop-blur-md border-b border-white/[0.04]"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-16 flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link
            href="#home"
            className="group flex items-center gap-1 text-xl font-black tracking-[0.08em] text-[#fff1c7] select-none"
          >
            KUNAL
            <span className="text-[#b41e1e] group-hover:text-[#fff1c7] transition-colors duration-300">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((item, i) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`relative group text-[11px] font-semibold uppercase tracking-[0.25em] transition-colors duration-300 ${
                      isActive ? "text-[#b41e1e]" : "text-[#fff1c7]/50 hover:text-[#fff1c7]"
                    }`}
                  >
                    {item}

                    {/* Underline: center-expand */}
                    <span
                      className={`absolute -bottom-1 left-1/2 h-[1.5px] bg-[#b41e1e] rounded-full transition-all duration-300 -translate-x-1/2 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-1 h-1 bg-[#b41e1e] rounded-full"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="hidden md:block"
          >
            <Link
              href="#contact"
              className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#fff1c7] to-[#f5d97a] text-[#140304] text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_24px_rgba(255,241,199,0.25)] shadow-[0_4px_16px_rgba(255,241,199,0.1)]"
            >
              Let&apos;s Talk
            </Link>
          </motion.div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-50 relative"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-[#fff1c7] rounded-full origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[1.5px] bg-[#fff1c7] rounded-full"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[1.5px] bg-[#fff1c7] rounded-full origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-sm bg-[#0d0507] border-l border-white/[0.06] flex flex-col md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-[#fff1c7]/60 hover:text-[#fff1c7] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2 px-8 mt-6">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.35 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 text-3xl font-black uppercase tracking-tighter border-b border-white/[0.05] transition-colors duration-200 ${
                        activeSection === item.toLowerCase()
                          ? "text-[#b41e1e]"
                          : "text-[#fff1c7]/60 hover:text-[#fff1c7]"
                      }`}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-auto px-8 pb-12">
                <Link
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 text-center rounded-full bg-gradient-to-r from-[#fff1c7] to-[#f5d97a] text-[#140304] text-[11px] font-black uppercase tracking-[0.25em] hover:shadow-[0_0_24px_rgba(255,241,199,0.2)] transition-all"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
