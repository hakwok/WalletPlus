import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CARDS, PASSES, CardType } from '../data/walletData';
import { Colors } from '../theme/colors';
import CreditCard from '../components/CreditCard';
import PassCard from '../components/PassCard';
import CardDetailScreen from './CardDetailScreen';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;
const CARD_HEIGHT = Math.round(CARD_WIDTH / 1.586);
const PEEK_HEIGHT = 82;
const STACK_HEIGHT = CARD_HEIGHT + (CARDS.length - 1) * PEEK_HEIGHT;

function AddCardSheet({ onClose }: { onClose: () => void }) {
  const options = [
    { icon: 'card-outline' as const, label: 'Debit or Credit Card' },
    { icon: 'train-outline' as const, label: 'Transit Card' },
    { icon: 'school-outline' as const, label: 'Student ID Card' },
    { icon: 'car-outline' as const, label: "Driver's License or State ID" },
    { icon: 'key-outline' as const, label: 'Hotel Key' },
    { icon: 'home-outline' as const, label: 'Home Key' },
  ];

  return (
    <View style={addStyles.root}>
      {/* Drag handle */}
      <View style={addStyles.handleContainer}>
        <View style={addStyles.handle} />
      </View>

      <Text style={addStyles.title}>Add to Wallet</Text>

      <View style={addStyles.optionList}>
        {options.map(({ icon, label }, idx) => (
          <View key={label}>
            <TouchableOpacity style={addStyles.option} onPress={onClose}>
              <View style={addStyles.optionIcon}>
                <Ionicons name={icon} size={22} color={Colors.blue} />
              </View>
              <Text style={addStyles.optionLabel}>{label}</Text>
              <Ionicons name="chevron-forward" size={17} color={Colors.tertiaryLabel} />
            </TouchableOpacity>
            {idx < options.length - 1 && (
              <View style={addStyles.separator} />
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity style={addStyles.cancelButton} onPress={onClose}>
        <Text style={addStyles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function WalletScreen() {
  const [activeCardId, setActiveCardId] = useState(CARDS[0].id);
  const [detailCard, setDetailCard] = useState<CardType | null>(null);
  const [showAddCard, setShowAddCard] = useState(false);

  // Active card is always rendered at index 0 (top of stack)
  const orderedCards = [
    CARDS.find(c => c.id === activeCardId)!,
    ...CARDS.filter(c => c.id !== activeCardId),
  ];

  const handleCardPress = (card: CardType, stackIndex: number) => {
    if (stackIndex === 0) {
      // Active card tapped → show detail
      setDetailCard(card);
    } else {
      // Non-active card tapped → bring to front
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setActiveCardId(card.id);
    }
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddCard(true)}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Card Stack */}
        <View style={styles.stackOuter}>
          <View style={{ height: STACK_HEIGHT, position: 'relative' }}>
            {orderedCards.map((card, stackIndex) => (
              <TouchableOpacity
                key={card.id}
                activeOpacity={stackIndex === 0 ? 0.95 : 0.88}
                onPress={() => handleCardPress(card, stackIndex)}
                style={[
                  styles.cardWrapper,
                  {
                    top: stackIndex * PEEK_HEIGHT,
                    zIndex: CARDS.length - stackIndex,
                    elevation: CARDS.length - stackIndex,
                  },
                ]}
              >
                <CreditCard card={card} width={CARD_WIDTH} height={CARD_HEIGHT} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Apple Pay section */}
        <View style={styles.applePayRow}>
          <View style={styles.applePayLeft}>
            <Ionicons name="phone-portrait-outline" size={18} color={Colors.secondaryLabel} />
            <Text style={styles.applePayText}>Apple Pay</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={22} color={Colors.secondaryLabel} />
          </TouchableOpacity>
        </View>

        {/* Passes section */}
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionLabelText}>PASSES</Text>
        </View>

        <View style={styles.passesContainer}>
          {PASSES.map(pass => (
            <PassCard key={pass.id} pass={pass} />
          ))}
        </View>

        {/* Order passes link */}
        <TouchableOpacity style={styles.orderRow}>
          <Ionicons name="ticket-outline" size={20} color={Colors.blue} />
          <Text style={styles.orderText}>Order Passes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Card Detail Modal */}
      <Modal
        visible={detailCard !== null}
        animationType="slide"
        presentationStyle={Platform.OS === 'ios' ? 'fullScreen' : 'fullScreen'}
        onRequestClose={() => setDetailCard(null)}
      >
        {detailCard && (
          <CardDetailScreen
            card={detailCard}
            onClose={() => setDetailCard(null)}
          />
        )}
      </Modal>

      {/* Add to Wallet Modal */}
      <Modal
        visible={showAddCard}
        animationType="slide"
        transparent
        onRequestClose={() => setShowAddCard(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAddCard(false)}
        >
          <TouchableOpacity activeOpacity={1} onPress={() => {}}>
            <AddCardSheet onClose={() => setShowAddCard(false)} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.systemGroupedBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    paddingTop: 4,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.label,
    letterSpacing: 0.3,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  stackOuter: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  cardWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  applePayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingTop: 4,
  },
  applePayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  applePayText: {
    fontSize: 14,
    color: Colors.secondaryLabel,
    fontWeight: '400',
  },
  sectionLabel: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondaryLabel,
    letterSpacing: 0.6,
  },
  passesContainer: {
    paddingHorizontal: 16,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 8,
    paddingVertical: 14,
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  orderText: {
    fontSize: 15,
    color: Colors.blue,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
});

const addStyles = StyleSheet.create({
  root: {
    backgroundColor: Colors.systemGroupedBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.separator,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.label,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionList: {
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: Colors.systemFill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    color: Colors.label,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.separator,
    marginLeft: 62,
  },
  cancelButton: {
    backgroundColor: Colors.secondarySystemGroupedBackground,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.blue,
  },
});
