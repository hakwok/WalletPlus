import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TransactionType } from '../data/walletData';
import { Colors } from '../theme/colors';

export default function TransactionRow({ transaction }: { transaction: TransactionType }) {
  return (
    <View style={styles.row}>
      <View style={[styles.icon, { backgroundColor: transaction.iconBg }]}>
        <Text style={styles.emoji}>{transaction.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.merchant} numberOfLines={1}>{transaction.merchant}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <Text style={styles.amount}>-${transaction.amount.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.secondarySystemGroupedBackground,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  emoji: {
    fontSize: 19,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  merchant: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.label,
    marginBottom: 2,
  },
  date: {
    fontSize: 13,
    color: Colors.secondaryLabel,
  },
  amount: {
    fontSize: 15,
    fontWeight: '400',
    color: Colors.label,
    flexShrink: 0,
  },
});
