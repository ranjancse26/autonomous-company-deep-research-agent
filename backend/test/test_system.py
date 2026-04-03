import asyncio
from services.research_pipeline import run_research

async def test_research_system():
    print("Testing research system with query: 'Cursor AI'")
    
    try:
        result = await run_research("Cursor AI")
        print("\n=== Research Result ===")
        print(result)
        
        print("\nTest completed successfully!")
        
    except Exception as e:
        print(f"\nTest failed: {e}")
        import traceback
        print(f"\nStack trace: {traceback.format_exc()}")

if __name__ == "__main__":
    asyncio.run(test_research_system())
