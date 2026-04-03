import json

from llm.factory import get_llm_provider
from app.schema import VCReport

VC_PROMPT = """
You are a Venture Capital research analyst.

Use the following research data to generate a comprehensive VC-style diligence report for: {company}

Research Plan:
{plan}

Research Insights:
{insights}

Generate a detailed VC-style diligence report with:

1 Executive Summary
2 Company Overview
3 Product Description
4 Technology Stack
5 Business Model
6 Market Analysis
7 Competitive Landscape
8 SWOT Analysis
9 Management Team
10 Financial Analysis
11 Traction & Milestones
12 Go-to-Market Strategy
13 Use of Funds
14 Investment Thesis
15 Risks & Mitigation
16 Exit Potential

Return structured JSON matching this schema:
{{
  "company_name": "Company name",
  "summary": "Executive summary",
  "company_overview": "Company overview including mission, vision, founding story",
  "product": "Product description including features, value proposition",
  "technology": "Technology stack, IP, innovation",
  "business_model": "Business model explanation including revenue streams",
  "market_analysis": {{
    "market_size": "Total addressable market (TAM), serviceable addressable market (SAM), serviceable obtainable market (SOM)",
    "growth_rate": "Market growth rate and projections",
    "trends": ["key market trend 1", "key market trend 2"],
    "target_market": "Primary target customer segments",
    "market_segments": ["segment 1", "segment 2"]
  }},
  "competitors": [
    {{
      "name": "Competitor name",
      "description": "Competitor description",
      "pricing": "Pricing information",
      "strengths": ["competitor strength 1", "competitor strength 2"],
      "weaknesses": ["competitor weakness 1", "competitor weakness 2"],
      "market_share": "Estimated market share"
    }}
  ],
  "swot": {{
    "strengths": ["strength 1", "strength 2"],
    "weaknesses": ["weakness 1", "weakness 2"],
    "opportunities": ["opportunity 1", "opportunity 2"],
    "threats": ["threat 1", "threat 2"]
  }},
  "team": [
    {{
      "name": "Team member name",
      "role": "Position",
      "background": "Professional background"
    }}
  ],
  "financials": {{
    "revenue_model": "Revenue model description",
    "revenue_projections": "Revenue projections for next 3-5 years",
    "key_expenses": ["key expense 1", "key expense 2"],
    "funding_history": ["funding round 1", "funding round 2"]
  }},
  "traction": "Traction metrics (users, revenue, partnerships, milestones)",
  "go_to_market_strategy": "G2M strategy including sales, marketing, distribution",
  "use_of_funds": "Planned use of investment funds",
  "investment_thesis": "Investment thesis explaining why this is a compelling opportunity",
  "risks": ["risk 1", "risk 2", "risk 3"],
  "exit_potential": "Exit potential (acquisition, IPO, etc.)"
}}

Ensure all fields are present and correctly structured with the exact keys shown. Provide detailed, specific information from the research data for each field.
"""


class VCDiligenceAgent:
    """
    VC Diligence Agent for generating comprehensive reports.
    
    This agent is LLM-agnostic and works with any LLM provider
    configured via the LLM_PROVIDER environment variable.
    """
    
    def __init__(self):
        # Get the configured LLM provider (LLM-agnostic)
        self._llm = get_llm_provider()

    def run(self, company: str, research_data: dict) -> VCReport:
        """
        Generate a VC-style report for a company.
        
        Args:
            company: Company name
            research_data: Dict with 'plan' and 'analysis' keys
            
        Returns:
            VCReport: The generated report
        """
        prompt = VC_PROMPT.format(
            company=company,
            plan=research_data['plan'],
            insights=research_data['analysis']
        )

        # Use the generic LLM interface - try JSON mode first
        try:
            data = self._llm.complete_json(prompt=prompt)
        except Exception as e:
            # Fallback to regular completion if JSON mode fails
            print(f"JSON mode failed, trying regular completion: {e}")
            response = self._llm.complete(prompt=prompt)
            # Try to extract JSON from the response
            clean_response = response.strip().strip('`').strip()
            if clean_response.startswith('json'):
                clean_response = clean_response[4:].strip()
            data = json.loads(clean_response)

        report = VCReport(**data)
        return report
