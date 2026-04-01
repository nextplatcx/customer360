'use client';

import { useState } from 'react';
import { UserRole } from '@/types/customer';
import { mockBSSData } from '@/data/mockBSS';
import CustomerHeaderBar from '@/components/bss/CustomerHeaderBar';
import LeftPanel from '@/components/bss/LeftPanel';
import ServicePortfolio from '@/components/bss/ServicePortfolio';
import ServiceDetail360 from '@/components/bss/ServiceDetail360';
import ConsultingInsightsPanel from '@/components/bss/ConsultingInsightsPanel';
import BillingPaymentTab from '@/components/bss/tabs/BillingPaymentTab';
import DeviceEquipmentTab from '@/components/bss/tabs/DeviceEquipmentTab';
import BenefitsContractTab from '@/components/bss/tabs/BenefitsContractTab';
import ConsultingVOCTab from '@/components/bss/tabs/ConsultingVOCTab';
import TimelineTab from '@/components/bss/tabs/TimelineTab';

type BottomTab = '청구/납부' | '단말/장비' | '혜택/약정' | '상담/VOC' | '통합 타임라인';
const BOTTOM_TABS: { key: BottomTab; icon: string }[] = [
  { key: '청구/납부', icon: '💳' },
  { key: '단말/장비', icon: '📱' },
  { key: '혜택/약정', icon: '🎁' },
  { key: '상담/VOC', icon: '📢' },
  { key: '통합 타임라인', icon: '🕐' },
];

const BOTTOM_PANEL_HEIGHT = 320;

export default function BSSCustomerPage() {
  const data = mockBSSData;
  const [role, setRole] = useState<UserRole>('call_center');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    data.services[0]?.serviceId ?? null
  );
  const [activeBottomTab, setActiveBottomTab] = useState<BottomTab | null>(null);

  const selectedService = data.services.find((s) => s.serviceId === selectedServiceId) ?? null;
  const selectedDetail = selectedServiceId ? data.serviceDetails[selectedServiceId] : null;

  const bottomOpen = activeBottomTab !== null;

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
      {/* ── Top Header (fixed) ── */}
      <CustomerHeaderBar data={data.header} role={role} onRoleChange={setRole} />

      {/* ── Body (3-column, fills remaining height) ── */}
      <div
        className="flex flex-1 min-h-0 gap-0 overflow-hidden transition-all duration-300"
        style={{ paddingBottom: bottomOpen ? BOTTOM_PANEL_HEIGHT : 0 }}
      >
        {/* Left Panel */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <LeftPanel header={data.header} accountStructure={data.accountStructure} />
        </aside>

        {/* Center Panel */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white border-r border-gray-200">
          {/* Service Portfolio (top half of center) */}
          <div className="flex-none h-[44%] border-b border-gray-200 overflow-hidden">
            <ServicePortfolio
              services={data.services}
              selectedServiceId={selectedServiceId}
              onSelect={setSelectedServiceId}
            />
          </div>

          {/* Service Detail 360 (bottom half of center) */}
          <div className="flex-1 overflow-hidden">
            {selectedService && selectedDetail ? (
              <ServiceDetail360 service={selectedService} detail={selectedDetail} />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p className="text-sm">서비스를 선택하세요</p>
              </div>
            )}
          </div>
        </main>

        {/* Right Panel */}
        <aside className="w-72 flex-shrink-0 bg-white overflow-y-auto">
          <ConsultingInsightsPanel data={data.consultingInsight} />
        </aside>
      </div>

      {/* ── Bottom Tabs (fixed to bottom) ── */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30"
        style={{ height: bottomOpen ? BOTTOM_PANEL_HEIGHT : 'auto' }}
      >
        {/* Tab Bar */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-0 flex-1">
            {BOTTOM_TABS.map(({ key, icon }) => (
              <button
                key={key}
                onClick={() =>
                  setActiveBottomTab(activeBottomTab === key ? null : key)
                }
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                  activeBottomTab === key
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white'
                }`}
              >
                <span>{icon}</span>
                <span>{key}</span>
              </button>
            ))}
          </div>
          {bottomOpen && (
            <button
              onClick={() => setActiveBottomTab(null)}
              className="px-3 py-2 text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕ 닫기
            </button>
          )}
        </div>

        {/* Tab Content */}
        {bottomOpen && (
          <div
            className="overflow-hidden"
            style={{ height: BOTTOM_PANEL_HEIGHT - 40 }}
          >
            {activeBottomTab === '청구/납부' && (
              <BillingPaymentTab services={data.services} serviceDetails={data.serviceDetails} />
            )}
            {activeBottomTab === '단말/장비' && (
              <DeviceEquipmentTab services={data.services} serviceDetails={data.serviceDetails} />
            )}
            {activeBottomTab === '혜택/약정' && (
              <BenefitsContractTab benefits={data.benefits} />
            )}
            {activeBottomTab === '상담/VOC' && (
              <ConsultingVOCTab records={data.vocRecords} />
            )}
            {activeBottomTab === '통합 타임라인' && (
              <TimelineTab items={data.timeline} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
