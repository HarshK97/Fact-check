package db

import (
	"context"
	"fmt"
	"log"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"techfact-trader/internal/config"
)

type DB struct {
	Client *firestore.Client
}

func NewDB(ctx context.Context, cfg *config.Config) (*DB, error) {
	conf := &firebase.Config{ProjectID: cfg.ProjectID}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		return nil, fmt.Errorf("error initializing app: %v", err)
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		return nil, fmt.Errorf("error initializing firestore: %v", err)
	}

	log.Println("Firestore initialized successfully")
	return &DB{Client: client}, nil
}

func (db *DB) Close() {
	if db.Client != nil {
		db.Client.Close()
	}
}
