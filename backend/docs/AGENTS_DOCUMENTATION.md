# Agents Documentation

## Overview

The Autonomous Company Deep Research Agent system uses a modular agent architecture to conduct comprehensive research on any given query. Each agent has a specific role and responsibility, working together in a pipeline to gather, process, analyze, and report on information.

## Agents and Their Functions

### 1. Planner Agent

**File:** [`planner_agent.py`](agents/planner_agent.py)

**Function:** `planner_agent(query)`

**Purpose:** 
The Planner Agent creates a dynamic, tailored research plan based on the user's query using OpenAI's GPT-4o model. It generates specific, actionable steps that adapt to the nature of the research task (e.g., startup analysis, financial research, market evaluation).

**Key Features:**
- Generates dynamic plans using OpenAI's GPT-4o model
- Creates 6-10 focused, sequential research steps per query
- Tailors plans to specific research topics
- Handles JSON response parsing and validation
- Provides fallback default plan if OpenAI API fails
- Plans typically include steps for:
  - Searching and collecting relevant information
  - Analyzing company/topic details
  - Identifying competitors and market landscape
  - Evaluating business models and value propositions
  - Assessing market opportunities and risks
  - Generating investment theses and recommendations

**Input:** Query string
**Output:** List of research plan steps

---

### 2. Search Agent

**File:** [`search_agent.py`](agents/search_agent.py)

**Function:** `search_agent(query)`

**Purpose:**
The Search Agent performs web searches to find relevant URLs based on the research query. It uses BrightData's SERP service to fetch and parse search results.

**Key Features:**
- Uses BrightData's SERP API for search functionality
- Extracts organic search results from Google
- Targets specific Google search result containers for parsing
- Filters out Google's own pages and duplicate URLs
- Returns the top most relevant URLs

**Input:** Query string
**Output:** List of relevant URLs

---

### 3. Crawl Agent

**File:** [`crawl_agent.py`](agents/crawl_agent.py)

**Function:** `crawl_agent(url)`

**Purpose:**
The Crawl Agent fetches and extracts content from web pages. It visits each URL found by the Search Agent and retrieves the text content.

**Key Features:**
- Uses requests library to fetch web pages
- Parses HTML content using BeautifulSoup
- Extracts and cleans text content
- Handles timeouts and exceptions gracefully

**Input:** URL string
**Output:** Text content of the web page (up to 10,000 characters)

---

### 4. Reasoning Agent

**File:** [`reasoning_agent.py`](agents/reasoning_agent.py)

**Function:** `reasoning_agent(data, plan)`

**Purpose:**
The Reasoning Agent is the core analytical component. It processes the collected data using the research plan and generates structured insights using OpenAI's language model.

**Key Features:**
- Uses OpenAI's GPT model for analysis
- Follows the research plan to structure the analysis
- Extracts key information including:
  - Company summary
  - Founders
  - Competitors
  - Market opportunity
  - Risks
  - Investment thesis
- Includes citations to original sources
- Formats output as JSON
- Handles parsing errors gracefully

**Inputs:** 
- `data`: List of dictionaries with URL and content
- `plan`: Research plan steps from Planner Agent

**Output:** Structured JSON analysis with citations

---

### 5. VC Diligence Agent

**File:** [`vc_diligence_agent.py`](agents/vc_diligence_agent.py)

**Class:** `VCDiligenceAgent`

**Function:** `run(company, research_data)`

**Purpose:**
The VC Diligence Agent transforms raw research data into a structured VC-style diligence report using OpenAI's language model. It analyzes the research findings and generates a comprehensive report following standard VC investment analysis format.

**Key Features:**
- Uses OpenAI's GPT model for report generation
- Follows VC industry standard report structure
- Generates structured JSON output conforming to VCReport schema
- Includes complete report sections:
  - Executive Summary
  - Company Overview (mission, vision, founding story)
  - Product Description (features, value proposition)
  - Technology Stack (IP, innovation)
  - Business Model (revenue streams)
  - Market Analysis (TAM/SAM/SOM, growth rate, trends)
  - Competitive Landscape (key competitors, strengths/weaknesses, market share)
  - SWOT Analysis (strengths, weaknesses, opportunities, threats)
  - Management Team (key members, backgrounds)
  - Financial Analysis (revenue model, projections, expenses, funding history)
  - Traction & Milestones (users, revenue, partnerships)
  - Go-to-Market Strategy (sales, marketing, distribution)
  - Use of Funds (planned investment allocation)
  - Investment Thesis (compelling opportunity explanation)
  - Risks & Mitigation (business, technology, market, regulatory risks)
  - Exit Potential (acquisition, IPO, etc.)
