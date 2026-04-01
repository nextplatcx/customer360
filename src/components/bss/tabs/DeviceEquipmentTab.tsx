'use client';

import { ServiceDetail, ServiceItem } from '@/types/bss';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Props {
  services: ServiceItem[];
  serviceDetails: Record<string, ServiceDetail>;
}

const NETWORK_COLORS: Record<string, string> = {
  '5G': 'bg-purple-100 text-purple-700',
  'LTE': 'bg-blue-100 text-blue-700',
  '3G': 'bg-gray-100 text-gray-600',
  '유선': 'bg-green-100 text-green-700',
  'N/A': 'bg-gray-100 text-gray-400',
};
const STATUS_COLORS: Record<string, string> = {
  '정상': 'text-green-600',
  '분실': 'text-red-600',
  '파손': 'text-orange-600',
  '교체중': 'text-blue-600',
};

export default function DeviceEquipmentTab({ services, serviceDetails }: Props) {
  const mobileServices = services.filter((s) => s.type === 'mobile' || s.type === 'internet' || s.type === 'iptv');

  return (
    <div className="flex flex-col h-full overflow-y-auto p-4 space-y-4">
      {mobileServices.map((s) => {
        const d = serviceDetails[s.serviceId];
        if (!d) return null;
        const dev = d.device;

        return (
          <div key={s.serviceId} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Card Header */}
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-gray-700">{s.serviceNumber}</p>
                <p className="text-xs text-gray-400">{s.typeLabel}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${NETWORK_COLORS[dev.networkType] || 'bg-gray-100 text-gray-500'}`}>
                  {dev.networkType}
                </span>
                <span className={`text-xs font-medium ${STATUS_COLORS[dev.deviceStatus]}`}>
                  {dev.deviceStatus}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {/* 단말 기본 정보 */}
              <div>
                <p className="text-sm font-semibold text-gray-800">{dev.manufacturer} {dev.model}</p>
                <p className="text-xs text-gray-500 mt-0.5">{dev.esimYn ? 'eSIM' : 'USIM'} · IMEI: <span className="font-mono">{dev.imei}</span></p>
              </div>

              {/* 할부 정보 */}
              {dev.installmentMonthly > 0 && (
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <p className="text-xs font-medium text-blue-700">할부 진행 중</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-600">월 {formatCurrency(dev.installmentMonthly)}</span>
                    <span className="text-xs text-gray-600">잔여 {formatCurrency(dev.installmentRemaining)}</span>
                  </div>
                </div>
              )}

              {/* 단말 변경 이력 */}
              {dev.deviceHistory.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1.5">변경 이력</p>
                  {dev.deviceHistory.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-xs text-gray-700">{h.model}</span>
                        <span className="text-xs text-gray-400 ml-1.5">{h.event}</span>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(h.date)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2">
                {dev.deviceStatus === '정상' && (
                  <>
                    <ActionBtn icon="🔴" label="분실 신고" />
                    <ActionBtn icon="💳" label="USIM 재발급" />
                  </>
                )}
                {dev.deviceStatus === '분실' && (
                  <ActionBtn icon="✅" label="분실 해제" />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActionBtn({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors">
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
