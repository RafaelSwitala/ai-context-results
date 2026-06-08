import { CameraView, useCameraPermissions } from 'expo-camera';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useNavigationAuthGuard, useNoOpBackHandler } from '../hooks/useNavigationAuthGuard';
import { RootStackParamList } from '../navigation/types';
import { buildScanResultUrl, shouldIgnoreDuplicateScan } from '../services/scannerNavigationService';

type Props = NativeStackScreenProps<RootStackParamList, 'BarcodeScanner'>;

/** MAP-006 — EP-007, EP-012, BEH-011, BEH-025, BEH-026, NAV-008, NAV-017 */

export default function BarcodeScannerScreen({ navigation, route }: Props) {
  const lastScanRef = useRef('');
  const [permission, requestPermission] = useCameraPermissions();

  useNoOpBackHandler();

  const resetToLogin = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }, [navigation]);

  useNavigationAuthGuard(resetToLogin);

  const returnToWebView = useCallback(
    (url: string) => {
      navigation.navigate('WebView', { url });
    },
    [navigation],
  );

  const handleScan = useCallback(
    (code: string) => {
      if (shouldIgnoreDuplicateScan(lastScanRef.current, code)) {
        return;
      }
      lastScanRef.current = code;
      const url = buildScanResultUrl(route.params.returnUrl, code);
      returnToWebView(url);
    },
    [route.params.returnUrl, returnToWebView],
  );

  const onCancel = () => {
    returnToWebView(buildScanResultUrl(route.params.returnUrl, null));
  };

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
        <Text style={styles.message}>Kamerazugriff wird für den Barcode-Scanner benötigt.</Text>
        <Pressable style={styles.button} onPress={() => void requestPermission()}>
          <Text style={styles.buttonText}>Berechtigung erteilen</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.buttonText}>Abbrechen</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'code128', 'code39', 'upc_a', 'upc_e'],
        }}
        onBarcodeScanned={({ data }) => handleScan(data)}
      />
      <Pressable style={styles.cancelButton} onPress={onCancel}>
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
    marginBottom: 8,
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
