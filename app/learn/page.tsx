'use client';

import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';
import { getLevelInfo, getProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function LearnPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState<number | null>(null);

  useEffect(() => {
    const p = getProgress();
    setCompletedIds(p.completedModules);
    setTotalXP(p.totalXP);
  }, []);

  const levelInfo = getLevelInfo(totalXP ?? 0);
  const totalModules = Object.values(modulesByTier).flat().length;

  const tierAccent = ['border-emerald-800', 'border-blue-800', 'border-violet-800', 'border-orange-800'];
  const tierLabel = ['text-emerald-400', 'text-blue-400', 'text-violet-400', 'text-orange-400'];
  const tierXP = ['text-emerald-400', 'text-blue-400', 'text-violet-400', 'text-orange-400'];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white">All Missions</h1>
        <p className="text-gray-500 text-sm">
          16 missions across 4 levels. Each one takes 5–10 minutes.
        </p>
      </div>

      {/* Progress if any completed — only render once XP has loaded from localStorage */}
      {totalXP !== null && completedIds.length > 0 && (
        <div className="bg-[#141414] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-white text-sm">
                {levelInfo.emoji} {levelInfo.level}
              </p>
              <p className="text-gray-500 text-xs">{levelInfo.title}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-400">{totalXP} XP</p>
              <p className="text-gray-600 text-xs">{completedIds.length}/{totalModules} done</p>
            </div>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (totalXP / levelInfo.nextXP) * 100)}%` }}
            />
          </div>
          <p className="text-gray-700 text-xs mt-1.5 text-right">{totalXP}/{levelInfo.nextXP} XP to next rank</p>
        </div>
      )}

      {/* Tiers */}
      {([1, 2, 3, 4] as const).map((tier) => {
        const info = tierInfo[tier];
        const mods = modulesByTier[tier];
        const doneCount = mods.filter((m) => completedIds.includes(m.id)).length;

        return (
          <section key={tier} id={`tier-${tier}`}>
            <div className={`bg-[#141414] border ${tierAccent[tier - 1]} rounded-xl p-4 mb-3`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`${tierLabel[tier - 1]} text-[10px] font-bold uppercase tracking-widest`}>
                    {info.grades}
                  </span>
                  <h2 className="text-white font-bold text-base mt-1">{info.label}</h2>
                  <p className="text-gray-500 text-xs mt-0.5">{info.description}</p>
                </div>
                {doneCount > 0 && (
                  <span className={`text-xs font-bold shrink-0 ml-4 ${tierLabel[tier - 1]}`}>
                    {doneCount}/{mods.length}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden">
              {mods.map((mod, idx) => {
                const done = completedIds.includes(mod.id);
                return (
                  <Link
                    key={mod.id}
                    href={`/learn/${mod.id}`}
                    className={`flex items-center gap-3 px-4 py-3.5 transition-colors
                      ${idx < mods.length - 1 ? 'border-b border-gray-800' : ''}
                      ${done ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-white/[0.03]'}
                    `}
                  >
                    <span className="text-xl shrink-0">{mod.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm leading-tight ${done ? 'text-white' : 'text-gray-200'}`}>
                        {mod.title}
                      </p>
                      <p className="text-gray-600 text-xs mt-0.5">{mod.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-600 text-xs">{mod.readTime}</span>
                      <span className={`text-[11px] font-bold ${tierXP[tier - 1]}`}>+{mod.xp}</span>
                      {done
                        ? <span className="text-emerald-400 font-bold text-sm">✓</span>
                        : <span className="text-gray-700 font-bold text-sm">→</span>
                      }
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
