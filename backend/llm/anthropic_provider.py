import json
import os
import time
from typing import Optional

from llm.base import LLMProvider

class AnthropicProvider(LLMProvider):

    def __init__(
        self,
        api_key: Optional[str] = None,
        model: Optional[str] = None,
        max_tokens: Optional[int] = None,
    ):

        from app.config import ANTHROPIC_MAX_TOKENS

        self._api_key = api_key or os.getenv("ANTHROPIC_API_KEY")
        self._model = model or os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
        self._max_tokens = max_tokens or ANTHROPIC_MAX_TOKENS

        if not self._api_key:
            raise ValueError("ANTHROPIC_API_KEY not configured")

        try:
            from anthropic import Anthropic
            self._client = Anthropic(api_key=self._api_key)
        except ImportError:
            raise ImportError("Install anthropic: pip install anthropic")

    @property
    def provider_name(self) -> str:
        return "anthropic"

    @property
    def default_model(self) -> str:
        return self._model

    # ------------------------------------------------
    # Internal request with retry
    # ------------------------------------------------

    def _execute_with_retry(self, **kwargs):

        retries = 3

        for attempt in range(retries):
            try:
                return self._client.messages.create(**kwargs)
            except Exception as e:
                if attempt == retries - 1:
                    raise RuntimeError(f"Anthropic request failed: {str(e)}")
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
        system: Optional[str] = None,
        **kwargs,
    ) -> str:

        model = model or self._model
        max_tokens = max_tokens or self._max_tokens

        message = self._execute_with_retry(
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
            system=system,
            messages=[
                {
                    "role": "user",
                    "content": [{"type": "text", "text": prompt}],
                }
            ],
            **kwargs,
        )

        return message.content[0].text

    # ------------------------------------------------
    # JSON Completion
    # ------------------------------------------------

    def complete_json(self, prompt: str, **kwargs) -> dict:

        response = self.complete(
            prompt + "\n\nRespond with valid JSON only.",
            **kwargs,
        )

        cleaned = response.strip()

        if cleaned.startswith("```"):
            cleaned = cleaned.split("```")[1]

        return json.loads(cleaned)

    # ------------------------------------------------
    # Chat
    # ------------------------------------------------

    def chat(
        self,
        messages: list[dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs,
    ) -> str:

        model = model or self._model
        max_tokens = max_tokens or self._max_tokens

        system_prompt = None
        anthropic_messages = []

        for msg in messages:

            role = msg.get("role", "user")

            if role == "system":
                system_prompt = msg.get("content")
                continue

            anthropic_messages.append(
                {
                    "role": role,
                    "content": [{"type": "text", "text": msg.get("content", "")}],
                }
            )

        message = self._execute_with_retry(
            model=model,
            max_tokens=max_tokens,
            temperature=temperature,
            system=system_prompt,
            messages=anthropic_messages,
            **kwargs,
        )

        return message.content[0].text

    # ------------------------------------------------
    # Chat JSON
    # ------------------------------------------------

    def chat_json(self, messages, **kwargs) -> dict:

        modified = list(messages)

        if modified:
            modified[-1]["content"] += "\n\nRespond with valid JSON only."

        response = self.chat(modified, **kwargs)

        cleaned = response.strip()

        if cleaned.startswith("```"):
            cleaned = cleaned.split("```")[1]

        return json.loads(cleaned)

    def is_available(self) -> bool:
        return bool(self._api_key)

    def validate_config(self) -> bool:
        return bool(self._api_key and self._model)