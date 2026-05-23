import { useState, useEffect, CSSProperties } from 'react';
import { C, cardGrad } from '../theme/colors';
import { CARDS, CHECKOUT } from '../data/mockData';

type Props = { onClose: () => void };

export default function CheckoutModal({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedId, setSelectedId] = useState(CHECKOUT.recommendedCardId);

  const selected = CARDS.find(c => c.id === selectedId)!;
  const rate = selected.rewards[CHECKOUT.category] ?? 1;
  const rewardsEarned = (CHECKOUT.amount * rate) / 100;

  useEffect(() => {
    if (step === 1) {
      const t = setTimeout(() => setStep(2), 2200);
      return () => clearTimeout(t);
    }
  }, [step]);

  const overlay: CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)',
    zIndex: 200, display: 'flex', flexDirection: 'column',
    justifyContent: 'flex-end', animation: 'fadeIn 0.25s ease',
  };
  const sheet: CSSProperties = {
    background: C.surface, borderRadius: '24px 24px 0 0',
    padding: '0 20px 40px', minHeight: '72vh',
    animation: 'slideUp 0.3s ease',
  };

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && step === 2 && onClose()}>
      <div style={sheet}>
        <div style={{ width: 36, height: 4, background: C.surfaceHi, borderRadius: 2, margin: '12px auto 16px' }} />

        {step === 0 && (
          <>
            {/* Location banner */}
            <div style={{ background: 'linear-gradient(90deg, rgba(123,47,190,0.3), rgba(74,144,217,0.1))', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <span>📍</span>
              <div>
                <div style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>Detected: {CHECKOUT.merchant}</div>
                <div style={{ color: C.textSec, fontSize: 11 }}>{CHECKOUT.location}</div>
              </div>
            </div>

            {/* Category pill */}
            <div style={{ display: 'flex', marginBottom: 14 }}>
              <div style={{ background: C.surfaceEl, borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>{CHECKOUT.emoji}</span>
                <span style={{ color: C.text, fontSize: 13, fontWeight: 600 }}>{CHECKOUT.categoryLabel}</span>
              </div>
            </div>

            {/* Recommend badge */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ background: `linear-gradient(90deg, ${C.wpStart}, ${C.wpEnd})`, borderRadius: 20, padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 11 }}>✦</span>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Wallet+ Recommends</span>
              </div>
            </div>

            {/* Selected card */}
            <div style={{ background: cardGrad[selected.gradKey], borderRadius: 20, padding: 22, marginBottom: 12, border: `2px solid ${selectedId === selected.id ? C.success : 'transparent'}`, position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1 }}>{selected.issuer}</div>
                  <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{selected.name}</div>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 700 }}>{selected.network}</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, letterSpacing: 2 }}>···· ···· ···· {selected.lastFour}</div>
            </div>
            <div style={{ color: C.textSec, fontSize: 13, marginBottom: 16, paddingLeft: 4 }}>⭐ {CHECKOUT.reason}</div>

            {/* Other cards */}
            <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>Other cards</div>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', marginBottom: 22 }}>
              {CARDS.filter(c => c.id !== selectedId).map(card => (
                <div key={card.id} onClick={() => setSelectedId(card.id)} style={{ flexShrink: 0, background: cardGrad[card.gradKey], borderRadius: 10, padding: 8, width: 80, height: 52, cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 8, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>{card.issuer}</div>
                  <div style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>···{card.lastFour}</div>
                </div>
              ))}
            </div>

            {/* Pay button */}
            <button onClick={() => setStep(1)} style={{ width: '100%', background: `linear-gradient(90deg, ${C.accent}, #005DC9)`, border: 'none', borderRadius: 16, padding: '18px', color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer', marginBottom: 12 }}>
              Pay ${CHECKOUT.amount.toFixed(2)}
            </button>
            <button onClick={onClose} style={{ width: '100%', background: 'none', border: 'none', color: C.textSec, fontSize: 16, fontWeight: 500, cursor: 'pointer', padding: '10px' }}>
              Cancel
            </button>
          </>
        )}

        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', gap: 16 }}>
            <div style={{ fontSize: 44, fontWeight: 700, color: C.text, letterSpacing: -1.5 }}>${CHECKOUT.amount.toFixed(2)}</div>
            <div style={{ color: C.textSec, fontSize: 17 }}>{CHECKOUT.merchant}</div>
            <div style={{ width: 110, height: 110, borderRadius: '50%', border: `2px solid ${C.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '24px 0', animation: 'pulse 1.4s ease-in-out infinite' }}>
              <div style={{ width: 90, height: 90, borderRadius: '50%', background: C.surfaceEl, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42 }}>
                🔒
              </div>
            </div>
            <div style={{ color: C.text, fontSize: 17, fontWeight: 600 }}>Double-click to confirm</div>
            <div style={{ color: C.textSec, fontSize: 14 }}>{selected.issuer} ···{selected.lastFour}</div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', gap: 12 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${C.success}, #1FA644)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', marginBottom: 8, boxShadow: `0 0 30px ${C.success}66` }}>
              ✓
            </div>
            <div style={{ color: C.text, fontSize: 24, fontWeight: 700 }}>Payment Confirmed</div>
            <div style={{ color: C.textSec, fontSize: 16 }}>{CHECKOUT.merchant}</div>
            <div style={{ color: C.text, fontSize: 38, fontWeight: 700, letterSpacing: -1 }}>${CHECKOUT.amount.toFixed(2)}</div>
            <div style={{ color: C.textSec, fontSize: 14 }}>💳 {selected.issuer} {selected.name} ···{selected.lastFour}</div>
            <div style={{ background: C.warningSoft, borderRadius: 20, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, border: `1px solid ${C.warning}44` }}>
              <span>⭐</span>
              <span style={{ color: C.warning, fontSize: 14, fontWeight: 600 }}>+${rewardsEarned.toFixed(2)} in rewards earned</span>
            </div>
            <button onClick={onClose} style={{ background: C.surfaceEl, border: 'none', borderRadius: 14, padding: '14px 48px', color: C.text, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 16 }}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
