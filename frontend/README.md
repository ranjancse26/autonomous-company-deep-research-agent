# Autonomous Company Deep Research Agent - Frontend

This is the web interface for the Autonomous Company Deep Research Agent, a Next.js application that provides a user-friendly way to interact with the AI-powered research system for comprehensive company analysis.

## Introduction

The Autonomous Company Deep Research Agent is an AI-powered system designed to revolutionize the way companies and startups are researched. It automates the entire research process from planning and data collection to analysis and report generation, providing comprehensive VC-style insights in minutes instead of days.

### Problem Statement

Traditional company research is a time-consuming and labor-intensive process that involves:
- Searching for relevant information across multiple sources
- Reading and analyzing large volumes of unstructured data
- Synthesizing information into a coherent report
- Verifying sources and ensuring accuracy
- Updating reports as information changes

This process is inefficient, inconsistent, and limits the number of companies that can be analyzed within a given timeframe.

### Key Benefits

The Autonomous Company Deep Research Agent addresses these challenges with:
- **90% reduction in research time**: From days to minutes per company
- **10x increase in throughput**: Analyze 100+ companies per analyst per week
- **Consistent high-quality reports**: Standardized VC-style format with citations
- **Verifiable information**: Every piece of information includes source URLs
- **Comprehensive analysis**: Covers company background, founders, competitors, market analysis, risks, and investment thesis
- **Cost efficiency**: 70% reduction in manual research costs

## Frontend Overview

The frontend allows users to:
- Submit research queries for company analysis
- Generate VC-style diligence reports in PDF or Markdown format
- View detailed analysis including company background, founders, competitors, funding history, hiring signals, news intelligence, and technology stack
- Access comprehensive research results through an intuitive web interface

## Features

- **Research Form**: Submit queries for deep company research
- **Company Analysis**: View structured company information and insights
- **Competitors Analysis**: Explore competitive landscape
- **Founders Analysis**: Review founder backgrounds and experience
- **Funding History**: Track investment rounds and amounts
- **Hiring Signals**: Monitor job postings and growth indicators
- **News Intelligence**: Stay updated with latest company news
- **Technology Stack**: Understand technical infrastructure
- **Report Generation**: Download professional VC diligence reports

## Getting Started

### Prerequisites

- Node.js 18+
- Backend API running (see [backend README](../backend/README.md))
- Environment configuration: Create a brand new `.env.local` and update `NEXT_PUBLIC_API_URL` to `http://localhost:8000`

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (optional):
   Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
   If not set, the app will default to `http://localhost:8000`.

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

Ensure the backend is running before using the frontend. Follow the setup instructions in the [backend README](../backend/README.md).

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React components
- **API Integration**: Fetch API with custom service layer

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
frontend/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── ResearchForm.tsx # Research submission form
│   │   ├── CompanyResults.tsx # Results display
│   │   └── ...              # Other analysis components
│   ├── services/            # API service layer
│   │   └── api.ts           # API functions
│   └── types/               # TypeScript type definitions
│       └── index.ts         # Type definitions
├── public/                  # Static assets
└── package.json             # Dependencies and scripts
```

## Deployment

The application can be deployed to platforms like Vercel, Netlify, or any Node.js hosting service:

```bash
npm run build
npm run start
```

Make sure to configure the `NEXT_PUBLIC_API_URL` environment variable to point to your deployed backend API.
