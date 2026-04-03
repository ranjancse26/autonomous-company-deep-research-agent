from llm.factory import get_llm_provider


def technology_stack_agent(data):
    """
    Extract technology stack information from crawled data.
    
    This function is LLM-agnostic and works with any LLM provider
    configured via the LLM_PROVIDER environment variable.
    
    Expects data to be a list of dicts with 'url' and 'content'.
    Returns a JSON string with technology stack details.
    """
    
    # Get the configured LLM provider (LLM-agnostic)
    llm = get_llm_provider()
    
    # Format data with sources
    formatted_data = ""
    for i, item in enumerate(data):
        formatted_data += f"Source {i+1} ({item['url']}):\n{item['content']}\n\n"
    
    prompt = f"""
You are a business analyst specializing in technology stack analysis.

Extract technology stack information from the provided search results.

Look for:
- Programming languages used (e.g., Python, JavaScript, Java, Go, Rust)
- Developer tools and frameworks (e.g., React, Django, AWS, Docker, Kubernetes)
- Databases and storage technologies
- DevOps and CI/CD tools
- APIs and third-party integrations

Return ONLY a JSON object with the following structure:
{{
  "technology_stack": {{
    "programming_languages": ["Language1", "Language2"],
    "developer_tools": ["Tool1", "Tool2", "Tool3"],
    "frameworks": ["Framework1", "Framework2"],
    "databases": ["Database1", "Database2"],
    "devops_tools": ["Tool1", "Tool2"],
    "other_technologies": ["Technology1", "Technology2"]
  }}
}}

If information is not found, return empty lists for each category.
Do not include any extra text or explanation - only the JSON.
    """
    
    # Use the generic LLM interface
    response = llm.complete(prompt=prompt + "\n\nDATA:\n" + formatted_data)
    
    return response