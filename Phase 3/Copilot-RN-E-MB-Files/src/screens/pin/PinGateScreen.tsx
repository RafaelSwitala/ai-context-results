/**
 * PIN Gate Screen
 * Validates PIN before allowing access to Settings or protected areas
 * Corresponds to Phase 1 mappings: MAP-003, MAP-018
 * Source IDs: BEH-006, BEH-012, BEH-024, UI-003, UI-004, NAV-005, ERRPATH-005, ERRPATH-007
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { validatePin } from '../../navigation/authGate';
import { readPin } from '../../services/authStorageService';
import { RootStackParamList } from '../../navigation/AppNavigator';

type PINGateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PIN'>;

/**
 * PIN Gate Screen Component
 * 
 * Behavior:
 * - BEH-006: PIN validation entry point (numeric input or keypad)
 * - BEH-012 (iOS): PIN exact match comparison, clear on mismatch, show error
 * - BEH-024 (Android): PIN exact match after 4 digits, clear and show error on mismatch
 * - UI-003 (iOS): invalidPin text display and input clearing on error
 * - UI-004 (Android): invalid PIN status text (red), Exit/Delete buttons available
 * 
 * Error Path:
 * - ERRPATH-005: Wrong PIN entered - show error, clear fields
 * - ERRPATH-007: Android - after failed PIN attempt, allow retry
 * 
 * Navigation:
 * - NAV-005: Correct PIN -> proceed to Settings or protected screen
 * 
 * State Machine:
 * 1. Show PIN entry
 * 2. User enters PIN (4 digits typical)
 * 3. Compare with stored PIN
 * 4. If match: navigate to Settings
 * 5. If mismatch: show error, clear input, allow retry
 */
export const PINGateScreen: React.FC = () => {
  const navigation = useNavigation<PINGateScreenNavigationProp>();
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [storedPin, setStoredPin] = useState<string | null>(null);

  // Load PIN from storage on mount
  useEffect(() => {
    const loadPin = async () => {
      try {
        const pin = await readPin();
        setStoredPin(pin);
      } catch (err) {
        console.error('Failed to load PIN:', err);
        setError('Failed to load PIN');
      } finally {
        setIsLoading(false);
      }
    };

    loadPin();
  }, []);

  /**
   * Handle manual text input
   * Source: BEH-006, BEH-023 (iOS manual entry or Android button input)
   */
  const handlePinChange = (text: string) => {
    // Only allow digits
    const digits = text.replace(/[^0-9]/g, '');
    setPinInput(digits);

    // Auto-validate when length reaches expected PIN length (4 digits)
    if (digits.length === 4) {
      validatePinEntry(digits);
    }
  };

  /**
   * Validate PIN entry
   * Source: BEH-012, BEH-024 (exact match check)
   */
  const validatePinEntry = useCallback(
    async (enteredPin: string) => {
      setError(null);

      try {
        // Compare entered PIN with stored PIN
        // Source: BEH-012 (iOS exact match), BEH-024 (Android exact match)
        const isValid = validatePin(enteredPin, storedPin);

        if (isValid) {
          // PIN correct: proceed to Settings
          // Source: NAV-005
          navigation.navigate('Settings', {});
        } else {
          // PIN incorrect: show error and clear
          // Source: ERRPATH-005 (iOS), ERRPATH-007 (Android)
          const errorMsg = 'Invalid PIN. Please try again.';
          setError(errorMsg);
          setPinInput('');

          // Show alert
          Alert.alert('PIN Error', errorMsg);
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'PIN validation failed';
        setError(errorMsg);
        setPinInput('');
      }
    },
    [storedPin, navigation]
  );

  /**
   * Handle PIN submission (for button-based input)
   * Source: BEH-023, BEH-024 (numeric button handlers)
   */
  const handleSubmitPin = useCallback(() => {
    if (pinInput.length === 4) {
      validatePinEntry(pinInput);
    } else {
      setError('PIN must be 4 digits');
    }
  }, [pinInput, validatePinEntry]);

  /**
   * Handle clear/backspace
   * Source: ERRPATH-007 (Android delete handler)
   */
  const handleClear = useCallback(() => {
    setPinInput('');
    setError(null);
  }, []);

  /**
   * Numeric keypad button press
   * Source: BEH-023 (Android digit button handlers), equivalent for other platforms
   */
  const handleDigitPress = (digit: string) => {
    if (pinInput.length < 6) { // Allow up to 6 digits for flexibility
      const newPin = pinInput + digit;
      handlePinChange(newPin);
    }
  };

  /**
   * Backspace handler
   */
  const handleBackspace = () => {
    setPinInput(pinInput.slice(0, -1));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading PIN gate...</Text>
      </View>
    );
  }

  if (!storedPin) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No PIN configured. You can proceed directly to settings.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Settings', {})}
        >
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter PIN</Text>

        {/* PIN Display */}
        <View style={styles.pinDisplayContainer}>
          <TextInput
            style={[
              styles.pinInput,
              error && styles.pinInputError,
            ]}
            value={pinInput}
            onChangeText={handlePinChange}
            placeholder="� � � �"
            placeholderTextColor="#ccc"
            maxLength={6}
            keyboardType="number-pad"
            secureTextEntry={false}
            editable={!isLoading}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorBoxText}>{error}</Text>
          </View>
        )}

        {/* Numeric Keypad (iOS and Android style) */}
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.keypadButton}
              onPress={() => handleDigitPress(String(digit))}
              disabled={isLoading}
            >
              <Text style={styles.keypadButtonText}>{digit}</Text>
            </TouchableOpacity>
          ))}

          {/* 0 Button (wider) */}
          <TouchableOpacity
            key={0}
            style={[styles.keypadButton, styles.zeroButton]}
            onPress={() => handleDigitPress('0')}
            disabled={isLoading}
          >
            <Text style={styles.keypadButtonText}>0</Text>
          </TouchableOpacity>

          {/* Backspace Button */}
          <TouchableOpacity
            style={[styles.keypadButton, styles.backspaceButton]}
            onPress={handleBackspace}
            disabled={isLoading || pinInput.length === 0}
          >
            <Text style={styles.keypadButtonText}>?</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmitPin}
            disabled={isLoading || pinInput.length !== 4}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Validating...' : 'Submit PIN'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            disabled={isLoading}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Status Info */}
        <View style={styles.statusBox}>
          <Text style={styles.statusLabel}>PIN Entry</Text>
          <Text style={styles.statusValue}>
            {pinInput.length}/4 digits entered
          </Text>
        </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  pinDisplayContainer: {
    width: '100%',
    marginBottom: 20,
  },
  pinInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 8,
    backgroundColor: '#f9f9f9',
  },
  pinInputError: {
    borderColor: '#d32f2f',
    backgroundColor: '#ffebee',
  },
  errorBox: {
    backgroundColor: '#ffcdd2',
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    width: '100%',
  },
  errorBoxText: {
    fontSize: 14,
    color: '#c62828',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  keypad: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.5%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  keypadButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  zeroButton: {
    width: '61.5%', // Wider button for 0
  },
  backspaceButton: {
    width: '30%',
    backgroundColor: '#e8e8e8',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#1976d2',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  statusBox: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default PINGateScreen;
