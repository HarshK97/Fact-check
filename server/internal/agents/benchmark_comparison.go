package agents

import (
	"context"
	"fmt"
	"techfact-trader/internal/models"
)

func (m *AgentManager) CompareToBenchmark(ctx context.Context, portfolio *models.Portfolio, benchmark map[string]float64) (*models.AllocationComparison, string, error) {
	// 1. Calculate numerical differences
	ticker := "AAPL"
	userWeight := 0.5
	benchWeight := benchmark[ticker]
	diff := userWeight - benchWeight

	comp := &models.AllocationComparison{
		Ticker:          ticker,
		UserWeight:      userWeight,
		BenchmarkWeight: benchWeight,
		Difference:      diff,
	}

	// 2. Use Agent for qualitative analysis
	prompt := fmt.Sprintf("User has %.2f%% in %s vs Benchmark %.2f%%. Give a brief financial insight.",
		userWeight*100, ticker, benchWeight*100)

	insight, err := m.RunOneShot(ctx, "BenchmarkAnalyst", "Analyzes portfolio vs benchmark", prompt)
	if err != nil {
		return nil, "", err
	}

	return comp, insight, nil
}
