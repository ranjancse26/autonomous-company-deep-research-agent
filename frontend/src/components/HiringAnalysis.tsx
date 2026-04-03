import React from 'react';
import { HiringAnalysisResponse } from '@/types';

interface HiringAnalysisProps {
  data: HiringAnalysisResponse;
}

export default function HiringAnalysis({ data }: HiringAnalysisProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Hiring Analysis</h3>
          <p className="text-xs text-gray-500">{data.company}</p>
        </div>
      </div>

      {/* Hiring Summary */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Hiring Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
            <h5 className="font-medium text-gray-900 mb-2">Total Open Roles</h5>
            <p className="text-2xl font-bold text-blue-600">{data.hiring_summary.total_open_roles}</p>
          </div>
          <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
            <h5 className="font-medium text-gray-900 mb-2">Engineering Roles</h5>
            <p className="text-2xl font-bold text-green-600">{data.hiring_summary.engineering_roles ?? 'N/A'}</p>
          </div>
          <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
            <h5 className="font-medium text-gray-900 mb-2">Hiring Velocity</h5>
            <p className="text-lg font-semibold text-purple-600">{data.hiring_summary.hiring_velocity}</p>
          </div>
          <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
            <h5 className="font-medium text-gray-900 mb-2">Growth Signal</h5>
            <p className="text-lg font-semibold text-indigo-600">{data.hiring_summary.growth_signal}</p>
          </div>
        </div>
      </div>

      {/* Department Hiring */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Department Hiring</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(data.department_hiring).map(([dept, roles]) => (
            <div key={dept} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <h5 className="font-medium text-gray-900 mb-2 capitalize">{dept}</h5>
              {roles.length > 0 ? (
                <ul className="text-sm text-gray-600 space-y-1">
                  {roles.map((role, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{role}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No open roles</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hiring Locations */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Hiring Locations</h4>
        <div className="flex flex-wrap gap-2">
          {data.hiring_locations.map((location, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              {location}
            </span>
          ))}
        </div>
      </div>

      {/* Recruiting Platforms */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recruiting Platforms</h4>
        <div className="flex flex-wrap gap-2">
          {data.recruiting_platforms.map((platform, idx) => (
            <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
              {platform}
            </span>
          ))}
        </div>
      </div>

      {/* Remote Work Policy */}
      {data.remote_work_policy && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Remote Work Policy</h4>
          <p className="text-gray-700 bg-gray-50/50 rounded-xl p-4 border border-gray-100">
            {data.remote_work_policy}
          </p>
        </div>
      )}

      {/* Growth Indicators */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Growth Indicators</h4>
        <div className="space-y-3">
          {data.growth_indicators.map((indicator, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-green-50/50 rounded-xl border border-green-100">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">{indicator}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Postings */}
      {data.job_postings.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Job Postings</h4>
          <div className="flex flex-wrap gap-3">
            {data.job_postings.map((posting, idx) => (
              <a key={idx} href={posting} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 underline">
                Posting {idx + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
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