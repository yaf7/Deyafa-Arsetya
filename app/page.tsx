import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Publications from "./components/Publications";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative bg-transparent w-full min-h-screen text-white overflow-x-hidden selection:bg-purple-900 selection:text-white">
      {/* Global Grain/Noise Texture for Premium feel */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100]" 
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Decorative Scrolling Orbs (Bulatan Cahaya Berbeda Warna) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Orb 1: Hero Section (Cyan/Blue) */}
        <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-700/20 blur-[120px]" />
        
        {/* Orb 2: About Section (Fuchsia/Pink) */}
        <div className="absolute top-[25%] -right-[15%] w-[600px] h-[600px] rounded-full bg-fuchsia-700/10 blur-[130px]" />
        
        {/* Orb 3: Tech Stack Section (Violet/Indigo) */}
        <div className="absolute top-[45%] -left-[20%] w-[700px] h-[700px] rounded-full bg-indigo-700/20 blur-[150px]" />
        
        {/* Orb 4: Projects Section (Amber/Orange) */}
        <div className="absolute top-[70%] -right-[10%] w-[500px] h-[500px] rounded-full bg-amber-600/10 blur-[120px]" />
        
        {/* Orb 5: Footer Section (Emerald/Teal) */}
        <div className="absolute bottom-[-2%] left-[10%] w-[600px] h-[600px] rounded-full bg-emerald-700/10 blur-[140px]" />
      </div>
      
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
