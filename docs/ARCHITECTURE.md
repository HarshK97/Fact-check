# Fact-Check System Architecture

This document outlines the system architecture, data flow, and multi-agent pipeline used by Fact-Check to verify technology news and generate actionable market insights.

---

## High-Level System Overview

```mermaid
graph TB
    subgraph Client["Frontend (Next.js)"]
        LP["Landing Page"]
        AP["Analysis Page"]
        PP["Portfolio Pages"]
    end

    subgraph Server["Backend (Go + Gin)"]
        API["REST API Layer"]
        AM["Agent Manager"]
        SVC["Services Layer"]
        DB["Firestore"]
    end

    subgraph External["External Services"]
        GEM["Gemini 2.5 Flash"]
        VTX["Vertex AI Search"]
        ALP["Alpaca Markets API"]
        RSS["RSS Feeds / Web"]
    end

    Client -->|HTTP/JSON| API
    API --> AM
    API --> SVC
    AM -->|LLM Calls| GEM
    AM -->|Grounding| VTX
    SVC -->|Market Data| ALP
    SVC -->|Article Fetch| RSS
    AM --> DB
    SVC --> DB
```

---

## Multi-Agent Verification Pipeline

The core of Fact-Check is a 4-agent pipeline that processes each article through verification, analysis, and recommendation stages.

```mermaid
sequenceDiagram
    participant U as User/Frontend
    participant API as API Server
    participant A1 as Agent 1: Article Analyst
    participant A2 as Agent 2: News Verifier
    participant A3 as Agent 3: Portfolio Insights
    participant A4 as Agent 4: Tactical Rebalancer
    participant FS as Firestore

    U->>API: POST /news/ingest {url}
    API->>API: Fetch & parse article (RSS/Scrape)

    par Parallel Execution
        API->>A1: Analyze article content
        A1-->>API: Strategic analysis + sources
    and
        API->>A2: Verify claims
        A2-->>API: Verdict + confidence score
    end

    API->>A3: Generate portfolio insights
    Note over A3: Uses verdict + user portfolio
    A3-->>API: Impact analysis + relevant holdings

    API->>A4: Generate tactical recommendations
    Note over A4: Uses insights + holdings
    A4-->>API: BUY/SELL/HOLD recommendations

    API->>FS: Save article + analysis
    API-->>U: Full analysis response
```

---

## Agent Descriptions

| Agent | Name | Purpose | Input | Output |
|-------|------|---------|-------|--------|
| 1 | Article Analyst | Strategic analysis of tech news | Article content | Analysis, verified sources, related articles |
| 2 | News Verifier | Fact-checks claims against sources | Article title/claims | Verdict (true/false), confidence score, reasoning |
| 3 | Portfolio Insights | Contextualizes news for user portfolio | Verdict + portfolio holdings | Impact analysis, actionable flag, relevant tickers |
| 4 | Tactical Rebalancer | Generates trading recommendations | Insights + relevant holdings | BUY/SELL/HOLD with quantities and reasoning |

---

## API Architecture

```mermaid
graph LR
    subgraph Endpoints
        NI["POST /news/ingest"]
        PU["POST /portfolio/upload"]
        PR["GET /portfolio/:id/rebalance"]
        PB["GET /portfolio/:id/benchmark"]
        RN["POST /run"]
        RS["POST /run_sse"]
    end

    subgraph Handlers
        NH["NewsHandler"]
        PH["PortfolioHandler"]
        AH["ADKHandler"]
    end

    subgraph Core
        AM["AgentManager"]
        NS["NewsService"]
        AS["AlpacaService"]
        SS["SearchService"]
    end

    subgraph Storage
        CR["ClaimRepo"]
        POR["PortfolioRepo"]
        FS["Firestore"]
    end

    NI --> NH
    PU --> PH
    PR --> PH
    PB --> PH
    RN --> AH
    RS --> AH

    NH --> AM
    NH --> NS
    NH --> CR
    PH --> AM
    PH --> AS
    PH --> POR
    AH --> AM

    CR --> FS
    POR --> FS
```

---

## Data Flow

```mermaid
flowchart TD
    A["Article URL"] --> B["News Ingestion Service"]
    B -->|RSS Feed| C["Parse Feed Items"]
    B -->|Single URL| D["Web Scraper (Colly)"]
    C --> E["Article Model"]
    D --> E

    E --> F{"Agent Pipeline"}
    F -->|Parallel| G["Agent 1: Article Analysis"]
    F -->|Parallel| H["Agent 2: Claim Verification"]

    G --> I["Strategic Analysis"]
    H --> J["Verdict + Confidence"]

    I --> K["Agent 3: Portfolio Insights"]
    J --> K
    L["User Portfolio"] --> K

    K --> M["Agent 4: Tactical Recommendations"]
    M --> N["BUY / SELL / HOLD"]

    N --> O["Firestore Storage"]
    N --> P["JSON Response to Client"]
```

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 16, React 19, Tailwind CSS 4 | Server-rendered UI with modern styling |
| Backend | Go, Gin Framework | High-performance REST API server |
| AI/ML | Google ADK, Gemini 2.5 Flash | Multi-agent orchestration and LLM inference |
| Search | Vertex AI Search | Grounding agent responses with real sources |
| Database | Cloud Firestore | Document storage for articles and portfolios |
| Market Data | Alpaca Markets API | Real-time stock prices and benchmark data |
| Deployment | Docker, Google Cloud | Containerized deployment |

---

## Project Structure

```
fact-check/
├── client/                    # Next.js frontend
│   ├── src/
│   │   ├── app/               # Pages (analysis, portfolio)
│   │   ├── components/        # Reusable UI components
│   │   └── lib/               # API client
│   └── package.json
├── server/                    # Go backend
│   ├── cmd/
│   │   ├── api/               # Main server entry
│   │   ├── adk_demo/          # Interactive ADK demo
│   │   └── verify_agents/     # Agent verification script
│   ├── internal/
│   │   ├── agents/            # AI agent implementations
│   │   ├── api/               # HTTP handlers
│   │   ├── config/            # Environment configuration
│   │   ├── db/                # Firestore repositories
│   │   ├── models/            # Data models
│   │   └── services/          # External service clients
│   ├── docs/                  # API & setup documentation
│   └── go.mod
├── docs/
│   └── ARCHITECTURE.md        # This file
├── docker-compose.yml
└── README.md
```
