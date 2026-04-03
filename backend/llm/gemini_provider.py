import json
import os
import time
from typing import Optional

from llm.base import LLMProvider

class GeminiProvider(LLMProvider):

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ):

        from app.config import GEMINI_MAX_TOKENS

        self._api_key = api_key or os.getenv("GOOGLE_API_KEY")
        self._model = model or os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
        self._max_tokens = max_tokens or GEMINI_MAX_TOKENS

        if not self._api_key:
            raise ValueError("GOOGLE_API_KEY is required")

        try:
            import google.generativeai as genai

            genai.configure(api_key=self._api_key)

            self._genai = genai
            self._model_instance = genai.GenerativeModel(self._model)

        except ImportError:
            raise ImportError(
                "Install google-generativeai: pip install google-generativeai"
            )

    @property
    def provider_name(self) -> str:
        return "gemini"

    @property
    def default_model(self) -> str:
        return self._model

    # ------------------------------------------------
    # Retry wrapper
    # ------------------------------------------------

    def _retry_generate(self, fn):

        retries = 3

        for attempt in range(retries):

            try:
                return fn()

            except Exception as e:

                if attempt == retries - 1:
                    raise RuntimeError(f"Gemini request failed: {str(e)}")

                time.sleep(2 ** attempt)

    # ------------------------------------------------
    # Completion
    # ------------------------------------------------

    def complete(
        self,
        prompt: str,
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:

        model = model or self._model
        max_tokens = max_tokens or self._max_tokens

        model_instance = self._genai.GenerativeModel(model)

        generation_config = {
            "temperature": temperature,
            "max_output_tokens": max_tokens,
            **kwargs
        }

        def run():
            response = model_instance.generate_content(
                prompt,
                generation_config=generation_config
            )
            return response.text

        return self._retry_generate(run)

    # ------------------------------------------------
    # JSON Completion
    # ------------------------------------------------

    def complete_json(self, prompt: str, **kwargs) -> dict:

        text = self.complete(
            prompt + "\n\nRespond ONLY with valid JSON.",
            **kwargs
        )

        return self._parse_json(text)

    # ------------------------------------------------
    # Chat
    # ------------------------------------------------

    def chat(
        self,
        messages: list[dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:

        model = model or self._model
        max_tokens = max_tokens or self._max_tokens

        model_instance = self._genai.GenerativeModel(model)

        history = []

        for msg in messages[:-1]:

            role = msg.get("role", "user")

            if role == "system":
                history.append({"role": "user", "parts": [msg["content"]]})
                continue

            history.append({
                "role": "model" if role == "assistant" else "user",
                "parts": [msg.get("content", "")]
            })

        last_prompt = messages[-1]["content"] if messages else ""

        def run():

            chat = model_instance.start_chat(history=history)

            response = chat.send_message(
                last_prompt,
                generation_config={
                    "temperature": temperature,
                    "max_output_tokens": max_tokens,
                    **kwargs
                }
            )

            return response.text

        return self._retry_generate(run)

    # ------------------------------------------------
    # Chat JSON
    # ------------------------------------------------

    def chat_json(self, messages, **kwargs) -> dict:

        modified = list(messages)

        if modified:
            modified[-1]["content"] += "\n\nRespond ONLY with JSON."

        text = self.chat(modified, **kwargs)

        return self._parse_json(text)

    # ------------------------------------------------
    # JSON parser
    # ------------------------------------------------

    def _parse_json(self, text: str):

        cleaned = text.strip()

        if cleaned.startswith("```"):
            cleaned = cleaned.split("```")[1]

        if cleaned.startswith("json"):
            cleaned = cleaned[4:]

        cleaned = cleaned.strip()

        return json.loads(cleaned)

    def is_available(self) -> bool:
        return bool(self._api_key)

    def validate_config(self) -> bool:
        return bool(self._api_key and self._model)