import React from 'react';
import { FoundersResponse } from '@/types';

interface FoundersAnalysisProps {
  data: FoundersResponse;
}

export default function FoundersAnalysis({ data }: FoundersAnalysisProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Founders & Leadership</h3>
          <p className="text-xs text-gray-500">{data.company}</p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Founders</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.founders.map((founder, index) => (
            <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h5 className="font-semibold text-gray-900">{founder.name}</h5>
                  <p className="text-sm text-gray-600">{founder.title}</p>
                </div>
                <div className="flex gap-2">
                  {founder.linkedin && (
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  )}
                  {founder.twitter && (
                    <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-3">{founder.bio_summary}</p>
              {founder.notable_achievements.length > 0 && (
                <div className="mb-3">
                  <h6 className="text-sm font-medium text-gray-900 mb-2">Notable Achievements</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {founder.notable_achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {founder.credibility_signals.length > 0 && (
                <div>
                  <h6 className="text-sm font-medium text-gray-900 mb-2">Credibility Signals</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {founder.credibility_signals.map((signal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team Section */}
      {data.leadership_team.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Leadership Team</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.leadership_team.map((leader, index) => (
              <div key={index} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                <h5 className="font-semibold text-gray-900">{leader.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{leader.title}</p>
                <p className="text-sm text-gray-700">{leader.background}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sources Section */}
      {data.sources.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Sources</h4>
          <div className="flex flex-wrap gap-3">
            {data.sources.map((source) => (
              <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 underline">
                Source {source.url}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}