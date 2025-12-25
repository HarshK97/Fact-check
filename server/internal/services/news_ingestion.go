package services

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"time"

	"techfact-trader/internal/models"

	"github.com/gocolly/colly/v2"
	"github.com/mmcdole/gofeed"
)

type NewsService struct {
	FeedParser *gofeed.Parser
}

type headerTransport struct {
	T http.RoundTripper
}

func (h *headerTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
	req.Header.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")
	req.Header.Set("Accept-Language", "en-US,en;q=0.9")
	req.Header.Set("Referer", "https://www.google.com/")
	return h.T.RoundTrip(req)
}

func NewNewsService() *NewsService {
	client := &http.Client{
		Timeout: 10 * time.Second,
		Transport: &headerTransport{
			T: http.DefaultTransport,
		},
	}

	fp := gofeed.NewParser()
	fp.Client = client
	return &NewsService{
		FeedParser: fp,
	}
}

func (s *NewsService) Ingest(url string) ([]models.Article, error) {
	// 1. Try treating as RSS feed
	feed, err := s.FeedParser.ParseURL(url)
	if err == nil && feed != nil {
		var articles []models.Article
		for _, item := range feed.Items {
			article := models.Article{
				ID:          generateID(item.Link),
				Title:       item.Title,
				URL:         item.Link,
				Summary:     item.Description,
				PublishedAt: getPublishTime(item),
				Source:      feed.Title,
			}
			if item.Content != "" {
				article.Content = item.Content
			} else {
				article.Content = item.Description
			}
			articles = append(articles, article)
		}
		return articles, nil
	}

	// 2. Fallback: Treat as single article and scrape
	article := models.Article{
		ID:          generateID(url),
		URL:         url,
		PublishedAt: time.Now(),
		Source:      "Web Scrape",
	}

	found := false
	c := colly.NewCollector(
		colly.UserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"),
		colly.IgnoreRobotsTxt(),
	)

	c.OnRequest(func(r *colly.Request) {
		r.Headers.Set("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7")
		r.Headers.Set("Accept-Language", "en-US,en;q=0.9")
	})

	// Ensure we can revisit URLs if needed (though new collector solves this)
	// c.AllowURLRevisit = true

	c.OnHTML("head > title", func(e *colly.HTMLElement) {
		article.Title = e.Text
		found = true
	})
	c.OnHTML("h1", func(e *colly.HTMLElement) {
		// Prefer H1 over title tag if available
		article.Title = e.Text
	})
	c.OnHTML("p", func(e *colly.HTMLElement) {
		article.Content += e.Text + "\n\n"
	})
	// Capture meta description
	c.OnHTML("meta[name=description]", func(e *colly.HTMLElement) {
		article.Summary = e.Attr("content")
	})

	err = c.Visit(url)
	if err != nil {
		return nil, fmt.Errorf("scraping failed for %s: %w", url, err)
	}

	c.Wait()

	if !found && article.Content == "" {
		return nil, fmt.Errorf("failed to scrape content or title from %s (Status: %v)", url, "Unknown")
	}

	if article.Summary == "" && len(article.Content) > 200 {
		article.Summary = article.Content[:200] + "..."
	}

	return []models.Article{article}, nil
}

func generateID(s string) string {
	h := sha256.New()
	h.Write([]byte(s))
	return hex.EncodeToString(h.Sum(nil))
}

func getPublishTime(item *gofeed.Item) time.Time {
	if item.PublishedParsed != nil {
		return *item.PublishedParsed
	}
	return time.Now()
}
