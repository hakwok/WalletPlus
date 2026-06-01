import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { C, cardGrad } from '../theme/colors';
import {
  CARDS,
  SCENARIOS,
  getCardById,
  getRewardsEarned,
  getScenarioById,
  type Scenario,
} from '../data/mockData';

type PaymentPhase = 'idle' | 'arming' | 'paid';

function WalletHeaderIcon({ kind }: { kind: 'stack' | 'plus' }) {
  if (kind === 'plus') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 3.25v11.5M3.25 9h11.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="13" height="13" rx="2.5" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M9 2.8v12.4M2.8 9h12.4" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function ScenarioChip({
  scenario,
  active,
  onClick,
}: {
  scenario: Scenario;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: active ? '1px solid rgba(255,255,255,0.24)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: 999,
        background: active ? '#1C1C1E' : '#111214',
        color: active ? C.text : C.textSec,
        padding: '8px 12px',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: -0.1,
        cursor: 'pointer',
      }}
    >
      {scenario.shortLabel}
    </button>
  );
}

function CardFace({
  cardId,
  expanded,
  promoted,
  onClick,
  style,
}: {
  cardId: string;
  expanded: boolean;
  promoted: boolean;
  onClick: () => void;
  style: CSSProperties;
}) {
  const card = getCardById(cardId);

  return (
    <button
      onClick={onClick}
      style={{
        ...style,
        position: 'absolute',
        left: 0,
        right: 0,
        width: '100%',
        border: expanded ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0.05)',
        borderRadius: 14,
        background: cardGrad[card.gradKey],
        color: '#fff',
        cursor: 'pointer',
        textAlign: 'left',
        overflow: 'hidden',
        boxShadow: expanded ? '0 24px 38px rgba(0,0,0,0.34)' : '0 12px 18px rgba(0,0,0,0.22)',
        padding: expanded ? 18 : '14px 16px',
      }}
    >
      {!expanded ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.3, opacity: 0.92 }}>{card.issuer.toUpperCase()}</div>
            <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.88, marginTop: 3 }}>{card.name}</div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.82 }}>.... {card.lastFour}</div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ fontSize: 10, letterSpacing: 0.9, fontWeight: 700, opacity: 0.62 }}>
                {card.issuer === 'Apple' ? 'APPLE CARD' : card.issuer.toUpperCase()}
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.7 }}>{card.name}</div>
            </div>
            {promoted && (
              <div
                style={{
                  background: 'rgba(255,255,255,0.16)',
                  borderRadius: 999,
                  padding: '5px 9px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 0.2,
                }}
              >
                Wallet+ pick
              </div>
            )}
          </div>

          <div
            style={{
              width: 34,
              height: 26,
              borderRadius: 7,
              background: 'rgba(255,255,255,0.22)',
              border: '1px solid rgba(255,255,255,0.14)',
              marginBottom: 66,
            }}
          />

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 15, letterSpacing: 2, opacity: 0.92 }}>.... .... .... {card.lastFour}</div>
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.66 }}>{card.network}</div>
          </div>
        </>
      )}
    </button>
  );
}

