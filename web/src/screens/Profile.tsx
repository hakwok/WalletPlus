import { useState } from 'react';
import { C } from '../theme/colors';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ width: 51, height: 31, borderRadius: 16, background: on ? C.success : C.surfaceHi, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 27, height: 27, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.3)', transition: 'left 0.2s' }} />
    </div>
  );
}

function SettingRow({ icon, label, sub, toggle, onToggle }: { icon: string; label: string; sub?: string; toggle?: boolean; onToggle?: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>{sub}</div>}
      </div>
      {toggle !== undefined ? <Toggle on={toggle} onToggle={onToggle!} /> : <span style={{ color: C.textTer, fontSize: 18 }}>›</span>}
    </div>
  );
}

export default function Profile() {
  const [onDevice, setOnDevice] = useState(true);
  const [location, setLocation] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [nudges, setNudges] = useState(false);

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 16px 20px' }}>
      <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 20 }}>Profile</div>

      {/* Subscription card */}
      <div style={{ background: `linear-gradient(135deg, ${C.wpStart}, ${C.wpEnd})`, borderRadius: 20, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, boxShadow: `0 4px 20px ${C.wpStart}55` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>💳</span>
            <span style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>Wallet+</span>
          </div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Premium Plan</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>$3.99 / month</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 44 }}>✓</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 600 }}>Active</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', background: C.surface, borderRadius: 16, padding: '18px 0', marginBottom: 28, border: `0.5px solid ${C.border}` }}>
        {[{ val: '23', label: 'Smart picks' }, { val: '$62.30', label: 'Rewards earned' }, { val: '4', label: 'Cards linked' }].map((s, i, arr) => (
          <div key={s.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderRight: i < arr.length - 1 ? `0.5px solid ${C.border}` : 'none' }}>
            <div style={{ color: C.text, fontSize: 17, fontWeight: 700 }}>{s.val}</div>
            <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500, textAlign: 'center' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Privacy */}
      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>Privacy</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: `0.5px solid ${C.border}` }}>
        <SettingRow icon="🛡️" label="On-Device Processing" sub="All recommendation logic runs locally" toggle={onDevice} onToggle={() => setOnDevice(v => !v)} />
        <div style={{ height: 0.5, background: C.border }} />
        <SettingRow icon="📍" label="Location Access" sub="Used to detect merchant category" toggle={location} onToggle={() => setLocation(v => !v)} />
      </div>

      {/* Notifications */}
      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>Notifications</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: `0.5px solid ${C.border}` }}>
        <SettingRow icon="⭐" label="Reward Alerts" sub="Notify when you earn rewards" toggle={alerts} onToggle={() => setAlerts(v => !v)} />
        <div style={{ height: 0.5, background: C.border }} />
        <SettingRow icon="🔔" label="Checkout Nudges" sub="Remind to switch cards at checkout" toggle={nudges} onToggle={() => setNudges(v => !v)} />
      </div>

      {/* About */}
      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>About</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 20, border: `0.5px solid ${C.border}` }}>
        {['Privacy Policy', 'Terms of Service', 'How Recommendations Work'].map((label, i, arr) => (
          <div key={label}>
            <SettingRow icon="📄" label={label} />
            {i < arr.length - 1 && <div style={{ height: 0.5, background: C.border }} />}
          </div>
        ))}
      </div>

      {onDevice && (
        <div style={{ display: 'flex', gap: 8, padding: '0 4px' }}>
          <span style={{ color: C.success, fontSize: 14 }}>🛡️</span>
          <span style={{ color: C.textSec, fontSize: 12, lineHeight: 1.5 }}>On-device processing is active. Your financial data never leaves this device.</span>
        </div>
      )}
      <div style={{ height: 30 }} />
    </div>
  );
}
