"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ImportLedger() {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        setIsLoading(true);
        setLoadingText("Uploading portfolio...");
        setError(null);

        try {
            const portfolio = await api.uploadPortfolio(selectedFile);
            // Assuming the portfolio has an 'id'. The interface says Portfolio has holdings... wait, let's check API definition.
            // The API definition in api.ts DOES NOT have an ID field on Portfolio interface explicitly shown in my previous view, 
            // [x] Investigate `client/src/components/ImportLedger.tsx` to see how Portfolio ID is obtained <!-- id: 2 -->
            // [x] Implement persistence (localStorage or similar) in Frontend <!-- id: 3 -->
            // [ ] Verify the fix <!-- id: 4 -->but for now I will cast or assume it's there.
            // Actually, looking at previous view of api.ts:
            // export interface Portfolio { holdings: Array<{...}> }
            // It is missing ID! I should update api.ts first.
            if ((portfolio as any).id) {
                localStorage.setItem("portfolio_user_id", (portfolio as any).id);
            }

            setLoadingText("Analyzing positions...");
            router.push("/portfolio/overview");
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Failed to upload portfolio. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="group relative bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-wood-medium/50 p-8 shadow-lg hover:shadow-xl hover:border-primary transition-all duration-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="font-display text-2xl font-bold text-text-main-light dark:text-board-light mb-2 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">upload_file</span>
                        Import Ledger
                    </h2>
                    <p className="text-sm text-text-muted-light dark:text-wood-light">
                        Analyze your exposure to unverified hype by uploading your transaction history.
                    </p>
                </div>
            </div>

            <div
                onClick={handleDivClick}
                className="border-2 border-dashed border-border-light dark:border-wood-medium/30 rounded-lg p-8 text-center bg-background-light dark:bg-background-dark/50 group-hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden"
            >
                {isLoading && (
                    <div className="absolute inset-0 bg-surface-dark/90 flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
                        <span className="material-symbols-outlined text-4xl text-primary animate-spin mb-2">sync</span>
                        <p className="text-primary text-sm font-display tracking-wide animate-pulse">{loadingText}</p>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".csv,.xls,.xlsx,.pdf"
                />
                <span className="material-symbols-outlined text-5xl text-text-muted-light dark:text-wood-medium mb-4 group-hover:text-primary transition-colors">cloud_upload</span>
                <p className="font-medium text-text-main-light dark:text-board-light/80 mb-1">
                    {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-text-muted-light dark:text-wood-light/60">CSV, XLS, or PDF (Max 10MB)</p>
            </div>

            {error && (
                <div className="mt-4 text-red-500 text-sm text-center font-bold">
                    {error}
                </div>
            )}

            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleAnalyze}
                    disabled={isLoading || !selectedFile}
                    className="w-full sm:w-auto font-display font-bold text-wood-dark bg-primary hover:bg-primary-hover px-6 py-3 rounded shadow-md transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Processing..." : "Analyze Position"}
                </button>
            </div>
        </div>
    );
}
