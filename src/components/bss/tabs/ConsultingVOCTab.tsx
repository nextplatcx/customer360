'use client';

import { useState } from 'react';
import { VOCRecord } from '@/types/bss';
import { formatDate } from '@/lib/utils';

interface Props {
  records: VOCRecord[];
}

const TYPE_COLORS: Record<VOCRecord['type'], string> = {
  '문의': 'bg-blue-100 text-blue-700',
  '불만': 'bg-red-100 text-red-700',
  '제안': 'bg-green-100 text-green-700',
  '칭찬': 'bg-yellow-100 text-yellow-700',
};
const STATUS_COLORS: Record<VOCRecord['status'], string> = {
  '처리완료': 'text-green-600',
  '처리중': 'text-blue-600',
  '접수': 'text-gray-500',
};
const STATUS_DOT: Record<VOCRecord['status'], string> = {
  '처리완료': 'bg-green-500',
  '처리중': 'bg-blue-500',
  '접수': 'bg-gray-400',
};
const CHANNEL_ICONS: Record<string, string> = {
  '전화': '📞',
  '앱': '📱',
  '매장방문': '🏪',
  '채팅': '💬',
  '이메일': '✉️',
  '웹': '🌐',
};

type FilterType = '전체' | VOCRecord['type'];
const FILTERS: FilterType[] = ['전체', '불만', '문의', '제안', '칭찬'];

export default function ConsultingVOCTab({ records }: Props) {
  const [filter, setFilter] = useState<FilterType>('전체');

  const filtered = filter === '전체' ? records : records.filter((r) => r.type === filter);

  return (
    <div className="flex flex-col h-full">
      {/* Filter */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-gray-50">
        {FILTERS.map((f) => {
          const count = f === '전체' ? records.length : records.filter((r) => r.type === f).length;
          if (count === 0 && f !== '전체') return null;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {f} <span className={filter === f ? 'text-blue-200' : 'text-gray-400'}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map((record) => (
          <VOCCard key={record.id} record={record} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            <p className="text-sm">해당 유형의 VOC가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}

function VOCCard({ record: r }: { record: VOCRecord }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-sm transition-all"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${TYPE_COLORS[r.type]}`}>
            {r.type}
          </span>
          <span className="text-xs text-gray-400">{CHANNEL_ICONS[r.channel] || '📌'} {r.channel}</span>
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(r.date)}</span>
      </div>

      <p className="text-xs font-semibold text-gray-800">{r.title}</p>

      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[r.status]}`} />
          <span className={`text-xs font-medium ${STATUS_COLORS[r.status]}`}>{r.status}</span>
          <span className="text-xs text-gray-400">· {r.assignee}</span>
        </div>
        <span className="text-xs text-gray-400">{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-600 leading-relaxed">{r.summary}</p>
        </div>
      )}
    </div>
  );
}
