from fastapi import FastAPI, Query, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, Dict, Any, List
import tempfile
import os
from services.research_pipeline import run_research
from agents.vc_diligence_agent import VCDiligenceAgent
from services.report_generator import generate_report
from app.schema import VCReportRequest

app = FastAPI(
    title="Autonomous Company Deep Research Agent",
    description="""
    ## Overview
    
    This API provides autonomous deep research capabilities for company analysis, designed for venture capital due diligence and competitive intelligence.
    
    ## Capabilities
    
    * **Company Research**: Comprehensive research on any company including market analysis, competitors, and trends
    * **VC Report Generation**: Generate professional venture capital-style due diligence reports
    * **Funding Intelligence**: Track funding rounds, investors, and investment trends
    * **Competitor Analysis**: Identify and analyze direct and indirect competitors
    * **Founder Research**: Profile company founders and their backgrounds
    * **Hiring Signals**: Analyze job postings and hiring trends
    * **News Intelligence**: Monitor news coverage and sentiment
    * **Technology Stack Analysis**: Identify technologies used by companies
    
    ## Use Cases
    
    * Venture capital due diligence
    * Investment research
    * Competitive analysis
    * Market intelligence
    * Partner/vendor evaluation
    
    ## Authentication
    
    Currently, this API does not require authentication. For production deployment, implement API key authentication.
    """,
    version="1.0.0",
    contact={
        "name": "API Support",
        "url": "https://github.com/autonomous-deep-research-agent",
        "email": "ranjancse@gmail.com"
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
    },
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(
    "/",
    summary="API Health Check",
    description="""
    ## Purpose
    
    Verify that the API is running and accessible.
    
    ## Response
    
    Returns a simple status message indicating the service is operational.
    
    ## Example Response
    
    ```json
    {
        "status": "Company Deep Research Agent running"
    }
    ```
    """
)
def home():
    """Health check endpoint to verify the API is running."""
    return {"status": "Company Deep Research Agent running"}

@app.post(
    "/research",
    summary="Run Company Research",
    description="""
    ## Purpose

    Execute a research campaign on a target company with selectable research types.

    ## What It Does

    This endpoint runs an autonomous research pipeline that gathers and analyzes based on selected research types:
    * **comprehensive**: All available research types
    * **funding**: Funding history and investment details
    * **competitors**: Competitive landscape analysis
    * **founders**: Founder profiles and backgrounds
    * **hiring**: Hiring signals and growth indicators
    * **news**: News intelligence and sentiment
    * **technology**: Technology stack analysis

    ## Parameters

    * **query** (required): Company name or search query
    * **country** (optional): Country code for localized search (default: "US")
    * **research_types** (optional): List of research types to perform (default: ["comprehensive"])

    ## Response

    Returns research data based on selected types. For comprehensive research, returns full analysis. For specific types, returns targeted data.

    ## Use Cases

    * Targeted research for specific needs
    * Efficient research with focused scope
    * Pre-investment due diligence
    * Competitive analysis
    * Market research
    """,
    response_description="Research data for the requested company based on selected types",
    tags=["Research"]
)
async def research(query: str, country: str = "US", research_types: Optional[List[str]] = Query(None, description="List of research types to perform")):
    """
    Run company research with selectable types.

    Args:
        query: Company name or search query
        country: Country code for localized search (default: "US")
        research_types: List of research types (optional, defaults to comprehensive)

    Returns:
        Dict containing research data based on selected types
    """
    if not research_types or "comprehensive" in research_types:
        # Run comprehensive research
        result = await run_research(query, country)
        return result

    # Run specific research types and aggregate results
    results = {}

    for research_type in research_types:
        if research_type == "funding":
            from services.funding_research_pipeline import run_funding_research
            results["funding"] = await run_funding_research(query)
        elif research_type == "competitors":
            from services.competitor_research_pipeline import run_competitor_research
            results["competitors"] = await run_competitor_research(query)
        elif research_type == "founders":
            from services.founder_research_pipeline import run_founder_research
            results["founders"] = await run_founder_research(query)
        elif research_type == "hiring":
            from services.hiring_signals_pipeline import run_hiring_signals_research
            results["hiring"] = await run_hiring_signals_research(query)
        elif research_type == "news":
            from services.news_intelligence_pipeline import run_news_intelligence_research
            results["news"] = await run_news_intelligence_research(query)
        elif research_type == "technology":
            from services.technology_stack_pipeline import run_technology_stack_research
            results["technology"] = await run_technology_stack_research(query)

    return results

@app.post(
    "/generate-vc-report",
    summary="Generate VC Due Diligence Report",
    description="""
    ## Purpose
    
    Generate a comprehensive venture capital-style due diligence report for a target company.
    
    ## What It Does
    
    This endpoint:
    1. Runs comprehensive research on the target company
    2. Applies VC due diligence analysis using AI agents
    3. Generates a professional report in the requested format
    
    ## Report Contents
    
    The generated report includes:
    * **Executive Summary**: High-level investment thesis
    * **Company Overview**: Business description and history
    * **Product Analysis**: Product-market fit and differentiation
    * **Technology Assessment**: Technical infrastructure and IP
    * **Business Model**: Revenue streams and unit economics
    * **Market Analysis**: TAM, SAM, SOM, and growth trends
    * **Competitive Landscape**: Direct and indirect competitors
    * **SWOT Analysis**: Strengths, weaknesses, opportunities, threats
    * **Team Profile**: Founder backgrounds and expertise
    * **Financial Analysis**: Revenue model and projections
    * **Traction**: Growth metrics and milestones
    * **Go-to-Market Strategy**: Market entry and scaling approach
    * **Investment Thesis**: Key investment rationale
    * **Risks**: Key risk factors and mitigation strategies
    * **Exit Potential**: Potential exit scenarios
    
    ## Request Body
    
    * **company** (required): Target company name
    * **country** (optional): Country code (default: "US")
    * **format** (optional): Output format - "pdf" or "markdown" (default: "pdf")
    
    ## Response
    
    Returns the generated report file (PDF or Markdown).
    
    ## Use Cases
    
    * Pre-Series A/B/C due diligence
    * Investment committee presentations
    * Board presentations
    * Founder pitch evaluation
    """,
    response_description="VC-style due diligence report file",
    tags=["Reports"],
    responses={
        200: {
            "description": "Successful VC report generated",
            "content": {
                "application/pdf": {
                    "schema": {"type": "string", "format": "binary"},
                    "example": "[PDF binary data]"
                },
                "text/markdown": {
                    "schema": {"type": "string"},
                    "example": "# VC Report\n\n## Company Overview..."
                }
            }
        },
        400: {"description": "Invalid request parameters"},
        500: {"description": "Error generating report"}
    }
)
async def generate_vc_report(request: VCReportRequest, background_tasks: BackgroundTasks):
    """
    Generate VC-style due diligence report for a company.
    
    This endpoint performs comprehensive research and generates a professional
    venture capital due diligence report in the specified format.
    
    Args:
        request: VCReportRequest containing company name, country, and format
    
    Returns:
        FileResponse with the generated report (PDF or Markdown)
    
    Raises:
        HTTPException: If report generation fails
    """
    research_data = await run_research(request.company, request.country)
    agent = VCDiligenceAgent()
    report = agent.run(request.company, research_data)

    report_content = generate_report(report, request.format)

    if request.format == "pdf":
        media_type = "application/pdf"
    elif request.format == "markdown":
        media_type = "text/markdown"
    else:
        media_type = "application/octet-stream"

    company_name_safe = report.company_name.replace(" ", "_").lower()
    filename = f"{company_name_safe}_report.{request.format}"

    # Create temporary file
    suffix = ".pdf" if request.format == "pdf" else ".md"
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=False) as temp_file:
        if request.format == "pdf":
            temp_file.write(report_content)
        else:
            temp_file.write(report_content.encode('utf-8'))
        temp_path = temp_file.name

    response = FileResponse(
        path=temp_path,
        media_type=media_type,
        filename=filename
    )

    background_tasks.add_task(os.unlink, temp_path)

    return response


