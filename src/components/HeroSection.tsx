"use client";

const heroWords = [
  {
    text: "design",
    className:
      "left-4 top-[18%] md:left-10 animate-[hero-reveal_900ms_ease-out_120ms_both]",
  },
  {
    text: "build",
    className:
      "right-4 top-[38%] md:right-10 animate-[hero-reveal_900ms_ease-out_260ms_both]",
  },
  {
    text: "ship",
    className:
      "left-[18%] top-[58%] md:left-[28%] animate-[hero-reveal_900ms_ease-out_400ms_both]",
  },
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/35" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-10 h-full w-full">
        {heroWords.map((word) => (
          <div
            key={word.text}
            aria-hidden="true"
            className={`hero-title absolute font-medium text-[14vw] text-white md:text-[13vw] ${word.className}`}
          >
            {word.text}
          </div>
        ))}

        <div className="absolute left-6 top-[43%] max-w-[330px] text-white md:left-10">
          <h1 className="text-2xl font-medium leading-none tracking-[-0.04em] md:text-3xl">
            Kunal Builds
          </h1>
          <p className="mt-3 text-[15px] leading-snug text-white/90">
            Kunal Builds is a web and app developer from Haryana, India. He
            builds websites, landing pages, dashboards, mobile apps, UI/UX
            interfaces, and real digital products.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-white/70">
            Technologies include React, Next.js, TypeScript, Tailwind CSS, React
            Native, Expo, Firebase, and Supabase.
          </p>
        </div>

        <div className="absolute right-6 top-[14%] md:right-24">
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[20deg] bg-white/40 md:block" />
            <div>
              <p className="text-right text-4xl font-medium tracking-tight md:text-5xl">
                +15
              </p>
              <p className="mt-1 text-right text-xs text-white/75 md:text-sm">
                projects built
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-6 md:bottom-24 md:left-20">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-4xl font-medium tracking-tight md:text-5xl">
                2+
              </p>
              <p className="mt-1 text-xs text-white/75 md:text-sm">
                years learning
              </p>
            </div>
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
          </div>
        </div>

        <div className="absolute bottom-16 right-6 md:bottom-20 md:right-20">
          <div className="flex items-center justify-end gap-3">
            <div className="hidden h-px w-24 rotate-[-20deg] bg-white/40 md:block" />
            <div>
              <p className="text-right text-4xl font-medium tracking-tight md:text-5xl">
                fast
              </p>
              <p className="mt-1 text-right text-xs text-white/75 md:text-sm">
                idea to launch
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
