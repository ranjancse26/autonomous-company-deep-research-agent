from services.brightdata_service import serp_search
from bs4 import BeautifulSoup

def search_agent(query, country="US"):
    results = serp_search(query, country)

    # Check if we got an error response
    if "error" in results:
        print(f"Search error: {results['error']}")
        return []

    # Extract organic search results from JSON response
    urls = []
    if "organic" in results:
        for result in results["organic"]:
            if "link" in result:
                url = result["link"]
                # Look for valid http/https URLs that are not Google's own pages
                if url.startswith("http") and "google.com" not in url and "googleusercontent.com" not in url:
                    if url not in urls:
                        urls.append(url)

    return urls