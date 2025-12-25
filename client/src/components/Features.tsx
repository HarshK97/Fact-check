export default function Features() {
    return (
        <section className="py-20 px-4 md:px-10 lg:px-40 bg-background-light dark:bg-surface-dark relative" id="features">
            <div className="absolute inset-0 opacity-30 dark:opacity-10 pointer-events-none wood-texture"></div>
            <div className="flex flex-1 justify-center relative z-10">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    <div className="flex flex-col gap-12 px-4">
                        <div className="flex flex-col gap-4 text-center items-center">
                            <div className="text-primary text-4xl mb-2">
                                <span>♟</span>
                            </div>
                            <h2 className="text-wood-dark dark:text-primary text-3xl md:text-4xl font-display font-bold leading-tight">
                                Tactical Advantages
                            </h2>
                            <p className="text-wood-light dark:text-text-secondary-dark text-lg font-normal leading-normal max-w-2xl mx-auto font-body">
                                Don&apos;t play blind. Our engine analyzes every move in the tech sector to protect your capital.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="flex flex-1 gap-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-background-dark p-8 flex-col hover:border-primary transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute -right-6 -top-6 text-[10rem] text-wood-light/5 opacity-0 group-hover:opacity-100 transition-opacity select-none rotate-12 font-serif">♘</div>
                                <div className="text-wood-dark dark:text-primary bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-wood-dark transition-colors border border-primary/30">
                                    <span className="text-3xl font-serif">♞</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold leading-tight">AI Fact-Checking</h3>
                                    <p className="text-wood-medium dark:text-text-secondary-dark text-sm font-body leading-relaxed">
                                        Like a grandmaster calculating variations, our NLP dissects claims against 50M+ verified data points to detect hallucinations.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-background-dark p-8 flex-col hover:border-primary transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute -right-6 -top-6 text-[10rem] text-wood-light/5 opacity-0 group-hover:opacity-100 transition-opacity select-none rotate-12 font-serif">♖</div>
                                <div className="text-wood-dark dark:text-primary bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-wood-dark transition-colors border border-primary/30">
                                    <span className="text-3xl font-serif">♜</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold leading-tight">Portfolio Defense</h3>
                                    <p className="text-wood-medium dark:text-text-secondary-dark text-sm font-body leading-relaxed">
                                        Connect your brokerage account. See exactly how news stories threaten your specific holdings and fortify your position.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-1 gap-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-background-dark p-8 flex-col hover:border-primary transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                                <div className="absolute -right-6 -top-6 text-[10rem] text-wood-light/5 opacity-0 group-hover:opacity-100 transition-opacity select-none rotate-12 font-serif">♕</div>
                                <div className="text-wood-dark dark:text-primary bg-primary/20 w-14 h-14 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-wood-dark transition-colors border border-primary/30">
                                    <span className="text-3xl font-serif">♛</span>
                                </div>
                                <div className="flex flex-col gap-3 relative z-10">
                                    <h3 className="text-wood-dark dark:text-board-light text-xl font-display font-bold leading-tight">Smart Alerts</h3>
                                    <p className="text-wood-medium dark:text-text-secondary-dark text-sm font-body leading-relaxed">
                                        Silence the noise. Get notified only when <span className="text-primary font-bold">verified</span> news has a projected volatility impact &gt;5%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
