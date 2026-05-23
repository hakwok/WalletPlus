export type CardRewards = {
  dining: number;
  groceries: number;
  travel: number;
  shopping: number;
  entertainment: number;
  other: number;
};

export type Card = {
  id: string;
  name: string;
  issuer: string;
  lastFour: string;
  gradientKey: 'chase' | 'amex' | 'apple' | 'citi';
  rewards: CardRewards;
  earnedThisMonth: number;
  bestFor: string[];
  network: string;
};

export type Transaction = {
  id: string;
  merchant: string;
  category: keyof CardRewards;
  categoryEmoji: string;
  amount: number;
  cardId: string;
  rewardsEarned: number;
  date: string;
  location: string;
};

export type SpendingCategory = {
  key: keyof CardRewards;
  label: string;
  emoji: string;
  amount: number;
  colorKey: string;
  bestCardId: string;
  currentCardId: string;
  missedRewards: number;
};

export type CheckoutScenario = {
  merchant: string;
  location: string;
  category: keyof CardRewards;
  categoryLabel: string;
  categoryEmoji: string;
  amount: number;
  recommendedCardId: string;
  recommendReason: string;
};

export const CARDS: Card[] = [
  {
    id: 'chase_sapphire',
    name: 'Sapphire Preferred',
    issuer: 'Chase',
    lastFour: '4821',
    gradientKey: 'chase',
    rewards: { dining: 3, groceries: 1, travel: 2, shopping: 1, entertainment: 1, other: 1 },
    earnedThisMonth: 28.40,
    bestFor: ['Dining', 'Travel'],
    network: 'Visa',
  },
  {
    id: 'amex_gold',
    name: 'Gold Card',
    issuer: 'American Express',
    lastFour: '3614',
    gradientKey: 'amex',
    rewards: { dining: 4, groceries: 4, travel: 1, shopping: 1, entertainment: 1, other: 1 },
    earnedThisMonth: 19.20,
    bestFor: ['Dining', 'Groceries'],
    network: 'Amex',
  },
  {
    id: 'apple_card',
    name: 'Apple Card',
    issuer: 'Apple',
    lastFour: '0001',
    gradientKey: 'apple',
    rewards: { dining: 2, groceries: 2, travel: 1, shopping: 2, entertainment: 2, other: 1 },
    earnedThisMonth: 8.10,
    bestFor: ['Apple Pay', 'Everyday'],
    network: 'Mastercard',
  },
  {
    id: 'citi_double',
    name: 'Double Cash',
    issuer: 'Citi',
    lastFour: '7703',
    gradientKey: 'citi',
    rewards: { dining: 2, groceries: 2, travel: 2, shopping: 2, entertainment: 2, other: 2 },
    earnedThisMonth: 6.60,
    bestFor: ['Everything', 'Simplicity'],
    network: 'Mastercard',
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    merchant: 'Blue Bottle Coffee',
    category: 'dining',
    categoryEmoji: '☕',
    amount: 6.50,
    cardId: 'chase_sapphire',
    rewardsEarned: 0.20,
    date: 'Today, 8:42 AM',
    location: 'Hayes Valley, SF',
  },
  {
    id: 't2',
    merchant: 'Whole Foods Market',
    category: 'groceries',
    categoryEmoji: '🛒',
    amount: 87.30,
    cardId: 'amex_gold',
    rewardsEarned: 3.49,
    date: 'Today, 12:15 PM',
    location: 'Haight, SF',
  },
  {
    id: 't3',
    merchant: 'Uber Eats',
    category: 'dining',
    categoryEmoji: '🍜',
    amount: 34.20,
    cardId: 'amex_gold',
    rewardsEarned: 1.37,
    date: 'Yesterday, 7:30 PM',
    location: 'Delivered',
  },
  {
    id: 't4',
    merchant: 'United Airlines',
    category: 'travel',
    categoryEmoji: '✈️',
    amount: 312.00,
    cardId: 'chase_sapphire',
    rewardsEarned: 6.24,
    date: 'May 20, 3:10 PM',
    location: 'SFO',
  },
  {
    id: 't5',
    merchant: 'Apple Store',
    category: 'shopping',
    categoryEmoji: '🛍️',
    amount: 149.00,
    cardId: 'apple_card',
    rewardsEarned: 4.47,
    date: 'May 19, 11:00 AM',
    location: 'Union Square, SF',
  },
  {
    id: 't6',
    merchant: 'AMC Theatres',
    category: 'entertainment',
    categoryEmoji: '🎬',
    amount: 22.50,
    cardId: 'citi_double',
    rewardsEarned: 0.45,
    date: 'May 18, 6:00 PM',
    location: 'Kabuki, SF',
  },
];

