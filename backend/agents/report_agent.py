def generate_report(query, insights, plan):

    report = {
        "query": query,
        "plan": plan,
        "analysis": insights
    }

    return report