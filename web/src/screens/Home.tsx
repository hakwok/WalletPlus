import { C } from '../theme/colors';
import { CARDS, SPEND_CATS, REWARDS_GOAL, type Transaction } from '../data/mockData';

function RewardRing({ earned, goal }: { earned: number; goal: number }) {
  const r = 54;
  const sw = 12;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(earned / goal, 1);
  const offset = circ * (1 - pct);

  return (
    <div style={{ position: 'relative', width: 130, height: 130, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="130" height="130" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.wpStart} />
            <stop offset="100%" stopColor={C.wpEnd} />
          </linearGradient>
        </defs>
        <circle cx="65" cy="65" r={r} fill="none" stroke={C.surfaceEl} strokeWidth={sw} />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke="url(#rg)"
          strokeWidth={sw}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -1 }}>${Math.round(earned)}</div>
        <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500, marginTop: 2 }}>earned</div>
      </div>
    </div>
  );
}

export default function Home({ transactions }: { transactions: Transaction[] }) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const totalEarned = transactions.reduce((sum, tx) => sum + tx.rewardsEarned, 0);

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Activity</div>
          <div style={{ color: C.textSec, fontSize: 13, marginTop: 2 }}>
            {greeting}. Payments stay in Wallet, and every completed tap lands here automatically.
          </div>
        </div>
        <div style={{ background: C.surfaceEl, borderRadius: 20, padding: '6px 12px', fontSize: 13, fontWeight: 700, color: C.textSec }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(145deg, #151B2C, #10233E 58%, #0C3159)',
          borderRadius: 24,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
          boxShadow: `0 10px 30px ${C.walletGlow}`,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
            June rewards
          </div>
          <RewardRing earned={totalEarned} goal={REWARDS_GOAL} />
          <div style={{ color: 'rgba(255,255,255,0.42)', fontSize: 11, marginTop: 6 }}>Goal: ${REWARDS_GOAL}</div>
        </div>
        <div style={{ flex: 1, paddingLeft: 16 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>
            By card
          </div>
          {CARDS.slice(0, 3).map((card) => (
            <div key={card.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
              <div style={{ color: 'rgba(255,255,255,0.82)', fontSize: 12, flex: 1 }}>{card.issuer}</div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>
                ${transactions.filter((tx) => tx.cardId === card.id).reduce((sum, tx) => sum + tx.rewardsEarned, 0).toFixed(0)}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>Spending This Month</div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 22, paddingBottom: 4 }}>
        {SPEND_CATS.map((cat) => (
          <div
            key={cat.key}
            style={{
              flexShrink: 0,
              background: C.surface,
              borderRadius: 16,
              padding: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 5,
              minWidth: 100,
              border: `1px solid ${C.border}`,
            }}
          >
            <div style={{ color: C.textSec, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.7 }}>{cat.label}</div>
            <div style={{ color: C.text, fontSize: 18, fontWeight: 700 }}>${cat.amount}</div>
            <div style={{ color: cat.color, fontSize: 12, fontWeight: 600 }}>Best with {CARDS.find((card) => card.id === cat.bestCardId)!.issuer}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, rgba(79,125,247,0.18), rgba(124,199,255,0.06))',
          borderRadius: 18,
          padding: '16px 18px',
          marginBottom: 26,
          border: `1px solid ${C.border}`,
        }}
      >
        <div style={{ color: C.text, fontSize: 16, fontWeight: 700, marginBottom: 6 }}>Auto-recorded from Wallet</div>
        <div style={{ color: C.textSec, fontSize: 13, lineHeight: 1.55 }}>
          Payments now complete directly from the wallet stack, and the newest transaction appears here as soon as the simulated tap finishes.
        </div>
      </div>

      <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>Recent Transactions</div>
      <div style={{ background: C.surface, borderRadius: 18, overflow: 'hidden', border: `1px solid ${C.border}` }}>
        {transactions.map((tx, index) => {
          const card = CARDS.find((item) => item.id === tx.cardId)!;

          return (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: index < transactions.length - 1 ? `1px solid ${C.hairline}` : 'none',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: C.surfaceEl,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.textSec,
                  flexShrink: 0,
                }}
              >
                {tx.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{tx.merchant}</div>
                <div style={{ color: C.textSec, fontSize: 11 }}>
                  {card.issuer} ....{card.lastFour} - {tx.date}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>-${tx.amount.toFixed(2)}</div>
                <div style={{ color: C.success, fontSize: 11, fontWeight: 500, marginTop: 2 }}>+${tx.rewardsEarned.toFixed(2)} pts</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
