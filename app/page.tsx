import Link from 'next/link';
import { modulesByTier, tierInfo } from '@/data/modules';

const stats = [
  { value: '16', label: 'free lessons' },
  { value: '4', label: 'grade levels' },
  { value: '$0', label: 'forever' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-sm font-semibold px-4 py-2 rounded-full">
          <span>🎮</span> 16 free lessons · Earn XP · No login needed
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
          Learn money.<br />
          <span className="text-emerald-600">Level up for real.</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          The money class your school never taught you.
        </p>

        {/* Grade picker */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <Link
              href="/learn/what-is-money"
              className="bg-emerald-500 text-white font-bold px-4 py-4 rounded-2xl hover:bg-emerald-600 transition-colors text-center shadow-sm"
            >
              🌱 Grades 5–6
              <span className="block text-xs font-normal opacity-80 mt-0.5">What is money?</span>
            </Link>
            <Link
              href="/learn/compound-interest"
              className="bg-blue-500 text-white font-bold px-4 py-4 rounded-2xl hover:bg-blue-600 transition-colors text-center shadow-sm"
            >
              📊 Grades 7–8
              <span className="block text-xs font-normal opacity-80 mt-0.5">How money grows</span>
            </Link>
            <Link
              href="/learn/investing-basics"
              className="bg-violet-500 text-white font-bold px-4 py-4 rounded-2xl hover:bg-violet-600 transition-colors text-center shadow-sm"
            >
              💹 Grades 9–10
              <span className="block text-xs font-normal opacity-80 mt-0.5">Investing & credit</span>
            </Link>
            <Link
              href="/learn/sports-betting-math"
              className="bg-orange-500 text-white font-bold px-4 py-4 rounded-2xl hover:bg-orange-600 transition-colors text-center shadow-sm"
            >
              ⚡ Grades 11–12
              <span className="block text-xs font-normal opacity-80 mt-0.5">The real math</span>
            </Link>
          </div>
          <Link
            href="/learn"
            className="text-sm text-gray-400 hover:text-gray-700 underline underline-offset-2 block text-center"
          >
            or browse all 16 lessons →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 pt-2">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tier previews */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What you&apos;ll learn</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {([1, 2, 3, 4] as const).map((tier) => {
            const info = tierInfo[tier];
            const mods = modulesByTier[tier];
            return (
              <Link
                key={tier}
                href={`/learn#tier-${tier}`}
                className={`${info.bgClass} ${info.borderClass} border rounded-2xl p-5 hover:shadow-md transition-shadow block`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`${info.badgeClass} text-xs font-bold px-2 py-1 rounded-full`}>
                      {info.grades}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2">{info.label}</h3>
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
                    </li>
                  ))}
                  {mods.length > 3 && (
                    <li className="text-xs text-gray-400">+{mods.length - 3} more</li>
                  )}
                </ul>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Interactive preview callout */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-3xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl shrink-0">🎰</div>
          <div className="flex-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Grades 11-12 · Reality Check</span>
            <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2">
              The sports betting math they hide from you
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              The house edge means the longer you play, the more certain your loss becomes. It&apos;s
              not bad luck - it&apos;s math. Our betting simulator shows you exactly what happens to
              your money over time.
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
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Ready to start?</h2>
        <p className="text-gray-600">No login. No email. Just pick your grade level and go.</p>
        <Link
          href="/learn"
          className="inline-block bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-gray-700 transition-colors text-lg"
        >
          Browse All Lessons →
        </Link>
      </section>
    </div>
  );
}
