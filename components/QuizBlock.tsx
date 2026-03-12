'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/data/modules';

type Props = {
  quiz: QuizQuestion;
  onXPEarned: (xp: number) => void;
};

export default function QuizBlock({ quiz, onXPEarned }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [xpAwarded, setXpAwarded] = useState(false);

  const isCorrect = selected === quiz.correctIndex;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quiz.correctIndex && !xpAwarded) {
      onXPEarned(15);
      setXpAwarded(true);
    }
  };

  return (
    <div className="bg-[#131620] border border-white/5 rounded-lg p-5 my-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">❓</span>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Check Your Understanding</p>
      </div>

      <p className="text-white font-bold text-sm mb-4">{quiz.question}</p>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option, i) => {
          let base = 'w-full text-left px-4 py-3 rounded-md border text-sm transition-all ';
          if (selected === null) {
            base += 'border-white/10 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10 cursor-pointer';
          } else if (i === quiz.correctIndex) {
            base += 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300';
          } else if (i === selected) {
            base += 'border-red-500/60 bg-red-500/10 text-red-300';
          } else {
            base += 'border-white/5 text-gray-600 opacity-50';
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} className={base}>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-sm border flex items-center justify-center text-xs font-bold shrink-0 border-current">
                  {selected !== null
                    ? i === quiz.correctIndex ? '✓' : i === selected ? '✗' : String.fromCharCode(65 + i)
                    : String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {selected !== null && i === quiz.correctIndex && (
                  <span className="ml-auto bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                    +15 XP
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className={`rounded-md p-4 text-sm border ${
          isCorrect
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          <p className="font-bold mb-1">{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</p>
          <p className="text-gray-400">{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
