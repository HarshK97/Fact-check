export interface Article {
    id: string;
    title: string;
    url: string;
    content: string;
    summary: string;
    source: string;
    published_at: string;
    analysis_time: string;
    strategic_analysis: string;
    verified_sources: string[];
    related_articles: string[];
    verdict: {
        is_true: boolean;
        confidence_score: number;
        reasoning: string;
        sources: string[];
    };
    confidence_score: number;
}

export interface TacticalRecommendation {
    action: 'BUY' | 'SELL' | 'HOLD';
    ticker: string;
    quantity: number;
    reasoning: string;
    ai_confidence: number;
}

export interface IngestResponse {
    article: Article;
    insights: {
        impact_analysis: string;
        actionable: boolean;
        relevant_holdings: string[];
    };
    recommendations: TacticalRecommendation[];
}

export interface Portfolio {
    id: string;
    holdings: Array<{
        ticker: string;
        quantity: number;
        purchase_price: number;
    }>;
}

export interface RebalanceResponse {
    recommendations: TacticalRecommendation[];
}

export interface BenchmarkResponse {
    comparison: {
        ticker: string;
        user_weight: number;
        benchmark_weight: number;
        difference: number;
    };
    insight: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'https://fact-check-production-a25a.up.railway.app' 
        : 'http://localhost:8081');

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${BASE_URL}${url}`, options);
    if (!response.ok) {
        let errorMessage = response.statusText;
        try {
            const errorBody = await response.json();
            if (errorBody.error) {
                errorMessage = errorBody.error;
            } else if (errorBody.message) {
                errorMessage = errorBody.message;
            }
        } catch (e) {
            // Parsing failed, use statusText
        }
        throw new Error(errorMessage);

    }
    return response.json();
}

export const api = {
    ingestNews: (url: string): Promise<IngestResponse> => {
        return fetchJson<IngestResponse>('/news/ingest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });
    },

    uploadPortfolio: (file: File, userId?: string): Promise<Portfolio> => {
        const formData = new FormData();
        formData.append('file', file);

        const headers: HeadersInit = {};
        if (userId) {
            headers['X-User-ID'] = userId;
        }

        return fetchJson<Portfolio>('/portfolio/upload', {
            method: 'POST',
            headers: headers,
            body: formData,
        });
    },

    rebalancePortfolio: (userId: string): Promise<RebalanceResponse> => {
        return fetchJson<RebalanceResponse>(`/portfolio/${userId}/rebalance`);
    },

    benchmarkPortfolio: (userId: string): Promise<BenchmarkResponse> => {
        return fetchJson<BenchmarkResponse>(`/portfolio/${userId}/benchmark`);
    },
};
