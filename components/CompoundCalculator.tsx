'use client';

import { useState, useMemo } from 'react';

export default function CompoundCalculator() {
  const [monthlyContrib, setMonthlyContrib] = useState(100);
  const [startAge, setStartAge] = useState(16);
  const [rate, setRate] = useState(8);
  const [endAge] = useState(65);

  const result = useMemo(() => {
    const years = endAge - startAge;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    // Future value of series formula
    const fv = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalContributed = monthlyContrib * months;
    const interestEarned = fv - totalContributed;
    return { fv, totalContributed, interestEarned, years };
  }, [monthlyContrib, startAge, rate]);

  // Comparison: if you waited 10 years to start
  const lateResult = useMemo(() => {
    const years = Math.max(0, endAge - (startAge + 10));
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const fv = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return { fv, years };
  }, [monthlyContrib, startAge, rate]);

  const fmt = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(2)}M`
      : `$${Math.round(n).toLocaleString()}`;

  const pct = (part: number, total: number) =>
    total > 0 ? Math.round((part / total) * 100) : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-2xl">📊</span>
        <h3 className="text-lg font-bold text-gray-900">Compound Interest Calculator</h3>
      </div>

      <div className="grid gap-5 mb-6">
        {/* Monthly contribution */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Monthly contribution</label>
            <span className="text-sm font-bold text-emerald-700">${monthlyContrib}/mo</span>
          </div>
          <input
            type="range" min={10} max={1000} step={10}
            value={monthlyContrib}
            onChange={e => setMonthlyContrib(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$10</span><span>$1,000</span>
          </div>
        </div>

        {/* Start age */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Start investing at age</label>
            <span className="text-sm font-bold text-emerald-700">{startAge} years old</span>
          </div>
          <input
            type="range" min={10} max={40} step={1}
            value={startAge}
            onChange={e => setStartAge(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>10</span><span>40</span>
          </div>
        </div>

        {/* Rate */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Annual return rate</label>
            <span className="text-sm font-bold text-emerald-700">{rate}%</span>
          </div>
          <input
            type="range" min={1} max={12} step={0.5}
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>1% (savings)</span><span>12% (aggressive)</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">S&P 500 historical average: ~10%. We use 8% to be conservative.</p>
        </div>
      </div>

      {/* Result card */}
      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-5 mb-4">
        <p className="text-sm text-emerald-700 mb-1">
          Investing ${monthlyContrib}/mo from age {startAge} to 65 ({result.years} years):
        </p>
        <div className="text-4xl font-black text-emerald-800 mb-3">{fmt(result.fv)}</div>

        {/* Bar breakdown */}
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-0.5">
              <span>Your contributions</span>
              <span>{fmt(result.totalContributed)} ({pct(result.totalContributed, result.fv)}%)</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${pct(result.totalContributed, result.fv)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-0.5">
              <span>Interest earned (free money)</span>
              <span>{fmt(result.interestEarned)} ({pct(result.interestEarned, result.fv)}%)</span>
            </div>
            <div className="h-3 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${pct(result.interestEarned, result.fv)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cost of waiting */}
      {result.years > 10 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
          <p className="font-semibold text-amber-800 mb-1">⏰ Cost of waiting 10 years:</p>
          <p className="text-amber-700">
            If you started at {startAge + 10} instead:{' '}
            <span className="font-bold">{fmt(lateResult.fv)}</span>
          </p>
          <p className="text-amber-700 mt-1">
            Starting now vs. waiting 10 years:{' '}
            <span className="font-black text-amber-900">{fmt(result.fv - lateResult.fv)} difference</span>
          </p>
        </div>
      )}
    </div>
  );
}
