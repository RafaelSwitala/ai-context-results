import { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useStorageConfig } from '../hooks/useStorageConfig';
import { EditableStorageConfigValues, HttpProtocol } from '../types/storageConfig';

type Props = {
  importedValues: Partial<EditableStorageConfigValues> | null;
  onCancel: () => void;
  onOpenScanner: () => void;
  onSaved: () => void;
};

const PROTOCOL_OPTIONS = [
  { label: 'HTTP', value: HttpProtocol.Http },
  { label: 'HTTPS', value: HttpProtocol.Https },
  { label: 'HTTPS without validation', value: HttpProtocol.HttpsWithoutValidation },
] as const;

function errorText(error: string | null): string | null {
  if (error === 'invalid-pin') {
    return 'PIN must be empty or exactly 4 characters.';
  }

  if (error === 'invalid-settings') {
    return 'Server is required.';
  }

  if (error === 'check-access-failed') {
    return 'Server access check failed.';
  }

  return null;
}

export default function SettingsScreen({ importedValues, onCancel, onOpenScanner, onSaved }: Props) {
  const storageConfig = useStorageConfig();
  const { applyImportedValues } = storageConfig;

  useEffect(() => {
    if (importedValues) {
      applyImportedValues(importedValues);
    }
  }, [applyImportedValues, importedValues]);

  const message = errorText(storageConfig.error);

  if (storageConfig.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Settings</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Server</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={storageConfig.values.server}
          onChangeText={(value) => storageConfig.updateValue('server', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Mandant</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={storageConfig.values.client}
          onChangeText={(value) => storageConfig.updateValue('client', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Protocol</Text>
        <View style={styles.segmented}>
          {PROTOCOL_OPTIONS.map((option) => (
            <Pressable
              key={option.value}
              style={[styles.segment, storageConfig.values.protocol === option.value && styles.segmentActive]}
              onPress={() => storageConfig.updateValue('protocol', option.value)}
            >
              <Text style={[styles.segmentText, storageConfig.values.protocol === option.value && styles.segmentTextActive]}>{option.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Token</Text>
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.input}
          value={storageConfig.values.token}
          onChangeText={(value) => storageConfig.updateValue('token', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>PIN</Text>
        <TextInput
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
          style={styles.input}
          value={storageConfig.values.pin}
          onChangeText={(value) => storageConfig.updateValue('pin', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Culture</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={storageConfig.values.locale ?? ''}
          onChangeText={(value) => storageConfig.updateValue('locale', value || null)}
        />
      </View>

      {message ? <Text style={styles.error}>{message}</Text> : null}

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onCancel}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={onOpenScanner}>
          <Text style={styles.secondaryButtonText}>QR import</Text>
        </Pressable>
        <Pressable
          disabled={storageConfig.checkingAccess}
          style={[styles.primaryButton, storageConfig.checkingAccess && styles.buttonDisabled]}
          onPress={() => {
            void storageConfig.save().then((result) => {
              if (result.ok) {
                onSaved();
              }
            });
          }}
        >
          <Text style={styles.primaryButtonText}>{storageConfig.checkingAccess ? 'Checking...' : 'Save'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    gap: 16,
    padding: 24,
  },
  error: {
    color: '#a11d33',
    fontWeight: '600',
  },
  field: {
    gap: 6,
  },
  input: {
    borderColor: '#ccd6e0',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  label: {
    color: '#425466',
    fontSize: 14,
    fontWeight: '700',
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
  segment: {
    alignItems: 'center',
    borderColor: '#ccd6e0',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  segmentActive: {
    backgroundColor: '#102a43',
    borderColor: '#102a43',
  },
  segmented: {
    flexDirection: 'row',
    gap: 8,
  },
  segmentText: {
    color: '#102a43',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  segmentTextActive: {
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
});
