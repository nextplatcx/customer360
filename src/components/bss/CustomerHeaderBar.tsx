'use client';

import { CustomerHeaderData, AlertFlag, AlertSeverity } from '@/types/bss';
import { UserRole, ROLE_LABELS } from '@/types/customer';
import { formatDate } from '@/lib/utils';

interface Props {
  data: CustomerHeaderData;
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const ALERT_COLORS: Record<AlertSeverity, string> = {
  critical: 'bg-red-100 text-red-700 border-red-300',
  warning: 'bg-amber-100 text-amber-700 border-amber-300',
  info: 'bg-blue-100 text-blue-700 border-blue-300',
};

const ALERT_ICONS: Record<string, string> = {
  미납: '⚠',
  정지: '🚫',
  민원: '📢',
  해지의향: '⚡',
  약정만료: '📅',
  품질이슈: '📶',
  반복문의: '🔄',
  VIP: '⭐',
  요금민감: '💰',
};

const GRADE_COLORS: Record<string, string> = {
  VVIP: 'bg-yellow-500 text-white',
  VIP: 'bg-purple-600 text-white',
  우수: 'bg-blue-500 text-white',
  일반: 'bg-gray-400 text-white',
};

const STATUS_COLORS: Record<string, string> = {
  정상: 'text-green-600',
  정지: 'text-red-600',
  해지: 'text-gray-400',
};

const QUICK_ACTIONS = [
  { label: '요금제 변경', icon: '📋', roles: ['call_center', 'store'] },
  { label: '부가서비스', icon: '➕', roles: ['call_center', 'store'] },
  { label: '납부수단 변경', icon: '💳', roles: ['call_center'] },
  { label: '상담메모 등록', icon: '✏️', roles: ['call_center', 'store'] },
  { label: '민원 이관', icon: '📤', roles: ['call_center'] },
  { label: '정지/해지', icon: '🔴', roles: ['call_center', 'store'] },
];

export default function CustomerHeaderBar({ data, role, onRoleChange }: Props) {
  const visibleActions = QUICK_ACTIONS.filter((a) =>
    (a.roles as string[]).includes(role)
  );

  return (
    <div className="bg-white border-b border-gray-200 flex-shrink-0">
      {/* Row 1: 고객 식별 + 역할 스위처 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {data.name[0]}
          </div>

          {/* Name + ID */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-gray-900">{data.name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-bold ${GRADE_COLORS[data.grade]}`}>
                {data.grade}
              </span>
              <span className="text-xs text-gray-500">{data.customerId}</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{data.birthDate.slice(0, 4)}년생</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{data.customerType}</span>
              <span className="text-xs text-gray-400">|</span>
              <span className={`text-xs font-medium ${STATUS_COLORS[data.accountStatus]}`}>
                {data.accountStatus}
              </span>
              {data.identityVerified && (
                <span className="text-xs text-green-600">✓ 본인확인</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-gray-500">
                보유 {data.totalServices}개 서비스 · 활성 {data.activeLines}회선
              </span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">
                최근 접점: {formatDate(data.lastContactDate)} ({data.lastContactChannel})
              </span>
            </div>
          </div>

          {/* Alert Flags */}
          <div className="flex items-center gap-1.5 ml-2">
            {data.alertFlags.map((flag, i) => (
              <AlertBadge key={i} flag={flag} />
            ))}
          </div>
        </div>

        {/* Role switcher */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400">화면 모드:</span>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  role === r
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs text-blue-600 font-medium">A</span>
          </div>
        </div>
      </div>

      {/* Row 2: Quick Actions */}
      {visibleActions.length > 0 && (
        <div className="flex items-center gap-1.5 px-4 py-2">
          <span className="text-xs text-gray-400 mr-1">Quick Action</span>
          {visibleActions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AlertBadge({ flag }: { flag: AlertFlag }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full border ${ALERT_COLORS[flag.severity]}`}
      title={flag.message}
    >
      <span>{ALERT_ICONS[flag.type] || '⚠'}</span>
      {flag.type}
    </span>
  );
}
