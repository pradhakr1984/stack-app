'use client';

import { useState } from 'react';
import type { Scenario, ScenarioChoice } from '@/data/modules';

type Props = {
  scenario: Scenario;
  onXPEarned: (xp: number) => void;
};

export default function ScenarioBlock({ scenario, onXPEarned }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);

  const handleSelect = (idx: number) => {
    if (selected !== null) return; // lock after first pick
    setSelected(idx);
    if (!xpAwarded) {
      const choice = scenario.choices[idx];
      onXPEarned(choice.xpBonus);
      setXpAwarded(true);
    }
  };

  const choice: ScenarioChoice | null = selected !== null ? scenario.choices[selected] : null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🤔</span>
        <h3 className="text-lg font-bold text-gray-900">Your Decision</h3>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-5">
        <p className="font-semibold text-blue-900 text-base mb-1">{scenario.prompt}</p>
        <p className="text-blue-700 text-sm">{scenario.setup}</p>
      </div>

      <div className="grid gap-3 mb-4">
        {scenario.choices.map((c, i) => {
          const isSelected = selected === i;
          const isOther = selected !== null && !isSelected;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`
                w-full text-left rounded-xl border-2 p-4 transition-all
                ${selected === null ? 'hover:border-blue-400 hover:bg-blue-50 cursor-pointer' : ''}
                ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                ${isOther ? 'opacity-50' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{c.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-900">{c.label}</div>
                  <div className="text-sm text-gray-600 mt-0.5">{c.description}</div>
                </div>
                {isSelected && c.xpBonus > 0 && (
                  <span className="ml-auto shrink-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    +{c.xpBonus} XP
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {choice && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm space-y-2 animate-fade-in">
          <p className="font-semibold text-gray-800">
            You chose: {choice.emoji} {choice.label}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-1">After 1 year:</p>
              <p className="text-gray-800">{choice.outcome1yr}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-gray-100">
              <p className="text-xs font-medium text-gray-500 mb-1">After 10 years:</p>
              <p className="text-gray-800">{choice.outcome10yr}</p>
            </div>
          </div>
          {choice.xpBonus === 0 && (
            <p className="text-amber-700 text-xs bg-amber-50 rounded-lg p-2">
              No XP for this choice - but you learned something. Try again from the top to see all outcomes.
            </p>
          )}
        </div>
      )}

      {selected === null && (
        <p className="text-xs text-gray-400 text-center">Pick an option to see the outcome</p>
      )}
    </div>
  );
}
