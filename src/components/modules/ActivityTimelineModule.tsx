'use client';

import { ActivityItem } from '@/types/customer';
import { formatDate, getActivityIcon } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: ActivityItem[];
}

const typeColors: Record<string, string> = {
  '상담': 'bg-blue-500',
  '앱': 'bg-green-500',
  '웹': 'bg-purple-500',
  '매장': 'bg-orange-500',
  '이벤트': 'bg-pink-500',
};

export default function ActivityTimelineModule({ data }: Props) {
  return (
    <ModuleCard title="Activity Timeline" icon="📊">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['전체', '상담', '앱', '웹', '매장', '이벤트'].map((type) => (
          <button
            key={type}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              type === '전체'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-0">
        {data.map((item, index) => (
          <div key={item.id} className="flex gap-3">
            {/* Timeline line & dot */}
            <div className="flex flex-col items-center">
              <div className={`timeline-dot ${typeColors[item.type]}`} />
              {index < data.length - 1 && (
                <div className="timeline-line flex-1 min-h-[2rem]" />
              )}
            </div>

            {/* Content */}
            <div className="pb-4 flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs">{getActivityIcon(item.type)}</span>
                <span className="text-xs font-medium text-gray-800">{item.title}</span>
                <span className="badge bg-gray-100 text-gray-600">{item.channel}</span>
              </div>
              <p className="text-xs text-gray-500 mb-0.5">{formatDate(item.date)}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
