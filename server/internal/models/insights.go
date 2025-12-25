package models

type PortfolioInsight struct {
	ImpactAnalysis   string   `json:"impact_analysis"` // Analysis of the news in context of the portfolio
	Actionable       bool     `json:"actionable"`
	RelevantHoldings []string `json:"relevant_holdings"`
}

type TacticalRecommendation struct {
	Action       string  `json:"action"` // "BUY", "SELL", "HOLD"
	Ticker       string  `json:"ticker"`
	Quantity     float64 `json:"quantity"`
	Reasoning    string  `json:"reasoning"`
	AIConfidence float64 `json:"ai_confidence"`
}
