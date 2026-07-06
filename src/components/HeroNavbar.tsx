"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "HOME", href: "/#home" },
  { label: "ABOUT", href: "/about" },
  { label: "WORK", href: "/projects" },
  { label: "SERVICES", href: "/services" },
  { label: "PROCESS", href: "/#process" },
  { label: "CONTACT", href: "/contact" },
];

export default function HeroNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActiveLink = (href: string) => {
    if (href === "/#home") {
      return pathname === "/";
    }

    if (href.includes("#")) {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <nav
        className="kb-nav-shell flex min-h-[82px] w-full items-center justify-between gap-4 border-y border-white/10 bg-black/60 px-5 py-3 text-white backdrop-blur-xl sm:px-7 md:px-9 lg:px-12"
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="kb-brand group inline-flex min-h-14 min-w-0 items-center gap-4 text-white"
          aria-label="Go to Kunal Builds homepage"
          onClick={() => setIsOpen(false)}
        >
          <span className="kb-brand-disc" aria-hidden="true">
            KB
          </span>
          <span className="min-w-0">
            <span className="kb-brand-name">Kunal</span>
            <span className="kb-brand-sub">Builds</span>
          </span>
        </Link>

        <div className="kb-nav-links hidden items-center justify-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`kb-nav-link inline-flex min-h-11 items-center gap-0.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white/75 transition hover:text-white ${isActiveLink(link.href) ? "is-active" : ""}`}
            >
              <span className="kb-link-code" aria-hidden="true">
                _
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          className="kb-nav-cta hidden min-h-12 items-center gap-3 rounded-full border border-white/25 bg-black/50 px-7 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-500/20 lg:inline-flex"
          aria-label="Contact Kunal Builds"
        >
          <span>Let&apos;s talk</span>
          <ArrowUpRight size={18} strokeWidth={2.4} aria-hidden="true" />
        </Link>

        <button
          type="button"
          className={`kb-balloon-trigger inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white lg:hidden ${isOpen ? "is-open" : ""}`}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="kb-balloon-glow" aria-hidden="true" />
          <span className="kb-balloon-surface" aria-hidden="true" />
          <span className="kb-balloon-icon" aria-hidden="true">
            {isOpen ? <X size={19} /> : <Menu size={19} />}
          </span>
        </button>
      </nav>

      <div
        className={`kb-mobile-layer fixed inset-0 z-40 lg:hidden ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
          <button
            type="button"
            className="kb-mobile-scrim absolute inset-0 bg-black/72 backdrop-blur-sm"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            tabIndex={isOpen ? 0 : -1}
          />
          <aside
            id="mobile-navigation"
            className="kb-mobile-drawer absolute right-0 top-0 flex h-dvh w-[min(86vw,360px)] flex-col border-l border-white/20 bg-black px-5 py-5 text-white shadow-2xl shadow-blue-500/20"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="kb-brand inline-flex min-h-14 min-w-0 items-center gap-4 text-white"
                aria-label="Go to Kunal Builds homepage"
                onClick={() => setIsOpen(false)}
              >
                <span className="kb-brand-disc" aria-hidden="true">
                  KB
                </span>
                <span className="min-w-0">
                  <span className="kb-brand-name">Kunal</span>
                  <span className="kb-brand-sub">Builds</span>
                </span>
              </Link>
              <button
                type="button"
                className="kb-balloon-trigger is-open inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border border-white/25 bg-black/60 text-white"
                aria-label="Close navigation menu"
                onClick={() => setIsOpen(false)}
              >
                <span className="kb-balloon-glow" aria-hidden="true" />
                <span className="kb-balloon-surface" aria-hidden="true" />
                <span className="kb-balloon-icon" aria-hidden="true">
                  <X size={19} />
                </span>
              </button>
            </div>

            <div className="mt-8">
              <p className="kb-mobile-status">STATUS: ONLINE / MENU_SYS</p>
              <div className="mt-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`kb-mobile-link flex min-h-[52px] items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.03] px-4 text-sm font-bold uppercase tracking-[0.08em] text-white/80 ${isActiveLink(link.href) ? "is-active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="kb-link-code" aria-hidden="true">
                      _
                    </span>
                    <span>{link.label}</span>
                    <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto border-t border-white/10 pt-5">
              <p className="kb-mobile-status">KUNAL_BUILDS.EXE</p>
              <Link
                href="/contact"
                className="kb-nav-cta mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-black/50 px-5 py-3 text-xs font-bold uppercase tracking-[0.08em] text-white shadow-lg shadow-blue-500/20"
                onClick={() => setIsOpen(false)}
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </Link>
            </div>
          </aside>
      </div>
    </header>
  );
}
