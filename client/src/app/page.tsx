import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
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
        <Features />
        <Process />
      </main>

      <Footer />
    </div>
  );
}
