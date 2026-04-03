"""
Integration Tests for Autonomous Company Deep Research Agent
These tests validate the end-to-end functionality of the research system
"""

import asyncio
import pytest
import json
import os
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app
from services.research_pipeline import run_research
from agents.planner_agent import planner_agent
from agents.search_agent import search_agent
from agents.crawl_agent import crawl_agent
from agents.reasoning_agent import reasoning_agent
from agents.vc_diligence_agent import VCDiligenceAgent
from services.report_generator import generate_report
from app.schema import VCReportRequest


# Create test client for API testing
client = TestClient(app)

# Test data
VALID_COMPANY_QUERY = "Analyze company Microsoft"
VALID_STARTUP_QUERY = "Analyze startup OpenAI"
INVALID_QUERY = "Invalid query format"
NON_EXISTENT_COMPANY = "NonExistentTechCorp123"

# Test URLs for crawling
VALID_URL = "https://example.com"
INVALID_URL = "invalid_url"


class TestIntegration:
    """Integration tests for the research system"""

    # ============================================
    # API Endpoint Tests
    # ============================================
    def test_api_health_check(self):
        """Test the health check endpoint"""
        response = client.get("/")
        assert response.status_code == 200
        assert "status" in response.json()
        assert response.json()["status"] == "Deep Research Agent running"

    @pytest.mark.asyncio
    async def test_api_research_endpoint_valid_query(self):
        """Test the research endpoint with a valid query"""
        # This test will run the actual research pipeline
        # It requires valid API keys in .env file
        response = client.post("/research", params={"query": VALID_COMPANY_QUERY})
        assert response.status_code == 200
        
        result = response.json()
        assert "query" in result
        assert "plan" in result
        assert "analysis" in result
        
        # Verify plan has appropriate number of steps
        assert len(result["plan"]) >= 6
        assert len(result["plan"]) <= 10
        
        # Verify analysis contains required sections
        assert isinstance(result["analysis"], str)

    @pytest.mark.asyncio
    async def test_api_research_endpoint_with_country(self):
        """Test the research endpoint with country parameter"""
        response = client.post(
            "/research",
            params={"query": "Analyze company Spotify", "country": "SE"}
        )
        assert response.status_code == 200
        assert "query" in response.json()

    def test_api_research_endpoint_empty_query(self):
        """Test the research endpoint with empty query"""
        response = client.post("/research", params={"query": ""})
        assert response.status_code == 422  # Unprocessable Entity

    # ============================================
    # Research Pipeline Tests
    # ============================================
    @pytest.mark.asyncio
    async def test_run_research_pipeline_valid_query(self):
        """Test the complete research pipeline with valid query"""
        result = await run_research(VALID_COMPANY_QUERY)
        assert isinstance(result, dict)
        assert "query" in result
        assert "plan" in result
        assert "analysis" in result
        assert len(result["plan"]) >= 6
        assert len(result["plan"]) <= 10

    # ============================================
    # Agent Integration Tests
    # ============================================
    def test_planner_agent_valid_query(self):
        """Test planner agent generates valid research plan"""
        plan = planner_agent(VALID_COMPANY_QUERY)
        assert isinstance(plan, list)
        assert len(plan) >= 6
        assert len(plan) <= 10
        assert all(isinstance(step, str) and len(step) > 0 for step in plan)

    def test_planner_agent_empty_query(self):
        """Test planner agent with empty query"""
        plan = planner_agent("")
        assert isinstance(plan, list)
        assert len(plan) >= 6

    def test_search_agent_valid_query(self):
        """Test search agent finds relevant URLs"""
        urls = search_agent(VALID_COMPANY_QUERY, "US")
        assert isinstance(urls, list)
        assert len(urls) > 0
        assert all(isinstance(url, str) and url.startswith("http") for url in urls)

    def test_search_agent_non_existent_company(self):
        """Test search agent with non-existent company"""
        urls = search_agent(NON_EXISTENT_COMPANY, "US")
        assert isinstance(urls, list)

    def test_crawl_agent_valid_url(self):
        """Test crawl agent extracts content from valid URL"""
        result = crawl_agent(VALID_URL)
        assert isinstance(result, dict)
        assert "text" in result
        assert isinstance(result["text"], str)
        assert len(result["text"]) > 0

    def test_crawl_agent_invalid_url(self):
        """Test crawl agent handles invalid URL"""
        result = crawl_agent(INVALID_URL)
        assert isinstance(result, dict)
        assert len(result) == 0  # Should return empty dict for invalid URL

    # ============================================
    # Report Generation Tests
    # ============================================
    @pytest.mark.asyncio
    async def test_vc_report_generation_pdf(self):
        """Test VC report generation in PDF format"""
        # First, run research to get data
        research_data = await run_research(VALID_COMPANY_QUERY)
        
        # Generate VC report
        agent = VCDiligenceAgent()
        report = agent.run("Microsoft", research_data)
        
        # Generate PDF report
        pdf_path = generate_report(report, "pdf")
        assert isinstance(pdf_path, str)
        assert pdf_path.endswith(".pdf")
        assert os.path.exists(pdf_path)
        
        # Clean up
        if os.path.exists(pdf_path):
            os.remove(pdf_path)

    @pytest.mark.asyncio
    async def test_vc_report_generation_markdown(self):
        """Test VC report generation in Markdown format"""
        research_data = await run_research(VALID_COMPANY_QUERY)
        agent = VCDiligenceAgent()
        report = agent.run("Microsoft", research_data)
        
        md_path = generate_report(report, "markdown")
        assert isinstance(md_path, str)
        assert md_path.endswith(".md")
        assert os.path.exists(md_path)
        
        # Clean up
        if os.path.exists(md_path):
            os.remove(md_path)

    @pytest.mark.asyncio
    async def test_api_generate_vc_report_pdf(self):
        """Test API endpoint for generating VC report in PDF format"""
        request_data = {
            "company": "Microsoft",
            "format": "pdf",
            "country": "US"
        }
        
        response = client.post("/generate-vc-report", json=request_data)
        assert response.status_code == 200
        assert response.headers["content-type"] == "application/pdf"
        assert len(response.content) > 0

    @pytest.mark.asyncio
    async def test_api_generate_vc_report_markdown(self):
        """Test API endpoint for generating VC report in Markdown format"""
        request_data = {
            "company": "Microsoft",
            "format": "markdown",
            "country": "US"
        }
        
        response = client.post("/generate-vc-report", json=request_data)
        assert response.status_code == 200
        assert response.headers["content-type"] == "text/markdown"
        assert len(response.content) > 0

    # ============================================
    # New Endpoint Tests
    # ============================================
    
    @pytest.mark.asyncio
    async def test_api_competitors_endpoint(self):
        """Test the competitors endpoint"""
        response = client.get("/startup/competitors", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "competitors" in result
        assert isinstance(result["competitors"], list)
    
    @pytest.mark.asyncio
    async def test_api_company_competitors_endpoint(self):
        """Test the company competitors endpoint"""
        response = client.get("/company/competitors", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "competitors" in result
        assert isinstance(result["competitors"], list)
    
    @pytest.mark.asyncio
    async def test_api_founders_endpoint(self):
        """Test the founders endpoint"""
        response = client.get("/company/founders", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "founders" in result
        assert isinstance(result["founders"], list)
    
    @pytest.mark.asyncio
    async def test_api_hiring_endpoint(self):
        """Test the hiring signals endpoint"""
        response = client.get("/company/hiring", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "hiring_signals" in result
        assert isinstance(result["hiring_signals"], list)
    
    @pytest.mark.asyncio
    async def test_api_news_endpoint(self):
        """Test the news intelligence endpoint"""
        response = client.get("/company/news", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "news" in result
        assert isinstance(result["news"], list)
    
    @pytest.mark.asyncio
    async def test_api_technology_endpoint(self):
        """Test the technology stack endpoint"""
        response = client.get("/company/technology", params={"company": "stripe"})
        assert response.status_code == 200
        result = response.json()
        assert "technology_stack" in result
        assert isinstance(result["technology_stack"], dict)
        # Check that it has the expected structure
        assert "programming_languages" in result["technology_stack"]
        assert "developer_tools" in result["technology_stack"]

    # ============================================
    # Error Handling Tests
    # ============================================
    @patch('agents.search_agent.search_agent', side_effect=Exception("Search API failed"))
    def test_research_pipeline_search_failure(self, mock_search):
        """Test research pipeline handles search agent failure"""
        with pytest.raises(Exception):
            asyncio.run(run_research(VALID_COMPANY_QUERY))

    @patch('agents.planner_agent.planner_agent', side_effect=Exception("Planner API failed"))
    def test_research_pipeline_planner_failure(self, mock_planner):
        """Test research pipeline handles planner agent failure"""
        with pytest.raises(Exception):
            asyncio.run(run_research(VALID_COMPANY_QUERY))


if __name__ == "__main__":
    # Run tests without pytest
    test = TestIntegration()
    
    # Run health check test
    print("Running health check test...")
    test.test_api_health_check()
    print("✓ Health check test passed")
    
    # Run basic pipeline test (requires API keys)
    try:
        print("\nRunning research pipeline test...")
        asyncio.run(test.test_run_research_pipeline_valid_query())
        print("✓ Research pipeline test passed")
    except Exception as e:
        print(f"✗ Research pipeline test failed: {e}")
    
    # Run planner agent test
    print("\nRunning planner agent test...")
    test.test_planner_agent_valid_query()
    print("✓ Planner agent test passed")
    
    print("\nAll tests completed!")
