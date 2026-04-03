"""
LLM Factory Module

This module provides a factory for creating LLM provider instances.
It reads the configuration from environment variables and returns
the appropriate LLM provider.

Configuration (via environment variables):
- LLM_PROVIDER: The LLM provider to use ("openai", "anthropic", "gemini")
                Defaults to "openai" if not specified

Provider-specific configuration:
- OpenAI: OPENAI_API_KEY, OPENAI_MODEL, OPENAI_MAX_TOKENS
- Anthropic: ANTHROPIC_API_KEY, ANTHROPIC_MODEL, ANTHROPIC_MAX_TOKENS
- Gemini: GOOGLE_API_KEY, GEMINI_MODEL, GEMINI_MAX_TOKENS

Usage:
    from llm.factory import get_llm_provider
    
    # Get the configured LLM provider
    llm = get_llm_provider()
    
    # Use it generically
    response = llm.complete(prompt="Your prompt")
"""

import os
from typing import Optional

from llm.base import LLMProvider

# Available providers mapping
_PROVIDERS = {
    "openai": "llm.openai_provider.OpenAIProvider",
    "anthropic": "llm.anthropic_provider.AnthropicProvider",
    "gemini": "llm.gemini_provider.GeminiProvider",
}


def get_llm_provider(provider: Optional[str] = None, **kwargs) -> LLMProvider:
    """
    Get an LLM provider instance based on configuration.
    
    This function reads the LLM_PROVIDER environment variable to determine
    which provider to use, or accepts an override via the provider parameter.
    
    Args:
        provider: Optional provider override (uses LLM_PROVIDER env var if not provided)
        **kwargs: Additional provider-specific configuration options
        
    Returns:
        LLMProvider: An instance of the configured LLM provider
        
    Raises:
        ValueError: If an invalid provider is specified or required config is missing
    """
    # Get provider from parameter or environment variable
    provider = provider or os.getenv("LLM_PROVIDER", "openai").lower()
    
    if provider not in _PROVIDERS:
        available = ", ".join(_PROVIDERS.keys())
        raise ValueError(
            f"Invalid LLM provider: '{provider}'. Available providers: {available}"
        )
    
    # Dynamically import and instantiate the provider
    provider_class_path = _PROVIDERS[provider]
    module_path, class_name = provider_class_path.rsplit(".", 1)
    
    try:
        from importlib import import_module
        module = import_module(module_path)
        provider_class = getattr(module, class_name)
        return provider_class(**kwargs)
    except ImportError as e:
        raise ImportError(
            f"Failed to import {provider} provider. "
            f"Install required package and try again. Error: {str(e)}"
        )
    except ValueError as e:
        # Re-raise configuration errors
        raise
    except Exception as e:
        raise RuntimeError(
            f"Failed to initialize {provider} provider: {str(e)}"
        )


def list_available_providers() -> list[str]:
    """
    List all available LLM providers.
    
    Returns:
        list[str]: List of available provider names
    """
    return list(_PROVIDERS.keys())


def is_provider_available(provider: str) -> bool:
    """
    Check if a provider is available (properly configured).
    
    Args:
        provider: The provider name to check
        
    Returns:
        bool: True if the provider can be initialized with current config
    """
    try:
        llm = get_llm_provider(provider)
        return llm.is_available() and llm.validate_config()
    except Exception:
        return False


def get_default_provider() -> str:
    """
    Get the default provider name.
    
    Returns:
        str: The default provider name (from LLM_PROVIDER env var or "openai")
    """
    return os.getenv("LLM_PROVIDER", "openai").lower()
