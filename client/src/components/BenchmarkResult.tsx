import { BenchmarkResponse } from "@/lib/api";

interface BenchmarkResultProps {
    data: BenchmarkResponse;
}

export default function BenchmarkResult({ data }: BenchmarkResultProps) {
    return (
        <div className="bg-surface-light dark:bg-surface-dark border border-wood-medium/50 rounded-lg p-6 relative overflow-hidden h-full">
            <h3 className="font-display text-lg text-wood-dark dark:text-board-light mb-4 font-bold flex items-center gap-2">
                <span className="material-symbols-outlined">bar_chart</span>
                Benchmark Analysis
            </h3>
            <p className="text-sm text-wood-medium dark:text-wood-light mb-4 italic">
                &quot;{data.insight}&quot;
            </p>
            <div className="bg-wood-light/5 border border-wood-medium/20 p-4 rounded">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-wood-dark dark:text-board-light">{data.comparison.ticker}</span>
                    <span className={`text-xs font-bold ${data.comparison.difference >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {data.comparison.difference > 0 ? '+' : ''}{(data.comparison.difference * 100).toFixed(1)}% vs Benchmark
                    </span>
                </div>
                <div className="w-full h-2 bg-wood-medium/10 rounded-full overflow-hidden flex">
                    <div
                        className="h-full bg-primary"
                        style={{ width: `${data.comparison.user_weight * 100}%` }}
                        title={`User: ${(data.comparison.user_weight * 100).toFixed(1)}%`}
                    ></div>
                    <div
                        className="h-full bg-wood-medium/50"
                        style={{ width: `${data.comparison.benchmark_weight * 100}%` }}
                        title={`Benchmark: ${(data.comparison.benchmark_weight * 100).toFixed(1)}%`}
                    ></div>
                </div>
                <div className="flex justify-between text-[10px] text-wood-medium dark:text-wood-light mt-1">
                    <span>Your Weight: {(data.comparison.user_weight * 100).toFixed(1)}%</span>
                    <span>Benchmark: {(data.comparison.benchmark_weight * 100).toFixed(1)}%</span>
                </div>
            </div>
        </div>
    );
}
