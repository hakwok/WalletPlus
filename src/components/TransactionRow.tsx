import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Transaction, CARDS } from '../data/mockData';

type Props = {
  transaction: Transaction;
};

export default function TransactionRow({ transaction }: Props) {
  const card = CARDS.find(c => c.id === transaction.cardId);

  return (
    <View style={styles.row}>
      <View style={styles.emoji}>
        <Text style={styles.emojiText}>{transaction.categoryEmoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.merchant}>{transaction.merchant}</Text>
        <Text style={styles.meta}>{card?.issuer} ···{card?.lastFour} · {transaction.date}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.amount}>-${transaction.amount.toFixed(2)}</Text>
        <Text style={styles.rewards}>+${transaction.rewardsEarned.toFixed(2)} pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  emoji: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emojiText: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  merchant: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  rewards: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
});
