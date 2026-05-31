import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CardType } from '../data/walletData';

interface Props {
  card: CardType;
  width: number;
  height: number;
}

function Chip({ dark }: { dark: boolean }) {
  const gold = dark ? ['#9B8B5C', '#7A6D47'] : ['#D4AF37', '#C09828', '#D4AF37'];
  const lineColor = dark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.2)';
  return (
    <LinearGradient
      colors={gold as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.chip}
    >
      <View style={[styles.chipV, { backgroundColor: lineColor }]} />
      <View style={[styles.chipH1, { backgroundColor: lineColor }]} />
      <View style={[styles.chipH2, { backgroundColor: lineColor }]} />
    </LinearGradient>
  );
}

function MastercardLogo({ light }: { light: boolean }) {
  return (
    <View style={styles.mcContainer}>
      <View style={[styles.mcCircle, { backgroundColor: '#EB001B', opacity: light ? 0.9 : 1 }]} />
      <View style={[styles.mcCircle, { backgroundColor: '#F79E1B', marginLeft: -10, opacity: light ? 0.9 : 1 }]} />
    </View>
  );
}

function VisaLogo({ color }: { color: string }) {
  return (
    <Text style={[styles.visaText, { color }]}>VISA</Text>
  );
}

function AmexLogo({ color }: { color: string }) {
  return (
    <View style={styles.amexContainer}>
      <Text style={[styles.amexText, { color }]}>AMERICAN</Text>
      <Text style={[styles.amexText, { color }]}>EXPRESS</Text>
    </View>
  );
}

export default function CreditCard({ card, width, height }: Props) {
  const isLight = card.textColor !== '#FFFFFF';
  const secondaryColor = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.6)';

  return (
    <LinearGradient
      colors={card.gradient as [string, string, ...string[]]}
      start={card.gradientStart}
      end={card.gradientEnd}
      style={[styles.card, { width, height, borderRadius: 16 }]}
    >
      {/* Top row */}
      <View style={styles.topRow}>
        {card.id === 'apple' ? (
          <Text style={[styles.appleWordmark, { color: card.textColor }]}>apple</Text>
        ) : (
          <Text style={[styles.issuerName, { color: card.textColor }]}>{card.issuerName}</Text>
        )}
        <Chip dark={card.chipDark} />
      </View>

      {/* Card number */}
      <View style={styles.numberRow}>
        <Text style={[styles.dots, { color: secondaryColor }]}>●●●●  ●●●●  ●●●● </Text>
        <Text style={[styles.lastFour, { color: card.textColor }]}>{card.lastFour}</Text>
      </View>

      {/* Bottom row */}
      <View style={styles.bottomRow}>
        <Text style={[styles.cardholderName, { color: card.textColor }]}>
          {card.cardholderName}
        </Text>
        {card.network === 'visa' && <VisaLogo color={isLight ? '#1A1F71' : '#FFFFFF'} />}
        {card.network === 'mastercard' && <MastercardLogo light={isLight} />}
        {card.network === 'amex' && <AmexLogo color={card.textColor} />}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appleWordmark: {
    fontSize: 22,
    fontWeight: '300',
    letterSpacing: -0.5,
  },
  issuerName: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  chip: {
    width: 38,
    height: 28,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipV: {
    position: 'absolute',
    width: 1,
    height: '100%',
  },
  chipH1: {
    position: 'absolute',
    height: 1,
    width: '100%',
    top: '33%',
  },
  chipH2: {
    position: 'absolute',
    height: 1,
    width: '100%',
    top: '66%',
  },
  numberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dots: {
    fontSize: 14,
    letterSpacing: 2,
  },
  lastFour: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardholderName: {
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  mcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mcCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  visaText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '800',
    letterSpacing: 1,
  },
  amexContainer: {
    alignItems: 'flex-end',
  },
  amexText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1.5,
    lineHeight: 10,
  },
});
