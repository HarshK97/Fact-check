package agents

import (
	"context"
	"fmt"

	"techfact-trader/internal/models"

	"google.golang.org/adk/agent/llmagent"
)

func (m *AgentManager) AnalyzeImpact(ctx context.Context, article *models.Article) (*models.ImpactAnalysis, error) {
	prompt := fmt.Sprintf("Analyze this article:\nTitle: %s\nContent: %s", article.Title, article.Summary)

	cfg := llmagent.Config{
		Name:        "FinancialImpactAgent",
		Description: "Financial analyst for tech sector",
		Instruction: `You are a financial analyst specializing in the tech sector.
		Analyze the provided news article and identify companies, sentiment, and risk.`,
	}

	responseText, err := m.RunAgentWithConfig(ctx, cfg, prompt)
	if err != nil {
		return nil, err
	}

	// Pseudo-parsing
	// In reality we would parse responseText which is likely JSON or structured text
	_ = responseText
	return &models.ImpactAnalysis{
		AffectedTickers: []string{"AAPL", "GOOGL"}, // Mocking extraction
		SentimentScore:  0.8,
		RiskLevel:       "Medium",
		MarketSector:    "Technology",
	}, nil
}
