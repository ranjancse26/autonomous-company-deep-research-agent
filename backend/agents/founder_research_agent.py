import json
from llm.factory import get_llm_provider


def founder_research_agent(data):
    """
    Extract comprehensive founder intelligence from research data.

    Args:
        data (list): List of dicts with 'url' and 'content'

    Returns:
        str: JSON string with structured founder intelligence
    """

    llm = get_llm_provider()

    # Format crawled data
    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"

    schema = """
{
  "company": null,
  "founders": [
    {
      "name": null,
      "title": null,
      "linkedin": null,
      "twitter": null,
      "education": [],
      "previous_companies": [],
      "notable_achievements": [],
      "location": null,
      "bio_summary": null,
      "credibility_signals": [],
      "source": null
    }
  ],
  "leadership_team": [
    {
      "name": null,
      "title": null,
      "background": null,
      "source": null
    }
  ]
}
"""

    prompt = f"""
You are a venture capital research analyst specializing in founder intelligence.

Analyze the research data and extract detailed founder information.

Identify:

FOUNDERS
People who founded the company.

For each founder extract:

• name
• title/role (CEO, CTO, etc.)
• LinkedIn profile
• Twitter/X profile if available
• education background
• previous companies or startups
• notable achievements (exits, patents, awards)
• location
• short biography summary
• credibility signals (successful exits, notable experience)

Also identify key leadership team members if mentioned.

Return JSON strictly following this schema:

{schema}

Rules:

- Include all founders mentioned.
- Use null if information is not available.
- Include source citations using source numbers (e.g., [1]).
- Do not include explanations.
- Return valid JSON only.

DATA:
{formatted_data}
"""

    response = llm.complete(prompt=prompt)

    output = response.strip()

    # Remove markdown code blocks if present
    if output.startswith("```json"):
        output = output[7:]
    if output.startswith("```"):
        output = output[3:]
    if output.endswith("```"):
        output = output[:-3]
    output = output.strip()

    try:
        parsed = json.loads(output)

        parsed["sources"] = [
            {"id": i + 1, "url": item["url"]}
            for i, item in enumerate(data)
        ]

        return json.dumps(parsed, indent=2)

    except Exception:

        return json.dumps({
            "error": "Invalid JSON returned by LLM",
            "raw_response": output,
            "sources": [item["url"] for item in data]
        }, indent=2)