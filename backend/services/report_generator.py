import os
import io
from app.schema import VCReport
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.enums import TA_CENTER
from reportlab.lib import colors


def generate_markdown(report: VCReport) -> str:
    md = f"""
# VC Diligence Report
## {report.company_name}

---

## Executive Summary
{report.summary}

---

## Company Overview
{report.company_overview}

---

## Product Description
{report.product}

---

## Technology Stack
{report.technology}

---

## Business Model
{report.business_model}

---

## Market Analysis

Market Size: {report.market_analysis.market_size}

Growth Rate: {report.market_analysis.growth_rate}

Target Market: {report.market_analysis.target_market}

### Market Segments
"""

    for s in report.market_analysis.market_segments:
        md += f"- {s}\n"

    md += "\n### Trends\n"
    for t in report.market_analysis.trends:
        md += f"- {t}\n"

    md += "\n## Competitive Landscape\n"

    for c in report.competitors:
        md += f"""
### {c.name}
{c.description}

Pricing: {c.pricing}
Market Share: {c.market_share}

#### Competitor Strengths
"""
        for s in c.strengths:
            md += f"- {s}\n"
        
        md += "\n#### Competitor Weaknesses\n"
        for w in c.weaknesses:
            md += f"- {w}\n"

    md += "\n## SWOT Analysis\n"

    md += "\n### Strengths\n"
    for s in report.swot.strengths:
        md += f"- {s}\n"

    md += "\n### Weaknesses\n"
    for s in report.swot.weaknesses:
        md += f"- {s}\n"

    md += "\n### Opportunities\n"
    for s in report.swot.opportunities:
        md += f"- {s}\n"

    md += "\n### Threats\n"
    for s in report.swot.threats:
        md += f"- {s}\n"

    md += "\n## Management Team\n"

    for member in report.team:
        md += f"""
### {member.name}
**Role:** {member.role}
{member.background}
"""

    md += "\n## Financial Analysis\n"
    md += f"""
Revenue Model: {report.financials.revenue_model}

Revenue Projections: {report.financials.revenue_projections}

### Key Expenses
"""
    for expense in report.financials.key_expenses:
        md += f"- {expense}\n"

    md += "\n### Funding History\n"
    for funding in report.financials.funding_history:
        md += f"- {funding}\n"

    md += f"""

---

## Traction & Milestones
{report.traction}

---

## Go-to-Market Strategy
{report.go_to_market_strategy}

---

## Use of Funds
{report.use_of_funds}

---

## Investment Thesis

{report.investment_thesis}

---

## Risks & Mitigation
"""

    for r in report.risks:
        md += f"- {r}\n"

    md += f"""

---

## Exit Potential
{report.exit_potential}
"""

    return md


def markdown_to_pdf(text: str) -> bytes:
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Title'],
        alignment=TA_CENTER,
        fontSize=24,
        spaceAfter=20
    )

    heading1_style = ParagraphStyle(
        'CustomHeading1',
        parent=styles['Heading1'],
        fontSize=16,
        spaceBefore=12,
        spaceAfter=6
    )

    heading2_style = ParagraphStyle(
        'CustomHeading2',
        parent=styles['Heading2'],
        fontSize=14,
        spaceBefore=10,
        spaceAfter=5
    )

    heading3_style = ParagraphStyle(
        'CustomHeading3',
        parent=styles['Heading3'],
        fontSize=12,
        spaceBefore=8,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['BodyText'],
        fontSize=10,
        leading=14
    )

    story = []

    # Add title
    story.append(Paragraph("VC Diligence Report", title_style))
    story.append(Spacer(1, 20))

    for line in text.split("\n"):
        if line.startswith("# "):
            continue  # Skip main title
        elif line.startswith("## "):
            story.append(Paragraph(line.replace("## ", ""), heading1_style))
        elif line.startswith("### "):
            story.append(Paragraph(line.replace("### ", ""), heading2_style))
        elif line.startswith("#### "):
            story.append(Paragraph(line.replace("#### ", ""), heading3_style))
        elif line.startswith("- "):
            story.append(Paragraph(f"• {line[2:]}", body_style))
        elif line.strip() == "---":
            story.append(Spacer(1, 10))
        elif line.strip():
            story.append(Paragraph(line, body_style))
        story.append(Spacer(1, 5))

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, leftMargin=72, rightMargin=72)
    doc.build(story)
    buffer.seek(0)
    return buffer.getvalue()


def generate_report(report: VCReport, output_format: str = "pdf"):
    """Generate report in specified format (markdown or pdf)"""
    md = generate_markdown(report)

    if output_format == "markdown":
        return md

    elif output_format == "pdf":
        return markdown_to_pdf(md)

    else:
        raise ValueError("Invalid format. Supported formats: markdown, pdf")
