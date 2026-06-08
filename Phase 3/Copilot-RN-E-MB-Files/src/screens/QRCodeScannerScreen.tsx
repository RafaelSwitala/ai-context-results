/**
 * QRCodeScannerScreen
 * QR code scanning for storage config import
 * 
 * Corresponds to Phase 1 mapping: MAP-003
 * Source IDs: EP-005, EP-010, BEH-006, BEH-015, NAV-003, NAV-004, NAV-007, NAV-008, ERRPATH-004, ERRPATH-007
 * 
 * NOTE: Camera library integration is deferred to phase 3b.
 * This implementation shows the parser/validator layer with placeholder camera.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useStorageConfigQrImport } from '../hooks/useStorageConfigQrImport';
import { isValidQrSettings } from '../utils/storageConfigQr';

/**
 * QRCodeScannerScreenProps
 */
interface QRCodeScannerScreenProps {
  onQrDetected?: (qrText: string) => void;
  onClose?: () => void;
  onValidQr?: (qrData: any) => void;
}

/**
 * QRCodeScannerScreen Component
 * 
 * Behavior:
 * - BEH-006 (iOS): Prepend http://localhost? when scanned text has no question mark,
 *   reject invalid codes, return valid code to Settings
 * - BEH-015 (Android): Ignore duplicates, prepend http://localhost?,
 *   reject codes where p != MB, return valid URL to Settings
 * 
 * State machine: idle -> scanning -> validating -> detected/error
 * 
 * DEFERRED: Camera library selection and camera permissions
 * This screen demonstrates the parser/validation workflow.
 */
export const QRCodeScannerScreen: React.FC<QRCodeScannerScreenProps> = ({
  onQrDetected,
  onClose,
  onValidQr,
}) => {
  const { state: qrState, processScannedQr, clearQrImport, getQrSettings } =
    useStorageConfigQrImport();

  const [isScanning, setIsScanning] = useState(true);
  const [scannedOnce, setScannedOnce] = useState<string | null>(null);

  /**
   * Simulate QR detection
   * In real implementation, this is called by camera library's onBarCodeScanned handler
   * 
   * Source: EP-005 (iOS metadataOutput), EP-010 (Android handleCode)
   */
  const handleQrDetected = (qrText: string) => {
    // Avoid duplicate scans (Android behavior: BEH-015)
    if (scannedOnce === qrText) {
      return;
    }

    setScannedOnce(qrText);
    onQrDetected?.(qrText);

    // Process through validator
    const isValid = processScannedQr(qrText);

    if (isValid) {
      // Valid QR code
      const qrSettings = getQrSettings();
      if (qrSettings && isValidQrSettings(qrSettings)) {
        // Return to calling screen (Settings)
        // Source: NAV-004 (iOS unwind), NAV-008 (Android onActivityResult)
        onValidQr?.(qrSettings);
        
        // Auto-close after brief delay
        setTimeout(() => {
          onClose?.();
        }, 500);
      }
    } else {
      // Invalid QR code
      // Source: ERRPATH-004 (iOS), ERRPATH-007 (Android)
      Alert.alert(
        'Invalid QR Code',
        qrState.error || 'QR code does not contain valid configuration',
        [
          {
            text: 'OK',
            onPress: () => {
              // Continue scanning
              clearQrImport();
              setScannedOnce(null);
            },
          },
        ]
      );
    }
  };

  /**
   * Simulate scanning with test QR
   * In production, this is triggered by actual camera QR detection
   */
  const simulateScan = () => {
    const testQr = 'p=MB&v=1&server=demo.example.com&mandant=test&https=1&token=abc123';
    handleQrDetected(testQr);
  };

  return (
    <View style={styles.container}>
      {/* Camera View Placeholder */}
      <View style={styles.cameraPlaceholder}>
        {isScanning ? (
          <>
            <Text style={styles.cameraText}>
              📷 Camera View{'\n'}(Placeholder - Camera library deferred to phase 3b)
            </Text>
            <View style={styles.focusBox} />
            {qrState.isLoading && (
              <ActivityIndicator size="large" color="#fff" style={styles.loadingOverlay} />
            )}
          </>
        ) : (
          <Text style={styles.cameraText}>Camera unavailable</Text>
        )}
      </View>

      {/* Instructions */}
      <View style={styles.instructionBox}>
        <Text style={styles.instructionText}>
          Align QR code within the frame to scan
        </Text>
      </View>

      {/* Test Button (for development) */}
      <TouchableOpacity
        style={styles.testButton}
        onPress={simulateScan}
        disabled={qrState.isLoading}
      >
        <Text style={styles.testButtonText}>
          {qrState.isLoading ? 'Processing...' : 'Test Scan (Dev)'}
        </Text>
      </TouchableOpacity>

      {/* Error Display */}
      {qrState.error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{qrState.error}</Text>
        </View>
      )}

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onClose}
        disabled={qrState.isLoading}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  cameraPlaceholder: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cameraText: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
  },
  focusBox: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#0f0',
    position: 'absolute',
    borderRadius: 8,
    marginTop: 100,
  },
  loadingOverlay: {
    position: 'absolute',
    bottom: 50,
  },
  instructionBox: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  instructionText: {
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#FF9500',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#4400',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#f00',
  },
  errorText: {
    color: '#faa',
    fontSize: 12,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QRCodeScannerScreen;
