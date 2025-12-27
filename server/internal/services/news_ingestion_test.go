package services

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNewsService_Ingest_Headers(t *testing.T) {
	// 1. Setup Mock Server
	server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Verify Headers
		assert.Contains(t, r.Header.Get("User-Agent"), "Mozilla/5.0", "User-Agent should look like a browser")
		assert.Contains(t, r.Header.Get("Accept"), "text/html", "Accept header should cover HTML")
		assert.Equal(t, "en-US,en;q=0.9", r.Header.Get("Accept-Language"), "Accept-Language should be English")
		assert.Equal(t, "https://www.google.com/", r.Header.Get("Referer"), "Referer should be Google")

		// Return valid RSS to satisfy parser
		w.Header().Set("Content-Type", "application/xml")
		w.Write([]byte(`
			<rss version="2.0">
				<channel>
					<title>Test Feed</title>
					<item>
						<title>Test Article</title>
						<link>http://example.com/article</link>
						<description>Summary</description>
					</item>
				</channel>
			</rss>
		`))
	}))
	defer server.Close()

	// 2. Initialize Service
	ns := NewNewsService()

	// 3. Execute Ingest
	articles, err := ns.Ingest(server.URL)

	// 4. Assertions
	assert.NoError(t, err)
	assert.NotEmpty(t, articles)
	assert.Equal(t, "Test Article", articles[0].Title)
}
