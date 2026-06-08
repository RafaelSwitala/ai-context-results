/**
 * SettingsScreen
 * Settings configuration UI for server, client, protocol, token, PIN
 * QR code import integration
 * 
 * Corresponds to Phase 1 mapping: MAP-001
 * Source IDs: EP-001, EP-002, EP-003, EP-007, EP-008, BEH-001-012, UI-001-007
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useStorageConfig } from '../hooks/useStorageConfig';
import { useStorageConfigQrImport } from '../hooks/useStorageConfigQrImport';
import { Protocol, Settings } from '../types';
import { isValidPin, isValidServer } from '../utils/storageConfigQr';
import { RootStackParamList } from '../navigation/AppNavigator';

type SettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Settings'>;

/**
 * SettingsScreen Component
 * Source: EP-001, EP-002, EP-003 (iOS); EP-007, EP-008 (Android)
 * 
 * UI Elements:
 * - Server text field (required)
 * - Client/Mandant text field
 * - Protocol picker (0=HTTP, 1=HTTPS, 2=HTTPS_WITHOUT_VALIDATION)
 * - Token text field
 * - PIN text field (optional, 4 digits)
 * - Save and Cancel buttons
 * - QR Scanner button (delegate to QRCodeScannerScreen)
 * 
 * Behavior:
 * - BEH-001: Load and prefill settings from storage
 * - BEH-002: Validate server and PIN on save
 * - BEH-003: Send check-access GET, persist only on 200
 * - BEH-010: Show UI controls and hide cancel when no valid settings
 */
