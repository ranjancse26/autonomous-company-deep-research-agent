import json
from agents.planner_agent import planner_agent
from agents.search_agent import search_agent
from agents.crawl_agent import crawl_agent
from agents.news_intelligence_agent import news_intelligence_agent
from utils.text_utils import count_tokens, truncate_text_to_tokens
from app.config import MODEL_MAX_TOKENS


async def run_news_intelligence_research(company: str):

    # High-signal news queries
    queries = [
        f"{company} news",
        f"{company} funding",
        f"{company} product launch",
        f"{company} partnership",
        f"{company} acquisition",
        f"{company} press release",
        f"{company} startup announcement"
    ]

    combined_query = " | ".join(queries)

    plan = planner_agent(combined_query)

    print(f"Research plan: {plan}")

    urls = []

    for q in queries:
        results = search_agent(q, "US")
        urls.extend(results)

    # Deduplicate URLs
    urls = list(set(urls))

    print(f"Found {len(urls)} unique URLs")

    research_data = []
    total_tokens = 0

    for i, url in enumerate(urls):

        print(f"Crawling URL {i+1}: {url}")

        crawl_result = crawl_agent(url)

        text = crawl_result["text"]

        research_data.append({
            "url": url,
            "content": text
        })

        total_tokens += count_tokens(text)

    # Handle token limits
    if total_tokens > MODEL_MAX_TOKENS:

        print("Content exceeds token limit. Truncating.")

        full_content = "\n".join(
            [f"URL: {item['url']}\nContent: {item['content']}" for item in research_data]
        )

        truncated_content = truncate_text_to_tokens(
            full_content,
            max_tokens=MODEL_MAX_TOKENS
        )

        research_data = [{
            "url": "truncated_content",
            "content": truncated_content
        }]

    # Extract structured news intelligence
    news_json = news_intelligence_agent(research_data)

    try:

        news_data = json.loads(news_json)

        # Add metadata
        news_data["metadata"] = {
            "company": company,
            "article_count": len(research_data)
        }

        return news_data

    except json.JSONDecodeError:

        return {
            "error": "Failed to parse news intelligence",
            "raw_response": news_json
        }