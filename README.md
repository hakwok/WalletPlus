# Apple Wallet+

A high-fidelity iPhone prototype of **Apple Wallet+** — a subscription-based intelligence layer for Apple Wallet that automatically recommends the optimal payment card at checkout using location context, merchant category, and reward mappings.

Inspired by Apple Fitness+ in structure and navigation, faithful to Apple Wallet's dark card-focused aesthetic.

---

## What is Wallet+?

Apple Wallet already stores your cards. Wallet+ makes them smarter.

- **Smart Card Picker** — at checkout, Wallet+ detects the merchant (café, grocery, travel) and recommends the card that earns the most rewards for that category
- **You stay in control** — the recommended card is pre-selected, but you can always swipe to a different card before paying
- **Rewards Dashboard** — a Fitness+-style home screen showing spending by category, rewards earned, and missed opportunities
- **Privacy-first** — all recommendation logic runs on-device; no transaction data leaves your iPhone

---

## Screens

| Screen | Description |
|---|---|
| **Onboarding** | 3-slide intro to Wallet+ features with subscription CTA |
| **Home** | Rewards ring, spending summary, recent transactions, Pay Now button |
| **Cards** | Swipeable card stack with per-card reward rates and best-use tags |
| **Insights** | Spending donut chart, rewards earned vs. missed, AI card recommendations |
| **Profile** | Subscription status, privacy settings, notification preferences |
| **Checkout Modal** | 3-step flow: smart card selection → Face ID → payment confirmed |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 56 |
| Language | TypeScript |
| Navigation | React Navigation v6 (bottom-tabs + stack) |
| Animations | React Native Reanimated 3 |
| Gradients | expo-linear-gradient |
| Charts | react-native-svg (custom donut + ring) |
| Icons | @expo/vector-icons (Ionicons) |
| State | React Context + useState (mock data, no backend) |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Expo Go app installed on your iPhone ([App Store](https://apps.apple.com/us/app/expo-go/id982107779))

### Setup

```bash
npm install
npx expo start
```

Scan the QR code with your iPhone camera (or Expo Go on Android). The prototype runs entirely on the client — no backend, no accounts, no API keys required.

### Running in iOS Simulator

```bash
npx expo start --ios
```

Requires Xcode installed on macOS.

---

## Project Structure

```
WalletPlus/
├── App.tsx                    # Entry point — onboarding gate + main navigator
├── src/
│   ├── theme/
│   │   └── colors.ts          # Design tokens (dark palette + Wallet+ brand gradient)
│   ├── data/
│   │   └── mockData.ts        # Mock cards, transactions, spending categories
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Bottom tab navigator + stack
│   ├── screens/
│   │   ├── OnboardingScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CardsScreen.tsx
│   │   ├── InsightsScreen.tsx
│   │   └── ProfileScreen.tsx
│   └── components/
│       ├── CheckoutModal.tsx  # 3-step checkout flow overlay
│       ├── RewardRing.tsx     # SVG circular progress ring
│       ├── CardWidget.tsx     # Individual card UI component
│       └── TransactionRow.tsx # Transaction list item
```

---

## Design Principles

- **Apple Wallet DNA** — pure black background, rounded card surfaces, frosted glass modals
- **Fitness+ structure** — bottom tab bar, ring/stat visualizations, bold category headers
- **User control always** — recommendations are suggestions; override is always one tap away
- **Privacy signaling** — on-device badge visible in Profile; no cloud upload indicators

---

## Research Foundation

Built on a Syntruth AI research study (64 simulated respondents, May 2026):
- 67% of Apple Wallet users sometimes feel unsure which card to use
- 81% think they miss rewards by using the wrong card
- 89% prefer "recommend but let me choose" over fully automatic selection
- 63% cite data privacy assurance as a top adoption driver

See [PRD.md](./PRD.md) for the full product requirements document.

---

## Team

MGT 456 · Team 2  
Alankrita Srivastava · Amaya Duncan · Hayden Kwok · Pavan Ulluri · Shalini Harwalkar · Vaibhav Jain
