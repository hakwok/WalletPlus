import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { TRANSACTIONS, SPENDING_CATEGORIES, TOTAL_REWARDS_EARNED, REWARDS_GOAL, CARDS } from '../data/mockData';
import RewardRing from '../components/RewardRing';
import TransactionRow from '../components/TransactionRow';
import CheckoutModal from '../components/CheckoutModal';

const CATEGORY_COLORS: Record<string, string> = {
  dining: Colors.diningColor,
  groceries: Colors.groceryColor,
  travel: Colors.travelColor,
  shopping: Colors.shoppingColor,
  entertainment: Colors.entertainmentColor,
  other: Colors.otherColor,
};

export default function HomeScreen() {
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const topCategories = SPENDING_CATEGORIES.slice(0, 3);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{greeting}</Text>
              <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
            </View>
            <LinearGradient
              colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
              style={styles.plusBadge}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.plusText}>Wallet+</Text>
            </LinearGradient>
          </View>

          {/* Rewards Hero Card */}
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.heroCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroLeft}>
              <Text style={styles.heroLabel}>May Rewards</Text>
              <RewardRing earned={TOTAL_REWARDS_EARNED} goal={REWARDS_GOAL} size={130} />
              <Text style={styles.heroGoal}>Goal: ${REWARDS_GOAL}</Text>
            </View>
            <View style={styles.heroRight}>
              <Text style={styles.heroRightLabel}>This Month</Text>
              {CARDS.slice(0, 3).map(card => (
                <View key={card.id} style={styles.cardEarnRow}>
                  <View style={[styles.cardDot, { backgroundColor: CATEGORY_COLORS[card.gradientKey] ?? Colors.accent }]} />
                  <Text style={styles.cardEarnName}>{card.issuer}</Text>
                  <Text style={styles.cardEarnAmt}>${card.earnedThisMonth.toFixed(0)}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>

          {/* Category pills */}
          <Text style={styles.sectionTitle}>Spending This Month</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillScroll} contentContainerStyle={{ gap: 10, paddingHorizontal: 2 }}>
            {SPENDING_CATEGORIES.map(cat => (
              <View key={cat.key} style={styles.pill}>
                <Text style={styles.pillEmoji}>{cat.emoji}</Text>
                <Text style={styles.pillLabel}>{cat.label}</Text>
                <Text style={[styles.pillAmount, { color: CATEGORY_COLORS[cat.colorKey] ?? Colors.textSecondary }]}>
                  ${cat.amount}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Pay Now */}
          <TouchableOpacity style={styles.payNowWrapper} onPress={() => setCheckoutVisible(true)} activeOpacity={0.85}>
            <LinearGradient
              colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
              style={styles.payNowBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="phone-portrait-outline" size={20} color="#FFF" />
              <View>
                <Text style={styles.payNowText}>Pay with Wallet+</Text>
                <Text style={styles.payNowSub}>Best card selected automatically</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" style={{ marginLeft: 'auto' }} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Recent transactions */}
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionCard}>
            {TRANSACTIONS.slice(0, 5).map(tx => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>

      <CheckoutModal visible={checkoutVisible} onClose={() => setCheckoutVisible(false)} />
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
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingTop: 4,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  date: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  plusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  plusText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFF',
  },

  // Hero card
  heroCard: {
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: Colors.walletPlusStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  heroLeft: {
    alignItems: 'center',
    flex: 1,
  },
  heroLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroGoal: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
  },
  heroRight: {
    flex: 1,
    paddingLeft: 16,
  },
  heroRightLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardEarnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  cardDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardEarnName: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    flex: 1,
  },
  cardEarnAmt: {
    fontSize: 13,
    color: '#FFF',
    fontWeight: '700',
  },

  // Category pills
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  pillScroll: {
    marginBottom: 22,
  },
  pill: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    minWidth: 88,
    gap: 4,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  pillEmoji: {
    fontSize: 22,
  },
  pillLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  pillAmount: {
    fontSize: 14,
    fontWeight: '700',
  },

  // Pay Now
  payNowWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 26,
    shadowColor: Colors.walletPlusStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  payNowBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  payNowText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
  payNowSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 1,
  },

  // Transactions
  transactionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
});
