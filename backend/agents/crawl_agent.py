import requests
import time
import random
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from app.config import CRAWL_TEXT_MAX_LENGTH, CRAWL_TIMEOUT
from services.brightdata_service import brightdata_scrape

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
MAX_RETRIES = 3

def fetch_page(url):
    """Fetch page with retry + headers"""

    headers = {
        "User-Agent": USER_AGENT,
        "Accept-Language": "en-US,en;q=0.9",
    }

    for attempt in range(MAX_RETRIES):
        try:
            response = requests.get(
                url,
                headers=headers,
                timeout=CRAWL_TIMEOUT,
                allow_redirects=True
            )

            if response.status_code == 200:
                return response.text

        except requests.exceptions.RequestException:
            time.sleep(1 + random.random())

    return None


def clean_text(soup):
    """Remove scripts, styles, nav, footer"""

    for tag in soup(["script", "style", "noscript", "header", "footer", "nav", "aside"]):
        tag.decompose()

    text = soup.get_text(separator=" ")
    text = " ".join(text.split())

    return text


def extract_metadata(soup):
    """Extract title + meta description"""

    title = ""

    if soup.title:
        title = soup.title.string.strip()

    description = ""
    meta = soup.find("meta", attrs={"name": "description"})
    if meta and meta.get("content"):
        description = meta["content"].strip()

    return {
        "title": title,
        "description": description
    }


def extract_headings(soup):
    headings = []

    for h in soup.find_all(["h1", "h2", "h3"]):
        headings.append(h.get_text(strip=True))

    return headings


def extract_links(soup, base_url):
    links = set()

    for a in soup.find_all("a", href=True):
        url = urljoin(base_url, a["href"])

        if url.startswith("http"):
            links.add(url)

    return list(links)


def crawl_agent(url):
    """Main crawling function"""

    html = fetch_page(url)

    if not html:
        # Fallback to BrightData web scraper
        result = brightdata_scrape(url)
        if "content" in result and not result.get("error"):
            html = result["content"]
        else:
            return {
                "url": url,
                "title": "",
                "description": "",
                "text": "",
                "headings": [],
                "links": []
            }

    soup = BeautifulSoup(html, "html.parser")

    metadata = extract_metadata(soup)
    text = clean_text(soup)
    headings = extract_headings(soup)
    links = extract_links(soup, url)

    return {
        "url": url,
        "title": metadata["title"],
        "description": metadata["description"],
        "text": text,
        "headings": headings,
        "links": links
    }