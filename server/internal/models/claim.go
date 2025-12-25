package models

import "time"

type ClaimStatus string

const (
	ClaimStatusPending  ClaimStatus = "pending"
	ClaimStatusVerified ClaimStatus = "verified"
	ClaimStatusDebunked ClaimStatus = "debunked"
)

type Claim struct {
	ID          string      `firestore:"id" json:"id"`
	Text        string      `firestore:"text" json:"text"`
	SourceURL   string      `firestore:"source_url" json:"source_url"`
	PublishedAt time.Time   `firestore:"published_at" json:"published_at"`
	Status      ClaimStatus `firestore:"status" json:"status"`
	Verdict     *Verdict    `firestore:"verdict,omitempty" json:"verdict,omitempty"`
}

type Verdict struct {
	IsTrue          bool     `firestore:"is_true" json:"is_true"`
	ConfidenceScore float64  `firestore:"confidence_score" json:"confidence_score"` // 0.0 to 1.0
	Reasoning       string   `firestore:"reasoning" json:"reasoning"`
	Sources         []string `firestore:"sources" json:"sources"`
}
