'use client';

import React, { useState, useMemo } from 'react';
import { CompanyAnalysisResponse } from '@/types';

interface AnalysisData {
  query?: string;
  plan?: string[];
  analysis?: CompanyAnalysisResponse | any;
}

interface CompanyAnalysisTableProps {
  data: AnalysisData;
  isLoading?: boolean;
}

// Helper component for section headers
function SectionHeader({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    orange: 'bg-orange-50 text-orange-700',
    pink: 'bg-pink-50 text-pink-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    red: 'bg-red-50 text-red-700',
    cyan: 'bg-cyan-50 text-cyan-700',
  };
  
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${colors[color] || colors.blue} rounded-t-xl`}>
      <span className="w-8 h-8 flex items-center justify-center">{icon}</span>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );
}

// Safe text component to prevent object rendering
function SafeText({ children }: { children: any }) {
  if (typeof children === 'object' && children !== null) {
    try {
      return <span>{JSON.stringify(children)}</span>;
    } catch (error) {
      // Handle circular references by converting to string
      return <span>{String(children)}</span>;
    }
  }
  return <>{children}</>;
}

// Simple row component
function TableRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4 font-semibold text-gray-700 w-1/3">{label}</td>
      <td className="py-3 px-4 text-gray-600"><SafeText>{value}</SafeText></td>
    </tr>
  );
}

// Bullet list component
function BulletList({ items }: { items: string[] | any }) {
  const safeItems = Array.isArray(items) ? items : [];
  if (!safeItems || safeItems.length === 0) {
    return <span className="text-gray-400">No data available</span>;
  }
  return (
    <ul className="space-y-1">
      {safeItems.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
          <span className="text-gray-600 text-sm">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CompanyAnalysisTable({ data, isLoading }: CompanyAnalysisTableProps) {
  const [activeSection, setActiveSection] = useState<string>('profile');
  
  // Parse analysis if it's a string
  const parsedAnalysis = useMemo(() => {
    if (!data?.analysis) return null;
    if (typeof data.analysis === 'object') return data.analysis as CompanyAnalysisResponse;
    try {
      return JSON.parse(data.analysis) as CompanyAnalysisResponse;
    } catch {
      return null;
    }
  }, [data?.analysis]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!parsedAnalysis) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Not Available</h3>
        <p className="text-gray-500">Research the company to see the analysis.</p>
      </div>
    );
  }

  const analysis = parsedAnalysis;
  const sections = [
    { id: 'profile', label: 'Company Profile', icon: '🏢' },
    { id: 'founders', label: 'Founders', icon: '👥' },
    { id: 'leadership', label: 'Leadership Team', icon: '👔' },
    { id: 'products', label: 'Products & Services', icon: '📦' },
    { id: 'tech', label: 'Technology Stack', icon: '🛠️' },
    { id: 'funding', label: 'Funding', icon: '💰' },
    { id: 'traction', label: 'Traction Metrics', icon: '📈' },
    { id: 'market', label: 'Market Analysis', icon: '📊' },
    { id: 'competitors', label: 'Competitors', icon: '⚔️' },
    { id: 'hiring', label: 'Hiring Signals', icon: '🔔' },
    { id: 'financial', label: 'Financial Signals', icon: '💵' },
    { id: 'risks', label: 'Risk Analysis', icon: '⚠️' },
    { id: 'signals', label: 'Signals', icon: '🚨' },
    { id: 'thesis', label: 'Investment Thesis', icon: '💡' },
  ];

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              <SafeText>{analysis.company_profile?.name || data.query || 'Company Analysis'}</SafeText>
            </h2>
            <p className="text-blue-100">Comprehensive research analysis</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeSection === section.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <span className="mr-2">{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Company Profile Section */}
        {activeSection === 'profile' && (
          <>
            <SectionHeader 
              title="Company Profile" 
              color="blue"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
            <div className="p-6">
              <table className="w-full">
                <tbody>
                  <TableRow label="Name" value={analysis.company_profile?.name || 'N/A'} />
                  <TableRow label="Legal Name" value={analysis.company_profile?.legal_name || 'N/A'} />
                  <TableRow label="Website" value={analysis.company_profile?.website ? <a href={analysis.company_profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{analysis.company_profile.website}</a> : 'N/A'} />
                  <TableRow label="Description" value={analysis.company_profile?.description || 'N/A'} />
                  <TableRow label="Industry" value={analysis.company_profile?.industry || 'N/A'} />
                  <TableRow label="Sub Industry" value={analysis.company_profile?.sub_industry || 'N/A'} />
                  <TableRow label="Founded Year" value={analysis.company_profile?.founded_year || 'N/A'} />
                  <TableRow
                    label="Headquarters"
                    value={
                      analysis.company_profile?.headquarters?.city || analysis.company_profile?.headquarters?.state || analysis.company_profile?.headquarters?.country
                        ? `${analysis.company_profile.headquarters.city || ''}${analysis.company_profile.headquarters.city && (analysis.company_profile.headquarters.state || analysis.company_profile.headquarters.country) ? ', ' : ''}${analysis.company_profile.headquarters.state || ''}${analysis.company_profile.headquarters.state && analysis.company_profile.headquarters.country ? ', ' : ''}${analysis.company_profile.headquarters.country || ''}`.trim()
                        : 'N/A'
                    }
                  />
                  <TableRow label="Business Model" value={analysis.company_profile?.business_model || 'N/A'} />
                  <TableRow label="Company Stage" value={analysis.company_profile?.company_stage || 'N/A'} />
                  <TableRow label="Employee Count Estimate" value={analysis.company_profile?.employee_count_estimate || 'N/A'} />
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Founders Section */}
        {activeSection === 'founders' && (
          <>
            <SectionHeader 
              title="Founders & Leadership" 
              color="pink"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <div className="p-6">
              {analysis.founders && analysis.founders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.founders.map((founder: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-5 bg-pink-50/50 rounded-xl border border-pink-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {founder.name?.charAt(0) || 'F'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900"><SafeText>{founder.name || 'N/A'}</SafeText></h4>
                        <p className="text-sm text-pink-600 font-medium"><SafeText>{founder.role || 'N/A'}</SafeText></p>
                        <p className="text-sm text-gray-600 mt-1"><SafeText>{founder.background || 'N/A'}</SafeText></p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No founder data available</p>
              )}
            </div>
          </>
        )}

        {/* Leadership Team Section */}
        {activeSection === 'leadership' && (
          <>
            <SectionHeader
              title="Leadership Team"
              color="indigo"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <div className="p-6">
              {analysis.leadership_team && analysis.leadership_team.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.leadership_team.map((member, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-5 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {member.name?.charAt(0) || 'L'}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900"><SafeText>{member.name || 'N/A'}</SafeText></h4>
                        <p className="text-sm text-indigo-600 font-medium"><SafeText>{member.title || 'N/A'}</SafeText></p>
                        <p className="text-sm text-gray-600 mt-1">
                          LinkedIn: {member.linkedin ? <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{member.linkedin}</a> : 'N/A'}
                        </p>
                        {member.previous_roles && member.previous_roles.length > 0 && (
                          <p className="text-sm text-gray-600 mt-1">
                            Previous: {member.previous_roles.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No leadership team data available</p>
              )}
            </div>
          </>
        )}

        {/* Products & Services Section */}
        {activeSection === 'products' && (
          <>
            <SectionHeader 
              title="Products & Services" 
              color="indigo"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
            />
            <div className="p-6">
              {analysis.products_services && analysis.products_services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.products_services.map((product, idx: number) => (
                    <div key={idx} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                      <h4 className="font-semibold text-gray-900 mb-2"><SafeText>{product.name || 'N/A'}</SafeText></h4>
                      <p className="text-sm text-gray-600 mb-2"><SafeText>{product.description || 'N/A'}</SafeText></p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full">
                          Category: {product.category || 'N/A'}
                        </span>
                        <span className="px-2 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full">
                          Target: {product.target_customer || 'N/A'}
                        </span>
                        <span className="px-2 py-1 bg-indigo-200 text-indigo-800 text-xs rounded-full">
                          Pricing: {product.pricing_model || 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No products data available</p>
              )}
            </div>
          </>
        )}

        {/* Technology Stack Section */}
        {activeSection === 'tech' && (
          <>
            <SectionHeader
              title="Technology Stack"
              color="gray"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">AI Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.technology_stack?.ai_technologies?.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {tech}
                    </span>
                  )) || <span className="text-gray-400">No data available</span>}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.technology_stack?.core_technologies?.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {tech}
                    </span>
                  )) || <span className="text-gray-400">No data available</span>}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Infrastructure</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.technology_stack?.infrastructure?.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {tech}
                    </span>
                  )) || <span className="text-gray-400">No data available</span>}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Data Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.technology_stack?.data_stack?.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                      {tech}
                    </span>
                  )) || <span className="text-gray-400">No data available</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Funding Section */}
        {activeSection === 'funding' && (
          <>
            <SectionHeader
              title="Funding & Investment"
              color="green"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <div className="p-6 space-y-6">
              {/* Funding Summary */}
              <table className="w-full">
                <tbody>
                  <TableRow
                    label="Total Funding"
                    value={
                      analysis.funding?.total_funding_usd
                        ? `$${analysis.funding.total_funding_usd.toLocaleString()}`
                        : 'N/A'
                    }
                  />
                  <TableRow
                    label="Latest Round Type"
                    value={analysis.funding?.latest_round?.round_type || 'N/A'}
                  />
                  <TableRow
                    label="Latest Amount"
                    value={
                      analysis.funding?.latest_round?.amount_usd
                        ? `$${analysis.funding.latest_round.amount_usd.toLocaleString()}`
                        : 'N/A'
                    }
                  />
                  <TableRow
                    label="Latest Round Date"
                    value={analysis.funding?.latest_round?.date || 'N/A'}
                  />
                  <TableRow
                    label="Notable Investors"
                    value={
                      Array.isArray(analysis.funding?.notable_investors) && analysis.funding.notable_investors.length > 0
                        ? analysis.funding.notable_investors.join(', ')
                        : 'N/A'
                    }
                  />
                </tbody>
              </table>

              {/* Funding Rounds Table */}
              {analysis.funding?.funding_rounds && analysis.funding.funding_rounds.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">Funding Rounds History</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Round</th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Lead Investors</th>
                          <th className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-700">Investors</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analysis.funding.funding_rounds.map((round, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50 transition-colors">
                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                              <SafeText>{round.round || 'N/A'}</SafeText>
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                              {round.amount_usd ? `$${round.amount_usd.toLocaleString()}` : 'N/A'}
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                              <SafeText>{round.date || 'N/A'}</SafeText>
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                              {Array.isArray(round.lead_investors) && round.lead_investors.length > 0
                                ? round.lead_investors.join(', ')
                                : 'N/A'
                              }
                            </td>
                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-900">
                              {Array.isArray(round.investors) && round.investors.length > 0
                                ? round.investors.join(', ')
                                : 'N/A'
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Traction Metrics Section */}
        {activeSection === 'traction' && (
          <>
            <SectionHeader
              title="Traction Metrics"
              color="emerald"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
            <div className="p-6">
              <table className="w-full">
                <tbody>
                  <TableRow label="Users" value={analysis.traction_metrics?.users ? analysis.traction_metrics.users.toLocaleString() : 'N/A'} />
                  <TableRow label="Customers" value={analysis.traction_metrics?.customers ? analysis.traction_metrics.customers.toLocaleString() : 'N/A'} />
                  <TableRow label="Revenue Estimate" value={analysis.traction_metrics?.revenue_estimate ? `$${analysis.traction_metrics.revenue_estimate.toLocaleString()}` : 'N/A'} />
                  <TableRow label="Growth Rate" value={analysis.traction_metrics?.growth_rate ? `${analysis.traction_metrics.growth_rate}%` : 'N/A'} />
                  <TableRow
                    label="Partnerships"
                    value={
                      <div className="bg-emerald-50 p-2 rounded">
                        <BulletList items={analysis.traction_metrics?.partnerships || []} />
                      </div>
                    }
                  />
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Market Analysis Section */}
        {activeSection === 'market' && (
          <>
            <SectionHeader 
              title="Market Analysis" 
              color="cyan"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Market Category</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-xl">
                  <SafeText>{analysis.market_analysis?.market_category || 'N/A'}</SafeText>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Target Market</h4>
                <p className="text-gray-600 bg-blue-50 p-4 rounded-xl">
                  <SafeText>{analysis.market_analysis?.target_market || 'N/A'}</SafeText>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Market Size</h4>
                <div className="bg-green-50 p-4 rounded-xl space-y-2">
                  <p><strong>TAM:</strong> {analysis.market_analysis?.market_size?.tam ? `$${analysis.market_analysis.market_size.tam.toLocaleString()}` : 'N/A'}</p>
                  <p><strong>SAM:</strong> {analysis.market_analysis?.market_size?.sam ? `$${analysis.market_analysis.market_size.sam.toLocaleString()}` : 'N/A'}</p>
                  <p><strong>SOM:</strong> {analysis.market_analysis?.market_size?.som ? `$${analysis.market_analysis.market_size.som.toLocaleString()}` : 'N/A'}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Growth Rate</h4>
                <p className="text-gray-600 bg-yellow-50 p-4 rounded-xl">
                  <SafeText>{analysis.market_analysis?.growth_rate ? `${analysis.market_analysis.growth_rate}%` : 'N/A'}</SafeText>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Key Trends</h4>
                <div className="bg-cyan-50 p-4 rounded-xl">
                  <BulletList items={analysis.market_analysis?.key_trends || []} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Competitors Section */}
        {activeSection === 'competitors' && (
          <>
            <SectionHeader 
              title="Competitive Landscape" 
              color="purple"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Direct Competitors</h4>
                {analysis.competitive_landscape?.direct_competitors && analysis.competitive_landscape.direct_competitors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {analysis.competitive_landscape.direct_competitors.map((competitor, idx: number) => (
                      <div key={idx} className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                        <h5 className="font-semibold text-gray-900 mb-2"><SafeText>{competitor.name || 'N/A'}</SafeText></h5>
                        <p className="text-sm text-gray-600 mb-2"><SafeText>{competitor.description || 'N/A'}</SafeText></p>
                        <p className="text-sm text-purple-600"><strong>Differentiation:</strong> <SafeText>{competitor.differentiation || 'N/A'}</SafeText></p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No direct competitors data available</p>
                )}
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Indirect Competitors</h4>
                <div className="bg-purple-50 p-4 rounded-xl">
                  <BulletList items={analysis.competitive_landscape?.indirect_competitors || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Competitive Advantages</h4>
                <div className="bg-green-50 p-4 rounded-xl">
                  <BulletList items={analysis.competitive_landscape?.competitive_advantages || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Barriers to Entry</h4>
                <div className="bg-red-50 p-4 rounded-xl">
                  <BulletList items={analysis.competitive_landscape?.barriers_to_entry || []} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Hiring Signals Section */}
        {activeSection === 'hiring' && (
          <>
            <SectionHeader 
              title="Hiring Signals" 
              color="orange"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Open Roles</h4>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <BulletList items={analysis.hiring_signals?.open_roles || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Engineering Roles</h4>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <BulletList items={analysis.hiring_signals?.engineering_roles || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Growth Indicator</h4>
                <p className="text-gray-600 bg-green-50 p-4 rounded-xl">
                  <SafeText>{analysis.hiring_signals?.growth_indicator || 'N/A'}</SafeText>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Hiring Trend</h4>
                <p className="text-gray-600 bg-yellow-50 p-4 rounded-xl">
                  <SafeText>{analysis.hiring_signals?.hiring_trend || 'N/A'}</SafeText>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Financial Signals Section */}
        {activeSection === 'financial' && (
          <>
            <SectionHeader
              title="Financial Signals"
              color="lime"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
            />
            <div className="p-6">
              <table className="w-full">
                <tbody>
                  <TableRow label="Revenue Model" value={analysis.financial_signals?.revenue_model || 'N/A'} />
                  <TableRow label="Unit Economics" value={analysis.financial_signals?.unit_economics || 'N/A'} />
                  <TableRow label="Burn Rate Estimate" value={analysis.financial_signals?.burn_rate_estimate ? `$${analysis.financial_signals.burn_rate_estimate.toLocaleString()}` : 'N/A'} />
                  <TableRow label="Runway Estimate" value={analysis.financial_signals?.runway_estimate ? `${analysis.financial_signals.runway_estimate} months` : 'N/A'} />
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Risk Analysis Section */}
        {activeSection === 'risks' && (
          <>
            <SectionHeader 
              title="Risk Analysis" 
              color="red"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
            />
            <div className="p-6">
              {analysis.risk_analysis && analysis.risk_analysis.length > 0 ? (
                <div className="space-y-4">
                  {analysis.risk_analysis.map((risk, idx: number) => (
                    <div key={idx} className="p-4 bg-red-50 rounded-xl border border-red-100">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        <h5 className="font-semibold text-gray-900"><SafeText>{risk.risk_type || 'N/A'}</SafeText></h5>
                        <span className="px-2 py-1 bg-red-200 text-red-800 text-xs rounded-full">
                          Severity: {risk.severity || 'N/A'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2"><SafeText>{risk.description || 'N/A'}</SafeText></p>
                      <p className="text-sm text-red-700"><strong>Mitigation:</strong> <SafeText>{risk.mitigation || 'N/A'}</SafeText></p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No risk analysis available</p>
              )}
            </div>
          </>
        )}

        {/* Signals Section */}
        {activeSection === 'signals' && (
          <>
            <SectionHeader
              title="Signals"
              color="amber"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-green-700 mb-3">Positive Signals</h4>
                <div className="bg-green-50 p-4 rounded-xl">
                  <BulletList items={analysis.signals?.positive_signals || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-red-700 mb-3">Warning Signals</h4>
                <div className="bg-red-50 p-4 rounded-xl">
                  <BulletList items={analysis.signals?.warning_signals || []} />
                </div>
              </div>

              {/* Confidence Score */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Confidence Score</h4>
                <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                  <p><strong>Overall:</strong> {analysis.confidence_score?.overall ? `${analysis.confidence_score.overall}/10` : 'N/A'}</p>
                  <p><strong>Data Quality:</strong> {analysis.confidence_score?.data_quality ? `${analysis.confidence_score.data_quality}/10` : 'N/A'}</p>
                  <p><strong>Source Coverage:</strong> {analysis.confidence_score?.source_coverage ? `${analysis.confidence_score.source_coverage}/10` : 'N/A'}</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Investment Thesis Section */}
        {activeSection === 'thesis' && (
          <>
            <SectionHeader 
              title="Investment Thesis" 
              color="pink"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
            />
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Investment Thesis Summary</h4>
                <p className="text-gray-600 bg-pink-50 p-4 rounded-xl leading-relaxed">
                  <SafeText>{analysis.investment_thesis?.summary || 'N/A'}</SafeText>
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Strengths</h4>
                <div className="bg-green-50 p-4 rounded-xl">
                  <BulletList items={analysis.investment_thesis?.strengths || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Weaknesses</h4>
                <div className="bg-red-50 p-4 rounded-xl">
                  <BulletList items={analysis.investment_thesis?.weaknesses || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Opportunities</h4>
                <div className="bg-blue-50 p-4 rounded-xl">
                  <BulletList items={analysis.investment_thesis?.opportunities || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Threats</h4>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <BulletList items={analysis.investment_thesis?.threats || []} />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 mb-3">Key Questions for Founders</h4>
                <div className="bg-yellow-50 p-4 rounded-xl">
                  <BulletList items={analysis.investment_thesis?.key_questions_for_founders || []} />
                </div>
              </div>

              {/* Sources */}
              {analysis.sources && analysis.sources.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.sources.map((source) => {
                      try {
                        const hostname = new URL(source.url || '').hostname;
                        return (
                          <a
                            key={source.id}
                            href={source.url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                          >
                            {hostname}
                          </a>
                        );
                      } catch {
                        return (
                          <span key={source.id} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            {source.url || 'N/A'}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