export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { state: settingsState, updateSettings, saveSettings, reloadSettings } = useStorageConfig();
  const { state: qrState, processScannedQr, clearQrImport, getQrSettings } =
    useStorageConfigQrImport();

  // Local form state
  const [formSettings, setFormSettings] = useState<Partial<Settings> | null>(null);
  const [protocolOptions] = useState([
    { label: 'HTTP', value: Protocol.HTTP },
    { label: 'HTTPS', value: Protocol.HTTPS },
    { label: 'HTTPS (No Validation)', value: Protocol.HTTPS_WITHOUT_VALIDATION },
  ]);
  const [selectedProtocol, setSelectedProtocol] = useState(Protocol.HTTPS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize form with loaded settings on first data load
  // IMPORTANT: Guard with isInitialized to prevent overwriting user changes
  // Source: BEH-001 (load settings), BEH-010 (show form controls)
  useEffect(() => {
    if (settingsState.settings && !isInitialized && !settingsState.isLoading) {
      setFormSettings({
        server: settingsState.settings.server || '',
        client: settingsState.settings.client || '',
        token: settingsState.settings.token || '',
        pin: settingsState.settings.pin || '',
        protocol: settingsState.settings.protocol || Protocol.HTTPS,
        hasValidSettings: settingsState.settings.hasValidSettings || false,
      });
      setSelectedProtocol(settingsState.settings.protocol || Protocol.HTTPS);
      setIsInitialized(true);
    }
  }, [settingsState.isLoading, isInitialized]);

  // Handle QR import result
  const handleQRImport = async () => {
    // In real implementation, this would navigate to QRCodeScannerScreen
    // For now, we simulate QR import
    const simulatedQrText = 'p=MB&v=1&server=example.com&mandant=test&https=1';
    if (processScannedQr(simulatedQrText)) {
      const qrSettings = getQrSettings();
      if (qrSettings) {
        setFormSettings((prev) => ({
          ...prev,
          server: qrSettings.server,
          client: qrSettings.client,
          token: qrSettings.token,
          pin: qrSettings.pin,
        }));
      }
    } else {
      Alert.alert('QR Code Error', qrState.error || 'Invalid QR code');
    }
  };

  // Handle field changes
  // Source: BEH-011 (iOS field input), BEH-008 (Android field input)
  // Ensures form state updates correctly when user types
  const handleFieldChange = (field: string, value: string) => {
    setFormSettings((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleProtocolChange = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    handleFieldChange('protocol', protocol);
  };

  // Handle save
  // Source: BEH-002 (iOS save button), BEH-021 (Android save button)
  // Validates server and PIN, persists settings if valid
  const handleSave = async () => {
    if (!formSettings) {
      Alert.alert('Error', 'Settings not loaded');
      return;
    }

    // Extract and trim server value to ensure it's not just whitespace
    const serverValue = (formSettings.server || '').trim();
    const pinValue = (formSettings.pin || '').trim();

    // Validate server
    if (!serverValue || serverValue === '') {
      Alert.alert('Validation Error', 'Server is required and cannot be empty');
      return;
    }

    // Validate PIN format
    if (pinValue && pinValue !== '' && !/^\d{4}$/.test(pinValue)) {
      Alert.alert('Validation Error', 'PIN must be empty or exactly 4 digits');
      return;
    }

    // Build final settings with trimmed and validated values
    const finalSettings: Settings = {
      ...formSettings,
      server: serverValue,
      pin: pinValue || undefined,
      protocol: selectedProtocol,
      hasValidSettings: true,
    } as Settings;

    // Pass settings directly to saveSettings to avoid Race Condition
    // saveSettings will validate and save these settings
    await saveSettings(finalSettings);

    if (settingsState.state === 'saved') {
      Alert.alert('Success', 'Settings saved successfully');
      navigation.goBack();
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (settingsState.isDirty) {
      Alert.alert('Discard Changes?', 'You have unsaved changes', [
        {
          text: 'Keep Editing',
          onPress: () => {},
        },
        {
          text: 'Discard',
          onPress: () => {
            reloadSettings();
            navigation.goBack();
          },
        },
      ]);
    } else {
      navigation.goBack();
    }
  };

  if (settingsState.isLoading && !formSettings) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formSection}>
        <Text style={styles.title}>Settings</Text>

        {/* Server Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Server *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., example.com"
            value={formSettings?.server || ''}
            onChangeText={(value) => handleFieldChange('server', value)}
            editable={!settingsState.isLoading}
          />
        </View>

        {/* Client Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mandant</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., customer123"
            value={formSettings?.client || ''}
            onChangeText={(value) => handleFieldChange('client', value)}
            editable={!settingsState.isLoading}
          />
        </View>

        {/* Protocol Picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Protocol</Text>
          <View style={styles.protocolContainer}>
            {protocolOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.protocolButton,
                  selectedProtocol === option.value && styles.protocolButtonSelected,
                ]}
                onPress={() => handleProtocolChange(option.value)}
              >
                <Text
                  style={[
                    styles.protocolButtonText,
                    selectedProtocol === option.value && styles.protocolButtonTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Token Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Token</Text>
          <TextInput
            style={styles.input}
            placeholder="API token"
            value={formSettings?.token || ''}
            onChangeText={(value) => handleFieldChange('token', value)}
            secureTextEntry
            editable={!settingsState.isLoading}
          />
        </View>

        {/* PIN Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>PIN (4 digits)</Text>
          <TextInput
            style={styles.input}
            placeholder="Optional, 4 digits"
            value={formSettings?.pin || ''}
            onChangeText={(value) => handleFieldChange('pin', value)}
            keyboardType="numeric"
            maxLength={4}
            secureTextEntry
            editable={!settingsState.isLoading}
          />
        </View>

        {/* Error Display */}
        {settingsState.error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{settingsState.error.message}</Text>
          </View>
        )}

        {/* QR Code Import Button */}
        <TouchableOpacity
          style={styles.qrButton}
          onPress={handleQRImport}
          disabled={settingsState.isLoading}
        >
          <Text style={styles.qrButtonText}>Import from QR Code</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.saveButton,
              settingsState.isLoading && styles.buttonDisabled,
            ]}
            onPress={handleSave}
            disabled={settingsState.isLoading}
          >
            {settingsState.isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>

          {/* Cancel button only shown if settings exist */}
          {settingsState.settings?.hasValidSettings && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={settingsState.isLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  formSection: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  protocolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  protocolButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    alignItems: 'center',
  },
  protocolButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  protocolButtonText: {
    fontSize: 12,
    color: '#333',
  },
  protocolButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  errorBox: {
    backgroundColor: '#fee',
    borderLeftWidth: 3,
    borderLeftColor: '#f00',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
  },
  qrButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  qrButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
});

export default SettingsScreen;
