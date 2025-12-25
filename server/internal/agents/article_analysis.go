package agents

import (
	"context"
	"fmt"

	"techfact-trader/internal/models"

	"google.golang.org/adk/agent/llmagent"
	//"google.golang.org/adk/model" // Unused if we don't use model.Tool
)

type ArticleAnalysisResult struct {
	StrategicAnalysis string   `json:"strategic_analysis"`
	VerifiedSources   []string `json:"verified_sources"`
	RelatedArticles   []string `json:"related_articles"`
}

func (m *AgentManager) AnalyzeArticle(ctx context.Context, article *models.Article) (*ArticleAnalysisResult, error) {
	prompt := fmt.Sprintf("Analyze this article:\nTitle: %s\nURL: %s\nContent: %s\n\nProvide a strategic analysis, find verified sources that back this up, and list related articles.",
		article.Title, article.URL, article.Summary)

	cfg := llmagent.Config{
		Name:        "ArticleAnalysisAgent",
		Description: "Strategic analyst for tech news",
		Instruction: `You are a strategic analyst.
		Analyze the provided article.
		Output a JSON object with keys: "strategic_analysis", "verified_sources" (list of urls), "related_articles" (list of urls).`,
	}

	// TODO: Add tools when model.Tool type is resolved
	/*
		var tools []model.Tool
		if m.Config.VertexDatastoreID != "" {
			tools = append(tools, *m.Search.GetVertexSearchTool(m.Config.VertexDatastoreID))
		} else {
			tools = append(tools, *m.Search.GetGoogleSearchTool())
		}
		cfg.Tools = tools
	*/

	responseText, err := m.RunAgentWithConfig(ctx, cfg, prompt)
	if err != nil {
		return nil, err
	}

	var result ArticleAnalysisResult
	if err := m.CleanAndParseJSON(responseText, &result); err != nil {
		// Fallback if JSON fails - maybe just put text in analysis
		return &ArticleAnalysisResult{
			StrategicAnalysis: responseText,
		}, nil // Return partial result or error? Let's return partial.
	}

	return &result, nil
}