- Handles JSON response parsing and validation
- Integrates with report generator for PDF and Markdown output

**Inputs:** 
- `company`: Name of the company to analyze
- `research_data`: Dictionary containing research plan and analysis results

**Output:** VCReport object (Pydantic model)

### 6. Report Generator

**File:** [`report_generator.py`](services/report_generator.py)

**Functions:** 
- `generate_report(report, output_format)`: Generates report in specified format
- `generate_markdown(report)`: Converts VCReport to Markdown
- `markdown_to_pdf(text, output_file)`: Converts Markdown to PDF

**Purpose:**
The Report Generator compiles structured report data into user-friendly formats (Markdown and PDF) for easy sharing and consumption.

**Key Features:**
- Generates reports in Markdown format for easy editing and sharing
- Converts Markdown to professional PDF reports
- Handles report styling and formatting
- Manages file creation and directory structure
- Supports both PDF and Markdown output formats
- Generates reports in `reports/` directory

**Inputs:**
- `report`: VCReport object containing structured report data
- `output_format`: Desired output format ("pdf" or "markdown")

**Output:** File path to the generated report

---

### 6. Report Generator

**File:** [`report_generator.py`](services/report_generator.py)

**Functions:** 
- `generate_report(report, output_format)`: Generates report in specified format
- `generate_markdown(report)`: Converts VCReport to Markdown
- `markdown_to_pdf(text, output_file)`: Converts Markdown to PDF

**Purpose:**
The Report Generator compiles structured report data into user-friendly formats (Markdown and PDF) for easy sharing and consumption.

**Key Features:**
- Generates reports in Markdown format for easy editing and sharing
- Converts Markdown to professional PDF reports
- Handles report styling and formatting
- Manages file creation and directory structure
- Supports both PDF and Markdown output formats

**Inputs:**
- `report`: VCReport object containing structured report data
- `output_format`: Desired output format ("pdf" or "markdown")

**Output:** File path to the generated report

---

## Research Pipeline

The agents work together in a sequential pipeline orchestrated by the `run_research` function in [`research_pipeline.py`](services/research_pipeline.py) and the `/generate-vc-report` endpoint in FastAPI:

```
1. Planner Agent -> Generates research plan
2. Search Agent -> Finds relevant URLs
3. Crawl Agent -> Extracts content from URLs
4. Reasoning Agent -> Analyzes content and generates insights
5. VC Diligence Agent -> Transforms insights into structured VC report
6. Report Generator -> Compiles final report in PDF or Markdown format
```

---

## Usage Example

```python
from services.research_pipeline import run_research

async def main():
    query = "OpenAI startup analysis"
    report = await run_research(query)
    print(report)

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
```

---

## Dependencies

- **requests**: For making HTTP requests
- **beautifulsoup4**: For HTML parsing
- **openai**: For accessing OpenAI's API
- **BrightData SERP API**: For search functionality

---

## Configuration

Agents require API keys and configuration settings defined in [`app/config.py`](app/config.py):

- `OPENAI_API_KEY`: OpenAI API key
- `OPENAI_MODEL`: OpenAI model to use (e.g., "gpt-4")
- BrightData API credentials (in environment variables)

---

## Error Handling

All agents include error handling mechanisms:

- Search Agent: Handles API errors from BrightData
- Crawl Agent: Handles timeouts and connection errors
- Reasoning Agent: Handles API errors and JSON parsing failures

---

## Extensibility

The modular architecture makes it easy to extend or replace agents:

- Add new agents for specific research tasks
- Modify existing agents to change behavior
- Replace the Reasoning Agent with a different LLM
- Implement alternative search or crawling mechanisms

---

### 7. Competitor Detection Agent

**File:** [`competitor_detection_agent.py`](agents/competitor_detection_agent.py)

**Function:** `competitor_detection_agent(data)`

**Purpose:**
The Competitor Detection Agent extracts competitor names from crawled data. It analyzes search results to identify companies that are competitors to the target company.

**Key Features:**
- Uses OpenAI's GPT model for competitor extraction
- Identifies company names that are competitors to the target company
- Focuses on names appearing in titles or snippets suggesting they are alternatives or similar companies
- Excludes the target company itself and generic terms like "alternatives", "competitors"
- Returns structured JSON with competitor names list

