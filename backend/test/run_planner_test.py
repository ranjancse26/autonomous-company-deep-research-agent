import sys
import os

# Add the project root directory to the Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from agents.planner_agent import planner_agent

# Test queries
test_queries = [
    "Analyze startup Cursor AI",
    "Research Tesla's financial performance in 2023",
    "Evaluate market potential for electric vehicles in India"
]

print("Testing Planner Agent with different queries...\n")
for i, query in enumerate(test_queries, 1):
    print(f"Query {i}: {query}")
    try:
        plan = planner_agent(query)
        print(f"Plan ({len(plan)} steps):")
        for j, step in enumerate(plan, 1):
            print(f"  {j}. {step}")
    except Exception as e:
        print(f"Error: {e}")
    print("\n" + "="*60 + "\n")