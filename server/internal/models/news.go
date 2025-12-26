package models

import "time"

type Article struct {
	ID          string          `firestore:"id" json:"id"`
	Title       string          `firestore:"title" json:"title"`
	URL         string          `firestore:"url" json:"url"`
	Content     string          `firestore:"content" json:"content"` // Raw content
	Summary     string          `firestore:"summary" json:"summary"`
	Source      string          `firestore:"source" json:"source"`
	PublishedAt time.Time       `firestore:"published_at" json:"published_at"`
	Claims      []Claim         `firestore:"claims" json:"claims"`
	Impact      *ImpactAnalysis `firestore:"impact,omitempty" json:"impact,omitempty"`

	// New Analysis Fields
	AnalysisTime      string   `firestore:"analysis_time" json:"analysis_time"`
	StrategicAnalysis string   `firestore:"strategic_analysis" json:"strategic_analysis"`
	VerifiedSources   []string `firestore:"verified_sources" json:"verified_sources"`
	RelatedArticles   []string `firestore:"related_articles" json:"related_articles"`
	ConfidenceScore   float64  `firestore:"confidence_score" json:"confidence_score"`
	Verdict           *Verdict `firestore:"verdict,omitempty" json:"verdict,omitempty"`
}

type ImpactAnalysis struct {
	AffectedTickers []string `firestore:"affected_tickers" json:"affected_tickers"`
	SentimentScore  float64  `firestore:"sentiment_score" json:"sentiment_score"` // -1.0 to 1.0
	RiskLevel       string   `firestore:"risk_level" json:"risk_level"`           // "Low", "Medium", "High"
	MarketSector    string   `firestore:"market_sector" json:"market_sector"`
}
