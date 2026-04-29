import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080b10]">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      {/* Hero stays fixed while scrolling */}
      <div className="sticky top-0 z-0 h-screen w-full">
        <Hero />
      </div>

      {/* Subsequent sections slide UP over the Hero */}
      <div className="relative z-10 bg-[#080b10] shadow-[0_-30px_60px_rgba(0,0,0,0.6)] rounded-t-[40px] md:rounded-t-[80px] overflow-hidden border-t border-white/[0.05]">
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
