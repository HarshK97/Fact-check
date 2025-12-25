package db

import (
	"context"
	"time"

	"techfact-trader/internal/models"
)

type PortfolioRepo struct {
	DB *DB
}

func NewPortfolioRepo(db *DB) *PortfolioRepo {
	return &PortfolioRepo{DB: db}
}

func (r *PortfolioRepo) CreatePortfolio(ctx context.Context, portfolio *models.Portfolio) error {
	portfolio.UpdatedAt = time.Now()
	_, err := r.DB.Client.Collection("portfolios").Doc(portfolio.ID).Set(ctx, portfolio)
	return err
}

func (r *PortfolioRepo) GetPortfolio(ctx context.Context, id string) (*models.Portfolio, error) {
	doc, err := r.DB.Client.Collection("portfolios").Doc(id).Get(ctx)
	if err != nil {
		return nil, err
	}
	var portfolio models.Portfolio
	if err := doc.DataTo(&portfolio); err != nil {
		return nil, err
	}
	return &portfolio, nil
}

func (r *PortfolioRepo) UpdatePortfolio(ctx context.Context, portfolio *models.Portfolio) error {
	portfolio.UpdatedAt = time.Now()
	_, err := r.DB.Client.Collection("portfolios").Doc(portfolio.ID).Set(ctx, portfolio)
	return err
}

func (r *PortfolioRepo) GetPortfoliosByUserID(ctx context.Context, userID string) ([]models.Portfolio, error) {
	iter := r.DB.Client.Collection("portfolios").Where("user_id", "==", userID).Documents(ctx)
	docs, err := iter.GetAll()
	if err != nil {
		return nil, err
	}
	var portfolios []models.Portfolio
	for _, doc := range docs {
		var p models.Portfolio
		if err := doc.DataTo(&p); err != nil {
			return nil, err
		}
		portfolios = append(portfolios, p)
	}
	return portfolios, nil
}
