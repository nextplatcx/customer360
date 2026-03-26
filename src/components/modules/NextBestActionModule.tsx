'use client';

import { NextBestAction } from '@/types/customer';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: NextBestAction[];
}

const priorityColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500'];

export default function NextBestActionModule({ data }: Props) {
  return (
    <ModuleCard title="Next Best Action" icon="🎯">
      <div className="space-y-3">
        {data.map((action, index) => (
          <div
            key={action.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex items-start gap-3">
              {/* Priority indicator */}
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    priorityColors[index] || 'bg-gray-400'
                  }`}
                >
                  {action.priority}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-800 mb-1">
                  {action.offer}
                </h4>
                <p className="text-xs text-gray-600 mb-2 leading-relaxed">
                  {action.message}
                </p>
                <div className="flex items-center gap-3">
                  <span className="badge bg-blue-50 text-blue-700">
                    {action.channel}
                  </span>
                  <span className="badge bg-gray-100 text-gray-600">
                    {action.timing}
                  </span>
                </div>
              </div>

              {/* Action button */}
              <button className="flex-shrink-0 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                실행
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
