'use client';

import React from 'react';

interface FundingRound {
  round: string | null;
  amount: number | null;
  date: string;
  valuation: number | null;
  investors: string[];
  source: string;
}

interface FundingSummary {
  total_funding: number;
  latest_round: string;
  latest_amount: number | null;
  latest_date: string;
  latest_valuation: number | null;
}

interface Source {
  id: number;
  url: string;
}

interface FundingData {
  company: string;
  funding_summary: FundingSummary;
  funding_rounds: FundingRound[];
  sources: Source[];
}

interface FundingHistoryTableProps {
  data: FundingData;
}

export default function FundingHistoryTable({ data }: FundingHistoryTableProps) {
  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'N/A';
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    // Assume date is already formatted, just return as is
    return date;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {data.company}
            </h2>
            <p className="text-green-100">Funding History & Investment Analysis</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Funding Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Funding</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.funding_summary.total_funding)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Latest Round</p>
              <p className="text-lg font-bold text-gray-900">{data.funding_summary.latest_round || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Latest Date</p>
              <p className="text-lg font-bold text-gray-900">{formatDate(data.funding_summary.latest_date)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Latest Valuation</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(data.funding_summary.latest_valuation)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Funding Rounds Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900">Funding Rounds History</h3>
          <p className="text-sm text-gray-600 mt-1">Detailed breakdown of all funding rounds</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Round</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Valuation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Investors</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.funding_rounds.map((round, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {round.round || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(round.amount)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatDate(round.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(round.valuation)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {round.investors && round.investors.length > 0
                      ? round.investors.join(', ')
                      : 'N/A'
                    }
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {round.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sources */}
      {data.sources && data.sources.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Sources</h3>
            <p className="text-sm text-gray-600 mt-1">Data sources used for this analysis</p>
          </div>
          <div className="p-6">
            <div className="flex flex-wrap gap-3">
              {data.sources.map((source) => (
                <a
                  key={source.id}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Source {source.url}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}