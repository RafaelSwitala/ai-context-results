/**
 * LoginScreen
 * Login entry point with settings guard
 * 
 * Corresponds to Phase 1 mapping: MAP-002
 * Source IDs: EP-004, EP-009, BEH-007, BEH-016, NAV-001, NAV-002, NAV-005, NAV-006, STATE-001
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loadSettings } from '../services/storageConfigStorage';
import { Settings } from '../types';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

/**
 * LoginScreen Component
 * 
 * Behavior:
 * - BEH-007 (iOS): Login opens Settings when settings are invalid;
 *   Settings access uses PIN screen when PIN exists
 * - BEH-016 (Android): Login opens Settings when settings are invalid and no PIN exists;
 *   opens PIN when settings are invalid or settings button tapped and PIN exists
 * 
 * State Machine (STATE-001):
 * 1. App starts: check hasValidSettings
 * 2. If invalid: navigate to Settings
 * 3. If valid and PIN exists: navigate to PIN screen
 * 4. If valid and no PIN: navigate to Login UI or WebView
 * 
 * Navigation (NAV-001, NAV-002, NAV-005, NAV-006):
 * - LoginViewController -> SettingsViewController (settings invalid)
 * - LoginViewController -> PinCodeViewController (settings button + PIN exists)
 * - LoginActivity -> SettingsActivity (settings invalid or button tapped, no PIN)
 * - LoginActivity -> PinActivity (settings invalid or button tapped, PIN exists)
 */
export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [settings, setSettings] = React.useState<Settings | null>(null);

  // Load settings on mount and check routing
  // Source: STATE-001
  useEffect(() => {
    const checkSettings = async () => {
      setIsLoading(true);
      try {
        const loaded = await loadSettings();
        setSettings(loaded);

        // Check if settings are valid
        // Source: BEH-007 (iOS), BEH-016 (Android)
        if (!loaded.hasValidSettings) {
          // Settings invalid: navigate to Settings
          // NAV-001 (iOS), NAV-005 (Android)
          navigation.navigate('Settings', {});
        } else if (loaded.pin) {
          // Settings valid + PIN exists: navigate to PIN
          // NAV-002 (iOS), NAV-006 (Android)
          navigation.navigate('PIN');
        } else {
          // Settings valid, no PIN: proceed to webview/login
          // Don't auto-navigate; let user decide
        }
      } catch (error) {
        // On error, default to Settings
        navigation.navigate('Settings', {});
      } finally {
        setIsLoading(false);
      }
    };

    checkSettings();
  }, [navigation]);

  /**
   * Settings button handler
   * Source: BEH-007 openSettingsButtonTapped, BEH-016 settings.onClick
   */
  const handleSettingsButtonPress = () => {
    if (settings?.pin) {
      // PIN exists: navigate to PIN first (iOS behavior)
      navigation.navigate('PIN');
    } else {
      // No PIN: navigate directly to Settings
      navigation.navigate('Settings', {});
    }
  };

  /**
   * Login button handler
   * Source: BEH-003, EP-001, EP-002
   */
  const handleLoginPress = () => {
    if (settings?.hasValidSettings) {
      // Navigate to WebView for login
      navigation.navigate('WebView', { url: '' });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>MobileBrowser</Text>

        {!settings?.hasValidSettings && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚠️ Settings are not configured. Please configure your settings to proceed.
            </Text>
          </View>
        )}

        {/* Login Button (shown when settings valid) */}
        {settings?.hasValidSettings && (
          <TouchableOpacity
            style={styles.button}
            onPress={handleLoginPress}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {/* Settings Button */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={handleSettingsButtonPress}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            {settings?.pin ? 'PIN Code' : 'Settings'}
          </Text>
        </TouchableOpacity>

        {/* Status Info */}
        {settings && (
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Configuration Status</Text>
            <Text style={styles.statusValue}>
              {settings.hasValidSettings ? '✓ Valid' : '✗ Invalid'}
            </Text>
            <Text style={styles.statusValue}>
              Server: {settings.server || 'Not configured'}
            </Text>
            {settings.pin && <Text style={styles.statusValue}>• PIN Protected</Text>}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  warningBox: {
    backgroundColor: '#FFF3CD',
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
    padding: 16,
    borderRadius: 6,
    marginBottom: 24,
    width: '100%',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  statusBox: {
    marginTop: 30,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 13,
    color: '#333',
    marginVertical: 2,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default LoginScreen;
