import json
from agents.planner_agent import planner_agent
from agents.search_agent import search_agent
from agents.crawl_agent import crawl_agent
from agents.technology_stack_agent import technology_stack_agent
from utils.text_utils import count_tokens, truncate_text_to_tokens
from app.config import MODEL_MAX_TOKENS


async def run_technology_stack_research(company: str):

    queries = [
        f"{company} tech stack",
        f"{company} engineering blog",
        f"{company} github",
        f"site:github.com {company}",
        f"{company} architecture",
        f"{company} backend infrastructure",
        f"{company} developer platform",
        f"{company} programming languages"
    ]

    combined_query = " | ".join(queries)

    plan = planner_agent(combined_query)

    print(f"Research plan: {plan}")

    urls = []

    for q in queries:
        results = search_agent(q, "US")
        urls.extend(results)

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

    tech_json = technology_stack_agent(research_data)

    try:

        tech_data = json.loads(tech_json)

        tech_data["metadata"] = {
            "company": company,
            "source_count": len(research_data)
        }

        return tech_data

    except json.JSONDecodeError:

        return {
            "error": "Failed to parse technology stack data",
            "raw_response": tech_json
        }