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

  // Placeholder keeps nav layout stable while XP loads
  if (xp === null) return <div className="w-16 h-7" />;

  return (
    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
      <span className="text-sm">{levelEmoji}</span>
      <span className="text-xs font-bold text-emerald-400">{xp} XP</span>
    </div>
  );
}
