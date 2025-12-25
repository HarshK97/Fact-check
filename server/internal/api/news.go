package api

import (
	"fmt"
	"net/http"
	"time"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/db"
	"techfact-trader/internal/services"

	"github.com/gin-gonic/gin"
)

type NewsHandler struct {
	NewsService  *services.NewsService
	ClaimRepo    *db.ClaimRepo
	AgentManager *agents.AgentManager
}

func NewNewsHandler(ns *services.NewsService, repo *db.ClaimRepo, am *agents.AgentManager) *NewsHandler {
	return &NewsHandler{
		NewsService:  ns,
		ClaimRepo:    repo,
		AgentManager: am,
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

	// Agent 1: Article Analysis
	analysis, err := h.AgentManager.AnalyzeArticle(c.Request.Context(), article)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Agent 1 failed: %v", err)})
		return
	}
	article.StrategicAnalysis = analysis.StrategicAnalysis
	article.VerifiedSources = analysis.VerifiedSources
	article.RelatedArticles = analysis.RelatedArticles

	// Agent 2: Verification
	verdict, err := h.AgentManager.VerifyClaim(c.Request.Context(), article.Title)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Agent 2 failed: %v", err)})
		return
	}
	article.Verdict = verdict
	article.ConfidenceScore = verdict.ConfidenceScore

	article.AnalysisTime = time.Since(start).String()

	// Save everything
	if err := h.ClaimRepo.SaveArticle(c.Request.Context(), article); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save article"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"article": article,
	})
}