@app.get(
    "/company/funding",
    summary="Get Company Funding History",
    description="""
    ## Purpose
    
    Retrieve detailed funding history for a target company.
    
    ## What It Does
    
    Gathers information about:
    * All funding rounds (Seed, Series A, B, C, etc.)
    * Investment amounts
    * Lead investors
    * Valuation history
    * Funding timeline
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns funding round details including amounts, investors, and dates.
    
    ## Use Cases
    
    * Track investment trends
    * Understand company growth trajectory
    * Identify investors in a company
    """,
    response_description="Funding history data for the requested company",
    tags=["Company Intelligence"]
)
async def get_funding_history(company: str = Query(..., description="Company name to research")):
    """
    Get funding history for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing funding history and investment details
    """
    from services.funding_research_pipeline import run_funding_research
    return await run_funding_research(company)


@app.get(
    "/company/competitors",
    summary="Get Competitor Analysis",
    description="""
    ## Purpose
    
    Identify and analyze competitors for a target company.
    
    ## What It Does
    
    Identifies:
    * Direct competitors (same product/market)
    * Indirect competitors (adjacent markets)
    * Competitive positioning
    * Market share data
    * Strengths and weaknesses comparison
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns list of competitors with detailed analysis.
    
    ## Use Cases
    
    * Competitive intelligence
    * Market positioning analysis
    * Investment thesis development
    """,
    response_description="Competitor analysis for the requested company",
    tags=["Company Intelligence"]
)
async def get_competitors(company: str = Query(..., description="Company name to research")):
    """
    Get competitors for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing competitor analysis
    """
    from services.competitor_research_pipeline import run_competitor_research
    return await run_competitor_research(company)


