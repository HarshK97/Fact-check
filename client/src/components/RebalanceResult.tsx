import { RebalanceResponse } from "@/lib/api";

interface RebalanceResultProps {
    data: RebalanceResponse;
}

export default function RebalanceResult({ data }: RebalanceResultProps) {
    return (
        <div className="bg-surface-light dark:bg-surface-dark border border-primary/30 rounded-lg p-6 relative overflow-hidden h-full">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <h3 className="font-display text-lg px-2 text-wood-dark dark:text-board-light mb-4 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">balance</span>
                Rebalance Recommendations
            </h3>
            <div className="space-y-3">
                {data.recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-wood-light/5 border border-wood-medium/20 p-3 rounded flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${rec.action === 'BUY' ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500' :
                                    rec.action === 'SELL' ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-500' :
                                        'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-500'
                                    }`}>
                                    {rec.action}
                                </span>
                                <span className="font-bold text-wood-dark dark:text-board-light">{rec.ticker}</span>
                            </div>
                            <p className="text-xs text-wood-medium dark:text-wood-light">{rec.reasoning}</p>
                        </div>
                        <div className="text-left sm:text-right w-full sm:w-auto shrink-0 flex flex-row sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 border-wood-medium/10 pt-2 sm:pt-0 mt-2 sm:mt-0">
                            <div className="text-sm font-bold text-wood-dark dark:text-board-light">{rec.quantity} shares</div>
                            <div className="text-[10px] text-wood-medium dark:text-wood-light/60">Conf: {(rec.ai_confidence * 100).toFixed(0)}%</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
