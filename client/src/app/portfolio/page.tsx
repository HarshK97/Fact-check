"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImportLedger from "@/components/ImportLedger";
import RivalAnalysis from "@/components/RivalAnalysis";

export default function PortfolioSyncPage() {
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

            <main className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 top-0 h-[800px] z-0 opacity-10 pointer-events-none chess-square-bg"></div>

                <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-full mb-6 shadow-sm">
                            <span className="material-symbols-outlined text-primary text-3xl">sync_alt</span>
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-text-main-light dark:text-board-light">Sync Portfolio</h1>
                        <p className="text-lg text-text-muted-light dark:text-wood-light/80 max-w-2xl mx-auto font-light leading-relaxed">
                            Align your investment strategy with reality. Upload your ledger or scout a competitor&apos;s position to receive a Grandmaster-level fact check.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                        <ImportLedger />
                        <RivalAnalysis />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
