'use client';

import { CampaignHistory, CampaignFatigue } from '@/types/customer';
import { formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  campaigns: CampaignHistory[];
  fatigue: CampaignFatigue;
}

const fatigueColors: Record<string, string> = {
  '낮음': 'bg-green-100 text-green-800',
  '보통': 'bg-yellow-100 text-yellow-800',
  '높음': 'bg-orange-100 text-orange-800',
  '매우높음': 'bg-red-100 text-red-800',
};

export default function CampaignResponseModule({ campaigns, fatigue }: Props) {
  return (
    <ModuleCard
      title="Campaign & Response"
      icon="📣"
      headerExtra={
        <span className={`badge ml-2 ${fatigueColors[fatigue.level]}`}>
          피로도: {fatigue.level}
        </span>
      }
    >
      {/* Fatigue summary */}
      <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg text-xs">
        <div>
          <span className="text-gray-500">최근 캠페인 수: </span>
          <span className="font-semibold">{fatigue.recentCount}건</span>
        </div>
        <div>
          <span className="text-gray-500">마지막 발송: </span>
          <span className="font-semibold">{formatDate(fatigue.lastCampaignDate)}</span>
        </div>
      </div>

      {/* Campaign list */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 px-2 text-gray-500 font-medium">캠페인</th>
              <th className="text-left py-2 px-2 text-gray-500 font-medium">노출일</th>
              <th className="text-left py-2 px-2 text-gray-500 font-medium">채널</th>
              <th className="text-center py-2 px-2 text-gray-500 font-medium">클릭</th>
              <th className="text-center py-2 px-2 text-gray-500 font-medium">반응</th>
              <th className="text-center py-2 px-2 text-gray-500 font-medium">전환</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2 px-2 font-medium text-gray-800">{c.campaignName}</td>
                <td className="py-2 px-2 text-gray-600">{formatDate(c.exposureDate)}</td>
                <td className="py-2 px-2">
                  <span className="badge bg-gray-100 text-gray-600">{c.channel}</span>
                </td>
                <td className="py-2 px-2 text-center">
                  <StatusDot active={c.clicked} />
                </td>
                <td className="py-2 px-2 text-center">
                  <StatusDot active={c.responded} />
                </td>
                <td className="py-2 px-2 text-center">
                  <StatusDot active={c.converted} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModuleCard>
  );
}

function StatusDot({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block w-4 h-4 rounded-full ${
        active ? 'bg-green-500' : 'bg-gray-200'
      }`}
      title={active ? 'Yes' : 'No'}
    />
  );
}
