# Test Cases for Autonomous Company Deep Research Agent

**Version:** 1.0  
**Last Updated:** March 21, 2026  
**Purpose:** This document contains comprehensive test cases for the Autonomous Company Deep Research Agent, covering all core functionalities, API endpoints, and business requirements.

---

## Table of Contents

1. [Test Strategy](#1-test-strategy)
2. [Test Environment](#2-test-environment)
3. [Test Categories](#3-test-categories)
4. [API Endpoint Tests](#4-api-endpoint-tests)
5. [Core Functionality Tests](#5-core-functionality-tests)
6. [Report Generation Tests](#6-report-generation-tests)
7. [Edge Cases and Error Handling](#7-edge-cases-and-error-handling)
8. [Performance and Load Tests](#8-performance-and-load-tests)
9. [Security Tests](#9-security-tests)
10. [Test Data](#10-test-data)
11. [Test Execution](#11-test-execution)
12. [Defect Management](#12-defect-management)

---

## 1. Test Strategy

### 1.1 Overall Approach
- **Functional Testing:** Verify all business requirements are met
- **API Testing:** Validate all endpoints and their responses
- **Integration Testing:** Test interactions between components (agents, services, API)
- **Performance Testing:** Ensure system meets response time and throughput targets
- **Security Testing:** Verify authentication, authorization, and data protection
- **Regression Testing:** Ensure changes don't break existing functionality

### 1.2 Test Levels
- **Unit Tests:** Test individual functions/methods
- **Integration Tests:** Test component interactions
- **System Tests:** Test end-to-end functionality
- **User Acceptance Tests (UAT):** Validate system against business requirements

---

## 2. Test Environment

### 2.1 Test Bed Configuration
- **Operating System:** Windows 10 / Ubuntu 20.04+
- **Python Version:** 3.10+
- **Dependencies:** All packages from requirements.txt
- **API Server:** Uvicorn
- **Database:** None (current version)
- **Storage:** Local file system for reports

### 2.2 Environment Variables
```env
BRIGHTDATA_API_KEY=test_brightdata_api_key
BRIGHTDATA_ZONE=serp_api1
OPENAI_API_KEY=test_openai_api_key
OPENAI_MODEL=gpt-4o
```

---

## 3. Test Categories

| Category | Description |
|----------|-------------|
| API Tests | Validate all API endpoints |
| Core Functionality | Test planning, search, crawl, and analysis agents |
| Report Generation | Test report creation in JSON, PDF, and Markdown formats |
| Edge Cases | Test invalid inputs, empty responses, and error conditions |
| Performance | Test response time, throughput, and scalability |
| Security | Test authentication, authorization, and data protection |

---

## 4. API Endpoint Tests

### 4.1 Health Check Endpoint (GET /)

#### Test Case 4.1.1: Valid Health Check
- **Test ID:** TC-API-001
- **Test Scenario:** Verify that the health check endpoint returns a valid response
- **Test Steps:**
  1. Send GET request to / endpoint
  2. Verify response status code is 200
  3. Verify response contains "status" field with value "Deep Research Agent running"
- **Expected Result:** 
  - Status Code: 200 OK
  - Response Body: `{"status": "Deep Research Agent running"}`
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 4.1.2: Health Check with Invalid Method
- **Test ID:** TC-API-002
- **Test Scenario:** Verify that invalid HTTP methods for health check are rejected
- **Test Steps:**
  1. Send POST request to / endpoint
  2. Verify response status code is 405 Method Not Allowed
- **Expected Result:** 
  - Status Code: 405 Method Not Allowed
- **Priority:** Should Have
- **Type:** Negative

### 4.2 Research Endpoint (POST /research)

#### Test Case 4.2.1: Valid Company Research Query
- **Test ID:** TC-API-003
- **Test Scenario:** Test research endpoint with valid company query
- **Test Steps:**
  1. Send POST request to /research with {"query": "Analyze company Microsoft"}
  2. Verify response status code is 200
  3. Verify response contains "query", "plan", and "analysis" fields
  4. Verify plan contains 6-10 research steps
  5. Verify analysis contains company_summary, founders, competitors, market_opportunity, risks, and investment_thesis sections
  6. Verify all sections contain text and citations
- **Expected Result:** 
  - Status Code: 200 OK
  - Valid structured response with all required fields
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 4.2.2: Valid Startup Research Query
- **Test ID:** TC-API-004
- **Test Scenario:** Test research endpoint with valid startup query
- **Test Steps:**
  1. Send POST request to /research with {"query": "Analyze startup OpenAI"}
  2. Verify response status code is 200
  3. Verify response contains all required fields
- **Expected Result:** 
  - Status Code: 200 OK
  - Valid structured response
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 4.2.3: Research with Country Parameter
- **Test ID:** TC-API-005
- **Test Scenario:** Test research endpoint with country parameter
- **Test Steps:**
  1. Send POST request to /research with {"query": "Analyze company Spotify", "country": "SE"}
  2. Verify response status code is 200
- **Expected Result:** 
  - Status Code: 200 OK
- **Priority:** Should Have
- **Type:** Positive

#### Test Case 4.2.4: Empty Query
- **Test ID:** TC-API-006
- **Test Scenario:** Test research endpoint with empty query
- **Test Steps:**
  1. Send POST request to /research with {"query": ""}
  2. Verify response status code is 400 Bad Request
- **Expected Result:** 
  - Status Code: 400 Bad Request
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 4.2.5: Very Long Query
- **Test ID:** TC-API-007
- **Test Scenario:** Test research endpoint with excessively long query
- **Test Steps:**
  1. Send POST request with query longer than 500 characters
  2. Verify response status code is appropriate (400 Bad Request)
- **Expected Result:** 
  - Status Code: 400 Bad Request
- **Priority:** Should Have
- **Type:** Negative

### 4.3 VC Report Generation Endpoint (POST /generate-vc-report)

#### Test Case 4.3.1: Generate PDF Report
- **Test ID:** TC-API-008
- **Test Scenario:** Test generating a VC report in PDF format
- **Test Steps:**
  1. Send POST request to /generate-vc-report with {"company": "Microsoft", "format": "pdf"}
  2. Verify response status code is 200
  3. Verify response Content-Type is application/pdf
  4. Verify response contains a valid PDF file
- **Expected Result:** 
  - Status Code: 200 OK
  - Valid PDF file response
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 4.3.2: Generate Markdown Report
- **Test ID:** TC-API-009
- **Test Scenario:** Test generating a VC report in Markdown format
- **Test Steps:**
  1. Send POST request to /generate-vc-report with {"company": "OpenAI", "format": "markdown"}
  2. Verify response status code is 200
  3. Verify response Content-Type is text/markdown
  4. Verify response contains valid Markdown content
- **Expected Result:** 
  - Status Code: 200 OK
  - Valid Markdown file response
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 4.3.3: Report Generation with Country Parameter
- **Test ID:** TC-API-010
- **Test Scenario:** Test report generation with country parameter
- **Test Steps:**
  1. Send POST request with {"company": "Spotify", "format": "pdf", "country": "SE"}
  2. Verify response status code is 200
  3. Verify response contains a valid PDF file
- **Expected Result:** 
  - Status Code: 200 OK
- **Priority:** Should Have
- **Type:** Positive

#### Test Case 4.3.4: Report Generation without Company Parameter
- **Test ID:** TC-API-011
- **Test Scenario:** Test report generation without company parameter
- **Test Steps:**
  1. Send POST request without company parameter
  2. Verify response status code is 422 Unprocessable Entity
- **Expected Result:** 
  - Status Code: 422 Unprocessable Entity
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 4.3.5: Report Generation with Invalid Format
- **Test ID:** TC-API-012
- **Test Scenario:** Test report generation with invalid format parameter
- **Test Steps:**
  1. Send POST request with {"company": "Microsoft", "format": "docx"}
  2. Verify response status code is 400 Bad Request or 422 Unprocessable Entity
- **Expected Result:** 
  - Status Code: 400 Bad Request or 422 Unprocessable Entity
- **Priority:** Should Have
- **Type:** Negative

---

## 5. Core Functionality Tests

### 5.1 Planner Agent Tests

#### Test Case 5.1.1: Generate Research Plan for Company Query
- **Test ID:** TC-AGENT-001
- **Test Scenario:** Verify planner agent generates a valid research plan for company query
- **Test Steps:**
  1. Call planner_agent with "Analyze company Microsoft"
  2. Verify plan contains 6-10 specific steps
  3. Verify plan includes steps for search, data collection, analysis, etc.
- **Expected Result:** 
  - Valid research plan with 6-10 steps
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 5.1.2: Generate Research Plan for Startup Query
- **Test ID:** TC-AGENT-002
- **Test Scenario:** Verify planner agent generates a valid research plan for startup query
- **Test Steps:**
  1. Call planner_agent with "Analyze startup OpenAI"
  2. Verify plan contains 6-10 specific steps
- **Expected Result:** 
  - Valid research plan with 6-10 steps
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 5.1.3: Planner Agent Fallback Mechanism
- **Test ID:** TC-AGENT-003
- **Test Scenario:** Test planner agent fallback mechanism when API fails
- **Test Steps:**
  1. Simulate OpenAI API failure
  2. Call planner_agent with any query
  3. Verify fallback plan is returned
- **Expected Result:** 
  - Fallback plan with default research steps
- **Priority:** Should Have
- **Type:** Negative

### 5.2 Search Agent Tests

#### Test Case 5.2.1: Search for Valid Company
- **Test ID:** TC-AGENT-004
- **Test Scenario:** Verify search agent finds relevant URLs for valid company
- **Test Steps:**
  1. Call search_agent with "Microsoft"
  2. Verify at least 3 valid URLs are returned
  3. Verify URLs include company website, Wikipedia, etc.
- **Expected Result:** 
  - 5+ valid URLs from reputable sources
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 5.2.2: Search for Non-Existent Company
- **Test ID:** TC-AGENT-005
- **Test Scenario:** Test search agent with non-existent company name
- **Test Steps:**
  1. Call search_agent with "NonExistentCompany123"
  2. Verify empty result or appropriate error handling
- **Expected Result:** 
  - Empty list or handled exception
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 5.2.3: Search Agent Source Filtering
- **Test ID:** TC-AGENT-006
- **Test Scenario:** Verify search agent filters out low-quality sources
- **Test Steps:**
  1. Call search_agent with "Microsoft"
  2. Verify no spam sites or irrelevant sources are in results
- **Expected Result:** 
  - All URLs are from reputable sources (company website, Wikipedia, news outlets)
- **Priority:** Should Have
- **Type:** Positive

### 5.3 Crawl Agent Tests

#### Test Case 5.3.1: Crawl Valid URL
- **Test ID:** TC-AGENT-007
- **Test Scenario:** Verify crawl agent extracts content from valid URL
- **Test Steps:**
  1. Call crawl_agent with "https://microsoft.com"
  2. Verify extracted text contains relevant company information
  3. Verify text is less than 10,000 characters
- **Expected Result:** 
  - Valid text content extracted from URL
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 5.3.2: Crawl Invalid URL
- **Test ID:** TC-AGENT-008
- **Test Scenario:** Test crawl agent with invalid URL
- **Test Steps:**
  1. Call crawl_agent with "invalid_url"
  2. Verify empty string is returned
- **Expected Result:** 
  - Empty string returned without exception
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 5.3.3: Crawl Non-Responsive URL
- **Test ID:** TC-AGENT-009
- **Test Scenario:** Test crawl agent with non-responsive URL
- **Test Steps:**
  1. Call crawl_agent with "http://example.invalid"
  2. Verify empty string is returned within 10 seconds
- **Expected Result:** 
  - Empty string returned within timeout
- **Priority:** Should Have
- **Type:** Negative

### 5.4 Reasoning Agent Tests

#### Test Case 5.4.1: Analyze Valid Research Data
- **Test ID:** TC-AGENT-010
- **Test Scenario:** Verify reasoning agent analyzes collected data
- **Test Steps:**
  1. Collect valid research data for Microsoft
  2. Call reasoning_agent with data and plan
  3. Verify analysis contains all required sections
  4. Verify all information includes citations
- **Expected Result:** 
  - Structured analysis with citations
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 5.4.2: Analyze Empty Data
- **Test ID:** TC-AGENT-011
- **Test Scenario:** Test reasoning agent with empty data
- **Test Steps:**
  1. Call reasoning_agent with empty data list
  2. Verify appropriate error handling or empty analysis
- **Expected Result:** 
  - Handled exception or empty analysis
- **Priority:** Should Have
- **Type:** Negative

---

## 6. Report Generation Tests

### 6.1 JSON Report Generation

#### Test Case 6.1.1: Generate Valid JSON Report
- **Test ID:** TC-REPORT-001
- **Test Scenario:** Verify report generator produces valid JSON
- **Test Steps:**
  1. Generate a research report
  2. Verify report is valid JSON
  3. Verify all required fields are present
- **Expected Result:** 
  - Valid JSON report with all fields
- **Priority:** Must Have
- **Type:** Positive

### 6.2 Markdown Report Generation

#### Test Case 6.2.1: Generate Valid Markdown Report
- **Test ID:** TC-REPORT-002
- **Test Scenario:** Verify Markdown report generation
- **Test Steps:**
  1. Generate a VC report in Markdown format
  2. Verify content follows Markdown syntax
  3. Verify report includes all sections
- **Expected Result:** 
  - Valid Markdown file with proper formatting
- **Priority:** Must Have
- **Type:** Positive

### 6.3 PDF Report Generation

#### Test Case 6.3.1: Generate Valid PDF Report
- **Test ID:** TC-REPORT-003
- **Test Scenario:** Verify PDF report generation
- **Test Steps:**
  1. Generate a VC report in PDF format
  2. Verify PDF file is valid and readable
  3. Verify report includes all sections with proper formatting
- **Expected Result:** 
  - Valid PDF file with professional formatting
- **Priority:** Must Have
- **Type:** Positive

#### Test Case 6.3.2: PDF Report Formatting
- **Test ID:** TC-REPORT-004
- **Test Scenario:** Verify PDF report formatting
- **Test Steps:**
  1. Generate a PDF report
  2. Verify report includes:
     - Company name as header
     - Section headers
     - Page numbers
     - Table of contents (if included)
- **Expected Result:** 
  - Professionally formatted PDF
- **Priority:** Should Have
- **Type:** Positive

---

## 7. Edge Cases and Error Handling

### 7.1 Invalid API Keys

#### Test Case 7.1.1: Invalid BrightData API Key
- **Test ID:** TC-ERROR-001
- **Test Scenario:** Test system behavior with invalid BrightData API key
- **Test Steps:**
  1. Configure system with invalid BrightData API key
  2. Send a research query
  3. Verify error is handled appropriately
- **Expected Result:** 
  - User-friendly error message
  - System continues to function
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 7.1.2: Invalid OpenAI API Key
- **Test ID:** TC-ERROR-002
- **Test Scenario:** Test system behavior with invalid OpenAI API key
- **Test Steps:**
  1. Configure system with invalid OpenAI API key
  2. Send a research query
  3. Verify error is handled appropriately
- **Expected Result:** 
  - User-friendly error message
  - System continues to function
- **Priority:** Should Have
- **Type:** Negative

### 7.2 API Rate Limiting

#### Test Case 7.2.1: BrightData API Rate Limit
- **Test ID:** TC-ERROR-003
- **Test Scenario:** Test system behavior when BrightData API rate limit is exceeded
- **Test Steps:**
  1. Simulate BrightData API rate limit
  2. Send research queries
  3. Verify system implements retry logic or queueing
- **Expected Result:** 
  - System handles rate limit gracefully
- **Priority:** Should Have
- **Type:** Negative

#### Test Case 7.2.2: OpenAI API Rate Limit
- **Test ID:** TC-ERROR-004
- **Test Scenario:** Test system behavior when OpenAI API rate limit is exceeded
- **Test Steps:**
  1. Simulate OpenAI API rate limit
  2. Send research queries
  3. Verify system implements retry logic or queueing
- **Expected Result:** 
  - System handles rate limit gracefully
- **Priority:** Should Have
- **Type:** Negative

### 7.3 Empty Search Results

#### Test Case 7.3.1: No Search Results
- **Test ID:** TC-ERROR-005
- **Test Scenario:** Test system behavior when search returns no results
- **Test Steps:**
  1. Search for a very obscure company name
  2. Verify system handles empty results appropriately
- **Expected Result:** 
  - User-friendly message indicating no results
- **Priority:** Should Have
- **Type:** Negative

### 7.4 Network Failures

#### Test Case 7.4.1: Network Connectivity Loss
- **Test ID:** TC-ERROR-006
- **Test Scenario:** Test system behavior during network failure
- **Test Steps:**
  1. Simulate network connectivity loss during research
  2. Verify system recovers or fails gracefully
- **Expected Result:** 
  - System handles failure gracefully
- **Priority:** Should Have
- **Type:** Negative

---

## 8. Performance and Load Tests

### 8.1 Response Time Tests

#### Test Case 8.1.1: Research Response Time
- **Test ID:** TC-PERF-001
- **Test Scenario:** Measure response time for research endpoint
- **Test Steps:**
  1. Send 10 consecutive requests to /research
  2. Measure response time for each request
  3. Calculate average response time
- **Expected Result:** 
  - Average response time < 5 minutes
- **Priority:** Must Have
- **Type:** Performance

#### Test Case 8.1.2: VC Report Generation Time
- **Test ID:** TC-PERF-002
- **Test Scenario:** Measure VC report generation time
- **Test Steps:**
  1. Send 5 consecutive requests to /generate-vc-report
  2. Measure response time for each request
- **Expected Result:** 
  - Average response time < 5 minutes
- **Priority:** Must Have
- **Type:** Performance

### 8.2 Load Tests

#### Test Case 8.2.1: Concurrent Requests
- **Test ID:** TC-PERF-003
- **Test Scenario:** Test system under concurrent load
- **Test Steps:**
  1. Send 10 concurrent requests to /research
  2. Verify all requests complete successfully
  3. Verify no significant performance degradation
- **Expected Result:** 
  - All requests complete within expected time
- **Priority:** Should Have
- **Type:** Load

#### Test Case 8.2.2: High Volume Requests
- **Test ID:** TC-PERF-004
- **Test Scenario:** Test system with high volume of requests
- **Test Steps:**
  1. Send 100 requests over 30 minutes
  2. Monitor system performance
- **Expected Result:** 
  - System remains responsive
- **Priority:** Could Have
- **Type:** Load

---

## 9. Security Tests

### 9.1 Authentication Tests

#### Test Case 9.1.1: API Key Authentication
- **Test ID:** TC-SEC-001
- **Test Scenario:** Verify API endpoints require valid API key
- **Test Steps:**
  1. Send API request without API key
  2. Verify response status code is 401 Unauthorized
- **Expected Result:** 
  - Status Code: 401 Unauthorized
- **Priority:** Must Have
- **Type:** Security

#### Test Case 9.1.2: Invalid API Key
- **Test ID:** TC-SEC-002
- **Test Scenario:** Test API with invalid API key
- **Test Steps:**
  1. Send API request with invalid API key
  2. Verify response status code is 401 Unauthorized
- **Expected Result:** 
  - Status Code: 401 Unauthorized
- **Priority:** Must Have
- **Type:** Security

### 9.2 Data Protection

#### Test Case 9.2.1: API Key Storage
- **Test ID:** TC-SEC-003
- **Test Scenario:** Verify API keys are not exposed
- **Test Steps:**
  1. Check system logs, error messages, and responses
  2. Verify API keys are not exposed in any output
- **Expected Result:** 
  - API keys not exposed in logs, responses, or error messages
- **Priority:** Must Have
- **Type:** Security

#### Test Case 9.2.2: HTTPS Enforcement
- **Test ID:** TC-SEC-004
- **Test Scenario:** Verify all API communication uses HTTPS
- **Test Steps:**
  1. Attempt to send request over HTTP
  2. Verify redirect to HTTPS or refusal
- **Expected Result:** 
  - All communication is encrypted over HTTPS
- **Priority:** Must Have
- **Type:** Security

---

## 10. Test Data

### 10.1 Test Companies
- **Well-known companies:** Microsoft, Apple, Google, Amazon, Facebook
- **Startups:** OpenAI, Stripe, Shopify, Airbnb, Uber
- **Non-existent companies:** NonExistentTechCorp, FakeStartup123, ImaginaryInc

### 10.2 Test Queries
- "Analyze company Microsoft"
- "Analyze startup OpenAI"
- "Analyze e-commerce platform Shopify"
- "Analyze electric vehicle startup Rivian"
- "Analyze software company Adobe"

---

## 11. Test Execution

### 11.1 Test Schedule
- **Unit Tests:** Run on every code commit
- **Integration Tests:** Run on every build
- **System Tests:** Run weekly
- **Performance Tests:** Run monthly
- **UAT:** Run before each release

### 11.2 Test Tools
- **Unit Testing:** pytest, unittest
- **API Testing:** Postman, curl, requests library
- **Performance Testing:** Locust, JMeter
- **Test Management:** TestRail, Jira

---

## 12. Defect Management

### 12.1 Defect Severity Levels

| Severity | Description |
|----------|-------------|
| Critical | System is completely unavailable or data loss occurs |
| High | Core functionality is broken |
| Medium | Non-critical functionality is broken |
| Low | Minor issues (cosmetic, usability) |

### 12.2 Defect Workflow
1. Defect discovered and logged
2. Defect assigned to developer
3. Developer fixes and marks as fixed
4. Tester verifies fix
5. Defect closed if verified
6. Reopened if fix is insufficient

---

## 13. Acceptance Criteria

### 13.1 Business Acceptance Criteria (BAC)
- All Must Have requirements met
- System response time < 5 minutes per report
- Report accuracy > 95%
- Throughput: 100+ companies per analyst per week

### 13.2 User Acceptance Criteria (UAC)
- Reports are easy to read and understand
- Citations are verifiable
- API is easy to integrate
- System is reliable and stable

---

## 14. Sign Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [Name] | [Date] | [Signature] |
| QA Lead | [Name] | [Date] | [Signature] |
| Development Lead | [Name] | [Date] | [Signature] |
| Project Manager | [Name] | [Date] | [Signature] |
