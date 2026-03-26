'use client';

import { AISummary } from '@/types/customer';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: AISummary;
}

export default function AISummaryModule({ data }: Props) {
  return (
    <ModuleCard title="AI Summary" icon="🤖">
      {/* Status Summary */}
      <div className="p-3 bg-blue-50 rounded-lg mb-4">
        <p className="text-sm text-blue-900 leading-relaxed">{data.statusSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Interests */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            주요 관심사
          </h4>
          <div className="space-y-1">
            {data.mainInterests.map((interest) => (
              <div key={interest} className="flex items-center gap-2 text-xs text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            리스크 요인
          </h4>
          <div className="space-y-1">
            {data.riskFactors.map((risk) => (
              <div key={risk} className="flex items-center gap-2 text-xs text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                {risk}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Strategy */}
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            추천 전략
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            {data.recommendedStrategy}
          </p>
        </div>
      </div>
    </ModuleCard>
  );
}
