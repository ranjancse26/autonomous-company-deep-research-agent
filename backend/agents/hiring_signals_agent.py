import json
from llm.factory import get_llm_provider


def hiring_signals_agent(data):
    """
    Extract comprehensive hiring intelligence from research data.

    Args:
        data (list): List of dicts with 'url' and 'content'

    Returns:
        str: JSON string with structured hiring intelligence
    """

    llm = get_llm_provider()

    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"

    schema = """
{
  "company": null,
  "hiring_summary": {
    "total_open_roles": null,
    "engineering_roles": null,
    "hiring_velocity": null,
    "growth_signal": null
  },
  "department_hiring": {
    "engineering": [],
    "sales": [],
    "product": [],
    "marketing": [],
    "operations": []
  },
  "job_postings": [
    {
      "role": null,
      "department": null,
      "location": null,
      "remote": null,
      "platform": null,
      "posting_date": null,
      "url": null,
      "source": null
    }
  ],
  "hiring_locations": [],
  "recruiting_platforms": [],
  "remote_work_policy": null,
  "growth_indicators": []
}
"""

    prompt = f"""
You are a venture capital research analyst specializing in hiring intelligence.

Analyze the research data and extract hiring signals that indicate company growth.

Identify:

HIRING SUMMARY
• total open roles
• number of engineering roles
• hiring velocity (low / medium / high)
• growth signal (expansion, stable hiring, aggressive hiring)

DEPARTMENT HIRING
Break down hiring by departments:
engineering, sales, product, marketing, operations.

JOB POSTINGS
Extract individual job postings including:
• role title
• department
• location
• remote status
• recruiting platform (Greenhouse, Lever, company careers page)
• posting date
• job URL

OTHER SIGNALS
• hiring locations
• recruiting platforms used
• remote work policy
• growth indicators (rapid hiring, international expansion)

Return JSON strictly following this schema:

{schema}

Rules:

- Include citations using source numbers (e.g., [1]).
- Use null if information is unavailable.
- Do not include explanations.
- Return valid JSON only.

DATA:
{formatted_data}
"""

    response = llm.complete(prompt=prompt)

    output = response.strip()

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