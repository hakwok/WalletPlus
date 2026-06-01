import { useState } from 'react';
import { C } from '../theme/colors';
import { CARDS, SPEND_CATS, TOTAL_SPEND, TOTAL_EARNED } from '../data/mockData';

function DonutChart() {
  const r = 72;
  const sw = 24;
  const circ = 2 * Math.PI * r;
  let cumulative = 0;
  const segments = SPEND_CATS.map((cat) => {
    const pct = cat.amount / TOTAL_SPEND;
    const dash = pct * circ;
    const offset = -cumulative + circ * 0.25;
    cumulative += dash;
    return { ...cat, dash, offset };
  });

  return (
    <div style={{ position: 'relative', width: 190, height: 190, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="190" height="190" style={{ position: 'absolute' }}>
        <circle cx="95" cy="95" r={r} fill="none" stroke={C.surfaceEl} strokeWidth={sw} />
        {segments.map((seg) => (
          <circle
            key={seg.key}
            cx="95"
            cy="95"
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={sw - 2}
            strokeDasharray={`${seg.dash - 2} ${circ - seg.dash + 2}`}
            strokeDashoffset={-seg.offset + circ * 0.25}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '95px 95px' }}
          />
        ))}
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div style={{ color: C.text, fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>${TOTAL_SPEND.toLocaleString()}</div>
        <div style={{ color: C.textSec, fontSize: 11, marginTop: 2 }}>total spent</div>
      </div>
    </div>
  );
}

export default function Insights({ smartPicksCount }: { smartPicksCount: number }) {
  const [tab, setTab] = useState<'spending' | 'rewards'>('spending');
  const totalMissed = SPEND_CATS.reduce((sum, cat) => sum + cat.missed, 0);

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Insights</div>
        <div style={{ background: C.surface, borderRadius: 20, padding: '5px 10px', display: 'flex', gap: 5, alignItems: 'center', border: `0.5px solid ${C.border}` }}>
          <span style={{ fontSize: 12 }}>June</span>
          <span style={{ color: C.textSec, fontSize: 12, fontWeight: 500 }}>2026</span>
        </div>
      </div>

      <div style={{ display: 'flex', background: C.surface, borderRadius: 12, padding: 3, marginBottom: 22, border: `0.5px solid ${C.border}` }}>
        {(['spending', 'rewards'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setTab(view)}
            style={{
              flex: 1,
              padding: '9px',
              background: tab === view ? C.surfaceEl : 'none',
              borderRadius: 10,
              border: 'none',
              color: tab === view ? C.text : C.textSec,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'spending' && (
        <>
          <div style={{ background: C.surface, borderRadius: 20, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, marginBottom: 16, border: `0.5px solid ${C.border}` }}>
            <DonutChart />
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SPEND_CATS.map((cat) => (
                <div key={cat.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 500, flex: 1 }}>{cat.label}</span>
                  <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>${cat.amount}</span>
                  <span style={{ color: C.textSec, fontSize: 12, width: 36, textAlign: 'right' }}>{Math.round((cat.amount / TOTAL_SPEND) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>

          {totalMissed > 0 && (
            <div style={{ background: C.warningSoft, borderRadius: 14, padding: 14, display: 'flex', gap: 12, marginBottom: 22, border: `0.5px solid ${C.warning}44` }}>
              <div>
                <div style={{ color: C.warning, fontSize: 14, fontWeight: 700, marginBottom: 2 }}>You missed ${totalMissed.toFixed(2)} in rewards</div>
                <div style={{ color: C.textSec, fontSize: 13 }}>Wallet+ is designed to reduce that gap while keeping the familiar Wallet flow.</div>
              </div>
            </div>
          )}

          <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>Wallet+ Recommendations</div>
          {SPEND_CATS.filter((cat) => cat.missed > 0).map((cat) => {
            const best = CARDS.find((card) => card.id === cat.bestCardId)!;
            return (
              <div key={cat.key} style={{ background: C.surface, borderRadius: 14, padding: 16, marginBottom: 10, border: `0.5px solid ${C.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: C.text, fontSize: 14, fontWeight: 700, flex: 1 }}>{cat.label}</span>
                  <div style={{ background: C.accentSoft, borderRadius: 10, padding: '3px 8px' }}>
                    <span style={{ color: C.wpMid, fontSize: 10, fontWeight: 700 }}>Tip</span>
                  </div>
                </div>
                <div style={{ color: C.textSec, fontSize: 13, lineHeight: 1.5 }}>
                  Use <span style={{ color: C.text, fontWeight: 600 }}>{best.issuer} {best.name}</span> for {cat.label.toLowerCase()} to earn <span style={{ color: C.text, fontWeight: 600 }}>{best.rewards[cat.key]}x points</span> and recover <span style={{ color: C.text, fontWeight: 600 }}>${cat.missed.toFixed(2)}/mo</span>.
                </div>
              </div>
            );
          })}
        </>
      )}

      {tab === 'rewards' && (
        <>
          <div style={{ display: 'flex', background: C.surface, borderRadius: 16, padding: '18px 0', marginBottom: 22, border: `0.5px solid ${C.border}` }}>
            {[
              { val: `$${TOTAL_EARNED.toFixed(2)}`, label: 'Earned', color: C.success },
              { val: `$${totalMissed.toFixed(2)}`, label: 'Missed', color: C.warning },
              { val: `$${(TOTAL_EARNED + totalMissed).toFixed(2)}`, label: 'Potential', color: C.accent },
            ].map((stat, index, all) => (
              <div key={stat.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderRight: index < all.length - 1 ? `0.5px solid ${C.border}` : 'none' }}>
                <div style={{ color: stat.color, fontSize: 18, fontWeight: 700 }}>{stat.val}</div>
                <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{ color: C.text, fontSize: 19, fontWeight: 700, marginBottom: 14, letterSpacing: -0.3 }}>By Card</div>
          {CARDS.map((card) => {
            const potential = card.earned * 1.3;
            const pct = (card.earned / potential) * 100;
            return (
              <div key={card.id} style={{ background: C.surface, borderRadius: 14, padding: 16, marginBottom: 10, border: `0.5px solid ${C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ color: C.text, fontSize: 14, fontWeight: 600 }}>{card.issuer} {card.name}</span>
                  <span style={{ color: C.success, fontSize: 14, fontWeight: 700 }}>${card.earned.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', height: 6, borderRadius: 3, overflow: 'hidden', background: C.surfaceEl, marginBottom: 8 }}>
                  <div style={{ width: `${pct}%`, background: C.success, borderRadius: 3 }} />
                  <div style={{ flex: 1, background: C.warningSoft }} />
                </div>
                <div style={{ color: C.textSec, fontSize: 12 }}>${potential.toFixed(2)} potential with smarter card routing</div>
              </div>
            );
          })}

          <div style={{ background: 'linear-gradient(135deg, rgba(79,125,247,0.16), rgba(124,199,255,0.08))', borderRadius: 16, padding: 18, display: 'flex', gap: 14, alignItems: 'center', marginTop: 8, border: `0.5px solid ${C.wpStart}44` }}>
            <div>
              <div style={{ color: C.text, fontSize: 14, fontWeight: 700, marginBottom: 3 }}>Wallet+ has handled {smartPicksCount} smart picks</div>
              <div style={{ color: C.textSec, fontSize: 12 }}>The wallet stack stays familiar while Wallet+ changes which card reaches the top.</div>
            </div>
          </div>
        </>
      )}
      <div style={{ height: 20 }} />
    </div>
  );
}
