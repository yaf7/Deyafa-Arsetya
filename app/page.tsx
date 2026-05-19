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

export default function Home() {
  return (
    <main className="relative bg-transparent w-full min-h-screen text-white overflow-x-hidden selection:bg-purple-900 selection:text-white">
      {/* Global Grain/Noise Texture for Premium feel */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-[100]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Mobile FAB Contact Button */}
      <MobileFAB />

      {/* Decorative Scrolling Orbs (Bulatan Gradasi Cahaya) — GPU optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Top: Hero Section (Indigo to Purple) */}
        <div className="absolute top-0 -left-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-indigo-600/15 to-purple-600/15 blur-[80px]" />
        <div className="absolute top-[5%] -right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-fuchsia-600/15 to-pink-600/15 blur-[80px]" />
        
        {/* Middle Top: About & Tech Stack (Blue to Cyan) */}
        <div className="absolute top-[25%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-600/15 to-cyan-600/15 blur-[90px]" />
        
        {/* Middle: Publications & Projects (Violet to Purple) */}
        <div className="absolute top-[50%] -right-[10%] w-[450px] h-[450px] rounded-full bg-gradient-to-r from-violet-600/10 to-purple-600/10 blur-[90px]" />
        
        {/* Bottom: Footer (Emerald to Teal & Amber) */}
        <div className="absolute top-[75%] -left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-emerald-600/10 to-teal-600/10 blur-[80px]" />
        <div className="absolute bottom-[2%] right-[5%] w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-amber-600/10 to-orange-600/10 blur-[90px]" />
      </div>

      <ScorpioConstellation />
      <FloatingDecorations />
      
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Publications />
      <Projects />
      <Footer />
    </main>
  );
}