@app.get(
    "/company/founders",
    summary="Get Founder Information",
    description="""
    ## Purpose
    
    Research and profile company founders and key executives.
    
    ## What It Does
    
    Gathers information about:
    * Founder names and roles
    * Professional backgrounds
    * Previous companies/experience
    * Education
    * Notable achievements
    * LinkedIn profiles
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns detailed founder profiles and backgrounds.
    
    ## Use Cases
    
    * Team evaluation for investment decisions
    * Understanding company leadership
    * Reference checking
    """,
    response_description="Founder information for the requested company",
    tags=["Company Intelligence"]
)
async def get_founders(company: str = Query(..., description="Company name to research")):
    """
    Get founder information for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing founder profiles and backgrounds
    """
    from services.founder_research_pipeline import run_founder_research
    return await run_founder_research(company)


@app.get(
    "/company/hiring",
    summary="Get Hiring Signals",
    description="""
    ## Purpose
    
    Analyze company hiring trends and job postings.
    
    ## What It Does
    
    Analyzes:
    * Current job openings
    * Hiring velocity and growth rate
    * Roles in demand (engineering, sales, etc.)
    * Geographic distribution of hires
    * Recent hiring trends
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns hiring signals and growth indicators.
    
    ## Use Cases
    
    * Gauge company growth trajectory
    * Understand strategic priorities
    * Identify team expansion plans
    """,
    response_description="Hiring signals for the requested company",
    tags=["Company Intelligence"]
)
async def get_hiring_signals(company: str = Query(..., description="Company name to research")):
    """
    Get hiring signals for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing hiring signals and growth indicators
    """
    from services.hiring_signals_pipeline import run_hiring_signals_research
    return await run_hiring_signals_research(company)


@app.get(
    "/company/news",
    summary="Get News Intelligence",
    description="""
    ## Purpose
    
    Gather and analyze news coverage and media mentions.
    
    ## What It Does
    
    Collects and analyzes:
    * Recent news articles
    * Press releases
    * Media sentiment analysis
    * Industry coverage
    * Product announcements
    * Leadership changes
    * Funding announcements
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns news intelligence and sentiment analysis.
    
    ## Use Cases
    
    * Monitor company reputation
    * Track industry trends
    * Stay updated on major announcements
    * Sentiment analysis for investment decisions
    """,
    response_description="News intelligence for the requested company",
    tags=["Company Intelligence"]
)
async def get_news_intelligence(company: str = Query(..., description="Company name to research")):
    """
    Get news intelligence for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing news and media intelligence
    """
    from services.news_intelligence_pipeline import run_news_intelligence_research
    return await run_news_intelligence_research(company)


@app.get(
    "/company/technology",
    summary="Get Technology Stack Analysis",
    description="""
    ## Purpose
    
    Identify and analyze the technology stack used by a company.
    
    ## What It Does
    
    Discovers:
    * Programming languages used
    * Frameworks and libraries
    * Cloud infrastructure
    * DevOps tools
    * Data stores and databases
    * Third-party services and APIs
    * Security tools
    
    ## Parameters
    
    * **company** (required): Company name
    
    ## Response
    
    Returns technology stack analysis and insights.
    
    ## Use Cases
    
    * Technical due diligence
    * Understand company capabilities
    * Identify technical debt
    * Competitive technical analysis
    * Partnership compatibility assessment
    """,
    response_description="Technology stack for the requested company",
    tags=["Company Intelligence"]
)
async def get_technology_stack(company: str = Query(..., description="Company name to research")):
    """
    Get technology stack for a company.
    
    Args:
        company: Name of the company to research
    
    Returns:
        Dict containing technology stack analysis
    """
    from services.technology_stack_pipeline import run_technology_stack_research
    return await run_technology_stack_research(company)