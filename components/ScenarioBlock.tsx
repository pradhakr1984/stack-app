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
    if (selected !== null) return;
    setSelected(idx);
    if (!xpAwarded) {
      onXPEarned(scenario.choices[idx].xpBonus);
      setXpAwarded(true);
    }
  };

  const choice: ScenarioChoice | null = selected !== null ? scenario.choices[selected] : null;

  return (
    <div className="bg-[#131620] border border-white/5 rounded-lg p-5 my-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🤔</span>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Your Decision</p>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-4 mb-4">
        <p className="font-bold text-white text-sm mb-1">{scenario.prompt}</p>
        <p className="text-blue-300 text-xs">{scenario.setup}</p>
      </div>

      <div className="grid gap-2 mb-4">
        {scenario.choices.map((c, i) => {
          const isSelected = selected === i;
          const isOther = selected !== null && !isSelected;
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`
                w-full text-left rounded-md border p-4 transition-all
                ${selected === null ? 'border-white/10 hover:border-blue-500/40 hover:bg-blue-500/5 cursor-pointer' : ''}
                ${isSelected ? 'border-blue-500/50 bg-blue-500/10' : ''}
                ${isOther ? 'border-white/5 opacity-40' : ''}
              `}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">{c.emoji}</span>
                <div className="flex-1">
                  <div className="font-bold text-gray-200 text-sm">{c.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.description}</div>
                </div>
                {isSelected && c.xpBonus > 0 && (
                  <span className="shrink-0 bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    +{c.xpBonus} XP
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {choice && (
        <div className="bg-[#0D0F14] border border-white/5 rounded-md p-4 text-sm space-y-3">
          <p className="font-bold text-gray-300 text-xs">
            You chose: {choice.emoji} {choice.label}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="bg-white/[0.03] rounded-md p-3 border border-white/5">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">After 1 year</p>
              <p className="text-gray-300 text-xs">{choice.outcome1yr}</p>
            </div>
            <div className="bg-white/[0.03] rounded-md p-3 border border-white/5">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">After 10 years</p>
              <p className="text-gray-300 text-xs">{choice.outcome10yr}</p>
            </div>
          </div>
          {choice.xpBonus === 0 && (
            <p className="text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 rounded-md p-2">
              No XP for this choice - but you learned something real.
            </p>
          )}
        </div>
      )}

      {selected === null && (
        <p className="text-xs text-gray-700 text-center">Pick an option to see the outcome</p>
      )}
    </div>
  );
}
