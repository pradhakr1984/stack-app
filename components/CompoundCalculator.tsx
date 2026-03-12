'use client';

import { useState, useMemo } from 'react';

export default function CompoundCalculator() {
  const [monthlyContrib, setMonthlyContrib] = useState(10);
  const [startAge, setStartAge] = useState(10);
  const [rate, setRate] = useState(8);
  const [endAge] = useState(65);

  const result = useMemo(() => {
    const years = endAge - startAge;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const fv = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalContributed = monthlyContrib * months;
    const interestEarned = fv - totalContributed;
    return { fv, totalContributed, interestEarned, years };
  }, [monthlyContrib, startAge, rate]);

  const lateResult = useMemo(() => {
    const years = Math.max(0, endAge - (startAge + 10));
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    const fv = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return { fv, years };
  }, [monthlyContrib, startAge, rate]);

  // Near-term milestone: what you'd have in 10 years
  const milestoneResult = useMemo(() => {
    const milestoneYears = 10;
    const monthlyRate = rate / 100 / 12;
    const months = milestoneYears * 12;
    const fv = monthlyContrib * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    return { fv, targetAge: startAge + milestoneYears };
  }, [monthlyContrib, startAge, rate]);

  const fmt = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(2)}M` : `$${Math.round(n).toLocaleString()}`;
  const pct = (part: number, total: number) => (total > 0 ? Math.round((part / total) * 100) : 0);

  return (
    <div className="bg-[#131620] border border-white/5 rounded-lg p-5 my-2">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xl">📊</span>
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Compound Interest Calculator</p>
      </div>

      <div className="grid gap-5 mb-5">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Monthly savings</label>
            <span className="text-xs font-bold text-emerald-400">${monthlyContrib}/mo</span>
          </div>
          <input type="range" min={10} max={1000} step={10} value={monthlyContrib}
            onChange={e => setMonthlyContrib(Number(e.target.value))}
            className="w-full accent-emerald-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5">
            <span>$10</span><span>$1,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Start saving at age</label>
            <span className="text-xs font-bold text-emerald-400">{startAge} years old</span>
          </div>
          <input type="range" min={10} max={40} step={1} value={startAge}
            onChange={e => setStartAge(Number(e.target.value))}
            className="w-full accent-emerald-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5">
            <span>10</span><span>40</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Annual growth rate</label>
            <span className="text-xs font-bold text-emerald-400">{rate}%</span>
          </div>
          <input type="range" min={1} max={12} step={0.5} value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="w-full accent-emerald-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5">
            <span>1% (savings)</span><span>12% (aggressive)</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">S&P 500 historical avg: ~10%. We use 8% to be conservative.</p>
        </div>
      </div>

      {/* Result */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-5 mb-3">
        <p className="text-emerald-400 text-xs mb-1">
          ${monthlyContrib}/mo from age {startAge} to 65 ({result.years} years):
        </p>
        <div className="text-4xl font-bold text-white mb-2">{fmt(result.fv)}</div>

        {/* Near-term milestone — makes it tangible for younger users */}
        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-gray-600 text-xs">→</span>
          <p className="text-gray-500 text-xs">
            In 10 years (age {milestoneResult.targetAge}): <span className="text-gray-300 font-bold">{fmt(milestoneResult.fv)}</span>
          </p>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>Your contributions</span>
              <span>{fmt(result.totalContributed)} ({pct(result.totalContributed, result.fv)}%)</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${pct(result.totalContributed, result.fv)}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>Interest earned (free money)</span>
              <span>{fmt(result.interestEarned)} ({pct(result.interestEarned, result.fv)}%)</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${pct(result.interestEarned, result.fv)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {result.years > 10 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-xs">
          <p className="font-bold text-amber-300 mb-1">⏰ Cost of waiting 10 years:</p>
          <p className="text-gray-400">
            Start at {startAge + 10} instead: <span className="font-bold text-white">{fmt(lateResult.fv)}</span>
          </p>
          <p className="text-gray-400 mt-1">
            Difference: <span className="font-bold text-amber-300">{fmt(result.fv - lateResult.fv)}</span>
          </p>
        </div>
      )}
    </div>
  );
}
