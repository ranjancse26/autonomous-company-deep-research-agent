from agents.planner_agent import planner_agent

# Test with a startup analysis query
test_query1 = "Analyze startup Cursor AI"
print(f"Testing query: {test_query1}")
plan1 = planner_agent(test_query1)
print(f"Generated plan:\n")
for i, step in enumerate(plan1, 1):
    print(f"{i}. {step}")

print("\n" + "="*50 + "\n")

# Test with a company analysis query
test_query2 = "Research Tesla's financial performance in 2023"
print(f"Testing query: {test_query2}")
plan2 = planner_agent(test_query2)
print(f"Generated plan:\n")
for i, step in enumerate(plan2, 1):
    print(f"{i}. {step}")