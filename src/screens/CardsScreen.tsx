import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { CARDS, Card } from '../data/mockData';
import CardWidget from '../components/CardWidget';

const { width } = Dimensions.get('window');

const CATEGORY_LABELS = ['Dining', 'Groceries', 'Travel', 'Shopping', 'Entertainment', 'Other'];
const CATEGORY_KEYS = ['dining', 'groceries', 'travel', 'shopping', 'entertainment', 'other'] as const;
const CATEGORY_EMOJIS = ['🍽️', '🛒', '✈️', '🛍️', '🎬', '•••'];

function RewardsBar({ rate, max }: { rate: number; max: number }) {
  const fill = (rate / max) * 100;
  return (
    <View style={rewardBarStyles.wrapper}>
      <View style={rewardBarStyles.track}>
        <View style={[rewardBarStyles.fill, { width: `${fill}%` as any }]} />
      </View>
      <Text style={rewardBarStyles.rate}>{rate}x</Text>
    </View>
  );
}

const rewardBarStyles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  track: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.surfaceHighlight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 2,
  },
  rate: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    width: 24,
    textAlign: 'right',
  },
});

export default function CardsScreen() {
  const [selectedCard, setSelectedCard] = useState<Card>(CARDS[0]);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>My Cards</Text>
            <View style={styles.cardCount}>
              <Text style={styles.cardCountText}>{CARDS.length} cards</Text>
            </View>
          </View>

          {/* Card scroll */}
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.cardScroll}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / (width - 32 + 16));
              setSelectedCard(CARDS[Math.min(index, CARDS.length - 1)]);
            }}
            decelerationRate="fast"
            snapToInterval={width - 32 + 16}
          >
            {CARDS.map(card => (
              <View key={card.id} style={{ width: width - 32 }}>
                <CardWidget card={card} selected={card.id === selectedCard.id} onPress={() => setSelectedCard(card)} />
              </View>
            ))}
          </ScrollView>

          {/* Dot indicators */}
          <View style={styles.dots}>
            {CARDS.map(card => (
              <View key={card.id} style={[styles.dot, card.id === selectedCard.id && styles.dotActive]} />
            ))}
          </View>

          {/* Card stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>${selectedCard.earnedThisMonth.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Earned (May)</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{selectedCard.rewards.dining}x</Text>
              <Text style={styles.statLabel}>Best Rewards</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <View style={styles.bestForTags}>
                {selectedCard.bestFor.slice(0, 1).map(tag => (
                  <Text key={tag} style={styles.statValue}>{tag}</Text>
                ))}
              </View>
              <Text style={styles.statLabel}>Best For</Text>
            </View>
          </View>

          {/* Rewards breakdown */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rewards by Category</Text>
            <View style={styles.rewardsCard}>
              {CATEGORY_KEYS.map((key, i) => {
                const rate = selectedCard.rewards[key];
                const maxRate = Math.max(...CARDS.map(c => c.rewards[key]));
                const isBest = rate === maxRate;
                return (
                  <View key={key} style={[styles.rewardRow, i < CATEGORY_KEYS.length - 1 && styles.rewardRowBorder]}>
                    <Text style={styles.rewardEmoji}>{CATEGORY_EMOJIS[i]}</Text>
                    <View style={styles.rewardMid}>
                      <Text style={styles.rewardLabel}>{CATEGORY_LABELS[i]}</Text>
                      <RewardsBar rate={rate} max={4} />
                    </View>
                    {isBest && (
                      <View style={styles.bestBadge}>
                        <Ionicons name="star" size={10} color={Colors.warning} />
                        <Text style={styles.bestText}>Best</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Best use tags */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Used For</Text>
            <View style={styles.tagRow}>
              {selectedCard.bestFor.map(tag => (
                <View key={tag} style={styles.bigTag}>
                  <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
                  <Text style={styles.bigTagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  cardCount: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  cardCountText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  cardScroll: {
    marginBottom: 16,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 24,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surfaceHighlight,
  },
  dotActive: {
    width: 20,
    backgroundColor: Colors.accent,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  statDivider: {
    width: 0.5,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  bestForTags: {
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  rewardsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  rewardRowBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  rewardEmoji: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  rewardMid: {
    flex: 1,
    gap: 6,
  },
  rewardLabel: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  bestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
  },
  bestText: {
    fontSize: 10,
    color: Colors.warning,
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  bigTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successSoft,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 7,
  },
  bigTagText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
});
