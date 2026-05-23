import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

type Props = {
  onDone: () => void;
};

const SLIDES = [
  {
    id: 0,
    title: 'Meet Wallet+',
    subtitle: 'Your cards are already in Wallet.\nNow let them work smarter.',
    icon: 'wallet' as const,
    gradient: ['#7B2FBE', '#4A90D9'] as const,
    features: [
      { icon: 'sparkles' as const, text: 'Smart card recommendation at every checkout' },
      { icon: 'location' as const, text: 'Location-aware merchant detection' },
      { icon: 'shield-checkmark' as const, text: 'All processed on-device, privately' },
    ],
  },
  {
    id: 1,
    title: 'Always the\nRight Card',
    subtitle: 'Double-tap, and Wallet+ has already\npicked the card that earns you the most.',
    icon: 'card' as const,
    gradient: ['#1a3a6b', '#4A90D9'] as const,
    features: [
      { icon: 'restaurant' as const, text: '4x points at Blue Bottle Coffee' },
      { icon: 'cart' as const, text: '4x points at Whole Foods' },
      { icon: 'airplane' as const, text: '2x points on United Airlines' },
    ],
  },
  {
    id: 2,
    title: 'Your Rewards,\nMaximized',
    subtitle: 'See where you\'re earning and where\nyou\'re leaving money on the table.',
    icon: 'stats-chart' as const,
    gradient: ['#1a4a2e', '#30D158'] as const,
    features: [
      { icon: 'trending-up' as const, text: 'Monthly rewards dashboard' },
      { icon: 'bar-chart' as const, text: 'Spending insights by category' },
      { icon: 'notifications' as const, text: 'Real-time reward alerts' },
    ],
    cta: true,
  },
];

export default function OnboardingScreen({ onDone }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      onDone();
    }
  };

  const slide = SLIDES[currentSlide];

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scroll}
      >
        {SLIDES.map((s) => (
          <View key={s.id} style={[styles.slide, { width }]}>
            <LinearGradient
              colors={s.gradient}
              style={styles.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <SafeAreaView style={styles.safeHero}>
                <View style={styles.logoBadge}>
                  <Ionicons name="wallet" size={20} color="#FFF" />
                  <Text style={styles.logoText}>Wallet+</Text>
                </View>
                <View style={styles.heroIcon}>
                  <Ionicons name={s.icon} size={64} color="rgba(255,255,255,0.9)" />
                </View>
              </SafeAreaView>
            </LinearGradient>

            <View style={styles.content}>
              <Text style={styles.title}>{s.title}</Text>
              <Text style={styles.subtitle}>{s.subtitle}</Text>

              <View style={styles.features}>
                {s.features.map((f, i) => (
                  <View key={i} style={styles.featureRow}>
                    <View style={styles.featureIcon}>
                      <Ionicons name={f.icon} size={16} color={Colors.walletPlusMid} />
                    </View>
                    <Text style={styles.featureText}>{f.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom controls */}
      <SafeAreaView style={styles.footer} edges={['bottom']}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goToSlide(i)}>
              <View style={[styles.dot, i === currentSlide && styles.dotActive]} />
            </TouchableOpacity>
          ))}
        </View>

        {slide.cta ? (
          <View style={styles.ctaBlock}>
            <TouchableOpacity onPress={onDone} activeOpacity={0.85}>
              <LinearGradient
                colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
                style={styles.subscribeBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.subscribeBtnText}>Try Wallet+ Free</Text>
                <Text style={styles.subscribePrice}>$3.99/mo after trial</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDone} style={styles.skipBtn}>
              <Text style={styles.skipText}>Maybe later</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.navRow}>
            <TouchableOpacity onPress={onDone} style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
              <LinearGradient
                colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
                style={styles.nextBtn}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.nextText}>Next</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  heroGradient: {
    height: 300,
  },
  safeHero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBadge: {
    position: 'absolute',
    top: 16,
    left: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 32,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    gap: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
    flex: 1,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: Colors.background,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.surfaceHighlight,
  },
  dotActive: {
    width: 22,
    backgroundColor: Colors.walletPlusMid,
  },
  ctaBlock: {
    gap: 12,
  },
  subscribeBtn: {
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
  },
  subscribeBtnText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  subscribePrice: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipBtn: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  skipText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
