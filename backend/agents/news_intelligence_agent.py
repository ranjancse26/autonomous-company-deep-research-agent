from llm.factory import get_llm_provider


def news_intelligence_agent(data):
    """
    Extract news intelligence from crawled data.
    
    This function is LLM-agnostic and works with any LLM provider
    configured via the LLM_PROVIDER environment variable.
    
    Expects data to be a list of dicts with 'url' and 'content'.
    Returns a JSON string with news details.
    """
    
    # Get the configured LLM provider (LLM-agnostic)
    llm = get_llm_provider()
    
    # Format data with sources
    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"
    
    prompt = f"""
You are a business analyst specializing in startup news and media intelligence.

Extract startup news from the provided search results.

Look for:
- Recent news articles about the company
- Product launches and updates
- Funding announcements
- Partnerships and acquisitions
- Leadership changes
- Major milestones

Return ONLY a JSON object with the following structure:
{{
  "news": [
    {{
      "title": "News headline or title",
      "source": "Publication or source name",
      "date": "Publication date if available",
      "summary": "Brief summary of the news",
      "url": "Link to the full article"
    }}
  ]
}}

If information is not found, return an empty list for news.
Do not include any extra text or explanation - only the JSON.
    """
    
    # Use the generic LLM interface
    response = llm.complete(prompt=prompt + "\n\nDATA:\n" + formatted_data)
    
    return response