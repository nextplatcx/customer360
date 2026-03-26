'use client';

import { CustomerSnapshot } from '@/types/customer';
import { formatCurrency, formatDate } from '@/lib/utils';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: CustomerSnapshot;
}

export default function CustomerSnapshotModule({ data }: Props) {
  return (
    <ModuleCard title="Customer Snapshot" icon="👤">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Row 1: Key identifiers */}
        <InfoItem label="고객 ID" value={data.customerId} />
        <InfoItem label="고객명" value={data.name} highlight />
        <InfoItem label="가입일" value={formatDate(data.joinDate)} />
        <InfoItem label="고객 유형" value={data.customerType} badge />

        {/* Row 2: Service overview */}
        <InfoItem label="총 회선 수" value={`${data.totalLines}회선`} />
        <InfoItem
          label="결합 여부"
          value={data.isBundled ? '결합 중' : '미결합'}
          valueColor={data.isBundled ? 'text-green-600' : 'text-gray-500'}
        />
        <InfoItem label="ARPU" value={formatCurrency(data.arpu)} highlight />
        <InfoItem label="LTV" value={formatCurrency(data.ltv)} />

        {/* Row 3: Product & contact */}
        <InfoItem label="주요 요금제" value={data.mainProduct} />
        <InfoItem label="주요 단말" value={data.mainDevice} />
        <InfoItem label="최근 접점 채널" value={data.lastContactChannel} />
        <InfoItem label="최근 접점 일자" value={formatDate(data.lastContactDate)} />
      </div>
    </ModuleCard>
  );
}

function InfoItem({
  label,
  value,
  highlight,
  badge,
  valueColor,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  badge?: boolean;
  valueColor?: string;
}) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      {badge ? (
        <span className="badge bg-blue-100 text-blue-800">{value}</span>
      ) : (
        <p
          className={`text-sm font-medium ${
            valueColor || (highlight ? 'text-blue-700' : 'text-gray-900')
          }`}
        >
          {value}
        </p>
      )}
    </div>
  );
}
