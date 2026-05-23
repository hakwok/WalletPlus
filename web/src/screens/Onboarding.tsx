import { useState, CSSProperties } from 'react';
import { C } from '../theme/colors';

const SLIDES = [
  { title: 'Meet Wallet+', sub: 'Your cards are already in Wallet.\nNow let them work smarter.', icon: '💳', grad: `linear-gradient(135deg, ${C.wpStart}, ${C.wpEnd})`,
    features: [['✦', 'Smart card recommendation at every checkout'], ['📍', 'Location-aware merchant detection'], ['🔒', 'All processed on-device, privately']] },
  { title: 'Always the\nRight Card', sub: 'Double-tap, and Wallet+ has already picked\nthe card that earns you the most.', icon: '💰', grad: 'linear-gradient(135deg, #1a3a6b, #4A90D9)',
    features: [['☕', '4x points at Blue Bottle Coffee'], ['🛒', '4x points at Whole Foods'], ['✈️', '2x points on United Airlines']] },
  { title: 'Your Rewards,\nMaximized', sub: 'See where you\'re earning and where\nyou\'re leaving money on the table.', icon: '📊', grad: 'linear-gradient(135deg, #1a4a2e, #30D158)',
    features: [['📈', 'Monthly rewards dashboard'], ['📉', 'Spending insights by category'], ['🔔', 'Real-time reward alerts']] },
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const slide = SLIDES[idx];

  const hero: CSSProperties = { background: slide.grad, height: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'background 0.4s ease' };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.bg, overflow: 'hidden' }}>
      <div style={hero}>
        <div style={{ position: 'absolute', top: 56, left: 24, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 18 }}>💳</span>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Wallet+</span>
        </div>
        <div style={{ width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 }}>
          {slide.icon}
        </div>
      </div>

      <div style={{ flex: 1, padding: '28px 28px 0', overflowY: 'auto' }}>
        <h1 style={{ color: C.text, fontSize: 32, fontWeight: 700, letterSpacing: -1, marginBottom: 12, whiteSpace: 'pre-line' }}>{slide.title}</h1>
        <p style={{ color: C.textSec, fontSize: 15, lineHeight: 1.6, marginBottom: 28, whiteSpace: 'pre-line' }}>{slide.sub}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {slide.features.map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{icon}</div>
              <span style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 24px 40px', background: C.bg }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ height: 6, borderRadius: 3, background: i === idx ? C.wpMid : C.surfaceHi, width: i === idx ? 22 : 6, transition: 'all 0.3s', cursor: 'pointer' }} />
          ))}
        </div>

        {idx < 2 ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button onClick={onDone} style={{ background: 'none', border: 'none', color: C.textSec, fontSize: 16, fontWeight: 500, cursor: 'pointer', padding: '14px 8px' }}>Skip</button>
            <button onClick={() => setIdx(i => i + 1)} style={{ background: `linear-gradient(90deg, ${C.wpStart}, ${C.wpEnd})`, border: 'none', borderRadius: 14, padding: '14px 24px', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              Next →
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={onDone} style={{ background: `linear-gradient(90deg, ${C.wpStart}, ${C.wpEnd})`, border: 'none', borderRadius: 16, padding: 18, color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              Try Wallet+ Free<br /><span style={{ fontSize: 12, opacity: 0.7 }}>$3.99/mo after trial</span>
            </button>
            <button onClick={onDone} style={{ background: 'none', border: 'none', color: C.textSec, fontSize: 15, cursor: 'pointer', padding: '10px' }}>Maybe later</button>
          </div>
        )}
      </div>
    </div>
  );
}
