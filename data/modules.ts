export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ScenarioChoice = {
  label: string;
  description: string;
  outcome1yr: string;
  outcome10yr: string;
  emoji: string;
  xpBonus: number;
};

export type Scenario = {
  type: 'scenario';
  prompt: string;
  setup: string;
  choices: ScenarioChoice[];
};

export type Calculator = {
  type: 'compound' | 'betting' | 'creditcard';
};

export type ModuleSection = {
  type: 'lesson' | 'quiz' | 'scenario' | 'calculator';
  title?: string;
  content?: string;       // markdown-ish text
  quiz?: QuizQuestion;
  scenario?: Scenario;
  calculator?: Calculator;
};

export type Module = {
  id: string;
  tier: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  emoji: string;
  xp: number;
  readTime: string;
  takeaway: string;
  sections: ModuleSection[];
};

// ─────────────────────────────────────────────
// TIER 1 - FOUNDATION (Grades 5-6)
// ─────────────────────────────────────────────

const tier1Modules: Module[] = [
  {
    id: 'what-is-money',
    tier: 1,
    title: 'What Is Money, Really?',
    subtitle: 'Where it comes from and why it matters',
    emoji: '💵',
    xp: 50,
    readTime: '4 min',
    takeaway: 'Money is a tool for exchanging value - it only works because everyone agrees it does.',
    sections: [
      {
        type: 'lesson',
        content: `Before money existed, people traded directly. If you had chickens and needed shoes, you had to find a shoemaker who wanted chickens. This is called **barter** - and it was exhausting.

Money solved this. Instead of trading chickens for shoes, you sell the chickens for money, then use that money to buy shoes. The shoemaker doesn't need to want your chickens.

**Money is just an agreement.** A dollar bill is a piece of paper. It only has value because the U.S. government says it does, and because millions of people trust that. If that trust disappeared, the paper would be worthless.

This has actually happened throughout history. In 1923, Germany's currency collapsed so badly that people needed wheelbarrows of cash to buy a loaf of bread. The paper didn't change - the trust did.

**Where does money come from?**

Most people think about earning money - getting paid for work. But here's what's interesting: your time and skills have value. When you mow a lawn, babysit, or eventually get a job, you're trading your time for money. The person paying you thinks your time is worth more to them than keeping that money.

**Why this matters for you:**
Your first dollars are the most important. Not because they're worth the most - they're not. But because the habits you build with small amounts of money are the same habits you'll have when the amounts get bigger.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Why does a dollar bill have value?',
          options: [
            "Because it's made of special paper",
            "Because the government and everyone using it agrees it does",
            'Because it has gold backing it up',
            'Because banks created it',
          ],
          correctIndex: 1,
          explanation: "The U.S. went off the gold standard in 1971. A dollar has value because of collective trust - that's actually what makes all modern money work.",
        },
      },
      {
        type: 'quiz',
        quiz: {
          question: "When you get paid $15 for mowing a lawn, what are you actually trading?",
          options: [
            'Your lawn mower',
            'Your time and physical effort',
            'Permission to use the lawn',
            'Grass cuttings',
          ],
          correctIndex: 1,
          explanation: "All income is fundamentally an exchange of your time and skills. This is why building skills that are worth more per hour is one of the most valuable things you can do.",
        },
      },
    ],
  },
  {
    id: 'needs-vs-wants',
    tier: 1,
    title: 'Needs vs. Wants',
    subtitle: 'The most important money decision you make every day',
    emoji: '🍕',
    xp: 50,
    readTime: '5 min',
    takeaway: 'Every dollar spent on a want is a dollar that can\'t build your future - choose wants deliberately.',
    sections: [
      {
        type: 'lesson',
        content: `Here's a question: Is a phone a need or a want?

The honest answer is: it depends. A basic phone for safety and communication? Could be a need. The newest iPhone with every accessory? Almost certainly a want.

This is the tricky part about needs vs. wants. They're not always obvious.

**Needs** are things you genuinely can't function without:
- Food (basic nutrition, not fancy restaurants)
- Shelter (a safe place to sleep)
- Clothing (weather-appropriate, not fashion)
- Healthcare
- Transportation to work or school

**Wants** are everything that makes life more comfortable, enjoyable, or interesting - and there's nothing wrong with wants. Life would be pretty miserable without them. But they need to come *after* the needs are covered.

**The sneaky wants:**
The hardest ones aren't the obvious luxuries - they're the things that feel like needs but aren't:
- The most expensive phone plan when a cheaper one would work
- Brand name everything when store brand is identical
- Eating out when you could cook

**Why this matters:**
Every dollar you spend on a want in your teenage years is a dollar that could be invested and worth $10-30 by the time you retire. That's not a reason to never enjoy anything. It's a reason to be *deliberate* about which wants you choose - and to make sure you're choosing them, not just letting them happen.`,
      },
      {
        type: 'scenario',
        scenario: {
          type: 'scenario',
          prompt: "You just got $200 for your birthday. What do you do?",
          setup: "You have $200 cash, no immediate expenses. Here are your options:",
          choices: [
            {
              label: 'Save it all',
              description: 'Put it in a savings account and leave it there',
              outcome1yr: '$207 (3.5% savings rate). Not exciting, but it\'s still there.',
              outcome10yr: '$282 with 3.5% annual interest. Not transformative, but a $82 bonus for doing nothing.',
              emoji: '🏦',
              xpBonus: 30,
            },
            {
              label: 'Invest $150, keep $50',
              description: 'Put most of it in an index fund, keep some for fun',
              outcome1yr: 'Index fund: ~$163 (assumes 8% average). Plus you enjoyed $50.',
              outcome10yr: 'Index fund grows to ~$324. Total value: ~$374 with the $50 you enjoyed.',
              emoji: '📈',
              xpBonus: 40,
            },
            {
              label: 'Spend it all',
              description: 'You deserve it - buy what you want',
              outcome1yr: '$0. You bought things that are now used or forgotten.',
              outcome10yr: '$0, plus the opportunity cost. If invested at 8%, that $200 would be $432.',
              emoji: '🛍️',
              xpBonus: 0,
            },
            {
              label: 'Buy crypto',
              description: 'Put it all in a cryptocurrency',
              outcome1yr: 'Could be $0. Could be $400. No one knows. Crypto can drop 80% in weeks.',
              outcome10yr: 'Still no one knows. Bitcoin\'s best 10-year return was extraordinary. Its worst? Complete loss.',
              emoji: '🎰',
              xpBonus: 5,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'saving-basics',
    tier: 1,
    title: 'Saving: The First Habit',
    subtitle: 'Why starting now beats starting later every time',
    emoji: '🐷',
    xp: 60,
    readTime: '5 min',
    takeaway: 'The single most powerful thing in personal finance is time. Starting at 12 beats starting at 22 every time.',
    sections: [
      {
        type: 'lesson',
        content: `There's a simple rule that most adults wish someone had told them when they were your age:

**Pay yourself first.**

That means before you spend any money - before buying anything fun or even anything necessary - you set aside a percentage for saving. Most financial advisors say 10-20%. For a 12-year-old, even $5 per week counts.

Why? Because of something called **compound interest** - which you'll learn in detail in the next module. For now, here's the short version:

Money earns interest. That interest earns more interest. Over time, this creates a snowball effect that becomes genuinely life-changing if you start young.

**The $10/week experiment:**

Imagine you save $10 every week starting today. You don't spend it. You put it in an account that earns 7% per year (a reasonable long-term investment return).

- At 10 years: ~$7,500
- At 20 years: ~$27,000
- At 30 years: ~$73,000
- At 40 years: ~$170,000

From $10 per week. That's $520 per year. Most of that $170,000 is just... time.

**What gets in the way:**

The reason most people don't save isn't that they can't afford to. It's that saving feels like deprivation while spending feels good right now. Our brains are wired for the immediate reward.

The trick is to make saving automatic. Pay yourself first. Set the money aside before you decide what to spend, not after.`,
      },
      {
        type: 'calculator',
        calculator: { type: 'compound' },
      },
      {
        type: 'quiz',
        quiz: {
          question: '"Pay yourself first" means:',
          options: [
            'Buy yourself something nice before paying bills',
            'Set savings aside before deciding what to spend on anything else',
            'Keep all your money in cash',
            'Only spend money you earned yourself',
          ],
          correctIndex: 1,
          explanation: "Automating savings before spending is the single most reliable way to actually save. If the money never hits your spending account, you won't miss it.",
        },
      },
    ],
  },
  {
    id: 'how-banks-work',
    tier: 1,
    title: 'How Banks Actually Work',
    subtitle: 'Checking, savings, and why they pay you to keep money there',
    emoji: '🏦',
    xp: 50,
    readTime: '4 min',
    takeaway: 'A bank pays you interest because it loans your money to other people - know the difference between account types.',
    sections: [
      {
        type: 'lesson',
        content: `Here's something many adults don't fully understand: when you put money in a bank, the bank doesn't just hold it for you. **The bank loans most of it out to other customers.**

That's why banks pay you interest - they're renting your money. And it's why there's always a small chance (though very rare in the U.S.) that if everyone tried to take their money out at once, the bank couldn't cover it. This is called a "bank run" - you've probably seen it in movies.

**Checking accounts:**
- For everyday spending
- Usually pays little or no interest
- Money is instantly accessible
- Often comes with a debit card
- No penalties for moving money in and out

**Savings accounts:**
- For money you're setting aside
- Pays higher interest than checking (currently 4-5% at many online banks)
- Usually fine to move money, but designed to encourage keeping it there
- Best for your emergency fund and medium-term goals

**The key number: APY (Annual Percentage Yield)**
This is the actual interest rate you earn per year. Online banks often offer 4-5x higher rates than traditional big banks. The difference on $1,000:
- Big bank savings: ~$1/year (0.1% APY)
- Online bank savings: ~$40-50/year (4-5% APY)

Small on $1,000. Significant on $10,000. Very significant on $100,000.

**Are your deposits safe?**
Yes - up to $250,000 per account is federally insured by the FDIC. If a bank fails, you get your money back. This insurance is why keeping money in a bank is safer than keeping it in cash at home (which can be stolen or destroyed).`,
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Why does a savings account pay more interest than a checking account?',
          options: [
            "Savings accounts are harder to open",
            "The bank uses savings deposits to make longer-term loans, so it can afford to pay more",
            'Checking accounts are for businesses only',
            'There is no difference - they pay the same',
          ],
          correctIndex: 1,
          explanation: "Banks make money by lending out deposits at higher rates than they pay savers. Since savings accounts are more stable (people don't move the money as often), banks can make longer commitments with that money and share more of the profit.",
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// TIER 4 - REALITY CHECK (Grades 11-12)
// ─────────────────────────────────────────────

const tier4Modules: Module[] = [
  {
    id: 'sports-betting-math',
    tier: 4,
    title: 'The Sports Betting Math They Hide From You',
    subtitle: "Why the apps are designed to make you lose",
    emoji: '🎰',
    xp: 100,
    readTime: '7 min',
    takeaway: "The house edge means the longer you play, the more certain your loss becomes. It's not bad luck - it's math.",
    sections: [
      {
        type: 'lesson',
        content: `Sports betting apps have become the fastest-growing form of gambling in history. In 2023, Americans bet over $100 billion on sports. The apps are beautifully designed, constantly on your phone, and marketed aggressively by athletes and celebrities you trust.

Here's what those ads don't tell you.

**The house edge: what it actually means**

When you bet on an NFL game at -110 odds, you have to bet $110 to win $100. This means:
- You need to win 52.4% of the time just to break even
- The house collects the extra 4.5-10% on every bet, every time, regardless of outcome

This is called the **vig** (short for vigorish). It's built into every single bet. There is no bet where the math is on your side.

**The math over time:**

If you bet $10 on 10 games per week at -110 odds, and you're a 50% picker (which is about as good as most people get):
- Week 1: You expect to lose ~$4.76 per week on average
- Month 1: Expected loss: ~$19
- Year 1: Expected loss: ~$247 on $100/week of bets

The apps count on you not thinking about expected value. They show you winners. They give you "free bets" (which have significant restrictions). They use push notifications to pull you back.

**Why "I'm good at picking games" doesn't work:**

Professional sports bettors exist - but they need win rates above 55% consistently, years of data, and they treat it like a full-time job. Even then, most fail. The information you have watching games is not better than the information the sportsbook's algorithms have when they set lines.

**What this money could actually do:**

$100/week in sports bets at a 50% win rate = ~$247/year expected loss.
$100/week in an S&P 500 index fund = ~$7,500 over 5 years, ~$19,000 over 10 years.

You're not just losing the bet. You're losing what that money would have become.`,
      },
      {
        type: 'calculator',
        calculator: { type: 'betting' },
      },
      {
        type: 'quiz',
        quiz: {
          question: 'If you bet $110 to win $100 (-110 odds), what win rate do you need just to break even?',
          options: [
            '50%',
            '52.4%',
            '55%',
            '48%',
          ],
          correctIndex: 1,
          explanation: "At -110, you need to win 52.38% of bets to break even. Most people win less than 50%. The house is taking money from everyone, winners and losers alike, through the spread built into every bet.",
        },
      },
      {
        type: 'quiz',
        quiz: {
          question: "A sportsbook offers you a $100 'free bet' if you sign up. What's the catch?",
          options: [
            'There is no catch - it\'s genuinely free money',
            "You only win the net profit, not the stake - and terms restrict how/when you can use it",
            'You have to invite friends to get it',
            "Free bets expire in 24 hours",
          ],
          correctIndex: 1,
          explanation: 'On most "free bet" offers, if you win, you get the winnings but not the original $100 stake back. Plus there are usually wagering requirements that make it very hard to withdraw the money. These offers are designed to get you through the door.',
        },
      },
    ],
  },
  {
    id: 'crypto-reality',
    tier: 4,
    title: 'Crypto: Speculation vs. Investment',
    subtitle: 'What the influencers aren\'t telling you about volatility',
    emoji: '₿',
    xp: 100,
    readTime: '7 min',
    takeaway: "Crypto can make you rich or leave you with nothing - and you have very little control over which.",
    sections: [
      {
        type: 'lesson',
        content: `Cryptocurrency is real technology with real use cases. It is also one of the most volatile asset classes that has ever existed. Both things are true.

Here's what you need to understand before putting any money into it.

**What crypto actually is:**

At its core, cryptocurrency is a decentralized digital record-keeping system. Bitcoin was designed as a currency - a way to transfer value without banks. Ethereum was designed to run programmable contracts. Most other cryptocurrencies were designed to make their creators rich.

**The volatility math:**

Bitcoin, the most established cryptocurrency, has dropped by more than 80% from its peak *four separate times* since 2011. Every time. This means:
- $10,000 invested at the peak in 2021 → $1,600 at the bottom in 2022
- Some altcoins (smaller cryptos) went to zero

An 80% drop requires a **400% gain just to get back to even.** If your $1,000 drops to $200, it needs to go from $200 to $1,000 - a 5x increase - just to recover.

**"But Bitcoin always came back":**

True - Bitcoin has recovered from every major crash. So far. But:
1. Most individual cryptocurrencies that crashed did NOT recover
2. Recovery took years - sometimes 3-4 years
3. During those years, the money was locked in loss, doing nothing

**The influencer problem:**

Many crypto influencers were paid (often secretly) to promote specific coins. When prices crashed, they had already sold. This is called a "pump and dump" - drive up the price, sell at the peak, let everyone else hold the loss.

**What a thoughtful approach looks like:**

If you're going to invest in crypto, treat it like the speculation it is:
- Only use money you could lose entirely
- Stick to the most established coins (Bitcoin, Ethereum)
- Never put more than 5-10% of your investable money into it
- Don't check the price every hour - you will lose your mind

**The rest of your money?** Index funds. Every time.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "Bitcoin drops 80% from its peak. How much does it need to rise from the bottom to get back to where it was?",
          options: [
            '80%',
            '200%',
            '400%',
            '120%',
          ],
          correctIndex: 2,
          explanation: "If $1,000 drops 80% to $200, it needs to multiply 5x to reach $1,000 again - that's a 400% gain. This asymmetry is one of the most important concepts in investing. Losses hurt more than equivalent gains help.",
        },
      },
      {
        type: 'quiz',
        quiz: {
          question: "Which of these is the most important rule for speculative investments like crypto?",
          options: [
            "Buy when influencers say so",
            "Only invest money you could afford to lose entirely",
            "Check prices daily to react quickly",
            "Invest more after a big drop to average down",
          ],
          correctIndex: 1,
          explanation: "Speculative investments can go to zero. If you invest money you need for rent, tuition, or emergencies, a crash forces you to sell at the worst time. Only speculate with money you genuinely wouldn't miss.",
        },
      },
    ],
  },
  {
    id: 'compound-growth-vs-quick-rich',
    tier: 4,
    title: 'Get Rich Slow',
    subtitle: 'Why boring investing beats everything else',
    emoji: '📈',
    xp: 100,
    readTime: '8 min',
    takeaway: 'Starting at 18 instead of 28 can make you $500,000 richer by retirement - from the same monthly contribution.',
    sections: [
      {
        type: 'lesson',
        content: `Here is a fact that sounds impossible until you do the math:

**Two people invest $200 per month. One starts at 18, one starts at 28. By 65, the person who started at 18 has $500,000 more than the person who started at 28.**

Same monthly contribution. Same investment. The only difference is 10 years.

This is compound interest - the most powerful force in personal finance, and the one almost nobody teaches young people about until it's too late to fully benefit.

**The math behind the magic:**

When your investment earns a return, that return gets added to your total. Next year's return is calculated on the larger number. This creates exponential growth - slow at first, then dramatic.

$200/month at 8% average annual return:
- Start at 18, stop contributing at 65 (47 years): **$1,086,000**
- Start at 28, stop contributing at 65 (37 years): **$583,000**
- Difference: **$503,000** - from just starting 10 years earlier

**The S&P 500 index fund:**

You don't need to pick stocks. You don't need a stockbroker. You need one thing: an index fund.

An S&P 500 index fund holds tiny pieces of the 500 largest U.S. companies. When the U.S. economy does well, your fund does well. The historical average annual return of the S&P 500 is about 10% (roughly 7-8% after inflation).

This is how most wealthy people actually invest. Not picking stocks. Not trading crypto. Not following tips. A low-cost index fund, automated contributions, time.

**Roth IRA: your most valuable account**

If you have any earned income (job, freelance, etc.), you can open a Roth IRA at 18. You contribute after-tax money, and it grows completely tax-free. When you withdraw at retirement, you pay zero taxes.

On $1 million in a Roth IRA, that zero-tax benefit could save you $200,000-300,000+ in taxes vs. a regular account.

You can open one at Fidelity, Vanguard, or Schwab. $0 minimum at some brokers. You can contribute up to $7,000/year (2024 limit).

**The get-rich-quick trap:**

Every generation gets its version: penny stocks, day trading, multi-level marketing, crypto, sports betting, meme stocks. The promise is the same: fast money, easy money, life-changing returns.

The reality: over any 10-year period, roughly 90% of individual stock pickers underperform a basic index fund. The people who made money on meme stocks mostly got lucky and don't talk about what they lost afterward.

Getting rich slowly isn't exciting. But it's the method that actually works.`,
      },
      {
        type: 'calculator',
        calculator: { type: 'compound' },
      },
      {
        type: 'quiz',
        quiz: {
          question: 'What is an S&P 500 index fund?',
          options: [
            'A savings account with a fixed 5% rate',
            'A fund that holds small pieces of the 500 largest U.S. companies',
            'A government bond guaranteed by the U.S. Treasury',
            'A cryptocurrency index',
          ],
          correctIndex: 1,
          explanation: "An S&P 500 index fund gives you exposure to 500 major U.S. companies in one investment. When the economy grows, you grow with it. Low fees, no stock-picking needed, historically the best long-term return for most investors.",
        },
      },
    ],
  },
  {
    id: 'building-wealth-from-zero',
    tier: 4,
    title: 'Building Wealth Without a Head Start',
    subtitle: 'The actual playbook for people who start with nothing',
    emoji: '🏗️',
    xp: 120,
    readTime: '8 min',
    takeaway: "You don't need to start rich. You need to start early, be consistent, and avoid the mistakes that derail most people.",
    sections: [
      {
        type: 'lesson',
        content: `Most personal finance advice was written for people who already have money. This is for people who don't.

**Step 1: Stop the bleeding (before you invest anything)**

You cannot invest your way out of high-interest debt. A credit card at 24% APR is a guaranteed 24% annual loss. No investment reliably returns 24%. Pay off high-interest debt first - completely.

**Step 2: Build a $1,000 emergency fund**

Before investing, before paying extra on debt, save $1,000 in a separate savings account and don't touch it. This is your buffer against the unexpected expense that makes people take on debt.

After that's built, expand it to 3-6 months of expenses.

**Step 3: Get the free money first**

If your job has a 401(k) match, contribute at least enough to get the full match before doing anything else. A 50% or 100% employer match is an instant 50-100% return. There is no investment that beats this.

**Step 4: The actual investment ladder**
Once emergency fund is set and you're capturing any employer match:
1. Max your Roth IRA ($7,000/year - after-tax, tax-free growth)
2. Max your 401(k) ($23,000/year)
3. Invest in a regular taxable brokerage account

Everything in low-cost S&P 500 or total market index funds.

**Step 5: Protect what you build**

The biggest wealth killers aren't bad investments - they're:
- Credit card debt that never gets paid off
- No insurance (health emergency = financial catastrophe)
- Lifestyle inflation: earning more, spending more, saving the same percentage
- "Investing" in things you don't understand because someone said it was a sure thing

**The honest number:**

$200/month, consistently, starting at 22, in an S&P 500 index fund:
By 45 (23 years): ~$165,000
By 55 (33 years): ~$363,000
By 65 (43 years): ~$780,000

This isn't a lottery. It isn't a get-rich-quick scheme. It's math - the same math that works for everyone who follows it.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "You have $1,000. You have a credit card balance at 22% APR. Your employer 401(k) has a 100% match up to 3% of salary. What order should you do things?",
          options: [
            "Invest everything in the 401(k) to get the match, then pay card",
            "Build emergency fund first, then get the employer match, then pay credit card",
            "Pay off the credit card first, then invest",
            "Split 50/50 between investing and paying down debt",
          ],
          correctIndex: 1,
          explanation: "The employer match is a 100% guaranteed return - better than any investment and better than the 22% cost of credit card debt. But you need the emergency fund first, or you'll end up back on the credit card when something breaks. After that, the employer match wins every time.",
        },
      },
      {
        type: 'scenario',
        scenario: {
          type: 'scenario',
          prompt: "Your first real job pays $50,000. You have no debt, no savings. What's your first move?",
          setup: "You're 22, just started working. Here's what you do with your first paycheck:",
          choices: [
            {
              label: 'Build the emergency fund first',
              description: 'Open a high-yield savings account, put aside $200/month until you have $3,000 (3 months of expenses)',
              outcome1yr: '$2,400 saved. Small but yours. If something breaks, no credit card needed.',
              outcome10yr: 'Foundation built. You\'ve never had to go into debt for an emergency. Investing compounding since month 4.',
              emoji: '🛡️',
              xpBonus: 30,
            },
            {
              label: 'Start investing immediately',
              description: 'Open a Roth IRA, put $200/month into an S&P 500 index fund',
              outcome1yr: '~$2,500 invested. Good start - but what happens when your car breaks down?',
              outcome10yr: 'Great IF nothing went wrong. High risk that an emergency forced you to sell at a loss and restart.',
              emoji: '📊',
              xpBonus: 20,
            },
            {
              label: 'Get the 401(k) match first',
              description: "Contribute 3% to 401(k) to get the full employer match from day one",
              outcome1yr: '~$3,000 invested (your $1,500 + $1,500 free from employer). 100% instant return.',
              outcome10yr: 'Best outcome if you also built the emergency fund. Match + compound interest is life-changing.',
              emoji: '🎯',
              xpBonus: 40,
            },
            {
              label: 'Lifestyle upgrade first',
              description: "You've been broke - time to upgrade the apartment, car, wardrobe",
              outcome1yr: 'Lifestyle inflated to match income. Nothing saved. Paycheck to paycheck at $50K.',
              outcome10yr: 'Lifestyle inflation trap. Many people earning $100K still have nothing saved because of this pattern.',
              emoji: '⚠️',
              xpBonus: 0,
            },
          ],
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// TIER 2 - BUILDING BLOCKS (Grades 7-8)
// Placeholder structure - content to be added
// ─────────────────────────────────────────────

const tier2Modules: Module[] = [
  {
    id: 'compound-interest',
    tier: 2,
    title: 'The Most Important Math Nobody Teaches You',
    subtitle: 'How compound interest turns small amounts into big ones',
    emoji: '🌱',
    xp: 75,
    readTime: '6 min',
    takeaway: 'Compound interest is money making money on the money it already made. Time is the key ingredient.',
    sections: [
      {
        type: 'lesson',
        content: `Albert Einstein allegedly called compound interest "the eighth wonder of the world." Whether he said it or not, it's a useful way to think about it.

**Simple interest vs. compound interest:**

*Simple interest* means you earn interest only on the original amount. If you put $1,000 in an account at 10% simple interest, you earn $100 every year. After 10 years: $2,000.

*Compound interest* means you earn interest on your interest too. Same $1,000 at 10%:
- Year 1: $1,100
- Year 2: $1,210 (10% of $1,100)
- Year 3: $1,331
- Year 10: $2,594

The difference seems small at first. But wait 30 years:
- Simple interest: $4,000
- Compound interest: $17,449

**The Rule of 72:**
Want to know how long it takes to double your money? Divide 72 by your interest rate.
- 6% return: money doubles in 12 years (72 ÷ 6)
- 8% return: money doubles in 9 years (72 ÷ 8)
- 10% return: money doubles in 7.2 years (72 ÷ 10)

**Why starting young matters so much:**

$1,000 invested at 8% annual return:
- Invested at age 10: worth $46,902 by age 65
- Invested at age 20: worth $21,725 by age 65
- Invested at age 30: worth $10,063 by age 65

The 10-year-old's $1,000 grows to $46,902.
The 30-year-old's $1,000 grows to $10,063.
Same amount. Same return. 20 years of head start = 4.7x more money.`,
      },
      {
        type: 'calculator',
        calculator: { type: 'compound' },
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Using the Rule of 72, how long does it take $500 to double at a 6% annual return?',
          options: [
            '6 years',
            '8 years',
            '12 years',
            '24 years',
          ],
          correctIndex: 2,
          explanation: "72 ÷ 6 = 12 years. So $500 becomes $1,000 in 12 years, then $2,000 in 24, then $4,000 in 36. This is the compounding snowball in action.",
        },
      },
    ],
  },
  {
    id: 'budgeting-basics',
    tier: 2,
    title: 'The Budget That Actually Works',
    subtitle: "50/30/20: a simple rule for making your money do what you want",
    emoji: '📊',
    xp: 75,
    readTime: '5 min',
    takeaway: '50% needs, 30% wants, 20% savings - a framework you can start with $50/month or $5,000/month.',
    sections: [
      {
        type: 'lesson',
        content: `Most people don't have a budget. Of those who do, most abandon it within a month. The reason isn't willpower - it's that complicated systems require constant effort to maintain.

The 50/30/20 rule is simple enough to actually use:

**50% - Needs**
Everything you have to pay regardless of whether you want to:
- Housing (rent, utilities)
- Food (groceries, not restaurants)
- Transportation (bus pass, gas, car payment if you have one)
- Insurance
- Minimum debt payments

**30% - Wants**
Everything that makes life enjoyable but isn't strictly necessary:
- Eating out / food delivery
- Entertainment (streaming, concerts, games)
- Clothing beyond the basics
- Hobbies
- Travel

**20% - Savings and extra debt payoff**
- Emergency fund (until you have 3-6 months of expenses)
- Retirement accounts (Roth IRA, 401k)
- Paying down debt faster than the minimum
- Saving for a specific goal (car, down payment)

**Applied to a $500/month allowance or part-time job:**
- $250 for needs (lunch, transportation, phone plan if you pay it)
- $150 for wants (clothes, entertainment, eating out)
- $100 for savings (starts building the habit NOW)

**Why the percentage matters more than the amount:**
Someone earning $30,000 and saving 20% ($6,000/year) is better positioned than someone earning $80,000 and saving 5% ($4,000/year). The habit compounds just like the money does.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "You earn $800/month from a part-time job. Using 50/30/20, how much should go to savings?",
          options: [
            '$50',
            '$100',
            '$160',
            '$200',
          ],
          correctIndex: 2,
          explanation: "20% of $800 = $160. That might feel like a lot when you're a teenager, but investing $160/month starting at 16 instead of 26 results in roughly double the retirement savings.",
        },
      },
    ],
  },
  {
    id: 'credit-scores',
    tier: 2,
    title: 'Your Credit Score: The Number That Follows You',
    subtitle: 'What it is, how it works, and why to care now',
    emoji: '📋',
    xp: 75,
    readTime: '5 min',
    takeaway: 'Your credit score affects your rent, car payment, mortgage, and sometimes even your job - build it early.',
    sections: [
      {
        type: 'lesson',
        content: `Your credit score is a three-digit number between 300 and 850. It tells lenders how reliably you've repaid money you've borrowed in the past.

Here's why it matters before you think it should:

- **Renting an apartment:** Landlords run credit checks. A bad score means you need a co-signer or a bigger deposit.
- **Car loans:** The difference between a 680 and 780 credit score on a $25,000 car loan can be $3,000+ in total interest.
- **Mortgages:** On a $400,000 mortgage, a bad credit score can cost $50,000-100,000+ in extra interest over 30 years.
- **Jobs:** Some employers check credit for positions handling money.

**The five factors:**

| Factor | Weight | What it means |
|---|---|---|
| Payment history | 35% | Have you paid on time? Late payments hurt a lot. |
| Amounts owed | 30% | How much of your available credit are you using? |
| Length of history | 15% | How long have your accounts been open? |
| Credit mix | 10% | Do you have different types of credit? |
| New credit | 10% | How recently did you apply for new accounts? |

**The most important rule: pay on time, every time.**

One missed payment can drop your score 50-100 points and stays on your report for 7 years. Set up autopay for minimums and you'll never miss one accidentally.

**How to start building credit at 18:**
- Get a secured credit card (you deposit $200-500 as collateral)
- Use it for one small purchase per month (coffee, gas)
- Pay the full balance every month
- After 6-12 months, you'll have a credit history

You want to keep your **credit utilization** (amount used ÷ limit) below 30%. Ideally below 10%.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: 'What is the single most important factor in your credit score?',
          options: [
            'How much money you make',
            'How many credit cards you have',
            'Whether you pay on time every time',
            'How long you\'ve had your bank account',
          ],
          correctIndex: 2,
          explanation: "Payment history is 35% of your score - the largest single factor. One late payment can drop your score significantly and stays on your report for 7 years. Autopay for the minimum is the simplest way to protect this.",
        },
      },
    ],
  },
  {
    id: 'debt-basics',
    tier: 2,
    title: 'Good Debt vs. Bad Debt',
    subtitle: "Not all debt is the same - here's how to tell the difference",
    emoji: '⚖️',
    xp: 75,
    readTime: '5 min',
    takeaway: 'Good debt builds wealth or income (mortgage, education). Bad debt finances consumption at high interest (credit cards, car loans for cars you can\'t afford).',
    sections: [
      {
        type: 'lesson',
        content: `Debt has a bad reputation, but not all debt is the same. Understanding the difference is one of the most important money skills you can have.

**Good debt** is borrowing that:
- Creates value or income that exceeds the cost of the debt
- Has a low interest rate
- Is for something that appreciates in value (goes up) or increases your earning power

Examples:
- *Mortgage at 6.5%:* You're buying an asset that historically appreciates. You'd be paying rent anyway - this builds equity.
- *Student loans at 5% for a degree that increases your earnings by $20K/year:* The math works.
- *Small business loan at 8% for a business earning 20% return:* The debt is paying for itself.

**Bad debt** is borrowing that:
- Finances consumption (things that are used up or lose value)
- Has a high interest rate
- Keeps you in a cycle of payments without building anything

Examples:
- *Credit card at 24%:* The highest-return investment most years doesn't beat this rate. Everything you buy on a card that you don't pay off is costing 24% extra.
- *Car loan for a car you can't afford:* Cars lose 20% of their value the day you drive off the lot. Paying 7% interest to finance a depreciating asset.
- *Buy Now Pay Later for clothes/electronics:* Financing consumables is almost always bad math.

**The credit card minimum payment trap:**

$2,000 credit card balance at 24% APR:
- Minimum payment each month: ~$40
- Time to pay off at minimum: 8+ years
- Total interest paid: ~$2,700+
- You'll pay more in interest than the original balance

See this for yourself:`,
      },
      {
        type: 'calculator',
        calculator: { type: 'creditcard' },
      },
      {
        type: 'quiz',
        quiz: {
          question: 'You need to borrow $5,000. Option A is a student loan at 5% for a degree that increases your salary by $15,000/year. Option B is a car loan at 12% for a used car you want but don\'t need. Which is better?',
          options: [
            'Option B - the car is more immediately useful',
            'Option A - the return on the investment far exceeds the cost of debt',
            'Neither - all debt should be avoided',
            'They\'re equal - same $5,000 borrowed',
          ],
          correctIndex: 1,
          explanation: "Option A creates $15,000/year in additional income for a 5% cost. That's a 300% return on debt. Option B finances something that depreciates at 12% interest. The math is completely different. Evaluate debt by what it creates, not just its existence.",
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// TIER 3 - DECISIONS (Grades 9-10) placeholder
// ─────────────────────────────────────────────

const tier3Modules: Module[] = [
  {
    id: 'investing-basics',
    tier: 3,
    title: 'How Investing Actually Works',
    subtitle: "Stocks, index funds, and why most people do it wrong",
    emoji: '💹',
    xp: 90,
    readTime: '7 min',
    takeaway: "You don't need to pick stocks. A low-cost index fund, automatic contributions, and time beats almost everything else.",
    sections: [
      {
        type: 'lesson',
        content: `When most people think about "investing in stocks," they imagine someone glued to a screen watching tickers, buying and selling based on gut feelings and tips. This is actually one of the worst ways to invest.

**What a stock is:**

When you buy a share of stock, you own a small piece of a company. If the company grows and becomes more valuable, your share is worth more. If you hold shares that pay dividends, you get a portion of the company's profits.

Buying one share of Apple doesn't mean you can walk into a store and take things - but it does mean you benefit proportionally when Apple does well.

**The problem with picking stocks:**

- Over any 15-year period, roughly 90% of professional fund managers underperform a basic index fund
- These are people with MBAs, teams of analysts, and live market data 24/7
- If they can't consistently beat the market, the chance that you can is very low

**The better approach: index funds**

An S&P 500 index fund automatically holds tiny pieces of all 500 of the largest U.S. companies. You can't buy a single bad stock, because you own all of them proportionally.

Historical average annual return: ~10% (S&P 500)
After inflation: ~7-8%

A $100/month investment in an S&P 500 index fund starting at 16:
- By 26 (10 years): ~$19,000
- By 36 (20 years): ~$58,000
- By 46 (30 years): ~$136,000
- By 66 (50 years): ~$637,000

**The lowest cost wins:**
Look for "expense ratios" under 0.10%. Vanguard VOO, Fidelity FZROX, and Schwab SCHB are all under 0.05% - meaning almost all your returns go to you, not the fund manager.

**When to start:**
Now. The cost of waiting a year is compounded over every year that follows.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: 'Why do financial experts generally recommend index funds over picking individual stocks?',
          options: [
            'Index funds are guaranteed to never lose money',
            'Index funds are lower risk because they hold hundreds of companies, and most stock-pickers underperform them anyway',
            'Individual stocks are illegal for regular investors',
            'Index funds pay higher dividends',
          ],
          correctIndex: 1,
          explanation: "Diversification (owning many companies) reduces the risk of any one company collapsing. And decades of data show that even professional investors rarely beat an index fund consistently. Simple, cheap, diversified beats complicated, expensive, concentrated.",
        },
      },
    ],
  },
  {
    id: 'credit-cards-deep-dive',
    tier: 3,
    title: 'Credit Cards: The Double-Edged Sword',
    subtitle: 'How to use them to build credit without falling into debt',
    emoji: '💳',
    xp: 90,
    readTime: '6 min',
    takeaway: 'Credit cards are free money if you pay in full every month - and one of the most expensive mistakes if you don\'t.',
    sections: [
      {
        type: 'lesson',
        content: `Credit cards are genuinely useful. They offer:
- Purchase protection and fraud prevention
- Cash back or travel rewards (free money if you pay in full)
- Credit history building
- Convenience

They're also one of the most dangerous financial products for people who don't understand how they work.

**The math behind minimum payments:**

$3,000 balance at 24% APR:
- If you pay only the minimum ($60/month): ~14 years to pay off, ~$5,600 in total interest paid
- If you pay $150/month: ~2 years, ~$680 in interest
- If you pay it off immediately: $0 in interest

The credit card company isn't hoping you pay it off quickly. They're hoping you'll pay the minimum for years. The minimum payment is designed to maximize interest income, not to help you get debt-free.

**The one rule that makes credit cards free:**

Pay the full statement balance every month, every time, no exceptions.

If you can't pay the full balance, you spent more than you had. The credit card didn't give you money - it gave you a loan at 24% interest.

**Rewards cards:**

With a no-annual-fee cash back card, you typically earn 1-2% back on purchases. If you spend $500/month and pay it off, you earn $60-$120/year in free cash.

But: if you carry a $500 balance at 24% APR for one year while earning 2% rewards, you pay ~$120 in interest for ~$120 in rewards. The math nets to zero. The bank wins.

**The right way to use a credit card:**
1. Use it for things you'd buy anyway
2. Pay it off completely every month
3. Never carry a balance
4. Keep utilization under 30%
5. Don't open multiple cards to chase rewards unless you're very disciplined`,
      },
      {
        type: 'calculator',
        calculator: { type: 'creditcard' },
      },
      {
        type: 'quiz',
        quiz: {
          question: "Your credit card has a $2,000 balance at 20% APR. The minimum payment is $40/month. Why is paying only the minimum a bad idea?",
          options: [
            "It will lower your credit score",
            "It will take many years and cost more in interest than the original balance",
            "You can't use the card if you only pay the minimum",
            "It triggers penalty fees",
          ],
          correctIndex: 1,
          explanation: "At $40/month on a $2,000 balance at 20%, it takes over 8 years to pay off and costs over $1,800 in interest alone - nearly as much as the original balance. The minimum payment is designed to keep you in debt as long as possible.",
        },
      },
    ],
  },
  {
    id: 'student-loans',
    tier: 3,
    title: 'Student Loans: Read Before You Sign',
    subtitle: 'The debt that can follow you for 20 years',
    emoji: '🎓',
    xp: 90,
    readTime: '7 min',
    takeaway: "Borrow what the degree will earn back. A $200K loan for a $40K job is a math problem that doesn't work.",
    sections: [
      {
        type: 'lesson',
        content: `Student debt in the United States is now over $1.7 trillion - more than credit card debt, more than auto loan debt. Over 45 million Americans have student loans, and the average balance is over $37,000.

The important thing to understand: student loans can be good debt or catastrophically bad debt. It depends entirely on what you borrow and what you study.

**The rule of thumb:**

Your total student loan debt at graduation should not exceed your expected first-year salary. If a nursing degree pays $65,000/year, borrowing $65,000 for it is defensible. Borrowing $120,000 is not.

**Federal vs. private loans:**

*Federal loans* (from the U.S. government):
- Lower, fixed interest rates
- Income-driven repayment options
- Forgiveness programs for public service
- Can be paused in financial hardship (deferment/forbearance)
- Always take these first

*Private loans* (from banks):
- Often higher rates, sometimes variable
- No income-driven repayment
- No forgiveness options
- Fewer protections if you lose your income
- Last resort only

**The questions to ask before taking on loans:**
1. What is the average starting salary for this field in this region?
2. What will my monthly payment be after graduation? (Use studentaid.gov loan simulator)
3. Can I cover that payment on an entry-level salary?
4. Is there a lower-cost path to the same outcome? (Community college → transfer, in-state school, trade programs)

**What nobody tells you:**

The degree that matters most for earnings isn't the school - it's the field. A computer science degree from a state school often outperforms a communications degree from a prestige school, at a fraction of the cost.

Prestige matters at the margins for a small number of fields (finance, consulting, law, medicine). For most careers, the work history you build matters more than where you went.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "You want to be a social worker (average starting salary $38,000). Which loan scenario makes more financial sense?",
          options: [
            "$80,000 in loans from a private university with a strong brand",
            "$25,000 in federal loans from a state school with the same accreditation",
            "$120,000 for the best program in the country",
            "All are equally valid paths",
          ],
          correctIndex: 1,
          explanation: "For a $38,000 starting salary, $80,000 in debt means monthly payments of ~$830 - over 26% of gross income. $25,000 in debt means payments of ~$260/month. The degree opens the same doors. The debt is the variable that determines your financial freedom for the next decade.",
        },
      },
    ],
  },
  {
    id: 'emergency-fund',
    tier: 3,
    title: 'The Emergency Fund: Boring and Essential',
    subtitle: "Why the most important money you save is the money you never touch",
    emoji: '🛡️',
    xp: 80,
    readTime: '5 min',
    takeaway: "Without an emergency fund, every unexpected expense becomes debt. With one, it becomes an inconvenience.",
    sections: [
      {
        type: 'lesson',
        content: `The emergency fund is the most boring topic in personal finance. It is also the one that most changes how financial stress feels.

**What an emergency fund is:**
3-6 months of essential living expenses, in a high-yield savings account, that you do not touch except for genuine emergencies.

Not "I really want this concert ticket" emergencies. Car broke down emergencies. Medical bill emergencies. Job loss emergencies.

**Why it matters:**

Without an emergency fund, every financial surprise becomes debt. Car breaks down: credit card debt at 24%. Medical bill: payment plan at 18%. Lost job: credit card debt + stress + bad decisions.

With an emergency fund: Car breaks down. You pay cash. Life goes on.

The difference isn't just financial - it's psychological. Financial stress is one of the leading causes of relationship problems, health problems, and poor decision-making. The emergency fund doesn't just protect your money; it protects your ability to think clearly.

**How much:**
- Starter goal: $1,000 (handles most minor emergencies)
- Full goal: 3 months of essential expenses (rent + food + utilities + transportation)
- If your income is variable (freelance, commission): 6 months

**Where to keep it:**
High-yield savings account (HYSA). Currently paying 4-5% APY at many online banks.
- Not checking (too accessible, earns nothing)
- Not investments (could lose value right when you need it)
- Not cash at home (can be stolen, no interest, disaster risk)

**The psychological trick:**
Name the account. "Emergency Fund - Do Not Touch." People with named accounts spend less from them. It's a small trick that actually works.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "Why should an emergency fund be in a savings account rather than invested in stocks?",
          options: [
            "Savings accounts earn more money long-term",
            "Stocks could drop 30-50% right when you need the money most, forcing you to sell at a loss",
            "Investing is illegal for emergency purposes",
            "There is no difference",
          ],
          correctIndex: 1,
          explanation: "Stocks can drop significantly during recessions - exactly when you're most likely to lose a job or face financial stress. Selling investments at a loss to cover an emergency doubles your damage. The emergency fund needs to be stable and instantly accessible.",
        },
      },
    ],
  },
];

// ─────────────────────────────────────────────
// Exports
// ─────────────────────────────────────────────

export const allModules: Module[] = [
  ...tier1Modules,
  ...tier2Modules,
  ...tier3Modules,
  ...tier4Modules,
];

export const modulesByTier = {
  1: tier1Modules,
  2: tier2Modules,
  3: tier3Modules,
  4: tier4Modules,
};

export const tierInfo = {
  1: {
    label: 'Foundation',
    grades: 'Grades 5-6',
    description: 'What money is, needs vs. wants, saving, and how banks work',
    color: 'emerald',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  2: {
    label: 'Building Blocks',
    grades: 'Grades 7-8',
    description: 'Compound interest, budgeting, credit scores, and types of debt',
    color: 'blue',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
  },
  3: {
    label: 'Decisions',
    grades: 'Grades 9-10',
    description: 'Investing, credit cards, student loans, and emergency funds',
    color: 'violet',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    badgeClass: 'bg-violet-100 text-violet-800',
    buttonClass: 'bg-violet-600 hover:bg-violet-700',
  },
  4: {
    label: 'Reality Check',
    grades: 'Grades 11-12',
    description: 'The math behind sports betting, crypto speculation, and building wealth from nothing',
    color: 'orange',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    badgeClass: 'bg-orange-100 text-orange-800',
    buttonClass: 'bg-orange-600 hover:bg-orange-700',
  },
};
