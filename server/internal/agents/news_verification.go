package agents

import (
	"context"
	"fmt"

	"techfact-trader/internal/models"

	"google.golang.org/adk/agent/llmagent"
)

// VerifyClaim defines the agent for fact-checking
func (m *AgentManager) VerifyClaim(ctx context.Context, claimText string) (*models.Verdict, error) {
	prompt := fmt.Sprintf("Verify this claim: %s", claimText)

	cfg := llmagent.Config{
		Name:        "NewsVerificationAgent",
		Description: "Expert fact-checker for tech news",
		Instruction: `You are an expert fact-checker for tech news. 
		Your goal is to verify claims.
		Output a JSON object for the Verdict struct: {"is_true": bool, "confidence_score": float (0-1), "reasoning": string, "sources": [string]}.`,
	}

	responseText, err := m.RunAgentWithConfig(ctx, cfg, prompt)
	if err != nil {
		return nil, err
	}

	var verdict models.Verdict
	if err := m.CleanAndParseJSON(responseText, &verdict); err != nil {
		// Fallback
		return &models.Verdict{
			IsTrue:          false,
			ConfidenceScore: 0.0,
			Reasoning:       "Failed to parse verdict: " + responseText,
		}, nil
	}

	return &verdict, nil
}
