"use client";

import { useEffect, useState } from "react";

export default function PortfolioLoading({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    const steps = [
        "Verifying ledger integrity",
        "Analyzing risk exposure",
        "Calculating Grandmaster evaluation"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => {
                if (prev >= steps.length - 1) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Pause before finish
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        return () => clearInterval(interval);
    }, [onComplete, steps.length]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[500px] gap-8 animate-in fade-in duration-500">
            <div className="relative">
                {/* Rook Animation */}
                <div className="text-6xl text-primary animate-bounce font-serif relative z-10">♜</div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-wood-dark/30 blur-sm rounded-[100%] animate-pulse"></div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <h3 className="text-2xl font-display font-bold text-board-light">Synchronizing Portfolio...</h3>

                <div className="flex flex-col gap-2 min-w-[300px]">
                    {steps.map((label, index) => (
                        <div key={index} className={`flex items-center gap-3 transition-opacity duration-500 ${index <= step ? 'opacity-100' : 'opacity-30'}`}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${index < step ? 'bg-primary border-primary' : index === step ? 'border-primary animate-pulse' : 'border-wood-medium'}`}>
                                {index < step && <span className="material-symbols-outlined text-xs text-wood-dark font-bold">check</span>}
                            </div>
                            <span className={`text-sm ${index <= step ? 'text-primary' : 'text-wood-light'}`}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
