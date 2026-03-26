'use client';

import { UsageValue } from '@/types/customer';
import { formatCurrency } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: UsageValue[];
}

export default function UsageValueModule({ data }: Props) {
  return (
    <ModuleCard title="Usage & Value" icon="📈">
      <div className="space-y-4">
        {data.map((line) => (
          <div
            key={line.lineNumber}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-700">
                회선 {line.lineNumber}
              </span>
              <span className="badge bg-gray-100 text-gray-600">
                {line.paymentPattern}
              </span>
            </div>

            {/* Usage bars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <UsageBar
                label="데이터"
                used={line.dataUsageGB}
                total={line.dataLimitGB}
                unit="GB"
                color="bg-blue-500"
              />
              <div>
                <p className="text-xs text-gray-500 mb-1">음성통화</p>
                <p className="text-sm font-semibold text-gray-800">{line.voiceMinutes}분</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">문자</p>
                <p className="text-sm font-semibold text-gray-800">{line.smsCount}건</p>
              </div>
            </div>

            {/* Roaming & OTT */}
            <div className="flex flex-wrap gap-4 mb-4 text-xs">
              {line.roamingUsage > 0 && (
                <div>
                  <span className="text-gray-500">로밍: </span>
                  <span className="font-medium">{line.roamingUsage}GB</span>
                </div>
              )}
              {line.ottServices.length > 0 && (
                <div>
                  <span className="text-gray-500">OTT: </span>
                  {line.ottServices.map((s) => (
                    <span key={s} className="badge bg-pink-50 text-pink-700 mr-1">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ARPU Trend - Simple bar chart */}
            <div>
              <p className="text-xs text-gray-500 mb-2">ARPU 변화 추이</p>
              <div className="flex items-end gap-1 h-16">
                {line.arpuTrend.map((t) => {
                  const maxArpu = Math.max(...line.arpuTrend.map((x) => x.amount));
                  const height = (t.amount / maxArpu) * 100;
                  return (
                    <div key={t.month} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-blue-400 rounded-t-sm hover:bg-blue-500 transition-colors cursor-default"
                        style={{ height: `${height}%` }}
                        title={`${t.month}: ${formatCurrency(t.amount)}`}
                      />
                      <span className="text-[10px] text-gray-400">
                        {t.month.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}

function UsageBar({
  label,
  used,
  total,
  unit,
  color,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
  color: string;
}) {
  const pct = Math.min((used / total) * 100, 100);
  const isHigh = pct >= 80;

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className={`text-xs font-medium ${isHigh ? 'text-red-600' : 'text-gray-700'}`}>
          {used}{unit} / {total}{unit}
        </span>
      </div>
      <div className="trait-bar">
        <div
          className={`trait-bar-fill ${isHigh ? 'bg-red-500' : color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