export const SPENDING_CATEGORIES: SpendingCategory[] = [
  {
    key: 'dining',
    label: 'Dining',
    emoji: '🍽️',
    amount: 380,
    colorKey: 'diningColor',
    bestCardId: 'amex_gold',
    currentCardId: 'chase_sapphire',
    missedRewards: 3.80,
  },
  {
    key: 'shopping',
    label: 'Shopping',
    emoji: '🛍️',
    amount: 310,
    colorKey: 'shoppingColor',
    bestCardId: 'apple_card',
    currentCardId: 'citi_double',
    missedRewards: 0,
  },
  {
    key: 'groceries',
    label: 'Groceries',
    emoji: '🛒',
    amount: 245,
    colorKey: 'groceryColor',
    bestCardId: 'amex_gold',
    currentCardId: 'amex_gold',
    missedRewards: 0,
  },
  {
    key: 'other',
    label: 'Other',
    emoji: '•••',
    amount: 160,
    colorKey: 'otherColor',
    bestCardId: 'citi_double',
    currentCardId: 'citi_double',
    missedRewards: 0,
  },
  {
    key: 'travel',
    label: 'Travel',
    emoji: '✈️',
    amount: 120,
    colorKey: 'travelColor',
    bestCardId: 'chase_sapphire',
    currentCardId: 'chase_sapphire',
    missedRewards: 0,
  },
  {
    key: 'entertainment',
    label: 'Entertainment',
    emoji: '🎬',
    amount: 85,
    colorKey: 'entertainmentColor',
    bestCardId: 'chase_sapphire',
    currentCardId: 'citi_double',
    missedRewards: 0.85,
  },
];

export const TOTAL_SPENDING = SPENDING_CATEGORIES.reduce((sum, c) => sum + c.amount, 0);
export const TOTAL_REWARDS_EARNED = CARDS.reduce((sum, c) => sum + c.earnedThisMonth, 0);
export const REWARDS_GOAL = 80;

export const CHECKOUT_SCENARIOS: CheckoutScenario[] = [
  {
    merchant: 'Blue Bottle Coffee',
    location: 'Hayes Valley, SF',
    category: 'dining',
    categoryLabel: 'Café · Dining',
    categoryEmoji: '☕',
    amount: 6.50,
    recommendedCardId: 'amex_gold',
    recommendReason: '4x points on dining — best for this purchase',
  },
  {
    merchant: 'Whole Foods Market',
    location: 'Haight, SF',
    category: 'groceries',
    categoryLabel: 'Groceries',
    categoryEmoji: '🛒',
    amount: 54.30,
    recommendedCardId: 'amex_gold',
    recommendReason: '4x points on groceries — best for this purchase',
  },
  {
    merchant: 'United Airlines',
    location: 'SFO Airport',
    category: 'travel',
    categoryLabel: 'Travel',
    categoryEmoji: '✈️',
    amount: 189.00,
    recommendedCardId: 'chase_sapphire',
    recommendReason: '2x points on travel + no foreign transaction fees',
  },
];

export const getCurrentScenarioIndex = (): number => {
  const hour = new Date().getHours();
  if (hour < 10) return 0;
  if (hour < 14) return 1;
  return 2;
};
