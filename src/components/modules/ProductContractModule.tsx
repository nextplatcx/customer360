'use client';

import { ProductLine } from '@/types/customer';
import { formatCurrency, formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: ProductLine[];
  onOpenDetail?: (lineNumber: string) => void;
}

const statusColors: Record<string, string> = {
  '약정중': 'bg-green-100 text-green-800',
  '약정만료': 'bg-yellow-100 text-yellow-800',
  '무약정': 'bg-gray-100 text-gray-600',
};

export default function ProductContractModule({ data, onOpenDetail }: Props) {
  return (
    <ModuleCard title="Product & Contract" icon="📦">
      <div className="space-y-3">
        {data.map((line) => (
          <div
            key={line.lineNumber}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            {/* Line header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">
                  {line.phoneNumber}
                </span>
                <span className={`badge ${statusColors[line.contractStatus]}`}>
                  {line.contractStatus}
                </span>
                {line.canUpsell && (
                  <span className="badge bg-blue-100 text-blue-700">업셀 가능</span>
                )}
              </div>
              {onOpenDetail && (
                <button
                  onClick={() => onOpenDetail(line.lineNumber)}
                  className="action-link"
                >
                  상세보기 &rarr;
                </button>
              )}
            </div>

            {/* Line details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div>
                <p className="text-gray-500">요금제</p>
                <p className="font-medium text-gray-800">{line.plan}</p>
              </div>
              <div>
                <p className="text-gray-500">월정액</p>
                <p className="font-medium text-gray-800">{formatCurrency(line.monthlyFee)}</p>
              </div>
              <div>
                <p className="text-gray-500">단말</p>
                <p className="font-medium text-gray-800">{line.device}</p>
              </div>
              <div>
                <p className="text-gray-500">약정 종료일</p>
                <p className="font-medium text-gray-800">
                  {line.contractEndDate ? formatDate(line.contractEndDate) : '-'}
                </p>
              </div>
            </div>

            {/* Bundled & VAS */}
            {(line.bundledProducts.length > 0 || line.vas.length > 0) && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-3">
                {line.bundledProducts.length > 0 && (
                  <div className="text-xs">
                    <span className="text-gray-500">결합상품: </span>
                    {line.bundledProducts.map((p) => (
                      <span key={p} className="badge bg-purple-50 text-purple-700 mr-1">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
                {line.vas.length > 0 && (
                  <div className="text-xs">
                    <span className="text-gray-500">부가서비스: </span>
                    {line.vas.map((v) => (
                      <span key={v} className="badge bg-teal-50 text-teal-700 mr-1">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Change eligible info */}
            {line.changeEligibleDate && (
              <p className="mt-2 text-xs text-blue-600">
                기변 가능 시점: {formatDate(line.changeEligibleDate)}
              </p>
            )}
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
