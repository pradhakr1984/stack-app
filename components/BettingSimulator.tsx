'use client';

import { useState, useMemo } from 'react';

export default function BettingSimulator() {
  const [betAmount, setBetAmount] = useState(10);
  const [gamesPerWeek, setGamesPerWeek] = useState(5);
  const [weeks, setWeeks] = useState(52);

  const VIG = 0.0476;
  const WIN_RATE = 0.50;

  const result = useMemo(() => {
    const totalBets = gamesPerWeek * weeks;
    const totalWagered = betAmount * totalBets;
    const evPerDollar = WIN_RATE * (100 / 110) - (1 - WIN_RATE) * 1;
    const expectedLoss = -evPerDollar * totalWagered;
    const expectedBalance = totalWagered - expectedLoss;
    const weeklyInvest = betAmount * gamesPerWeek;
    const monthlyRate = 0.08 / 12;
    const totalWeeksAsMonths = weeks / 4.33;
    const investedFV = weeklyInvest * 4.33 * ((Math.pow(1 + monthlyRate, totalWeeksAsMonths) - 1) / monthlyRate);
    return { totalBets, totalWagered, expectedLoss, expectedBalance, investedFV, lossRate: Math.abs(evPerDollar) * 100 };
  }, [betAmount, gamesPerWeek, weeks]);

  const fmt = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString()}`;

  return (
    <div className="bg-[#131620] border border-orange-500/20 rounded-lg p-5 my-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🎰</span>
        <p className="text-[10px] font-bold text-orange-400 uppercase tracking-[0.2em]">Sports Betting Reality Check</p>
      </div>
      <p className="text-xs text-gray-600 mb-5">
        At standard -110 odds with a 50% win rate (roughly average for most bettors):
      </p>

      <div className="grid gap-5 mb-5">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Bet per game</label>
            <span className="text-xs font-bold text-orange-400">${betAmount}</span>
          </div>
          <input type="range" min={5} max={100} step={5} value={betAmount}
            onChange={e => setBetAmount(Number(e.target.value))}
            className="w-full accent-orange-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5"><span>$5</span><span>$100</span></div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Games per week</label>
            <span className="text-xs font-bold text-orange-400">{gamesPerWeek} games</span>
          </div>
          <input type="range" min={1} max={20} step={1} value={gamesPerWeek}
            onChange={e => setGamesPerWeek(Number(e.target.value))}
            className="w-full accent-orange-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5"><span>1</span><span>20</span></div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Time period</label>
            <span className="text-xs font-bold text-orange-400">
              {weeks < 52 ? `${weeks} weeks` : `${Math.round(weeks / 52)} year${weeks >= 104 ? 's' : ''}`}
            </span>
          </div>
          <input type="range" min={4} max={260} step={4} value={weeks}
            onChange={e => setWeeks(Number(e.target.value))}
            className="w-full accent-orange-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5"><span>1 month</span><span>5 years</span></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Betting — expected</p>
          <div className="text-2xl font-bold text-red-300">-{fmt(result.expectedLoss)}</div>
          <p className="text-[10px] text-gray-600 mt-1">
            {fmt(result.totalWagered)} wagered · {result.totalBets} bets
          </p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Invested instead (8%)</p>
          <div className="text-2xl font-bold text-emerald-300">+{fmt(result.investedFV)}</div>
          <p className="text-[10px] text-gray-600 mt-1">
            Difference: <span className="font-bold text-white">{fmt(result.expectedLoss + result.investedFV)}</span>
          </p>
        </div>
      </div>

      <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4 text-xs text-gray-500">
        <p className="font-bold text-gray-300 mb-1">Why the house always wins:</p>
        <p>
          At -110 odds, you need to win <strong className="text-white">52.4%</strong> of bets just to break even.
          The average bettor wins 47–50%. Every bet, every bettor — the math guarantees the app profits.
        </p>
      </div>
    </div>
  );
}
