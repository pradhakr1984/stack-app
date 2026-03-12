'use client';

import { useEffect, useState } from 'react';
import { getProgress, getLevelInfo } from '@/lib/progress';

export default function HeaderXP() {
  const [xp, setXp] = useState<number | null>(null);
  const [levelEmoji, setLevelEmoji] = useState('');

  useEffect(() => {
    const p = getProgress();
    if (p.totalXP > 0) {
      const level = getLevelInfo(p.totalXP);
      setXp(p.totalXP);
      setLevelEmoji(level.emoji);
    }

    // Listen for XP changes across lesson pages
    const onStorage = () => {
      const p2 = getProgress();
      if (p2.totalXP > 0) {
        setXp(p2.totalXP);
        setLevelEmoji(getLevelInfo(p2.totalXP).emoji);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  if (xp === null) return null;

  return (
    <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-300 rounded-full px-3 py-1">
      <span className="text-sm">{levelEmoji}</span>
      <span className="text-xs font-black text-yellow-700">{xp} XP</span>
    </div>
  );
}
