package services

import (
	"context"
	"fmt"

	"google.golang.org/genai"
)

type SearchService struct {
	Client *genai.Client
}

func NewSearchService(ctx context.Context, projectID, location string) (*SearchService, error) {
	// Re-using genai client for convenience, though typically search might use a different client
	// For Grounding in Gemini, we configure the Tool in the model, but we might want a standalone search too.
	// For this implementation, we will focus on providing the Tool configuration for Agents.
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		Project:  projectID,
		Location: location,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create genai client: %w", err)
	}
	return &SearchService{Client: client}, nil
}

// GetVertexSearchTool returns a Tool configuration for Vertex AI Search
func (s *SearchService) GetVertexSearchTool(datastoreID string) *genai.Tool {
	return &genai.Tool{
		Retrieval: &genai.Retrieval{
			VertexAISearch: &genai.VertexAISearch{
				Datastore: datastoreID,
			},
		},
	}
}

// GetGoogleSearchTool returns a Tool configuration for Google Search
func (s *SearchService) GetGoogleSearchTool() *genai.Tool {
	return &genai.Tool{
		GoogleSearchRetrieval: &genai.GoogleSearchRetrieval{},
	}
}
