from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum


class ReportFormat(str, Enum):
    """Supported output formats for VC reports"""
    PDF = "pdf"
    MARKDOWN = "markdown"


class MarketAnalysis(BaseModel):
    """Market analysis section of a VC report"""
    market_size: str = Field(description="Total addressable market size")
    growth_rate: str = Field(description="Expected market growth rate")
    trends: List[str] = Field(description="Key market trends")
    target_market: str = Field(description="Target market segment")
    market_segments: List[str] = Field(description="Market sub-segments")


class Competitor(BaseModel):
    """Competitor information for analysis"""
    name: str = Field(description="Competitor company name")
    description: str = Field(description="Brief competitor description")
    pricing: str = Field(description="Pricing strategy")
    strengths: List[str] = Field(description="Competitive strengths")
    weaknesses: List[str] = Field(description="Competitive weaknesses")
    market_share: str = Field(description="Estimated market share")


class SWOT(BaseModel):
    """SWOT analysis for a company"""
    strengths: List[str] = Field(description="Company strengths")
    weaknesses: List[str] = Field(description="Company weaknesses")
    opportunities: List[str] = Field(description="Market opportunities")
    threats: List[str] = Field(description="Market threats")


class TeamMember(BaseModel):
    """Team member information"""
    name: str = Field(description="Team member name")
    role: str = Field(description="Job title/role")
    background: str = Field(description="Professional background")


class Financials(BaseModel):
    """Financial information section"""
    revenue_model: str = Field(description="How the company makes money")
    revenue_projections: str = Field(description="Revenue forecasts")
    key_expenses: List[str] = Field(description="Major cost categories")
    funding_history: List[str] = Field(description="Past funding rounds")


class VCReport(BaseModel):
    """Complete VC due diligence report structure"""
    company_name: str = Field(description="Company being analyzed")
    summary: str = Field(description="Executive summary")
    company_overview: str = Field(description="Company description and history")
    product: str = Field(description="Product or service description")
    technology: str = Field(description="Technology assessment")
    business_model: str = Field(description="Business model analysis")
    market_analysis: MarketAnalysis = Field(description="Market opportunity analysis")
    competitors: List[Competitor] = Field(description="Competitive landscape")
    swot: SWOT = Field(description="SWOT analysis")
    team: List[TeamMember] = Field(description="Founder and team profiles")
    financials: Financials = Field(description="Financial overview")
    traction: str = Field(description="Growth metrics and milestones")
    go_to_market_strategy: str = Field(description="Market entry strategy")
    use_of_funds: str = Field(description="Planned capital allocation")
    investment_thesis: str = Field(description="Investment rationale")
    risks: List[str] = Field(description="Key risk factors")
    exit_potential: str = Field(description="Potential exit scenarios")


class VCReportRequest(BaseModel):
    """Request body for generating a VC report"""
    company: str = Field(description="Name of the company to research", example="Acme Inc")
    format: str = Field(
        description="Output format: 'pdf' or 'markdown'", 
        default="pdf",
        example="pdf"
    )
    country: str = Field(
        description="Country code for localized search", 
        default="US",
        example="US"
    )


class VCReportResponse(BaseModel):
    """Response containing report download information"""
    company_name: str = Field(description="Company name")
    report_url: str = Field(description="URL to download the report")
    format: str = Field(description="Report format")


class FundingHistory(BaseModel):
    """Individual funding round details"""
    round: str = Field(description="Funding round type (Seed, Series A, etc.)")
    amount: str = Field(description="Amount raised")
    investors: List[str] = Field(description="Lead investors")
