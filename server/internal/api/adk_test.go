package api_test

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"

	"techfact-trader/internal/agents"
	"techfact-trader/internal/api"
)

// We can't easily mock the AgentManager without refactoring it to an interface or mocking the dependencies (Model, SessionService).
// For now, these tests will likely falter if they try to call real Gemini API.
// However, AgentManager uses "Strategist" agent which requires a Model.
// To test strictly the handler logic (parameter binding etc), we can try to verify basic request handling.
// But without mocking AgentManager.ExecuteRun, we are stuck with integration tests.

// Since refactoring AgentManager to interface wasn't in the plan but might be needed,
// I will create a test that sets up the handler but acknowledges it might fail on actual execution if credentials differ.
// A better approach is to mock `AgentManager` or its `ExecuteRun` method.
// Since `ADKHandler` takes `*agents.AgentManager`, I can't swap it easily unless I make an interface.

// I will create the test file but might need to comment out actual execution or use a mockable structure if I had one.
// Given strict instructions, I will proceed to create the test file but maybe skip the actual logic that requires tokens unless I can use a fake model.

func TestHandleRun_BindError(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)
	manager := &agents.AgentManager{} // incomplete manager
	handler := api.NewADKHandler(manager)

	w := httptest.NewRecorder()
	c, _ := gin.CreateTestContext(w)

	// Bad Request (invalid JSON)
	c.Request, _ = http.NewRequest("POST", "/run", bytes.NewBufferString("{invalid json"))

	handler.HandleRun(c)

	if w.Code != http.StatusBadRequest {
		t.Errorf("Expected status 400, got %d", w.Code)
	}
}
