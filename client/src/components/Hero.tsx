"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
    const router = useRouter();
    const [url, setUrl] = useState("");

    const handleAnalyze = () => {
        if (!url.trim()) return;
        const encodedUrl = encodeURIComponent(url);
        router.push(`/analysis?url=${encodedUrl}`);
    };

    return (
        <section className="relative z-10">
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-12 lg:py-24">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="@container">
                        <div className="@[480px]:p-4">
                            <div className="flex min-h-[560px] flex-col gap-8 rounded-xl items-center justify-center p-6 md:p-12 relative overflow-hidden border-[6px] border-wood-medium dark:border-wood-dark shadow-2xl bg-surface-dark group">
                                <div className="absolute inset-0 border-[2px] border-primary/20 rounded-lg pointer-events-none z-20"></div>
                                <div className="absolute inset-0 bg-cover bg-center z-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9_UvCSSb1VtGHnHfHVhsiaK4yg7pMAy2Ew1O1J1I5ROgyOeZvXGnM1iMYyE6J-vteWebUZQNOG9OLi4-6nqCxz0ZcBe0YEcsPEeBxEKp_9hFvpltcFDtnaA_Y4TXpu7UB6a9R0rhWqHO1MD9DWg6jugNHYkN5fEOVxY68MHsFOPAbdzP2SW_PXE74ucS5elbGlLSgmx64sBKptB8U4uew3BKP-86Z0_uJpLj4auIw2BHppUprlFhGpdqM-2GUkgn-ihGa43JZU1o")' }}>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-wood-dark/90 to-background-dark/95 z-0"></div>
                                <div className="absolute top-8 left-8 text-primary/10 text-8xl select-none font-serif rotate-12 transition-transform duration-1000 group-hover:rotate-0">♖</div>
                                <div className="absolute bottom-16 right-8 text-primary/10 text-8xl select-none font-serif -rotate-12 transition-transform duration-1000 group-hover:rotate-0">♘</div>
                                <div className="absolute bottom-2 left-0 right-0 flex justify-between px-8 text-4xl text-wood-light/10 select-none pointer-events-none">
                                    <span>♟</span><span>♟</span><span>♟</span><span>♟</span><span>♟</span><span>♟</span><span>♟</span><span>♟</span>
                                </div>
                                <div className="flex flex-col gap-6 text-center z-10 max-w-3xl relative">
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-primary/20 text-6xl">♔</div>
                                    <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mx-auto">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                        <span className="text-primary text-xs font-bold uppercase tracking-widest font-display">Your Move</span>
                                    </div>
                                    <h1 className="text-board-light text-4xl font-display font-black leading-tight tracking-tight @[480px]:text-6xl text-shadow-lg">
                                        Checkmate Misinformation.<br />
                                        <span className="text-primary relative inline-block">
                                            Secure Your Position.
                                            <span className="absolute -bottom-2 right-0 text-2xl text-primary/40 rotate-12">♟</span>
                                        </span>
                                    </h1>
                                    <h2 className="text-board-light/80 text-sm font-body font-normal leading-relaxed @[480px]:text-lg max-w-2xl mx-auto">
                                        The grandmaster of fact-checking. AI-powered analysis for tech news that anticipates market moves before they happen.
                                    </h2>
                                </div>
                                <label className="flex flex-col min-w-40 h-16 w-full max-w-[620px] z-10 mt-6 group/input relative">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-wood-light rounded-lg blur opacity-25 group-hover/input:opacity-50 transition duration-1000 group-hover/input:duration-200"></div>
                                    <div className="relative flex w-full flex-1 items-stretch rounded-lg h-full bg-surface-dark border border-primary/30 shadow-xl">
                                        <div className="text-primary/70 flex items-center justify-center pl-5 rounded-l-lg border-r border-primary/20 bg-wood-dark/50 w-16">
                                            <span className="text-3xl relative top-0.5">♝</span>
                                        </div>
                                        <input
                                            type="url"
                                            placeholder="Paste article URL here..."
                                            className="w-full bg-transparent text-text-main-light dark:text-board-light px-5 font-body text-lg focus:outline-none placeholder:text-text-muted-light dark:placeholder:text-wood-light/40"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleAnalyze();
                                            }}
                                        />
                                    </div>
                                </label>
                                <div className="flex gap-6 items-center text-xs text-primary/60 z-10 mt-2 font-display uppercase tracking-wider">
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">verified_user</span> Verified Opening</span>
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">bolt</span> Real-time Tactics</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
