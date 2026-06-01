import { useState } from 'react';
import { C } from '../theme/colors';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <div onClick={onToggle} style={{ width: 51, height: 31, borderRadius: 16, background: on ? C.success : C.surfaceHi, cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 2, left: on ? 22 : 2, width: 27, height: 27, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.3)', transition: 'left 0.2s' }} />
    </div>
  );
}

function SettingRow({
  label,
  sub,
  toggle,
  onToggle,
}: {
  label: string;
  sub?: string;
  toggle?: boolean;
  onToggle?: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12 }}>
      <div style={{ flex: 1 }}>
        <div style={{ color: C.text, fontSize: 15, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>{sub}</div>}
      </div>
      {toggle !== undefined ? <Toggle on={toggle} onToggle={onToggle!} /> : <span style={{ color: C.textTer, fontSize: 18 }}>›</span>}
    </div>
  );
}

export default function Profile({
  smartPicksCount,
  totalRewards,
}: {
  smartPicksCount: number;
  totalRewards: number;
}) {
  const [onDevice, setOnDevice] = useState(true);
  const [location, setLocation] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [nudges, setNudges] = useState(false);

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '56px 16px 20px' }}>
      <div style={{ color: C.text, fontSize: 26, fontWeight: 700, letterSpacing: -0.5, marginBottom: 20 }}>Profile</div>

      <div style={{ background: 'linear-gradient(135deg, #0F1013, #1B1E24)', borderRadius: 20, padding: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ color: C.walletGreen, fontSize: 14, fontWeight: 700 }}>Wallet+</span>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>Prototype Settings</div>
          <div style={{ color: C.textSec, fontSize: 13 }}>Apple Wallet flow with smart card routing layered on top</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 30, fontWeight: 700 }}>{smartPicksCount}</div>
          <div style={{ color: C.textSec, fontSize: 11, fontWeight: 600 }}>smart picks</div>
        </div>
      </div>

      <div style={{ display: 'flex', background: C.surface, borderRadius: 16, padding: '18px 0', marginBottom: 28, border: `0.5px solid ${C.border}` }}>
        {[
          { val: `${smartPicksCount}`, label: 'Smart picks' },
          { val: `$${totalRewards.toFixed(2)}`, label: 'Rewards shown' },
          { val: '4', label: 'Cards linked' },
        ].map((stat, index, all) => (
          <div key={stat.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, borderRight: index < all.length - 1 ? `0.5px solid ${C.border}` : 'none' }}>
            <div style={{ color: C.text, fontSize: 17, fontWeight: 700 }}>{stat.val}</div>
            <div style={{ color: C.textSec, fontSize: 11, fontWeight: 500, textAlign: 'center' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>Privacy</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: `0.5px solid ${C.border}` }}>
        <SettingRow label="On-Device Processing" sub="Recommendation logic stays local to the device" toggle={onDevice} onToggle={() => setOnDevice((value) => !value)} />
        <div style={{ height: 0.5, background: C.border }} />
        <SettingRow label="Location Access" sub="Used only to infer merchant type at checkout" toggle={location} onToggle={() => setLocation((value) => !value)} />
      </div>

      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>Notifications</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 24, border: `0.5px solid ${C.border}` }}>
        <SettingRow label="Reward Alerts" sub="Notify when Wallet+ finds a better earning card" toggle={alerts} onToggle={() => setAlerts((value) => !value)} />
        <div style={{ height: 0.5, background: C.border }} />
        <SettingRow label="Checkout Nudges" sub="Keep manual override available in the stack" toggle={nudges} onToggle={() => setNudges((value) => !value)} />
      </div>

      <div style={{ color: C.textSec, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, marginLeft: 4 }}>About</div>
      <div style={{ background: C.surface, borderRadius: 16, overflow: 'hidden', marginBottom: 20, border: `0.5px solid ${C.border}` }}>
        {['How Wallet+ works', 'Design notes', 'Privacy summary'].map((label, index, all) => (
          <div key={label}>
            <SettingRow label={label} />
            {index < all.length - 1 && <div style={{ height: 0.5, background: C.border }} />}
          </div>
        ))}
      </div>

      {onDevice && (
        <div style={{ display: 'flex', gap: 8, padding: '0 4px' }}>
          <span style={{ color: C.success, fontSize: 14 }}>Private</span>
          <span style={{ color: C.textSec, fontSize: 12, lineHeight: 1.5 }}>This prototype assumes Wallet+ sits inside Apple Wallet without changing the privacy model users already expect.</span>
        </div>
      )}
      <div style={{ height: 30 }} />
    </div>
  );
}
