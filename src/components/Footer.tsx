"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#080b10] border-t border-white/5 py-8">
      <div className="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-[#fff1c7]/50 text-sm font-medium tracking-wide text-center md:text-left">
          © {new Date().getFullYear()} Kunal. All rights reserved.
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6">
          <Link href="#projects" className="text-[#fff1c7]/50 hover:text-[#fff1c7] transition-colors text-sm font-medium flex items-center gap-1 group">
            Projects <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </Link>
          <a href="https://instagram.com/iiblamekunal" target="_blank" rel="noopener noreferrer" className="text-[#fff1c7]/50 hover:text-[#fff1c7] transition-colors text-sm font-medium flex items-center gap-1 group">
            Instagram <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="mailto:kkunaall10@gmail.com" className="text-[#fff1c7]/50 hover:text-[#fff1c7] transition-colors text-sm font-medium flex items-center gap-1 group">
            Email <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
