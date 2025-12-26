package api

import (
	"fmt"
	"net/http"
	"time"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/db"
	"techfact-trader/internal/models"
	"techfact-trader/internal/services"

	"github.com/gin-gonic/gin"
	"golang.org/x/sync/errgroup"
)

type NewsHandler struct {
	NewsService   *services.NewsService
	ClaimRepo     *db.ClaimRepo
	AgentManager  *agents.AgentManager
	PortfolioRepo *db.PortfolioRepo // Needed for Agent 3
}

func NewNewsHandler(ns *services.NewsService, repo *db.ClaimRepo, am *agents.AgentManager, pr *db.PortfolioRepo) *NewsHandler {
	return &NewsHandler{
		NewsService:   ns,
		ClaimRepo:     repo,
		AgentManager:  am,
		PortfolioRepo: pr,
	}
}

func (h *NewsHandler) Ingest(c *gin.Context) {
	var req struct {
		URL string `json:"url"`
	}
	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	start := time.Now()

	articles, err := h.NewsService.Ingest(req.URL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to ingest RSS: " + err.Error()})
		return
	}

	if len(articles) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No articles found"})
		return
	}

	article := &articles[0] // Process first one for now

	// Parallel Execution of Agent 1 & 2
	var g errgroup.Group

	// Agent 1: Article Analysis
	g.Go(func() error {
		analysis, err := h.AgentManager.AnalyzeArticle(c.Request.Context(), article)
		if err != nil {
			return fmt.Errorf("agent 1 failed: %w", err)
		}
		article.StrategicAnalysis = analysis.StrategicAnalysis
		article.VerifiedSources = analysis.VerifiedSources
		article.RelatedArticles = analysis.RelatedArticles
		return nil
	})

	// Agent 2: Verification
	var verdict *models.Verdict
	g.Go(func() error {
		v, err := h.AgentManager.VerifyClaim(c.Request.Context(), article.Title) // Verifying Title as claim
		if err != nil {
			return fmt.Errorf("agent 2 failed: %w", err)
		}
		verdict = v
		article.Verdict = v
		article.ConfidenceScore = v.ConfidenceScore // Map confidence
		return nil
	})

	if err := g.Wait(); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Agent 3: Portfolio Insights
	// Load default portfolio for now if no user context
	userID := c.DefaultQuery("user_id", "default_user")
	portfolio, err := h.PortfolioRepo.GetPortfolio(c.Request.Context(), userID)
	if err != nil {
		// If no portfolio, we might skip Agent 3/4 or create dummy?
		// For now log and skip or error. Let's create a dummy if missing to show flow.
		portfolio = &models.Portfolio{ID: userID, Holdings: []models.Holding{}}
	}

	insight, err := h.AgentManager.GenerateInsights(c.Request.Context(), portfolio, verdict, article)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Agent 3 failed: " + err.Error()})
		return
	}

	// Agent 4: Tactical Recommendations
	recs, err := h.AgentManager.GenerateTacticalRecommendations(c.Request.Context(), portfolio, insight)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Agent 4 failed: " + err.Error()})
		return
	}

	article.AnalysisTime = time.Since(start).String()

	// Save everything
	if err := h.ClaimRepo.SaveArticle(c.Request.Context(), article); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"article":         article,
		"insights":        insight,
		"recommendations": recs,
	})
}
