'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { allModules, modulesByTier, tierInfo } from '@/data/modules';
import { completeModule, isCompleted, getProgress, getLevelInfo } from '@/lib/progress';
import QuizBlock from '@/components/QuizBlock';
import ScenarioBlock from '@/components/ScenarioBlock';
import CompoundCalculator from '@/components/CompoundCalculator';
import BettingSimulator from '@/components/BettingSimulator';
import CreditCardCalc from '@/components/CreditCardCalc';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.module as string;

  const mod = allModules.find((m) => m.id === moduleId);

  const [xpEarned, setXpEarned] = useState(0);
  const [isModuleComplete, setIsModuleComplete] = useState(false);
  const [totalXP, setTotalXP] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const p = getProgress();
    setTotalXP(p.totalXP);
    if (mod && p.completedModules.includes(mod.id)) {
      setIsModuleComplete(true);
    }
  }, [mod]);

  const handleXPEarned = useCallback((xp: number) => {
    setXpEarned((prev) => prev + xp);
  }, []);

  const handleCompleteModule = () => {
    if (!mod || isModuleComplete) return;
    const updated = completeModule(mod.id, mod.xp);
    setIsModuleComplete(true);
    setTotalXP(updated.totalXP);
    setShowComplete(true);
  };

  if (!mod) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Lesson not found.</p>
        <Link href="/learn" className="text-blue-600 underline mt-2 block">Back to all lessons</Link>
      </div>
    );
  }

  const tier = mod.tier;
  const info = tierInfo[tier];
  const tierMods = modulesByTier[tier];
  const currentIndex = tierMods.findIndex((m) => m.id === mod.id);
  const nextMod = tierMods[currentIndex + 1] || null;

  const levelInfo = getLevelInfo(totalXP + (isModuleComplete ? 0 : mod.xp));

  // Simple markdown-ish renderer
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    let k = 0; // independent key counter — never reuses values

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
        const text = line.slice(2, -2);
        elements.push(
          <h3 key={k++} className="font-bold text-white text-base mt-5 mb-2">{text}</h3>
        );
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        const text = line.slice(1, -1);
        elements.push(
          <p key={k++} className="italic text-gray-500 text-sm my-1">{text}</p>
        );
      } else if (line.startsWith('- ')) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          items.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={k++} className="list-disc list-inside space-y-1 my-3 text-gray-400">
            {items.map((item, j) => {
              // handle bold inline
              const parts = item.split(/(\*\*[^*]+\*\*)/g);
              return (
                <li key={j} className="text-sm">
                  {parts.map((p, m) =>
                    p.startsWith('**') && p.endsWith('**') ? (
                      <strong key={m} className="text-gray-200">{p.slice(2, -2)}</strong>
                    ) : (
                      p
                    )
                  )}
                </li>
              );
            })}
          </ul>
        );
        continue;
      } else if (line.startsWith('| ')) {
        // Table
        const rows: string[][] = [];
        while (i < lines.length && lines[i].startsWith('|')) {
          if (!lines[i].includes('---')) {
            rows.push(lines[i].split('|').slice(1, -1).map((c) => c.trim()));
          }
          i++;
        }
        elements.push(
          <div key={k++} className="overflow-x-auto my-4">
            <table className="text-sm w-full border-collapse">
              <thead>
                <tr>
                  {rows[0]?.map((cell, j) => (
                    <th key={j} className="bg-[#1a1f2e] border border-gray-700 px-3 py-2 text-left font-semibold text-gray-300">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-[#141414]' : 'bg-[#0f1117]'}>
                    {row.map((cell, m) => (
                      <td key={m} className="border border-gray-700 px-3 py-2 text-gray-400">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      } else if (line.trim() === '') {
        elements.push(<div key={k++} className="h-2" />);
      } else {
        // Inline bold/italic
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        elements.push(
          <p key={k++} className="text-gray-400 text-sm leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**') ? (
                <strong key={j} className="text-gray-200">{p.slice(2, -2)}</strong>
              ) : (
                p
              )
            )}
          </p>
        );
      }
      i++;
    }
    return elements;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link href="/learn" className="hover:text-gray-300 transition-colors">All Missions</Link>
        <span className="text-gray-700">›</span>
        <span className="text-gray-400 text-xs font-bold uppercase tracking-wide">{info.label}</span>
      </div>

      {/* Module header */}
      <div className="bg-[#141414] border border-gray-800 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{mod.emoji}</span>
          <div>
            <h1 className="text-xl font-bold text-white leading-tight">{mod.title}</h1>
            <p className="text-gray-500 text-sm">{mod.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span>{mod.readTime}</span>
          <span>·</span>
          <span className="font-bold text-yellow-500">+{mod.xp} XP</span>
          {isModuleComplete && (
            <>
              <span>·</span>
              <span className="text-emerald-400 font-bold">✓ Completed</span>
            </>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {mod.sections.map((section, idx) => {
          if (section.type === 'lesson' && section.content) {
            return (
              <div key={idx} className="bg-[#141414] border border-gray-800 rounded-xl p-6">
                <div className="prose-custom space-y-1">
                  {renderContent(section.content)}
                </div>
              </div>
            );
          }

          if (section.type === 'quiz' && section.quiz) {
            return (
              <QuizBlock key={idx} quiz={section.quiz} onXPEarned={handleXPEarned} />
            );
          }

          if (section.type === 'scenario' && section.scenario) {
            return (
              <ScenarioBlock key={idx} scenario={section.scenario} onXPEarned={handleXPEarned} />
            );
          }

          if (section.type === 'calculator' && section.calculator) {
            if (section.calculator.type === 'compound') {
              return <CompoundCalculator key={idx} />;
            }
            if (section.calculator.type === 'betting') {
              return <BettingSimulator key={idx} />;
            }
            if (section.calculator.type === 'creditcard') {
              return <CreditCardCalc key={idx} />;
            }
          }

          return null;
        })}
      </div>

      {/* Takeaway */}
      <div className="bg-[#141414] border border-gray-700 rounded-xl p-5">
        <p className="text-[10px] font-bold text-gray-600 mb-2 uppercase tracking-[0.2em]">Key Takeaway</p>
        <p className="font-bold text-white text-base leading-snug">{mod.takeaway}</p>
      </div>

      {/* Complete button — tier-aware */}
      {!isModuleComplete ? (
        <button
          onClick={handleCompleteModule}
          className="w-full py-4 rounded-xl font-bold text-white text-base bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all duration-150 border border-emerald-500"
        >
          {tier <= 2 ? `✅ Complete Mission · Earn ${mod.xp} XP` : `Mark Complete · +${mod.xp} XP`}
        </button>
      ) : tier <= 2 ? (
        /* Tiers 1-2: full gamified celebration */
        <div className="bg-[#141414] border border-emerald-700 rounded-xl p-6 text-center">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-xl font-bold text-white tracking-wide mb-1">MISSION COMPLETE</p>
          <p className="text-emerald-400 font-bold">+{mod.xp} XP EARNED</p>
          <div className="mt-3 bg-emerald-500/10 border border-emerald-800 rounded-lg px-4 py-2 inline-block">
            <p className="font-bold text-emerald-300 text-sm">{levelInfo.emoji} {levelInfo.level} · {totalXP} XP total</p>
          </div>
        </div>
      ) : (
        /* Tiers 3-4: simple adult confirmation */
        <div className="bg-[#141414] border border-emerald-800/50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-bold">✓</span>
            <div>
              <p className="text-white font-bold text-sm">Completed</p>
              <p className="text-gray-600 text-xs">{levelInfo.emoji} {levelInfo.level} · {totalXP} XP total</p>
            </div>
          </div>
          <span className="text-emerald-400 font-bold text-sm">+{mod.xp} XP</span>
        </div>
      )}

      {/* Next module — tier-aware label */}
      {nextMod && (
        <Link
          href={`/learn/${nextMod.id}`}
          className="group flex items-center gap-3 bg-[#141414] border border-gray-800 hover:border-emerald-700 rounded-xl p-4 transition-colors"
        >
          <span className="text-2xl shrink-0">{nextMod.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              {tier <= 2 ? 'Next Mission' : 'Next'}
            </p>
            <p className="font-bold text-white text-sm">{nextMod.title}</p>
            <p className="text-gray-600 text-xs mt-0.5">{nextMod.readTime} · <span className="text-yellow-500 font-bold">+{nextMod.xp} XP</span></p>
          </div>
          <span className="text-gray-600 group-hover:text-emerald-400 transition-colors font-bold">→</span>
        </Link>
      )}

      {/* Back to all */}
      <div className="text-center">
        <Link href="/learn" className="text-sm text-gray-700 hover:text-gray-400 transition-colors">
          ← Back to all missions
        </Link>
      </div>
    </div>
  );
}
