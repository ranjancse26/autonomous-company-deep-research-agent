'use client';

import { useState } from 'react';

interface ReportGeneratorProps {
  onGenerate: (company: string, format: 'pdf' | 'markdown', country: string) => void;
  isGenerating?: boolean;
}

const features = [
  'Executive Summary & Investment Thesis',
  'Company Overview & Product Analysis',
  'Market Analysis (TAM, SAM, SOM)',
  'Competitive Landscape',
  'SWOT Analysis',
  'Founder & Team Profiles',
  'Financial Analysis & Projections',
  'Risk Assessment & Exit Potential',
];

export default function ReportGenerator({ onGenerate, isGenerating }: ReportGeneratorProps) {
  const [company, setCompany] = useState('');
  const [format, setFormat] = useState<'pdf' | 'markdown'>('pdf');
  const [country, setCountry] = useState('US');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    onGenerate(company, format, country);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Input */}
      <div>
        <label htmlFor="report-company" className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <input
            type="text"
            id="report-company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g., Cursor AI, Stripe, Airbnb"
            className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all text-gray-900 placeholder-gray-400"
            required
          />
        </div>
      </div>

      {/* Format and Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="report-format" className="block text-sm font-semibold text-gray-700 mb-2">
            Output Format
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <select
              id="report-format"
              value={format}
              onChange={(e) => setFormat(e.target.value as 'pdf' | 'markdown')}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all appearance-none"
            >
              <option value="pdf">📄 PDF Document</option>
              <option value="markdown">📝 Markdown</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="report-country" className="block text-sm font-semibold text-gray-700 mb-2">
            Region
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <select
              id="report-country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all appearance-none"
            >
              <option value="US">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="CA">🇨🇦 Canada</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="FR">🇫🇷 France</option>
              <option value="IN">🇮🇳 India</option>
              <option value="CN">🇨🇳 China</option>
              <option value="JP">🇯🇵 Japan</option>
              <option value="AU">🇦🇺 Australia</option>
              <option value="SG">🇸🇬 Singapore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        type="submit"
        disabled={isGenerating || !company.trim()}
        className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/25 hover:shadow-xl"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-lg">Generating Report...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-lg">Generate Report</span>
          </>
        )}
      </button>

      {/* Report Features */}
      <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Report Includes:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}