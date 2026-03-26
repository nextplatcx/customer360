'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UserRole, ROLE_MODULES, ModuleId } from '@/types/customer';
import { mockCustomerData } from '@/data/mockCustomer';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CustomerSnapshotModule from '@/components/modules/CustomerSnapshotModule';
import JourneyStatusModule from '@/components/modules/JourneyStatusModule';
import PersonaModule from '@/components/modules/PersonaModule';
import ActivityTimelineModule from '@/components/modules/ActivityTimelineModule';
import ProductContractModule from '@/components/modules/ProductContractModule';
import UsageValueModule from '@/components/modules/UsageValueModule';
import RiskOpportunityModule from '@/components/modules/RiskOpportunityModule';
import NextBestActionModule from '@/components/modules/NextBestActionModule';
import CampaignResponseModule from '@/components/modules/CampaignResponseModule';
import AISummaryModule from '@/components/modules/AISummaryModule';
import PaymentHistoryModule from '@/components/billing/PaymentHistoryModule';
import BillingHistoryModule from '@/components/billing/BillingHistoryModule';
import DiscountBenefitModule from '@/components/billing/DiscountBenefitModule';

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const [role, setRole] = useState<UserRole>('call_center');

  // In production, fetch data based on customerId
  const data = mockCustomerData;
  const visibleModules = ROLE_MODULES[role];

  const isVisible = (moduleId: ModuleId) => visibleModules.includes(moduleId);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header
          role={role}
          onRoleChange={setRole}
          customerName={`${data.snapshot.name} (${customerId})`}
        />

        <main className="p-6">
          {/* Quick navigation tabs */}
          <div className="flex flex-wrap gap-2 mb-6 sticky top-14 bg-gray-50 py-3 z-10 -mx-6 px-6 border-b border-gray-200">
            {visibleModules.map((moduleId) => (
              <a
                key={moduleId}
                href={`#module-${moduleId}`}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
              >
                {MODULE_LABELS[moduleId]}
              </a>
            ))}
          </div>

          {/* Module Grid - Two column layout for decision flow */}
          <div className="space-y-4">
            {/* Row 1: AI Summary + Customer Snapshot - Quick understanding */}
            {isVisible('aiSummary') && (
              <div id="module-aiSummary">
                <AISummaryModule data={data.aiSummary} />
              </div>
            )}

            {isVisible('snapshot') && (
              <div id="module-snapshot">
                <CustomerSnapshotModule data={data.snapshot} />
              </div>
            )}

            {/* Row 2: Journey + Persona - Context understanding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {isVisible('journey') && (
                <div id="module-journey">
                  <JourneyStatusModule data={data.journey} />
                </div>
              )}
              {isVisible('persona') && (
                <div id="module-persona">
                  <PersonaModule data={data.persona} />
                </div>
              )}
            </div>

            {/* Row 3: Risk & NBA - Action decisions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {isVisible('risk') && (
                <div id="module-risk">
                  <RiskOpportunityModule data={data.riskOpportunity} />
                </div>
              )}
              {isVisible('nba') && (
                <div id="module-nba">
                  <NextBestActionModule data={data.nextBestActions} />
                </div>
              )}
            </div>

            {/* Row 4: Products & Usage - Detail context */}
            {isVisible('product') && (
              <div id="module-product">
                <ProductContractModule data={data.products} />
              </div>
            )}
            {isVisible('usage') && (
              <div id="module-usage">
                <UsageValueModule data={data.usage} />
              </div>
            )}

            {/* Row 5: Billing area (Call Center only) */}
            {(isVisible('payment') || isVisible('billing') || isVisible('discount')) && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6">
                  요금 / 납부 / 할인
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {isVisible('payment') && (
                    <div id="module-payment">
                      <PaymentHistoryModule data={data.payments} />
                    </div>
                  )}
                  {isVisible('billing') && (
                    <div id="module-billing">
                      <BillingHistoryModule data={data.billings} />
                    </div>
                  )}
                  {isVisible('discount') && (
                    <div id="module-discount">
                      <DiscountBenefitModule data={data.discounts} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Row 6: Activity & Campaign */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {isVisible('activity') && (
                <div id="module-activity">
                  <ActivityTimelineModule data={data.activities} />
                </div>
              )}
              {isVisible('campaign') && (
                <div id="module-campaign">
                  <CampaignResponseModule
                    campaigns={data.campaigns}
                    fatigue={data.campaignFatigue}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const MODULE_LABELS: Record<ModuleId, string> = {
  snapshot: 'Snapshot',
  journey: 'Journey',
  persona: 'Persona',
  activity: 'Activity',
  product: 'Product',
  usage: 'Usage',
  risk: 'Risk',
  nba: 'NBA',
  campaign: 'Campaign',
  aiSummary: 'AI Summary',
  payment: '납부',
  billing: '청구',
  discount: '할인',
};
