"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const contactLinks = [
  { label: "email", value: "kkunaall10@gmail.com", href: "mailto:kkunaall10@gmail.com" },
  { label: "instagram", value: "@iiblamekunal", href: "https://instagram.com/iiblamekunal" },
  { label: "linkedin", value: "kunalldev", href: "https://www.linkedin.com/in/kunalldev" },
  { label: "upwork", value: "upwork profile", href: "https://www.upwork.com/freelancers/~01bb3c4a0ecb285252?mp_source=share" },
  { label: "fiverr", value: "fiverr profile", href: "https://www.fiverr.com/s/yv3DB6z" },
  { label: "x", value: "@kunallbuilds", href: "https://x.com/kunallbuilds" },
  { label: "github", value: "Kunal17711", href: "https://github.com/Kunal17711" },
  { label: "available for", value: "websites · apps · dashboards · landing pages · redesigns · mvps", href: null },
];

const revealVariants = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
};

const transition = {
  duration: 0.7,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ease: [0.22, 1, 0.36, 1] as any,
};

const Contact = () => {
  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background Depth Blurs */}
      <div className="absolute top-20 left-0 h-[500px] w-[500px] rounded-full bg-white/[0.035] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-white/[0.025] blur-3xl pointer-events-none" />
      
      {/* Big Faded Background Typography */}
      <div className="absolute bottom-[-0.25em] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        <div className="text-[32vw] font-medium tracking-[-0.1em] leading-none text-white/[0.03]">
          Kunal
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-32 min-h-screen flex flex-col justify-between relative z-10">
        
        {/* Top Content */}
        <div>
          <motion.span 
            variants={revealVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={transition}
            className="text-sm text-white/60 tracking-[0.28em] uppercase"
          >
            contact
          </motion.span>

          <motion.h2 
            variants={revealVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.1 }}
            className="mt-8 max-w-6xl text-5xl md:text-8xl lg:text-9xl font-medium tracking-[-0.08em] leading-[0.85]"
          >
            have an idea? let’s turn it into something real.
          </motion.h2>

          <motion.p 
            variants={revealVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.2 }}
            className="mt-8 max-w-3xl text-xl md:text-3xl leading-[1.25] tracking-[-0.035em] text-white/72"
          >
            whether you need a website, mobile app, dashboard, landing page, redesign, or startup mvp, i can help you shape it, build it, and launch it with a clean premium finish.
          </motion.p>

          {/* Contact Rows Wrapper */}
          <div className="mt-20 border-t border-white/10">
            {contactLinks.map((link, index) => {
              const isExternal = link.href && !link.href.startsWith("mailto:");
              const Content = (
                <motion.div 
                  variants={revealVariants}
                  initial="initial"
                  whileInView="whileInView"
                  viewport={{ once: true }}
                  transition={{ ...transition, delay: 0.3 + index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-white/10 py-6 md:py-7 group hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <div className="md:col-span-3 text-xs uppercase tracking-[0.22em] text-white/60 flex items-center">
                    {link.label}
                  </div>
                  <div className="md:col-span-9 flex items-center justify-between">
                    <span className="text-xl md:text-3xl tracking-[-0.04em] text-white group-hover:text-white/70 transition-colors break-words overflow-hidden">
                      {link.value}
                    </span>
                    {link.href && (
                      <span className="text-xl md:text-3xl text-white/60 group-hover:text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                        ↗
                      </span>
                    )}
                  </div>
                </motion.div>
              );

              if (link.href) {
                return (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target={isExternal ? "_blank" : undefined} 
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="block outline-none"
                  >
                    {Content}
                  </a>
                );
              }

              return <div key={link.label}>{Content}</div>;
            })}
          </div>

          {/* CTA Buttons */}
          <motion.div 
            variants={revealVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="mailto:kkunaall10@gmail.com"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black hover:bg-neutral-200 transition-colors"
            >
              text me / email me
            </a>
            <Link 
              href="/projects"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              view projects
            </Link>
            <a 
              href="https://github.com/Kunal17711"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-medium text-white hover:bg-white/[0.08] transition-colors"
            >
              open github
            </a>
          </motion.div>
        </div>

        {/* Footer Content */}
        <motion.footer 
          variants={revealVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.9 }}
          className="mt-24 border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="text-sm text-white/60">
            © 2024 kunal.dev
          </div>
          
          <div className="text-sm text-white/60 italic">
            built with taste, speed, and real execution.
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "home", href: "/" },
              { label: "about", href: "/about" },
              { label: "projects", href: "/projects" },
              { label: "services", href: "/services" },
              { label: "contact", href: "/contact" },
              { label: "linkedin", href: "https://www.linkedin.com/in/kunalldev", external: true },
              { label: "github", href: "https://github.com/Kunal17711", external: true },
              { label: "x", href: "https://x.com/kunallbuilds", external: true },
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                aria-label={
                  link.external
                    ? `Open ${link.label === "x" ? "X" : link.label} profile`
                    : undefined
                }
                className="inline-flex min-h-11 items-center text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.footer>

      </div>
    </section>
  );
};

export default Contact;
