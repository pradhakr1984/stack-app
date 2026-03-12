'use client';

import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';
import { isCompleted, getLevelInfo, getProgress } from '@/lib/progress';
import { useEffect, useState } from 'react';

export default function LearnPage() {
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const p = getProgress();
    setCompletedIds(p.completedModules);
    setTotalXP(p.totalXP);
  }, []);

  const levelInfo = getLevelInfo(totalXP);
  const totalModules = Object.values(modulesByTier).flat().length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black text-gray-900">All Lessons</h1>
        <p className="text-gray-600">
          Pick your grade level or start wherever you want. Each lesson takes 5-10 minutes.
        </p>
      </div>

      {/* Progress bar if any completed */}
      {completedIds.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-gray-900">
                {levelInfo.emoji} Level: {levelInfo.level}
              </p>
              <p className="text-sm text-gray-500">{levelInfo.title}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-emerald-700">{totalXP} XP</p>
              <p className="text-xs text-gray-400">{completedIds.length}/{totalModules} lessons done</p>
            </div>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, (totalXP / levelInfo.nextXP) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">{totalXP}/{levelInfo.nextXP} XP to next level</p>
        </div>
      )}

      {/* Tiers */}
      {([1, 2, 3, 4] as const).map((tier) => {
        const info = tierInfo[tier];
        const mods = modulesByTier[tier];
        const doneCount = mods.filter((m) => completedIds.includes(m.id)).length;

        return (
          <section key={tier} id={`tier-${tier}`}>
            <div className={`${info.bgClass} ${info.borderClass} border rounded-2xl p-5 mb-4`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className={`${info.badgeClass} text-xs font-bold px-2 py-1 rounded-full`}>
                    {info.grades}
                  </span>
                  <h2 className="text-xl font-black text-gray-900 mt-2">{info.label}</h2>
                  <p className="text-sm text-gray-600 mt-1">{info.description}</p>
                </div>
                {doneCount > 0 && (
                  <span className="text-sm font-semibold text-gray-500 shrink-0 ml-4">
                    {doneCount}/{mods.length} done
                  </span>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {mods.map((mod) => {
                const done = completedIds.includes(mod.id);
                return (
                  <Link
                    key={mod.id}
                    href={`/learn/${mod.id}`}
                    className={`
                      bg-white border rounded-xl p-4 hover:shadow-md transition-all block
                      ${done ? 'border-emerald-300 bg-emerald-50/50' : 'border-gray-200'}
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5">{mod.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight">{mod.title}</h3>
                          {done && (
                            <span className="text-emerald-600 shrink-0 text-sm font-bold">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{mod.subtitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-400">{mod.readTime}</span>
                          <span className="text-gray-300">·</span>
                          <span className="text-xs font-semibold text-yellow-600">+{mod.xp} XP</span>
                        </div>
                      </div>
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
