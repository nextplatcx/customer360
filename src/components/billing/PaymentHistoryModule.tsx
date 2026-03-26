'use client';

import { useState } from 'react';
import { PaymentRecord } from '@/types/customer';
import { formatCurrency, formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';
import DetailDrawer from '@/components/common/DetailDrawer';

interface Props {
  data: PaymentRecord[];
}

const statusColors: Record<string, string> = {
  '완납': 'text-green-600',
  '미납': 'text-red-600',
  '부분납': 'text-orange-600',
};

export default function PaymentHistoryModule({ data }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);

  const openDetail = (payment: PaymentRecord) => {
    setSelectedPayment(payment);
    setDrawerOpen(true);
  };

  return (
    <>
      <ModuleCard
        title="납부 이력"
        icon="💳"
        actions={
          <button
            onClick={() => setDrawerOpen(true)}
            className="action-link"
          >
            전체보기
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-gray-500 font-medium">납부일</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium">납부액</th>
                <th className="text-left py-2 px-2 text-gray-500 font-medium">방법</th>
                <th className="text-left py-2 px-2 text-gray-500 font-medium">상태</th>
                <th className="text-right py-2 px-2 text-gray-500 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {data.slice(0, 4).map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-gray-800">{formatDate(p.date)}</td>
                  <td className="py-2 px-2 text-right font-medium text-gray-800">
                    {formatCurrency(p.amount)}
                  </td>
                  <td className="py-2 px-2">
                    <span className="badge bg-gray-100 text-gray-600">{p.method}</span>
                  </td>
                  <td className={`py-2 px-2 font-medium ${statusColors[p.status]}`}>
                    {p.status}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button
                      onClick={() => openDetail(p)}
                      className="action-link"
                    >
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
        onClose={() => { setDrawerOpen(false); setSelectedPayment(null); }}
        title="납부 이력 상세"
      >
        {selectedPayment ? (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">선택된 납부 건</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">납부일</p>
                  <p className="font-medium">{formatDate(selectedPayment.date)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">납부액</p>
                  <p className="font-medium">{formatCurrency(selectedPayment.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">납부 방법</p>
                  <p className="font-medium">{selectedPayment.method}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">상태</p>
                  <p className={`font-medium ${statusColors[selectedPayment.status]}`}>
                    {selectedPayment.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">관련 업무처리</h4>
              <div className="grid grid-cols-2 gap-2">
                <ActionButton label="수납처리" />
                <ActionButton label="환불처리" />
                <ActionButton label="납부방법 변경" />
                <ActionButton label="미납요금 안내" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">전체 납부 이력</h3>
            {data.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPayment(p)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{formatDate(p.date)}</p>
                  <p className="text-xs text-gray-500">{p.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{formatCurrency(p.amount)}</p>
                  <p className={`text-xs font-medium ${statusColors[p.status]}`}>{p.status}</p>
                </div>
              </div>
            ))}

            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">바로가기</h4>
              <div className="grid grid-cols-2 gap-2">
                <ActionButton label="수납처리" />
                <ActionButton label="환불처리" />
                <ActionButton label="납부방법 변경" />
                <ActionButton label="자동이체 등록/변경" />
              </div>
            </div>
          </div>
        )}
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
