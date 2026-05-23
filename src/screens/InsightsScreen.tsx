import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient as ExpoGradient } from 'expo-linear-gradient';
import { Colors } from '../theme/colors';
import { SPENDING_CATEGORIES, TOTAL_SPENDING, CARDS } from '../data/mockData';

const CHART_SIZE = 200;
const STROKE_WIDTH = 28;
const RADIUS = (CHART_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CATEGORY_COLORS: Record<string, string> = {
  diningColor: Colors.diningColor,
  groceryColor: Colors.groceryColor,
  travelColor: Colors.travelColor,
  shoppingColor: Colors.shoppingColor,
  entertainmentColor: Colors.entertainmentColor,
  otherColor: Colors.otherColor,
};

function DonutChart() {
  let cumulativeOffset = 0;

  const segments = SPENDING_CATEGORIES.map(cat => {
    const pct = cat.amount / TOTAL_SPENDING;
    const dash = pct * CIRCUMFERENCE;
    const gap = CIRCUMFERENCE - dash;
    const offset = cumulativeOffset;
    cumulativeOffset += dash;
    return { ...cat, dash, gap, offset };
  });

  return (
    <View style={chartStyles.wrapper}>
      <Svg width={CHART_SIZE} height={CHART_SIZE}>
        {/* Track */}
        <Circle
          cx={CHART_SIZE / 2}
          cy={CHART_SIZE / 2}
          r={RADIUS}
          stroke={Colors.surfaceElevated}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        {segments.map((seg, i) => (
          <Circle
            key={seg.key}
            cx={CHART_SIZE / 2}
            cy={CHART_SIZE / 2}
            r={RADIUS}
            stroke={CATEGORY_COLORS[seg.colorKey] ?? Colors.textSecondary}
            strokeWidth={STROKE_WIDTH - 3}
            fill="none"
            strokeDasharray={[seg.dash - 3, seg.gap + 3]}
            strokeDashoffset={-(seg.offset) + CIRCUMFERENCE * 0.25}
            strokeLinecap="butt"
          />
        ))}
      </Svg>
      <View style={chartStyles.center}>
        <Text style={chartStyles.total}>${TOTAL_SPENDING.toLocaleString()}</Text>
        <Text style={chartStyles.label}>total spent</Text>
      </View>
    </View>
  );
}

const chartStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CHART_SIZE,
    height: CHART_SIZE,
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  total: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});

