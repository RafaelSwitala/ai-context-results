/**
 * License Screen
 * 
 * Displays license information. Android-specific feature for parity.
 * 
 * Corresponds to Phase 1 mapping: MAP-007
 * Source IDs: BEH-015, NAV-014
 * 
 * @file screens/LicenseScreen.tsx
 * 
 * Platform note:
 * - iOS: No license screen found in storyboard discovery
 * - Android: LoginActivity popup menu includes license action
 * - MAP-023: Route is Android-only in discovered sources
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * License Screen Component
 * 
 * Renders license information.
 * Can be extended to load license HTML dynamically.
 * 
 * Corresponds to Android LicenseActivity
 * Source: [android: app/src/main/java/de/onlinesoftwareag/boa/mobilebrowser4android/LicenseActivity.java:19 symbol=onCreate]
 * 
 * Platform divergence (MAP-023):
 * - iOS: License route not found in phase 1 analysis
 * - Android: Launched from login popup menu
 * - RN: Implemented for cross-platform parity; may not be used on iOS
 */
const LicenseScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Licenses</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Open Source Licenses</Text>
        <Text style={styles.licenseText}>
          This application includes the following open source software:
        </Text>

        <Text style={styles.packageName}>React Navigation</Text>
        <Text style={styles.licenseText}>
          MIT License{'\n'}
          Copyright (c) 2023 React Navigation contributors
        </Text>

        <Text style={styles.packageName}>react-native-webview</Text>
        <Text style={styles.licenseText}>
          MIT License{'\n'}
          Copyright (c) 2015-present React Native WebView Contributors
        </Text>

        <Text style={styles.packageName}>Expo</Text>
        <Text style={styles.licenseText}>
          MIT License{'\n'}
          Copyright (c) 2015-present 650 Industries, Inc. (Expo)
        </Text>

        <Text style={styles.sectionTitle}>Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          This application is provided "as is" without warranty of any kind, express or implied.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  packageName: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    color: '#2196F3',
  },
  licenseText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666',
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LicenseScreen;
