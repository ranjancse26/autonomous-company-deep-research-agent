# Autonomous Company Deep Research Agent

An AI-powered system that automates company research, providing comprehensive VC-style insights in minutes instead of days.

## Overview

The Autonomous Company Deep Research Agent is designed to revolutionize how companies and startups are researched. It automates the entire research process from planning and data collection to analysis and report generation, delivering detailed company analysis with verifiable sources.

### Problem Statement

Traditional company research is time-consuming and labor-intensive:
- Searching across multiple sources
- Reading and analyzing large volumes of unstructured data
- Synthesizing information into coherent reports
- Verifying sources and ensuring accuracy
- Updating reports as information changes

### Key Benefits

- **90% reduction in research time**: From days to minutes per company
- **10x increase in throughput**: Analyze 100+ companies per analyst per week
- **Consistent high-quality reports**: Standardized VC-style format with citations
- **Verifiable information**: Every piece of information includes source URLs
- **Comprehensive analysis**: Company background, founders, competitors, market analysis, risks, investment thesis
- **Cost efficiency**: 70% reduction in manual research costs

### Target Audience

- Venture capital firms and investors conducting due diligence
- Business development teams researching potential partners or acquisition targets
- Market analysts monitoring competitive landscapes
- Strategic planners requiring comprehensive market intelligence
- Startup founders analyzing competitors

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│                   http://localhost:3000                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (FastAPI)                        │
│                   http://localhost:8000                     │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Planner   │  │   Search    │  │      Crawler        │  │
│  │   Agent     │  │   Agent     │  │      Agent          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Reasoning  │  │   Report    │  │    VC Diligence     │  │
│  │   Agent     │  │   Agent     │  │      Agent          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      LLM Providers                          │
│            (OpenAI, Anthropic, Google Gemini)               │
├─────────────────────────────────────────────────────────────┤
│                    External Services                        │
│              (Bright Data SERP API, Web Crawling)           │
└─────────────────────────────────────────────────────────────┘
```

### How It Works

1. **Planner Agent**: Generates a tailored research plan for each query using an LLM
2. **Search Agent**: Finds relevant URLs using Bright Data's SERP API
3. **Crawl Agent**: Extracts content from web pages using BeautifulSoup
4. **Reasoning Agent**: Analyzes collected data and provides VC-style insights with citations
5. **Report Agent**: Compiles findings into structured reports
6. **VC Diligence Agent**: Generates comprehensive VC-style diligence reports in PDF or Markdown format

## Project Structure

```
.
├── backend/                  # FastAPI backend
│   ├── app/                  # API endpoints
│   │   ├── main.py           # FastAPI application
│   │   ├── config.py         # Configuration
│   │   └── schema.py         # Data models
│   ├── services/             # Core services
│   │   ├── research_pipeline.py
│   │   ├── brightdata_service.py
│   │   ├── report_generator.py
│   │   ├── founder_research_pipeline.py
│   │   ├── competitor_research_pipeline.py
│   │   ├── funding_research_pipeline.py
│   │   ├── hiring_signals_pipeline.py
│   │   ├── news_intelligence_pipeline.py
│   │   └── technology_stack_pipeline.py
│   ├── llm/                  # LLM providers
│   │   ├── factory.py
│   │   ├── openai_provider.py
│   │   ├── anthropic_provider.py
│   │   └── gemini_provider.py
│   ├── utils/                # Utilities
│   ├── test/                 # Tests
│   ├── docs/                 # Documentation
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/              # Next.js app router
│   │   ├── components/       # React components
│   │   ├── services/         # API service layer
│   │   └── types/            # TypeScript types
│   ├── public/               # Static assets
│   └── package.json          # Node.js dependencies
│
└── README.md                 # Readme file
```

## Features

- **AI-Powered Research**: Automated research with specialized agents
- **Multi-Source Data Collection**: Bright Data SERP API for web search
- **Web Crawling**: BeautifulSoup-based content extraction
- **Multi-LLM Support**: OpenAI, Anthropic, Google Gemini
- **VC-Style Reports**: Professional diligence reports in PDF/Markdown
- **Real-time Analysis**: Company background, founders, competitors
- **Funding Intelligence**: Investment rounds and amounts
- **Hiring Signals**: Job postings and growth indicators
- **News Intelligence**: Latest company news and updates
- **Technology Stack**: Technical infrastructure analysis

## Live Demo

Try the live demo: **https://company-deep-research-agent-app-production.up.railway.app/**

## Getting Started

### Prerequisites

- Python 3.12+
- Node.js 18+
- API keys for LLM providers (ex: OpenAI) and Bright Data

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure environment variables:
   Create a `.env` file:
   ```
   BRIGHTDATA_API_KEY=your_brightdata_api_key
   BRIGHTDATA_ZONE=serp_api1
   OPENAI_API_KEY=your_openai_api_key
   OPENAI_MODEL=gpt-4o-mini
   # Or use Anthropic/Google Gemini
   ANTHROPIC_API_KEY=your_anthropic_api_key
   GOOGLE_API_KEY=your_google_api_key
   ```

4. Run the backend:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   Create a `.env.local` file:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the frontend:
   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## API Endpoints

### POST /research

Initiates a research task with the given query.

```bash
curl -X POST "http://localhost:8000/research?query=Analyze startup Cursor AI"
```

### POST /generate-vc-report

Generates a VC-style diligence report in PDF or Markdown format.

```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Cursor AI", "format": "pdf"}'
```

## Tech Stack

### Backend
- **Framework**: FastAPI
- **LLM**: OpenAI, Anthropic Claude, Google Gemini
- **Data Collection**: Bright Data SERP API
- **Web Scraping**: BeautifulSoup4
- **PDF Generation**: ReportLab

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: React components

## Documentation

For more detailed documentation, see:
- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Architecture Documentation](backend/docs/ARCHITECTURE.md)
- [Technical Documentation](backend/docs/TECHNICAL_DOCUMENTATION.md)
- [User Guide](backend/docs/USER_GUIDE.md)
- [Agents Documentation](backend/docs/AGENTS_DOCUMENTATION.md)

## License

MIT
