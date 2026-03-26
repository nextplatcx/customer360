'use client';

import { RiskOpportunity } from '@/types/customer';
import { getRiskColor } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: RiskOpportunity;
}

export default function RiskOpportunityModule({ data }: Props) {
  return (
    <ModuleCard title="Risk & Opportunity" icon="⚖️">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Section */}
        <div>
          <h4 className="text-xs font-semibold text-red-700 uppercase tracking-wider mb-3">
            Risk
          </h4>

          {/* Churn Risk Gauge */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">이탈 위험도</span>
              <span className="text-sm font-bold text-gray-800">{data.churnRisk}%</span>
            </div>
            <div className="trait-bar h-3">
              <div
                className={`trait-bar-fill ${getRiskColor(data.churnRisk)}`}
                style={{ width: `${data.churnRisk}%` }}
              />
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="space-y-2">
            <RiskIndicator label="불만/VOC 증가 여부" active={data.vocIncrease} />
            <RiskIndicator label="사용 감소" active={data.usageDecline} />
            <div className="text-xs">
              <span className="text-gray-500">경쟁사 이동 징후: </span>
              {data.competitorSignals.length > 0 ? (
                data.competitorSignals.map((s) => (
                  <span key={s} className="badge bg-red-50 text-red-700 mr-1">
                    {s}
                  </span>
                ))
              ) : (
                <span className="text-green-600 font-medium">없음</span>
              )}
            </div>
          </div>
        </div>

        {/* Opportunity Section */}
        <div>
          <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wider mb-3">
            Opportunity
          </h4>
          <div className="space-y-2">
            <OpportunityItem
              label="기변 가능성"
              active={data.planChangeEligible}
            />
            <OpportunityItem
              label="요금제 업셀 가능성"
              active={data.upsellEligible}
            />
            <OpportunityItem
              label="결합 전환 가능성"
              active={data.bundleConversionEligible}
            />
            <OpportunityItem
              label="부가서비스 가입 가능성"
              active={data.vasSubscriptionEligible}
            />
          </div>
        </div>
      </div>
    </ModuleCard>
  );
}

function RiskIndicator({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className={`w-2 h-2 rounded-full ${active ? 'bg-red-500' : 'bg-green-500'}`}
      />
      <span className="text-gray-600">{label}</span>
      <span className={`font-medium ${active ? 'text-red-600' : 'text-green-600'}`}>
        {active ? '감지됨' : '정상'}
      </span>
    </div>
  );
}

function OpportunityItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
      <span className="text-xs text-gray-700">{label}</span>
      {active ? (
        <span className="badge bg-green-100 text-green-700">가능</span>
      ) : (
        <span className="badge bg-gray-100 text-gray-500">해당없음</span>
      )}
    </div>
  );
}
