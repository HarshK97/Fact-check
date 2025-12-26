package agents

import (
	"context"
	"fmt"
	"strings"

	"techfact-trader/internal/models"

	"google.golang.org/adk/agent/llmagent"
)

func (m *AgentManager) GenerateInsights(ctx context.Context, portfolio *models.Portfolio, verdict *models.Verdict, article *models.Article) (*models.PortfolioInsight, error) {
	holdingsStr := ""
	for _, h := range portfolio.Holdings {
		holdingsStr += fmt.Sprintf("- %s: %.2f shares\n", h.Ticker, h.Quantity)
	}

	prompt := fmt.Sprintf("Article: %s\nSummary: %s\nVerdict (Truth): %t (Confidence: %.2f)\n\nPortfolio:\n%s\n\nProvide insights on how this news affects the portfolio.",
		article.Title, article.Summary, verdict.IsTrue, verdict.ConfidenceScore, holdingsStr)

	cfg := llmagent.Config{
		Name:        "PortfolioInsightsAgent",
		Description: "Portfolio context analyzer",
		Instruction: `You are a portfolio manager.
		Analyze the news in the context of the user's portfolio.
		Output JSON with keys: "impact_analysis" (string), "actionable" (bool), "relevant_holdings" (list of tickers).`,
	}

	responseText, err := m.RunAgentWithConfig(ctx, cfg, prompt)
	if err != nil {
		return nil, err
	}

	var insight models.PortfolioInsight
	if err := m.CleanAndParseJSON(responseText, &insight); err != nil {
		return &models.PortfolioInsight{
			ImpactAnalysis: responseText,
			Actionable:     false,
		}, nil
	}

	// Uppercase tickers just in case
	for i, t := range insight.RelevantHoldings {
		insight.RelevantHoldings[i] = strings.ToUpper(t)
	}

	return &insight, nil
}
