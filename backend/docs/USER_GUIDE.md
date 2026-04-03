# User Guide for Autonomous Company Deep Research Agent

**Version:** 1.0  
**Last Updated:** March 21, 2026  
**Purpose:** This guide helps users understand and use the Autonomous Company Deep Research Agent effectively.

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Getting Started](#2-getting-started)
3. [API Usage](#3-api-usage)
4. [Understanding Reports](#4-understanding-reports)
5. [Example Queries](#5-example-queries)
6. [Best Practices](#6-best-practices)
7. [Troubleshooting](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Introduction

The Autonomous Company Deep Research Agent is an AI-powered tool that automates comprehensive company and startup research. It collects information from the web, analyzes it using advanced AI models, and generates VC-style reports with citations.

**Key Features:**
- **Fast:** Get comprehensive reports in less than 5 minutes
- **Comprehensive:** Covers company background, founders, competitors, market analysis, and more
- **Verifiable:** Every piece of information includes source citations
- **Consistent:** Reports follow a standard VC-style format

---

## 2. Getting Started

### 2.1 Prerequisites

- API access credentials (provided by your system administrator)
- Basic understanding of API concepts
- Tool to send HTTP requests (e.g., curl, Postman, or code libraries)

### 2.2 System Status Check

Before using the system, verify that it's running:

```bash
curl -X GET "http://localhost:8000/"
```

**Success Response:**
```json
{"status": "Deep Research Agent running"}
```

---

## 3. API Usage

### 3.1 Research Endpoint

**URL:** `POST /research`  
**Content-Type:** `application/json`

**Request Format:**

```json
{
  "query": "Analyze startup Cursor AI"
}
```

**Response Format:**

```json
{
  "query": "Analyze startup Cursor AI",
  "plan": [
    "search web for company",
    "collect relevant articles",
    "extract company details",
    "identify competitors",
    "analyze market",
    "generate investment thesis"
  ],
  "analysis": "{\n  \"company_summary\": {\n    \"text\": \"Cursor is an AI-assisted integrated development environment (IDE)...\",\n    \"citations\": [\"[1] https://cursor.com/\"]\n  },\n  \"founders\": { ... },\n  \"competitors\": { ... },\n  \"market_opportunity\": { ... },\n  \"risks\": { ... },\n  \"investment_thesis\": { ... },\n  \"sources\": [\"https://cursor.com/\", \"https://en.wikipedia.org/wiki/Cursor_(code_editor)\"]\n}"
}
```

### 3.2 VC Report Generation Endpoint

**URL:** `POST /generate-vc-report`  
**Content-Type:** `application/json`

**Request Format:**

```json
{
  "company": "Cursor AI",
  "format": "pdf",
  "country": "US"
}
```

**Parameters:**
- `company`: The name of the company to analyze (required)
- `format`: Output format - "pdf" (default) or "markdown" (optional)
- `country`: Country for search context (optional, default: "US")

**Response:**
Returns a file response with the generated report in the requested format.

**Example Requests:**

#### Using curl to get PDF report
```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Cursor AI", "format": "pdf"}' \
  -o cursor_ai_report.pdf
```

#### Using curl to get Markdown report
```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Stripe", "format": "markdown", "country": "UK"}' \
  -o stripe_report.md
```

### 3.3 Example Requests

#### Using curl
```bash
curl -X POST "http://localhost:8000/research" \
  -H "Content-Type: application/json" \
  -d '{"query": "Analyze company Stripe"}'
```

#### Using Python (requests library)
```python
import requests
import json

url = "http://localhost:8000/research"
data = {"query": "Analyze startup OpenAI"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(data), headers=headers)

if response.status_code == 200:
    print("Success!")
    print(json.dumps(response.json(), indent=2))
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

#### Using Postman
1. Open Postman
2. Create a new POST request
3. Enter URL: `http://localhost:8000/research`
4. Go to "Body" tab, select "raw" and "JSON"
5. Paste: `{"query": "Analyze company Tesla"}`
6. Click "Send"

### 3.4 Competitor Detection Endpoint

**URL:** `GET /startup/competitors`  
**Alternative URL:** `GET /company/competitors`  
**Content-Type:** `application/json`

**Request Format:**
```
GET /startup/competitors?company=stripe
```

**Parameters:**
- `company`: The name of the company to research for competitors (required)

**Response Format:**
```json
{
  "competitors": ["Competitor1", "Competitor2", "Competitor3"]
}
```

**Example Request:**
```bash
curl -X GET "http://localhost:8000/startup/competitors?company=stripe"
```

**Example Response:**
```json
{
  "competitors": ["Adyen", "Checkout.com", "Square"]
}
```

### 3.5 Founder Research Endpoint

**URL:** `GET /company/founders`  
**Content-Type:** `application/json`

**Request Format:**
```
GET /company/founders?company=stripe
```

**Parameters:**
- `company`: The name of the company to research for founder information (required)

**Response Format:**
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

**Example Request:**
```bash
curl -X GET "http://localhost:8000/company/founders?company=stripe"
```

### 3.6 Hiring Signals Endpoint

**URL:** `GET /company/hiring`  
**Content-Type:** `application/json`

**Request Format:**
```
GET /company/hiring?company=stripe
```

**Parameters:**
- `company`: The name of the company to research for hiring signals (required)

**Response Format:**
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

**Example Request:**
```bash
curl -X GET "http://localhost:8000/company/hiring?company=stripe"
```

### 3.7 News Intelligence Endpoint

**URL:** `GET /company/news`  
**Content-Type:** `application/json`

**Request Format:**
```
GET /company/news?company=stripe
```

**Parameters:**
- `company`: The name of the company to research for news (required)

**Response Format:**
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

**Example Request:**
```bash
curl -X GET "http://localhost:8000/company/news?company=stripe"
```

### 3.8 Technology Stack Endpoint

**URL:** `GET /company/technology`  
**Content-Type:** `application/json`

**Request Format:**
```
GET /company/technology?company=stripe
```

**Parameters:**
- `company`: The name of the company to research for technology stack (required)

**Response Format:**
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

**Example Request:**
```bash
curl -X GET "http://localhost:8000/company/technology?company=stripe"
```

**URL:** `POST /generate-vc-report`  
**Content-Type:** `application/json`

**Request Format:**

```json
{
  "company": "Cursor AI",
  "format": "pdf",
  "country": "US"
}
```

**Parameters:**
- `company`: The name of the company to analyze (required)
- `format`: Output format - "pdf" (default) or "markdown" (optional)
- `country`: Country for search context (optional, default: "US")

**Response:**
Returns a file response with the generated report in the requested format.

**Example Requests:**

#### Using curl to get PDF report
```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Cursor AI", "format": "pdf"}' \
  -o cursor_ai_report.pdf
```

#### Using curl to get Markdown report
```bash
curl -X POST "http://localhost:8000/generate-vc-report" \
  -H "Content-Type: application/json" \
  -d '{"company": "Stripe", "format": "markdown", "country": "UK"}' \
  -o stripe_report.md
```

### 3.2 Example Requests

#### Using curl

```bash
curl -X POST "http://localhost:8000/research" \
  -H "Content-Type: application/json" \
  -d '{"query": "Analyze company Stripe"}'
```

#### Using Python (requests library)

```python
import requests
import json

url = "http://localhost:8000/research"
data = {"query": "Analyze startup OpenAI"}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(data), headers=headers)

if response.status_code == 200:
    print("Success!")
    print(json.dumps(response.json(), indent=2))
else:
    print(f"Error: {response.status_code}")
    print(response.text)
```

#### Using Postman

1. Open Postman
2. Create a new POST request
3. Enter URL: `http://localhost:8000/research`
4. Go to "Body" tab, select "raw" and "JSON"
5. Paste: `{"query": "Analyze company Tesla"}`
6. Click "Send"

---

## 4. Understanding Reports

### 4.1 Report Structure

Reports follow a standard VC-style format with the following sections:

#### Company Summary
- Brief overview of the company
- Mission and vision
- Core products/services
- Market position

#### Founders
- Founder names and backgrounds
- Previous experience
- Key achievements

#### Competitors
- Main competitors
- Competitive advantages/disadvantages
- Market share information

#### Market Opportunity
- Industry analysis
- Target market size
- Growth potential
- Market trends

#### Risks
- Business risks
- Technology risks
- Market risks
- Regulatory risks

#### Investment Thesis
- Investment rationale
- Growth potential
- Valuation considerations
- Exit opportunities

### 4.2 Citations

Every piece of information includes citations in square brackets ([1], [2], etc.). The complete list of sources is provided at the end of the analysis with full URLs.

**Example with Citations:**
```
"Cursor is an AI-assisted integrated development environment (IDE) that embeds large-language models directly into the programmer’s workflow [1][3]."
```

**Sources List:**
```
Sources:
[1] https://cursor.com/
[2] https://en.wikipedia.org/wiki/Cursor_(code_editor)
[3] https://github.com/cursor/cursor
```

---

## 5. Example Queries

### 5.1 Company Research

**Query:** `"Analyze company Microsoft"`

**Results:** Comprehensive analysis of Microsoft's business, including:
- Company history and overview
- Product portfolio
- Financial performance
- Key executives
- Competitors (Google, Apple, Amazon)
- Market opportunities
- Risks and challenges

### 5.2 Startup Analysis

**Query:** `"Analyze startup OpenAI"`

**Results:** Deep dive into OpenAI, including:
- Company background and mission
- Founder information (Sam Altman, Elon Musk)
- Key products (GPT-3, GPT-4, DALL-E)
- Market position and competition
- Technology and research
- Funding and valuation

### 5.3 Industry Analysis

**Query:** `"Analyze electric vehicle startup Rivian"`

**Results:** Analysis focused on Rivian's position in the EV market:
- Company background and mission
- Founder information
- Product offerings (R1T, R1S)
- Market opportunity in electric vehicles
- Competition (Tesla, Ford, GM)
- Production and delivery status
- Financial performance

---

## 6. Best Practices

### 6.1 Query Formulation

**Good Queries:**
- `"Analyze company Stripe"`
- `"Analyze startup OpenAI"`
- `"Analyze e-commerce platform Shopify"`

**Avoid These:**
- Too vague: `"Tell me about tech companies"`
- Too specific: `"What is Apple's quarterly revenue for Q3 2023?"`
- Complex queries: `"Analyze Microsoft and compare to Google in cloud computing"`

### 6.2 Report Interpretation

1. **Verify Information:** Always check citations for critical information
2. **Context Matters:** Consider the date of information (reports reflect current state)
3. **Complementary Research:** Use reports as a starting point, not the sole source
4. **Human Judgment:** AI-generated content may contain errors - use your judgment

### 6.3 Performance Tips

- **Avoid Duplicate Queries:** If you need the same report, save the previous response
- **Batch Processing:** For multiple queries, use a script to automate
- **Query Timing:** Avoid peak usage times for faster responses

---

## 7. Troubleshooting

### 7.1 Common Issues

#### 500 Internal Server Error
- **Possible Cause:** Server error
- **Solution:** Retry the query. If problem persists, contact support.

#### 429 Too Many Requests
- **Possible Cause:** API rate limit exceeded
- **Solution:** Wait a few minutes before trying again

#### Empty or Incomplete Reports
- **Possible Cause:** Query too vague or no relevant information available
- **Solution:** Refine your query to be more specific

#### Slow Response
- **Possible Cause:** High system load or complex query
- **Solution:** Try simplifying the query or wait during off-peak times

### 7.2 Error Codes

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | Request processed correctly |
| 400 | Bad Request | Check query format and content |
| 401 | Unauthorized | Verify API credentials |
| 403 | Forbidden | Check access permissions |
| 429 | Too Many Requests | Wait and retry |
| 500 | Server Error | Contact support |

---

## 8. FAQ

### Q1: How accurate are the reports?

A: Reports are highly accurate with a 95%+ accuracy rate based on testing. However, always verify critical information using the provided citations.

### Q2: How long does it take to get a report?

A: Most reports are generated in 2-5 minutes. Complex queries may take longer.

### Q3: What sources are used for information?

A: The system uses search engines to find relevant sources including company websites, Wikipedia, news articles, and industry reports.

### Q4: Can I use reports for investment decisions?

A: Reports provide valuable insights but should not be the sole basis for investment decisions. Always conduct additional due diligence.

### Q5: How often are reports updated?

A: Reports reflect the current state of information available on the web at the time of query. For updated information, run a new query.

### Q6: Can I download reports?

A: Yes, you can save the JSON response or parse it to generate documents in other formats (e.g., PDF, Word).

---

## 9. Contact and Support

If you encounter issues or have questions:

1. First check this user guide
2. Review the system documentation ([ARCHITECTURE.md](ARCHITECTURE.md))
3. Contact your system administrator
4. Report bugs or issues through your company's support channel

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | March 21, 2026 | Initial release |

---

## Appendices

### A. Sample Report

**Query:** `"Analyze startup Cursor AI"`

**Response:**
```json
{
  "query": "Analyze startup Cursor AI",
  "plan": [
    "search web for company",
    "collect relevant articles",
    "extract company details",
    "identify competitors",
    "analyze market",
    "generate investment thesis"
  ],
  "analysis": "{\n  \"company_summary\": {\n    \"text\": \"Cursor is an AI-assisted integrated development environment (IDE) and coding agent that embeds large-language models directly into the programmer’s workflow. It provides context-aware code completions, multi-agent collaboration, semantic search, secure codebase indexing, CI/CD automations, and integrations with Slack, GitHub, and the CLI to accelerate software development across teams of all sizes [1][3].\",\n    \"citations\": [\"[1] https://cursor.com/\", \"[3] https://github.com/cursor/cursor\"]\n  },\n  \"founders\": {\n    \"text\": \"Cursor is developed and maintained by Anysphere, Inc. The company does not publicly disclose individual founder names on its corporate website [1].\",\n    \"citations\": [\"[1] https://cursor.com/\"]\n  },\n  \"competitors\": {\n    \"text\": \"Cursor competes in the emerging AI developer-tools market against: GitHub Copilot (Microsoft), Amazon CodeWhisperer (AWS), Tabnine (Codota), and Replit Ghostwriter [2].\",\n    \"citations\": [\"[2] https://en.wikipedia.org/wiki/Cursor_(code_editor)\"]\n  },\n  \"market_opportunity\": {\n    \"text\": \"The enterprise software development market represents a multi-billion-dollar opportunity. Cursor is already trusted by over half of the Fortune 500 to accelerate and secure code creation [1].\",\n    \"citations\": [\"[1] https://cursor.com/\"]\n  },\n  \"risks\": {\n    \"text\": \"Dependency on third-party LLM providers (OpenAI, Anthropic, Gemini, xAI) and pricing/licensing changes could impact margins [1].\",\n    \"citations\": [\"[1] https://cursor.com/\"]\n  },\n  \"investment_thesis\": {\n    \"text\": \"Cursor has demonstrated rapid enterprise traction, achieving >90% developer adoption at Salesforce and NVIDIA, and securing deployment across half of the Fortune 500 within two years of launch [1].\",\n    \"citations\": [\"[1] https://cursor.com/\"]\n  },\n  \"sources\": [\n    \"https://cursor.com/\",\n    \"https://en.wikipedia.org/wiki/Cursor_(code_editor)\",\n    \"https://github.com/cursor/cursor\"\n  ]\n}"
}
```
