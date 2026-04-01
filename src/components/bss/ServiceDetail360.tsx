'use client';

import { useState } from 'react';
import { ServiceDetail, ServiceItem } from '@/types/bss';
import { formatCurrency, formatDate } from '@/lib/utils';

interface Props {
  service: ServiceItem;
  detail: ServiceDetail;
}

type Tab = '상품/계약' | '청구/납부' | '단말/장비' | '이용/품질';
const TABS: Tab[] = ['상품/계약', '청구/납부', '단말/장비', '이용/품질'];

const TAB_ICONS: Record<Tab, string> = {
  '상품/계약': '📋',
  '청구/납부': '💳',
  '단말/장비': '📱',
  '이용/품질': '📊',
};

export default function ServiceDetail360({ service, detail }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('상품/계약');

  return (
    <div className="flex flex-col h-full">
      {/* Service Header */}
      <div className="px-4 py-2.5 border-b border-gray-100 bg-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">선택된 서비스</p>
            <p className="text-sm font-bold text-gray-900">{service.serviceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{service.typeLabel}</p>
            <p className="text-sm font-semibold text-blue-700">{service.planName}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-medium transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{TAB_ICONS[tab]}</span>
            <span>{tab}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === '상품/계약' && <ProductTab detail={detail} />}
        {activeTab === '청구/납부' && <BillingTab detail={detail} />}
        {activeTab === '단말/장비' && <DeviceTab detail={detail} />}
        {activeTab === '이용/품질' && <UsageTab detail={detail} />}
      </div>
    </div>
  );
}

