'use client';

import { UserRole, ROLE_LABELS } from '@/types/customer';

interface HeaderProps {
  role: UserRole;
  onRoleChange: (role: UserRole) => void;
  customerName?: string;
}

export default function Header({ role, onRoleChange, customerName }: HeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {customerName && (
          <h2 className="text-base font-semibold text-gray-800">
            {customerName}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">화면 모드:</span>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {(Object.keys(ROLE_LABELS) as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  role === r
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {ROLE_LABELS[r]}
              </button>
            ))}
          </div>
        </div>

        {/* User avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-sm text-blue-600 font-medium">A</span>
        </div>
      </div>
    </header>
  );
}
