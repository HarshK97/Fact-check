package main

import (
	"context"
	"fmt"
	"log"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/config"
	"techfact-trader/internal/models"
)

func main() {
	cfg := config.LoadConfig()

	// Create Agent Manager
	am, err := agents.NewAgentManager(cfg)
	if err != nil {
		log.Fatalf("Failed to create agent manager: %v", err)
	}

	ctx := context.Background()
	article := &models.Article{
		Title:   "TechGiant releases new AI chip, stocks soar",
		URL:     "https://example.com/techgiant-ai",
		Summary: "TechGiant has announced a revolutionary AI chip that claims to be 10x faster than competitors. Analysts predict a massive market shift.",
	}

	fmt.Println("=== 1. Analyze Article ===")
	analysis, err := am.AnalyzeArticle(ctx, article)
	if err != nil {
		log.Fatalf("Analysis failed: %v", err)
	}
	fmt.Printf("Strategic Analysis: %s\n", analysis.StrategicAnalysis)
	fmt.Printf("Visual Sources: %v\n", analysis.VerifiedSources)

	fmt.Println("\n=== 2. Verify Claim ===")
	verdict, err := am.VerifyClaim(ctx, article.Title)
	if err != nil {
		log.Fatalf("Verification failed: %v", err)
	}
	fmt.Printf("Verdict: %t (Confidence: %.2f)\nReasoning: %s\n", verdict.IsTrue, verdict.ConfidenceScore, verdict.Reasoning)

	fmt.Println("\n=== 3. Portfolio Insights ===")
	portfolio := &models.Portfolio{
		ID: "test-user",
		Holdings: []models.Holding{
			{Ticker: "AAPL", Quantity: 10, CostBasis: 150},
			{Ticker: "NVDA", Quantity: 5, CostBasis: 400},
			{Ticker: "GOOGL", Quantity: 20, CostBasis: 100},
		},
	}
	insight, err := am.GenerateInsights(ctx, portfolio, verdict, article)
	if err != nil {
		log.Fatalf("Insights failed: %v", err)
	}
	fmt.Printf("Impact: %s\nActionable: %t\nRelevant: %v\n", insight.ImpactAnalysis, insight.Actionable, insight.RelevantHoldings)

	fmt.Println("\n=== 4. Tactical Recommendations ===")
	recs, err := am.GenerateTacticalRecommendations(ctx, portfolio, insight)
	if err != nil {
		log.Fatalf("Tactics failed: %v", err)
	}
	for _, r := range recs {
		fmt.Printf("- %s %s: %.2f (Conf: %.2f) -> %s\n", r.Action, r.Ticker, r.Quantity, r.AIConfidence, r.Reasoning)
	}

	fmt.Println("\n=== Verification Complete ===")
}
