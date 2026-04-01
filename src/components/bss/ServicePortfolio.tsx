'use client';

import { useState } from 'react';
import { ServiceItem, ServiceType } from '@/types/bss';
import { formatCurrency } from '@/lib/utils';

interface Props {
  services: ServiceItem[];
  selectedServiceId: string | null;
  onSelect: (serviceId: string) => void;
}

const TYPE_FILTERS: { key: ServiceType | 'all'; label: string; icon: string }[] = [
  { key: 'all', label: '전체', icon: '📋' },
  { key: 'mobile', label: '모바일', icon: '📱' },
  { key: 'internet', label: '인터넷', icon: '🌐' },
  { key: 'iptv', label: 'IPTV', icon: '📺' },
  { key: 'vas', label: '부가서비스', icon: '➕' },
];

const STATUS_COLORS: Record<string, string> = {
  '사용중': 'bg-green-100 text-green-700',
  '일시정지': 'bg-yellow-100 text-yellow-700',
  '해지예정': 'bg-orange-100 text-orange-700',
  '해지': 'bg-gray-100 text-gray-500',
};

const TYPE_ICONS: Record<ServiceType, string> = {
  mobile: '📱',
  internet: '🌐',
  iptv: '📺',
  phone: '☎️',
  vas: '➕',
};

const TYPE_BG: Record<ServiceType, string> = {
  mobile: 'bg-blue-50 border-blue-200',
  internet: 'bg-green-50 border-green-200',
  iptv: 'bg-purple-50 border-purple-200',
  phone: 'bg-gray-50 border-gray-200',
  vas: 'bg-orange-50 border-orange-200',
};

const ALERT_FLAG_COLORS: Record<string, string> = {
  '미납': 'bg-red-100 text-red-700',
  '품질이슈': 'bg-orange-100 text-orange-700',
  '해지방어': 'bg-pink-100 text-pink-700',
  '약정만료': 'bg-amber-100 text-amber-700',
};

export default function ServicePortfolio({ services, selectedServiceId, onSelect }: Props) {
  const [filter, setFilter] = useState<ServiceType | 'all'>('all');

  const filtered = filter === 'all' ? services : services.filter((s) => s.type === filter);

  const totalFee = services
    .filter((s) => s.status === '사용중')
    .reduce((sum, s) => sum + s.monthlyFee, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">보유 서비스 포트폴리오</h3>
          <span className="badge bg-gray-100 text-gray-600">{services.length}개</span>
        </div>
        <span className="text-xs text-gray-500">
          월 총 {formatCurrency(totalFee)}
        </span>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-gray-50">
        {TYPE_FILTERS.map((f) => {
          const count = f.key === 'all' ? services.length : services.filter((s) => s.type === f.key).length;
          if (count === 0 && f.key !== 'all') return null;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                filter === f.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {f.icon} {f.label}
              <span className={`ml-0.5 ${filter === f.key ? 'text-blue-200' : 'text-gray-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Service Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-1 gap-2">
          {filtered.map((svc) => (
            <ServiceCard
              key={svc.serviceId}
              service={svc}
              isSelected={selectedServiceId === svc.serviceId}
              onClick={() => onSelect(svc.serviceId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  isSelected,
  onClick,
}: {
  service: ServiceItem;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-3 cursor-pointer transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-400'
          : `${TYPE_BG[service.type]} hover:shadow-sm hover:border-blue-300`
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{TYPE_ICONS[service.type]}</span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-800">
                {service.serviceNumber}
              </span>
              {service.isRepresentative && (
                <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">
                  대표
                </span>
              )}
              {service.isBundled && (
                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded">
                  결합
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{service.typeLabel} · {service.actualUserName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-800">{formatCurrency(service.monthlyFee)}</p>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${STATUS_COLORS[service.status]}`}>
            {service.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-600">{service.planName}</p>
        <div className="flex gap-1">
          {service.alertFlags.map((flag) => (
            <span key={flag} className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${ALERT_FLAG_COLORS[flag] || 'bg-gray-100 text-gray-600'}`}>
              {flag}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-1">
        가입 {service.usagePeriodMonths}개월 · {service.holderName !== service.actualUserName ? `명의: ${service.holderName}` : '명의=실사용'}
      </p>
    </div>
  );
}
