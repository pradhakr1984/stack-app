import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';

export default function Home() {
  return (
    <div className="space-y-16">

      {/* Hero */}
      <section className="pt-6 space-y-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            16 Missions Live
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] tracking-tight">
            Level up your<br />
            <span className="text-emerald-400">money game.</span>
          </h1>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            The financial skills they forgot to teach in school. Free. No login.
          </p>
        </div>

        {/* ── FORTNITE-STYLE LEVEL SELECT ── */}
        <div className="max-w-md space-y-2">
          <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">Choose your level</p>

          {/* LEVEL 01 — LEGENDARY / Gold featured card */}
          <Link
            href="/learn/what-is-money"
            className="group relative block overflow-hidden rounded-lg border border-yellow-500/30 hover:border-yellow-400/60 transition-all"
          >
            {/* Gold glow bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/25 via-[#131620] to-[#131620]" />
            <div className="relative flex items-start gap-4 px-5 py-5">
              <div className="text-4xl mt-0.5 shrink-0">🌱</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest">⭐ Featured</span>
                  <span className="bg-yellow-400 text-yellow-950 text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase">
                    Start Here
                  </span>
                </div>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Grades 5–6</p>
                <h3 className="text-white text-lg font-bold leading-tight">Foundation</h3>
                <p className="text-gray-500 text-xs mt-0.5">What money is, saving, how banks work</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-yellow-400 text-xl font-bold leading-none">+200</p>
                <p className="text-yellow-600 text-[10px] font-bold">XP</p>
              </div>
            </div>
            {/* Legendary rarity bar */}
            <div className="h-[3px] bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-600" />
          </Link>

          {/* Levels 02–04 — Rare / Epic / Legendary+ rows */}
          {[
            {
              href: '/learn/compound-interest',
              num: '02', grades: '7–8',
              title: 'Building Blocks',
              desc: 'Compound interest · budgeting · credit',
              emoji: '📊',
              rarity: 'bg-blue-500',
              border: 'border-blue-500/20 hover:border-blue-400/40',
              xp: '+300 XP',
              xpColor: 'text-blue-400',
              rarityLabel: 'RARE',
              rarityText: 'text-blue-400',
            },
            {
              href: '/learn/investing-basics',
              num: '03', grades: '9–10',
              title: 'Decisions',
              desc: 'Stocks · index funds · credit cards',
              emoji: '💹',
              rarity: 'bg-violet-500',
              border: 'border-violet-500/20 hover:border-violet-400/40',
              xp: '+350 XP',
              xpColor: 'text-violet-400',
              rarityLabel: 'EPIC',
              rarityText: 'text-violet-400',
            },
            {
              href: '/learn/sports-betting-math',
              num: '04', grades: '11–12',
              title: 'Reality Check',
              desc: 'Betting math · crypto · wealth building',
              emoji: '⚡',
              rarity: 'bg-orange-500',
              border: 'border-orange-500/20 hover:border-orange-400/40',
              xp: '+400 XP',
              xpColor: 'text-orange-400',
              rarityLabel: 'LEGENDARY',
              rarityText: 'text-orange-400',
            },
          ].map((lvl) => (
            <Link
              key={lvl.num}
              href={lvl.href}
              className={`group relative flex items-center gap-3 bg-[#131620] rounded-lg px-4 py-3.5 overflow-hidden border ${lvl.border} transition-all`}
            >
              {/* Left rarity bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${lvl.rarity}`} />
              <span className="text-xl shrink-0 ml-1">{lvl.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className={`text-[9px] font-bold uppercase tracking-widest ${lvl.rarityText}`}>{lvl.rarityLabel}</p>
                  <span className="text-gray-700 text-[9px]">·</span>
                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Grades {lvl.grades}</p>
                </div>
                <p className="text-gray-100 font-bold text-sm leading-tight">{lvl.title}</p>
                <p className="text-gray-600 text-[11px] mt-0.5">{lvl.desc}</p>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-bold ${lvl.xpColor}`}>{lvl.xp}</span>
                <span className="text-gray-700 group-hover:text-gray-400 transition-colors font-bold text-sm ml-2">→</span>
              </div>
            </Link>
          ))}

          <Link
            href="/learn"
            className="text-[11px] text-gray-700 hover:text-gray-500 transition-colors block text-center pt-1"
          >
            browse all 16 missions →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-10">
          {[
            { icon: '🎯', value: '16', label: 'missions' },
            { icon: '⭐', value: '1,250', label: 'XP total' },
            { icon: '🔓', value: '$0', label: 'always free' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg">{s.icon}</div>
              <div className="text-xl font-bold text-white mt-1">{s.value}</div>
              <div className="text-[11px] text-gray-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Rank progression — Battle Pass style */}
      <section className="bg-[#131620] border border-white/5 rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Rank Progression</p>
          <p className="text-gray-700 text-[10px] font-bold uppercase tracking-widest">1,250 XP max</p>
        </div>
        <div className="grid grid-cols-4 divide-x divide-white/5">
          {[
            { emoji: '🌱', rank: 'Beginner', xp: '0 XP', color: 'text-gray-400', bar: 'bg-gray-600' },
            { emoji: '💰', rank: 'Saver', xp: '200 XP', color: 'text-blue-400', bar: 'bg-blue-500' },
            { emoji: '📈', rank: 'Investor', xp: '500 XP', color: 'text-violet-400', bar: 'bg-violet-500' },
            { emoji: '🏆', rank: 'Money Smart', xp: '800 XP', color: 'text-yellow-400', bar: 'bg-yellow-500' },
          ].map((tier) => (
            <div key={tier.rank} className="p-4 text-center relative">
              <div className={`absolute bottom-0 left-2 right-2 h-[2px] rounded-full ${tier.bar} opacity-60`} />
              <div className="text-2xl mb-1.5">{tier.emoji}</div>
              <div className={`font-bold text-[11px] leading-tight ${tier.color}`}>{tier.rank}</div>
              <div className="text-gray-700 text-[10px] mt-0.5">{tier.xp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission previews */}
      <section>
        <h2 className="text-lg font-bold text-white mb-4">All mission packs</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {([1, 2, 3, 4] as const).map((tier) => {
            const info = tierInfo[tier];
            const mods = modulesByTier[tier];
            const colors = [
              { border: 'border-yellow-500/20', label: 'text-yellow-400', bar: 'bg-yellow-500' },
              { border: 'border-blue-500/20', label: 'text-blue-400', bar: 'bg-blue-500' },
              { border: 'border-violet-500/20', label: 'text-violet-400', bar: 'bg-violet-500' },
              { border: 'border-orange-500/20', label: 'text-orange-400', bar: 'bg-orange-500' },
            ];
            const c = colors[tier - 1];
            return (
              <Link
                key={tier}
                href={`/learn#tier-${tier}`}
                className={`bg-[#131620] border ${c.border} rounded-lg p-5 hover:bg-white/[0.02] transition-colors block`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`${c.label} text-[9px] font-bold uppercase tracking-[0.2em]`}>
                      {info.grades}
                    </span>
                    <h3 className="text-white font-bold text-sm mt-1">{info.label}</h3>
                  </div>
                  <span className="text-xl">
                    {tier === 1 ? '🌱' : tier === 2 ? '📊' : tier === 3 ? '💹' : '⚡'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mb-4 leading-relaxed">{info.description}</p>
                <ul className="space-y-2">
                  {mods.slice(0, 3).map((m) => (
                    <li key={m.id} className="flex items-center gap-2">
                      <span className="text-xs">{m.emoji}</span>
                      <span className="text-gray-500 text-xs flex-1 truncate">{m.title}</span>
                      <span className={`text-[10px] font-bold ${c.label} shrink-0`}>+{m.xp}</span>
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

      {/* Reality Check — dark alert callout */}
      <section className="bg-[#131620] border border-orange-500/20 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl shrink-0">🎰</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-400 text-[9px] font-bold uppercase tracking-[0.2em]">Reality Check</span>
              <span className="bg-orange-500/20 text-orange-400 text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-orange-500/30">LEGENDARY</span>
            </div>
            <h2 className="text-white font-bold text-base mb-2">
              The sports betting math they hide from you
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              The house always wins — it&apos;s not luck, it&apos;s math. Try the simulator.
            </p>
            <Link
              href="/learn/sports-betting-math"
              className="inline-block bg-orange-500 text-white font-bold px-4 py-2 rounded-md hover:bg-orange-400 transition-colors text-sm"
            >
              See the math →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-3 pb-4">
        <h2 className="text-lg font-bold text-white">Ready to play?</h2>
        <p className="text-gray-600 text-sm">No login. No email. Pick your level and go.</p>
        <Link
          href="/learn"
          className="inline-block bg-white text-gray-900 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors text-sm"
        >
          Browse All 16 Missions →
        </Link>
      </section>

    </div>
  );
}
