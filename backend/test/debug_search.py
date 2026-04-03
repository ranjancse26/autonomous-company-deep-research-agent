from services.brightdata_service import serp_search
from bs4 import BeautifulSoup

# Test the BrightData service
result = serp_search('test query')
print('Response keys:', list(result.keys()))

if 'content' in result:
    print('Content snippet:', repr(result['content'][:500]))
    
    # Try to parse the HTML
    soup = BeautifulSoup(result['content'], "html.parser")
    
    # Find all anchor tags
    all_links = soup.find_all("a", href=True)
    print(f"\nFound {len(all_links)} anchor tags")
    
    # Check for Google search result links
    for i, a in enumerate(all_links[:20]):  # Check first 20 links
        href = a["href"]
        print(f"{i+1}. {href}")
