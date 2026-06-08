import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useConfigBootstrap } from '../hooks/useConfigBootstrap';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import LicenseScreen from '../screens/LicenseScreen';
import LoginScreen from '../screens/LoginScreen';
import PinScreen from '../screens/PinScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WebViewScreen from '../screens/WebViewScreen';
import { ROUTE_NAMES } from './navigation.constants';
import { RootStackParamList } from './types';

/** MAP-016 — STATE-001..STATE-010, NAV-001..NAV-018 */

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {
  bundledConfig?: import('../types/storageConfig').ConfigFilePayload | null;
};

export default function AppNavigator({ bundledConfig = null }: Props) {
  useConfigBootstrap(bundledConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTE_NAMES.Login}>
        <Stack.Screen name={ROUTE_NAMES.Login} component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name={ROUTE_NAMES.Settings} component={SettingsScreen} options={{ title: 'Einstellungen' }} />
        <Stack.Screen name={ROUTE_NAMES.Pin} component={PinScreen} options={{ title: 'PIN' }} />
        <Stack.Screen
          name={ROUTE_NAMES.QRCodeScanner}
          component={QRCodeScannerScreen}
          options={{ title: 'QR-Scanner' }}
        />
        <Stack.Screen name={ROUTE_NAMES.WebView} component={WebViewScreen} options={{ title: 'WebView' }} />
        <Stack.Screen
          name={ROUTE_NAMES.BarcodeScanner}
          component={BarcodeScannerScreen}
          options={{ title: 'Barcode-Scanner' }}
        />
        <Stack.Screen name={ROUTE_NAMES.License} component={LicenseScreen} options={{ title: 'Lizenzen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
