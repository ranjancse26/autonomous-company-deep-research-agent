'use client';

import React from 'react';
import { CompanyAnalysisResponse } from '@/types';

interface CompanyResultsProps {
  data: CompanyAnalysisResponse;
  isLoading?: boolean;
}

function SectionCard({ title, icon, children, color = 'blue' }: { 
  title: string; 
  icon: React.ReactNode; 
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo' | 'cyan' | 'red';
}) {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-200' },
    pink: { bg: 'bg-pink-50', text: 'text-pink-600', ring: 'ring-pink-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-200' },
    cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', ring: 'ring-cyan-200' },
    red: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-200' },
  };
  
  const colors = colorClasses[color];

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/30 p-6 hover:shadow-xl transition-shadow duration-300`}>
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center ${colors.text}`}>
          {icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function CompanyResults({ data, isLoading }: CompanyResultsProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Company Header Card */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-600/30">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-3">{data.company_profile?.name || 'Company Analysis'}</h2>
            {data.company_profile?.description && (
              <p className="text-blue-100 text-lg leading-relaxed max-w-2xl">
                {data.company_profile.description}
              </p>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-white">Research Complete</span>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
          {data.company_profile?.industry && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm font-medium text-blue-200 mb-1">Industry</div>
              <div className="text-lg font-bold truncate">{data.company_profile.industry}</div>
            </div>
          )}
          {data.company_profile?.founded_year && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm font-medium text-blue-200 mb-1">Founded</div>
              <div className="text-lg font-bold">{data.company_profile.founded_year}</div>
            </div>
          )}
          {data.funding?.latest_round && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-sm font-medium text-blue-200 mb-1">Latest Round</div>
              <div className="text-lg font-bold truncate">{data.funding.latest_round.round_type || 'N/A'}</div>
            </div>
          )}
          {data.competitive_landscape.direct_competitors && data.competitive_landscape.direct_competitors.length > 0 && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold">{data.competitive_landscape.direct_competitors.length}</div>
              <div className="text-blue-200 text-sm">Competitors</div>
            </div>
          )}
        </div>
      </div>

      {/* Company Profile Details */}
      {data.company_profile && (
        <SectionCard
          title="Company Profile"
          color="blue"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Industry</div>
              <div className="text-gray-900">{data.company_profile.industry || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Headquarters</div>
              <div className="text-gray-900">
                {[data.company_profile.headquarters?.city, data.company_profile.headquarters?.state, data.company_profile.headquarters?.country].filter(Boolean).join(', ') || 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Business Model</div>
              <div className="text-gray-900">{data.company_profile.business_model || 'N/A'}</div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Founders */}
      {data.founders && data.founders.length > 0 && (
        <SectionCard
          title="Founders & Leadership"
          color="pink"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.founders.map((founder, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-pink-50/50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {founder.name?.charAt(0) || 'F'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{founder.name}</h4>
                  <p className="text-sm text-pink-600 font-medium">{founder.role}</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{founder.background_summary}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Products/Services */}
      {data.products_services && data.products_services.length > 0 && (
        <SectionCard
          title="Products & Services"
          color="indigo"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          }
        >
          <div className="flex flex-wrap gap-2">
            {data.products_services.map((product, idx) => (
              <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                {product.name || 'N/A'}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Funding */}
      {data.funding && (
        <SectionCard
          title="Funding & Investment"
          color="green"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="text-sm font-medium text-green-600 mb-1">Total Funding</div>
                <div className="text-2xl font-bold text-gray-900">
                  {data.funding.total_funding_usd ? `$${data.funding.total_funding_usd.toLocaleString()}` : 'N/A'}
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="text-sm font-medium text-blue-600 mb-1">Latest Round</div>
                <div className="text-lg font-bold text-gray-900">
                  {data.funding.latest_round.round_type || 'N/A'}
                </div>
              </div>
            </div>
            {data.funding.notable_investors && data.funding.notable_investors.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Key Investors</div>
                <div className="flex flex-wrap gap-2">
                  {data.funding.notable_investors.map((investor, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                      {investor}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* Market Analysis */}
      {data.market_analysis && (
        <SectionCard
          title="Market Analysis"
          color="cyan"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        >
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Market Category</div>
              <div className="text-gray-900">{data.market_analysis.market_category || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">Market Size</div>
              <div className="p-3 bg-cyan-50 rounded-xl text-gray-900">
                {data.market_analysis.market_size.tam ? `$${data.market_analysis.market_size.tam.toLocaleString()}` : 'N/A'}
              </div>
            </div>
            {data.market_analysis.key_trends && data.market_analysis.key_trends.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-500 mb-2">Growth Trends</div>
                <div className="flex flex-wrap gap-2">
                  {data.market_analysis.key_trends.map((trend, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                      {trend}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* Competitors */}
      {data.competitive_landscape.direct_competitors && data.competitive_landscape.direct_competitors.length > 0 && (
        <SectionCard
          title="Competitors"
          color="purple"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        >
          <div className="flex flex-wrap gap-2">
            {data.competitive_landscape.direct_competitors.map((competitor, idx) => (
              <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                {competitor.name || 'N/A'}
              </span>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Hiring Signals */}
      {data.hiring_signals && (
        <SectionCard
          title="Hiring Signals"
          color="orange"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-orange-50 rounded-xl">
              <div className="text-sm font-medium text-orange-600 mb-2">Engineering Roles</div>
              <div className="text-gray-900">{data.hiring_signals.engineering_roles || 'N/A'}</div>
            </div>
            <div className="p-5 bg-green-50 rounded-xl">
              <div className="text-sm font-medium text-green-600 mb-2">Growth Indicator</div>
              <div className="text-gray-900">{data.hiring_signals.growth_indicator || 'N/A'}</div>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Risk Analysis */}
      {data.risk_analysis && data.risk_analysis.length > 0 && (
        <SectionCard
          title="Risk Analysis"
          color="red"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {data.risk_analysis.map((risk, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-red-50/50 rounded-xl">
                <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{risk.description}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Investment Thesis */}
      {data.investment_thesis && (
        <SectionCard
          title="Investment Thesis"
          color="pink"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          }
        >
          <p className="text-gray-700 leading-relaxed">{data.investment_thesis.summary}</p>
        </SectionCard>
      )}

      {/* Sources */}
      {data.sources && data.sources.length > 0 && (
        <SectionCard
          title="Sources"
          color="blue"
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          }
        >
          <div className="flex flex-wrap gap-2">
            {data.sources.map((source, idx) => {
              if (source.url) {
                try {
                  const hostname = new URL(source.url as string).hostname;
                  return (
                    <a
                      key={idx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      {hostname}
                    </a>
                  );
                } catch {
                  return (
                    <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg">
                      {source.url}
                    </span>
                  );
                }
              } else {
                return (
                  <span key={idx} className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg">
                    Source {idx + 1}
                  </span>
                );
              }
            })}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
