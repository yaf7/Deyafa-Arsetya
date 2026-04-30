import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import FloatingDecorations from "./components/FloatingDecorations";
import CursorGlow from "./components/CursorGlow";

export default function Home() {
  return (
    <main className="relative bg-transparent w-full min-h-screen text-white overflow-x-hidden selection:bg-purple-900 selection:text-white">
      {/* Global Grain/Noise Texture for Premium feel */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Decorative Scrolling Orbs (Bulatan Gradasi Cahaya) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Top: Hero Section (Indigo to Purple) - The one the user missed! */}
        <div className="absolute top-0 -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-[130px]" />
        <div className="absolute top-[5%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-fuchsia-600/20 to-pink-600/20 blur-[120px]" />
        
        {/* Middle Top: About & Tech Stack (Blue to Cyan) */}
        <div className="absolute top-[25%] left-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-600/20 blur-[150px]" />
        
        {/* Middle: Publications & Projects (Violet to Purple) */}
        <div className="absolute top-[50%] -right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-violet-600/15 to-purple-600/15 blur-[140px]" />
        
        {/* Bottom: Footer (Emerald to Teal & Amber) */}
        <div className="absolute top-[75%] -left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-600/15 to-teal-600/15 blur-[130px]" />
        <div className="absolute bottom-[2%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-amber-600/15 to-orange-600/15 blur-[140px]" />
      </div>

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
