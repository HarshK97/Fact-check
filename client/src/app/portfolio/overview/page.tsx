"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioLoading from "@/components/PortfolioLoading";
import { api, RebalanceResponse, BenchmarkResponse } from "@/lib/api";
import RebalanceResult from "@/components/RebalanceResult";
import BenchmarkResult from "@/components/BenchmarkResult";

export default function PortfolioOverviewPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [rebalanceData, setRebalanceData] = useState<RebalanceResponse | null>(null);
    const [benchmarkData, setBenchmarkData] = useState<BenchmarkResponse | null>(null);
    const [isRebalancing, setIsRebalancing] = useState(false);
    const [isBenchmarking, setIsBenchmarking] = useState(false);
    const [userId, setUserId] = useState("demo-user");

    useEffect(() => {
        const storedId = localStorage.getItem("portfolio_user_id");
        if (storedId) {
            setUserId(storedId);
        }

        const storedRebalance = localStorage.getItem("portfolio_rebalance_data");
        if (storedRebalance) {
            setRebalanceData(JSON.parse(storedRebalance));
        }

        const storedBenchmark = localStorage.getItem("portfolio_benchmark_data");
        if (storedBenchmark) {
            setBenchmarkData(JSON.parse(storedBenchmark));
        }
    }, []);

    const handleRebalance = async () => {
        setIsRebalancing(true);
        try {
            const data = await api.rebalancePortfolio(userId);
            setRebalanceData(data);
            localStorage.setItem("portfolio_rebalance_data", JSON.stringify(data));
        } catch (error) {
            console.error("Rebalance failed", error);
        } finally {
            setIsRebalancing(false);
        }
    };

    const handleBenchmark = async () => {
        setIsBenchmarking(true);
        try {
            const data = await api.benchmarkPortfolio(userId);
            setBenchmarkData(data);
            localStorage.setItem("portfolio_benchmark_data", JSON.stringify(data));
        } catch (error) {
            console.error("Benchmark failed", error);
        } finally {
            setIsBenchmarking(false);
        }
    };

    // Calculate AI Confidence from recommendations if available
    const aiConfidence = rebalanceData?.recommendations
        ? Math.round(rebalanceData.recommendations.reduce((acc, rec) => acc + rec.ai_confidence, 0) / rebalanceData.recommendations.length * 100)
        : 0;


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
                        <PortfolioLoading onComplete={() => setIsLoading(false)} />
                    </div>
                ) : (
                    <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">

                        {/* Header Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                            <div>
                                <h6 className="text-primary text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2 font-display">
                                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span> Live Strategy
                                </h6>
                                <h1 className="font-display text-3xl md:text-4xl text-wood-dark dark:text-board-light font-bold">Portfolio Overview</h1>
                                <p className="text-wood-medium dark:text-wood-light mt-2 max-w-2xl text-sm leading-relaxed">
                                    Your positions are currently following the <span className="text-primary italic font-serif">Sicilian Defense</span> structure against market volatility.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleBenchmark}
                                    disabled={isBenchmarking}
                                    className="flex items-center gap-2 px-4 py-2 border border-border-light dark:border-wood-medium/50 rounded text-wood-dark dark:text-board-light hover:bg-wood-light/10 text-sm font-medium transition-colors font-display disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-sm">{isBenchmarking ? "sync" : "bar_chart"}</span>
                                    {isBenchmarking ? "Benchmarking..." : "Benchmark"}
                                </button>
                                <button
                                    onClick={handleRebalance}
                                    disabled={isRebalancing}
                                    className="flex items-center gap-2 px-4 py-2 bg-wood-dark text-board-light border border-primary/20 rounded text-sm font-bold hover:bg-wood-medium transition-colors shadow-lg font-display disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-sm">{isRebalancing ? "sync" : "balance"}</span>
                                    {isRebalancing ? "Rebalancing..." : "Rebalance"}
                                </button>
                            </div>
                        </div>

                        {/* Summary Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {/* Total Equity */}
                            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg p-6 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4 text-primary">
                                    <span className="material-symbols-outlined text-[150px]">verified_user</span>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-wood-medium dark:text-wood-light text-xs font-bold uppercase tracking-widest mb-2 font-display">Total Equity</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-display text-3xl font-black text-wood-dark dark:text-board-light">$142,894.20</span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500 px-2 py-0.5 rounded text-xs font-bold border border-green-200 dark:border-green-800 flex items-center">
                                            <span className="material-symbols-outlined text-xs mr-1">trending_up</span> +12.4%
                                        </span>
                                        <span className="text-xs text-wood-light/80">All time return</span>
                                    </div>
                                </div>
                            </div>

                            {/* Day's P&L */}
                            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg p-6 relative overflow-hidden">
                                <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4 text-green-500">
                                    <span className="material-symbols-outlined text-[150px]">trending_up</span>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-wood-medium dark:text-wood-light text-xs font-bold uppercase tracking-widest mb-2 font-display">Day&apos;s P&L</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-display text-3xl font-black text-green-600 dark:text-green-500">+$1,240.50</span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <span className="text-xs text-wood-medium dark:text-wood-light">Market is Open</span>
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    </div>
                                </div>
                            </div>
                            {/* AI Confidence */}
                            <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg p-6 relative overflow-hidden hidden lg:block">
                                <div className="absolute right-0 top-0 opacity-5 dark:opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4 text-primary">
                                    <span className="material-symbols-outlined text-[150px]">bolt</span>
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-wood-medium dark:text-wood-light text-xs font-bold uppercase tracking-widest mb-2 font-display">AI Confidence</h3>
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-display text-3xl font-black text-primary">
                                            {aiConfidence > 0 ? `${aiConfidence}%` : "N/A"}
                                        </span>
                                    </div>
                                    <div className="mt-4 w-full bg-wood-medium/10 dark:bg-wood-light/10 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(197,160,101,0.5)] transition-all duration-1000 ease-out"
                                            style={{ width: `${aiConfidence}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-wood-light/80 mt-2 italic">
                                        {aiConfidence > 0 ? "Based on latest strategic analysis" : "Run rebalance to calculate"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Results Section */}
                        {(rebalanceData || benchmarkData) && (
                            <div className="mb-8 grid grid-cols-1 xl:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {rebalanceData && (
                                    <RebalanceResult data={rebalanceData} />
                                )}

                                {benchmarkData && (
                                    <BenchmarkResult data={benchmarkData} />
                                )}
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Performance & Table */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Performance Chart Placeholder */}
                                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display text-xl text-wood-dark dark:text-board-light flex items-center gap-2 font-bold">
                                            <span className="material-symbols-outlined text-primary text-lg">show_chart</span>
                                            Performance History
                                        </h3>
                                        <div className="flex gap-1 bg-wood-light/5 p-1 rounded">
                                            <button className="px-3 py-1 text-xs font-medium rounded text-wood-medium hover:text-wood-dark dark:text-wood-light dark:hover:text-board-light transition-colors">1W</button>
                                            <button className="px-3 py-1 text-xs font-medium rounded bg-surface-light dark:bg-wood-medium/30 text-wood-dark dark:text-board-light shadow-sm">1M</button>
                                            <button className="px-3 py-1 text-xs font-medium rounded text-wood-medium hover:text-wood-dark dark:text-wood-light dark:hover:text-board-light transition-colors">1Y</button>
                                            <button className="px-3 py-1 text-xs font-medium rounded text-wood-medium hover:text-wood-dark dark:text-wood-light dark:hover:text-board-light transition-colors">ALL</button>
                                        </div>
                                    </div>
                                    <div className="w-full h-64 relative bg-wood-pattern bg-opacity-5 rounded overflow-hidden">
                                        {/* Simple stylized SVG chart */}
                                        <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#C5A065" stopOpacity="0.2"></stop>
                                                    <stop offset="100%" stopColor="#C5A065" stopOpacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                            {/* Fake data path */}
                                            <path d="M0,200 C50,180 100,210 150,150 C200,90 250,120 300,100 C350,80 400,100 450,60 C500,20 550,40 600,30 L600,300 L0,300 Z" fill="url(#chartGradient)"></path>
                                            <path d="M0,200 C50,180 100,210 150,150 C200,90 250,120 300,100 C350,80 400,100 450,60 C500,20 550,40 600,30" fill="none" stroke="#C5A065" strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
                                        </svg>
                                        {/* Grid Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between text-xs text-wood-light/30 pointer-events-none">
                                            <div className="border-b border-wood-medium/10 w-full h-0"></div>
                                            <div className="border-b border-wood-medium/10 w-full h-0"></div>
                                            <div className="border-b border-wood-medium/10 w-full h-0"></div>
                                            <div className="border-b border-wood-medium/10 w-full h-0"></div>
                                            <div className="border-b border-wood-medium/10 w-full h-0"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Active Positions Table */}
                                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg overflow-hidden">
                                    <div className="p-6 border-b border-border-light dark:border-wood-medium/30 flex justify-between items-center bg-wood-light/5">
                                        <h3 className="font-display text-xl font-bold text-wood-dark dark:text-board-light">Active Positions</h3>
                                        <span className="text-xs text-wood-medium dark:text-wood-light uppercase tracking-wider font-bold">4 Openings</span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-wood-light/10 text-xs uppercase text-wood-medium dark:text-wood-light font-bold tracking-wider font-display">
                                                <tr>
                                                    <th className="px-6 py-4">Ticker</th>
                                                    <th className="px-6 py-4">Price</th>
                                                    <th className="px-6 py-4">Shares</th>
                                                    <th className="px-6 py-4">Total Value</th>
                                                    <th className="px-6 py-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-border-light dark:divide-wood-medium/30">
                                                {/* AAPL */}
                                                <tr className="hover:bg-wood-light/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-wood-dark text-board-light flex items-center justify-center font-bold text-xs border border-wood-medium">AAPL</div>
                                                            <div>
                                                                <p className="text-sm font-bold text-wood-dark dark:text-white">Apple Inc.</p>
                                                                <p className="text-xs text-wood-medium dark:text-wood-light/60">Tech • Hardware</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-wood-dark dark:text-board-light">$189.45</p>
                                                        <p className="text-xs text-green-600 dark:text-green-500">+1.2%</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-wood-medium dark:text-wood-light">150</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-wood-dark dark:text-white">$28,417.50</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-xs font-bold text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded uppercase tracking-wider">Hold</span>
                                                    </td>
                                                </tr>
                                                {/* NVDA */}
                                                <tr className="hover:bg-wood-light/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-wood-dark text-board-light flex items-center justify-center font-bold text-xs border border-wood-medium">NVDA</div>
                                                            <div>
                                                                <p className="text-sm font-bold text-wood-dark dark:text-white">NVIDIA</p>
                                                                <p className="text-xs text-wood-medium dark:text-wood-light/60">Tech • Semi</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-wood-dark dark:text-board-light">$945.20</p>
                                                        <p className="text-xs text-green-600 dark:text-green-500">+3.5%</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-wood-medium dark:text-wood-light">45</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-wood-dark dark:text-white">$42,534.00</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-xs font-bold text-green-600 dark:text-green-500 border border-green-500/30 bg-green-500/10 px-2 py-1 rounded uppercase tracking-wider">Buy</span>
                                                    </td>
                                                </tr>
                                                {/* MSFT */}
                                                <tr className="hover:bg-wood-light/5 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-wood-dark text-board-light flex items-center justify-center font-bold text-xs border border-wood-medium">MSFT</div>
                                                            <div>
                                                                <p className="text-sm font-bold text-wood-dark dark:text-white">Microsoft</p>
                                                                <p className="text-xs text-wood-medium dark:text-wood-light/60">Tech • Software</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="text-sm font-medium text-wood-dark dark:text-board-light">$415.10</p>
                                                        <p className="text-xs text-red-600 dark:text-red-500">-0.4%</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-wood-medium dark:text-wood-light">80</td>
                                                    <td className="px-6 py-4 text-sm font-bold text-wood-dark dark:text-white">$33,208.00</td>
                                                    <td className="px-6 py-4 text-right">
                                                        <span className="text-xs font-bold text-primary border border-primary/30 bg-primary/5 px-2 py-1 rounded uppercase tracking-wider">Hold</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Recommendations & Advisory */}
                            <div className="space-y-6">
                                {/* Tactical Recommendations */}
                                <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-wood-medium/50 rounded-lg p-6">
                                    <h3 className="font-display text-lg text-wood-dark dark:text-board-light mb-4 border-b border-wood-medium/20 pb-2 font-bold">Tactical Recommendations</h3>
                                    <div className="space-y-4">
                                        {/* Opportunity */}
                                        <div className="bg-wood-light/5 border border-wood-medium/20 p-4 rounded-md">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                                                    <span className="text-xs font-bold text-wood-medium dark:text-wood-light uppercase tracking-wider">Opportunity</span>
                                                </div>
                                                <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-green-200 dark:border-green-800">Strong Buy</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-wood-dark dark:text-board-light mb-1 font-display">AMD gaining momentum</h4>
                                            <p className="text-xs text-wood-medium dark:text-wood-light/80 leading-relaxed mb-3">Latest benchmarks suggest MI300X chip is outperforming expectations. Consider opening a position.</p>
                                            <button className="w-full text-xs bg-wood-light/20 hover:bg-wood-light/30 text-wood-dark dark:text-board-light py-1.5 rounded transition-colors font-bold uppercase tracking-wide">Analyze Ticker</button>
                                        </div>
                                        {/* Threat */}
                                        <div className="bg-wood-light/5 border border-wood-medium/20 p-4 rounded-md">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="material-symbols-outlined text-red-600 dark:text-red-500 text-sm">warning</span>
                                                    <span className="text-xs font-bold text-wood-medium dark:text-wood-light uppercase tracking-wider">Threat</span>
                                                </div>
                                                <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 text-[10px] px-2 py-0.5 rounded font-bold uppercase border border-red-200 dark:border-red-900/50">Sell Watch</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-wood-dark dark:text-board-light mb-1 font-display">TSLA Volatility Spike</h4>
                                            <p className="text-xs text-wood-medium dark:text-wood-light/80 leading-relaxed">Inventory data contradicts quarterly guidance. High probability of correction.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Grandmaster Advisory */}
                                <div className="bg-wood-dark border border-wood-medium rounded-lg p-6 relative overflow-hidden text-center text-board-light group">
                                    <div className="absolute inset-0 bg-wood-pattern opacity-10 pointer-events-none mix-blend-overlay"></div>
                                    <div className="relative z-10">
                                        <span className="material-symbols-outlined text-4xl text-primary mb-2">school</span>
                                        <h3 className="font-display text-xl font-bold mb-2 text-primary">Grandmaster Advisory</h3>
                                        <p className="text-xs text-wood-light mb-4 leading-relaxed">Do not react to the current news cycle regarding Quantum computing. The detected hype is a short-term trap.</p>
                                        <button className="bg-primary text-wood-dark font-bold text-xs uppercase px-6 py-2 rounded shadow-lg hover:bg-primary-hover transition-colors w-full tracking-wider">Sync Portfolio</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
