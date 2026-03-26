'use client';

import { useState, ReactNode } from 'react';

interface ModuleCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  actions?: ReactNode;
  headerExtra?: ReactNode;
}

export default function ModuleCard({
  title,
  icon,
  children,
  defaultExpanded = true,
  actions,
  headerExtra,
}: ModuleCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="module-card">
      <div
        className="flex items-center justify-between px-5 py-3.5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {headerExtra}
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {actions}
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className={`w-4 h-4 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-5 pb-4 border-t border-gray-100 pt-3">
          {children}
        </div>
      )}
    </div>
  );
}
