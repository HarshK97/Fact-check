export default function StatsBoard() {
    return (
        <section className="border-y border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#5D4037_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-wood-medium/20 text-9xl z-0 pointer-events-none">♔</div>
            <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-10 relative z-10">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 shadow-lg border-4 border-wood-medium rounded-lg overflow-hidden">
                        <div className="flex flex-col gap-2 p-6 bg-board-light text-wood-dark relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-6 text-8xl text-wood-dark/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">♔</div>
                            <div className="flex justify-between items-center relative z-10">
                                <p className="text-wood-medium text-xs font-bold uppercase tracking-wider font-display">NVDA Position</p>
                                <span className="material-symbols-outlined text-green-700">trending_up</span>
                            </div>
                            <div className="flex items-baseline gap-2 relative z-10">
                                <p className="text-wood-dark text-3xl font-display font-black">+2.4%</p>
                            </div>
                            <p className="text-green-700 text-xs font-bold flex items-center gap-1 relative z-10">
                                <span className="material-symbols-outlined text-[14px]">arrow_drop_up</span> Advantage White
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 p-6 bg-board-dark text-background-light relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-6 text-8xl text-black/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">♕</div>
                            <div className="flex justify-between items-center relative z-10">
                                <p className="text-background-light/70 text-xs font-bold uppercase tracking-wider font-display">Accuracy</p>
                                <span className="material-symbols-outlined text-background-light">fact_check</span>
                            </div>
                            <div className="flex items-baseline gap-2 relative z-10">
                                <p className="text-white text-3xl font-display font-black">94.1%</p>
                            </div>
                            <p className="text-background-light/80 text-xs font-medium relative z-10">
                                High Confidence
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 p-6 bg-board-light text-wood-dark relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-6 text-8xl text-wood-dark/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">♖</div>
                            <div className="flex justify-between items-center relative z-10">
                                <p className="text-wood-medium text-xs font-bold uppercase tracking-wider font-display">Project-Stage Metrics</p>
                                <span className="text-wood-medium text-2xl font-serif">♜</span>
                            </div>
                            <div className="flex items-baseline gap-2 relative z-10">
                                <p className="text-wood-dark text-3xl font-display font-black">8h</p>
                            </div>
                            <p className="text-wood-medium text-xs font-medium relative z-10">
                                Sprint Duration
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 p-6 bg-board-dark text-background-light relative overflow-hidden group">
                            <div className="absolute -right-4 -bottom-6 text-8xl text-black/10 rotate-12 group-hover:rotate-0 transition-transform duration-500">♘</div>
                            <div className="flex justify-between items-center relative z-10">
                                <p className="text-background-light/70 text-xs font-bold uppercase tracking-wider font-display">Built For Hackathon!</p>
                                <span className="text-background-light text-2xl font-serif">♞</span>
                            </div>
                            <div className="flex items-baseline gap-2 relative z-10">
                                <p className="text-white text-3xl font-display font-black">MVP</p>
                            </div>
                            <p className="text-background-light/80 text-xs font-medium relative z-10">
                                Live Demo Ready
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
