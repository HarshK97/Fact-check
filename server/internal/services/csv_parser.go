package services

import (
	"encoding/csv"
	"fmt"
	"io"
	"strconv"

	"techfact-trader/internal/models"
)

func ParsePortfolioCSV(r io.Reader) ([]models.Holding, error) {
	reader := csv.NewReader(r)
	// Expect header: Ticker,Quantity,CostBasis
	_, err := reader.Read() // Skip header
	if err != nil {
		return nil, err
	}

	var holdings []models.Holding
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}

		if len(record) < 3 {
			continue // Skip invalid rows
		}

		qty, err := strconv.ParseFloat(record[1], 64)
		if err != nil {
			return nil, fmt.Errorf("invalid quantity for %s: %v", record[0], err)
		}

		cost, err := strconv.ParseFloat(record[2], 64)
		if err != nil {
			return nil, fmt.Errorf("invalid cost basis for %s: %v", record[0], err)
		}

		holdings = append(holdings, models.Holding{
			Ticker:    record[0],
			Quantity:  qty,
			CostBasis: cost,
		})
	}
	return holdings, nil
}
