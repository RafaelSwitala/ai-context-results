/**
 * App Navigator
 * Navigation structure for navigation feature with storage-config and login integration
 * 
 * Corresponds to Phase 1 mapping: MAP-001, MAP-002, MAP-003, MAP-004, MAP-005, MAP-006, MAP-007, MAP-016, MAP-017, MAP-019
 * Source IDs: NAV-001 through NAV-018, STATE-001 through STATE-010
 * 
 * Phase 3 update: Added WebViewScreen, BarcodeScannerScreen, LicenseScreen
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { loadSettings } from '../services/storageConfigStorage';
import { Settings } from '../types';
import { ROUTE_NAMES } from './navigation.constants';

import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import { PINGateScreen } from '../screens/pin/PinGateScreen';
import WebViewScreen from '../screens/WebViewScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';
import LicenseScreen from '../screens/LicenseScreen';

/**
 * Navigation Stack Params
 * 
 * Defines route names and their associated parameters.
 * Corresponds to iOS segue identifiers and Android Intent extras.
 * 
 * MAP-016, MAP-017, MAP-019: Root stack state transitions
 */
export type RootStackParamList = {
  Login: undefined;
  Settings: { returnTo?: string };
  QRCodeScanner: { onQrResult?: (qr: any) => void };
  PIN: undefined;
  WebView: { url: string; returnUrl?: string };
  BarcodeScannerScreen: { returnUrl: string };
  License: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * useSettingsGuard Hook
 * Checks if settings are valid and routes accordingly
 * 
 * Corresponds to:
 * - iOS: BEH-001 (viewDidLoad routes to PIN or Settings)
 * - Android: BEH-012 (onCreate routes based on PIN and settings)
 * 
 * Source: MAP-001, MAP-016, STATE-001, STATE-006
 */
function useSettingsGuard() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const loaded = await loadSettings();
        setSettings(loaded);
      } catch {
        setSettings(null);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const isSettingsValid = settings?.hasValidSettings === true;

  return {
    settings,
    isLoading,
    isSettingsValid,
  };
}

/**
 * AppNavigator Component
 * 
 * Root stack-based navigation with the following structure:
 * 
 * MAP-016: Root navigation state
 * - Login: Entry point with settings/PIN guard
 *   - BEH-001, BEH-012: Route to PIN if stored PIN exists, else to Settings if invalid
 *   - BEH-014, BEH-003: Successful login creates WebView with URL
 * 
 * - Settings: Configuration form
 *   - BEH-002, BEH-017, BEH-027: Save navigates to Login
 *   - NAV-004, NAV-012: QR scanner modal for settings import
 * 
 * - PIN: PIN code entry (optional flow)
 *   - BEH-002, BEH-027: Correct PIN navigates to Settings
 *   - Android back/exit: finish activity
 * 
 * - QRCodeScanner: Scanner for settings QR codes (modal)
 * 
 * - WebView: Main application view
 *   - NAV-006, NAV-007: Logout or barcode URL returns to Login/scanner
 *   - NAV-003, NAV-015, NAV-016: WebView displays content or error handling
 * 
 * - BarcodeScannerScreen: 1D barcode scanner (modal)
 *   - NAV-008, NAV-017: Returns to WebView with scan result
 * 
 * - License: License information screen (modal, Android parity)
 *   - NAV-014, BEH-015: Login popup routes to License
 * 
 * Corresponds to iOS storyboard and Android Activity manifest structure.
 * 
 * Source IDs: MAP-001 through MAP-007, NAV-001 through NAV-018, STATE-001 through STATE-010
 */
export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Authentication and Settings Flow */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
          />

          <Stack.Screen
            name="QRCodeScanner"
            component={QRCodeScannerScreen}
          />

          <Stack.Screen
            name="License"
            component={LicenseScreen}
          />
        </Stack.Group>

        {/* PIN entry (part of settings flow) */}
        <Stack.Screen
          name="PIN"
          component={PINGateScreen}
          options={{
            presentation: 'modal',
          }}
        />

        {/* Main Application View */}
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
        />

        {/* Scanner Modals */}
        <Stack.Group
          screenOptions={{
            presentation: 'modal',
          }}
        >
          <Stack.Screen
            name="BarcodeScannerScreen"
            component={BarcodeScannerScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

/**
 * Settings Guard Component
 * Wrapper that enforces settings validation before allowing access to protected screens
 * 
 * Source: STATE-001 (app checks settings validity)
 */
export function SettingsGuard({
  children,
  onSettingsRequired,
}: {
  children: React.ReactNode;
  onSettingsRequired?: () => void;
}) {
  const { isSettingsValid, isLoading } = useSettingsGuard();

  if (isLoading) {
    return null; // Loading state
  }

  if (!isSettingsValid) {
    onSettingsRequired?.();
    return null;
  }

  return <>{children}</>;
}

export default AppNavigator;
