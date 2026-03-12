import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="text-center space-y-5 pt-2">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-black px-4 py-2 rounded-full tracking-wide uppercase">
          <span>⚡</span> 16 Missions · Earn XP · Free Forever
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 leading-tight tracking-tight">
          Level up your<br />
          <span className="text-emerald-500">money game.</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-sm mx-auto">
          The skills they forgot to teach in school.
        </p>

        {/* Grade mission cards */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">

            {/* Grade 5-6 — START HERE badge */}
            <Link
              href="/learn/what-is-money"
              className="relative bg-emerald-500 text-white font-black px-4 py-5 rounded-2xl hover:bg-emerald-600 hover:scale-105 transition-all duration-150 text-center shadow-md group"
            >
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow">
                START HERE
              </span>
              <div className="text-3xl mb-1">🌱</div>
              <div className="text-sm">Grades 5–6</div>
              <div className="text-xs font-semibold opacity-75 mt-0.5">What is money?</div>
            </Link>

            {/* Grade 7-8 */}
            <Link
              href="/learn/compound-interest"
              className="bg-blue-500 text-white font-black px-4 py-5 rounded-2xl hover:bg-blue-600 hover:scale-105 transition-all duration-150 text-center shadow-md"
            >
              <div className="text-3xl mb-1">📊</div>
              <div className="text-sm">Grades 7–8</div>
              <div className="text-xs font-semibold opacity-75 mt-0.5">How money grows</div>
            </Link>

            {/* Grade 9-10 */}
            <Link
              href="/learn/investing-basics"
              className="bg-violet-500 text-white font-black px-4 py-5 rounded-2xl hover:bg-violet-600 hover:scale-105 transition-all duration-150 text-center shadow-md"
            >
              <div className="text-3xl mb-1">💹</div>
              <div className="text-sm">Grades 9–10</div>
              <div className="text-xs font-semibold opacity-75 mt-0.5">Investing & credit</div>
            </Link>

            {/* Grade 11-12 */}
            <Link
              href="/learn/sports-betting-math"
              className="bg-orange-500 text-white font-black px-4 py-5 rounded-2xl hover:bg-orange-600 hover:scale-105 transition-all duration-150 text-center shadow-md"
            >
              <div className="text-3xl mb-1">⚡</div>
              <div className="text-sm">Grades 11–12</div>
              <div className="text-xs font-semibold opacity-75 mt-0.5">The real math</div>
            </Link>
          </div>

          <Link
            href="/learn"
            className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 block text-center"
          >
            or browse all 16 missions →
          </Link>
        </div>

        {/* XP / achievement stats */}
        <div className="flex justify-center gap-8 pt-2">
          {[
            { value: '16', label: 'missions', icon: '🎯' },
            { value: '1000', label: 'XP to earn', icon: '⭐' },
            { value: '$0', label: 'forever', icon: '🔓' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-lg">{s.icon}</div>
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* XP Level ladder */}
      <section className="bg-gray-900 rounded-3xl p-6 text-white">
        <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Your level path</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { emoji: '🌱', level: 'Beginner', xp: '0 XP', color: 'bg-gray-700' },
            { emoji: '💰', level: 'Saver', xp: '200 XP', color: 'bg-blue-800' },
            { emoji: '📈', level: 'Investor', xp: '500 XP', color: 'bg-violet-800' },
            { emoji: '🏆', level: 'Money Smart', xp: '800 XP', color: 'bg-yellow-700' },
          ].map((tier) => (
            <div key={tier.level} className={`${tier.color} rounded-xl p-3 text-center`}>
              <div className="text-2xl mb-1">{tier.emoji}</div>
              <div className="font-black text-sm">{tier.level}</div>
              <div className="text-xs text-gray-300 mt-0.5">{tier.xp}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier previews */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-4">What you&apos;ll unlock</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {([1, 2, 3, 4] as const).map((tier) => {
            const info = tierInfo[tier];
            const mods = modulesByTier[tier];
            return (
              <Link
                key={tier}
                href={`/learn#tier-${tier}`}
                className={`${info.bgClass} ${info.borderClass} border rounded-2xl p-5 hover:shadow-md hover:scale-[1.02] transition-all duration-150 block`}
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
                <ul className="space-y-1">
                  {mods.slice(0, 3).map((m) => (
                    <li key={m.id} className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span>{m.emoji}</span>
                      <span>{m.title}</span>
                      <span className="ml-auto font-bold text-yellow-600">+{m.xp} XP</span>
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
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl shrink-0">🎰</div>
          <div className="flex-1">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wide">Grades 11-12 · Reality Check</span>
            <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2">
              The sports betting math they hide from you
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The house always wins. It&apos;s not bad luck — it&apos;s math. Our simulator shows
              exactly what happens to your money over time.
            </p>
            <Link
              href="/learn/sports-betting-math"
              className="inline-block bg-orange-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-orange-700 transition-colors text-sm"
            >
              See the math →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 pb-4">
        <h2 className="text-2xl font-black text-gray-900">Ready to play?</h2>
        <p className="text-gray-500 text-sm">No login. No email. Pick your level and go.</p>
        <Link
          href="/learn"
          className="inline-block bg-gray-900 text-white font-black px-8 py-4 rounded-2xl hover:bg-gray-700 hover:scale-105 transition-all duration-150 text-lg shadow-md"
        >
          Browse All 16 Missions →
        </Link>
      </section>
    </div>
  );
}
