from agents.planner_agent import planner_agent
from agents.search_agent import search_agent
from agents.crawl_agent import crawl_agent
from agents.funding_extraction_agent import funding_extraction_agent
from utils.text_utils import count_tokens, truncate_text_to_tokens
from app.config import MODEL_MAX_TOKENS
import json

async def run_funding_research(company: str):
    """
    Run research pipeline specifically for funding history extraction.
    
    Args:
        company (str): Company name to research
        
    Returns:
        dict: Funding history data with round, amount, and investors
    """
    # Construct funding-specific search queries
    queries = [
        f"{company} funding round",
        f"{company} series funding",
        f"{company} investors"
    ]
    
    # Use all queries for comprehensive research
    combined_query = " | ".join(queries)
    
    # Replicate research pipeline but stop before reasoning/report generation
    plan = planner_agent(combined_query)
    print(f"Research plan: {plan}")

    # Search for relevant URLs
    urls = search_agent(company, "US")
    print(f"Found {len(urls)} relevant URLs")

    # Crawl and collect data from each URL
    research_data = []
    total_tokens = 0
    for i, url in enumerate(urls):
        print(f"Crawling URL {i+1}: {url}")
        crawl_result = crawl_agent(url)
        research_data.append({
            "url": url,
            "content": crawl_result["text"]
        })
        total_tokens += count_tokens(crawl_result["text"])

    # Check if total content exceeds model's max token limit and truncate if needed
    if total_tokens > MODEL_MAX_TOKENS:
        print(f"Total content ({total_tokens} tokens) exceeds model's max token limit ({MODEL_MAX_TOKENS} tokens). Truncating...")
        # Calculate total content as a single string
        full_content = "\n".join([f"URL: {item['url']}\nContent: {item['content']}" for item in research_data])
        # Truncate to fit within max tokens
        truncated_content = truncate_text_to_tokens(full_content, max_tokens=MODEL_MAX_TOKENS)
        # Create a new research data structure with truncated content
        research_data = [{
            "url": "truncated_content",
            "content": truncated_content
        }]

    # Extract funding information using specialized agent
    funding_json = funding_extraction_agent(research_data)
    
    # Return the funding history
    try:
        funding_data = json.loads(funding_json)
        return funding_data
    except json.JSONDecodeError:
        # If JSON parsing fails, return a structured error
        return {"error": "Failed to parse funding data", "raw_response": funding_json}