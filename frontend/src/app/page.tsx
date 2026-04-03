'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ResearchForm from '@/components/ResearchForm';
import CompanyAnalysisTable from '@/components/CompanyAnalysisTable';
import FundingHistoryTable from '@/components/FundingHistoryTable';
import CompetitorsAnalysis from '@/components/CompetitorsAnalysis';
import ReportGenerator from '@/components/ReportGenerator';
import FoundersAnalysis from '@/components/FoundersAnalysis';
import HiringAnalysis from '@/components/HiringAnalysis';
import NewsIntelligence from '@/components/NewsIntelligence';
import TechnologyStack from '@/components/TechnologyStack';
import { ResearchFormData, ResearchResponse, CompetitorsResponse, FoundersResponse, HiringAnalysisResponse, NewsIntelligenceResponse, TechnologyStackResponse } from '@/types';
import { checkApiHealth, runResearch, generateVCReport } from '@/services/api';

interface AnalysisData {
  query?: string;
  plan?: string[];
  analysis?: any;
}

export default function Home() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [isResearching, setIsResearching] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [researchData, setResearchData] = useState<ResearchResponse | AnalysisData | null>(null);
  const [activeTab, setActiveTab] = useState<'research' | 'report'>('research');
  const [selectedResearchTypes, setSelectedResearchTypes] = useState<string[]>([]);

  useEffect(() => {
    const checkHealth = async () => {
      const result = await checkApiHealth();
      if (result.data) {
        setApiStatus('connected');
      } else {
        setApiStatus('disconnected');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleResearch = async (data: ResearchFormData) => {
    setIsResearching(true);
    setResearchData(null);
    setSelectedResearchTypes(data.researchTypes);

    try {
      const result = await runResearch(data.company, data.country, data.researchTypes);
      if (result.data) {
        // The API returns the response based on research types
        setResearchData(result.data as unknown as AnalysisData);
      } else if (result.error) {
        console.error('Research error:', result.error);
      }
    } catch (error) {
      console.error('Research failed:', error);
    } finally {
      setIsResearching(false);
    }
  };

  const handleGenerateReport = async (company: string, format: 'pdf' | 'markdown', country: string) => {
    setIsGeneratingReport(true);
    
    try {
      const result = await generateVCReport(company, format, country);
      if (result.data) {
        const url = URL.createObjectURL(result.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${company.replace(/\s+/g, '_')}_vc_report.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else if (result.error) {
        console.error('Report generation error:', result.error);
      }
    } catch (error) {
      console.error('Report generation failed:', error);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/deep_research_agent_logo.png" alt="Deep Research Agent Logo" height="48" width="48" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Company Deep Research Agent
                </h1>
                <p className="text-xs text-gray-500 font-medium">Autonomous Company Intelligence</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Home
              </Link>
              <Link href="/features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                Features
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <span className={`w-2 h-2 rounded-full ${
                  apiStatus === 'connected' ? 'bg-green-500' :
                  apiStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500 animate-pulse'
                }`} />
                <span className="text-xs font-medium text-gray-600">
                  {apiStatus === 'checking' ? 'Connecting...' :
                   apiStatus === 'connected' ? 'API Online' : 'API Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Research Companies with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Power
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Generate comprehensive company intelligence reports,VC due diligence, competitor analysis, 
              and more in minutes using autonomous AI agents.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-white rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100">
            <button
              onClick={() => setActiveTab('research')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'research'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline">Company Research</span>
                <span className="sm:hidden">Research</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'report'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                VC Report
              </span>
            </button>
          </div>
        </div>

        {/* Research Tab */}
        {activeTab === 'research' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Start Research</h3>
                    <p className="text-xs text-gray-500">Enter company details</p>
                  </div>
                </div>
                <ResearchForm onSubmit={handleResearch} isLoading={isResearching} />
              </div>
            </div>
            
            {/* Results */}
            <div className="lg:col-span-8">
              {isResearching ? (
                <div className="space-y-4">
                  <div className="animate-pulse">
                    <div className="h-8 bg-gray-200/50 rounded w-1/3 mb-4"></div>
                    <div className="h-64 bg-white/50 rounded-2xl"></div>
                  </div>
                </div>
              ) : researchData ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'funding' && (researchData as any).funding ? (
                    <FundingHistoryTable data={(researchData as any).funding} />
                  ) : selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'competitors' ? (
                    <CompetitorsAnalysis data={(researchData as any).competitors} />
                  ) : selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'founders' ? (
                    <FoundersAnalysis data={(researchData as any).founders} />
                  ) : selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'hiring' ? (
                    <HiringAnalysis data={(researchData as any).hiring} />
                  ) : selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'news' ? (
                    <NewsIntelligence data={(researchData as any).news} />
                  ) : selectedResearchTypes.length === 1 && selectedResearchTypes[0] === 'technology' ? (
                    <TechnologyStack data={(researchData as any).technology} />
                  ) : (
                    <CompanyAnalysisTable data={researchData as AnalysisData} />
                  )}
                </div>
              ) : (
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Research</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Enter a company name on the left to get started. The analysis will be displayed in a comprehensive table format.
                  </p>
                  
                  {/* Feature highlights */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                    {[
                      { icon: '📊', label: 'Overview' },
                      { icon: '💰', label: 'Financials' },
                      { icon: '⚔️', label: 'Competitors' },
                      { icon: '📈', label: 'Trends' },
                      { icon: '🏢', label: 'Business Model' },
                      { icon: '💡', label: 'Insights' },
                    ].map((feature, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-xl">
                        <span className="text-2xl">{feature.icon}</span>
                        <p className="text-xs font-medium text-gray-600 mt-1">{feature.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Report Tab */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Generate VC Report</h3>
                <p className="text-gray-500">Create a comprehensive due diligence report</p>
              </div>
              <ReportGenerator 
                onGenerate={handleGenerateReport} 
                isGenerating={isGeneratingReport}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              Autonomous Company Deep Research Agent
            </p>
            <p className="text-sm text-gray-400">
              Powered by MachinaOne • Built with Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
