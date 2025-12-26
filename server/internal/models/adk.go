package models

import (
	"google.golang.org/genai"
)

// RunRequest represents the body for /run and /run_sse
type RunRequest struct {
	AppName    string         `json:"app_name"`
	UserID     string         `json:"user_id"`
	SessionID  string         `json:"session_id"`
	NewMessage *genai.Content `json:"new_message"`
	Streaming  bool           `json:"streaming,omitempty"`
	// StateDelta map[string]interface{} `json:"state_delta,omitempty"` // Optional/Advanced
}
