package main

import (
	"bufio"
	"context"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/joho/godotenv"
	"google.golang.org/adk/agent"
	"google.golang.org/adk/agent/llmagent"
	"google.golang.org/adk/model/gemini"
	"google.golang.org/adk/runner"
	"google.golang.org/adk/session"
	"google.golang.org/genai"

	"techfact-trader/internal/config"
)

// This executable demonstrates a "Pure ADK" run for the judges.
// It spins up the "Strategist" Agent in interactive mode.

func main() {
	fmt.Println("🚀 Initializing ADK Interactive Runner...")

	// 0. Load .env
	if err := godotenv.Load(); err != nil {
		fmt.Println("Warning: No .env file found")
	}

	// 1. Load Config
	cfg := config.LoadConfig()

	// 2. Setup Model (Gemini 2.5 Flash)
	ctx := context.Background()
	clientCfg := &genai.ClientConfig{
		Project:  cfg.ProjectID,
		Location: "us-central1",
	}
	if cfg.GeminiAPIKey != "" {
		clientCfg.APIKey = cfg.GeminiAPIKey
		clientCfg.Project = ""
		clientCfg.Location = ""
	}

	model, err := gemini.NewModel(ctx, "gemini-2.5-flash", clientCfg)
	if err != nil {
		log.Fatalf("Failed to create model: %v", err)
	}

	// 3. Define the Agent (The Strategist)
	strategistAgent, err := llmagent.New(llmagent.Config{
		Name:        "StrategistAgent",
		Description: "A strategic investment analyst that discusses market news.",
		Model:       model,
		Instruction: `You are a Senior Investment Strategist.
		Your goal is to have deep, insightful conversations about financial news.
		When a user gives you a topic or article, analyze it strategically.
		Be professional, concise, and focus on verified facts.`,
	})
	if err != nil {
		log.Fatalf("Failed to create agent: %v", err)
	}

	// 4. Create the Runner
	sessService := session.InMemoryService()
	r, err := runner.New(runner.Config{
		AppName:        "TechFactTrader_CLI",
		Agent:          strategistAgent,
		SessionService: sessService,
	})
	if err != nil {
		log.Fatalf("Failed to create runner: %v", err)
	}

	// 5. Create a Session
	sessionID := "demo-session-1"
	if _, err := sessService.Create(ctx, &session.CreateRequest{
		SessionID: sessionID,
		UserID:    "judge-user",
		AppName:   "TechFactTrader_CLI",
	}); err != nil {
		log.Fatalf("Failed to create session: %v", err)
	}

	// 6. Interactive Loop
	reader := bufio.NewReader(os.Stdin)
	fmt.Println("\n✅ Agent Ready! (Type 'quit' to exit)")
	fmt.Println("---------------------------------------------------------")
	fmt.Println("👨‍💼 Strategist: Hello. What market news shall we analyze today?")

	for {
		fmt.Print("\n> ")
		text, _ := reader.ReadString('\n')
		text = strings.TrimSpace(text)

		if text == "quit" || text == "exit" {
			break
		}
		if text == "" {
			continue
		}

		// Run the turn
		content := genai.NewContentFromText(text, "user")
		// Stream response
		stream := r.Run(ctx, "judge-user", sessionID, content, agent.RunConfig{})

		fmt.Print("👨‍💼 Strategist: ")
		for event, err := range stream {
			if err != nil {
				log.Printf("Error during generation: %v", err)
				break
			}
			if event.LLMResponse.Content != nil {
				for _, part := range event.LLMResponse.Content.Parts {
					fmt.Print(part.Text)
				}
			}
		}
		fmt.Println() // Newline after response
	}
}
