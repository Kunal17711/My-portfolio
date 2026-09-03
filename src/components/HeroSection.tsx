"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const stats = [
  { glyph: "<>", target: 60, suffix: "+", decimals: 0, label: "Featured Projects" },
  { glyph: "#", target: 20, suffix: "+", decimals: 0, label: "Creative Services" },
  { glyph: "%", target: 100, suffix: "%", decimals: 0, label: "Responsive Builds" },
  { glyph: "*", target: 24, suffix: "/7", decimals: 0, label: "Ideas in Motion" },
];

export default function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(() => stats.map(() => 0));

  useEffect(() => {
    const section = statsRef.current;
    if (!section) return;

    let hasRun = false;
    const timers: number[] = [];
    const frames: number[] = [];

    const runCounters = () => {
      if (hasRun) return;
      hasRun = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValues(stats.map((stat) => stat.target));
        return;
      }

      stats.forEach((stat, index) => {
        const timer = window.setTimeout(() => {
          const start = performance.now();
          const duration = 1500 + index * 80;

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValues((current) => {
              const next = [...current];
              next[index] = stat.target * eased;
              return next;
            });

            if (progress < 1) frames.push(window.requestAnimationFrame(tick));
          };

          frames.push(window.requestAnimationFrame(tick));
        }, 480 + index * 90);
        timers.push(timer);
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
      frames.forEach(window.cancelAnimationFrame);
    };
  }, []);

  return (
    <section id="home" className="evo-hero">
      <div className="evo-bg" aria-hidden="true">
        <video className="evo-bg-video" autoPlay muted loop playsInline>
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="evo-hero-inner">
        <div className="evo-hero-main">
          <div className="evo-trust anim" style={{ "--d": "0.05s" } as React.CSSProperties}>
            <div className="evo-avatars" aria-hidden="true">
              <span className="evo-avatar evo-avatar-one">
                <span><i className="fa-brands fa-react" /></span>
              </span>
              <span className="evo-avatar evo-avatar-two">
                <span><i className="fa-brands fa-js" /></span>
              </span>
              <span className="evo-avatar evo-avatar-three">
                <span><i className="fa-brands fa-node-js" /></span>
              </span>
            </div>
            <span className="evo-trust-pill">Available for Projects Worldwide</span>
          </div>

          <h1 className="evo-headline">
            <span>I Build Websites</span>
            <span>Apps &amp; Products</span>
          </h1>

          <p className="evo-subhead anim" style={{ "--d": "0.28s" } as React.CSSProperties}>
            From landing pages and dashboards to mobile apps and startup MVPs,
            I design and build polished digital products with React and Next.js.
          </p>

          <Link className="evo-cta anim" href="/projects" style={{ "--d": "0.4s" } as React.CSSProperties}>
            View My Work
          </Link>
        </div>

        <div className="evo-stats" ref={statsRef} aria-label="Platform statistics">
          {stats.map((stat, index) => (
            <div
              className="evo-stat anim"
              key={stat.label}
              style={{ "--d": `${0.5 + index * 0.08}s` } as React.CSSProperties}
            >
              <span className="evo-stat-glyph" aria-hidden="true">{stat.glyph}</span>
              <strong className="evo-stat-value">
                {values[index].toFixed(stat.decimals)}{stat.suffix}
              </strong>
              <span className="evo-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
