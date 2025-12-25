package config

import (
	"log"
	"os"
)

type Config struct {
	ProjectID           string
	FirestoreCollection string
	AlpacaAPIKeyID      string
	AlpacaAPISecretKey  string
	GeminiAPIKey        string
	Port                string
	VertexDatastoreID   string
}

func LoadConfig() *Config {
	return &Config{
		ProjectID:           getEnv("GOOGLE_CLOUD_PROJECT", "techfact-trader"),
		FirestoreCollection: getEnv("FIRESTORE_COLLECTION", "techfact"),
		AlpacaAPIKeyID:      getEnv("APCA_API_KEY_ID", ""),
		AlpacaAPISecretKey:  getEnv("APCA_API_SECRET_KEY", ""),
		GeminiAPIKey:        getEnv("GEMINI_API_KEY", ""),
		Port:                getEnv("PORT", "8080"),
		VertexDatastoreID:   getEnv("VERTEX_DATASTORE_ID", ""),
	}
}

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	if fallback == "" {
		log.Printf("Warning: Environment variable %s not set", key)
	}
	return fallback
}
