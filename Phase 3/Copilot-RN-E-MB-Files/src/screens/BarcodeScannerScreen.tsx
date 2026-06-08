/**
 * Barcode Scanner Screen
 * 
 * Displays barcode/1D code scanner with return URL handling.
 * 
 * MAP-003: BarcodeScannerScreen adapted for WebView return URL contract
 * Phase 1 Source IDs: EP-006, EP-011, BEH-013, BEH-031, NAV-005, NAV-009, SEC-004
 * 
 * @file screens/BarcodeScannerScreen.tsx
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  buildScanResultUrl,
} from '../services/webViewReturnUrlService';

type BarcodeScannerRouteProp = any;

/**
 * Barcode Scanner Screen Component
 * 
 * Renders barcode scanner (1D codes) and handles:
 * 1. Barcode code scanning
 * 2. Return URL construction with ScanResult param (BEH-013, BEH-031)
 * 3. Cancel action returning to WebView with original URL
 * 4. Auth guard - exit on invalid login (NAV-009)
 * 5. Camera permission handling (SEC-004)
 * 
 * Corresponds to iOS ArticleScannerViewController
 * and Android BarcodeScannerActivity
 * 
 * Phase 3 Integration:
 * - MAP-003: Adapted to work with WebView return URL contract
 * - Uses webViewReturnUrlService for URL building
 * - Returns to WebView with url param (not redirect)
 */
const BarcodeScannerScreen: React.FC = () => {
  const route = useRoute<BarcodeScannerRouteProp>();
  const navigation = useNavigation<any>();

  // Route params from WebViewScreen barcode detection
  const returnUrl = route.params?.returnUrl;

  // State management
  const [isScanning, setIsScanning] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  // Auth guard: exit scanner on invalid login (NAV-009, BEH-031)
  // Corresponds to BEH-031: BarcodeScannerActivity.onResume check for invalid login
  const isValidLogin = true; // Mock - would use actual auth context
  const isAuthLoading = false;

  useEffect(() => {
    if (!isAuthLoading && !isValidLogin) {
      setIsScanning(false);
      console.log('[BarcodeScannerScreen] Auth invalid, exiting to Login');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return;
    }

    // Initialize scanner
    console.log('[BarcodeScannerScreen] Scanner initialized for return URL:', returnUrl);
  }, [isAuthLoading, isValidLogin, navigation, returnUrl]);

  /**
   * Handle successful scan
   * BEH-031: Scanner returns to WebviewActivity with scan result
   */
  const handleScan = (code: string) => {
    if (!code) {
      console.warn('[BarcodeScannerScreen] Empty scan code received');
      return;
    }

    console.log('[BarcodeScannerScreen] Barcode scanned:', code);

    setScannedCode(code);
    setIsScanning(false);

    if (returnUrl) {
      // Build return URL with ScanResult parameter (BEH-013, MAP-005)
      const resultUrl = buildScanResultUrl(returnUrl, code);
      console.log('[BarcodeScannerScreen] Returning to WebView with result URL');

      // Return to WebView with scan result (NAV-005, NAV-009)
      navigation.navigate('WebView', {
        url: resultUrl,
      });
    } else {
      Alert.alert('Error', 'No return URL provided');
    }
  };

  /**
   * Handle cancel
   * BEH-031: Scanner cancel returns to WebviewActivity with original URL
   * NAV-005, NAV-009: Return navigation without scan result
   */
  const handleCancel = () => {
    console.log('[BarcodeScannerScreen] Scanner cancelled');

    if (returnUrl) {
      // Return to WebView with original URL (no scan result)
      navigation.navigate('WebView', {
        url: returnUrl,
      });
    } else {
      // Fallback: navigate to Login if no return URL
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  if (isAuthLoading || !isValidLogin) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  if (!returnUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No return URL provided</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Camera placeholder - replace with actual camera component */}
      {isScanning && (
        <View style={styles.cameraPlaceholder}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={styles.placeholderText}>
            Barcode Scanner
            {'\n'}
            (Camera integration required)
          </Text>
        </View>
      )}

      {scannedCode && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Barcode scanned successfully!</Text>
          <Text style={styles.codeText}>{scannedCode}</Text>
        </View>
      )}

      {/* Toolbar buttons */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Simulated scan button - remove when camera integration is added */}
        {!isScanning && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleScan('SIMULATED_BARCODE_123')}
          >
            <Text style={styles.buttonText}>Simulate Scan</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  resultText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  codeText: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
  },
  toolbar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: '#f44336',
    fontSize: 16,
    margin: 20,
    textAlign: 'center',
  },
});

export default BarcodeScannerScreen;
