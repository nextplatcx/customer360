'use client';

import { PersonaInfo } from '@/types/customer';
import ModuleCard from '@/components/common/ModuleCard';

interface Props {
  data: PersonaInfo;
}

const traitLabels: Record<string, string> = {
  brandOrientation: '브랜드/혜택 지향',
  digitalAcceptance: '디지털/AI 수용',
  convenienceDecision: '편의 중심 의사결정',
  innovationSpending: '혁신/유료 지불 성향',
};

const traitColors: Record<string, string> = {
  brandOrientation: 'bg-purple-500',
  digitalAcceptance: 'bg-blue-500',
  convenienceDecision: 'bg-green-500',
  innovationSpending: 'bg-orange-500',
};

export default function PersonaModule({ data }: Props) {
  return (
    <ModuleCard
      title="Persona"
      icon="🎭"
      headerExtra={
        <span className="badge bg-indigo-100 text-indigo-800 ml-2">
          {data.personaType}
        </span>
      }
    >
      {/* Summary */}
      <p className="text-sm text-gray-600 mb-4 leading-relaxed">{data.summary}</p>

      {/* Trait Sliders */}
      <div className="space-y-3">
        {Object.entries(data.traits).map(([key, value]) => (
          <div key={key}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-600">{traitLabels[key]}</span>
              <span className="text-xs font-semibold text-gray-700">{value}%</span>
            </div>
            <div className="trait-bar">
              <div
                className={`trait-bar-fill ${traitColors[key]}`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </ModuleCard>
  );
}
