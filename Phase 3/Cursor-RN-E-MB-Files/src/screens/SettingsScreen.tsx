import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SettingsForm from '../components/SettingsForm';
import { useStorageConfig } from '../hooks/useStorageConfig';
import { RootStackParamList } from '../navigation/types';
import { saveLocale } from '../services/storageConfigStorage';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

/** MAP-001 — EP-001..EP-003, EP-007, EP-008, BEH-001..BEH-003, BEH-010..BEH-012, UI-001..UI-007 */

export default function SettingsScreen({ navigation, route }: Props) {
  const {
    form,
    isLoading,
    isSaving,
    hasSavedValues,
    setServer,
    setClient,
    setProtocol,
    setToken,
    setPin,
    setLocale,
    applyQrSettings,
    save,
  } = useStorageConfig();

  useEffect(() => {
    const payload = route.params?.qrPayload;
    if (!payload) {
      return;
    }
    applyQrSettings(payload);
    if (payload.locale) {
      void saveLocale(payload.locale);
    }
    navigation.setParams({ qrPayload: undefined });
  }, [route.params?.qrPayload, applyQrSettings, navigation]);

  const onSave = async () => {
    await saveLocale(form.locale ?? 'de-DE');
    const result = await save();
    if (result.ok) {
      navigation.navigate('Login');
      return;
    }

    if (result.error === 'invalid_pin') {
      Alert.alert('Fehler', 'Die PIN muss leer oder genau 4 Ziffern lang sein.');
    } else {
      Alert.alert('Fehler', 'Die Einstellungen konnten nicht gespeichert werden.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>
      <SettingsForm
        server={form.server}
        client={form.client}
        protocol={form.protocol}
        token={form.token}
        pin={form.pin}
        locale={form.locale ?? 'de-DE'}
        onServerChange={setServer}
        onClientChange={setClient}
        onProtocolChange={setProtocol}
        onTokenChange={setToken}
        onPinChange={setPin}
        onLocaleChange={setLocale}
      />
      <Pressable style={styles.primaryButton} onPress={() => void onSave()} disabled={isSaving}>
        {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Speichern</Text>}
      </Pressable>
      {hasSavedValues ? (
        <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Abbrechen</Text>
        </Pressable>
      ) : null}
      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('QRCodeScanner')}>
        <Text style={styles.secondaryButtonText}>QR-Code scannen</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#0066cc',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#0066cc',
    fontWeight: '600',
  },
});
