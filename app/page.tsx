import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';

export default function Home() {
  return (
    <div className="space-y-14">

      {/* Hero */}
      <section className="pt-2 space-y-6">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest">
          <span>⚡</span> 16 Missions · Earn XP · Free Forever
        </div>

        <div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight">
            Level up your<br />
            <span className="text-emerald-500">money game.</span>
          </h1>
          <p className="text-gray-500 mt-3 text-base max-w-xs">
            The skills they forgot to teach in school.
          </p>
        </div>

        {/* GAME LEVEL SELECT */}
        <div className="space-y-2.5 max-w-md">

          {/* Level 1 — Featured hero card */}
          <Link
            href="/learn/what-is-money"
            className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wide">
                      ⚡ Start Here
                    </span>
                  </div>
                  <p className="text-emerald-200 text-[10px] font-black uppercase tracking-[0.15em] mb-1">
                    LEVEL 01 — GRADES 5–6
                  </p>
                  <h3 className="text-white text-2xl font-black leading-tight">Foundation</h3>
                  <p className="text-emerald-100 text-sm mt-1.5">
                    What money is, needs vs. wants, saving, and how banks work.
                  </p>
                </div>
                <span className="text-5xl mt-1 opacity-90">🌱</span>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-[11px] font-black text-emerald-900 bg-white/30 px-2.5 py-1 rounded-lg">
                  4 MISSIONS
                </span>
                <span className="text-[11px] font-black text-yellow-900 bg-yellow-300 px-2.5 py-1 rounded-lg">
                  +200 XP
                </span>
              </div>
            </div>
          </Link>

          {/* Levels 2–4 — Dark game-menu rows */}
          {[
            {
              href: '/learn/compound-interest',
              level: '02',
              grades: '7–8',
              title: 'Building Blocks',
              desc: 'Compound interest, budgeting, credit scores',
              emoji: '📊',
              accent: 'bg-blue-500',
              xp: '+300 XP',
              xpClass: 'text-blue-300',
            },
            {
              href: '/learn/investing-basics',
              level: '03',
              grades: '9–10',
              title: 'Decisions',
              desc: 'Stocks, index funds, credit cards, student loans',
              emoji: '💹',
              accent: 'bg-violet-500',
              xp: '+350 XP',
              xpClass: 'text-violet-300',
            },
            {
              href: '/learn/sports-betting-math',
              level: '04',
              grades: '11–12',
              title: 'Reality Check',
              desc: 'Betting math, crypto, building wealth from zero',
              emoji: '⚡',
              accent: 'bg-orange-500',
              xp: '+400 XP',
              xpClass: 'text-orange-300',
            },
          ].map((card) => (
            <Link
              key={card.level}
              href={card.href}
              className="group flex items-center gap-4 bg-gray-900 rounded-xl px-4 py-4 hover:bg-gray-800 transition-all hover:scale-[1.01]"
            >
              <div className={`w-1 self-stretch rounded-full ${card.accent} shrink-0`} />
              <span className="text-2xl shrink-0">{card.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.15em]">
                  LEVEL {card.level} — GRADES {card.grades}
                </p>
                <p className="text-white font-black text-sm leading-tight">{card.title}</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">{card.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className={`text-[11px] font-black ${card.xpClass}`}>{card.xp}</span>
                <span className="text-gray-600 group-hover:text-gray-300 transition-colors font-black text-sm">→</span>
              </div>
            </Link>
          ))}

          <Link
            href="/learn"
            className="text-xs text-gray-400 hover:text-gray-600 underline underline-offset-2 block text-center pt-1"
          >
            browse all 16 missions →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8 pt-1">
          {[
            { icon: '🎯', value: '16', label: 'missions' },
            { icon: '⭐', value: '1,250', label: 'XP to earn' },
            { icon: '🔓', value: '$0', label: 'forever' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg leading-none">{s.icon}</div>
              <div className="text-xl font-black text-gray-900 mt-1">{s.value}</div>
              <div className="text-xs text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* XP Level ladder */}
      <section className="bg-gray-900 rounded-3xl p-6 text-white">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Your rank progression</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { emoji: '🌱', level: 'Beginner', xp: '0 XP', bg: 'bg-gray-800' },
            { emoji: '💰', level: 'Saver', xp: '200 XP', bg: 'bg-blue-900' },
            { emoji: '📈', level: 'Investor', xp: '500 XP', bg: 'bg-violet-900' },
            { emoji: '🏆', level: 'Money Smart', xp: '800 XP', bg: 'bg-yellow-900' },
          ].map((tier) => (
            <div key={tier.level} className={`${tier.bg} rounded-xl p-3 text-center`}>
              <div className="text-2xl mb-1">{tier.emoji}</div>
              <div className="font-black text-sm leading-tight">{tier.level}</div>
              <div className="text-xs text-gray-400 mt-0.5">{tier.xp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier previews */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">What you&apos;ll unlock</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {([1, 2, 3, 4] as const).map((tier) => {
            const info = tierInfo[tier];
            const mods = modulesByTier[tier];
            return (
              <Link
                key={tier}
                href={`/learn#tier-${tier}`}
                className={`${info.bgClass} ${info.borderClass} border rounded-2xl p-5 hover:shadow-md hover:scale-[1.01] transition-all duration-150 block`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`${info.badgeClass} text-xs font-black px-2 py-1 rounded-full`}>
                      {info.grades}
                    </span>
                    <h3 className="text-lg font-black text-gray-900 mt-2">{info.label}</h3>
                  </div>
                  <span className="text-2xl">
                    {tier === 1 ? '🌱' : tier === 2 ? '📊' : tier === 3 ? '💹' : '⚡'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{info.description}</p>
                <ul className="space-y-1.5">
                  {mods.slice(0, 3).map((m) => (
                    <li key={m.id} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span>{m.emoji}</span>
                      <span className="flex-1">{m.title}</span>
                      <span className="font-black text-yellow-600 shrink-0">+{m.xp} XP</span>
                    </li>
                  ))}
                  {mods.length > 3 && (
                    <li className="text-xs text-gray-400">+{mods.length - 3} more missions</li>
                  )}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Reality Check callout */}
      <section className="bg-gray-900 rounded-3xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl shrink-0">🎰</div>
          <div className="flex-1">
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.15em]">
              Grades 11–12 · Reality Check
            </span>
            <h2 className="text-lg font-black text-white mt-1 mb-2">
              The sports betting math they hide from you
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              The house always wins. It&apos;s not bad luck — it&apos;s math. Our simulator shows
              exactly what happens to your money over time.
            </p>
            <Link
              href="/learn/sports-betting-math"
              className="inline-block bg-orange-500 text-white font-black px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors text-sm"
            >
              See the math →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="space-y-3 pb-4">
        <h2 className="text-2xl font-black text-gray-900">Ready to play?</h2>
        <p className="text-gray-500 text-sm">No login. No email. Pick your level and go.</p>
        <Link
          href="/learn"
          className="inline-block bg-gray-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-gray-700 hover:scale-[1.02] transition-all duration-150 text-lg shadow-md"
        >
          Browse All 16 Missions →
        </Link>
      </section>

    </div>
  );
}
