"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RivalAnalysis() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [url, setUrl] = useState("");

    const router = useRouter();

    const handleScout = () => {
        if (!url) return;

        setIsLoading(true);
        setLoadingText("Connecting to endpoint...");

        setTimeout(() => {
            router.push("/portfolio/comparison");
        }, 800);
    };

    return (
        <div className="group relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-wood-medium/50 p-8 shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="font-display text-2xl font-bold text-text-main-light dark:text-board-light mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">link</span>
                        Rival Analysis
                    </h2>
                    <p className="text-sm text-text-muted-light dark:text-wood-light">
                        Benchmark a public portfolio URL against our verification engine.
                    </p>
                </div>
            </div>

            <div className="space-y-4 relative">
                {isLoading && (
                    <div className="absolute inset-0 bg-surface-dark/90 flex flex-col items-center justify-center z-10 rounded-lg animate-in fade-in duration-300">
                        <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-2">radar</span>
                        <p className="text-primary text-sm font-display tracking-wide animate-pulse">{loadingText}</p>
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-text-muted-light dark:text-wood-light/60 uppercase tracking-wider mb-2" htmlFor="portfolio-url">Public Portfolio URL</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-wood-medium text-lg">public</span>
                        </div>
                        <input
                            className="block w-full pl-10 pr-3 py-3 border border-border-light dark:border-wood-medium/50 rounded bg-background-light dark:bg-background-dark/50 text-text-main-light dark:text-board-light placeholder-wood-light/50 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-colors"
                            id="portfolio-url"
                            placeholder="https://etoro.com/people/..."
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                </div>

                <div className="p-4 bg-background-light dark:bg-background-dark/30 rounded border border-border-light dark:border-wood-medium/30 flex items-start">
                    <span className="material-symbols-outlined text-primary text-sm mt-0.5 mr-2">lightbulb</span>
                    <p className="text-xs text-text-muted-light dark:text-wood-light italic">
                        Tip: Use this to detect &quot;Blunders&quot; in trending public tech portfolios before you copy them.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleScout}
                    disabled={isLoading || !url}
                    className="w-full sm:w-auto font-display font-bold text-text-main-light dark:text-board-light border border-border-light dark:border-wood-medium hover:border-primary hover:text-primary px-6 py-3 rounded shadow-sm transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-wood-medium disabled:hover:text-board-light"
                >
                    Scout Opponent
                </button>
            </div>
        </div>
    );
}
