'use client';

import { useState, useMemo } from 'react';

export default function BettingSimulator() {
  const [betAmount, setBetAmount] = useState(10);
  const [gamesPerWeek, setGamesPerWeek] = useState(5);
  const [weeks, setWeeks] = useState(52); // 1 year

  // Standard -110 odds = bet $110 to win $100
  // Implied win prob to break even: 110 / (110+100) = 52.38%
  // At 50% win rate, expected value per $1 bet = -0.0476 (the vig)
  const VIG = 0.0476;
  const WIN_RATE = 0.50;

  const result = useMemo(() => {
    const totalBets = gamesPerWeek * weeks;
    const totalWagered = betAmount * totalBets;
    // EV per bet at -110, 50% win rate
    // Win: +$100 per $110 bet (net +100/110 per dollar bet)
    // Loss: -$1 per dollar bet
    // EV = 0.5 * (100/110) - 0.5 * 1 = 0.5 * 0.909 - 0.5 = 0.4545 - 0.5 = -0.0455
    const evPerDollar = WIN_RATE * (100 / 110) - (1 - WIN_RATE) * 1;
    const expectedLoss = -evPerDollar * totalWagered;
    const expectedBalance = totalWagered - expectedLoss;

    // Alternative: invested in index fund
    const weeklyInvest = betAmount * gamesPerWeek;
    const monthlyRate = 0.08 / 12;
    const totalWeeksAsMonths = weeks / 4.33;
    const investedFV = weeklyInvest * 4.33 * ((Math.pow(1 + monthlyRate, totalWeeksAsMonths) - 1) / monthlyRate);

    return {
      totalBets,
      totalWagered,
      expectedLoss,
      expectedBalance,
      investedFV,
      lossRate: Math.abs(evPerDollar) * 100,
    };
  }, [betAmount, gamesPerWeek, weeks]);

  const fmt = (n: number) => `$${Math.round(Math.abs(n)).toLocaleString()}`;

  return (
    <div className="bg-white border border-orange-200 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🎰</span>
        <h3 className="text-lg font-bold text-gray-900">Sports Betting Reality Check</h3>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        At standard -110 odds with a 50% win rate (roughly average for most bettors):
      </p>

      <div className="grid gap-5 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Bet amount per game</label>
            <span className="text-sm font-bold text-orange-700">${betAmount}</span>
          </div>
          <input
            type="range" min={5} max={100} step={5}
            value={betAmount}
            onChange={e => setBetAmount(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$5</span><span>$100</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Games bet per week</label>
            <span className="text-sm font-bold text-orange-700">{gamesPerWeek} games</span>
          </div>
          <input
            type="range" min={1} max={20} step={1}
            value={gamesPerWeek}
            onChange={e => setGamesPerWeek(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1</span><span>20</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Time period</label>
            <span className="text-sm font-bold text-orange-700">
              {weeks < 52 ? `${weeks} weeks` : `${Math.round(weeks / 52)} year${weeks >= 104 ? 's' : ''}`}
            </span>
          </div>
          <input
            type="range" min={4} max={260} step={4}
            value={weeks}
            onChange={e => setWeeks(Number(e.target.value))}
            className="w-full accent-orange-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1 month</span><span>5 years</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs text-red-600 mb-1 font-medium">Sports betting - expected outcome</p>
          <div className="text-2xl font-black text-red-700">-{fmt(result.expectedLoss)}</div>
          <p className="text-xs text-gray-500 mt-1">
            You wagered {fmt(result.totalWagered)} across {result.totalBets} bets.
            The house edge guarantees losses over time.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs text-emerald-600 mb-1 font-medium">Same money invested (8% return)</p>
          <div className="text-2xl font-black text-emerald-700">+{fmt(result.investedFV)}</div>
          <p className="text-xs text-gray-500 mt-1">
            The difference between betting and investing:{' '}
            <span className="font-bold">{fmt(result.expectedLoss + result.investedFV)}</span>
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-1">Why the house always wins:</p>
        <p>
          At -110 odds, you need to win <strong>52.4%</strong> of bets just to break even.
          The average bettor wins about 47-50%. The app is making money on every single bet,
          from every bettor, regardless of outcome. That's not bad luck - that's the math.
        </p>
      </div>
    </div>
  );
}
