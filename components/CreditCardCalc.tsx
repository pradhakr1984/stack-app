'use client';

import { useState, useMemo } from 'react';

export default function CreditCardCalc() {
  const [balance, setBalance] = useState(2000);
  const [apr, setApr] = useState(24);
  const [payment, setPayment] = useState(50);

  const result = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    const minPayment = Math.max(25, balance * 0.02);

    const calcMonths = (pmt: number) => {
      if (pmt <= balance * monthlyRate) return { months: Infinity, totalInterest: Infinity };
      let bal = balance;
      let months = 0;
      let totalInterest = 0;
      while (bal > 0.01 && months < 600) {
        const interestCharge = bal * monthlyRate;
        totalInterest += interestCharge;
        bal = bal + interestCharge - pmt;
        if (bal < 0) bal = 0;
        months++;
      }
      return { months, totalInterest };
    };

    const minResult = calcMonths(minPayment);
    const userResult = calcMonths(payment);
    return { minPayment, minResult, userResult, monthlyRate };
  }, [balance, apr, payment]);

  const formatMonths = (m: number) => {
    if (m === Infinity || m > 600) return 'Never';
    if (m < 12) return `${m} months`;
    const years = Math.floor(m / 12);
    const months = m % 12;
    return months > 0 ? `${years}y ${months}mo` : `${years} years`;
  };

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="bg-[#131620] border border-violet-500/20 rounded-lg p-5 my-2">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">💳</span>
        <p className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em]">Credit Card Payoff Calculator</p>
      </div>
      <p className="text-xs text-gray-600 mb-5">
        See how long minimum payments take — and what they actually cost you.
      </p>

      <div className="grid gap-5 mb-5">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Balance owed</label>
            <span className="text-xs font-bold text-violet-400">{fmt(balance)}</span>
          </div>
          <input type="range" min={100} max={10000} step={100} value={balance}
            onChange={e => setBalance(Number(e.target.value))}
            className="w-full accent-violet-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5"><span>$100</span><span>$10,000</span></div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">APR (interest rate)</label>
            <span className="text-xs font-bold text-violet-400">{apr}%</span>
          </div>
          <input type="range" min={8} max={36} step={0.5} value={apr}
            onChange={e => setApr(Number(e.target.value))}
            className="w-full accent-violet-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5">
            <span>8% (good card)</span><span>36% (store card)</span>
          </div>
          <p className="text-[10px] text-gray-600 mt-1">Average U.S. credit card APR in 2024: ~22–24%</p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-xs font-bold text-gray-400">Your monthly payment</label>
            <span className="text-xs font-bold text-violet-400">{fmt(payment)}/mo</span>
          </div>
          <input type="range" min={25} max={Math.max(balance, 500)} step={25} value={payment}
            onChange={e => setPayment(Number(e.target.value))}
            className="w-full accent-violet-500" />
          <div className="flex justify-between text-[10px] text-gray-700 mt-0.5">
            <span>$25</span><span>{fmt(Math.max(balance, 500))}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">
            Minimum (~{fmt(result.minPayment)}/mo)
          </p>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-gray-600">Time to pay off</p>
              <p className="text-lg font-bold text-red-300">{formatMonths(result.minResult.months)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600">Total interest paid</p>
              <p className="text-lg font-bold text-red-300">
                {result.minResult.totalInterest === Infinity ? 'Forever growing' : fmt(result.minResult.totalInterest)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-4">
          <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
            Paying {fmt(payment)}/mo
          </p>
          <div className="space-y-2">
            <div>
              <p className="text-[10px] text-gray-600">Time to pay off</p>
              <p className="text-lg font-bold text-violet-300">
                {result.userResult.months === Infinity ? 'Never' : formatMonths(result.userResult.months)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600">Total interest paid</p>
              <p className="text-lg font-bold text-violet-300">
                {result.userResult.totalInterest === Infinity ? 'Forever growing' : fmt(result.userResult.totalInterest)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {result.userResult.months !== Infinity && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 text-xs">
          <p className="font-bold text-emerald-300 mb-1">
            Paying {fmt(payment)} vs. minimum saves you:
          </p>
          {result.minResult.months === Infinity ? (
            <>
              <p className="text-emerald-300 text-lg font-bold">{fmt(result.userResult.totalInterest)} in interest</p>
              <p className="text-gray-600 mt-1">Minimum payments never pay this off. You do.</p>
            </>
          ) : (
            <>
              <p className="text-emerald-300 text-lg font-bold">
                {fmt(result.minResult.totalInterest - result.userResult.totalInterest)} in interest
              </p>
              <p className="text-gray-600 mt-1">
                And pays it off {formatMonths(result.minResult.months - result.userResult.months)} faster.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
