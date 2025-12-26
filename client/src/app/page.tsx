import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import StatsBoard from "@/components/StatsBoard";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      {/* Background Chess Board Grid - Fixed at main level or passing down? 
            Original HTML put it inside text-wood-dark wrapper. 
            Here we put it as a fixed background or part of Hero? 
            Original: <div class="h-2 w-full flex">...</div> was top bar.
            Wait, the HTML structure had:
            body > div.relative...
              div.h-2 (top strip)
              header
              main
                div.absolute (chess bg)
                section (Hero)
                section (Stats)
                section (Features)
                section (Process)
              footer
        */}

      <div className="h-2 w-full flex">
        <div className="w-full h-full bg-board-dark"></div>
        <div className="w-full h-full bg-board-light"></div>
        <div className="w-full h-full bg-board-dark"></div>
        <div className="w-full h-full bg-board-light"></div>
        <div className="w-full h-full bg-board-dark"></div>
        <div className="w-full h-full bg-board-light"></div>
        <div className="w-full h-full bg-board-dark"></div>
        <div className="w-full h-full bg-board-light"></div>
      </div>

      <Header />

      <main className="flex-1 relative">
        <div className="absolute inset-0 top-0 h-[800px] z-0 opacity-10 pointer-events-none chess-square-bg"></div>
        <Hero />
        <StatsBoard />
        <Features />
        <Process />
      </main>

      <Footer />
    </div>
  );
}
