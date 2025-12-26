package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/models"

	"github.com/gin-gonic/gin"
	"google.golang.org/adk/session"
)

type ADKHandler struct {
	Manager *agents.AgentManager
}

func NewADKHandler(manager *agents.AgentManager) *ADKHandler {
	return &ADKHandler{Manager: manager}
}

// HandleRun executes the agent and returns a list of events (synchronous-like)
func (h *ADKHandler) HandleRun(c *gin.Context) {
	var req models.RunRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stream, err := h.Manager.ExecuteRun(c.Request.Context(), req.AppName, req.UserID, req.SessionID, req.NewMessage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var events []*session.Event
	for event, err := range stream {
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		events = append(events, event)
	}

	c.JSON(http.StatusOK, events)
}

// HandleRunSSE executes the agent and streams events via SSE
func (h *ADKHandler) HandleRunSSE(c *gin.Context) {
	var req models.RunRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	stream, err := h.Manager.ExecuteRun(c.Request.Context(), req.AppName, req.UserID, req.SessionID, req.NewMessage)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Writer.Header().Set("Content-Type", "text/event-stream")
	c.Writer.Header().Set("Cache-Control", "no-cache")
	c.Writer.Header().Set("Connection", "keep-alive")
	c.Writer.Header().Set("Transfer-Encoding", "chunked")

	c.Stream(func(w io.Writer) bool {
		for event, err := range stream {
			if err != nil {
				// In SSE, we might want to send a specific error event or just close
				fmt.Fprintf(w, "event: error\ndata: %s\n\n", err.Error())
				return false
			}

			data, err := json.Marshal(event)
			if err != nil {
				continue
			}
			fmt.Fprintf(w, "data: %s\n\n", string(data))
		}
		return false
	})
}
