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
        content: `Here's something weird. A rare Messi soccer card can sell for hundreds of dollars. A common one is worth a dollar. The card is the same cardboard. So what's the difference?

**People agree it's worth more.** That's literally it.

Money works the same way. A $20 bill is just paper. It only has value because the U.S. government says it does, and because everyone in the country agrees to use it. If people stopped trusting it tomorrow, that paper would be worthless.

**Why barter used to be a nightmare:**

Before money, people traded things directly - this is called **barter**. If you had extra apples and needed new shoes, you had to find a shoemaker who happened to want apples. Not easy. Money solved this by becoming something everyone accepts, so you don't have to find someone with exactly what you need.

Think about Roblox. **Robux** works as money inside Roblox because everyone playing agrees it has value. It doesn't exist in the real world - but millions of people trade real dollars for it because it works as a medium of exchange inside that game.

**Where does money come from?**

You can earn it by doing something valuable for someone else. When you help a neighbor with their lawn, do chores for an allowance, or eventually get a job - you're trading your time and effort for money. The cool part: as you get better at things (better skills, more knowledge), your time becomes worth more per hour.

**Why this matters at your age:**
The money habits you build right now - with small amounts - will be the same habits you have when the amounts get bigger. The best time to learn how money works is before the stakes are high.`,
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
          explanation: "A dollar bill works because everyone using it agrees it has value - just like a Messi card is worth more than a common card because collectors agree it is. That shared trust is what makes money useful.",
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
          explanation: "All earning is really an exchange of time and skills for money. Here's the cool part: as you learn more and get better at things, each hour of your time becomes worth more.",
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
        content: `Quick quiz: Is a phone a need or a want?

Trick question. A basic phone you need for safety? **Need.** The newest iPhone with every case and accessory? **Want.**

This is the most important money decision you'll make every single day - and most people never think about it.

**Needs** are things you genuinely can't skip:
- Food (not Chipotle every day - actual food)
- A place to sleep
- Clothes that fit the weather
- Getting to school

**Wants** are everything else. And here's the thing - wants aren't bad. Life would be boring without them. The question is whether you're *choosing* them or just *letting them happen.*

**The sneaky middle:**
Some things feel like needs but are actually upgraded wants:
- You need a phone. You don't need the newest model with the biggest storage.
- You need food. You don't need snacks from the school store every day.
- You need shoes. You don't need $200 Jordans.

There's nothing wrong with wants - as long as you're making a real decision about them, not just spending without thinking.

**Why this actually matters right now:**
A $10/week habit of impulse snacks and small purchases = $520 a year. If you saved and invested that instead, in 10 years it's worth $7,500. That's not a reason to never enjoy anything. It's a reason to enjoy the things that are actually worth it to you - and skip the ones that aren't.`,
      },
      {
        type: 'scenario',
        scenario: {
          type: 'scenario',
          prompt: "You just got $50 for your birthday. What do you do?",
          setup: "You have $50 cash. No immediate needs. Here are your real options:",
          choices: [
            {
              label: 'Save it all',
              description: 'Put it in a savings account, leave it alone',
              outcome1yr: 'About $51.75 with interest. Not exciting - but it\'s still there, earning a little more.',
              outcome10yr: 'Around $70. Your $50 grew by $20 just by sitting there doing nothing.',
              emoji: '🏦',
              xpBonus: 30,
            },
            {
              label: 'Keep $15, save $35',
              description: 'Enjoy a little now, save the rest',
              outcome1yr: '$37.45 in savings + you had fun with $15. Best of both.',
              outcome10yr: 'Savings grows to ~$49. You got to spend $15 AND ended up with nearly as much as you started.',
              emoji: '🎮',
              xpBonus: 40,
            },
            {
              label: 'Spend it all',
              description: 'You got it, you earned it, why not',
              outcome1yr: '$0. Whatever you bought is probably used, lost, or forgotten.',
              outcome10yr: '$0. And the $50 you spent could have been $70 in a savings account or $108 invested.',
              emoji: '🛍️',
              xpBonus: 0,
            },
            {
              label: 'Give it to a friend to "invest"',
              description: 'Your friend says he knows a hot stock tip',
              outcome1yr: 'This almost never works. Best case: $60. Real case: $30 or $0.',
              outcome10yr: 'Taking advice from someone with no track record is just gambling with extra steps.',
              emoji: '🎰',
              xpBonus: 0,
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
        content: `Here's a rule that almost every adult wishes they'd learned younger:

**Save something first. Then spend the rest.**

Before you buy anything - games, snacks, whatever - set a little aside. Even if it's just $5. Even if it's just $2. The amount matters way less than the habit.

This is called **paying yourself first** - and it's the single most powerful money habit you can build.

**Why it works:**

Money in a savings account earns something called **interest** - basically, the bank pays you a small bonus just for keeping your money there. And here's the wild part: that interest earns MORE interest the next year. Over time, this snowballs.

**The $10/week experiment:**

Imagine you save just $10 a week starting right now. You put it somewhere it earns 7% per year (an investment account - more on that in later levels).

Here's what happens:
- In **1 year**: $555
- In **3 years**: $1,800
- In **5 years**: $3,500
- In **10 years**: $7,500

That last number: you put in $5,200 ($10 x 52 weeks x 10 years). You got back $7,500. **The extra $2,300 came from doing nothing - just waiting.**

The longer you wait to start, the less time the snowball has to roll. That's why starting now, even with tiny amounts, beats starting later with bigger amounts.

**The secret to actually doing it:**

Most people fail at saving because they try to save "whatever's left over." There's never anything left over. Instead, save first. Move the money before you even think about spending. If you can't see it, you won't miss it.`,
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
        content: `Here's something surprising: when you put money in a bank, the bank doesn't just keep it in a vault for you. **The bank loans most of it out to other people.** Then it charges those people interest on the loans - and gives a little bit of that back to you.

That little bit is called **interest**. It's the bank paying you for letting it use your money.

**Two main types of accounts:**

**Checking account** - this is your everyday money:
- For buying things and paying for stuff
- Usually earns very little or zero interest
- Money is always available - you can spend it anytime
- Comes with a debit card

**Savings account** - this is your growing money:
- For money you're setting aside and not spending
- Pays you interest - sometimes a lot more than checking
- Best place to keep savings you're building up

**Here's the part that matters:**

Not all banks pay the same interest. And the difference is bigger than you'd expect.

If you keep $100 in a savings account:
- At a big regular bank: earns about **$0.10 per year** (almost nothing)
- At an online bank: earns about **$4-5 per year** (40x more!)

On $100, that's still not huge. But this habit - finding accounts that pay you more - matters a LOT as your savings grow.

**Is your money safe?**

Yes. The U.S. government insures bank accounts up to $250,000. That means even if a bank has problems, you get your money back. Keeping money in a bank is way safer than keeping cash at home, where it can be lost or stolen.`,
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
        content: `Cryptocurrency is real technology with genuine use cases. It is also one of the most volatile asset classes that has ever existed. Both things are true simultaneously.

Here's what the ads and influencers aren't telling you.

**What crypto actually is:**

Bitcoin was designed as a currency - a way to transfer value without banks. Ethereum was designed to run programmable contracts. Most of the thousands of other cryptocurrencies were designed primarily to make their founders rich.

**The volatility math:**

Bitcoin, the most established crypto, has dropped more than 80% from its peak *four separate times*. Every single time.

- Peak 2021: ~$69,000 per Bitcoin
- Bottom 2022: ~$16,000 per Bitcoin
- A $10,000 investment became ~$2,300

An 80% drop requires a **400% gain just to break even.** If your $1,000 drops to $200, it needs to 5x just to recover.

**"But Bitcoin always came back" - yes, but:**
1. Bitcoin came back. Most individual altcoins didn't.
2. Recovery took 3-4 years each time. That money did nothing for years.
3. Past recovery doesn't guarantee future recovery.

**The TikTok problem:**

Here's what happened with dozens of coins: A creator with millions of followers promotes it. Price spikes. They sell at the top. Their followers are left holding losses.

This is a "pump and dump" - illegal in stocks, but crypto regulations are still catching up. If someone with a big following is telling you to buy a specific coin, ask yourself: *why are they telling you this for free?*

**What a reasonable approach looks like:**

If you're going to speculate on crypto at all:
- Only use money you could lose completely - and be serious about that constraint
- Stick to Bitcoin or Ethereum (most established, most likely to survive)
- Cap it at 5-10% of investable money, maximum
- Don't check the price daily - you will make emotional decisions you'll regret

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
        content: `Here's a number that sounds impossible until you run the math:

**Two people invest $200/month. One starts at 18. One starts at 28. By age 65, the person who started at 18 has $500,000 MORE - from the same monthly contribution.**

Same amount of money. Same investments. Ten years earlier start.

This isn't a marketing pitch. It's compound interest - and it's the most powerful force in personal finance that almost nobody explains to you before it's too late to fully use it.

**The math:**

$200/month, 8% average annual return:
- Start at 18 → by 65: **$1,086,000**
- Start at 28 → by 65: **$583,000**
- **Difference: $503,000** - for starting one decade earlier

**What to actually invest in:**

Forget stock-picking. Forget tips. Forget TikTok portfolio influencers.

An **S&P 500 index fund** automatically holds tiny pieces of the 500 largest U.S. companies. When the economy grows, you grow with it. Historical average: ~10% per year. After inflation: ~7-8%.

This is how most actually-wealthy people invest. Low fees. No decisions required. Time does the work.

The lowest-cost options (get these specifically):
- Vanguard VOO (0.03% fee)
- Fidelity FZROX (0% fee)
- Schwab SCHB (0.03% fee)

**Your birthday present at 18: the Roth IRA**

The day you turn 18 and have any earned income (job, freelance, anything), you can open a Roth IRA. You contribute money you've already paid tax on. It grows completely tax-free. At retirement, you withdraw it - still tax-free.

On $1 million in a Roth IRA, you save $200,000-300,000+ in taxes compared to a regular account. That's just from knowing this exists.

Open one at Fidelity, Vanguard, or Schwab. Takes 15 minutes. Contribute up to $7,000/year.

**The get-rich-quick trap never changes:**

Each generation gets its version: penny stocks, day trading, MLM schemes, crypto, sports betting, meme stocks. Same promise every time - fast money, easy money.

The reality: over any 10-year period, roughly 90% of individual stock-pickers underperform a basic index fund. The people who got rich on meme stocks were lucky and mostly don't talk about what they lost beforehand.

Getting rich slowly is unglamorous. It's also the only method that reliably works.`,
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
        content: `Here's the deal with compound interest: your money earns money. And then that money earns money. And then *that* money earns money. It sounds slow at first. It isn't.

**Simple vs. compound - the difference:**

Say you have $1,000 in an account earning 10% per year.

With *simple interest*, you earn $100 every year on just the original $1,000. After 10 years: $2,000.

With *compound interest*, year 2's interest is calculated on $1,100 (not $1,000). So you earn $110 instead of $100. Then $121. Then $133.

Same starting point. Same rate. Just... letting the interest pile on itself.

After 30 years with compound interest? **$17,449.** Not $4,000.

**The Rule of 72 - a shortcut worth memorizing:**

Want to know how fast your money doubles? Divide 72 by the interest rate.

- 6% return: doubles in **12 years**
- 8% return: doubles in **9 years**
- 10% return: doubles in **7.2 years**

A $500 in a savings account at 6% → $1,000 in 12 years. No extra deposits. Just wait.

**Why age matters more than amount:**

This is the part that blows most adults' minds when they learn it too late.

$1,000 invested at 8%:
- At age 12 → worth **$46,900** by age 65
- At age 22 → worth **$21,700** by age 65
- At age 32 → worth **$10,000** by age 65

Same money. Same return. You just hit "start" earlier. The 12-year-old's $1,000 does 4.7x more work than the 32-year-old's. That's not a typo.`,
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
        content: `Most people don't budget. Of those who try, most quit within a month - not because they lack willpower, but because complicated systems are annoying to maintain.

The 50/30/20 rule is simple enough that you can actually use it:

**50% - Needs:** Things you actually have to pay for
- Food (real food, not Chipotle every day)
- Getting to school
- A phone plan if you pay for yours

**30% - Wants:** Things that make life good but aren't required
- Games, apps, subscriptions
- Eating out with friends
- Clothes you want but don't need
- Entertainment

**20% - Save it:** This is the one most people skip
- Savings account
- Saving toward something specific (AirPods, gaming setup, trip)

**What this looks like at your scale:**

Say you get $40/month in allowance or make $40/month from odd jobs. The rule says:
- $20 for needs (lunch money, bus pass, etc.)
- $12 for wants (games, food with friends)
- **$8 to save**

That $8 sounds small. But $8/month at 8% return = **$1,400 in 10 years.** You put in $960. You got back $1,400. The habit is worth more than the money.

**The real insight:**

The amounts don't matter as much as the ratio. Someone saving 20% of $500/month builds wealth. Someone spending 100% of $5,000/month doesn't. The percentage habit is what you're building now - it scales with your income later.`,
      },
      {
        type: 'quiz',
        quiz: {
          question: "You get $60/month from allowance and chores. Using 50/30/20, how much should go to savings?",
          options: [
            '$6',
            '$12',
            '$18',
            '$30',
          ],
          correctIndex: 1,
          explanation: "20% of $60 = $12/month. That's $144/year. Invested at 8% return, that's over $2,600 in 10 years - from $12/month. The amount seems tiny. The habit is priceless.",
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
        content: `Right now, your credit score doesn't exist. That's fine - it hasn't started yet.

But the moment you turn 18 and open your first credit account, it does. And what you do in the next 2-3 years shapes a number that will follow you for decades.

Your credit score is a three-digit number between 300 and 850. Lenders, landlords, and sometimes even employers use it to judge how reliable you are with money. Higher = better. Here's how it actually affects your life:

- **Renting an apartment:** Bad score = landlord wants a bigger deposit or a co-signer.
- **Car loan:** The difference between a decent score (680) and a great score (780) can mean $3,000+ more in interest on one car.
- **Mortgage:** On a house someday, a bad score could cost you $50,000-100,000 in extra interest. Not a typo.

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
        content: `You're probably 2-3 years away from being able to open an investment account and start building real wealth. That makes this the perfect time to understand how it works - before the stakes are real.

When most people picture "investing in stocks," they imagine a guy staring at flashing numbers on a screen, trading based on tips and gut feelings. That's one of the worst ways to invest, and it's not what this is about.

**What a stock actually is:**

When you buy a share of stock, you own a small piece of a company. If the company grows and becomes more valuable, your share is worth more. Owning one share of Apple doesn't mean you can walk into a store and take things - but you do benefit proportionally when Apple does well.

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
        content: `This is the least exciting topic in this entire course. It is also the one that matters most the moment you start earning real money.

The emergency fund is money you set aside and never touch - except for actual emergencies. Not "this concert would be amazing." Not "I really want these shoes." Car-broke-down emergencies. Job-loss emergencies. Medical-bill emergencies.

**Why it changes everything:**

Without an emergency fund, every financial surprise becomes debt. Car breaks down: $1,200 on a credit card at 24% APR. Medical bill: payment plan at 18%. Lost job: credit card + stress + panic decisions.

With an emergency fund: car breaks down. You pay cash. Done.

The difference isn't just financial - it's how you feel. Financial stress is genuinely one of the leading causes of relationship problems and bad decision-making. The emergency fund doesn't just protect your bank account; it protects your ability to think straight.

**The goal at your stage:**

You probably don't have 3-6 months of expenses to set aside yet. That's fine. But the habit starts now:

1. Get your first real job (even part-time)
2. Before anything else - before fun spending, before investing - save $500
3. Then $1,000
4. Keep building from there

By the time you're 18-20 and living more independently, you want this buffer in place *before* you need it, not scrambling to build it after something breaks.

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
    description: 'Got an allowance? Here\'s how it actually works - and how to make it grow.',
    color: 'emerald',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    badgeClass: 'bg-emerald-100 text-emerald-800',
    buttonClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  2: {
    label: 'Building Blocks',
    grades: 'Grades 7-8',
    description: 'The math trick worth more than any test grade - and what you need to know before you turn 18.',
    color: 'blue',
    bgClass: 'bg-blue-50',
    borderClass: 'border-blue-200',
    badgeClass: 'bg-blue-100 text-blue-800',
    buttonClass: 'bg-blue-600 hover:bg-blue-700',
  },
  3: {
    label: 'Decisions',
    grades: 'Grades 9-10',
    description: 'Getting your first job soon. The financial decisions you\'re about to make - here\'s what to know first.',
    color: 'violet',
    bgClass: 'bg-violet-50',
    borderClass: 'border-violet-200',
    badgeClass: 'bg-violet-100 text-violet-800',
    buttonClass: 'bg-violet-600 hover:bg-violet-700',
  },
  4: {
    label: 'Reality Check',
    grades: 'Grades 11-12',
    description: 'The math behind apps designed to take your money - and the playbook for building wealth without a head start.',
    color: 'orange',
    bgClass: 'bg-orange-50',
    borderClass: 'border-orange-200',
    badgeClass: 'bg-orange-100 text-orange-800',
    buttonClass: 'bg-orange-600 hover:bg-orange-700',
  },
};
