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
          <span>📚</span> Free for every student, forever
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
          Learn money.<br />
          <span className="text-emerald-600">Build your future.</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed">
          My son couldn&apos;t get into his school&apos;s financial literacy class because of a
          scheduling conflict. So I built this instead. It&apos;s for him, and for every student
          who deserved this class.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/learn"
            className="bg-gray-900 text-white font-bold px-8 py-4 rounded-2xl hover:bg-gray-700 transition-colors text-lg"
          >
            Start Learning - It&apos;s Free
          </Link>
          <Link
            href="/learn#tier-4"
            className="bg-orange-100 text-orange-800 font-bold px-8 py-4 rounded-2xl hover:bg-orange-200 transition-colors text-lg"
          >
            The Reality Check (Grades 11-12) 🎰
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

      {/* Why this exists */}
      <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Why this exists</h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            Financial literacy should be a required class. In most schools, it isn&apos;t. And the gap
            is showing up in ways that concern me: teenagers losing money on sports betting apps,
            putting their savings into volatile crypto on a tip from an influencer, hoping to get
            rich quick because they don&apos;t see another way out.
          </p>
          <p>
            The math behind these things isn&apos;t complicated. It just isn&apos;t being taught.
          </p>
          <p>
            Stack covers the fundamentals - what money is, how compound interest works, what an
            index fund is - and the harder stuff: the actual expected value of a sports bet, why
            the apps are designed the way they are, and what slow, boring wealth-building actually
            looks like over 30 years.
          </p>
          <p className="text-gray-500 italic text-sm">
            No ads. No login. No data collected. Just the curriculum.
          </p>
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
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-3xl p-8 text-center">
        <div className="text-4xl mb-3">🎰</div>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          The sports betting math they hide from you
        </h2>
        <p className="text-gray-700 mb-5 max-w-lg mx-auto text-sm leading-relaxed">
          The house edge means the longer you play, the more certain your loss becomes. It&apos;s
          not bad luck - it&apos;s math. Our betting simulator shows you exactly what happens to
          your money over time.
        </p>
        <Link
          href="/learn/sports-betting-math"
          className="inline-block bg-orange-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors"
        >
          See the math →
        </Link>
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
