import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';

export default function Home() {
  return (
    <div className="space-y-14">

      {/* Hero */}
      <section className="pt-4 space-y-8">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold px-3 py-1.5 rounded border border-emerald-500/20 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> 16 missions live
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Level up your<br />
            <span className="text-emerald-400">money game.</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xs leading-relaxed">
            The financial skills they forgot to teach in school.
          </p>
        </div>

        {/* GAME LEVEL SELECT — single unified dark panel */}
        <div className="max-w-md">
          <div className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden">

            {/* Panel header */}
            <div className="px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">Select level</p>
              <p className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">1,250 XP total</p>
            </div>

            {/* LEVEL 01 — featured, green border */}
            <Link
              href="/learn/what-is-money"
              className="group flex items-center gap-4 px-4 py-4 border-b border-gray-800 border-l-2 border-l-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">
                  Level 01 — Grades 5–6
                </p>
                <p className="text-white font-bold text-base leading-tight">Foundation</p>
                <p className="text-gray-500 text-xs mt-0.5">What money is, saving, how banks work</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="bg-yellow-400 text-yellow-950 text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                  Start here
                </span>
                <span className="text-emerald-400 font-bold text-sm group-hover:translate-x-0.5 transition-transform">
                  +200 XP →
                </span>
              </div>
            </Link>

            {/* Levels 02-04 */}
            {[
              {
                href: '/learn/compound-interest',
                num: '02', grades: '7–8',
                title: 'Building Blocks',
                desc: 'Compound interest, budgets, credit scores',
                accent: 'bg-blue-500',
                xp: '+300 XP',
                xpColor: 'text-blue-400',
                emoji: '📊',
              },
              {
                href: '/learn/investing-basics',
                num: '03', grades: '9–10',
                title: 'Decisions',
                desc: 'Stocks, index funds, credit cards',
                accent: 'bg-violet-500',
                xp: '+350 XP',
                xpColor: 'text-violet-400',
                emoji: '💹',
              },
              {
                href: '/learn/sports-betting-math',
                num: '04', grades: '11–12',
                title: 'Reality Check',
                desc: 'Betting math, crypto, building wealth',
                accent: 'bg-orange-500',
                xp: '+400 XP',
                xpColor: 'text-orange-400',
                emoji: '⚡',
              },
            ].map((lvl) => (
              <Link
                key={lvl.num}
                href={lvl.href}
                className="group flex items-center gap-3 px-4 py-3.5 border-b border-gray-800 last:border-b-0 hover:bg-white/[0.03] transition-colors"
              >
                <div className={`w-0.5 h-7 rounded-full ${lvl.accent} shrink-0`} />
                <span className="text-xl shrink-0">{lvl.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.12em]">
                    Level {lvl.num} — Grades {lvl.grades}
                  </p>
                  <p className="text-gray-200 font-bold text-sm leading-tight">{lvl.title}</p>
                </div>
                <span className={`text-[11px] font-bold ${lvl.xpColor} shrink-0`}>{lvl.xp}</span>
                <span className="text-gray-700 group-hover:text-gray-400 transition-colors font-bold text-sm ml-0.5 shrink-0">→</span>
              </Link>
            ))}

          </div>

          <Link
            href="/learn"
            className="text-xs text-gray-700 hover:text-gray-400 transition-colors block text-center mt-3"
          >
            browse all 16 missions →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8">
          {[
            { icon: '🎯', value: '16', label: 'missions' },
            { icon: '⭐', value: '1,250', label: 'XP total' },
            { icon: '🔓', value: '$0', label: 'forever' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg leading-none">{s.icon}</div>
              <div className="text-xl font-bold text-white mt-1">{s.value}</div>
              <div className="text-xs text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* XP Rank ladder */}
      <section className="bg-[#141414] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 py-2.5 border-b border-gray-800">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">Rank progression</p>
        </div>
        <div className="grid grid-cols-4 divide-x divide-gray-800">
          {[
            { emoji: '🌱', level: 'Beginner', xp: '0 XP', color: 'text-gray-400' },
            { emoji: '💰', level: 'Saver', xp: '200 XP', color: 'text-blue-400' },
            { emoji: '📈', level: 'Investor', xp: '500 XP', color: 'text-violet-400' },
            { emoji: '🏆', level: 'Money Smart', xp: '800 XP', color: 'text-yellow-400' },
          ].map((tier) => (
            <div key={tier.level} className="p-4 text-center">
              <div className="text-2xl mb-1.5">{tier.emoji}</div>
              <div className={`font-bold text-xs leading-tight ${tier.color}`}>{tier.level}</div>
              <div className="text-gray-700 text-[10px] mt-0.5">{tier.xp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier previews */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">What you&apos;ll unlock</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {([1, 2, 3, 4] as const).map((tier) => {
            const info = tierInfo[tier];
            const mods = modulesByTier[tier];
            const accentColors = ['border-emerald-800', 'border-blue-800', 'border-violet-800', 'border-orange-800'];
            const labelColors = ['text-emerald-400', 'text-blue-400', 'text-violet-400', 'text-orange-400'];
            return (
              <Link
                key={tier}
                href={`/learn#tier-${tier}`}
                className={`bg-[#141414] border ${accentColors[tier - 1]} rounded-xl p-5 hover:bg-white/[0.03] transition-colors block`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`${labelColors[tier - 1]} text-[10px] font-bold uppercase tracking-widest`}>
                      {info.grades}
                    </span>
                    <h3 className="text-white font-bold text-base mt-1">{info.label}</h3>
                  </div>
                  <span className="text-2xl">
                    {tier === 1 ? '🌱' : tier === 2 ? '📊' : tier === 3 ? '💹' : '⚡'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 leading-relaxed">{info.description}</p>
                <ul className="space-y-1.5 border-t border-gray-800 pt-3">
                  {mods.slice(0, 3).map((m) => (
                    <li key={m.id} className="flex items-center gap-2">
                      <span className="text-xs">{m.emoji}</span>
                      <span className="text-gray-400 text-xs flex-1">{m.title}</span>
                      <span className={`text-[10px] font-bold ${labelColors[tier - 1]}`}>+{m.xp}</span>
                    </li>
                  ))}
                  {mods.length > 3 && (
                    <li className="text-gray-700 text-xs">+{mods.length - 3} more</li>
                  )}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Reality Check callout */}
      <section className="bg-[#141414] border border-orange-900/50 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl shrink-0">🎰</div>
          <div className="flex-1">
            <span className="text-orange-400 text-[10px] font-bold uppercase tracking-[0.15em]">
              Grades 11–12 · Reality Check
            </span>
            <h2 className="text-white font-bold text-base mt-1 mb-2">
              The sports betting math they hide from you
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              The house always wins. It&apos;s not bad luck — it&apos;s math. Our simulator shows
              exactly what happens to your money over 100 bets.
            </p>
            <Link
              href="/learn/sports-betting-math"
              className="inline-block bg-orange-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-orange-400 transition-colors text-sm"
            >
              See the math →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-3 pb-4">
        <h2 className="text-xl font-bold text-white">Ready to play?</h2>
        <p className="text-gray-600 text-sm">No login. No email. Pick your level and go.</p>
        <Link
          href="/learn"
          className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          Browse All 16 Missions →
        </Link>
      </section>

    </div>
  );
}
