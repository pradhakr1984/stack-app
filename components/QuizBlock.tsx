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
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">❓</span>
        <h3 className="text-base font-bold text-gray-900">Check Your Understanding</h3>
      </div>

      <p className="text-gray-800 font-medium mb-4">{quiz.question}</p>

      <div className="space-y-2 mb-4">
        {quiz.options.map((option, i) => {
          let className =
            'w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ';

          if (selected === null) {
            className += 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
          } else if (i === quiz.correctIndex) {
            className += 'border-emerald-500 bg-emerald-50 text-emerald-900';
          } else if (i === selected && i !== quiz.correctIndex) {
            className += 'border-red-400 bg-red-50 text-red-900';
          } else {
            className += 'border-gray-100 bg-gray-50 text-gray-400 opacity-60';
          }

          return (
            <button key={i} onClick={() => handleAnswer(i)} className={className}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 border-current">
                  {selected !== null
                    ? i === quiz.correctIndex
                      ? '✓'
                      : i === selected
                      ? '✗'
                      : String.fromCharCode(65 + i)
                    : String.fromCharCode(65 + i)}
                </span>
                <span>{option}</span>
                {selected !== null && i === quiz.correctIndex && !xpAwarded && (
                  <span className="ml-auto bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                    +15 XP
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          className={`rounded-xl p-4 text-sm ${
            isCorrect
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border border-amber-200 text-amber-900'
          }`}
        >
          <p className="font-semibold mb-1">{isCorrect ? '✅ Correct!' : '❌ Not quite.'}</p>
          <p>{quiz.explanation}</p>
        </div>
      )}
    </div>
  );
}
