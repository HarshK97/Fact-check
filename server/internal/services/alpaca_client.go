package services

import (
	"fmt"
	"log"

	"techfact-trader/internal/config"

	"github.com/alpacahq/alpaca-trade-api-go/v3/alpaca"
	"github.com/alpacahq/alpaca-trade-api-go/v3/marketdata"
)

type AlpacaService struct {
	TradeClient *alpaca.Client
	DataClient  *marketdata.Client
}

func NewAlpacaService(cfg *config.Config) *AlpacaService {
	// Note: In a real app, we'd use the keys from config.
	// The SDK automatically checks env vars APCA_API_KEY_ID and APCA_API_SECRET_KEY
	// But we can also pass them explicitly if needed.

	// Assuming Paper Trading for hackathon
	// Base URL is defaulted in SDK if env vars are set properly for paper.

	return &AlpacaService{
		TradeClient: alpaca.NewClient(alpaca.ClientOpts{
			APIKey:    cfg.AlpacaAPIKeyID,
			APISecret: cfg.AlpacaAPISecretKey,
			BaseURL:   "https://paper-api.alpaca.markets",
		}),
		DataClient: marketdata.NewClient(marketdata.ClientOpts{
			APIKey:    cfg.AlpacaAPIKeyID,
			APISecret: cfg.AlpacaAPISecretKey,
		}),
	}
}

func (s *AlpacaService) GetLatestPrice(symbol string) (float64, error) {
	trade, err := s.DataClient.GetLatestTrade(symbol, marketdata.GetLatestTradeRequest{})
	if err != nil {
		log.Printf("Error fetching price for %s: %v", symbol, err)
		return 0, err
	}
	return trade.Price, nil
}

func (s *AlpacaService) GetBenchmarkComposition(symbol string) (map[string]float64, error) {
	// Mocking benchmark composition for hackathon as fetching full ETF holdings is complex/paid
	if symbol == "QQQ" {
		return map[string]float64{
			"AAPL":  0.11,
			"MSFT":  0.10,
			"NVDA":  0.08,
			"GOOGL": 0.07,
			"AMZN":  0.06,
		}, nil
	}
	return nil, fmt.Errorf("benchmark %s not supported", symbol)
}
