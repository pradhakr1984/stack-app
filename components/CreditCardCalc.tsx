'use client';

import { useState, useMemo } from 'react';

export default function CreditCardCalc() {
  const [balance, setBalance] = useState(2000);
  const [apr, setApr] = useState(24);
  const [payment, setPayment] = useState(50);

  const result = useMemo(() => {
    const monthlyRate = apr / 100 / 12;
    const minPayment = Math.max(25, balance * 0.02); // typical min: 2% of balance

    // Calculate months to payoff — always returns an object
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
    if (m === Infinity || m > 600) return 'Never (payment < interest)';
    if (m < 12) return `${m} months`;
    const years = Math.floor(m / 12);
    const months = m % 12;
    return months > 0 ? `${years}y ${months}mo` : `${years} years`;
  };

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="bg-white border border-violet-200 rounded-2xl p-6 my-6 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">💳</span>
        <h3 className="text-lg font-bold text-gray-900">Credit Card Payoff Calculator</h3>
      </div>
      <p className="text-sm text-gray-500 mb-5">
        See how long minimum payments take - and what it actually costs you.
      </p>

      <div className="grid gap-5 mb-6">
        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Balance owed</label>
            <span className="text-sm font-bold text-violet-700">{fmt(balance)}</span>
          </div>
          <input
            type="range" min={100} max={10000} step={100}
            value={balance}
            onChange={e => setBalance(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$100</span><span>$10,000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">APR (interest rate)</label>
            <span className="text-sm font-bold text-violet-700">{apr}%</span>
          </div>
          <input
            type="range" min={8} max={36} step={0.5}
            value={apr}
            onChange={e => setApr(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>8% (good card)</span><span>36% (store card)</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Average U.S. credit card APR in 2024: ~22-24%</p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Your monthly payment</label>
            <span className="text-sm font-bold text-violet-700">{fmt(payment)}/mo</span>
          </div>
          <input
            type="range" min={25} max={Math.max(balance, 500)} step={25}
            value={payment}
            onChange={e => setPayment(Number(e.target.value))}
            className="w-full accent-violet-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>$25</span><span>{fmt(Math.max(balance, 500))}</span>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-xs text-red-600 font-medium mb-2">
            Paying minimum (~{fmt(result.minPayment)}/mo)
          </p>
          <div className="space-y-1">
            <div>
              <span className="text-xs text-gray-500">Time to pay off:</span>
              <div className="text-lg font-bold text-red-700">
                {result.minResult.months === Infinity ? 'Never' : formatMonths(result.minResult.months)}
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500">Total interest paid:</span>
              <div className="text-lg font-bold text-red-700">
                {result.minResult.totalInterest === Infinity ? 'Forever growing' : fmt(result.minResult.totalInterest)}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
          <p className="text-xs text-violet-600 font-medium mb-2">
            Paying {fmt(payment)}/mo
          </p>
          <div className="space-y-1">
            <div>
              <span className="text-xs text-gray-500">Time to pay off:</span>
              <div className="text-lg font-bold text-violet-700">
                {result.userResult.months === Infinity ? 'Never' : formatMonths(result.userResult.months)}
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-500">Total interest paid:</span>
              <div className="text-lg font-bold text-violet-700">
                {result.userResult.totalInterest === Infinity ? 'Forever growing' : fmt(result.userResult.totalInterest)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {result.userResult.months !== Infinity && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-sm">
          <p className="font-semibold text-emerald-800 mb-1">
            Paying {fmt(payment)} vs. the minimum saves you:
          </p>
          {result.minResult.months === Infinity ? (
            <>
              <p className="text-emerald-700 text-lg font-black">
                {fmt(result.userResult.totalInterest)} in interest
              </p>
              <p className="text-emerald-700 text-xs mt-1">
                Minimum payments never pay this off. You do.
              </p>
            </>
          ) : (
            <>
              <p className="text-emerald-700 text-lg font-black">
                {fmt(result.minResult.totalInterest - result.userResult.totalInterest)} in interest
              </p>
              <p className="text-emerald-700 text-xs mt-1">
                And pays it off{' '}
                {formatMonths(result.minResult.months - result.userResult.months)} faster.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
