import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CardType, TRANSACTIONS } from '../data/walletData';
import { Colors } from '../theme/colors';
import CreditCard from '../components/CreditCard';
import TransactionRow from '../components/TransactionRow';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = Math.round(CARD_WIDTH / 1.586);

interface Props {
  card: CardType;
  onClose: () => void;
}

const ACTIONS = [
  { icon: 'wallet-outline' as const, label: 'Pay' },
  { icon: 'arrow-up-outline' as const, label: 'Send' },
  { icon: 'arrow-down-outline' as const, label: 'Receive' },
  { icon: 'ellipsis-horizontal' as const, label: 'More' },
];

export default function CardDetailScreen({ card, onClose }: Props) {
  const transactions = TRANSACTIONS[card.id] ?? [];
  const networkLabel: Record<string, string> = {
    visa: 'Visa',
    mastercard: 'Mastercard',
    amex: 'American Express',
    discover: 'Discover',
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={onClose} style={styles.backButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="chevron-back" size={22} color={Colors.blue} />
          <Text style={styles.backText}>Wallet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={styles.cardWrapper}>
          <CreditCard card={card} width={CARD_WIDTH} height={CARD_HEIGHT} />
        </View>

        {/* Card identity row */}
        <View style={styles.cardInfoRow}>
          <View>
            <Text style={styles.cardName}>
              {card.issuerName ? `${card.issuerName} Card` : 'Apple Card'}
            </Text>
            <Text style={styles.cardMeta}>
              {networkLabel[card.network]} ···· {card.lastFour}
            </Text>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle" size={26} color={Colors.blue} />
          </TouchableOpacity>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          {ACTIONS.map(({ icon, label }) => (
            <TouchableOpacity key={label} style={styles.actionItem}>
              <View style={styles.actionCircle}>
                <Ionicons name={icon} size={20} color={Colors.blue} />
              </View>
              <Text style={styles.actionLabel}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Transactions</Text>
            <Text style={styles.sectionDate}>May 2026</Text>
          </View>

          <View style={styles.transactionList}>
            {transactions.map((txn, idx) => (
              <View key={txn.id}>
                <TransactionRow transaction={txn} />
                {idx < transactions.length - 1 && (
                  <View style={styles.rowSeparator} />
                )}
              </View>
            ))}
          </View>

          {/* See all */}
          <TouchableOpacity style={styles.seeAll}>
            <Text style={styles.seeAllText}>See All Transactions</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.secondaryLabel} />
          </TouchableOpacity>
        </View>

        {/* Manage card */}
        <TouchableOpacity style={styles.manageCard}>
          <Text style={styles.manageCardText}>
            {card.issuerName ? `View ${card.issuerName} Account` : 'View Apple Card Account'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.systemGroupedBackground,
  },
  navBar: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: Platform.OS === 'ios' ? 0 : StyleSheet.hairlineWidth,
    borderBottomColor: Colors.separator,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 17,
    color: Colors.blue,
    marginLeft: -2,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48,
  },
  cardWrapper: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.label,
    marginBottom: 2,
  },
  cardMeta: {
    fontSize: 14,
    color: Colors.secondaryLabel,
  },
  infoButton: {
    padding: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 28,
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  actionItem: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  actionCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.systemFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 12,
    color: Colors.label,
    fontWeight: '400',
  },
  section: {
    marginHorizontal: 16,
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.label,
  },
  sectionDate: {
    fontSize: 13,
    color: Colors.secondaryLabel,
  },
  transactionList: {},
  rowSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 68,
  },
  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.separator,
  },
  seeAllText: {
    fontSize: 15,
    color: Colors.blue,
  },
  manageCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  manageCardText: {
    fontSize: 15,
    color: Colors.blue,
    fontWeight: '400',
  },
});
