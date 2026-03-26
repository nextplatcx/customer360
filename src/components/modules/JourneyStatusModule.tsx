'use client';

import { JourneyStatus, JourneyStage } from '@/types/customer';
import { getStageColor, formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: JourneyStatus;
}

const ALL_STAGES: JourneyStage[] = [
  '가입초기', '안정이용', '관심탐색', '이탈위험', '이탈진행', '윈백대상',
];

export default function JourneyStatusModule({ data }: Props) {
  return (
    <ModuleCard title="Journey Status" icon="🗺️">
      {/* Current Stage Highlight */}
      <div className="flex items-center gap-4 mb-5">
        <div className={`px-4 py-2 rounded-xl text-sm font-bold ${getStageColor(data.currentStage)}`}>
          {data.currentStage}
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-gray-500">Score</p>
            <p className="text-lg font-bold text-gray-900">{data.stageScore}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Confidence</p>
            <p className="text-lg font-bold text-gray-900">{data.confidence}%</p>
          </div>
        </div>
      </div>

      {/* Journey Path Visualization */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Journey Path</p>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {ALL_STAGES.map((stage) => {
            const isActive = stage === data.currentStage;
            const isInPath = data.journeyPath.includes(stage);
            return (
              <div
                key={stage}
                className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : isInPath
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'bg-gray-50 text-gray-400 border-gray-200'
                }`}
              >
                {stage}
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage History */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Stage 변화 이력</p>
        <div className="flex flex-wrap gap-2">
          {data.stageHistory.map((h, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
              <span className={`badge ${getStageColor(h.stage)}`}>{h.stage}</span>
              <span className="text-gray-400">{formatDate(h.date)}</span>
              {i < data.stageHistory.length - 1 && (
                <span className="text-gray-300 mx-1">&rarr;</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Expected */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          다음 예상 Stage:{' '}
          <span className={`badge ${getStageColor(data.nextExpectedStage)}`}>
            {data.nextExpectedStage}
          </span>
        </p>
      </div>
    </ModuleCard>
  );
}
