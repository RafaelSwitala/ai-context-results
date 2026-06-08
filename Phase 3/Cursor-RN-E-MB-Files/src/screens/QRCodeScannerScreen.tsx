import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useNoOpBackHandler } from '../hooks/useNavigationAuthGuard';
import { RootStackParamList } from '../navigation/types';
import { isValidScannedQrPayload, normalizeScannedQr, parseStorageConfigQr } from '../utils/storageConfigQr';

type Props = NativeStackScreenProps<RootStackParamList, 'QRCodeScanner'>;

const AVAILABLE_LOCALES = ['de-DE', 'sk-SK', 'es-ES', 'fr-FR'];

/** MAP-003 — EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007 */

export default function QRCodeScannerScreen({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const lastScanRef = useRef<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useNoOpBackHandler();

  const handleScan = useCallback(
    (rawValue: string) => {
      if (isProcessing || lastScanRef.current === rawValue) {
        return;
      }
      lastScanRef.current = rawValue;
      setIsProcessing(true);

      const normalized = normalizeScannedQr(rawValue);
      if (!isValidScannedQrPayload(normalized, { defaultLocale: 'de-DE', availableLocales: AVAILABLE_LOCALES })) {
        Alert.alert('Fehler', 'Der QR-Code ist ungültig.', [
          {
            text: 'OK',
            onPress: () => {
              lastScanRef.current = null;
              setIsProcessing(false);
            },
          },
        ]);
        return;
      }

      const parsed = parseStorageConfigQr(normalized, {
        defaultLocale: 'de-DE',
        availableLocales: AVAILABLE_LOCALES,
      });

      navigation.navigate('Settings', {
        qrPayload: {
          server: parsed.server ?? '',
          client: parsed.client ?? '',
          protocol: parsed.securityProtocol,
          token: parsed.token ?? '',
          pin: parsed.pin ?? '',
          locale: parsed.culture ?? 'de-DE',
        },
      });
      setIsProcessing(false);
    },
    [isProcessing, navigation],
  );

  if (!permission) {
    return (
      <View style={styles.centered}>
        <Text>Kamera wird geladen…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>Kamerazugriff wird für den QR-Scanner benötigt.</Text>
        <Pressable style={styles.button} onPress={() => void requestPermission()}>
          <Text style={styles.buttonText}>Berechtigung erteilen</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={({ data }) => handleScan(data)}
      />
      <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Abbrechen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  cancelButton: {
    backgroundColor: '#333',
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
