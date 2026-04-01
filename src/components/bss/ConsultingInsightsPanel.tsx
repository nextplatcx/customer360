'use client';

import { ConsultingInsightData, AlertSeverity } from '@/types/bss';

interface Props {
  data: ConsultingInsightData;
}

const SEVERITY_COLORS: Record<AlertSeverity, string> = {
  critical: 'border-l-red-500 bg-red-50',
  warning: 'border-l-amber-500 bg-amber-50',
  info: 'border-l-blue-500 bg-blue-50',
};
const SEVERITY_TEXT: Record<AlertSeverity, string> = {
  critical: 'text-red-700',
  warning: 'text-amber-700',
  info: 'text-blue-700',
};
const SEVERITY_ICON: Record<AlertSeverity, string> = {
  critical: '🚨',
  warning: '⚠',
  info: 'ℹ',
};
const PRIORITY_COLORS = ['bg-red-600', 'bg-orange-500', 'bg-blue-500', 'bg-gray-400'];
const CHANNEL_ICONS: Record<string, string> = {
  '전화': '📞',
  '앱': '📱',
  '매장': '🏪',
  '채팅': '💬',
  '이메일': '✉️',
};

export default function ConsultingInsightsPanel({ data }: Props) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-2.5 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-800">상담 인사이트</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {/* 우선 확인 알림 */}
        {data.priorityAlerts.length > 0 && (
          <Section title="우선 확인 알림">
            <div className="space-y-2">
              {data.priorityAlerts.map((alert, i) => (
                <div
                  key={i}
                  className={`border-l-4 rounded-r-lg p-2.5 ${SEVERITY_COLORS[alert.severity]}`}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm">{SEVERITY_ICON[alert.severity]}</span>
                    <p className={`text-xs font-bold ${SEVERITY_TEXT[alert.severity]}`}>
                      {alert.type}
                    </p>
                  </div>
                  <p className="text-xs text-gray-600">{alert.message}</p>
                  {alert.actionLabel && (
                    <button className={`mt-1.5 text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                      alert.severity === 'critical'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : alert.severity === 'warning'
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}>
                      {alert.actionLabel} →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 최근 상담 요약 */}
        <Section title="최근 상담 요약">
          <p className="text-xs text-gray-600 leading-relaxed">{data.recentConsultSummary}</p>
        </Section>

        {/* VOC 메모 */}
        {data.vocMemo && (
          <Section title="VOC 메모">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2.5">
              <p className="text-xs text-yellow-800 leading-relaxed">{data.vocMemo}</p>
            </div>
          </Section>
        )}

        {/* 반복 이슈 */}
        {data.repeatIssues.length > 0 && (
          <Section title="반복 이슈">
            <div className="flex flex-wrap gap-1">
              {data.repeatIssues.map((issue, i) => (
                <span key={i} className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-medium">
                  🔄 {issue}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* 추천 액션 */}
        {data.recommendedActions.length > 0 && (
          <Section title="추천 처리 액션">
            <div className="space-y-2">
              {data.recommendedActions
                .sort((a, b) => a.priority - b.priority)
                .map((action) => (
                  <div
                    key={action.id}
                    className="bg-white border border-gray-200 rounded-lg p-2.5 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                          PRIORITY_COLORS[action.priority - 1] || 'bg-gray-400'
                        }`}
                      >
                        {action.priority}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-800">{action.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{action.reason}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-400">
                            {CHANNEL_ICONS[action.channel] || '📌'} {action.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Section>
        )}

        {/* 내부 메모 */}
        {data.internalNotes.length > 0 && (
          <Section title="내부 메모">
            <div className="space-y-1.5">
              {data.internalNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-gray-300 mt-0.5">•</span>
                  <p className="text-xs text-gray-600">{note}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}
