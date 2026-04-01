'use client';

import { ServiceDetail, ServiceItem } from '@/types/bss';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Props {
  services: ServiceItem[];
  serviceDetails: Record<string, ServiceDetail>;
}

export default function BillingPaymentTab({ services, serviceDetails }: Props) {
  const activeServices = services.filter((s) => s.status === '사용중');
  const totalFee = activeServices.reduce((sum, s) => sum + s.monthlyFee, 0);
  const overdueServices = activeServices.filter((s) => {
    const d = serviceDetails[s.serviceId];
    return d?.billing.isOverdue;
  });

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {/* 미납 경고 */}
      {overdueServices.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-bold text-red-700 mb-2">⚠ 미납 서비스 {overdueServices.length}건</p>
          {overdueServices.map((s) => {
            const d = serviceDetails[s.serviceId];
            return (
              <div key={s.serviceId} className="flex items-center justify-between py-1.5 border-b border-red-100 last:border-0">
                <div>
                  <p className="text-xs font-medium text-red-800">{s.serviceNumber}</p>
                  <p className="text-xs text-red-600">{d.billing.overdueMonths}개월 연체</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-700">{formatCurrency(d.billing.overdueAmount)}</p>
                  <button className="text-xs text-white bg-red-600 px-2 py-0.5 rounded hover:bg-red-700 transition-colors">
                    납부처리
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 청구 요약 */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-800">이번달 청구 요약</h4>
          <span className="text-base font-bold text-blue-700">{formatCurrency(totalFee)}</span>
        </div>
        <div className="space-y-2">
          {activeServices.map((s) => {
            const d = serviceDetails[s.serviceId];
            return (
              <div key={s.serviceId} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="text-xs font-medium text-gray-800">{s.serviceNumber}</p>
                    <p className="text-xs text-gray-400">{s.planName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-800">{formatCurrency(s.monthlyFee)}</p>
                  {d && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      d.billing.lastPaymentStatus === '완납' ? 'bg-green-100 text-green-600' :
                      d.billing.lastPaymentStatus === '미납' ? 'bg-red-100 text-red-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      {d.billing.lastPaymentStatus}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 납부수단 */}
      {activeServices.slice(0, 1).map((s) => {
        const d = serviceDetails[s.serviceId];
        if (!d) return null;
        return (
          <div key={s.serviceId} className="bg-white border border-gray-200 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">납부 수단</h4>
            <div className="space-y-1.5">
              <BillingRow label="납부수단" value={d.billing.paymentMethod} />
              <BillingRow label="납부계좌" value={d.billing.paymentAccount} mono />
              <BillingRow label="청구방법" value={d.billing.billingMethod} />
              <BillingRow label="최근납부일" value={formatDate(d.billing.lastPaymentDate)} />
            </div>
          </div>
        );
      })}

      {/* 액션 버튼 */}
      <div className="grid grid-cols-3 gap-2">
        <QuickAction icon="💳" label="납부수단 변경" />
        <QuickAction icon="📄" label="청구서 재발송" />
        <QuickAction icon="🔍" label="납부 이력 조회" />
      </div>
    </div>
  );
}

function BillingRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-400">{label}</span>
      <span className={`text-xs text-gray-800 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 py-3 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors">
      <span className="text-lg">{icon}</span>
      <span className="text-xs font-medium text-gray-600">{label}</span>
    </button>
  );
}
