package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/api"
	"techfact-trader/internal/config"
	"techfact-trader/internal/db"
	"techfact-trader/internal/services"
)

func main() {
	// Load .env file if it exists
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	// 1. Load Config
	cfg := config.LoadConfig()

	// 2. Initialize Firestore
	ctx := context.Background()
	database, err := db.NewDB(ctx, cfg)
	if err != nil {
		log.Fatalf("Failed to init DB: %v", err)
	}
	defer database.Close()

	// 3. Initialize Services & Repos
	portfolioRepo := db.NewPortfolioRepo(database)
	claimRepo := db.NewClaimRepo(database)

	newsService := services.NewNewsService()
	alpacaService := services.NewAlpacaService(cfg)

	agentManager, err := agents.NewAgentManager(cfg)
	if err != nil {
		log.Fatalf("Failed to init Agent Manager: %v", err)
	}

	// 4. Initialize Handlers
	portfolioHandler := api.NewPortfolioHandler(portfolioRepo, agentManager, alpacaService)
	newsHandler := api.NewNewsHandler(newsService, claimRepo, agentManager, portfolioRepo)

	// 5. Setup Router
	r := gin.Default()

	// CORS Middleware
	r.Use(func(c *gin.Context) {
		origin := c.Request.Header.Get("Origin")
		// Allow production domain and localhost
		if origin == "https://fact-check-production-a25a.up.railway.app" || 
		   (len(origin) >= 16 && origin[:16] == "http://localhost") {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
		} else {
			// Fallback for tools/testing, though ideally strict
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		}
		
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, X-User-ID")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	r.POST("/news/ingest", newsHandler.Ingest)

	r.POST("/portfolio/upload", portfolioHandler.Upload)
	r.GET("/portfolio/:id/rebalance", portfolioHandler.Rebalance)
	r.GET("/portfolio/:id/benchmark", portfolioHandler.Benchmark)

	adkHandler := api.NewADKHandler(agentManager)
	r.POST("/run", adkHandler.HandleRun)
	r.POST("/run_sse", adkHandler.HandleRunSSE)

	// 6. Start Server
	log.Printf("Starting server on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
