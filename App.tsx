import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import WalletScreen from './src/screens/WalletScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <WalletScreen />
    </SafeAreaProvider>
  );
}
