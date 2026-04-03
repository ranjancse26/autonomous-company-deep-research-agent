import json
from llm.factory import get_llm_provider


def competitor_detection_agent(data):
    """
    Extract comprehensive competitive intelligence from research data.

    Args:
        data (list): List of dicts with 'url' and 'content'

    Returns:
        str: JSON string with structured competitor intelligence
    """

    llm = get_llm_provider()

    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"

    schema = """
{
  "company": null,
  "direct_competitors": [
    {
      "name": null,
      "description": null,
      "similarity_score": null,
      "key_products": [],
      "strengths": [],
      "weaknesses": [],
      "source": null
    }
  ],
  "indirect_competitors": [
    {
      "name": null,
      "description": null,
      "market_segment": null,
      "source": null
    }
  ],
  "emerging_competitors": [
    {
      "name": null,
      "description": null,
      "innovation_area": null,
      "source": null
    }
  ],
  "competitive_landscape": {
    "market_category": null,
    "differentiation_factors": [],
    "competitive_advantages": [],
    "market_leaders": []
  }
}
"""

    prompt = f"""
You are a competitive intelligence analyst specializing in startup ecosystems.

Analyze the research data and identify the company's competitive landscape.

Extract:

DIRECT COMPETITORS
Companies offering similar products targeting the same customers.

INDIRECT COMPETITORS
Companies solving similar problems with different approaches.

EMERGING COMPETITORS
New startups or innovative challengers.

For each competitor provide:

• name
• short description
• key products
• strengths
• weaknesses
• similarity score (0–1 where 1 = identical business)

Return JSON strictly following this schema:

{schema}

Rules:

- Do not include the target company itself
- Include citations using source numbers (e.g., [1])
- Return valid JSON only
- Use null if information is not available

DATA:
{formatted_data}
"""

    response = llm.complete(prompt=prompt)

    output = response.strip()

    try:
        parsed = json.loads(output)

        parsed["sources"] = [
            {"id": i+1, "url": item["url"]}
            for i, item in enumerate(data)
        ]

        return json.dumps(parsed, indent=2)

    except Exception:

        return json.dumps({
            "error": "Invalid JSON returned by LLM",
            "raw_response": output,
            "sources": [item["url"] for item in data]
        }, indent=2)