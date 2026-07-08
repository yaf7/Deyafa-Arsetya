import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import FloatingDecorations from "./components/FloatingDecorations";
import CursorGlow from "./components/CursorGlow";
import MobileFAB from "./components/MobileFAB";
import ScorpioConstellation from "./components/ScorpioConstellation";
import Certificates from "./components/Certificates";

export default function Home() {
  return (
    <main className="relative bg-transparent w-full min-h-screen text-white overflow-x-hidden selection:bg-emerald-900 selection:text-white">
      {/* Global Grain/Noise Texture for Premium feel — Optimized */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100]"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      />

      <CursorGlow />

      {/* Mobile FAB Contact Button */}
      <MobileFAB />

      {/* Decorative Scrolling Orbs (Bulatan Gradasi Cahaya) — GPU optimized with radial gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Top: Hero Section */}
        <div className="absolute top-0 -left-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(13,148,136,0.15)_0%,_transparent_70%)]" />
        <div className="absolute top-[5%] -right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(5,150,105,0.15)_0%,_transparent_70%)]" />
        
        {/* Middle Top: About & Tech Stack */}
        <div className="absolute top-[25%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(8,145,178,0.15)_0%,_transparent_70%)]" />
        
        {/* Middle: Publications & Projects */}
        <div className="absolute top-[50%] -right-[10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(13,148,136,0.10)_0%,_transparent_70%)]" />
        
        {/* Bottom: Footer */}
        <div className="absolute top-[75%] -left-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(5,150,105,0.10)_0%,_transparent_70%)]" />
        <div className="absolute bottom-[2%] right-[5%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(82,82,91,0.10)_0%,_transparent_70%)]" />
      </div>

      <ScorpioConstellation />
      <FloatingDecorations />
      
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Publications />
      <Projects />
      <Certificates />
      <Footer />
    </main>
  );
}
