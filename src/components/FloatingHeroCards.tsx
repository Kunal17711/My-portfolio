"use client";

import Image from "next/image";
import { useState } from "react";

export const floatingHeroCards = [
  {
    src: "/assets/vidora.webp",
    alt: "Vidora Project",
    ratio: "aspect-video",
    className: "w-[46vw] sm:w-[28vw] lg:w-[18vw]",
    desktopX: "-34vw",
    desktopY: "-23vh",
    mobileX: "-24vw",
    mobileY: "25vh",
    rotate: -7,
  },
  {
    src: "/assets/raksha-web.webp",
    alt: "Raksha Web",
    ratio: "aspect-[4/5]",
    className: "w-[28vw] sm:w-[15vw] lg:w-[10vw]",
    desktopX: "-29vw",
    desktopY: "24vh",
    mobileX: "20vw",
    mobileY: "26vh",
    rotate: 8,
  },
  {
    src: "/assets/hero-character.webp",
    alt: "Kunal Character",
    ratio: "aspect-square",
    className: "hidden sm:block sm:w-[12vw] lg:w-[8vw]",
    desktopX: "-3vw",
    desktopY: "-25vh",
    mobileX: "-5vw",
    mobileY: "34vh",
    rotate: 4,
  },
  {
    src: "/assets/raksha-app.webp",
    alt: "Raksha App",
    ratio: "aspect-[3/4]",
    className: "w-[30vw] sm:w-[16vw] lg:w-[10vw]",
    desktopX: "34vw",
    desktopY: "-21vh",
    mobileX: "-20vw",
    mobileY: "42vh",
    rotate: 7,
  },
  {
    src: "/assets/edusync.webp",
    alt: "EduSync",
    ratio: "aspect-[16/10]",
    className: "hidden md:block md:w-[25vw] lg:w-[19vw]",
    desktopX: "25vw",
    desktopY: "24vh",
    mobileX: "22vw",
    mobileY: "42vh",
    rotate: -6,
  },
  {
    src: "/assets/solvare.webp",
    alt: "Solvare",
    ratio: "aspect-[5/4]",
    className: "hidden md:block md:w-[16vw] lg:w-[11vw]",
    desktopX: "8vw",
    desktopY: "27vh",
    mobileX: "0vw",
    mobileY: "48vh",
    rotate: 5,
  },
  {
    src: "/assets/wishwrap.webp",
    alt: "WishWrap",
    ratio: "aspect-[9/16]",
    className: "hidden lg:block lg:w-[8vw]",
    desktopX: "43vw",
    desktopY: "10vh",
    mobileX: "0vw",
    mobileY: "0vh",
    rotate: 10,
  },
  {
    src: "/assets/beyond-reality.webp",
    alt: "Beyond Reality",
    ratio: "aspect-[21/9]",
    className: "hidden lg:block lg:w-[34vw]",
    desktopX: "0vw",
    desktopY: "36vh",
    mobileX: "0vw",
    mobileY: "0vh",
    rotate: -2,
    late: true,
  },
];

const gradients = [
  "from-[#171032] via-[#07070b] to-[#6c5cff]/45",
  "from-[#041b25] via-[#050505] to-[#00d1ff]/35",
  "from-[#220909] via-[#050505] to-[#ff2a2a]/22",
  "from-[#171717] via-[#07070b] to-[#f6f3ea]/14",
];

export default function FloatingHeroCards() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {floatingHeroCards.map((card, index) => (
        <div
          key={card.src}
          data-x={card.desktopX}
          data-y={card.desktopY}
          data-mobile-x={card.mobileX}
          data-mobile-y={card.mobileY}
          data-rotate={card.rotate}
          data-late={card.late ? "true" : "false"}
          className={`hero-media-card absolute left-1/2 top-1/2 ${card.className} will-change-transform`}
        >
          <div
            className={`${card.ratio} relative overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#08080c] shadow-[0_34px_90px_rgba(0,0,0,0.82)] md:rounded-[22px]`}
          >
            {!failedImages[card.src] && (
              <Image
                src={card.src}
                alt=""
                fill
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 28vw, 34vw"
                className="object-cover"
                onError={() =>
                  setFailedImages((current) => ({ ...current, [card.src]: true }))
                }
              />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                gradients[index % gradients.length]
              } ${failedImages[card.src] ? "opacity-100" : "opacity-0"}`}
            />
            <div className="absolute inset-0 bg-black/34 mix-blend-multiply" />
            <div className="absolute inset-x-3 top-3 h-px bg-white/16" />
          </div>
        </div>
      ))}
    </div>
  );
}
