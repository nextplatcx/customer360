'use client';

import { useState } from 'react';
import { TimelineItem, TimelineCategory } from '@/types/bss';
import { formatDate } from '@/lib/utils';

interface Props {
  items: TimelineItem[];
}

const CATEGORIES: TimelineCategory[] = ['전체', '서비스변경', '청구수납', '상담', '단말', '장애품질', '민원', '혜택'];

const CATEGORY_COLORS: Record<TimelineCategory, string> = {
  '전체': 'bg-gray-500',
  '서비스변경': 'bg-blue-500',
  '청구수납': 'bg-green-500',
  '상담': 'bg-purple-500',
  '단말': 'bg-indigo-500',
  '장애품질': 'bg-orange-500',
  '민원': 'bg-red-500',
  '혜택': 'bg-yellow-500',
};

const CATEGORY_CHIP: Record<TimelineCategory, string> = {
  '전체': 'bg-gray-100 text-gray-600',
  '서비스변경': 'bg-blue-100 text-blue-700',
  '청구수납': 'bg-green-100 text-green-700',
  '상담': 'bg-purple-100 text-purple-700',
  '단말': 'bg-indigo-100 text-indigo-700',
  '장애품질': 'bg-orange-100 text-orange-700',
  '민원': 'bg-red-100 text-red-700',
  '혜택': 'bg-yellow-100 text-yellow-700',
};

export default function TimelineTab({ items }: Props) {
  const [filter, setFilter] = useState<TimelineCategory>('전체');

  const filtered = filter === '전체' ? items : items.filter((i) => i.category === filter);
  const availableCategories = CATEGORIES.filter(
    (c) => c === '전체' || items.some((i) => i.category === c)
  );

  return (
    <div className="flex flex-col h-full">
      {/* Filter */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-b border-gray-100 bg-gray-50 flex-wrap">
        {availableCategories.map((cat) => {
          const count = cat === '전체' ? items.length : items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 text-xs rounded-full font-medium transition-colors ${
                filter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat} <span className={filter === cat ? 'text-blue-200' : 'text-gray-400'}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="relative flex gap-4">
                {/* Dot */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${CATEGORY_COLORS[item.category]}`}>
                  <span className="text-white text-xs font-bold">
                    {item.category === '서비스변경' ? '변' :
                     item.category === '청구수납' ? '납' :
                     item.category === '상담' ? '상' :
                     item.category === '단말' ? '단' :
                     item.category === '장애품질' ? '장' :
                     item.category === '민원' ? '민' :
                     item.category === '혜택' ? '혜' : '•'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-3 -mt-0.5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${CATEGORY_CHIP[item.category]}`}>
                        {item.category}
                      </span>
                      {item.serviceLabel && (
                        <span className="text-xs text-gray-400">{item.serviceLabel}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(item.date)}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.description}</p>
                  {(item.channel || item.operator) && (
                    <div className="flex items-center gap-2 mt-1.5">
                      {item.channel && <span className="text-xs text-gray-400">채널: {item.channel}</span>}
                      {item.operator && <span className="text-xs text-gray-400">담당: {item.operator}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
