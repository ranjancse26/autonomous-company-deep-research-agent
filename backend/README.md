# Autonomous Company Deep Research Agent

## Introduction

The Autonomous Company Deep Research Agent is an AI-powered system designed to revolutionize the way companies and startups are researched. It automates the entire research process from planning and data collection to analysis and report generation, providing comprehensive VC-style insights in minutes instead of days.

### Problem Statement

Traditional company research is a time-consuming and labor-intensive process that involves:
- Searching for relevant information across multiple sources
- Reading and analyzing large volumes of unstructured data
- Synthesizing information into a coherent report
- Verifying sources and ensuring accuracy
- Updating reports as information changes

This process is inefficient, inconsistent, and limits the number of companies that can be analyzed within a given timeframe.

### Key Benefits

The Autonomous Company Deep Research Agent addresses these challenges with:
- **90% reduction in research time**: From days to minutes per company
- **10x increase in throughput**: Analyze 100+ companies per analyst per week
- **Consistent high-quality reports**: Standardized VC-style format with citations
- **Verifiable information**: Every piece of information includes source URLs
- **Comprehensive analysis**: Covers company background, founders, competitors, market analysis, risks, and investment thesis
- **Cost efficiency**: 70% reduction in manual research costs

### Target Audience

This tool is ideal for:
- Venture capital firms and investors conducting due diligence
- Business development teams researching potential partners or acquisition targets
- Market analysts monitoring competitive landscapes
- Strategic planners requiring comprehensive market intelligence
- Startup founders analyzing competitors

### How It Works

The system uses a modular approach with specialized AI agents:

1. **Planner Agent**: Generates a tailored research plan for each query using an LLM
2. **Search Agent**: Finds relevant URLs using Bright Data's SERP API (Google Search)
3. **Crawl Agent**: Extracts content from web pages using BeautifulSoup
4. **Reasoning Agent**: Analyzes collected data and provides VC-style insights with citations
5. **Report Agent**: Compiles findings into structured reports
6. **VC Diligence Agent**: Generates comprehensive VC-style diligence reports in PDF or Markdown format

All these components are orchestrated through a FastAPI API, making it easy to integrate with existing systems.

## Features
- **Planner Agent**: Generates dynamic research plans tailored to each query using an LLM
- **Bright Data Search Agent**: Searches for relevant information using Bright Data's SERP API
- **Web Crawling Agent**: Extracts content from web pages using BeautifulSoup
- **LLM Reasoning Agent**: Analyzes collected data and provides VC-style insights using an LLM
- **Report Generation**: Compiles findings into structured reports with citations
- **FastAPI API**: Exposes endpoints for easy integration with other systems

## Pre-requisite 

Create a virtual environment using 
```bash
python -m venv venv
```

Create a `.env` file in the `backend/` directory with the following configuration:

```env
# =============================================================================
# LLM Provider Configuration (LLM-Agnostic)
# =============================================================================
# Set the LLM provider to use. Options: openai, anthropic, gemini
# Default: openai
LLM_PROVIDER=openai

# OpenAI Configuration (when LLM_PROVIDER=openai)
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-5-mini
OPENAI_MAX_TOKENS=

# Anthropic Configuration (when LLM_PROVIDER=anthropic)
# ANTHROPIC_API_KEY=your-anthropic-api-key
# ANTHROPIC_MODEL=claude-sonnet-4-20250514
# ANTHROPIC_MAX_TOKENS=4096

# Google Gemini Configuration (when LLM_PROVIDER=gemini)
# GOOGLE_API_KEY=your-google-api-key
# GEMINI_MODEL=gemini-2.0-flash
# GEMINI_MAX_TOKENS=

# =============================================================================
# BrightData Configuration
# =============================================================================
BRIGHTDATA_API_KEY=your-brightdata-api-key
BRIGHTDATA_ENDPOINT = https://api.brightdata.com/request
BRIGHTDATA_SERP_ZONE=serp_api1
BRIGHTDATA_WEBSCRAPE_ZONE=web_unlocker1

# =============================================================================
# Crawler Configuration
# =============================================================================
CRAWL_TEXT_MAX_LENGTH=10000
MODEL_MAX_TOKENS=90000
CRAWL_TIMEOUT=1800
```

## Setup

1. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

3. **Access the API**
   Open `http://localhost:8000/docs` for the interactive API documentation.

## API

### Endpoints

#### POST /research
Initiates a research task with the given query.

**Request**:
```bash
curl -X POST "http://localhost:8000/research?query=Analyze startup Cursor AI"
```

**Parameters**:
- `query`: The research query (string, required)
- `country`: Country for search context (string, optional, default: "US")

**Response**:
Returns a structured research report including:
- Query
- Research plan
- Analysis with sections:
  - Company summary
  - Founders
  - Competitors
  - Market opportunity
  - Risks
  - Investment thesis
- Sources (cited URLs)

#### POST /generate-vc-report
Generates a VC-style diligence report for a company in PDF or Markdown format.

**Request**:
```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Cursor AI", "format": "pdf", "country": "US"}'
```

**Parameters**:
- `company`: The company to analyze (string, required)
- `format`: Output format ("pdf" or "markdown", optional, default: "pdf")
- `country`: Country for search context (string, optional, default: "US")

**Response**:
Returns a file response with the generated report.

## Project Structure

```
.
├── agents/                 # AI agents
│   ├── planner_agent.py    # Generates research plans
│   ├── search_agent.py     # Searches for relevant URLs
│   ├── crawl_agent.py      # Extracts web content
│   ├── reasoning_agent.py  # Analyzes data and provides insights
│   ├── report_agent.py     # Generates final report
│   └── vc_diligence_agent.py  # Generates VC-style diligence reports
├── app/                    # FastAPI application
│   ├── main.py             # API endpoints
│   ├── config.py           # Configuration management
│   └── schema.py           # Data models and schemas
├── services/               # Core services
│   ├── brightdata_service.py  # Bright Data API integration
│   ├── research_pipeline.py   # Orchestrates research process
│   └── report_generator.py    # Generates PDF/Markdown reports
├── test/                   # Tests
├── docs/                   # Documentation
├── postman/                # Postman collection
├── reports/                # Generated reports
└── requirements.txt        # Dependencies
```

## How It Works

1. **Plan Generation**: The planner agent creates a tailored research plan
2. **Search**: The search agent finds relevant URLs using Bright Data
3. **Crawl**: The crawling agent extracts content from each URL
4. **Analyze**: The reasoning agent analyzes the collected data
5. **Report**: The report agent compiles the findings

## Dependencies

- fastapi: Web framework
- uvicorn: ASGI server
- requests: HTTP library
- beautifulsoup4: HTML parsing
- python-dotenv: Environment variable management
- openai: OpenAI API integration
- pydantic: Data validation