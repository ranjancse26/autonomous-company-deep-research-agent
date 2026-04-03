import React from 'react';
import { TechnologyStackResponse } from '@/types';

interface TechnologyStackProps {
  data: TechnologyStackResponse;
}

export default function TechnologyStack({ data }: TechnologyStackProps) {
  const categories = [
    { key: 'programming_languages', label: 'Programming Languages', color: 'blue' },
    { key: 'frameworks', label: 'Frameworks', color: 'green' },
    { key: 'databases', label: 'Databases', color: 'purple' },
    { key: 'developer_tools', label: 'Developer Tools', color: 'orange' },
    { key: 'devops_tools', label: 'DevOps Tools', color: 'red' },
    { key: 'other_technologies', label: 'Other Technologies', color: 'indigo' },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-gray-200/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Technology Stack</h3>
          <p className="text-xs text-gray-500">{data.metadata.company} • {data.metadata.source_count} sources</p>
        </div>
      </div>

      {/* Technology Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const technologies = data.technology_stack[category.key as keyof typeof data.technology_stack] as string[];
          if (!technologies || technologies.length === 0) return null;

          const colorClasses = {
            blue: 'bg-blue-50 text-blue-700 border-blue-200',
            green: 'bg-green-50 text-green-700 border-green-200',
            purple: 'bg-purple-50 text-purple-700 border-purple-200',
            orange: 'bg-orange-50 text-orange-700 border-orange-200',
            red: 'bg-red-50 text-red-700 border-red-200',
            indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          };

          return (
            <div key={category.key} className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <h4 className="font-medium text-gray-900 mb-3">{category.label}</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[category.color as keyof typeof colorClasses]}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {categories.every(cat => {
        const techs = data.technology_stack[cat.key as keyof typeof data.technology_stack] as string[];
        return !techs || techs.length === 0;
      }) && (
        <div className="text-center py-8 text-gray-500">
          No technology stack information found for this company.
        </div>
      )}
    </div>
  );
}