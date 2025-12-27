# TechFact Trader API Documentation

Base URL: `http://localhost:8080` (default)

## Quick Start with xh

### Ingest & Analyze
```bash
xh POST :8080/news/ingest url="https://example.com/article"
```

### Upload Portfolio
```bash
xh POST :8080/portfolio/upload file@portfolio.csv X-User-ID:user123
```

### Rebalance
```bash
xh GET :8080/portfolio/user123/rebalance
```

### Benchmark
```bash
xh GET :8080/portfolio/user123/benchmark
```

## Endpoints

### 1. Ingest & Analyze News
**POST** `/news/ingest`

Analyzes a URL using the multi-agent system (Agent 1-4).

**Request Body:**
```json
{
  "url": "https://example.com/article"
}
```

**Response (200 OK):**
```json
{
  "article": {
    "id": "...",
    "title": "Article Title",
    "url": "https://example.com/article",
    "content": "...",
    "summary": "...",
    "source": "...",
    "published_at": "2023-10-27T10:00:00Z",
    "analysis_time": "2.5s",
    "strategic_analysis": "Strategic analysis text...",
    "verified_sources": ["url1", "url2"],
    "related_articles": ["url3", "url4"],
    "verdict": {
      "is_true": true,
      "confidence_score": 0.95,
      "reasoning": "...",
      "sources": ["..."]
    },
    "confidence_score": 0.95
  },
  "insights": {
    "impact_analysis": "Impact on portfolio...",
    "actionable": true,
    "relevant_holdings": ["AAPL"]
  },
  "recommendations": [
    {
      "action": "BUY",
      "ticker": "AAPL",
      "quantity": 10,
      "reasoning": "...",
      "ai_confidence": 0.85
    }
  ]
}
```

### 2. Upload Portfolio
**POST** `/portfolio/upload`

Uploads a CSV file of portfolio holdings.

**Form Data:**
*   `file`: The CSV file.
*   Header `X-User-ID` (optional): User ID.

**Response (200 OK):**
Returns the `Portfolio` object.

### 3. Rebalance Portfolio
**GET** `/portfolio/:id/rebalance`

Generates tactical recommendations for a specific portfolio (Manual Trigger).

**Response (200 OK):**
```json
{
  "recommendations": [
    {
      "action": "SELL",
      "ticker": "TSLA",
      "quantity": 5,
      "reasoning": "...",
      "ai_confidence": 0.9
    }
  ]
}
```

### 4. Benchmark Portfolio
**GET** `/portfolio/:id/benchmark`

Compares portfolio against a benchmark (e.g., QQQ).

**Response (200 OK):**
```json
{
  "comparison": {
    "ticker": "AAPL",
    "user_weight": 0.5,
    "benchmark_weight": 0.1,
    "difference": 0.4
  },
  "insight": "Analysis of the variance..."
}
```

## Data Models

### Verdict
*   `is_true`: boolean
*   `confidence_score`: float (0.0 - 1.0)
*   `reasoning`: string

### TacticalRecommendation
*   `action`: "BUY", "SELL", "HOLD"
*   `ticker`: string
*   `quantity`: float
*   `ai_confidence`: float (0.0 - 1.0)
