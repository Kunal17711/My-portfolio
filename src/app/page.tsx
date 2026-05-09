import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";

import Contact from "@/components/Contact";
import SeoJsonLd from "@/components/SeoJsonLd";

import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import { homepageJsonLd } from "@/lib/site-data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <SeoJsonLd data={homepageJsonLd} />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      <Hero />
      <Projects />
      <Capabilities />
      <Process />
      <About />
      <Contact />
    </main>
  );
}
