export default function Process() {
    return (
        <section className="py-16 px-4 md:px-10 lg:px-40 bg-surface-light dark:bg-background-dark/50 border-t border-wood-light/20 relative overflow-hidden" id="process">
            <div className="absolute left-0 bottom-0 text-[20rem] opacity-[0.02] dark:opacity-[0.05] pointer-events-none select-none leading-none -mb-20 text-wood-dark dark:text-primary">♟</div>
            <div className="flex flex-1 justify-center relative z-10">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-col gap-12 px-4">
                        <div className="text-center md:text-left">
                            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block flex items-center gap-2">
                                <span className="text-base">♝</span> The Playbook
                            </span>
                            <h2 className="text-wood-dark dark:text-board-light text-3xl font-display font-bold">How It Works</h2>
                        </div>
                        <div className="relative">
                            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-wood-light/30 dark:bg-wood-dark"></div>
                            <div className="flex flex-col gap-10">
                                <div className="grid grid-cols-[40px_1fr] gap-x-6 relative group">
                                    <div className="flex flex-col items-center pt-1 z-10">
                                        <div className="text-wood-dark bg-board-light border-2 border-wood-dark w-10 h-10 flex items-center justify-center rounded-full shadow-md group-hover:bg-primary transition-colors">
                                            <span className="font-display font-bold text-sm">e4</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-primary text-xs font-bold uppercase tracking-wider">Opening</p>
                                            <span className="h-px w-8 bg-primary/30"></span>
                                        </div>
                                        <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold">News Ingestion</h3>
                                        <p className="text-wood-medium dark:text-text-secondary-dark text-base font-body leading-relaxed mt-2 max-w-2xl">
                                            You submit a URL or our crawlers detect breaking news from 10,000+ tech sources, setting the board.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-x-6 relative group">
                                    <div className="flex flex-col items-center pt-1 z-10">
                                        <div className="text-wood-dark bg-board-dark border-2 border-wood-dark w-10 h-10 flex items-center justify-center rounded-full shadow-md group-hover:bg-primary transition-colors text-white">
                                            <span className="font-display font-bold text-sm">Nf3</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-primary text-xs font-bold uppercase tracking-wider">Middlegame</p>
                                            <span className="h-px w-8 bg-primary/30"></span>
                                        </div>
                                        <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold">Verification</h3>
                                        <p className="text-wood-medium dark:text-text-secondary-dark text-base font-body leading-relaxed mt-2 max-w-2xl">
                                            Our proprietary LLM cross-references claims with financial filings (10-Ks) and market data to control the center.
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[40px_1fr] gap-x-6 relative group">
                                    <div className="flex flex-col items-center pt-1 z-10">
                                        <div className="text-wood-dark bg-primary border-2 border-primary-hover w-10 h-10 flex items-center justify-center rounded-full shadow-lg shadow-primary/20">
                                            <span className="text-lg">#</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-primary text-xs font-bold uppercase tracking-wider">Endgame</p>
                                            <span className="h-px w-8 bg-primary/30"></span>
                                        </div>
                                        <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold">Recommendation (Checkmate)</h3>
                                        <p className="text-wood-medium dark:text-text-secondary-dark text-base font-body leading-relaxed mt-2 max-w-2xl">
                                            Receive a confidence score and a clear &quot;Buy,&quot; &quot;Sell,&quot; or &quot;Hold&quot; rating based on the verified news impact.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
