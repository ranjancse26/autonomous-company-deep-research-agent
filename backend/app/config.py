import os
from dotenv import load_dotenv

load_dotenv()

# ============================================================================
# LLM Configuration (LLM-agnostic)
# ============================================================================
# The system now supports multiple LLM providers. Set LLM_PROVIDER to:
#   - "openai" (default) - Uses OpenAI models
#   - "anthropic" - Uses Anthropic Claude models
#   - "gemini" - Uses Google Gemini models

LLM_PROVIDER = os.getenv("LLM_PROVIDER", "openai").lower()

# OpenAI Configuration
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "o4-mini")
_openai_max_tokens = os.getenv("OPENAI_MAX_TOKENS", "")
OPENAI_MAX_TOKENS = int(_openai_max_tokens) if _openai_max_tokens and _openai_max_tokens.isdigit() else None

# Anthropic Configuration
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ANTHROPIC_MODEL = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-20250514")
_anthropic_max_tokens = os.getenv("ANTHROPIC_MAX_TOKENS", "")
ANTHROPIC_MAX_TOKENS = int(_anthropic_max_tokens) if _anthropic_max_tokens and _anthropic_max_tokens.isdigit() else 4096

# Google Gemini Configuration
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
_gemini_max_tokens = os.getenv("GEMINI_MAX_TOKENS", "")
GEMINI_MAX_TOKENS = int(_gemini_max_tokens) if _gemini_max_tokens and _gemini_max_tokens.isdigit() else None

# Legacy support: MODEL_MAX_TOKENS maps to the active provider's max tokens
MODEL_MAX_TOKENS = int(os.getenv("MODEL_MAX_TOKENS", 90000))

# ============================================================================
# BrightData Configuration
# ============================================================================
BRIGHTDATA_API_KEY = os.getenv("BRIGHTDATA_API_KEY")
BRIGHTDATA_ENDPOINT = os.getenv("BRIGHTDATA_ENDPOINT", "https://api.brightdata.com/request")
BRIGHTDATA_SERP_ZONE = os.getenv("BRIGHTDATA_SERP_ZONE", "serp_api1")
BRIGHTDATA_WEBSCRAPE_ZONE = os.getenv("BRIGHTDATA_WEBSCRAPE_ZONE", "web_unlocker1")

# ============================================================================
# Crawler Configuration
# ============================================================================
CRAWL_TEXT_MAX_LENGTH = int(os.getenv("CRAWL_TEXT_MAX_LENGTH", 10000))
CRAWL_TIMEOUT = int(os.getenv("CRAWL_TIMEOUT", 1800))

# ============================================================================
# Validate required environment variables
# ============================================================================
if not BRIGHTDATA_API_KEY:
    raise ValueError("BRIGHTDATA_API_KEY environment variable is not set. Please check your .env file.")

if not BRIGHTDATA_SERP_ZONE:
    raise ValueError("BRIGHTDATA_SERP_ZONE environment variable is not set. Please check your .env file.")

if not BRIGHTDATA_WEBSCRAPE_ZONE:
    raise ValueError("BRIGHTDATA_WEBSCRAPE_ZONE environment variable is not set. Please check your .env file.")

# Validate LLM provider configuration
if LLM_PROVIDER == "openai":
    if not OPENAI_API_KEY:
        raise ValueError("OPENAI_API_KEY environment variable is not set. Please check your .env file.")
    if not OPENAI_MODEL:
        raise ValueError("OPENAI_MODEL environment variable is not set. Please check your .env file.")
elif LLM_PROVIDER == "anthropic":
    if not ANTHROPIC_API_KEY:
        raise ValueError("ANTHROPIC_API_KEY environment variable is not set. Please check your .env file.")
elif LLM_PROVIDER == "gemini":
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable is not set. Please check your .env file.")
else:
    raise ValueError(f"Invalid LLM_PROVIDER: '{LLM_PROVIDER}'. Must be one of: openai, anthropic, gemini")