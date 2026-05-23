export type Card = {
  id: string; name: string; issuer: string; lastFour: string;
  gradKey: 'chase' | 'amex' | 'apple' | 'citi';
  rewards: Record<string, number>;
  earned: number; bestFor: string[]; network: string;
};

export type Transaction = {
  id: string; merchant: string; category: string; emoji: string;
  amount: number; cardId: string; rewardsEarned: number; date: string;
};

export type SpendCat = {
  key: string; label: string; emoji: string; amount: number;
  color: string; bestCardId: string; missed: number;
};

export const CARDS: Card[] = [
  { id: 'chase', name: 'Sapphire Preferred', issuer: 'Chase', lastFour: '4821', gradKey: 'chase',
    rewards: { dining: 3, groceries: 1, travel: 2, shopping: 1, entertainment: 1, other: 1 },
    earned: 28.40, bestFor: ['Dining', 'Travel'], network: 'Visa' },
  { id: 'amex', name: 'Gold Card', issuer: 'American Express', lastFour: '3614', gradKey: 'amex',
    rewards: { dining: 4, groceries: 4, travel: 1, shopping: 1, entertainment: 1, other: 1 },
    earned: 19.20, bestFor: ['Dining', 'Groceries'], network: 'Amex' },
  { id: 'apple', name: 'Apple Card', issuer: 'Apple', lastFour: '0001', gradKey: 'apple',
    rewards: { dining: 2, groceries: 2, travel: 1, shopping: 2, entertainment: 2, other: 1 },
    earned: 8.10, bestFor: ['Apple Pay', 'Everyday'], network: 'Mastercard' },
  { id: 'citi', name: 'Double Cash', issuer: 'Citi', lastFour: '7703', gradKey: 'citi',
    rewards: { dining: 2, groceries: 2, travel: 2, shopping: 2, entertainment: 2, other: 2 },
    earned: 6.60, bestFor: ['Everything', 'Simplicity'], network: 'Mastercard' },
];

export const TRANSACTIONS: Transaction[] = [
  { id: 't1', merchant: 'Blue Bottle Coffee', category: 'dining', emoji: '☕', amount: 6.50, cardId: 'chase', rewardsEarned: 0.20, date: 'Today, 8:42 AM' },
  { id: 't2', merchant: 'Whole Foods Market', category: 'groceries', emoji: '🛒', amount: 87.30, cardId: 'amex', rewardsEarned: 3.49, date: 'Today, 12:15 PM' },
  { id: 't3', merchant: 'Uber Eats', category: 'dining', emoji: '🍜', amount: 34.20, cardId: 'amex', rewardsEarned: 1.37, date: 'Yesterday, 7:30 PM' },
  { id: 't4', merchant: 'United Airlines', category: 'travel', emoji: '✈️', amount: 312.00, cardId: 'chase', rewardsEarned: 6.24, date: 'May 20, 3:10 PM' },
  { id: 't5', merchant: 'Apple Store', category: 'shopping', emoji: '🛍️', amount: 149.00, cardId: 'apple', rewardsEarned: 4.47, date: 'May 19, 11:00 AM' },
];

export const SPEND_CATS: SpendCat[] = [
  { key: 'dining', label: 'Dining', emoji: '🍽️', amount: 380, color: '#FF9F0A', bestCardId: 'amex', missed: 3.80 },
  { key: 'shopping', label: 'Shopping', emoji: '🛍️', amount: 310, color: '#007AFF', bestCardId: 'apple', missed: 0 },
  { key: 'groceries', label: 'Groceries', emoji: '🛒', amount: 245, color: '#30D158', bestCardId: 'amex', missed: 0 },
  { key: 'other', label: 'Other', emoji: '···', amount: 160, color: '#636366', bestCardId: 'citi', missed: 0 },
  { key: 'travel', label: 'Travel', emoji: '✈️', amount: 120, color: '#5E5CE6', bestCardId: 'chase', missed: 0 },
  { key: 'entertainment', label: 'Entertainment', emoji: '🎬', amount: 85, color: '#FF375F', bestCardId: 'chase', missed: 0.85 },
];

export const TOTAL_SPEND = SPEND_CATS.reduce((s, c) => s + c.amount, 0);
export const TOTAL_EARNED = CARDS.reduce((s, c) => s + c.earned, 0);
export const REWARDS_GOAL = 80;

export const CHECKOUT = {
  merchant: 'Blue Bottle Coffee', location: 'Hayes Valley, SF',
  category: 'dining', categoryLabel: 'Café · Dining', emoji: '☕',
  amount: 6.50, recommendedCardId: 'amex',
  reason: '4x points on dining — best for this purchase',
};
