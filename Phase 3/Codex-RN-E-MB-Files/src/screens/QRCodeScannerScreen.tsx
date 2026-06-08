import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { BackHandler, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useStorageConfigQrImport } from '../hooks/useStorageConfigQrImport';
import { EditableStorageConfigValues } from '../types/storageConfig';

type Props = {
  onCancel: () => void;
  onImport: (values: Partial<EditableStorageConfigValues>) => void;
};

export default function QRCodeScannerScreen({ onCancel, onImport }: Props) {
  const [scannedValue, setScannedValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const lastScannedValue = useRef<string | null>(null);
  const { importQr } = useStorageConfigQrImport();

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => subscription.remove();
  }, []);

  const applyScannedValue = () => {
    if (scannedValue === lastScannedValue.current) {
      return;
    }

    lastScannedValue.current = scannedValue;
    const result = importQr(scannedValue);
    if (!result.ok) {
      setError('Invalid QR code.');
      return;
    }

    setError(null);
    onImport(result.values);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>QR import</Text>
      <TextInput
        autoCapitalize="none"
        multiline
        numberOfLines={5}
        placeholder="p=MB&v=1&server=..."
        style={styles.input}
        value={scannedValue}
        onChangeText={setScannedValue}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onCancel}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={applyScannedValue}>
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
    fontWeight: '600',
  },
  input: {
    borderColor: '#ccd6e0',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 140,
    padding: 12,
    textAlignVertical: 'top',
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
