package models

import "time"

type ActionType string

const (
	ActionBuy  ActionType = "BUY"
	ActionSell ActionType = "SELL"
	ActionHold ActionType = "HOLD"
)

type Portfolio struct {
	ID        string    `firestore:"id" json:"id"`
	UserID    string    `firestore:"user_id" json:"user_id"`
	Holdings  []Holding `firestore:"holdings" json:"holdings"`
	UpdatedAt time.Time `firestore:"updated_at" json:"updated_at"`
}

type Holding struct {
	Ticker    string  `firestore:"ticker" json:"ticker"`
	Quantity  float64 `firestore:"quantity" json:"quantity"`
	CostBasis float64 `firestore:"cost_basis" json:"cost_basis"`
}

type RebalanceRecommendation struct {
	Ticker    string     `json:"ticker"`
	Action    ActionType `json:"action"`
	Quantity  float64    `json:"quantity"`
	Reasoning string     `json:"reasoning"`
}

type AllocationComparison struct {
	Ticker          string  `json:"ticker"`
	UserWeight      float64 `json:"user_weight"`
	BenchmarkWeight float64 `json:"benchmark_weight"`
	Difference      float64 `json:"difference"`
}
