package api

import (
	"net/http"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/db"
	"techfact-trader/internal/models"
	"techfact-trader/internal/services"

	"github.com/gin-gonic/gin"
)

type PortfolioHandler struct {
	Repo         *db.PortfolioRepo
	AgentManager *agents.AgentManager
	Alpaca       *services.AlpacaService
}

func NewPortfolioHandler(repo *db.PortfolioRepo, am *agents.AgentManager, alpaca *services.AlpacaService) *PortfolioHandler {
	return &PortfolioHandler{
		Repo:         repo,
		AgentManager: am,
		Alpaca:       alpaca,
	}
}

func (h *PortfolioHandler) Upload(c *gin.Context) {
	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "File required"})
		return
	}

	holdings, err := services.ParsePortfolioCSV(file)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid CSV: " + err.Error()})
		return
	}

	portfolio := &models.Portfolio{
		ID:       c.Request.Header.Get("X-User-ID"), // Simplified Auth
		UserID:   c.Request.Header.Get("X-User-ID"),
		Holdings: holdings,
	}

	if portfolio.ID == "" {
		portfolio.ID = "default_user"
		portfolio.UserID = "default_user"
	}

	if err := h.Repo.CreatePortfolio(c.Request.Context(), portfolio); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save portfolio"})
		return
	}

	c.JSON(http.StatusOK, portfolio)
}

func (h *PortfolioHandler) Rebalance(c *gin.Context) {
	id := c.Param("id")
	portfolio, err := h.Repo.GetPortfolio(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Portfolio not found"})
		return
	}

	// Mocking getting the "latest impacted news"
	// In reality, we'd query db.GetLatestHighImpactNews()
	mockInsight := &models.PortfolioInsight{
		ImpactAnalysis:   "Analysis of AAPL impact",
		Actionable:       true,
		RelevantHoldings: []string{"AAPL"},
	}

	recs, err := h.AgentManager.GenerateTacticalRecommendations(c.Request.Context(), portfolio, mockInsight)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Rebalancing failed: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"recommendations": recs})
}

func (h *PortfolioHandler) Benchmark(c *gin.Context) {
	id := c.Param("id")
	portfolio, err := h.Repo.GetPortfolio(c.Request.Context(), id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Portfolio not found"})
		return
	}

	benchmarkData, err := h.Alpaca.GetBenchmarkComposition("QQQ")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch benchmark"})
		return
	}

	comp, insight, err := h.AgentManager.CompareToBenchmark(c.Request.Context(), portfolio, benchmarkData)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Comparison failed: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"comparison": comp, "insight": insight})
}
