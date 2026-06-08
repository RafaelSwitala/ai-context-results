import { useEffect, useState } from 'react';
import { ActivityIndicator, BackHandler, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { resolveSettingsAccessRoute, resolveSettingsGate } from '../navigation/authGate';
import { readAuthSnapshot } from '../services/authStorageService';
import { useAuthState } from '../hooks/useAuthState';
import { LoginError } from '../types/auth';

type Props = {
  onOpenLicense: () => void;
  onOpenSettings: () => void;
  onOpenPin: () => void;
  onLoginSuccess: (url: string) => void;
};

function loginErrorMessage(error: LoginError | null): string | null {
  if (error === 'missing-username') {
    return 'Username is required.';
  }

  if (error === 'missing-password') {
    return 'Password is required.';
  }

  if (error === 'invalid-settings') {
    return 'Settings are required.';
  }

  if (error === 'server-error') {
    return 'Login was rejected by the server.';
  }

  if (error) {
    return 'Login failed.';
  }

  return null;
}

export default function LoginScreen({ onOpenLicense, onOpenSettings, onOpenPin, onLoginSuccess }: Props) {
  const auth = useAuthState({ preflightEnabled: true });
  const [hasValidSettings, setHasValidSettings] = useState(false);
  const [hasPin, setHasPin] = useState(false);

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    let isMounted = true;
    void readAuthSnapshot().then((snapshot) => {
      if (!isMounted) {
        return;
      }

      setHasValidSettings(snapshot.hasValidSettings);
      setHasPin(Boolean(snapshot.pin));
      const route = resolveSettingsGate(snapshot);
      if (route === 'settings') {
        onOpenSettings();
      } else if (route === 'pin') {
        onOpenPin();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [onOpenPin, onOpenSettings]);

  const lastError = auth.lastResult?.ok === false ? auth.lastResult.error : null;
  const message = loginErrorMessage(lastError);

  if (auth.loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Mobile Browser</Text>
      <Text style={styles.status}>{hasValidSettings ? 'Settings available' : hasPin ? 'PIN required for settings' : 'Settings required'}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={auth.credentials.userName}
          onChangeText={(value) => auth.updateCredential('userName', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          autoCapitalize="none"
          secureTextEntry
          style={styles.input}
          value={auth.credentials.password}
          onChangeText={(value) => auth.updateCredential('password', value)}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Culture</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          value={auth.locale ?? ''}
          onChangeText={(value) => {
            void auth.updateLocale(value || null);
          }}
        />
      </View>

      {message ? <Text style={styles.error}>{message}</Text> : null}

      <View style={styles.actions}>
        <Pressable style={styles.secondaryButton} onPress={onOpenLicense}>
          <Text style={styles.secondaryButtonText}>Licenses</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={() => {
            void readAuthSnapshot().then((snapshot) => {
              const route = resolveSettingsAccessRoute(snapshot);
              if (route === 'pin') {
                onOpenPin();
              } else {
                onOpenSettings();
              }
            });
          }}
        >
          <Text style={styles.secondaryButtonText}>Settings</Text>
        </Pressable>
        <Pressable
          disabled={auth.submitting}
          style={[styles.primaryButton, auth.submitting && styles.buttonDisabled]}
          onPress={() => {
            void auth.login().then((result) => {
              if (result.ok) {
                onLoginSuccess(result.url);
              }
            });
          }}
        >
          <Text style={styles.primaryButtonText}>{auth.submitting ? 'Signing in...' : 'Login'}</Text>
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
  buttonDisabled: {
    opacity: 0.55,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: '#a11d33',
    fontWeight: '700',
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
  screen: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  status: {
    color: '#425466',
    fontSize: 16,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#0f6bff',
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 18,
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
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#0f6bff',
    fontWeight: '700',
  },
});
