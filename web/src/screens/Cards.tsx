import { useState } from 'react';
import { C, cardGrad } from '../theme/colors';
import { CARDS } from '../data/mockData';

const CATS = ['dining', 'groceries', 'travel', 'shopping', 'entertainment', 'other'];
const CAT_LABELS = ['Dining', 'Groceries', 'Travel', 'Shopping', 'Entertainment', 'Other'];
const CAT_EMOJI = ['🍽️', '🛒', '✈️', '🛍️', '🎬', '···'];

export default function Cards() {
  const [idx, setIdx] = useState(0);
  const card = CARDS[idx];

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', marginBottom: 20 }}>
        <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>My Cards</div>
        <div style={{ background: C.surfaceEl, borderRadius: 20, padding: '5px 12px', color: C.textSec, fontSize: 13, fontWeight: 600 }}>{CARDS.length} cards</div>
      </div>

      {/* Card scroll */}
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 16px', marginBottom: 16, scrollSnapType: 'x mandatory' }}>
        {CARDS.map((c, i) => (
          <div key={c.id} onClick={() => setIdx(i)} style={{ flexShrink: 0, width: 'calc(100vw - 64px)', maxWidth: 360, scrollSnapAlign: 'start', background: cardGrad[c.gradKey], borderRadius: 20, padding: 22, height: 190, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: i === idx ? `2px solid ${C.success}` : '2px solid transparent', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', transition: 'border 0.2s' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>{c.issuer}</div>
                <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, marginTop: 2 }}>{c.name}</div>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700 }}>{c.network}</div>
            </div>
            <div style={{ width: 38, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.15)' }} />
            <div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, letterSpacing: 2, marginBottom: 8 }}>···· ···· ···· {c.lastFour}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {c.bestFor.slice(0, 2).map(t => (
                  <div key={t} style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 10px', color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 22 }}>
        {CARDS.map((_, i) => <div key={i} style={{ height: 6, borderRadius: 3, background: i === idx ? C.accent : C.surfaceHi, width: i === idx ? 20 : 6, transition: 'all 0.3s' }} />)}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', background: C.surface, margin: '0 16px', borderRadius: 16, padding: '18px 0', marginBottom: 22, border: `0.5px solid ${C.border}` }}>
        {[
          { val: `$${card.earned.toFixed(2)}`, label: 'Earned (May)' },
          { val: `${Math.max(...CATS.map(k => card.rewards[k]))}x`, label: 'Best Rate' },
          { val: card.bestFor[0], label: 'Best For' },
        ].map((s, i, arr) => (
          <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderRight: i < arr.length - 1 ? `0.5px solid ${C.border}` : 'none' }}>
            <div style={{ color: C.text, fontSize: 16, fontWeight: 700 }}>{s.val}</div>
            <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rewards by category */}
      <div style={{ color: C.text, fontSize: 19, fontWeight: 700, margin: '0 16px 14px', letterSpacing: -0.3 }}>Rewards by Category</div>
      <div style={{ background: C.surface, margin: '0 16px', borderRadius: 16, overflow: 'hidden', border: `0.5px solid ${C.border}`, marginBottom: 24 }}>
        {CATS.map((key, i) => {
          const rate = card.rewards[key];
          const maxRate = Math.max(...CARDS.map(c => c.rewards[key]));
          const isBest = rate === maxRate;
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: i < CATS.length - 1 ? `0.5px solid ${C.border}` : 'none', gap: 12 }}>
              <div style={{ fontSize: 18, width: 24, textAlign: 'center', flexShrink: 0 }}>{CAT_EMOJI[i]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 500, marginBottom: 6 }}>{CAT_LABELS[i]}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 4, background: C.surfaceHi, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(rate / 4) * 100}%`, background: C.accent, borderRadius: 2 }} />
                  </div>
                  <span style={{ color: C.textSec, fontSize: 12, fontWeight: 600, width: 24, textAlign: 'right' }}>{rate}x</span>
                </div>
              </div>
              {isBest && <div style={{ background: C.warningSoft, borderRadius: 10, padding: '3px 8px', display: 'flex', gap: 3, alignItems: 'center', border: `1px solid ${C.warning}44` }}><span style={{ fontSize: 10 }}>⭐</span><span style={{ color: C.warning, fontSize: 10, fontWeight: 700 }}>Best</span></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
