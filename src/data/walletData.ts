export type CardType = {
  id: string;
  issuerName: string;
  cardholderName: string;
  lastFour: string;
  network: 'visa' | 'mastercard' | 'amex' | 'discover';
  gradient: string[];
  gradientStart: { x: number; y: number };
  gradientEnd: { x: number; y: number };
  textColor: string;
  chipDark: boolean;
};

export type PassType = {
  id: string;
  type: 'boarding' | 'ticket' | 'loyalty';
  title: string;
  subtitle: string;
  // boarding
  origin?: string;
  originCity?: string;
  destination?: string;
  destinationCity?: string;
  gate?: string;
  seat?: string;
  boardingTime?: string;
  flightNumber?: string;
  passengerName?: string;
  // ticket
  venue?: string;
  date?: string;
  section?: string;
  row?: string;
  seatNum?: string;
  // loyalty
  points?: string;
  // shared
  backgroundColor: string[];
  textColor: string;
};

export type TransactionType = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  date: string;
  emoji: string;
  iconBg: string;
  cardId: string;
};

export const CARDS: CardType[] = [
  {
    id: 'apple',
    issuerName: '',
    cardholderName: 'Hayden Kwok',
    lastFour: '1234',
    network: 'mastercard',
    gradient: ['#FFFFFF', '#EFEFEF', '#E4E4E4'],
    gradientStart: { x: 0.1, y: 0 },
    gradientEnd: { x: 1, y: 1 },
    textColor: '#1C1C1E',
    chipDark: true,
  },
  {
    id: 'chase',
    issuerName: 'Chase',
    cardholderName: 'Hayden Kwok',
    lastFour: '5678',
    network: 'visa',
    gradient: ['#0A2342', '#14396A', '#1A4882'],
    gradientStart: { x: 0, y: 0 },
    gradientEnd: { x: 1, y: 1 },
    textColor: '#FFFFFF',
    chipDark: false,
  },
  {
    id: 'amex',
    issuerName: 'American Express',
    cardholderName: 'HAYDEN KWOK',
    lastFour: '9012',
    network: 'amex',
    gradient: ['#C8972E', '#D4A83A', '#B07820'],
    gradientStart: { x: 0, y: 0 },
    gradientEnd: { x: 1, y: 1 },
    textColor: '#FFFFFF',
    chipDark: false,
  },
  {
    id: 'citi',
    issuerName: 'Citi',
    cardholderName: 'Hayden Kwok',
    lastFour: '3456',
    network: 'mastercard',
    gradient: ['#003B5C', '#004A73', '#005A8E'],
    gradientStart: { x: 0, y: 0 },
    gradientEnd: { x: 1, y: 1 },
    textColor: '#FFFFFF',
    chipDark: false,
  },
];

export const PASSES: PassType[] = [
  {
    id: 'boarding1',
    type: 'boarding',
    title: 'United Airlines',
    subtitle: 'Economy Plus',
    origin: 'SFO',
    originCity: 'San Francisco',
    destination: 'JFK',
    destinationCity: 'New York',
    gate: 'B22',
    seat: '14A',
    boardingTime: '7:30 AM',
    flightNumber: 'UA 237',
    passengerName: 'Hayden Kwok',
    backgroundColor: ['#1C3F6E', '#2A5298'],
    textColor: '#FFFFFF',
  },
  {
    id: 'ticket1',
    type: 'ticket',
    title: 'WWDC 2026',
    subtitle: 'Apple Developer Conference',
    venue: 'Apple Park · Cupertino, CA',
    date: 'Mon, Jun 9, 2026 · 9:00 AM',
    section: 'A',
    row: '14',
    seatNum: 'C',
    backgroundColor: ['#1C1C1E', '#2C2C2E'],
    textColor: '#FFFFFF',
  },
  {
    id: 'loyalty1',
    type: 'loyalty',
    title: 'Starbucks',
    subtitle: 'Rewards',
    points: '1,240 Stars',
    backgroundColor: ['#1E3932', '#00704A'],
    textColor: '#FFFFFF',
  },
];

export const TRANSACTIONS: Record<string, TransactionType[]> = {
  apple: [
    { id: 't1', merchant: 'Apple Store', category: 'Shopping', amount: 1299.00, date: 'Today', emoji: '🍎', iconBg: '#E5E5EA', cardId: 'apple' },
    { id: 't2', merchant: 'App Store', category: 'Apps', amount: 4.99, date: 'Today', emoji: '📱', iconBg: '#007AFF', cardId: 'apple' },
    { id: 't3', merchant: 'Apple TV+', category: 'Entertainment', amount: 9.99, date: 'May 28', emoji: '📺', iconBg: '#1C1C1E', cardId: 'apple' },
    { id: 't4', merchant: 'iCloud+', category: 'Services', amount: 2.99, date: 'May 27', emoji: '☁️', iconBg: '#5AC8FA', cardId: 'apple' },
    { id: 't5', merchant: 'Apple Music', category: 'Music', amount: 10.99, date: 'May 26', emoji: '🎵', iconBg: '#FF2D55', cardId: 'apple' },
  ],
  chase: [
    { id: 't6', merchant: 'United Airlines', category: 'Travel', amount: 342.00, date: 'May 29', emoji: '✈️', iconBg: '#1C3F6E', cardId: 'chase' },
    { id: 't7', merchant: 'Marriott', category: 'Hotel', amount: 189.50, date: 'May 28', emoji: '🏨', iconBg: '#A50034', cardId: 'chase' },
    { id: 't8', merchant: 'Lyft', category: 'Transport', amount: 18.40, date: 'May 27', emoji: '🚗', iconBg: '#FF00BF', cardId: 'chase' },
    { id: 't9', merchant: 'DoorDash', category: 'Dining', amount: 31.60, date: 'May 25', emoji: '🍔', iconBg: '#FF3008', cardId: 'chase' },
  ],
  amex: [
    { id: 't10', merchant: 'Nobu', category: 'Dining', amount: 145.20, date: 'May 30', emoji: '🍣', iconBg: '#1C1C1E', cardId: 'amex' },
    { id: 't11', merchant: 'Whole Foods', category: 'Groceries', amount: 87.30, date: 'May 29', emoji: '🛒', iconBg: '#00704A', cardId: 'amex' },
    { id: 't12', merchant: 'Blue Bottle Coffee', category: 'Dining', amount: 6.50, date: 'May 29', emoji: '☕️', iconBg: '#1C1C1E', cardId: 'amex' },
    { id: 't13', merchant: 'Uber Eats', category: 'Dining', amount: 32.10, date: 'May 27', emoji: '🍔', iconBg: '#1C1C1E', cardId: 'amex' },
  ],
  citi: [
    { id: 't14', merchant: 'Amazon', category: 'Shopping', amount: 56.99, date: 'May 30', emoji: '📦', iconBg: '#FF9900', cardId: 'citi' },
    { id: 't15', merchant: 'Netflix', category: 'Entertainment', amount: 15.49, date: 'May 28', emoji: '🎬', iconBg: '#E50914', cardId: 'citi' },
    { id: 't16', merchant: 'Spotify', category: 'Music', amount: 9.99, date: 'May 26', emoji: '🎧', iconBg: '#1DB954', cardId: 'citi' },
    { id: 't17', merchant: 'Target', category: 'Shopping', amount: 43.20, date: 'May 24', emoji: '🎯', iconBg: '#CC0000', cardId: 'citi' },
  ],
};
