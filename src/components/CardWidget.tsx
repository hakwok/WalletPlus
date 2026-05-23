import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, CardGradients } from '../theme/colors';
import { Card } from '../data/mockData';

type Props = {
  card: Card;
  compact?: boolean;
  selected?: boolean;
  onPress?: () => void;
};

const NETWORK_ICON: Record<string, string> = {
  Visa: 'VISA',
  Mastercard: 'MC',
  Amex: 'AMEX',
};

export default function CardWidget({ card, compact = false, selected = false, onPress }: Props) {
  const gradient = CardGradients[card.gradientKey];

  if (compact) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <LinearGradient
          colors={gradient}
          style={[styles.compact, selected && styles.compactSelected]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {selected && (
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            </View>
          )}
          <Text style={styles.compactIssuer}>{card.issuer}</Text>
          <Text style={styles.compactLast}>···{card.lastFour}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      <LinearGradient
        colors={gradient}
        style={[styles.card, selected && styles.cardSelected]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.issuer}>{card.issuer}</Text>
            <Text style={styles.name}>{card.name}</Text>
          </View>
          <Text style={styles.network}>{NETWORK_ICON[card.network] ?? card.network}</Text>
        </View>

        <View style={styles.chipRow}>
          <View style={styles.chip} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.lastFour}>···· ···· ···· {card.lastFour}</Text>
          <View style={styles.tags}>
            {card.bestFor.slice(0, 2).map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  card: {
    borderRadius: 20,
    padding: 22,
    height: 200,
    justifyContent: 'space-between',
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: Colors.success,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  issuer: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  network: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  chipRow: {
    alignItems: 'flex-start',
  },
  chip: {
    width: 38,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  footer: {
    gap: 8,
  },
  lastFour: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    letterSpacing: 2,
  },
  tags: {
    flexDirection: 'row',
    gap: 6,
  },
  tag: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },

  // Compact styles
  compact: {
    width: 80,
    height: 52,
    borderRadius: 10,
    padding: 8,
    justifyContent: 'space-between',
  },
  compactSelected: {
    borderWidth: 2,
    borderColor: Colors.success,
  },
  compactIssuer: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  compactLast: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  checkBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.surface,
    borderRadius: 9,
  },
});
