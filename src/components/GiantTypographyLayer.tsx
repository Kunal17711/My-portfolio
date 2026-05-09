const giantTypographyWords = [
  {
    text: "BUILD",
    className: "left-[10vw] top-[-14vh]",
    textClassName:
      "text-[clamp(10rem,22vw,24rem)] leading-[0.85] tracking-[-0.06em]",
    rotate: 0,
    opacity: 0.95,
    x: "0vw",
    y: "-8vh",
    scale: 1.16,
  },
  {
    text: "YOUR",
    className: "left-[-5vw] top-[24vh]",
    textClassName:
      "text-[clamp(8rem,15vw,18rem)] -rotate-90 leading-[0.85] tracking-[-0.06em]",
    rotate: -90,
    opacity: 0.9,
    x: "-7vw",
    y: "3vh",
    scale: 1.12,
  },
  {
    text: "IDEAS",
    className: "left-[-2vw] top-[42vh] hidden md:block",
    textClassName:
      "text-[clamp(6rem,11vw,14rem)] -rotate-90 leading-[0.85] tracking-[-0.06em]",
    rotate: -90,
    opacity: 0.78,
    x: "-7vw",
    y: "5vh",
    scale: 1.1,
  },
  {
    text: "CODE",
    className: "right-[-4vw] top-[18vh]",
    textClassName:
      "text-[clamp(8rem,15vw,18rem)] rotate-90 leading-[0.85] tracking-[-0.06em]",
    rotate: 90,
    opacity: 0.92,
    x: "7vw",
    y: "-3vh",
    scale: 1.12,
  },
  {
    text: "SHIP",
    className: "right-[1vw] bottom-[10vh] hidden md:block",
    textClassName:
      "text-[clamp(4rem,8vw,8rem)] rotate-[18deg] leading-[0.85] tracking-[-0.06em]",
    rotate: 18,
    opacity: 0.85,
    x: "5vw",
    y: "3vh",
    scale: 1.1,
  },
  {
    text: "PRODUCTS",
    className: "left-[18vw] bottom-[-16vh]",
    textClassName:
      "text-[clamp(8rem,18vw,20rem)] leading-[0.8] tracking-[-0.06em]",
    rotate: 0,
    opacity: 0.9,
    x: "2vw",
    y: "9vh",
    scale: 1.14,
  },
  {
    text: "DESIGN",
    className: "right-[10vw] bottom-[8vh] hidden lg:block",
    textClassName:
      "text-[clamp(4rem,7vw,7rem)] rotate-[-18deg] leading-[0.85] tracking-[-0.06em]",
    rotate: -18,
    opacity: 0.8,
    x: "4vw",
    y: "4vh",
    scale: 1.08,
  },
];

export default function GiantTypographyLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden [perspective:820px] [transform-style:preserve-3d]"
      aria-hidden="true"
    >
      {giantTypographyWords.map((word) => (
        <div
          key={word.text}
          data-x={word.x}
          data-y={word.y}
          data-scale={word.scale}
          data-rotate={word.rotate}
          data-opacity={word.opacity}
          className={`kinetic-word absolute whitespace-nowrap font-black uppercase text-[#6C5CFF] will-change-transform ${word.className}`}
          aria-hidden="true"
        >
          <span className={`block select-none ${word.textClassName}`}>
            {word.text}
          </span>
        </div>
      ))}
    </div>
  );
}