export default function InsightsScreen() {
  const [activeTab, setActiveTab] = useState<'spending' | 'rewards'>('spending');

  const totalMissed = SPENDING_CATEGORIES.reduce((s, c) => s + c.missedRewards, 0);
  const totalEarned = CARDS.reduce((s, c) => s + c.earnedThisMonth, 0);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Insights</Text>
            <View style={styles.monthBadge}>
              <Ionicons name="calendar-outline" size={12} color={Colors.textSecondary} />
              <Text style={styles.monthText}>May 2026</Text>
            </View>
          </View>

          {/* Tab switcher */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'spending' && styles.tabActive]}
              onPress={() => setActiveTab('spending')}
            >
              <Text style={[styles.tabText, activeTab === 'spending' && styles.tabTextActive]}>Spending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'rewards' && styles.tabActive]}
              onPress={() => setActiveTab('rewards')}
            >
              <Text style={[styles.tabText, activeTab === 'rewards' && styles.tabTextActive]}>Rewards</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'spending' && (
            <>
              {/* Donut chart */}
              <View style={styles.chartCard}>
                <DonutChart />
                <View style={styles.legend}>
                  {SPENDING_CATEGORIES.map(cat => (
                    <View key={cat.key} style={styles.legendRow}>
                      <View style={[styles.legendDot, { backgroundColor: CATEGORY_COLORS[cat.colorKey] }]} />
                      <Text style={styles.legendLabel}>{cat.emoji} {cat.label}</Text>
                      <Text style={styles.legendAmt}>${cat.amount}</Text>
                      <Text style={styles.legendPct}>{Math.round(cat.amount / TOTAL_SPENDING * 100)}%</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Missed rewards banner */}
              {totalMissed > 0 && (
                <View style={styles.missedBanner}>
                  <Ionicons name="alert-circle" size={20} color={Colors.warning} />
                  <View style={styles.missedText}>
                    <Text style={styles.missedTitle}>You missed ${totalMissed.toFixed(2)} in rewards</Text>
                    <Text style={styles.missedSub}>Switch cards on certain purchases to earn more</Text>
                  </View>
                </View>
              )}

              {/* Card recommendations */}
              <Text style={styles.sectionTitle}>Wallet+ Recommendations</Text>
              {SPENDING_CATEGORIES.filter(cat => cat.missedRewards > 0).map(cat => {
                const bestCard = CARDS.find(c => c.id === cat.bestCardId)!;
                const currentCard = CARDS.find(c => c.id === cat.currentCardId);
                const bestRate = bestCard.rewards[cat.key];
                const currentRate = currentCard?.rewards[cat.key] ?? 1;
                return (
                  <View key={cat.key} style={styles.recommendCard}>
                    <View style={styles.recHeader}>
                      <Text style={styles.recEmoji}>{cat.emoji}</Text>
                      <Text style={styles.recCategory}>{cat.label}</Text>
                      <View style={styles.recBadge}>
                        <Ionicons name="sparkles" size={11} color={Colors.walletPlusMid} />
                        <Text style={styles.recBadgeText}>Tip</Text>
                      </View>
                    </View>
                    <Text style={styles.recDesc}>
                      Use <Text style={styles.recHighlight}>{bestCard.issuer} {bestCard.name}</Text> for {cat.label.toLowerCase()} to earn <Text style={styles.recHighlight}>{bestRate}x</Text> instead of {currentRate}x — save <Text style={styles.recHighlight}>${cat.missedRewards.toFixed(2)}/mo</Text>
                    </Text>
                  </View>
                );
              })}
            </>
          )}

          {activeTab === 'rewards' && (
            <>
              {/* Earned vs Missed */}
              <View style={styles.rewardSummary}>
                <View style={styles.rewardStat}>
                  <Text style={[styles.rewardStatVal, { color: Colors.success }]}>${totalEarned.toFixed(2)}</Text>
                  <Text style={styles.rewardStatLabel}>Earned</Text>
                </View>
                <View style={styles.rewardDivider} />
                <View style={styles.rewardStat}>
                  <Text style={[styles.rewardStatVal, { color: Colors.warning }]}>${totalMissed.toFixed(2)}</Text>
                  <Text style={styles.rewardStatLabel}>Missed</Text>
                </View>
                <View style={styles.rewardDivider} />
                <View style={styles.rewardStat}>
                  <Text style={[styles.rewardStatVal, { color: Colors.accent }]}>${(totalEarned + totalMissed).toFixed(2)}</Text>
                  <Text style={styles.rewardStatLabel}>Potential</Text>
                </View>
              </View>

              {/* Per-card breakdown */}
              <Text style={styles.sectionTitle}>By Card</Text>
              {CARDS.map(card => {
                const potential = card.earnedThisMonth * 1.3;
                const pct = (card.earnedThisMonth / potential) * 100;
                return (
                  <View key={card.id} style={styles.cardRewardRow}>
                    <View style={styles.cardRewardHeader}>
                      <Text style={styles.cardRewardName}>{card.issuer} {card.name}</Text>
                      <Text style={styles.cardRewardAmt}>${card.earnedThisMonth.toFixed(2)}</Text>
                    </View>
                    <View style={styles.rewardTrack}>
                      <View style={[styles.rewardFill, { width: `${pct}%` as any, backgroundColor: Colors.success }]} />
                      <View style={[styles.rewardFillMissed, { width: `${100 - pct}%` as any }]} />
                    </View>
                    <Text style={styles.cardRewardSub}>
                      ${potential.toFixed(2)} potential with optimal card use
                    </Text>
                  </View>
                );
              })}

              {/* Wallet+ impact */}
              <ExpoGradient
                colors={['rgba(123,47,190,0.2)', 'rgba(74,144,217,0.1)']}
                style={styles.impactCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="sparkles" size={20} color={Colors.walletPlusMid} />
                <View>
                  <Text style={styles.impactTitle}>Wallet+ has saved you time</Text>
                  <Text style={styles.impactSub}>23 smart card picks this month · avg. 0.4s decision time</Text>
                </View>
              </ExpoGradient>
            </>
          )}

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
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  monthBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  monthText: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 3,
    marginBottom: 22,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: Colors.surfaceElevated,
  },
  tabText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.textPrimary,
  },
  chartCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: Colors.border,
    gap: 20,
  },
  legend: {
    width: '100%',
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    flex: 1,
    fontWeight: '500',
  },
  legendAmt: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  legendPct: {
    fontSize: 12,
    color: Colors.textSecondary,
    width: 36,
    textAlign: 'right',
  },
  missedBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.warningSoft,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: Colors.warning + '44',
  },
  missedText: {
    flex: 1,
  },
  missedTitle: {
    fontSize: 14,
    color: Colors.warning,
    fontWeight: '700',
    marginBottom: 3,
  },
  missedSub: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  recommendCard: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.border,
    gap: 8,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recEmoji: {
    fontSize: 16,
  },
  recCategory: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  recBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 3,
  },
  recBadgeText: {
    fontSize: 10,
    color: Colors.walletPlusMid,
    fontWeight: '700',
  },
  recDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  recHighlight: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },

  // Rewards tab
  rewardSummary: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  rewardStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  rewardStatVal: {
    fontSize: 20,
    fontWeight: '700',
  },
  rewardStatLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  rewardDivider: {
    width: 0.5,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  cardRewardRow: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: Colors.border,
    gap: 10,
  },
  cardRewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardRewardName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  cardRewardAmt: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.success,
  },
  rewardTrack: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: Colors.surfaceElevated,
  },
  rewardFill: {
    borderRadius: 3,
  },
  rewardFillMissed: {
    backgroundColor: Colors.warningSoft,
    borderRadius: 3,
  },
  cardRewardSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  impactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    borderRadius: 16,
    marginTop: 8,
    borderWidth: 0.5,
    borderColor: Colors.walletPlusStart + '44',
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  impactSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
