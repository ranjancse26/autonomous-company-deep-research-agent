"""
LLM Provider Base Interface

This module defines the abstract base class for all LLM providers.
Any LLM implementation must inherit from this class and implement
all the required methods.

This design ensures:
- LLM-agnostic code across all agents
- Easy addition of new LLM providers
- Consistent API across different LLM backends
- Simple switching between providers via configuration
"""

from abc import ABC, abstractmethod
from typing import Any, Optional


class LLMProvider(ABC):
    """
    Abstract base class for LLM providers.
    
    All LLM implementations must inherit from this class and implement
    the required methods. This ensures a consistent interface across
    different LLM backends.
    """
    
    @property
    @abstractmethod
    def provider_name(self) -> str:
        """
        Return the name of the LLM provider.
        
        Returns:
            str: Name of the provider (e.g., "openai", "anthropic", "gemini")
        """
        pass
    
    @property
    @abstractmethod
    def default_model(self) -> str:
        """
        Return the default model for this provider.
        
        Returns:
            str: Default model identifier
        """
        pass
    
    @abstractmethod
    def complete(
        self,
        prompt: str,
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """
        Generate a completion for the given prompt.
        
        Args:
            prompt: The input prompt/text
            model: Optional model override (uses default if not specified)
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters
            
        Returns:
            str: The generated text completion
        """
        pass
    
    @abstractmethod
    def complete_json(
        self,
        prompt: str,
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> dict:
        """
        Generate a JSON completion for the given prompt.
        
        This method ensures the response is valid JSON.
        Some providers may need special handling for JSON mode.
        
        Args:
            prompt: The input prompt/text
            model: Optional model override
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters
            
        Returns:
            dict: The parsed JSON response
        """
        pass
    
    @abstractmethod
    def chat(
        self,
        messages: list[dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> str:
        """
        Generate a chat completion for the given messages.
        
        Args:
            messages: List of message dicts with 'role' and 'content' keys
            model: Optional model override
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters
            
        Returns:
            str: The generated text response
        """
        pass
    
    @abstractmethod
    def chat_json(
        self,
        messages: list[dict[str, str]],
        model: Optional[str] = None,
        temperature: float = 0,
        max_tokens: Optional[int] = None,
        **kwargs
    ) -> dict:
        """
        Generate a JSON chat completion for the given messages.
        
        This method ensures the response is valid JSON.
        
        Args:
            messages: List of message dicts with 'role' and 'content' keys
            model: Optional model override
            temperature: Sampling temperature (0.0 to 1.0)
            max_tokens: Maximum tokens to generate
            **kwargs: Additional provider-specific parameters
            
        Returns:
            dict: The parsed JSON response
        """
        pass
    
    def is_available(self) -> bool:
        """
        Check if the LLM provider is available and properly configured.
        
        Returns:
            bool: True if the provider can be used, False otherwise
        """
        return True
    
    @abstractmethod
    def validate_config(self) -> bool:
        """
        Validate that required configuration is present for this provider.
        
        Returns:
            bool: True if configuration is valid, False otherwise
        """
        pass
