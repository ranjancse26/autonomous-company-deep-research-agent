import tiktoken
from app.config import MODEL_MAX_TOKENS

def clean_text(text):
    return text.replace("\n", " ").strip()

def count_tokens(text, model="o4-mini"):
    """Count the number of tokens in the given text using the specified model's tokenizer."""
    encoding = tiktoken.encoding_for_model(model)
    return len(encoding.encode(text))

def truncate_text_to_tokens(text, max_tokens=MODEL_MAX_TOKENS, model="o4-mini"):
    """Truncate text to fit within the maximum number of tokens for the specified model."""
    encoding = tiktoken.encoding_for_model(model)
    tokens = encoding.encode(text)
    
    if len(tokens) <= max_tokens:
        return text
    
    truncated_tokens = tokens[:max_tokens]
    return encoding.decode(truncated_tokens)