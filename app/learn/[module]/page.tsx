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
          <h3 key={k++} className="font-bold text-gray-900 text-base mt-5 mb-2">{text}</h3>
        );
      } else if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
        const text = line.slice(1, -1);
        elements.push(
          <p key={k++} className="italic text-gray-600 text-sm my-1">{text}</p>
        );
      } else if (line.startsWith('- ')) {
        const items: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          items.push(lines[i].slice(2));
          i++;
        }
        elements.push(
          <ul key={k++} className="list-disc list-inside space-y-1 my-3 text-gray-700">
            {items.map((item, j) => {
              // handle bold inline
              const parts = item.split(/(\*\*[^*]+\*\*)/g);
              return (
                <li key={j} className="text-sm">
                  {parts.map((p, m) =>
                    p.startsWith('**') && p.endsWith('**') ? (
                      <strong key={m}>{p.slice(2, -2)}</strong>
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
                    <th key={j} className="bg-gray-100 border border-gray-200 px-3 py-2 text-left font-semibold text-gray-800">{cell}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(1).map((row, j) => (
                  <tr key={j} className={j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, m) => (
                      <td key={m} className="border border-gray-200 px-3 py-2 text-gray-700">{cell}</td>
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
          <p key={k++} className="text-gray-700 text-sm leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith('**') && p.endsWith('**') ? (
                <strong key={j} className="text-gray-900">{p.slice(2, -2)}</strong>
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
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/learn" className="hover:text-gray-800">All Lessons</Link>
        <span>›</span>
        <span className={`${info.badgeClass} text-xs font-bold px-2 py-0.5 rounded-full`}>
          {info.label}
        </span>
      </div>

      {/* Module header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{mod.emoji}</span>
          <div>
            <h1 className="text-2xl font-black text-gray-900">{mod.title}</h1>
            <p className="text-gray-500 text-sm">{mod.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span>⏱ {mod.readTime}</span>
          <span>·</span>
          <span className="font-semibold text-yellow-600">+{mod.xp} XP on completion</span>
          {isModuleComplete && (
            <>
              <span>·</span>
              <span className="text-emerald-600 font-semibold">✓ Completed</span>
            </>
          )}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-2">
        {mod.sections.map((section, idx) => {
          if (section.type === 'lesson' && section.content) {
            return (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
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
      <div className="bg-gray-900 text-white rounded-2xl p-6">
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Key Takeaway</p>
        <p className="font-bold text-lg leading-tight">{mod.takeaway}</p>
      </div>

      {/* Complete button */}
      {!isModuleComplete ? (
        <button
          onClick={handleCompleteModule}
          className={`w-full py-4 rounded-2xl font-bold text-white text-lg transition-colors ${info.buttonClass}`}
        >
          Mark Complete & Earn {mod.xp} XP →
        </button>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 text-center">
          <p className="text-2xl mb-1">🎉</p>
          <p className="font-bold text-emerald-800">Lesson complete!</p>
          <p className="text-emerald-600 text-sm">You earned {mod.xp} XP • Total: {totalXP} XP</p>
          <p className="text-emerald-700 text-sm font-semibold mt-1">{levelInfo.emoji} {levelInfo.level}: {levelInfo.title}</p>
        </div>
      )}

      {/* Next lesson */}
      {nextMod && (
        <Link
          href={`/learn/${nextMod.id}`}
          className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow"
        >
          <span className="text-3xl">{nextMod.emoji}</span>
          <div>
            <p className="text-xs text-gray-400 font-medium">Next lesson</p>
            <p className="font-bold text-gray-900">{nextMod.title}</p>
            <p className="text-xs text-gray-500">{nextMod.readTime} · +{nextMod.xp} XP</p>
          </div>
          <span className="ml-auto text-gray-400 text-xl">→</span>
        </Link>
      )}

      {/* Back to all */}
      <div className="text-center">
        <Link href="/learn" className="text-sm text-gray-500 hover:text-gray-800 underline underline-offset-2">
          ← Back to all lessons
        </Link>
      </div>
    </div>
  );
}
