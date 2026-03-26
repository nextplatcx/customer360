'use client';

import { useState } from 'react';
import { BillingRecord } from '@/types/customer';
import { formatCurrency } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';
import DetailDrawer from '@/components/common/DetailDrawer';

interface Props {
  data: BillingRecord[];
}

export default function BillingHistoryModule({ data }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingRecord | null>(null);

  const openDetail = (billing: BillingRecord) => {
    setSelectedBilling(billing);
    setDrawerOpen(true);
  };

  return (
    <>
      <ModuleCard
        title="청구 이력"
        icon="📄"
        actions={
          <button onClick={() => setDrawerOpen(true)} className="action-link">
            전체보기
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-gray-500 font-medium">청구월</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium">총 청구액</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium">요금</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium">할인</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 4).map((b) => (
                <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-gray-800 font-medium">{b.billingMonth}</td>
                  <td className="py-2 px-2 text-right font-semibold text-gray-800">
                    {formatCurrency(b.totalAmount)}
                  </td>
                  <td className="py-2 px-2 text-right text-gray-600">
                    {formatCurrency(b.planCharge)}
                  </td>
                  <td className="py-2 px-2 text-right text-red-600">
                    {formatCurrency(b.discount)}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button onClick={() => openDetail(b)} className="action-link">
                      상세
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ModuleCard>

      {/* Detail Drawer */}
      <DetailDrawer
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); setSelectedBilling(null); }}
        title="청구 이력 상세"
      >
        {selectedBilling ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                {selectedBilling.billingMonth} 청구서
              </h3>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(selectedBilling.totalAmount)}
              </p>
            </div>

            {/* Breakdown */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">청구 내역</h4>
              <BreakdownRow label="요금제 기본료" amount={selectedBilling.planCharge} />
              <BreakdownRow label="단말 할부금" amount={selectedBilling.deviceInstallment} />
              <BreakdownRow label="부가서비스" amount={selectedBilling.vasCharge} />
              <BreakdownRow label="기타 요금" amount={selectedBilling.additionalCharge} />
              <BreakdownRow label="할인 합계" amount={selectedBilling.discount} isDiscount />
              <div className="border-t border-gray-300 pt-2 mt-2">
                <BreakdownRow
                  label="총 청구액"
                  amount={selectedBilling.totalAmount}
                  isTotal
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">관련 업무처리</h4>
              <div className="grid grid-cols-2 gap-2">
                <ActionButton label="청구서 재발행" />
                <ActionButton label="요금 조정" />
                <ActionButton label="이의 신청" />
                <ActionButton label="청구 내역 상세" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">전체 청구 이력</h3>
            {data.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedBilling(b)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{b.billingMonth}</p>
                  <p className="text-xs text-gray-500">
                    할인: {formatCurrency(Math.abs(b.discount))}
                  </p>
                </div>
                <p className="text-sm font-semibold">{formatCurrency(b.totalAmount)}</p>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">바로가기</h4>
              <div className="grid grid-cols-2 gap-2">
                <ActionButton label="청구서 재발행" />
                <ActionButton label="요금 조정" />
                <ActionButton label="이의 신청" />
                <ActionButton label="납부 확인서 발급" />
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </>
  );
}

function BreakdownRow({
  label,
  amount,
  isDiscount,
  isTotal,
}: {
  label: string;
  amount: number;
  isDiscount?: boolean;
  isTotal?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${isTotal ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
        {label}
      </span>
      <span
        className={`text-sm ${
          isTotal
            ? 'font-bold text-blue-700'
            : isDiscount
            ? 'text-red-600 font-medium'
            : 'text-gray-800'
        }`}
      >
        {formatCurrency(amount)}
      </span>
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200">
      <span>&rarr;</span> {label}
    </button>
  );
}
