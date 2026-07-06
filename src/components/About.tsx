"use client";

import Image from "next/image";
import { Clock3, Code2, Coffee, Smile, Star } from "lucide-react";
import { motion } from "framer-motion";

const tags = ["designer", "developer", "dreamer", "perfectionist"];

const facts = [
  { label: "projects completed", value: "50+", icon: Star },
  { label: "happy clients", value: "30+", icon: Smile },
  { label: "years of experience", value: "3+", icon: Clock3 },
  { label: "cups of coffee", value: "∞", icon: Coffee },
  { label: "lines of code", value: "100K+", icon: Code2 },
];

const revealAnimation = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.28 },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] as any },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#030509] text-[#F6F8FF]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(142,197,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(142,197,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(1180px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8EC5FF]/50 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[min(1180px,88vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#3B82F6]/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-[#8EC5FF]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-[1360px] px-5 py-20 sm:px-7 md:px-10 md:py-24 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(360px,1.18fr)_minmax(300px,0.88fr)_minmax(250px,0.72fr)] lg:gap-12 xl:gap-14">
          <motion.div
            {...revealAnimation}
            className="about-card-wrap flex items-center justify-center lg:justify-start"
          >
            <Image
              src="/assets/card.webp"
              alt="Kunal Builds profile card"
              width={1024}
              height={1536}
              sizes="(max-width: 640px) 88vw, (max-width: 1024px) 470px, 520px"
              className="about-card-image block h-auto w-[min(88vw,420px)] object-contain drop-shadow-[0_28px_64px_rgba(0,0,0,0.46)] md:w-[min(58vw,500px)] lg:w-[min(100%,535px)]"
              priority={false}
            />
          </motion.div>

          <motion.div
            {...revealAnimation}
            transition={{ ...revealAnimation.transition, delay: 0.08 }}
            className="min-w-0"
          >
            <p className="font-mono text-sm tracking-[0.18em] text-[#8EC5FF]">
              // about me
            </p>
            <h2 className="mt-5 max-w-[500px] font-['Orbitron','Michroma','Audiowide','Rajdhani',sans-serif] leading-[1.02] tracking-[0.01em] text-[#F6F8FF]">
              <motion.span
                initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="block text-[clamp(2rem,4.4vw,3.7rem)] font-black uppercase"
              >
                I&apos;m Kunal,
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -18, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.78, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 block whitespace-nowrap bg-gradient-to-b from-[#B9DCFF] via-[#6AA9FF] to-[#2E70D9] bg-clip-text text-[clamp(1.45rem,3.45vw,2.9rem)] font-semibold italic normal-case text-transparent drop-shadow-[0_0_24px_rgba(59,130,246,0.30)]"
              >
                a digital creator.
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-[455px] font-['Rajdhani','Inter',system-ui,sans-serif] text-lg font-semibold leading-[1.48] tracking-[0.01em] text-[#D7DEE9] sm:text-xl"
            >
              I turn ideas into beautiful websites that don&apos;t just look good,
              but feel right.
            </motion.p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ duration: 0.45, delay: 0.26 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-full border border-[#B8C7D9]/25 bg-[#07111F]/75 px-3.5 py-2 font-['Rajdhani','Inter',system-ui,sans-serif] text-[13px] font-semibold tracking-[0.03em] text-[#F6F8FF] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_0_1px_rgba(59,130,246,0.04)] transition duration-300 hover:border-[#8EC5FF]/60 hover:bg-[#0A182C] hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.aside
            {...revealAnimation}
            transition={{ ...revealAnimation.transition, delay: 0.16 }}
            className="min-w-0 border-t border-[#B8C7D9]/20 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0"
          >
            <p className="font-mono text-sm tracking-[0.18em] text-[#8EC5FF]">
              // a few facts
            </p>

            <div className="mt-6 overflow-hidden rounded-[8px] border border-[#B8C7D9]/24 bg-[#06101D]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_26px_70px_rgba(0,0,0,0.34)] backdrop-blur">
              {facts.map(({ label, value, icon: Icon }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4, backgroundColor: "rgba(142,197,255,0.055)" }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-[34px_1fr_auto] items-center gap-3 border-b border-[#B8C7D9]/12 px-4 py-4 last:border-b-0 sm:px-5"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8C7D9]/18 bg-black/30 text-[#8EC5FF]">
                    <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <span className="font-['Rajdhani','Inter',system-ui,sans-serif] text-base font-normal leading-tight text-[#AAB5C3]">
                    {label}
                  </span>
                  <span className="font-['Share_Tech_Mono','JetBrains_Mono','IBM_Plex_Mono',monospace] text-sm font-semibold text-[#F6F8FF]">
                    {value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
