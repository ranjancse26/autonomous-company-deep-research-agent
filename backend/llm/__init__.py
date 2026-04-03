"""
LLM Provider Package

This package provides a generic interface for different LLM providers,
making the codebase LLM-agnostic and allowing easy switching between
different LLM backends (OpenAI, Anthropic, Google Gemini, etc.).

Usage:
    from llm.factory import get_llm_provider
    
    # Get the configured LLM provider
    llm = get_llm_provider()
    
    # Use it in your agents
    response = llm.complete(prompt="Your prompt here")
"""

from llm.base import LLMProvider
from llm.factory import get_llm_provider

__all__ = ['LLMProvider', 'get_llm_provider']
