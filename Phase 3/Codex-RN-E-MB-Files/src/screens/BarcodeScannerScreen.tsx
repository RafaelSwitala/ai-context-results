import { useEffect, useRef, useState } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { resetToLoginIfInvalid } from '../services/navigationAuthGuard';
import { buildScanResultUrl } from '../services/scannerNavigationService';

type Props = {
  returnUrl: string;
  onCancel: (url: string) => void;
  onInvalidAuth: () => void;
  onScanResult: (url: string) => void;
};

export default function BarcodeScannerScreen({ returnUrl, onCancel, onInvalidAuth, onScanResult }: Props) {
  const [scanValue, setScanValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const lastScannedValue = useRef<string | null>(null);

  useEffect(() => {
    void resetToLoginIfInvalid(onInvalidAuth);
  }, [onInvalidAuth]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => subscription.remove();
  }, []);

  const applyScan = () => {
    const value = scanValue.trim();
    if (!value) {
      setError('Invalid scan result.');
      return;
    }

    if (value === lastScannedValue.current) {
      return;
    }

    lastScannedValue.current = value;
    setError(null);
    onScanResult(buildScanResultUrl(returnUrl, value));
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Barcode scan</Text>
      <TextInput
        autoCapitalize="none"
        placeholder="Scan result"
        style={styles.input}
        value={scanValue}
        onChangeText={setScanValue}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={() => onCancel(returnUrl)}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={applyScan}>
          <Text style={styles.primaryButtonText}>Apply</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  error: {
    color: '#a11d33',
    fontWeight: '700',
  },
  input: {
    borderColor: '#ccd6e0',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0f6bff',
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: '#0f6bff',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#0f6bff',
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
