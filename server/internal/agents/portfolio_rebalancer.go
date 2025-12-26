package agents

import (
	"context"
	"fmt"

	"techfact-trader/internal/models"

	"google.golang.org/adk/agent/llmagent"
)

func (m *AgentManager) GenerateTacticalRecommendations(ctx context.Context, portfolio *models.Portfolio, insight *models.PortfolioInsight) ([]models.TacticalRecommendation, error) {
	if !insight.Actionable {
		return []models.TacticalRecommendation{}, nil
	}

	holdingsStr := ""
	for _, h := range portfolio.Holdings {
		if contains(insight.RelevantHoldings, h.Ticker) {
			holdingsStr += fmt.Sprintf("- %s: %.2f shares @ $%.2f\n", h.Ticker, h.Quantity, h.CostBasis)
		}
	}

	prompt := fmt.Sprintf("Insights: %s\nRelevant Holdings:\n%s\n\nRecommend specific tactical moves (BUY/SELL/HOLD).",
		insight.ImpactAnalysis, holdingsStr)

	cfg := llmagent.Config{
		Name:        "TacticalAgent",
		Description: "Tactical trading strategist",
		Instruction: `You are a tactical trading strategist.
		Based on the insights, recommend specific actions.
		Output JSON list of objects: [{"action": "BUY/SELL/HOLD", "ticker": "TICKER", "quantity": float, "reasoning": "string", "ai_confidence": float (0-1)}].`,
	}

	responseText, err := m.RunAgentWithConfig(ctx, cfg, prompt)
	if err != nil {
		return nil, err
	}

	var recs []models.TacticalRecommendation
	if err := m.CleanAndParseJSON(responseText, &recs); err != nil {
		return nil, err // If strict parsing fails
	}

	return recs, nil
}

func contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}
