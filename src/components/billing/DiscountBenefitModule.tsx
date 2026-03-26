'use client';

import { useState } from 'react';
import { DiscountBenefit } from '@/types/customer';
import { formatCurrency, formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';
import DetailDrawer from '@/components/common/DetailDrawer';

interface Props {
  data: DiscountBenefit[];
}

const statusColors: Record<string, string> = {
  '적용중': 'bg-green-100 text-green-800',
  '만료': 'bg-gray-100 text-gray-600',
  '대기': 'bg-yellow-100 text-yellow-800',
};

const typeIcons: Record<string, string> = {
  '요금할인': '💰',
  '데이터보너스': '📶',
  '제휴할인': '🤝',
  '멤버십': '⭐',
};

export default function DiscountBenefitModule({ data }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeDiscounts = data.filter((d) => d.status === '적용중');
  const totalDiscount = activeDiscounts.reduce((sum, d) => sum + d.discountAmount, 0);

  return (
    <>
      <ModuleCard
        title="할인 & 혜택"
        icon="🎁"
        headerExtra={
          <span className="badge bg-green-100 text-green-700 ml-2">
            월 {formatCurrency(totalDiscount)} 할인 중
          </span>
        }
        actions={
          <button onClick={() => setDrawerOpen(true)} className="action-link">
            전체보기
          </button>
        }
      >
        <div className="space-y-2">
          {activeDiscounts.map((d) => (
            <div
              key={d.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{typeIcons[d.type] || '🏷️'}</span>
                <div>
                  <p className="text-sm font-medium text-gray-800">{d.name}</p>
                  <p className="text-xs text-gray-500">
                    {d.type} | {formatDate(d.startDate)} ~ {formatDate(d.endDate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {d.discountAmount > 0 && (
                  <p className="text-sm font-semibold text-green-600">
                    -{formatCurrency(d.discountAmount)}
                  </p>
                )}
                <span className={`badge ${statusColors[d.status]}`}>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </ModuleCard>

      {/* Detail Drawer */}
      <DetailDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="할인 & 혜택 상세"
      >
        <div className="space-y-4">
          {/* Summary */}
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-xs text-green-700 mb-1">현재 적용 중인 할인 합계</p>
            <p className="text-2xl font-bold text-green-800">
              월 {formatCurrency(totalDiscount)}
            </p>
            <p className="text-xs text-green-600 mt-1">
              {activeDiscounts.length}건 적용 중
            </p>
          </div>

          {/* All discounts */}
          <div className="space-y-3">
            {data.map((d) => (
              <div
                key={d.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{typeIcons[d.type] || '🏷️'}</span>
                    <h4 className="text-sm font-semibold text-gray-800">{d.name}</h4>
                  </div>
                  <span className={`badge ${statusColors[d.status]}`}>{d.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-500">유형</p>
                    <p className="font-medium">{d.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">할인액</p>
                    <p className="font-medium text-green-600">
                      {d.discountAmount > 0
                        ? `-${formatCurrency(d.discountAmount)}/월`
                        : '데이터 혜택'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">적용 기간</p>
                    <p className="font-medium">
                      {formatDate(d.startDate)} ~ {formatDate(d.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">적용 회선</p>
                    <p className="font-medium">
                      {d.lineNumber === 'ALL' ? '전체 회선' : d.lineNumber}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">관련 업무처리</h4>
            <div className="grid grid-cols-2 gap-2">
              <ActionButton label="할인 등록" />
              <ActionButton label="할인 해지" />
              <ActionButton label="혜택 조회" />
              <ActionButton label="프로모션 적용" />
            </div>
          </div>
        </div>
      </DetailDrawer>
    </>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
      <span>&rarr;</span> {label}
    </button>
  );
}
