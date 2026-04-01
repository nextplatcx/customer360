'use client';

import { CustomerHeaderData, AccountStructure, AlertFlag, AlertSeverity } from '@/types/bss';
import { formatDate } from '@/lib/utils';

interface Props {
  header: CustomerHeaderData;
  accountStructure: AccountStructure;
}

const ALERT_COLORS: Record<AlertSeverity, string> = {
  critical: 'border-l-red-500 bg-red-50',
  warning: 'border-l-amber-500 bg-amber-50',
  info: 'border-l-blue-500 bg-blue-50',
};
const ALERT_TEXT: Record<AlertSeverity, string> = {
  critical: 'text-red-700',
  warning: 'text-amber-700',
  info: 'text-blue-700',
};

export default function LeftPanel({ header, accountStructure }: Props) {
  return (
    <div className="flex flex-col gap-3 p-3">
      {/* ── 주의 플래그 ───────────────────────────────── */}
      {header.alertFlags.length > 0 && (
        <Section title="주의 / 우선 확인사항">
          <div className="space-y-1.5">
            {header.alertFlags.map((flag, i) => (
              <AlertCard key={i} flag={flag} />
            ))}
          </div>
        </Section>
      )}

      {/* ── 고객 프로필 ───────────────────────────────── */}
      <Section title="고객 프로필">
        <div className="space-y-2">
          <ProfileRow label="고객 ID" value={header.customerId} />
          <ProfileRow label="생년월일" value={header.birthDate} />
          <ProfileRow label="고객 유형" value={header.customerType} />
          <ProfileRow label="고객 등급" value={header.grade} highlight />
          <ProfileRow label="계정 상태" value={header.accountStatus} />
          <ProfileRow
            label="본인확인"
            value={header.identityVerified ? '확인완료' : '미확인'}
            valueColor={header.identityVerified ? 'text-green-600' : 'text-red-600'}
          />
          <ProfileRow label="관리 채널" value={header.managedChannel} />
          <ProfileRow label="최근 접점" value={`${formatDate(header.lastContactDate)} / ${header.lastContactChannel}`} />
        </div>
      </Section>

      {/* ── 계정/관계 구조 ─────────────────────────────── */}
      <Section title="계정 / 관계 구조">
        <div className="space-y-2">
          <ProfileRow label="대표 계정" value={accountStructure.representativeAccount} mono />
          <ProfileRow label="청구 계정" value={accountStructure.billingAccount} mono />
          <ProfileRow label="납부 계정" value={accountStructure.paymentAccount} />
          <ProfileRow label="명의자" value={accountStructure.accountHolder} />
          <ProfileRow label="실사용자" value={accountStructure.actualUser} />
          <ProfileRow label="청구지" value={accountStructure.billingAddress} small />
          {accountStructure.installAddress &&
            accountStructure.installAddress !== accountStructure.billingAddress && (
              <ProfileRow label="설치지" value={accountStructure.installAddress} small />
            )}
        </div>
      </Section>

      {/* ── 결합/가족 구조 ─────────────────────────────── */}
      {accountStructure.isBundled && (
        <Section title="결합 / 가족 구조">
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
              🔗 {accountStructure.bundleName}
            </span>
            <span className="text-xs text-gray-400 ml-2">
              ID: {accountStructure.bundleGroupId}
            </span>
          </div>
          <div className="space-y-1.5">
            {accountStructure.familyLines.map((line) => (
              <div
                key={line.lineNumber}
                className="flex items-center justify-between text-xs py-1 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center font-medium text-gray-600 flex-shrink-0">
                    {line.name[0]}
                  </span>
                  <span className="text-gray-800 font-medium">{line.name}</span>
                  <span className="text-gray-400">({line.relation})</span>
                </div>
                <span className="text-gray-500 font-mono">{line.lineNumber}</span>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-3 py-2 bg-gray-50 border-b border-gray-100">
        <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{title}</h3>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function ProfileRow({
  label,
  value,
  highlight,
  mono,
  small,
  valueColor,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
  small?: boolean;
  valueColor?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-gray-400 flex-shrink-0 w-16">{label}</span>
      <span
        className={`text-right leading-tight ${small ? 'text-xs' : 'text-xs'} ${
          valueColor || (highlight ? 'font-semibold text-purple-700' : 'text-gray-800')
        } ${mono ? 'font-mono' : ''}`}
      >
        {value}
      </span>
    </div>
  );
}

function AlertCard({ flag }: { flag: AlertFlag }) {
  return (
    <div className={`border-l-4 rounded-r-lg p-2 ${ALERT_COLORS[flag.severity]}`}>
      <p className={`text-xs font-semibold ${ALERT_TEXT[flag.severity]}`}>
        {flag.type}
      </p>
      <p className="text-xs text-gray-600 mt-0.5">{flag.message}</p>
    </div>
  );
}
