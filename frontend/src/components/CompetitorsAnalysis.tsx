'use client';

import React from 'react';
import { CompetitorsAnalysisResponse } from '@/types';

interface CompetitorsAnalysisProps {
  data: CompetitorsAnalysisResponse;
}

export default function CompetitorsAnalysis({ data }: CompetitorsAnalysisProps) {

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {data.company || 'Competitors Analysis'}
            </h2>
            <p className="text-blue-100">Comprehensive competitor intelligence</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Analysis Complete</span>
          </div>
        </div>
      </div>

      {/* Direct Competitors Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-700 rounded-t-xl">
          <span className="w-8 h-8 flex items-center justify-center">⚔️</span>
          <h3 className="font-bold text-lg">Direct Competitors</h3>
        </div>
        <div className="p-6">
          {data.direct_competitors && data.direct_competitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.direct_competitors.map((competitor, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{competitor.name || 'N/A'}</h4>
                  <p className="text-gray-600 mb-4">{competitor.description || 'N/A'}</p>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-500">Similarity Score: {competitor.similarity_score !== null ? `${(competitor.similarity_score * 100).toFixed(1)}%` : 'N/A'}</p>
                    {competitor.key_products && competitor.key_products.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Key Products</h5>
                        <ul className="list-disc list-inside text-gray-600 text-sm">
                          {competitor.key_products.map((product, i) => (
                            <li key={i}>{product}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {competitor.strengths && competitor.strengths.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Strengths</h5>
                        <ul className="list-disc list-inside text-green-600 text-sm">
                          {competitor.strengths.map((strength, i) => (
                            <li key={i}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {competitor.weaknesses && competitor.weaknesses.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Weaknesses</h5>
                        <ul className="list-disc list-inside text-red-600 text-sm">
                          {competitor.weaknesses.map((weakness, i) => (
                            <li key={i}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {competitor.source && (
                      <p className="text-sm text-blue-600">Source: {competitor.source}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No direct competitors data available</p>
          )}
        </div>
      </div>

      {/* Indirect Competitors Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-t-xl">
          <span className="w-8 h-8 flex items-center justify-center">🔄</span>
          <h3 className="font-bold text-lg">Indirect Competitors</h3>
        </div>
        <div className="p-6">
          {data.indirect_competitors && data.indirect_competitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.indirect_competitors.map((competitor, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{competitor.name || 'N/A'}</h4>
                  <p className="text-gray-600 mb-4">{competitor.description || 'N/A'}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Market Segment: {competitor.market_segment || 'N/A'}</p>
                    {competitor.source && (
                      <p className="text-sm text-blue-600">Source: {competitor.source}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No indirect competitors data available</p>
          )}
        </div>
      </div>

      {/* Emerging Competitors Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-green-50 text-green-700 rounded-t-xl">
          <span className="w-8 h-8 flex items-center justify-center">🌱</span>
          <h3 className="font-bold text-lg">Emerging Competitors</h3>
        </div>
        <div className="p-6">
          {data.emerging_competitors && data.emerging_competitors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.emerging_competitors.map((competitor, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{competitor.name || 'N/A'}</h4>
                  <p className="text-gray-600 mb-4">{competitor.description || 'N/A'}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Innovation Area: {competitor.innovation_area || 'N/A'}</p>
                    {competitor.source && (
                      <p className="text-sm text-blue-600">Source: {competitor.source}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No emerging competitors data available</p>
          )}
        </div>
      </div>

      {/* Competitive Landscape Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-t-xl">
          <span className="w-8 h-8 flex items-center justify-center">🏔️</span>
          <h3 className="font-bold text-lg">Competitive Landscape</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Market Category</label>
              <p className="text-gray-900">{data.competitive_landscape?.market_category || 'N/A'}</p>
            </div>
          </div>
          {data.competitive_landscape?.differentiation_factors && data.competitive_landscape.differentiation_factors.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Differentiation Factors</h4>
              <div className="flex flex-wrap gap-2">
                {data.competitive_landscape.differentiation_factors.map((factor, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.competitive_landscape?.competitive_advantages && data.competitive_landscape.competitive_advantages.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Competitive Advantages</h4>
              <div className="bg-green-50 p-4 rounded-xl">
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {data.competitive_landscape.competitive_advantages.map((advantage, idx) => (
                    <li key={idx}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {data.competitive_landscape?.market_leaders && data.competitive_landscape.market_leaders.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Market Leaders</h4>
              <div className="flex flex-wrap gap-2">
                {data.competitive_landscape.market_leaders.map((leader, idx) => (
                  <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm rounded-full">
                    {leader}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Sources Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 text-gray-700 rounded-t-xl">
          <span className="w-8 h-8 flex items-center justify-center">📚</span>
          <h3 className="font-bold text-lg">Sources</h3>
        </div>
        <div className="p-6">
          {data.sources && data.sources.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.sources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {`Source ${source.url}`}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No sources available</p>
          )}
        </div>
      </div>
    </div>
  );
}