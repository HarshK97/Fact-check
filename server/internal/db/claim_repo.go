package db

import (
	"context"
	"techfact-trader/internal/models"

	"cloud.google.com/go/firestore"
)

type ClaimRepo struct {
	DB *DB
}

func NewClaimRepo(db *DB) *ClaimRepo {
	return &ClaimRepo{DB: db}
}

func (r *ClaimRepo) SaveArticle(ctx context.Context, article *models.Article) error {
	_, err := r.DB.Client.Collection("articles").Doc(article.ID).Set(ctx, article)
	if err != nil {
		// Log the error for debugging
		println("Firestore Error: " + err.Error())
	}
	return err
}

func (r *ClaimRepo) GetArticle(ctx context.Context, id string) (*models.Article, error) {
	doc, err := r.DB.Client.Collection("articles").Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	var article models.Article
	if err := doc.DataTo(&article); err != nil {
		return nil, err
	}
	return &article, nil
}

func (r *ClaimRepo) UpdateVerdict(ctx context.Context, articleID string, claimIndex int, verdict *models.Verdict) error {
	// This is a simplified update. In a real app, strict concurrency handling involves transactions.
	// We'll trust the document structure for now.
	docRef := r.DB.Client.Collection("articles").Doc(articleID)
	// Firestore doesn't support updating array elements by index easily without reading.
	// We might need a proper transactional update here or just overwrite for the prototype.
	// For this Hackathon, let's assume we read-modify-write in a transaction.

	return r.DB.Client.RunTransaction(ctx, func(ctx context.Context, tx *firestore.Transaction) error {
		doc, err := tx.Get(docRef)
		if err != nil {
			return err
		}
		var article models.Article
		if err := doc.DataTo(&article); err != nil {
			return err
		}

		if claimIndex >= 0 && claimIndex < len(article.Claims) {
			article.Claims[claimIndex].Verdict = verdict
			article.Claims[claimIndex].Status = models.ClaimStatusVerified
			if !verdict.IsTrue {
				article.Claims[claimIndex].Status = models.ClaimStatusDebunked
			}
		}

		return tx.Set(docRef, article)
	})
}
