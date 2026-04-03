from agents.planner_agent import planner_agent
from agents.search_agent import search_agent
from agents.crawl_agent import crawl_agent
from agents.reasoning_agent import reasoning_agent
from agents.report_agent import generate_report
from utils.text_utils import count_tokens, truncate_text_to_tokens
from app.config import MODEL_MAX_TOKENS

async def run_research(query, country="US"):

    plan = planner_agent(query)
    print(f"Research plan: {plan}")

    # Search for relevant URLs
    urls = search_agent(query, country)
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

    # Analyze collected data using the plan
    insights = reasoning_agent(research_data, plan)

    # Generate report using the plan and insights
    report = generate_report(query, insights, plan)

    return report