**Input:** 
- `data`: List of dictionaries with URL and content

**Output:** JSON object with competitor names:
```json
{
  "competitors": ["Competitor1", "Competitor2", "Competitor3"]
}
```

---

### 8. Founder Research Agent

**File:** [`founder_research_agent.py`](agents/founder_research_agent.py)

**Function:** `founder_research_agent(data)`

**Purpose:**
The Founder Research Agent extracts founder information from crawled data. It analyzes search results to identify founders, their LinkedIn profiles, education backgrounds, and other biographical information.

**Key Features:**
- Uses OpenAI's GPT model for founder information extraction
- Identifies founder names (people who founded the company)
- Extracts LinkedIn profiles of founders
- Captures education background of founders
- Returns structured JSON with founder details list

**Input:** 
- `data`: List of dictionaries with URL and content

**Output:** JSON object with founder details:
```json
{
  "founders": [
    {
      "name": "Founder Name",
      "linkedin": "LinkedIn URL or profile",
      "education": "Education background",
      "title": "Founder title/role"
    }
  ]
}
```

---

### 9. Hiring Signals Agent

**File:** [`hiring_signals_agent.py`](agents/hiring_signals_agent.py)

**Function:** `hiring_signals_agent(data)`

**Purpose:**
The Hiring Signals Agent extracts hiring information from crawled data. It analyzes search results to identify job postings, hiring trends, recruitment platforms being used, and other hiring-related signals.

**Key Features:**
- Uses OpenAI's GPT model for hiring signals extraction
- Identifies job postings and career pages
- Extracts specific roles being hired for (especially engineers)
- Identifies recruitment platforms being used (Greenhouse, Lever, etc.)
- Captures hiring locations and remote work policies
- Returns structured JSON with hiring signals details

**Input:** 
- `data`: List of dictionaries with URL and content

**Output:** JSON object with hiring signals:
```json
{
  "hiring_signals": [
    {
      "source": "Platform or source name (e.g., Greenhouse, Lever, Company Careers)",
      "roles": ["Role1", "Role2"],
      "locations": ["Location1", "Location2"],
      "remote_friendly": true/false,
      "posting_date": "Date if available",
      "url": "Link to job posting or career page"
    }
  ]
}
```

---

### 10. News Intelligence Agent

**File:** [`news_intelligence_agent.py`](agents/news_intelligence_agent.py)

**Function:** `news_intelligence_agent(data)`

**Purpose:**
The News Intelligence Agent extracts startup news from crawled data. It analyzes search results to identify recent news articles, product launches, funding announcements, partnerships, and other news about the company.

**Key Features:**
- Uses OpenAI's GPT model for news intelligence extraction
- Identifies recent news articles about the company
- Extracts product launches and updates
- Captures funding announcements
- Identifies partnerships and acquisitions
- Returns structured JSON with news articles list

**Input:** 
- `data`: List of dictionaries with URL and content

**Output:** JSON object with news articles:
```json
{
  "news": [
    {
      "title": "News headline or title",
      "source": "Publication or source name",
      "date": "Publication date if available",
      "summary": "Brief summary of the news",
      "url": "Link to the full article"
    }
  ]
}
```

---

### 11. Technology Stack Agent

**File:** [`technology_stack_agent.py`](agents/technology_stack_agent.py)

**Function:** `technology_stack_agent(data)`

**Purpose:**
The Technology Stack Agent extracts technology stack information from crawled data. It analyzes search results (particularly from GitHub) to identify programming languages, developer tools, frameworks, and other technologies used by the company.

**Key Features:**
- Uses OpenAI's GPT model for technology stack extraction
- Identifies programming languages used (e.g., Python, JavaScript, Java, Go, Rust)
- Extracts developer tools and frameworks (e.g., React, Django, AWS, Docker, Kubernetes)
- Captures databases and storage technologies
- Identifies DevOps and CI/CD tools
- Returns structured JSON with technology stack details

**Input:** 
- `data`: List of dictionaries with URL and content

**Output:** JSON object with technology stack:
```json
{
  "technology_stack": {
    "programming_languages": ["Language1", "Language2"],
    "developer_tools": ["Tool1", "Tool2", "Tool3"],
    "frameworks": ["Framework1", "Framework2"],
    "databases": ["Database1", "Database2"],
    "devops_tools": ["Tool1", "Tool2"],
    "other_technologies": ["Technology1", "Technology2"]
  }
}
```
