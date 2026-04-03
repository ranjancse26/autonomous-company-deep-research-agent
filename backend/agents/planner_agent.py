import json

from llm.factory import get_llm_provider


def planner_agent(query):
    """
    Generates a dynamic research plan based on the given query.
    
    This function is LLM-agnostic and works with any LLM provider
    configured via the LLM_PROVIDER environment variable.
    
    Args:
        query (str): The research query (e.g., "Analyze startup Cursor AI")
    
    Returns:
        list: Structured research plan with specific steps
    """
    
    # Get the configured LLM provider (LLM-agnostic)
    llm = get_llm_provider()
    
    prompt = f"""
You are a research planning expert. Create a concise, actionable research plan for the following query:

"{query}"

The plan should be structured as a list of 6-10 specific, sequential steps that a research pipeline can execute. Each step should be clear and focused on a specific research task.

Consider including steps like:
- Searching for relevant information
- Collecting and analyzing company data
- Identifying competitors
- Analyzing market trends
- Evaluating business models
- Assessing risks and opportunities
- Generating key insights

Return ONLY the list of steps as a JSON array. Do not include any additional text or explanations.
"""
    
    try:
        # Use the generic LLM interface
        response = llm.complete(prompt=prompt)
        
        # Clean response before parsing
        clean_response = response.strip().strip('`').strip()
        if clean_response.startswith('json'):
            clean_response = clean_response[4:].strip()
        
        plan = json.loads(clean_response)
        
        # Validate plan format
        if not isinstance(plan, list):
            raise ValueError("Plan must be a list")
            
        # Clean and standardize steps
        plan = [step.strip() for step in plan if step.strip()]
        
        # Ensure plan has reasonable length
        if len(plan) < 3 or len(plan) > 15:
            raise ValueError(f"Plan must have 3-15 steps, got {len(plan)}")
            
        return plan
        
    except Exception as e:
        print(f"Error generating plan: {e}")
        # Fallback to default plan if LLM fails
        return [
            "Search for information about the company/topic",
            "Collect relevant articles and data",
            "Extract key details about the subject",
            "Identify competitors and market landscape",
            "Analyze market opportunities and risks",
            "Evaluate business model and value proposition",
            "Generate investment thesis and recommendations"
        ]