export default function Wallet({
  onPaymentComplete,
}: {
  onPaymentComplete: (scenario: Scenario, cardId: string) => void;
}) {
  const [scenarioId, setScenarioId] = useState<Scenario['id']>('coffee');
  const [selectedCardId, setSelectedCardId] = useState(SCENARIOS[0].recommendedCardId);
  const [paymentPhase, setPaymentPhase] = useState<PaymentPhase>('idle');
  const [statusText, setStatusText] = useState('Ready');

  const scenario = getScenarioById(scenarioId);

  useEffect(() => {
    setSelectedCardId(scenario.recommendedCardId);
    setPaymentPhase('idle');
    setStatusText('Ready');
  }, [scenario.recommendedCardId]);

  const selectedCard = getCardById(selectedCardId);
  const recommendedCard = getCardById(scenario.recommendedCardId);
  const defaultCard = getCardById(scenario.defaultCardId);
  const selectedRewards = getRewardsEarned(selectedCard.id, scenario.category, scenario.amount);
  const recommendedRewards = getRewardsEarned(recommendedCard.id, scenario.category, scenario.amount);
  const defaultRewards = getRewardsEarned(defaultCard.id, scenario.category, scenario.amount);
  const selectedIsRecommended = selectedCard.id === recommendedCard.id;

  const stackedCards = useMemo(() => {
    const others = CARDS.filter((card) => card.id !== selectedCardId);
    return [...others, selectedCard];
  }, [selectedCard, selectedCardId]);

  const handlePay = () => {
    if (paymentPhase !== 'idle') {
      return;
    }

    setPaymentPhase('arming');
    setStatusText(`Paying ${scenario.merchant}`);

    window.setTimeout(() => {
      setPaymentPhase('paid');
      setStatusText(`Paid with ${selectedCard.issuer}`);
      onPaymentComplete(scenario, selectedCard.id);
    }, 550);

    window.setTimeout(() => {
      setPaymentPhase('idle');
      setStatusText('Ready');
    }, 2200);
  };

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        padding: '18px 14px 112px',
        background: '#000',
        fontFamily: C.appleFont,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ color: C.walletGreen, fontSize: 26, fontWeight: 700, letterSpacing: -0.8 }}>Wallet +</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <WalletHeaderIcon kind="stack" />
          </button>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <WalletHeaderIcon kind="plus" />
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', height: 356, marginBottom: 14 }}>
        {stackedCards.map((card, index) => {
          const expanded = index === stackedCards.length - 1;
          const compactTop = index * 50;
          const expandedTop = paymentPhase === 'idle' ? 104 : paymentPhase === 'arming' ? 66 : 44;
          const isTopCard = card.id === selectedCardId;

          return (
            <CardFace
              key={card.id}
              cardId={card.id}
              expanded={expanded}
              promoted={card.id === scenario.recommendedCardId}
              onClick={() => paymentPhase === 'idle' && setSelectedCardId(card.id)}
              style={{
                top: expanded ? expandedTop : compactTop,
                height: expanded ? 220 : 72,
                zIndex: index + 1,
                transform: isTopCard
                  ? paymentPhase === 'idle'
                    ? 'scale(1)'
                    : paymentPhase === 'arming'
                      ? 'scale(1.02)'
                      : 'translateY(-10px) scale(1.03)'
                  : 'scale(1)',
                transition: 'top 0.45s ease, transform 0.45s ease, box-shadow 0.45s ease',
                filter: paymentPhase === 'paid' && !isTopCard ? 'brightness(0.8)' : 'none',
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          {SCENARIOS.map((item) => (
            <ScenarioChip
              key={item.id}
              scenario={item}
              active={item.id === scenario.id}
              onClick={() => paymentPhase === 'idle' && setScenarioId(item.id)}
            />
          ))}
        </div>
        <button
          onClick={handlePay}
          style={{
            border: 'none',
            borderRadius: 999,
            background: paymentPhase === 'paid' ? C.walletGreen : '#FFFFFF',
            color: paymentPhase === 'paid' ? '#000' : '#000',
            padding: '9px 14px',
            fontSize: 12,
            fontWeight: 700,
            cursor: paymentPhase === 'idle' ? 'pointer' : 'default',
            minWidth: 66,
            transition: 'background 0.25s ease',
          }}
        >
          {paymentPhase === 'idle' ? 'Pay' : paymentPhase === 'arming' ? 'Paying' : 'Paid'}
        </button>
      </div>

      <div
        style={{
          background: '#111214',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 14px',
          marginBottom: 14,
        }}
      >
        <div style={{ color: C.text, fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>
          {scenario.merchant} · ${scenario.amount.toFixed(2)}
        </div>
        <div style={{ color: C.textSec, fontSize: 12, marginTop: 3, lineHeight: 1.45 }}>
          {selectedIsRecommended
            ? `${recommendedCard.issuer} is surfaced for ${scenario.shortLabel.toLowerCase()}. ${statusText}.`
            : `${recommendedCard.issuer} would earn more here than your current choice. ${statusText}.`}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 8,
          marginBottom: 12,
        }}
      >
        <div style={{ background: '#111214', borderRadius: 14, padding: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: C.textTer, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>Default</div>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginTop: 8 }}>{defaultCard.issuer}</div>
          <div style={{ color: C.textSec, fontSize: 12, marginTop: 2 }}>${defaultRewards.toFixed(2)}</div>
        </div>
        <div style={{ background: '#111214', borderRadius: 14, padding: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: C.textTer, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>Wallet+</div>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginTop: 8 }}>{recommendedCard.issuer}</div>
          <div style={{ color: C.walletGreen, fontSize: 12, marginTop: 2 }}>${recommendedRewards.toFixed(2)}</div>
        </div>
        <div style={{ background: '#111214', borderRadius: 14, padding: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ color: C.textTer, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>Current</div>
          <div style={{ color: C.text, fontSize: 13, fontWeight: 700, marginTop: 8 }}>{selectedCard.issuer}</div>
          <div style={{ color: selectedIsRecommended ? C.walletGreen : C.textSec, fontSize: 12, marginTop: 2 }}>${selectedRewards.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ color: C.textTer, fontSize: 11, lineHeight: 1.5, padding: '0 2px' }}>
        Tap a lower card to override Wallet+. When you press Pay, the surfaced card completes the tap immediately and the transaction is recorded in Activity.
      </div>
    </div>
  );
}
