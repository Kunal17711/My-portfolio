"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

const Contact = () => {
  return (
    <section id="contact" className="relative py-32 bg-[#080b10] overflow-hidden border-t border-white/5">
      
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[25vw] font-black text-white/[0.015] tracking-tighter leading-none uppercase">
          Contact
        </h1>
      </div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#b41e1e] blur-[250px] opacity-[0.05] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-16 lg:gap-24 items-center">
          
          {/* LEFT SIDE: Copy & Services */}
          <div className="flex flex-col space-y-12">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] tracking-[0.4em] font-black text-[#b41e1e] uppercase mb-6 block"
              >
                Collaboration
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-[clamp(3.5rem,8vw,6rem)] font-serif italic text-[#fff1c7] leading-[0.85] mb-8"
              >
                Let's Build<br />Something
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl max-w-lg"
              >
                <p className="text-[#fff1c7]/70 text-lg leading-relaxed">
                  Want a website, app, landing page, dashboard, or redesign? I can help turn your idea into a clean, functional digital product.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col space-y-6">
              {[
                { id: "01", name: "Websites & Landing Pages" },
                { id: "02", name: "Mobile App Interfaces" },
                { id: "03", name: "UI/UX Redesigns" }
              ].map((service, i) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex items-center justify-between py-4 border-b border-white/5"
                >
                  <div className="flex items-center space-x-6">
                    <span className="text-[10px] font-black text-[#b41e1e]">{service.id}</span>
                    <span className="text-xl font-bold text-[#fff1c7]/80 group-hover:text-[#fff1c7] transition-colors">{service.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#b41e1e] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* CENTER: Vertical Divider */}
          <div className="hidden lg:flex flex-col items-center h-full py-10">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent relative">
              <motion.div 
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-[#b41e1e] rounded-full blur-[2px]"
              />
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full" />
              <div className="absolute top-2/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full" />
              <div className="absolute top-3/4 left-1/2 -translate-x-1/2 w-1 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* RIGHT SIDE: Contact Cards & Buttons */}
          <div className="flex flex-col space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Email", value: "kkunaall10@gmail.com", icon: <Mail className="w-5 h-5" />, link: "mailto:kkunaall10@gmail.com" },
                { label: "Instagram", value: "@iiblamekunal", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, link: "https://instagram.com/iiblamekunal" },
                { label: "LinkedIn", value: "kunalldev", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>, link: "https://www.linkedin.com/in/kunalldev" }
              ].map((contact, i) => (
                <motion.a 
                  key={contact.label}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 group transition-all duration-300 hover:border-[#b41e1e]/50 hover:shadow-[0_0_30px_rgba(127,17,21,0.1)]"
                >
                  <div className="text-[#b41e1e] mb-4 group-hover:scale-110 transition-transform duration-500">
                    {contact.icon}
                  </div>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1 block">
                    {contact.label}
                  </span>
                  <span className="text-sm font-bold text-[#fff1c7] break-all">
                    {contact.value}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <a 
                href="mailto:kkunaall10@gmail.com"
                className="flex-1 px-12 py-5 bg-[#b41e1e] text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-sm text-center hover:bg-red-700 transition-all duration-300 shadow-[0_10px_40px_rgba(127,17,21,0.3)] hover:-translate-y-1 active:scale-95"
              >
                Email Me
              </a>
              <Link 
                href="#projects"
                className="flex-1 px-12 py-5 bg-white/5 text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-sm text-center border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 active:scale-95"
              >
                View Projects
              </Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default Contact;
