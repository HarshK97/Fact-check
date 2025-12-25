package agents

import (
	"context"
	"fmt"
	"strings"

	"google.golang.org/genai"

	"techfact-trader/internal/config"

	"google.golang.org/adk/agent"
	"google.golang.org/adk/agent/llmagent"
	"google.golang.org/adk/model"
	"google.golang.org/adk/model/gemini"
	"google.golang.org/adk/runner"
	"google.golang.org/adk/session"

	"techfact-trader/internal/services"
)

type AgentManager struct {
	Config         *config.Config
	Model          model.LLM
	Search         *services.SearchService
	SessionService session.Service
}

func NewAgentManager(cfg *config.Config) (*AgentManager, error) {
	// Initialize Vertex AI Gemini model
	// Using ADK's gemini package
	ctx := context.Background()

	clientCfg := &genai.ClientConfig{
		Project:  cfg.ProjectID,
		Location: "us-central1",
	}

	// If API Key is provided, use it and unset Project/Location to avoid "mutually exclusive" error.
	// This switches the client to use Google AI Studio (generative-ai) mode instead of Vertex AI mode.
	if cfg.GeminiAPIKey != "" {
		clientCfg.APIKey = cfg.GeminiAPIKey
		clientCfg.Project = ""
		clientCfg.Location = ""
	}

	model, err := gemini.NewModel(ctx, "gemini-2.5-flash", clientCfg)
	if err != nil {
		return nil, err
	}

	searchService, err := services.NewSearchService(ctx, cfg.ProjectID, "us-central1")
	if err != nil {
		return nil, fmt.Errorf("failed to init search service: %w", err)
	}

	return &AgentManager{
		Config:         cfg,
		Model:          model,
		Search:         searchService,
		SessionService: session.InMemoryService(),
	}, nil
}

// RunOneShot executes an agent with a single prompt and returns the result text.
func (m *AgentManager) RunOneShot(ctx context.Context, name, description, prompt string) (string, error) {
	// Create a single-use agent
	a, err := llmagent.New(llmagent.Config{
		Name:        name,
		Description: description,
		Model:       m.Model,
		Instruction: "You are a helpful assistant.", // Generic instruction, prompt should contain the specific task or we can param it
	})
	if err != nil {
		return "", fmt.Errorf("failed to create agent: %w", err)
	}

	// Create a runner
	sess := session.InMemoryService()
	r, err := runner.New(runner.Config{
		AppName:        "TechFactTrader",
		Agent:          a,
		SessionService: sess,
	})
	if err != nil {
		return "", fmt.Errorf("failed to create runner: %w", err)
	}

	// Invoke
	// Using a fixed session ID for one-shot
	sessionID := "session-" + name
	if _, err := sess.Create(ctx, &session.CreateRequest{
		SessionID: sessionID,
		UserID:    "api-user",
		AppName:   "TechFactTrader",
	}); err != nil {
		return "", fmt.Errorf("failed to create session: %w", err)
	}

	content := genai.NewContentFromText(prompt, "user")
	stream := r.Run(ctx, "api-user", sessionID, content, agent.RunConfig{})

	var sb strings.Builder
	for event, err := range stream {
		if err != nil {
			return "", err
		}
		if event.LLMResponse.Content != nil {
			for _, part := range event.LLMResponse.Content.Parts {
				sb.WriteString(part.Text)
			}
		}
	}
	return sb.String(), nil
}
