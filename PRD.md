# Apple Wallet+ — Product Requirements Document

**Version:** 1.0  
**Date:** May 22, 2026  
**Team:** Alankrita Srivastava, Amaya Duncan, Hayden Kwok, Pavan Ulluri, Shalini Harwalkar, Vaibhav Jain  
**Course:** MGT 456

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem & Unmet Need](#2-problem--unmet-need)
3. [Value Proposition](#3-value-proposition)
4. [Target Users](#4-target-users)
5. [Key Features](#5-key-features)
6. [Design System](#6-design-system)
7. [Screen Architecture & User Flows](#7-screen-architecture--user-flows)
8. [Tech Stack](#8-tech-stack)
9. [Success Metrics](#9-success-metrics)
10. [Business & Strategic Rationale](#10-business--strategic-rationale)
11. [High-Level Roadmap](#11-high-level-roadmap)
12. [Out of Scope (Prototype)](#12-out-of-scope-prototype)

---

## 1. Executive Summary

Apple Wallet+ is a subscription-based intelligence layer built on top of Apple Wallet. It solves a specific, validated pain point: users with multiple credit cards frequently feel unsure which card to use at checkout, resulting in missed rewards. Wallet+ automatically recommends the optimal card at the moment of payment — based on merchant location, spending category, and per-card reward mappings — while keeping the user in control at all times.

The product is inspired by Apple Fitness+ in structure and feel: a bottom-tab dashboard experience that gives users a unified view of their financial health, rewards progress, and smart payment recommendations. Design stays faithful to Apple Wallet's dark, card-focused aesthetic.

---

## 2. Problem & Unmet Need

**Who:** Apple Wallet users who own 2+ credit or debit cards, frequently pay digitally, and care about maximizing rewards.

**The pain point:**
- **67%** of surveyed users sometimes feel unsure which card to use at checkout *(Syntruth study, n=64, May 2026)*
- **81%** believe they sometimes miss out on rewards by using the wrong card
- **80%** actively compare reward benefits before selecting a card — creating friction at every checkout

**Why existing solutions fall short:**
- Apple Wallet is passive: it stores cards and enables payment but provides no recommendation
- Bank and credit card apps show per-card rewards in isolation — users must context-switch and compare manually
- Third-party apps (Wallet-O-Matic, etc.) lack Apple Pay integration and feel disconnected from the checkout moment

**Why it matters:**
- **89%** of users cite rewards program benefits as the #1 factor influencing which card they choose
- Rewards maximization is the primary driver — yet the decision happens at the worst possible moment: while standing at a register

---

## 3. Value Proposition

> Apple Wallet+ recommends the best card at checkout so you earn more rewards without thinking about it — and you're always one tap away from choosing differently.

**Core benefits:**
1. **Right card, automatically** — location and merchant category trigger an instant recommendation before you double-tap
2. **You stay in control** — 89% of users prefer "recommend but let me choose"; Wallet+ pre-selects but never forces
3. **See your full financial picture** — a Fitness+-style dashboard shows spending by category, rewards earned, and missed opportunities
4. **Privacy by design** — all recommendation logic runs on-device; no transaction data leaves the user's iPhone

**Why Apple Wallet+ wins over alternatives:**
- Tightly integrated into the Apple Pay flow — no app switching, no manual comparison
- Privacy-first on-device processing (top adoption driver at 63%)
- Clean override mechanism (top adoption driver at 63%)

---

## 4. Target Users

**Primary persona:** Multi-card digital natives
- 2–5 credit/debit cards stored in Apple Wallet
- Pay with Apple Pay at least several times per week
- Motivated to maximize rewards but unwilling to memorize reward tables or use a separate app

**Secondary persona:** Rewards-curious upgraders
- Currently use 1–2 cards habitually
- Aware they might be leaving rewards on the table
- Would benefit from Wallet+ recommendations to discover their cards' full value

**Day-in-the-life use cases:**
- Morning coffee at Blue Bottle → Wallet+ detects "Café / Dining," recommends Chase Sapphire (3x points)
- Lunch order on DoorDash → Wallet+ detects "Food Delivery," recommends Amex Gold (4x dining)
- Flight booked on United → Wallet+ detects "Travel," recommends Chase Sapphire (2x travel)
- Grocery run at Whole Foods → Wallet+ detects "Groceries," recommends Amex Gold (4x groceries)

---

## 5. Key Features

### 5.1 Smart Card Picker (Core Feature)
At checkout, Wallet+ instantly surfaces the optimal card based on:
- **Merchant location** (GPS + merchant category code)
- **Spending category** (dining, groceries, travel, shopping, entertainment, etc.)
- **Per-card reward mappings** (stored on-device, synced from card issuers)
- **Active promotions** (bonus categories, limited-time multipliers)

The recommended card is pre-selected when the user double-taps the side button. A clear reason is shown: *"3x points on dining"*.

### 5.2 User Override
The recommended card is a suggestion, not a lock. Users can:
- Swipe left/right through their other cards before confirming
- Set a "force card" for specific merchant types in Settings
- Dismiss Wallet+ recommendations entirely per-transaction

This is non-negotiable: 89% of survey respondents want "recommend but let me choose." 0% want fully automatic selection.

### 5.3 Spending Dashboard (Fitness+-Style Home Tab)
A unified home screen showing:
- Total rewards earned this month (ring visualization)
- Spending breakdown by category (donut chart)
- Recent transactions with card-level attribution
- Quick "Pay Now" button to trigger the checkout flow

### 5.4 Rewards Insights Tab
- Side-by-side comparison: rewards earned vs. rewards missed
- Per-category best-card recommendation ("For dining, Amex Gold earns 4x vs. your current 1x")
- Trend line: rewards trajectory month-over-month

### 5.5 Card Catalog Tab
- Swipeable card stack (faithful to Apple Wallet visual language)
- Per-card breakdown: reward rate by category, total earned this month, best-use scenarios
- "Best for" tags (Dining, Travel, Groceries, Everyday)

### 5.6 Checkout Flow (3-Step Modal)
**Step 1 — Smart Card Select**
- Location badge ("Detected: Blue Bottle Coffee")
- Category pill ("☕ Café · Dining")
- Wallet+ recommended card (highlighted with glowing border + reason text)
- Scrollable row of other cards to override
- "Pay $X.XX" CTA

**Step 2 — Verify**
- Face ID icon with pulse animation
- "Double-click to confirm" label
- Amount + merchant visible

**Step 3 — Confirmed**
- Green checkmark with animation
- Merchant + amount + card used
- "+$0.XX in rewards" earned badge
- Dismiss

### 5.7 Onboarding (3 Slides)
1. **What is Wallet+** — hero intro, double-tap interaction preview
2. **Smart Payments** — card recommendation flow preview
3. **Your Rewards** — dashboard preview + subscription CTA ($3.99/mo)

### 5.8 Privacy & Control (Profile Tab)
- On-device processing toggle (default: ON)
- Location access for merchant detection (opt-in)
- Notification preferences (real-time reward alerts)
- Subscription management

---

## 6. Design System

### Philosophy
Stay faithful to **Apple Wallet's** visual language while borrowing **Apple Fitness+'s** structural patterns (bottom nav, ring visualizations, category hero cards, bold stat displays).

### Colors
| Token | Value | Usage |
|---|---|---|
| `background` | `#000000` | App background (pure black, like Wallet) |
| `surface` | `#1C1C1E` | Card surfaces, modals |
| `surfaceElevated` | `#2C2C2E` | Elevated elements |
| `accent` | `#007AFF` | Primary CTA, links |
| `walletPlusStart` | `#7B2FBE` | Gradient start (Wallet+ brand) |
| `walletPlusEnd` | `#4A90D9` | Gradient end (Wallet+ brand) |
| `success` | `#30D158` | Confirmations, positive states |
| `warning` | `#FF9F0A` | Missed rewards, alerts |
| `textPrimary` | `#FFFFFF` | Main text |
| `textSecondary` | `#8E8E93` | Secondary labels |

### Typography
- **Display headers:** System font (SF Pro Display equivalent), weight 700, 28–34pt
- **Section headers:** System font, weight 600, 17–22pt
- **Body:** System font, weight 400, 15–17pt
- **Labels/captions:** System font, weight 500, 12–13pt

### Card Design
- Rounded corners: `borderRadius: 20`
- Gradient backgrounds unique per card issuer
- Subtle shadow: `shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 12`
- Frosted glass treatment on modal overlays

### Navigation
- Bottom tab bar with 4 tabs (Home, Cards, Insights, Profile)
- Translucent background with blur (matches iOS tab bar behavior)
- Active state: `#007AFF` tinted icon + label
- Tab icons from `@expo/vector-icons` (Ionicons)

---

## 7. Screen Architecture & User Flows

```
App Entry
├── Onboarding (shown once on first launch)
│   ├── Slide 1: What is Wallet+
│   ├── Slide 2: Smart Payments
│   └── Slide 3: Your Rewards + Subscribe CTA
│
└── Main App — Bottom Tab Navigator
    ├── [Tab 1] Home
    │   ├── Greeting + date
    │   ├── Rewards ring (earned this month / goal)
    │   ├── Spending category summary pills
    │   ├── Recent transactions list
    │   └── "Pay Now" → Checkout Modal
    │
    ├── [Tab 2] Cards
    │   ├── Card stack (swipeable)
    │   └── Per-card rewards breakdown + best-use tags
    │
    ├── [Tab 3] Insights
    │   ├── Spending donut chart by category
    │   ├── Rewards earned vs. missed bar chart
    │   └── AI recommendation callouts
    │
    └── [Tab 4] Profile
        ├── Wallet+ subscription badge
        ├── Privacy & on-device toggle
        └── Notification preferences

Checkout Modal (full-screen overlay from any tab)
    ├── Step 1: Smart Card Select
    │   ├── Location + category detection banner
    │   ├── Recommended card (highlighted)
    │   └── Override card row + Pay CTA
    ├── Step 2: Face ID verification
    └── Step 3: Payment confirmed + rewards earned
```

### Primary Flow — Cafe Scenario
1. User opens app or is at checkout, taps "Pay Now"
2. Checkout modal opens → GPS detects Blue Bottle Coffee → categorized as "Café · Dining"
3. Wallet+ highlights Chase Sapphire Preferred: *"3x points on dining — best for this purchase"*
4. User accepts (or swipes to a different card)
5. Face ID animation plays
6. Confirmation screen: "$6.50 · Blue Bottle Coffee · Chase Sapphire · +$0.20 in rewards"

---

## 8. Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Framework** | React Native + Expo SDK 52 | True mobile prototype; runs on iPhone via Expo Go with no Xcode build required; fastest path to real-device demo |
| **Language** | TypeScript | Type safety, better DX, industry standard |
| **Navigation** | React Navigation v6 (bottom-tabs + stack) | Native-feeling transitions, industry standard for RN apps |
| **Animations** | React Native Reanimated 3 | Smooth card swipe, Face ID pulse, checkout step transitions |
| **Gradients** | expo-linear-gradient | Apple-quality gradient card backgrounds |
| **Charts/SVG** | react-native-svg (Expo-bundled) | Custom donut chart and reward ring drawn with SVG Circles/Paths |
| **Icons** | @expo/vector-icons (Ionicons) | Closest available approximation of SF Symbols in Expo ecosystem |
| **State** | React Context + useState | Sufficient for prototype with fully mocked data; no backend |
| **Data** | Hardcoded TypeScript mock data | Frontend-only prototype; no API, no auth, no persistence needed |
| **Styling** | React Native StyleSheet + design tokens | Keeps the Apple-faithful dark palette consistent across all screens |

**Why not SwiftUI?** Requires Xcode, Apple Developer account, and native iOS build toolchain — adds significant friction for a prototype. Expo Go removes that barrier entirely.

**Why not a web app?** The checkout double-tap flow, card swipe gestures, and Face ID simulation feel authentically native only on an actual device. React Native in Expo Go achieves this.

---

## 9. Success Metrics

| Metric | Description | Target |
|---|---|---|
| Recommendation acceptance rate | % of checkouts where user accepts Wallet+ card pick | >70% |
| Rewards uplift | Estimated rewards earned vs. default single-card usage | +15–25% per month |
| Checkout friction | Time from double-tap to payment confirmed | <4 seconds |
| Override comfort | % of users who say override option makes them more comfortable | >80% |
| Subscription conversion | % of free Wallet users who upgrade to Wallet+ | >12% |
| NPS | Net Promoter Score after 30 days | >45 |

---

## 10. Business & Strategic Rationale

### Revenue Model
- **Subscription:** $3.99/month or $34.99/year (à la Apple One tiered bundling)
- **Premium tier:** $6.99/month adds concierge card advisory and issuer-exclusive offers
- **Bundling:** Include Wallet+ in Apple One or iCloud+ tiers to drive adoption

### Strategic Entrenchment
Apple's financial ecosystem play (Apple Pay, Apple Card, Apple Cash, Savings) lacks a "intelligence" layer. Wallet+ closes that gap:
- Users who optimize payments through Wallet+ generate richer transaction signals on Apple's platform
- Higher Apple Pay usage → more data → better recommendations → stronger retention loop
- Positions Apple as the financial OS, not just a payments rail

### Issuer Partnership Revenue
Premium card issuers (Chase, Amex, Citi, Capital One) pay for:
- Priority placement in Wallet+ recommendations (compliant with recommendation accuracy rules)
- "Partner offer" badges when their card is optimal for a transaction
- Co-marketing through Wallet+ Insights ("Earn 5x this weekend at Whole Foods")

### Competitive Moat
- **Privacy:** On-device processing is something only Apple can credibly promise at scale
- **Integration:** Only Apple can integrate into the Apple Pay double-tap natively
- **Trust:** Apple's brand trust in financial services is unmatched among device OEMs

---

## 11. High-Level Roadmap

| Phase | Dates | Focus |
|---|---|---|
| Research & Discovery | May 4 – May 18, 2026 | User interviews, Syntruth survey, competitive analysis |
| MVP Prototype | May 18 – June 1, 2026 | Card selection prototype, privacy-first UX, usability testing |
| Core Build | June 1 – June 15, 2026 | On-device recommendation engine, checkout context detection, issuer data integration |
| Advanced Features | June 15 – June 26, 2026 | Spending pattern modeling, reward preference engine, expense tracking |
| Monetization | June 22 – June 26, 2026 | Wallet+ premium subscription, issuer partnerships, v1 ship |

---

## 12. Out of Scope (Prototype)

The following are intentionally excluded from the v1 prototype and deferred to production phases:

- Real Apple Pay integration (requires Apple developer entitlements)
- Live card issuer API connections (reward rates are mocked)
- Actual GPS location services (location is simulated in checkout modal)
- Real Face ID/Touch ID (simulated animation only)
- Backend, authentication, or user accounts
- Push notifications
- Actual subscription billing
- Android support (iOS prototype only)
