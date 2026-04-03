import json
from llm.factory import get_llm_provider


# -----------------------------------------------------
# Source Verification
# -----------------------------------------------------

def verify_sources(data):
    """
    Verify credibility and quality of sources
    """

    llm = get_llm_provider()

    formatted_sources = ""

    for i, item in enumerate(data):
        formatted_sources += f"""
Source {i+1}
URL: {item['url']}

Content:
{item['content']}
"""

    prompt = f"""
You are a research verification system.

Evaluate the reliability and usefulness of each source.

For each source determine:

- credibility_score (0-10)
- relevance_score (0-10)
- data_quality_score (0-10)
- key_information_present (true/false)
- reason

Return JSON.

Sources:

{formatted_sources}

Schema:

{{
  "sources": [
    {{
      "id": 1,
      "credibility_score": 0,
      "relevance_score": 0,
      "data_quality_score": 0,
      "key_information_present": true,
      "reason": ""
    }}
  ]
}}
"""

    response = llm.complete(prompt=prompt)

    try:
        verification = json.loads(response)
        return verification

    except Exception:
        return {"sources": []}


# -----------------------------------------------------
# Filter sources
# -----------------------------------------------------

def prepare_verified_data(data, verification):

    verified_sources = []

    score_map = {s["id"]: s for s in verification.get("sources", [])}

    for i, item in enumerate(data):

        source_id = i + 1
        scores = score_map.get(source_id)

        if not scores:
            continue

        credibility = scores.get("credibility_score", 0)
        relevance = scores.get("relevance_score", 0)
        quality = scores.get("data_quality_score", 0)

        # Minimum thresholds
        if credibility >= 5 and relevance >= 5 and quality >= 5:
            verified_sources.append(item)

    return verified_sources


# -----------------------------------------------------
# Reasoning Agent
# -----------------------------------------------------

def reasoning_agent(data, plan):

    llm = get_llm_provider()

    # Step 1: verify sources
    verification = verify_sources(data)

    # Step 2: filter sources
    verified_data = prepare_verified_data(data, verification)

    if not verified_data:
        verified_data = data  # fallback

    plan_text = "\n".join([f"- {step}" for step in plan])

    formatted_data = ""

    for i, item in enumerate(verified_data):
        formatted_data += f"""
Source {i+1}
URL: {item['url']}

Content:
{item['content']}
"""

    schema = """{
  "company_profile": {
    "name": null,
    "legal_name": null,
    "website": null,
    "description": null,
    "industry": null,
    "sub_industry": null,
    "founded_year": null,
    "headquarters": {
      "city": null,
      "state": null,
      "country": null
    },
    "business_model": null,
    "company_stage": null,
    "employee_count_estimate": null
  },

  "founders": [],

  "leadership_team": [],

  "products_services": [],

  "technology_stack": {
    "ai_technologies": [],
    "core_technologies": [],
    "infrastructure": [],
    "data_stack": []
  },

  "funding": {
    "total_funding_usd": null,
    "latest_round": {
      "round_type": null,
      "amount_usd": null,
      "date": null
    },
    "funding_rounds": [],
    "notable_investors": []
  },

  "traction_metrics": {
    "users": null,
    "customers": null,
    "revenue_estimate": null,
    "growth_rate": null,
    "partnerships": []
  },

  "market_analysis": {
    "market_category": null,
    "target_market": null,
    "market_size": {
      "tam": null,
      "sam": null,
      "som": null
    },
    "growth_rate": null,
    "key_trends": []
  },

  "competitive_landscape": {
    "direct_competitors": [],
    "indirect_competitors": [],
    "competitive_advantages": [],
    "barriers_to_entry": []
  },

  "go_to_market": {
    "target_customers": [],
    "distribution_channels": [],
    "sales_strategy": null,
    "marketing_strategy": null
  },

  "risk_analysis": [],

  "investment_thesis": {
    "summary": null,
    "strengths": [],
    "weaknesses": [],
    "opportunities": [],
    "threats": [],
    "key_questions_for_founders": []
  },

  "signals": {
    "positive_signals": [],
    "warning_signals": []
  },

  "confidence_score": {
    "overall": null,
    "data_quality": null,
    "source_coverage": null
  },

  "sources": []
}"""

    prompt = f"""
You are a senior venture capital research analyst.

Your job is to analyze a startup using verified research sources.

Steps:

1. Cross-validate facts across sources
2. Prefer information mentioned by multiple sources
3. Ignore low confidence claims
4. Cite sources like [1], [2]

Research plan:

{plan_text}

Verified sources:

{formatted_data}

Return JSON using EXACT schema below.

{schema}

Rules:

- If information cannot be verified return null
- Prefer verified sources
- Include citations
- Do not include markdown
- Return valid JSON only
"""

    response = llm.complete(prompt=prompt)

    insights = response.strip()

    try:

        insights_json = json.loads(insights)

        insights_json["sources"] = [
            {
                "id": i + 1,
                "url": item["url"]
            }
            for i, item in enumerate(verified_data)
        ]

        insights_json["source_verification"] = verification

        return insights_json

    except Exception:

        return {
            "error": "Invalid JSON returned by LLM",
            "raw_response": insights,
            "sources": [item["url"] for item in verified_data],
            "verification": verification
        }