import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';

type SettingRow = {
  id: string;
  label: string;
  sublabel?: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  type: 'toggle' | 'nav';
  value?: boolean;
};

export default function ProfileScreen() {
  const [onDevice, setOnDevice] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);
  const [rewardAlerts, setRewardAlerts] = useState(true);
  const [checkoutNudges, setCheckoutNudges] = useState(false);

  const privacySettings: SettingRow[] = [
    {
      id: 'ondevice',
      label: 'On-Device Processing',
      sublabel: 'All recommendation logic runs locally',
      icon: 'shield-checkmark',
      iconColor: Colors.success,
      type: 'toggle',
      value: onDevice,
    },
    {
      id: 'location',
      label: 'Location Access',
      sublabel: 'Used to detect merchant category',
      icon: 'location',
      iconColor: Colors.accent,
      type: 'toggle',
      value: locationAccess,
    },
  ];

  const notificationSettings: SettingRow[] = [
    {
      id: 'alerts',
      label: 'Reward Alerts',
      sublabel: 'Notify when you earn rewards',
      icon: 'star',
      iconColor: Colors.warning,
      type: 'toggle',
      value: rewardAlerts,
    },
    {
      id: 'nudges',
      label: 'Checkout Nudges',
      sublabel: 'Remind to switch cards at checkout',
      icon: 'notifications',
      iconColor: Colors.walletPlusMid,
      type: 'toggle',
      value: checkoutNudges,
    },
  ];

  const handleToggle = (id: string) => {
    if (id === 'ondevice') setOnDevice(v => !v);
    if (id === 'location') setLocationAccess(v => !v);
    if (id === 'alerts') setRewardAlerts(v => !v);
    if (id === 'nudges') setCheckoutNudges(v => !v);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
          </View>

          {/* Subscription card */}
          <LinearGradient
            colors={[Colors.walletPlusStart, Colors.walletPlusEnd]}
            style={styles.subCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.subLeft}>
              <View style={styles.subBadge}>
                <Ionicons name="wallet" size={16} color="#FFF" />
                <Text style={styles.subBadgeText}>Wallet+</Text>
              </View>
              <Text style={styles.subPlan}>Premium Plan</Text>
              <Text style={styles.subPrice}>$3.99 / month</Text>
            </View>
            <View style={styles.subRight}>
              <Ionicons name="checkmark-circle" size={44} color="rgba(255,255,255,0.8)" />
              <Text style={styles.subStatus}>Active</Text>
            </View>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>23</Text>
              <Text style={styles.statLabel}>Smart picks</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>$62.30</Text>
              <Text style={styles.statLabel}>Rewards earned</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>4</Text>
              <Text style={styles.statLabel}>Cards linked</Text>
            </View>
          </View>

          {/* Privacy settings */}
          <Text style={styles.sectionLabel}>Privacy</Text>
          <View style={styles.settingsCard}>
            {privacySettings.map((s, i) => (
              <View key={s.id} style={[styles.settingRow, i < privacySettings.length - 1 && styles.settingBorder]}>
                <View style={[styles.settingIcon, { backgroundColor: (s.iconColor ?? Colors.accent) + '22' }]}>
                  <Ionicons name={s.icon} size={18} color={s.iconColor ?? Colors.accent} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{s.label}</Text>
                  {s.sublabel && <Text style={styles.settingSub}>{s.sublabel}</Text>}
                </View>
                <Switch
                  value={s.value}
                  onValueChange={() => handleToggle(s.id)}
                  trackColor={{ false: Colors.surfaceHighlight, true: Colors.success }}
                  thumbColor="#FFF"
                  ios_backgroundColor={Colors.surfaceHighlight}
                />
              </View>
            ))}
          </View>

          {/* Notifications */}
          <Text style={styles.sectionLabel}>Notifications</Text>
          <View style={styles.settingsCard}>
            {notificationSettings.map((s, i) => (
              <View key={s.id} style={[styles.settingRow, i < notificationSettings.length - 1 && styles.settingBorder]}>
                <View style={[styles.settingIcon, { backgroundColor: (s.iconColor ?? Colors.accent) + '22' }]}>
                  <Ionicons name={s.icon} size={18} color={s.iconColor ?? Colors.accent} />
                </View>
                <View style={styles.settingText}>
                  <Text style={styles.settingLabel}>{s.label}</Text>
                  {s.sublabel && <Text style={styles.settingSub}>{s.sublabel}</Text>}
                </View>
                <Switch
                  value={s.value}
                  onValueChange={() => handleToggle(s.id)}
                  trackColor={{ false: Colors.surfaceHighlight, true: Colors.accent }}
                  thumbColor="#FFF"
                  ios_backgroundColor={Colors.surfaceHighlight}
                />
              </View>
            ))}
          </View>

          {/* About */}
          <Text style={styles.sectionLabel}>About</Text>
          <View style={styles.settingsCard}>
            {[
              { label: 'Privacy Policy', icon: 'document-text-outline' as const },
              { label: 'Terms of Service', icon: 'reader-outline' as const },
              { label: 'How Recommendations Work', icon: 'information-circle-outline' as const },
            ].map((item, i, arr) => (
              <TouchableOpacity
                key={item.label}
                style={[styles.settingRow, i < arr.length - 1 && styles.settingBorder]}
                activeOpacity={0.7}
              >
                <View style={[styles.settingIcon, { backgroundColor: Colors.accentSoft }]}>
                  <Ionicons name={item.icon} size={18} color={Colors.accent} />
                </View>
                <Text style={[styles.settingLabel, styles.settingFlex]}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* On-device badge */}
          {onDevice && (
            <View style={styles.privacyNote}>
              <Ionicons name="shield-checkmark" size={14} color={Colors.success} />
              <Text style={styles.privacyNoteText}>
                On-device processing is active. Your financial data never leaves this iPhone.
              </Text>
            </View>
          )}

          <View style={{ height: 30 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    marginBottom: 20,
    paddingTop: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  subCard: {
    borderRadius: 20,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    shadowColor: Colors.walletPlusStart,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
  },
  subLeft: {
    gap: 4,
  },
  subBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  subBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
  },
  subPlan: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF',
  },
  subPrice: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },
  subRight: {
    alignItems: 'center',
    gap: 4,
  },
  subStatus: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 28,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statVal: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 0.5,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  sectionLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  settingBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.border,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  settingFlex: {
    flex: 1,
  },
  settingSub: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  privacyNoteText: {
    fontSize: 12,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
});
