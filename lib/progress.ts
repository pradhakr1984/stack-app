'use client';

const STORAGE_KEY = 'stack_progress_v1';

export type ProgressData = {
  completedModules: string[];   // module ids
  totalXP: number;
  lastVisited: string;          // ISO date
};

const defaultProgress: ProgressData = {
  completedModules: [],
  totalXP: 0,
  lastVisited: new Date().toISOString(),
};

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return JSON.parse(raw) as ProgressData;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable - fail silently
  }
}

export function completeModule(moduleId: string, xp: number): ProgressData {
  const current = getProgress();
  if (current.completedModules.includes(moduleId)) return current;
  const updated: ProgressData = {
    completedModules: [...current.completedModules, moduleId],
    totalXP: current.totalXP + xp,
    lastVisited: new Date().toISOString(),
  };
  saveProgress(updated);
  return updated;
}

export function isCompleted(moduleId: string): boolean {
  return getProgress().completedModules.includes(moduleId);
}

export function getLevelInfo(xp: number): { level: string; title: string; nextXP: number; emoji: string } {
  if (xp >= 800) return { level: 'Money Smart', title: 'You know more than most adults', nextXP: 1000, emoji: '🏆' };
  if (xp >= 500) return { level: 'Investor', title: 'Building real financial skills', nextXP: 800, emoji: '📈' };
  if (xp >= 200) return { level: 'Saver', title: 'Getting the fundamentals right', nextXP: 500, emoji: '💰' };
  return { level: 'Beginner', title: 'Starting your financial journey', nextXP: 200, emoji: '🌱' };
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
