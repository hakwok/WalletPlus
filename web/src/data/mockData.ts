export type RewardCategory =
  | 'dining'
  | 'groceries'
  | 'travel'
  | 'shopping'
  | 'entertainment'
  | 'other';

export type Card = {
  id: string;
  name: string;
  issuer: string;
  lastFour: string;
  gradKey: 'chase' | 'amex' | 'apple' | 'citi';
  rewards: Record<RewardCategory, number>;
  earned: number;
  bestFor: string[];
  network: string;
};

export type Transaction = {
  id: string;
  merchant: string;
  category: RewardCategory;
  emoji: string;
  amount: number;
  cardId: string;
  rewardsEarned: number;
  date: string;
};

export type SpendCat = {
  key: RewardCategory;
  label: string;
  emoji: string;
  amount: number;
  color: string;
  bestCardId: string;
  missed: number;
};

export type Scenario = {
  id: 'coffee' | 'travel';
  label: string;
  shortLabel: string;
  merchant: string;
  category: RewardCategory;
  categoryLabel: string;
  emoji: string;
  amount: number;
  location: string;
  note: string;
  merchantDetail: string;
  defaultCardId: string;
  recommendedCardId: string;
  reason: string;
};

export const CARDS: Card[] = [
  {
    id: 'chase',
    name: 'Sapphire Preferred',
    issuer: 'Chase',
    lastFour: '4821',
    gradKey: 'chase',
    rewards: {
      dining: 3,
      groceries: 1,
      travel: 2,
      shopping: 1,
      entertainment: 1,
      other: 1,
    },
    earned: 28.4,
    bestFor: ['Dining', 'Travel'],
    network: 'Visa',
  },
  {
    id: 'amex',
    name: 'Gold Card',
    issuer: 'American Express',
    lastFour: '3614',
    gradKey: 'amex',
    rewards: {
      dining: 4,
      groceries: 4,
      travel: 1,
      shopping: 1,
      entertainment: 1,
      other: 1,
    },
    earned: 19.2,
    bestFor: ['Dining', 'Groceries'],
    network: 'Amex',
  },
  {
    id: 'apple',
    name: 'Apple Card',
    issuer: 'Apple',
    lastFour: '0001',
    gradKey: 'apple',
    rewards: {
      dining: 2,
      groceries: 2,
      travel: 1,
      shopping: 2,
      entertainment: 2,
      other: 1,
    },
    earned: 8.1,
    bestFor: ['Apple Pay', 'Everyday'],
    network: 'Mastercard',
  },
  {
    id: 'citi',
    name: 'Double Cash',
    issuer: 'Citi',
    lastFour: '7703',
    gradKey: 'citi',
    rewards: {
      dining: 2,
      groceries: 2,
      travel: 2,
      shopping: 2,
      entertainment: 2,
      other: 2,
    },
    earned: 6.6,
    bestFor: ['Everything', 'Simplicity'],
    network: 'Mastercard',
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    merchant: 'Blue Bottle Coffee',
    category: 'dining',
    emoji: 'Cafe',
    amount: 6.5,
    cardId: 'chase',
    rewardsEarned: 0.2,
    date: 'Today, 8:42 AM',
  },
  {
    id: 't2',
    merchant: 'Whole Foods Market',
    category: 'groceries',
    emoji: 'Grocery',
    amount: 87.3,
    cardId: 'amex',
    rewardsEarned: 3.49,
    date: 'Today, 12:15 PM',
  },
  {
    id: 't3',
    merchant: 'Uber Eats',
    category: 'dining',
    emoji: 'Dining',
    amount: 34.2,
    cardId: 'amex',
    rewardsEarned: 1.37,
    date: 'Yesterday, 7:30 PM',
  },
  {
    id: 't4',
    merchant: 'United Airlines',
    category: 'travel',
    emoji: 'Travel',
    amount: 312,
    cardId: 'chase',
    rewardsEarned: 6.24,
    date: 'May 20, 3:10 PM',
  },
  {
    id: 't5',
    merchant: 'Apple Store',
    category: 'shopping',
    emoji: 'Shopping',
    amount: 149,
    cardId: 'apple',
    rewardsEarned: 4.47,
    date: 'May 19, 11:00 AM',
  },
];

export const SPEND_CATS: SpendCat[] = [
  {
    key: 'dining',
    label: 'Dining',
    emoji: 'Dining',
    amount: 380,
    color: '#FF9F0A',
    bestCardId: 'amex',
    missed: 3.8,
  },
  {
    key: 'shopping',
    label: 'Shopping',
    emoji: 'Shopping',
    amount: 310,
    color: '#007AFF',
    bestCardId: 'apple',
    missed: 0,
  },
  {
    key: 'groceries',
    label: 'Groceries',
    emoji: 'Groceries',
    amount: 245,
    color: '#30D158',
    bestCardId: 'amex',
    missed: 0,
  },
  {
    key: 'other',
    label: 'Other',
    emoji: 'Other',
    amount: 160,
    color: '#636366',
    bestCardId: 'citi',
    missed: 0,
  },
  {
    key: 'travel',
    label: 'Travel',
    emoji: 'Travel',
    amount: 120,
    color: '#5E5CE6',
    bestCardId: 'chase',
    missed: 0,
  },
  {
    key: 'entertainment',
    label: 'Entertainment',
    emoji: 'Entertainment',
    amount: 85,
    color: '#FF375F',
    bestCardId: 'chase',
    missed: 0.85,
  },
];

export const SCENARIOS: Scenario[] = [
  {
    id: 'coffee',
    label: 'Coffee Run',
    shortLabel: 'Coffee',
    merchant: 'Blue Bottle Coffee',
    category: 'dining',
    categoryLabel: 'Cafe purchase',
    emoji: 'Coffee',
    amount: 6.5,
    location: 'Hayes Valley, San Francisco',
    note: 'Wallet+ recognizes this merchant as dining and moves your highest-earning dining card to the top.',
    merchantDetail: '2 blocks away from your office',
    defaultCardId: 'apple',
    recommendedCardId: 'amex',
    reason: '4x points on dining beats your everyday card for this stop.',
  },
  {
    id: 'travel',
    label: 'Travel Day',
    shortLabel: 'Travel',
    merchant: 'United Airlines',
    category: 'travel',
    categoryLabel: 'Airline purchase',
    emoji: 'Flight',
    amount: 312,
    location: 'SFO Terminal 3',
    note: 'Wallet+ notices an airline merchant and brings your travel card forward before you double-click to pay.',
    merchantDetail: 'Boarding pass and payment card side by side',
    defaultCardId: 'apple',
    recommendedCardId: 'chase',
    reason: '2x points on travel is the strongest match for airline spend.',
  },
];

export const TOTAL_SPEND = SPEND_CATS.reduce((sum, cat) => sum + cat.amount, 0);
export const TOTAL_EARNED = CARDS.reduce((sum, card) => sum + card.earned, 0);
export const REWARDS_GOAL = 80;

export function getCardById(cardId: string) {
  return CARDS.find((card) => card.id === cardId)!;
}

export function getScenarioById(scenarioId: Scenario['id']) {
  return SCENARIOS.find((scenario) => scenario.id === scenarioId)!;
}

export function getRewardsEarned(cardId: string, category: RewardCategory, amount: number) {
  const card = getCardById(cardId);
  const rate = card.rewards[category] ?? 1;
  return (amount * rate) / 100;
}
