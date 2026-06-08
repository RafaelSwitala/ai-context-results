import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LoginForm from '../components/LoginForm';
import { useAuthState } from '../hooks/useAuthState';
import { useLogin } from '../hooks/useLogin';
import { useSettingsGateState } from '../hooks/useSettingsGateState';
import { resolveSettingsButtonGate } from '../navigation/authGate';
import { useLoginBackHandler } from '../hooks/useNavigationAuthGuard';
import { RootStackParamList } from '../navigation/types';
import { formatPeErrorMessage } from '../utils/loginErrorParser';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

/** MAP-001 — EP-001, EP-002, BEH-001..BEH-011, UI-001, UI-002, NAV-001 */

export default function LoginScreen({ navigation }: Props) {
  useAuthState();
  useLoginBackHandler();

  const onLoginSuccess = useCallback(
    (url: string) => {
      navigation.navigate('WebView', { url });
    },
    [navigation],
  );

  const { form, isLoading, isSubmitting, setUserName, setPassword, setLocale, submit } =
    useLogin(onLoginSuccess);

  const onNavigateGate = useCallback(
    (route: 'Settings' | 'Pin') => {
      navigation.replace(route);
    },
    [navigation],
  );

  const openSettingsFromButton = useCallback(async () => {
    const route = await resolveSettingsButtonGate();
    navigation.navigate(route);
  }, [navigation]);

  const { ready } = useSettingsGateState(onNavigateGate);

  const onSubmit = async () => {
    const result = await submit();
    if (result.ok) {
      return;
    }
    if (result.error === 'username_empty') {
      Alert.alert('Fehler', 'Bitte geben Sie einen Benutzernamen ein.');
    } else if (result.error === 'password_empty') {
      Alert.alert('Fehler', 'Bitte geben Sie ein Passwort ein.');
    } else if (result.error === 'server_error' && result.errorCode) {
      Alert.alert('Fehler', formatPeErrorMessage(result.errorCode));
    } else {
      Alert.alert('Fehler', 'Die Anmeldung ist fehlgeschlagen.');
    }
  };

  if (!ready || isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Anmelden</Text>
      <Text style={styles.version}>Version 1.0.0</Text>
      <LoginForm
        userName={form.userName}
        password={form.password}
        locale={form.locale}
        onUserNameChange={setUserName}
        onPasswordChange={setPassword}
        onLocaleChange={setLocale}
      />
      <Pressable style={styles.primaryButton} onPress={() => void onSubmit()} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryButtonText}>Anmelden</Text>}
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => void openSettingsFromButton()}>
        <Text style={styles.secondaryButtonText}>Einstellungen</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('License')}>
        <Text style={styles.secondaryButtonText}>Lizenzen</Text>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  version: {
    color: '#666',
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
