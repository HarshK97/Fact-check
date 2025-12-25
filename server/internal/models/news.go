package models

import "time"

type Article struct {
	ID          string    `firestore:"id" json:"id"`
	Title       string    `firestore:"title" json:"title"`
	URL         string    `firestore:"url" json:"url"`
	Content     string    `firestore:"content" json:"content"`
	Summary     string    `firestore:"summary" json:"summary"`
	Source      string    `firestore:"source" json:"source"`
	PublishedAt time.Time `firestore:"published_at" json:"published_at"`
	Claims      []Claim   `firestore:"claims" json:"claims"`
}
