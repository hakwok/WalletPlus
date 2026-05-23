import React, { useState, useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { CARDS, CHECKOUT_SCENARIOS, getCurrentScenarioIndex } from '../data/mockData';
import CardWidget from './CardWidget';

const { width, height } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CheckoutModal({ visible, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const scenario = CHECKOUT_SCENARIOS[getCurrentScenarioIndex()];
  const recommendedCard = CARDS.find(c => c.id === scenario.recommendedCardId)!;
  const selectedCard = CARDS.find(c => c.id === selectedCardId) ?? recommendedCard;
  const rewardsRate = selectedCard.rewards[scenario.category];
  const rewardsEarned = (scenario.amount * rewardsRate) / 100;

  useEffect(() => {
    if (visible) {
      setStep(0);
      setSelectedCardId(scenario.recommendedCardId);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(30);
      checkAnim.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    if (step === 1) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 700, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        ])
      );
      pulse.start();
      const timer = setTimeout(() => {
        pulse.stop();
        pulseAnim.setValue(1);
        setStep(2);
        Animated.spring(checkAnim, { toValue: 1, useNativeDriver: true, tension: 80, friction: 6 }).start();
      }, 2200);
      return () => { clearTimeout(timer); pulse.stop(); };
    }
  }, [step]);

  const handleClose = () => {
    Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
      onClose();
      setStep(0);
    });
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.backdrop} onPress={step === 2 ? handleClose : undefined} />
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.handle} />

          {/* Step 0 — Card Selection */}
          {step === 0 && (
            <View style={styles.stepContainer}>
              {/* Location banner */}
              <LinearGradient
                colors={['rgba(123,47,190,0.3)', 'rgba(74,144,217,0.1)']}
                style={styles.locationBanner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="location" size={14} color={Colors.walletPlusMid} />
                <Text style={styles.locationText}>Detected: {scenario.merchant}</Text>
                <Text style={styles.locationSub}>{scenario.location}</Text>
              </LinearGradient>

              <View style={styles.categoryRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryEmoji}>{scenario.categoryEmoji}</Text>
                  <Text style={styles.categoryLabel}>{scenario.categoryLabel}</Text>
                </View>
              </View>

              <View style={styles.recommendHeader}>
                <LinearGradient
                  colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
                  style={styles.recommendBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="sparkles" size={12} color="#FFF" />
                  <Text style={styles.recommendBadgeText}>Wallet+ Recommends</Text>
                </LinearGradient>
              </View>

              {/* Main recommended card */}
              <View style={styles.mainCard}>
                <CardWidget
                  card={selectedCard}
                  selected={selectedCardId === selectedCard.id}
                />
                <View style={styles.reasonRow}>
                  <Ionicons name="star" size={13} color={Colors.warning} />
                  <Text style={styles.reasonText}>{scenario.recommendReason}</Text>
                </View>
              </View>

              {/* Other cards to switch */}
              <Text style={styles.otherLabel}>Other cards</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.otherCards} contentContainerStyle={{ gap: 10, paddingHorizontal: 2 }}>
                {CARDS.filter(c => c.id !== selectedCardId).map(card => (
                  <CardWidget
                    key={card.id}
                    card={card}
                    compact
                    onPress={() => setSelectedCardId(card.id)}
                  />
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.payButton} onPress={() => setStep(1)} activeOpacity={0.85}>
                <LinearGradient
                  colors={[Colors.accent, '#005DC9']}
                  style={styles.payGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.payText}>Pay ${scenario.amount.toFixed(2)}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleClose} style={styles.cancelBtn}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 1 — Face ID */}
          {step === 1 && (
            <View style={styles.stepContainer}>
              <View style={styles.verifySection}>
                <Text style={styles.verifyAmount}>${scenario.amount.toFixed(2)}</Text>
                <Text style={styles.verifyMerchant}>{scenario.merchant}</Text>

                <Animated.View style={[styles.faceIdRing, { transform: [{ scale: pulseAnim }] }]}>
                  <View style={styles.faceIdInner}>
                    <Ionicons name="scan" size={52} color={Colors.textPrimary} />
                  </View>
                </Animated.View>

                <Text style={styles.verifyLabel}>Double-click to confirm</Text>
                <Text style={styles.verifyCard}>
                  {selectedCard.issuer} ···{selectedCard.lastFour}
                </Text>
              </View>
            </View>
          )}

          {/* Step 2 — Confirmed */}
          {step === 2 && (
            <View style={styles.stepContainer}>
              <View style={styles.confirmedSection}>
                <Animated.View style={[styles.checkCircle, { transform: [{ scale: checkAnim }] }]}>
                  <LinearGradient
                    colors={[Colors.success, '#1FA644']}
                    style={styles.checkGradient}
                  >
                    <Ionicons name="checkmark" size={40} color="#FFF" />
                  </LinearGradient>
                </Animated.View>

                <Text style={styles.confirmedTitle}>Payment Confirmed</Text>
                <Text style={styles.confirmedMerchant}>{scenario.merchant}</Text>
                <Text style={styles.confirmedAmount}>${scenario.amount.toFixed(2)}</Text>

                <View style={styles.confirmedCard}>
                  <Ionicons name="card-outline" size={16} color={Colors.textSecondary} />
                  <Text style={styles.confirmedCardText}>
                    {selectedCard.issuer} {selectedCard.name} ···{selectedCard.lastFour}
                  </Text>
                </View>

                <View style={styles.rewardsPill}>
                  <Ionicons name="star" size={14} color={Colors.warning} />
                  <Text style={styles.rewardsText}>
                    +${rewardsEarned.toFixed(2)} in rewards earned
                  </Text>
                </View>

                <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheet: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    minHeight: height * 0.72,
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: Colors.surfaceHighlight,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  // Step 0
  locationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    gap: 6,
    marginBottom: 14,
  },
  locationText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  locationSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  categoryRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  categoryLabel: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  recommendHeader: {
    marginBottom: 14,
  },
  recommendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  recommendBadgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '700',
  },
  mainCard: {
    marginBottom: 18,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 4,
  },
  reasonText: {
    fontSize: 13,
    color: Colors.textSecondary,
    flex: 1,
  },
  otherLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  otherCards: {
    marginBottom: 22,
  },
  payButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  payGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  payText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFF',
  },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cancelText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },

  // Step 1
  verifySection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    gap: 16,
  },
  verifyAmount: {
    fontSize: 44,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1.5,
  },
  verifyMerchant: {
    fontSize: 17,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  faceIdRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  faceIdInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyLabel: {
    fontSize: 17,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  verifyCard: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  // Step 2
  confirmedSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 30,
    gap: 12,
  },
  checkCircle: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  checkGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmedTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  confirmedMerchant: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  confirmedAmount: {
    fontSize: 38,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -1,
    marginVertical: 4,
  },
  confirmedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  confirmedCardText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  rewardsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.warningSoft,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginTop: 8,
  },
  rewardsText: {
    fontSize: 14,
    color: Colors.warning,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 16,
  },
  doneText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});
