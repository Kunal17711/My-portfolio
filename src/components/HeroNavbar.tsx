"use client";

import Link from "next/link";

const navLinks = [
  { label: "home", href: "#home" },
  { label: "projects", href: "/projects" },
  { label: "services", href: "/services" },
  { label: "about", href: "/about" },
  { label: "contact", href: "/contact" },
];

export default function HeroNavbar() {
  return (
    <header className="absolute left-0 right-0 top-0 z-20 px-6 pt-6 md:px-10">
      <nav className="flex items-center justify-between gap-4" aria-label="Primary navigation">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full bg-neutral-900/90 py-3 pl-4 pr-6 backdrop-blur"
          aria-label="kunal.dev home"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-black">
            k
          </span>
          <span className="text-sm font-normal tracking-tight text-white">
            kunal.dev
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full bg-neutral-900/90 px-3 py-2 backdrop-blur md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-5 py-2 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="rounded-full bg-white px-6 py-3 text-sm font-normal text-black transition-colors hover:bg-neutral-200"
        >
          let&apos;s talk
        </Link>
      </nav>
    </header>
  );
}
