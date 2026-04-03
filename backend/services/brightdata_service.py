import requests
from urllib.parse import quote
from typing import Dict, Optional
from app.config import BRIGHTDATA_ENDPOINT, BRIGHTDATA_API_KEY, BRIGHTDATA_SERP_ZONE, BRIGHTDATA_WEBSCRAPE_ZONE

BRIGHTDATA_ENDPOINT = BRIGHTDATA_ENDPOINT or "https://api.brightdata.com/request"

def _brightdata_request(payload: Dict) -> Dict:
    """
    Internal helper method for sending requests to Bright Data API
    """

    headers = {
        "Authorization": f"Bearer {BRIGHTDATA_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(
            BRIGHTDATA_ENDPOINT,
            json=payload,
            headers=headers,
            timeout=60
        )

        if response.status_code == 400:
            return {"error": "Bad Request - Invalid parameters", "content": response.text}

        if response.status_code == 401:
            return {"error": "Unauthorized - Invalid API token", "content": response.text}

        if response.status_code == 429:
            return {"error": "Rate limit exceeded", "content": response.text}

        if response.status_code >= 500:
            return {"error": "Bright Data server error", "content": response.text}

        try:
            return response.json()
        except ValueError:
            return {"content": response.text}

    except requests.exceptions.Timeout:
        return {"error": "Request timeout"}

    except requests.exceptions.RequestException as e:
        return {"error": f"Request failed: {str(e)}"}


# -------------------------------------------------------
# GOOGLE SERP SEARCH
# -------------------------------------------------------

def serp_search(query: str, country: str = "US") -> Dict:
    """
    Perform Google SERP search via Bright Data
    """

    encoded_query = quote(query)

    payload = {
        "zone": BRIGHTDATA_SERP_ZONE,
        "url": f"https://www.google.com/search?q={encoded_query}&brd_json=1",
        "format": "raw",
        "method": "GET",
        "country": country
    }

    return _brightdata_request(payload)


# -------------------------------------------------------
# GENERAL WEB SCRAPER
# -------------------------------------------------------

def brightdata_scrape(
    url: str,
    country: str = "US",
    method: str = "GET",
    headers: Optional[Dict] = None,
    body: Optional[Dict] = None,
    render_js: bool = False
) -> Dict:
    """
    Generic Bright Data web scraper

    Args:
        url: Target webpage
        country: Proxy geolocation
        method: HTTP method
        headers: Optional request headers
        body: POST payload
        render_js: Enable JS rendering

    Returns:
        Scraped page response
    """

    payload = {
        "zone": BRIGHTDATA_WEBSCRAPE_ZONE,
        "url": url,
        "method": method,
        "country": country,
        "format": "raw"
    }

    if headers:
        payload["headers"] = headers

    if body:
        payload["body"] = body

    if render_js:
        payload["render"] = True

    return _brightdata_request(payload)