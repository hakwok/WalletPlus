import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './src/theme/colors';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  const [onboardingDone, setOnboardingDone] = useState(false);

  return (
    <View style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        {onboardingDone ? (
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        ) : (
          <OnboardingScreen onDone={() => setOnboardingDone(true)} />
        )}
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
