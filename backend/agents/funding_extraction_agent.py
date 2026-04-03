import json
from llm.factory import get_llm_provider


def funding_extraction_agent(data):
    """
    Extract funding history from crawled startup research data.

    Args:
        data (list): List of dicts with 'url' and 'content'

    Returns:
        str: JSON string containing structured funding history
    """

    llm = get_llm_provider()

    # Format crawled data
    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"

    schema = """
{
  "company": null,
  "funding_summary": {
    "total_funding": null,
    "latest_round": null,
    "latest_amount": null,
    "latest_date": null,
    "latest_valuation": null
  },
  "funding_rounds": [
    {
      "round": null,
      "amount": null,
      "date": null,
      "valuation": null,
      "investors": [],
      "source": null
    }
  ]
}
"""

    prompt = f"""
You are a venture capital research analyst.

Your task is to extract the COMPLETE funding history of the company from the research data.

Extract:

• company name
• funding rounds
• amount raised
• date of funding
• investors
• valuation (if mentioned)

Return JSON strictly following this schema:

{schema}

Rules:

- Extract ALL funding rounds mentioned.
- Use null if information is missing.
- Include the source number (e.g., [1], [2]) in the "source" field.
- Do NOT include explanations.
- Return valid JSON only.

DATA:
{formatted_data}
"""

    # Call LLM
    response = llm.complete(prompt=prompt)

    output = response.strip()

    # Try to parse JSON safely
    try:
        parsed = json.loads(output)

        parsed["sources"] = [
            {"id": i+1, "url": item["url"]}
            for i, item in enumerate(data)
        ]

        return json.dumps(parsed, indent=2)

    except Exception:

        # Fallback response if LLM returned invalid JSON
        return json.dumps({
            "error": "Invalid JSON returned by LLM",
            "raw_response": output,
            "sources": [item["url"] for item in data]
        }, indent=2)