/* ── 상품/계약 ── */
function ProductTab({ detail }: { detail: ServiceDetail }) {
  const p = detail.product;
  const contractColor =
    p.contractType === '약정중' ? 'text-green-600' :
    p.contractType === '약정만료' ? 'text-red-600' :
    'text-gray-500';

  return (
    <div className="p-3 space-y-3">
      {/* 요금제 */}
      <Card title="요금제 정보">
        <Row label="요금제명" value={p.planName} bold />
        <Row label="기본요금" value={formatCurrency(p.planFee)} />
        <Row label="가입일" value={formatDate(p.activationDate)} />
        <Row label="최근변경" value={formatDate(p.lastChangeDate)} />
        <Row
          label="약정 상태"
          value={`${p.contractType}${p.contractMonths ? ` (${p.contractMonths}개월)` : ''}`}
          valueClass={contractColor}
        />
        {p.contractEndDate && (
          <Row label="약정 만료일" value={formatDate(p.contractEndDate)} valueClass="text-orange-600 font-medium" />
        )}
      </Card>

      {/* 부가서비스 */}
      {p.vas.length > 0 && (
        <Card title={`부가서비스 (${p.vas.length}개)`}>
          {p.vas.map((v, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-700">{v.name}</span>
              <span className="text-xs text-gray-600 font-medium">{formatCurrency(v.fee)}</span>
            </div>
          ))}
        </Card>
      )}

      {/* 할인 혜택 */}
      {p.discounts.length > 0 && (
        <Card title={`적용 할인 (${p.discounts.length}개)`}>
          {p.discounts.map((d, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
              <div>
                <span className="text-xs text-gray-700">{d.name}</span>
                <span className="text-xs text-gray-400 ml-1">~{formatDate(d.endDate)}</span>
              </div>
              <span className="text-xs text-blue-600 font-medium">-{formatCurrency(d.amount)}</span>
            </div>
          ))}
        </Card>
      )}

      {/* 결합 상품 */}
      {p.bundleProducts.length > 0 && (
        <Card title="결합 상품">
          <div className="flex flex-wrap gap-1">
            {p.bundleProducts.map((bp, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">{bp}</span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ── 청구/납부 ── */
function BillingTab({ detail }: { detail: ServiceDetail }) {
  const b = detail.billing;
  const statusColor =
    b.lastPaymentStatus === '완납' ? 'text-green-600' :
    b.lastPaymentStatus === '미납' ? 'text-red-600' :
    'text-orange-600';

  return (
    <div className="p-3 space-y-3">
      {/* 미납 경고 */}
      {b.isOverdue && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs font-bold text-red-700">⚠ 미납 경고</p>
          <p className="text-xs text-red-600 mt-0.5">
            미납금액 {formatCurrency(b.overdueAmount)} · {b.overdueMonths}개월 연체
          </p>
          <button className="mt-2 text-xs font-medium text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors">
            납부 처리 →
          </button>
        </div>
      )}

      <Card title="이번달 청구">
        <Row label="청구금액" value={formatCurrency(b.currentMonthAmount)} bold />
        <Row label="납부수단" value={b.paymentMethod} />
        <Row label="납부계좌" value={b.paymentAccount} mono />
        <Row label="청구방법" value={b.billingMethod} />
      </Card>

      <Card title="납부 현황">
        <Row label="최근납부" value={`${formatDate(b.lastPaymentDate)}`} />
        <Row
          label="납부상태"
          value={b.lastPaymentStatus}
          valueClass={statusColor + ' font-medium'}
        />
        {b.isOverdue && (
          <Row label="미납금액" value={formatCurrency(b.overdueAmount)} valueClass="text-red-600 font-bold" />
        )}
      </Card>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <ActionButton label="납부수단 변경" icon="💳" />
        <ActionButton label="청구서 재발송" icon="📄" />
        <ActionButton label="납부 이력" icon="🔍" />
      </div>
    </div>
  );
}

/* ── 단말/장비 ── */
function DeviceTab({ detail }: { detail: ServiceDetail }) {
  const d = detail.device;
  const deviceStatusColor =
    d.deviceStatus === '정상' ? 'text-green-600' :
    d.deviceStatus === '분실' ? 'text-red-600' :
    d.deviceStatus === '파손' ? 'text-orange-600' :
    'text-blue-600';

  return (
    <div className="p-3 space-y-3">
      <Card title="단말 정보">
        <Row label="제조사" value={d.manufacturer} />
        <Row label="모델명" value={d.model} bold />
        <Row label="네트워크" value={d.networkType} />
        <Row
          label="단말 상태"
          value={d.deviceStatus}
          valueClass={deviceStatusColor + ' font-medium'}
        />
        <Row label="eSIM" value={d.esimYn ? 'eSIM' : '일반 USIM'} />
      </Card>

      <Card title="식별 정보">
        <Row label="IMEI" value={d.imei} mono small />
        <Row label="USIM" value={d.usimNumber} mono small />
      </Card>

      {d.installmentMonthly > 0 && (
        <Card title="할부 현황">
          <Row label="월 할부금" value={formatCurrency(d.installmentMonthly)} />
          <Row label="잔여 할부금" value={formatCurrency(d.installmentRemaining)} valueClass="text-blue-600 font-medium" />
        </Card>
      )}

      {d.deviceHistory.length > 0 && (
        <Card title="단말 변경 이력">
          {d.deviceHistory.map((h, i) => (
            <div key={i} className="flex justify-between items-start py-1 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-xs text-gray-700 font-medium">{h.model}</p>
                <p className="text-xs text-gray-400">{h.event}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(h.date)}</span>
            </div>
          ))}
        </Card>
      )}

      <div className="flex gap-2">
        <ActionButton label="분실 신고" icon="🔴" />
        <ActionButton label="USIM 재발급" icon="💳" />
      </div>
    </div>
  );
}

/* ── 이용/품질 ── */
function UsageTab({ detail }: { detail: ServiceDetail }) {
  const u = detail.usage;
  const dataPercent = u.dataLimitGB > 0 ? Math.min((u.dataUsedGB / u.dataLimitGB) * 100, 100) : 0;
  const barColor = dataPercent > 90 ? 'bg-red-500' : dataPercent > 70 ? 'bg-orange-400' : 'bg-blue-500';

  return (
    <div className="p-3 space-y-3">
      {/* 품질 이슈 경고 */}
      {u.qualityIssueFlag && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-xs font-bold text-orange-700">📶 품질 이슈 감지</p>
          {u.recentIssues.map((issue, i) => (
            <p key={i} className="text-xs text-orange-600 mt-0.5">• {issue}</p>
          ))}
          {u.relatedInquiry && (
            <p className="text-xs text-gray-500 mt-1">관련 문의: {u.relatedInquiry}</p>
          )}
        </div>
      )}

      <Card title="데이터 사용량">
        <div className="mb-2">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">사용: <strong>{u.dataUsedGB}GB</strong></span>
            <span className="text-gray-400">한도: {u.dataLimitGB > 0 ? `${u.dataLimitGB}GB` : '무제한'}</span>
          </div>
          {u.dataLimitGB > 0 && (
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: `${dataPercent}%` }}
              />
            </div>
          )}
        </div>
      </Card>

      <Card title="음성/문자">
        <Row label="통화" value={`${u.voiceMinutes.toLocaleString()}분`} />
        <Row label="문자" value={`${u.smsCount.toLocaleString()}건`} />
      </Card>

      {u.roamingActive && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs font-bold text-blue-700">✈ 로밍 사용 중</p>
          {u.roamingCountry && (
            <p className="text-xs text-blue-600 mt-0.5">현재 위치: {u.roamingCountry}</p>
          )}
        </div>
      )}

      {u.vasUsage.length > 0 && (
        <Card title="부가서비스 이용">
          <div className="flex flex-wrap gap-1">
            {u.vasUsage.map((v, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{v}</span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

/* ── Sub-components ── */
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-3 space-y-1.5">{children}</div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  mono,
  small,
  valueClass,
}: {
  label: string;
  value: string;
  bold?: boolean;
  mono?: boolean;
  small?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-gray-400 flex-shrink-0 w-16">{label}</span>
      <span
        className={`text-right leading-tight ${small ? 'text-xs' : 'text-xs'} ${
          valueClass || (bold ? 'font-semibold text-gray-900' : 'text-gray-700')
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}

function ActionButton({ label, icon }: { label: string; icon: string }) {
  return (
    <button className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors">
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
}
