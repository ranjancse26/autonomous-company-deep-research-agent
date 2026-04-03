from services.research_pipeline import run_research
from agents.vc_diligence_agent import VCDiligenceAgent
from services.report_generator import generate_report
import asyncio

async def test_vc_report():
    """Test VC report generation"""
    company = "Cursor AI"
    
    print(f"Generating VC report for: {company}")
    
    try:
        # Run research to get data
        research_data = await run_research(company)
        
        # Generate VC report using the research data
        agent = VCDiligenceAgent()
        report = agent.run(company, research_data)
        
        print(f"Report generated for: {report.company_name}")
        
        # Generate PDF report
        pdf_path = generate_report(report, "pdf")
        print(f"PDF report saved to: {pdf_path}")
        
        # Generate markdown report
        md_path = generate_report(report, "markdown")
        print(f"Markdown report saved to: {md_path}")
        
        return report, pdf_path, md_path
        
    except Exception as e:
        print(f"Error generating report: {e}")
        import traceback
        print(f"Stack trace: {traceback.format_exc()}")
        return None


if __name__ == "__main__":
    asyncio.run(test_vc_report())
