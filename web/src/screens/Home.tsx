import { useState } from 'react';
import { C } from '../theme/colors';
import { CARDS, TRANSACTIONS, SPEND_CATS, TOTAL_EARNED, REWARDS_GOAL } from '../data/mockData';
import CheckoutModal from '../components/CheckoutModal';

function RewardRing({ earned, goal }: { earned: number; goal: number }) {
  const r = 54, sw = 12, circ = 2 * Math.PI * r;
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
        <circle cx="65" cy="65" r={r} fill="none" stroke="url(#rg)" strokeWidth={sw} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -1 }}>${Math.round(earned)}</div>
        <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500, marginTop: 2 }}>earned</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [checkout, setCheckout] = useState(false);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 16px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>{greeting}</div>
          <div style={{ color: C.textSec, fontSize: 13, marginTop: 2 }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        </div>
        <div style={{ background: `linear-gradient(135deg, ${C.wpStart}, ${C.wpEnd})`, borderRadius: 20, padding: '6px 12px', fontSize: 13, fontWeight: 700, color: '#fff' }}>Wallet+</div>
      </div>

      {/* Rewards Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', marginBottom: 24, boxShadow: `0 4px 24px ${C.wpStart}44` }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>May Rewards</div>
          <RewardRing earned={TOTAL_EARNED} goal={REWARDS_GOAL} />
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginTop: 6 }}>Goal: ${REWARDS_GOAL}</div>
        </div>
        <div style={{ flex: 1, paddingLeft: 16 }}>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>This Month</div>
          {CARDS.slice(0, 3).map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.accent, flexShrink: 0 }} />
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, flex: 1 }}>{c.issuer}</div>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>${c.earned.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spending categories */}
      <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>Spending This Month</div>
      <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 22, paddingBottom: 4 }}>
        {SPEND_CATS.map(cat => (
          <div key={cat.key} style={{ flexShrink: 0, background: C.surface, borderRadius: 14, padding: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 84, border: `0.5px solid ${C.border}` }}>
            <div style={{ fontSize: 20 }}>{cat.emoji}</div>
            <div style={{ color: C.textSec, fontSize: 10, fontWeight: 500 }}>{cat.label}</div>
            <div style={{ color: cat.color, fontSize: 13, fontWeight: 700 }}>${cat.amount}</div>
          </div>
        ))}
      </div>

      {/* Pay Now */}
      <button onClick={() => setCheckout(true)} style={{ width: '100%', background: `linear-gradient(90deg, ${C.wpStart}, ${C.wpEnd})`, border: 'none', borderRadius: 16, padding: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 26, boxShadow: `0 4px 16px ${C.wpStart}55` }}>
        <span style={{ fontSize: 20 }}>📱</span>
        <div style={{ textAlign: 'left' }}>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Pay with Wallet+</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 1 }}>Best card selected automatically</div>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: 'auto', fontSize: 18 }}>›</span>
      </button>

      {/* Transactions */}
      <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>Recent Transactions</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', border: `0.5px solid ${C.border}` }}>
        {TRANSACTIONS.map((tx, i) => {
          const card = CARDS.find(c => c.id === tx.cardId)!;
          return (
            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: i < TRANSACTIONS.length - 1 ? `0.5px solid ${C.border}` : 'none', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.surfaceEl, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{tx.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 14, fontWeight: 600, marginBottom: 3 }}>{tx.merchant}</div>
                <div style={{ color: C.textSec, fontSize: 11 }}>{card.issuer} ···{card.lastFour} · {tx.date}</div>
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
      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
    </div>
  );
}
