import requests
from typing import List, Dict, Optional
from app.config import BRIGHTDATA_API_KEY

BRIGHTDATA_DATASET_ENDPOINT = "https://api.brightdata.com/datasets/v3/scrape"

class BrightDataNextGenService:

    DATASETS = {
        "chatgpt": "gd_m7aof0k82r803d5bjm",
        "perplexity": "gd_m7dhdot1vw9a7gc1n",
        "grok": "gd_m8ve0u141icu75ae74",
        "gemini": "gd_mbz66arm2mf9cu856y"
    }

    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {BRIGHTDATA_API_KEY}",
            "Content-Type": "application/json"
        }

    def _execute_dataset(self, dataset_id: str, inputs: List[Dict]) -> Dict:
        """
        Generic dataset executor
        """

        url = f"{BRIGHTDATA_DATASET_ENDPOINT}?dataset_id={dataset_id}&notify=false&include_errors=true"

        payload = {
            "input": inputs
        }

        try:
            response = requests.post(
                url,
                headers=self.headers,
                json=payload,
                timeout=120
            )

            if response.status_code != 200:
                return {
                    "error": f"HTTP {response.status_code}",
                    "content": response.text
                }

            return response.json()

        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

    # --------------------------------------------------
    # ChatGPT Search
    # --------------------------------------------------

    def chatgpt_search(
        self,
        prompts: List[str],
        country: str = "",
        web_search: bool = False,
        additional_prompt: str = ""
    ) -> Dict:

        dataset_id = self.DATASETS["chatgpt"]

        inputs = []

        for prompt in prompts:
            inputs.append({
                "url": "https://chatgpt.com/",
                "prompt": prompt,
                "country": country,
                "web_search": web_search,
                "additional_prompt": additional_prompt
            })

        return self._execute_dataset(dataset_id, inputs)

    # --------------------------------------------------
    # Perplexity Search
    # --------------------------------------------------

    def perplexity_search(self, prompts: List[str], country: str = "US") -> Dict:

        dataset_id = self.DATASETS["perplexity"]

        inputs = []

        for i, prompt in enumerate(prompts, start=1):
            inputs.append({
                "url": "https://www.perplexity.ai",
                "prompt": prompt,
                "country": country,
                "index": i
            })

        return self._execute_dataset(dataset_id, inputs)

    # --------------------------------------------------
    # Grok Search
    # --------------------------------------------------

    def grok_search(self, prompts: List[str]) -> Dict:

        dataset_id = self.DATASETS["grok"]

        inputs = []

        for i, prompt in enumerate(prompts, start=1):
            inputs.append({
                "url": f"https://grok.com/{i}",
                "prompt": prompt,
                "index": i
            })

        return self._execute_dataset(dataset_id, inputs)

    # --------------------------------------------------
    # Gemini Search
    # --------------------------------------------------

    def gemini_search(self, prompts: List[str]) -> Dict:

        dataset_id = self.DATASETS["gemini"]

        inputs = []

        for i, prompt in enumerate(prompts, start=1):
            inputs.append({
                "url": "https://gemini.google.com/",
                "prompt": prompt,
                "index": i
            })

        return self._execute_dataset(dataset_id, inputs)
