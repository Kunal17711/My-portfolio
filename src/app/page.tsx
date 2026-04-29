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
      
      {/* Hero stays fixed in the background for zero-lag parallax */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <div className="pointer-events-auto h-full w-full">
          <Hero />
        </div>
      </div>

      {/* Subsequent sections start AFTER 100vh and slide UP over the Hero natively */}
      <div className="relative z-10 bg-[#080b10] mt-[100vh] shadow-[0_-20px_50px_rgba(0,0,0,0.8)] rounded-t-[40px] md:rounded-t-[80px] overflow-hidden border-t border-white/[0.05]">
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
