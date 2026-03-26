'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/types/customer';
import { mockCustomerList } from '@/data/mockCustomer';
import { formatCurrency } from '@/lib/utils';
import { getRiskColor } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>('call_center');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = mockCustomerList.filter(
    (c) =>
      c.name.includes(searchQuery) ||
      c.phoneNumber.includes(searchQuery) ||
      c.customerId.includes(searchQuery)
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header role={role} onRoleChange={setRole} />

        <main className="p-6">
          {/* Search Section */}
          <div className="max-w-3xl mx-auto mb-10 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Customer 360 Dashboard
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              고객 이름, 전화번호, 또는 고객 ID로 검색하세요
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="고객 검색 (이름, 전화번호, 고객ID)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none shadow-sm bg-white transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Customer List */}
          <div className="max-w-5xl mx-auto">
            <div className="module-card overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-200 bg-gray-50">
                <h3 className="text-sm font-semibold text-gray-700">
                  검색 결과 ({filtered.length}건)
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {filtered.map((customer) => (
                  <div
                    key={customer.customerId}
                    className="px-5 py-4 hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between"
                    onClick={() => router.push(`/customer/${customer.customerId}`)}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-blue-600">
                          {customer.customerType === '법인' ? '법' : customer.name[0]}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-800">
                            {customer.name}
                          </span>
                          <span className="badge bg-gray-100 text-gray-600">
                            {customer.customerType}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-gray-500">{customer.customerId}</span>
                          <span className="text-xs text-gray-500">{customer.phoneNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* ARPU */}
                      <div className="text-right">
                        <p className="text-xs text-gray-500">ARPU</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {formatCurrency(customer.arpu)}
                        </p>
                      </div>

                      {/* Churn Risk */}
                      <div className="w-24">
                        <p className="text-xs text-gray-500 mb-1">이탈위험</p>
                        <div className="flex items-center gap-2">
                          <div className="trait-bar flex-1">
                            <div
                              className={`trait-bar-fill ${getRiskColor(customer.churnRisk)}`}
                              style={{ width: `${customer.churnRisk}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-gray-700">
                            {customer.churnRisk}%
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
