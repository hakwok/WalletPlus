import { useState } from 'react';
import { C } from './theme/colors';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Cards from './screens/Cards';
import Insights from './screens/Insights';
import Profile from './screens/Profile';

type Tab = 'home' | 'cards' | 'insights' | 'profile';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Home', icon: '⊙' },
  { id: 'cards', label: 'Cards', icon: '▭' },
  { id: 'insights', label: 'Insights', icon: '◈' },
  { id: 'profile', label: 'Profile', icon: '◎' },
];

export default function App() {
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  if (!onboardingDone) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <div style={{ width: '100%', maxWidth: 390, height: '100%', position: 'relative', overflow: 'hidden' }}>
          <Onboarding onDone={() => setOnboardingDone(true)} />
        </div>
      </div>
    );
  }

  const screens: Record<Tab, JSX.Element> = {
    home: <Home />,
    cards: <Cards />,
    insights: <Insights />,
    profile: <Profile />,
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
      <div style={{ width: '100%', maxWidth: 390, height: '100%', position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: C.bg }}>
        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 82 }}>
          {screens[activeTab]}
        </div>

        {/* Bottom tab bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 82,
          background: `${C.surface}ee`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: `0.5px solid ${C.border}`,
          display: 'flex',
          alignItems: 'flex-start',
          paddingTop: 10,
        }}>
          {TABS.map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '2px 0',
                }}
              >
                <TabIcon id={tab.id} active={active} />
                <span style={{ color: active ? C.accent : C.textTer, fontSize: 10, fontWeight: active ? 600 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TabIcon({ id, active }: { id: Tab; active: boolean }) {
  const color = active ? C.accent : C.textTer;
  const size = 24;

  if (id === 'home') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M3 12L12 4l9 8" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === 'cards') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="3" stroke={color} strokeWidth={active ? 2.2 : 1.8} />
        <path d="M2 10h20" stroke={color} strokeWidth={active ? 2.2 : 1.8} />
        <rect x="5" y="14" width="4" height="2" rx="0.5" fill={color} />
      </svg>
    );
  }
  if (id === 'insights') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M18 20V10" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
        <path d="M12 20V4" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
        <path d="M6 20v-6" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
      </svg>
    );
  }
  // profile
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={active ? 2.2 : 1.8} />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
    </svg>
  );
}
