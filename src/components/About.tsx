"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="relative min-h-screen w-full py-24 overflow-hidden bg-[#080b10]">
      
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/about-bg.png" 
          alt="About Background" 
          fill 
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140304] via-transparent to-[#140304] z-10" />
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24 items-end">
          
          {/* LEFT: Character Image */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-full max-w-[450px] aspect-[4/5]">
              <Image 
                src="/assets/about-character.png" 
                alt="About Kunal" 
                fill 
                className="object-contain"
              />
            </div>
          </motion.div>

          {/* CENTER: Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.4em] font-black text-[#b41e1e] uppercase mb-4 block">
                About Me
              </span>
              <h2 className="text-6xl md:text-8xl font-serif italic text-[#fff1c7] leading-[0.9] mb-8">
                Who is<br />Kunal?
              </h2>
              <p className="text-[#fff1c7]/70 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                I’m a 15-year-old commerce student from India who builds real web and app products. 
                I design interfaces, write code, connect backends, and turn ideas into working digital experiences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-2 gap-8 pt-4"
            >
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#fff1c7]">15+</span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-[#b41e1e] uppercase">Projects Built</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-[#fff1c7]">2+</span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-[#b41e1e] uppercase">Years Learning</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Glass Cards */}
          <div className="flex flex-col space-y-6">
            {[
              {
                title: "Young Builder",
                desc: "Started early, learning fast, and shipping real projects."
              },
              {
                title: "Web & App Developer",
                desc: "Building responsive websites, dashboards, landing pages, and mobile apps."
              },
              {
                title: "Product Mindset",
                desc: "Focused on clean UI, practical features, and real-world usability."
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 241, 199, 0.08)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl group transition-all duration-300"
              >
                <h3 className="text-xl font-black text-[#fff1c7] uppercase mb-3 tracking-tighter">
                  {card.title}
                </h3>
                <p className="text-sm text-[#fff1c7]/60 leading-relaxed font-bold">
                  {card.desc}
                </p>
                <div className="mt-4 w-10 h-[2px] bg-[#b41e1e] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};

export default About;
