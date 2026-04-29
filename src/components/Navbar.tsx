"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "skills", "contact"];
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust threshold based on layout (e.g., if top is <= 200px from top of viewport)
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      } else if (window.scrollY === 0) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-6 lg:py-8 bg-[#080b10]/80 backdrop-blur-md border-b border-white/5"
      >
        {/* Left: Kunal */}
        <Link href="#home" className="text-2xl font-black tracking-tighter text-[#fff1c7] group z-50">
          KUNAL<span className="text-[#b41e1e] group-hover:text-white transition-colors">.</span>
        </Link>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center gap-12">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-colors ${
                activeSection === item.toLowerCase() 
                  ? "text-[#b41e1e]" 
                  : "text-[#fff1c7]/60 hover:text-[#fff1c7]"
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right: CTA (Desktop) */}
        <Link 
          href="#contact" 
          className="hidden md:block px-8 py-3 rounded-sm bg-[#fff1c7] text-[#140304] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all duration-300"
        >
          Let's Talk
        </Link>

        {/* Hamburger (Mobile) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col space-y-1.5 z-50 p-2"
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#fff1c7]" 
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-[#fff1c7]" 
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-[#fff1c7]" 
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#140304] flex flex-col items-center justify-center space-y-8"
          >
            {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-4xl font-black uppercase tracking-tighter text-[#fff1c7] hover:text-[#b41e1e] transition-colors"
              >
                {item}
              </Link>
            ))}
            <Link 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="mt-4 px-12 py-4 rounded-sm bg-[#fff1c7] text-[#140304] text-sm font-black uppercase tracking-[0.2em]"
            >
              Let's Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
