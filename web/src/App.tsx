import { useState } from 'react';
import { C } from './theme/colors';
import Wallet from './screens/Wallet';
import Activity from './screens/Home';
import Insights from './screens/Insights';
import Profile from './screens/Profile';
import {
  TRANSACTIONS,
  type Scenario,
  type Transaction,
  getRewardsEarned,
} from './data/mockData';

type Tab = 'wallet' | 'activity' | 'insights' | 'profile';

const TABS: { id: Tab; label: string }[] = [
  { id: 'wallet', label: 'Wallet' },
  { id: 'activity', label: 'Activity' },
  { id: 'insights', label: 'Insights' },
  { id: 'profile', label: 'Profile' },
];

function createTransactionFromPayment(
  scenario: Scenario,
  cardId: string,
  paymentNumber: number,
): Transaction {
  return {
    id: `live-${paymentNumber}`,
    merchant: scenario.merchant,
    category: scenario.category,
    emoji: scenario.shortLabel,
    amount: scenario.amount,
    cardId,
    rewardsEarned: getRewardsEarned(cardId, scenario.category, scenario.amount),
    date: 'Just now',
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('wallet');
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(TRANSACTIONS);

  const handlePaymentComplete = (scenario: Scenario, cardId: string) => {
    setRecentTransactions((current) => [
      createTransactionFromPayment(scenario, cardId, current.length + 1),
      ...current,
    ]);
  };

  const paymentCount = Math.max(0, recentTransactions.length - TRANSACTIONS.length);
  const smartPicksCount = 23 + paymentCount;
  const totalRewards = recentTransactions.reduce((sum, tx) => sum + tx.rewardsEarned, 0);

  const screens: Record<Tab, JSX.Element> = {
    wallet: <Wallet onPaymentComplete={handlePaymentComplete} />,
    activity: <Activity transactions={recentTransactions} />,
    insights: <Insights smartPicksCount={smartPicksCount} />,
    profile: <Profile smartPicksCount={smartPicksCount} totalRewards={totalRewards} />,
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: C.appleFont,
        background: 'linear-gradient(180deg, #050607 0%, #000 100%)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 402,
          height: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: C.bg,
          boxShadow: '0 18px 40px rgba(0,0,0,0.34)',
        }}
      >
        <div style={{ flex: 1, overflow: 'hidden', paddingBottom: 92 }}>{screens[activeTab]}</div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 92,
            background: 'rgba(11,12,14,0.96)',
            backdropFilter: 'blur(26px)',
            WebkitBackdropFilter: 'blur(26px)',
            borderTop: `1px solid ${C.border}`,
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: 10,
          }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '2px 0',
                }}
              >
                <TabIcon id={tab.id} active={active} />
                <span style={{ color: active ? C.text : C.textTer, fontSize: 10, fontWeight: active ? 700 : 500 }}>
                  {tab.label}
                </span>
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

  if (id === 'wallet') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="10" rx="3.2" stroke={color} strokeWidth={active ? 2.2 : 1.8} />
        <rect x="5.5" y="10.5" width="13" height="8.5" rx="2.8" stroke={color} strokeWidth={active ? 2 : 1.6} opacity={active ? 1 : 0.9} />
      </svg>
    );
  }
  if (id === 'activity') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M5 17h14" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
        <path d="M7.5 17V9.5" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
        <path d="M12 17V6" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
        <path d="M16.5 17v-4.5" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'insights') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path d="M12 4a8 8 0 1 0 8 8" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 4v8h8" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={active ? 2.2 : 1.8} />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth={active ? 2.2 : 1.8} strokeLinecap="round" />
    </svg>
  );
}
