"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { api, IngestResponse } from "@/lib/api";
import AnalysisDashboard from "@/components/AnalysisDashboard";
import AnalysisLoading from "@/components/AnalysisLoading";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function AnalysisContent() {
    const searchParams = useSearchParams();
    const url = searchParams.get("url");

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<IngestResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!url) {
            setIsLoading(false); // No URL to analyze
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await api.ingestNews(url);
                setData(response);
            } catch (err) {
                console.error("Analysis failed:", err);
                setError("Failed to analyze article. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return (
        <section className="relative z-10 py-12 px-4 md:px-10 lg:px-40">
            {isLoading ? (
                <AnalysisLoading onComplete={() => { }} />
            ) : error ? (
                <div className="text-center text-red-500 py-20 text-xl font-display">{error}</div>
            ) : data ? (
                <AnalysisDashboard data={data} />
            ) : (
                <div className="text-center text-wood-medium py-20 text-xl font-display">No analysis data found. Go back home to start.</div>
            )}
        </section>
    );
}

export default function AnalysisPage() {
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

            <main className="flex-1 relative">
                <div className="absolute inset-0 top-0 h-[800px] z-0 opacity-10 pointer-events-none chess-square-bg"></div>
                <Suspense fallback={<AnalysisLoading onComplete={() => { }} />}>
                    <AnalysisContent />
                </Suspense>
            </main>

            <Footer />
        </div>
    );
}
