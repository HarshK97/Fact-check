"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComparisonLoading from "@/components/ComparisonLoading";

export default function PortfolioComparisonPage() {
    const [isLoading, setIsLoading] = useState(true);

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

                {isLoading ? (
                    <div className="relative z-10 px-4 py-12 flex justify-center">
                        <ComparisonLoading onComplete={() => setIsLoading(false)} />
                    </div>
                ) : (
                    <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-border-light dark:border-wood-medium/50 pb-6">
                            <div>
                                <h1 className="font-display text-3xl md:text-4xl text-wood-dark dark:text-board-light font-bold">Portfolio Comparison</h1>
                                <p className="text-wood-medium dark:text-wood-light mt-2 max-w-2xl text-lg opacity-80">
                                    Analyze your strategic position against a rival portfolio.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                                <span className="material-symbols-outlined text-[20px]">chess</span>
                                <span className="text-sm uppercase tracking-wider">Grandmaster Mode: Active</span>
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            <h3 className="font-display text-xl font-bold text-wood-dark dark:text-board-light mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                                Upload Your Portfolio
                            </h3>
                            <div className="flex flex-col items-center gap-6 rounded-xl border-2 border-dashed border-wood-medium/30 bg-surface-light dark:bg-surface-dark/50 px-6 py-12 hover:border-primary/50 hover:bg-surface-light/80 dark:hover:bg-surface-dark transition-all group cursor-pointer w-full">
                                <div className="size-16 rounded-full bg-wood-light/10 flex items-center justify-center text-wood-medium dark:text-wood-light group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                                    <span className="material-symbols-outlined text-[32px]">upload_file</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <p className="text-wood-dark dark:text-board-light text-xl font-bold">Upload Portfolio Ledger</p>
                                    <p className="text-wood-medium dark:text-wood-light text-base max-w-[480px]">Drag & drop your CSV file here (Max 10MB) to establish your baseline position.</p>
                                </div>
                                <button className="flex items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-primary-hover transition-colors text-wood-dark text-base font-bold tracking-[0.015em] shadow-lg shadow-primary/10 font-display">
                                    Load My Portfolio
                                </button>
                            </div>
                        </div>

                        {/* Analysis Results */}
                        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            <div className="flex items-center justify-between">
                                <h3 className="font-display text-2xl font-bold text-wood-dark dark:text-board-light px-1">Analysis Results</h3>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 rounded bg-wood-light/10 text-xs text-wood-medium dark:text-wood-light uppercase font-bold tracking-wider border border-wood-medium/20">Live Comparison</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Your Position (Gold) */}
                                <div className="rounded-xl bg-surface-light dark:bg-surface-dark border-t-4 border-primary p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 dark:bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>
                                    <div className="flex justify-between items-start z-10">
                                        <div>
                                            <h4 className="text-primary font-bold text-lg uppercase tracking-wider font-display">Your Position</h4>
                                            <span className="text-wood-medium dark:text-wood-light text-xs uppercase tracking-widest font-bold opacity-70">White Pieces</span>
                                        </div>
                                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Balanced</span>
                                    </div>
                                    <div className="flex flex-col gap-1 z-10">
                                        <span className="text-wood-medium dark:text-wood-light text-sm font-medium">Total Equity</span>
                                        <span className="text-wood-dark dark:text-white text-3xl font-display font-bold tracking-tight">$142,500.25</span>
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-500 text-sm font-bold mt-1">
                                            <span className="material-symbols-outlined text-[16px]">trending_up</span>
                                            <span>+2.4% this week</span>
                                        </div>
                                    </div>

                                    {/* Allocation Chart */}
                                    <div className="flex items-center gap-4 py-4 border-y border-wood-medium/10 dark:border-wood-medium/30">
                                        <div className="size-20 rounded-full shrink-0 relative flex items-center justify-center bg-wood-light/20" style={{ background: "conic-gradient(#C5A065 0% 40%, #5D4037 40% 70%, #261A15 70% 100%)" }}>
                                            <div className="absolute inset-2 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center">
                                                <span className="text-[10px] text-wood-medium dark:text-wood-light font-bold uppercase tracking-wider">Alloc</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full text-sm">
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-primary rounded-full"></span>Tech</span> <span className="text-wood-dark dark:text-white font-bold">40%</span></div>
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-wood-medium rounded-full"></span>Energy</span> <span className="text-wood-dark dark:text-white font-bold">30%</span></div>
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-wood-dark rounded-full"></span>Cash</span> <span className="text-wood-dark dark:text-white font-bold">30%</span></div>
                                        </div>
                                    </div>

                                    {/* Top Holdings */}
                                    <div className="flex flex-col gap-3">
                                        <span className="text-xs font-bold text-wood-medium dark:text-wood-light uppercase tracking-wider">Top Holdings</span>
                                        <div className="flex justify-between items-center text-sm border-b border-wood-medium/5 pb-2">
                                            <span className="text-wood-dark dark:text-white font-bold">NVDA</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">240 Shares</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-wood-medium/5 pb-2">
                                            <span className="text-wood-dark dark:text-white font-bold">GOOGL</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">115 Shares</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-wood-dark dark:text-white font-bold">TSLA</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">80 Shares</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Rival Position (Bronze) */}
                                <div className="rounded-xl bg-surface-light dark:bg-surface-dark border-t-4 border-[#CD7F32] p-6 flex flex-col gap-6 shadow-xl relative overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#CD7F32]/10 rounded-full blur-2xl pointer-events-none"></div>
                                    <div className="flex justify-between items-start z-10">
                                        <div>
                                            <h4 className="text-[#CD7F32] font-bold text-lg uppercase tracking-wider font-display">Rival Position</h4>
                                            <span className="text-wood-medium dark:text-wood-light text-xs uppercase tracking-widest font-bold opacity-70">Black Pieces</span>
                                        </div>
                                        <span className="bg-[#CD7F32]/20 text-[#CD7F32] px-3 py-1 rounded-full text-xs font-bold border border-[#CD7F32]/20">Aggressive</span>
                                    </div>
                                    <div className="flex flex-col gap-1 z-10">
                                        <span className="text-wood-medium dark:text-wood-light text-sm font-medium">Total Equity</span>
                                        <span className="text-wood-dark dark:text-white text-3xl font-display font-bold tracking-tight">$1,205,800.00</span>
                                        <div className="flex items-center gap-1 text-red-600 dark:text-red-500 text-sm font-bold mt-1">
                                            <span className="material-symbols-outlined text-[16px]">trending_down</span>
                                            <span>-1.8% this week</span>
                                        </div>
                                    </div>

                                    {/* Allocation Chart */}
                                    <div className="flex items-center gap-4 py-4 border-y border-wood-medium/10 dark:border-wood-medium/30">
                                        <div className="size-20 rounded-full shrink-0 relative flex items-center justify-center bg-wood-light/20" style={{ background: "conic-gradient(#CD7F32 0% 65%, #8C5E35 65% 90%, #261A15 90% 100%)" }}>
                                            <div className="absolute inset-2 bg-surface-light dark:bg-surface-dark rounded-full flex items-center justify-center">
                                                <span className="text-[10px] text-wood-medium dark:text-wood-light font-bold uppercase tracking-wider">Alloc</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 w-full text-sm">
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-[#CD7F32] rounded-full"></span>Crypto</span> <span className="text-wood-dark dark:text-white font-bold">65%</span></div>
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-[#8C5E35] rounded-full"></span>Tech</span> <span className="text-wood-dark dark:text-white font-bold">25%</span></div>
                                            <div className="flex justify-between items-center"><span className="flex items-center gap-2 text-wood-dark dark:text-board-light font-medium"><span className="size-2 bg-[#261A15] rounded-full"></span>Cash</span> <span className="text-wood-dark dark:text-white font-bold">10%</span></div>
                                        </div>
                                    </div>

                                    {/* Top Holdings */}
                                    <div className="flex flex-col gap-3">
                                        <span className="text-xs font-bold text-wood-medium dark:text-wood-light uppercase tracking-wider">Top Holdings</span>
                                        <div className="flex justify-between items-center text-sm border-b border-wood-medium/5 pb-2">
                                            <span className="text-wood-dark dark:text-white font-bold">BTC-USD</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">12.5 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-wood-medium/5 pb-2">
                                            <span className="text-wood-dark dark:text-white font-bold">ETH-USD</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">45.0 Units</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-wood-dark dark:text-white font-bold">MSTR</span>
                                            <span className="text-wood-medium dark:text-wood-light font-medium">500 Shares</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Strategic Comparison */}
                                <div className="rounded-xl bg-surface-light dark:bg-surface-dark border border-wood-medium/20 p-6 flex flex-col gap-6 shadow-xl lg:col-span-1 md:col-span-2 ring-1 ring-black/5 dark:ring-white/5">
                                    <div className="flex items-center gap-2 border-b border-wood-medium/10 dark:border-wood-medium/30 pb-4">
                                        <span className="material-symbols-outlined text-wood-medium dark:text-board-light text-[24px]">balance</span>
                                        <h4 className="text-wood-dark dark:text-board-light font-bold text-lg uppercase tracking-wider font-display">Strategic Comparison</h4>
                                    </div>

                                    <div className="flex flex-col gap-5">
                                        {/* Risk Exposure */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                                                <span className="text-wood-medium dark:text-wood-light">Risk Exposure</span>
                                                <span className="text-[#CD7F32]">Rival High</span>
                                            </div>
                                            <div className="h-2 w-full bg-wood-light/10 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-primary" style={{ width: "30%" }}></div>
                                                <div className="h-full bg-transparent flex-1"></div>
                                                <div className="h-full bg-[#CD7F32]" style={{ width: "60%" }}></div>
                                            </div>
                                            <div className="flex justify-between text-[10px] text-wood-medium/70 dark:text-wood-light/70 font-medium">
                                                <span>You (Low)</span>
                                                <span>Rival (Very High)</span>
                                            </div>
                                        </div>

                                        {/* Sector Overlap */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                                                <span className="text-wood-medium dark:text-wood-light">Sector Overlap</span>
                                                <span className="text-wood-dark dark:text-white">Low Correlation</span>
                                            </div>
                                            <div className="h-2 w-full bg-wood-light/10 rounded-full overflow-hidden relative">
                                                <div className="absolute left-[30%] w-2 h-full bg-primary rounded-full z-10"></div>
                                                <div className="absolute left-[35%] w-2 h-full bg-[#CD7F32] rounded-full z-0 opacity-80"></div>
                                            </div>
                                            <div className="text-[10px] text-wood-medium/70 dark:text-wood-light/70 text-center mt-1 font-medium">Only 5% portfolio overlap detected</div>
                                        </div>
                                    </div>

                                    {/* Grandmaster Insight */}
                                    <div className="mt-auto bg-wood-light/5 dark:bg-background-dark/50 rounded-lg p-5 border-l-2 border-primary relative">
                                        <span className="absolute top-4 right-4 text-primary/20 material-symbols-outlined text-[32px]">psychology</span>
                                        <h5 className="text-primary font-bold text-sm mb-2 font-display">Grandmaster Insight</h5>
                                        <p className="text-sm text-wood-medium dark:text-wood-light/90 leading-relaxed">
                                            The Rival opening is highly speculative, favoring volatility over structure. Your position maintains a solid defensive line with diversification in energy and stable tech.
                                            <br /><br />
                                            <span className="italic opacity-80 decoration-slice">Recommendation: Maintain your disciplined pawn structure; the rival&apos;s exposure to crypto suggests a high probability of a forced retreat if market volatility spikes.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full text-center py-6 border-t border-border-light dark:border-wood-medium/10 mt-10">
                            <p className="text-xs text-wood-medium dark:text-wood-light/40 opacity-60">
                                Fact-Chek analysis is for informational purposes only and does not constitute financial advice. Past performance is not indicative of future results.
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
