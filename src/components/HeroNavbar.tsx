"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export default function HeroNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 720) setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);

    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="evo-header">
      <nav className="evo-nav" aria-label="Primary navigation">
        <Link className="evo-logo" href="/" aria-label="Kunal Builds home" onClick={closeMenu}>
          <span>Kunal</span>
          <strong>Builds</strong>
        </Link>

        <div className="evo-nav-pill" aria-label="Desktop navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="evo-nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link className="evo-sign-in evo-sign-in-desktop" href="/contact">
          Let&apos;s Talk
        </Link>

        <button
          type="button"
          className={`evo-menu-toggle ${isOpen ? "is-open" : ""}`}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="evo-mobile-menu"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`evo-mobile-overlay ${isOpen ? "is-open" : ""}`} hidden={!isOpen}>
        <button className="evo-overlay-dismiss" type="button" aria-label="Close menu" onClick={closeMenu} />
        <div id="evo-mobile-menu" className="evo-mobile-menu">
          <div className="evo-mobile-links">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="evo-mobile-link"
                style={{ "--link-index": index } as React.CSSProperties}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link className="evo-mobile-sign-in" href="/contact" onClick={closeMenu}>
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </header>
  );
}
