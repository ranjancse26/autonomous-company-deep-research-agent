import json
import os
import time
from typing import Optional

from openai import OpenAI
from llm.base import LLMProvider

class OpenAIProvider(LLMProvider):

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ):

        from app.config import OPENAI_MAX_TOKENS

        self._api_key = api_key or os.getenv("OPENAI_API_KEY")
        self._model = model or os.getenv("OPENAI_MODEL", "gpt-5-mini")
        self._max_tokens = max_tokens or OPENAI_MAX_TOKENS

        if not self._api_key:
            raise ValueError("OPENAI_API_KEY not configured")

        self._client = OpenAI(api_key=self._api_key)

    @property
    def provider_name(self) -> str:
        return "openai"

    @property
    def default_model(self) -> str:
        return self._model

    # ------------------------------------------------
    # Model capability helpers
    # ------------------------------------------------

    def _supports_temperature(self, model: str) -> bool:

        model = model.lower()

        reasoning_models = {
            "o1",
            "o1-mini",
            "o3",
            "o3-mini",
            "o4-mini",
            "o4-mini-high",
            "gpt-5-mini",
        }

        if model in reasoning_models:
            return False

        reasoning_prefixes = (
            "o1",
            "o3",
            "o4",
            "gpt-5"
        )

        if model.startswith(reasoning_prefixes):
            return False

        return True

    def _build_params(self, model, temperature, max_tokens, **kwargs):
        """Build request params safely"""

        params = {
            "model": model,
            "max_output_tokens": max_tokens,
            **kwargs
        }

        if self._supports_temperature(model):
            params["temperature"] = temperature

        return params

    # ------------------------------------------------
    # Retry wrapper
    # ------------------------------------------------

    def _retry(self, fn):

        retries = 3

        for attempt in range(retries):

            try:
                return fn()

            except Exception as e:

                if attempt == retries - 1:
                    raise RuntimeError(f"OpenAI request failed: {str(e)}")

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

        params = self._build_params(
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            input=prompt,
            **kwargs
        )

        def run():
            response = self._client.responses.create(**params)
            return response.output_text

        return self._retry(run)

    # ------------------------------------------------
    # JSON completion
    # ------------------------------------------------

    def complete_json(self, prompt: str, **kwargs):

        def run():

            response = self._client.responses.create(
                model=self._model,
                input=prompt,
                response_format={"type": "json_object"},
                **kwargs
            )

            return json.loads(response.output_text)

        return self._retry(run)

    # ------------------------------------------------
    # Chat
    # ------------------------------------------------

    def chat(
        self,
        messages,
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ):

        model = model or self._model
        max_tokens = max_tokens or self._max_tokens

        params = self._build_params(
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
            input=messages,
            **kwargs
        )

        def run():
            response = self._client.responses.create(**params)
            return response.output_text

        return self._retry(run)

    # ------------------------------------------------
    # Chat JSON
    # ------------------------------------------------

    def chat_json(self, messages, **kwargs):

        def run():

            response = self._client.responses.create(
                model=self._model,
                input=messages,
                response_format={"type": "json_object"},
                **kwargs
            )

            return json.loads(response.output_text)

        return self._retry(run)

    def is_available(self) -> bool:
        return bool(self._api_key)

    def validate_config(self) -> bool:
        return bool(self._api_key and self._model)