'use client';

import { BenefitRecord } from '@/types/bss';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Props {
  benefits: BenefitRecord[];
}

const TYPE_COLORS: Record<BenefitRecord['type'], string> = {
  '요금할인': 'bg-blue-100 text-blue-700',
  '데이터보너스': 'bg-green-100 text-green-700',
  '제휴할인': 'bg-purple-100 text-purple-700',
  '멤버십': 'bg-yellow-100 text-yellow-700',
  '프로모션': 'bg-orange-100 text-orange-700',
};
const STATUS_COLORS: Record<BenefitRecord['status'], string> = {
  '적용중': 'text-green-600 bg-green-50',
  '만료': 'text-gray-400 bg-gray-50',
  '대기': 'text-blue-600 bg-blue-50',
};

export default function BenefitsContractTab({ benefits }: Props) {
  const active = benefits.filter((b) => b.status === '적용중');
  const pending = benefits.filter((b) => b.status === '대기');
  const expired = benefits.filter((b) => b.status === '만료');

  const totalDiscount = active.reduce((sum, b) => sum + b.discountAmount, 0);

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {/* 요약 */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-blue-600">현재 적용 중인 혜택</p>
          <p className="text-2xl font-bold text-blue-700">{active.length}개</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-blue-600">월 할인 합계</p>
          <p className="text-xl font-bold text-blue-700">{formatCurrency(totalDiscount)}</p>
        </div>
      </div>

      {/* 적용중 */}
      {active.length > 0 && (
        <BenefitGroup title="적용 중" items={active} />
      )}

      {/* 대기 */}
      {pending.length > 0 && (
        <BenefitGroup title="적용 대기" items={pending} />
      )}

      {/* 만료 */}
      {expired.length > 0 && (
        <BenefitGroup title="만료된 혜택" items={expired} dimmed />
      )}
    </div>
  );
}

function BenefitGroup({ title, items, dimmed }: { title: string; items: BenefitRecord[]; dimmed?: boolean }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden ${dimmed ? 'opacity-60' : ''}`}>
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title} ({items.length})</p>
      </div>
      <div className="divide-y divide-gray-50">
        {items.map((b) => (
          <BenefitCard key={b.id} benefit={b} />
        ))}
      </div>
    </div>
  );
}

function BenefitCard({ benefit: b }: { benefit: BenefitRecord }) {
  return (
    <div className="p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[b.type]}`}>
              {b.type}
            </span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${STATUS_COLORS[b.status]}`}>
              {b.status}
            </span>
          </div>
          <p className="text-xs font-semibold text-gray-800">{b.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">{b.serviceLabel}</p>
        </div>
        <div className="text-right flex-shrink-0">
          {b.discountAmount > 0 && (
            <p className="text-sm font-bold text-blue-600">-{formatCurrency(b.discountAmount)}</p>
          )}
          <p className="text-xs text-gray-400">/월</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-1.5">
        <span className="text-xs text-gray-400">{formatDate(b.startDate)} ~ {formatDate(b.endDate)}</span>
      </div>
    </div>
  );
}
