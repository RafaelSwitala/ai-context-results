import AsyncStorage from '@react-native-async-storage/async-storage';

import { DOUGLAS_NEW_SERVER, DOUGLAS_OLD_SERVER } from '../types/appConstants';
import { HttpProtocol, StorageConfigFormState, StoredLoginPreferences } from '../types/storageConfig';
import { deleteSecureItemAsync, getSecureItemAsync, setSecureItemAsync } from '../utils/secureStorage';

/** MAP-008, MAP-009, MAP-010, MAP-011, MAP-012 — STOR-001..STOR-009 */

/** RN keys with documented legacy mapping in phase_3 artifacts */
export const STORAGE_KEYS = {
  server: 'storage_config.server', // legacy: mb_server_key / preference_server_key
  client: 'storage_config.client', // legacy: mb_client_key / preference_client_key
  protocol: 'storage_config.protocol', // legacy: mb_httpProtocol_key / preference_protocol_key
  locale: 'storage_config.locale', // legacy: preference_sel_local_key
  hasValidSettings: 'storage_config.has_valid_settings',
  hasValidLogin: 'storage_config.has_valid_login',
  userName: 'storage_config.user_name',
  currentConfigVersion: 'storage_config.current_config_version',
} as const;

const SECURE_KEYS = {
  token: 'storage_config.token',
  pin: 'storage_config.pin',
  password: 'storage_config.password',
} as const;

function normalizeProtocol(raw: number): HttpProtocol {
  if (raw === HttpProtocol.Http || raw === HttpProtocol.Https || raw === HttpProtocol.HttpsWithoutValidation) {
    return raw;
  }
  return HttpProtocol.Https;
}

export async function getStoredServer(): Promise<string> {
  const server = (await AsyncStorage.getItem(STORAGE_KEYS.server)) ?? '';
  if (server.toLowerCase() === DOUGLAS_OLD_SERVER) {
    await AsyncStorage.setItem(STORAGE_KEYS.server, DOUGLAS_NEW_SERVER);
    return DOUGLAS_NEW_SERVER;
  }
  return server;
}

export async function getLoginPreferences(): Promise<StoredLoginPreferences> {
  const [server, client, protocolRaw, locale, hasValidSettingsRaw, hasValidLoginRaw, userName, currentConfigVersion, token, pin, password] =
    await Promise.all([
      getStoredServer(),
      AsyncStorage.getItem(STORAGE_KEYS.client),
      AsyncStorage.getItem(STORAGE_KEYS.protocol),
      AsyncStorage.getItem(STORAGE_KEYS.locale),
      AsyncStorage.getItem(STORAGE_KEYS.hasValidSettings),
      AsyncStorage.getItem(STORAGE_KEYS.hasValidLogin),
      AsyncStorage.getItem(STORAGE_KEYS.userName),
      AsyncStorage.getItem(STORAGE_KEYS.currentConfigVersion),
      getSecureItemAsync(SECURE_KEYS.token),
      getSecureItemAsync(SECURE_KEYS.pin),
      getSecureItemAsync(SECURE_KEYS.password),
    ]);

  return {
    server,
    client: client ?? '',
    protocol: normalizeProtocol(protocolRaw != null ? Number.parseInt(protocolRaw, 10) : HttpProtocol.Https),
    token: token ?? '',
    pin: pin ?? '',
    locale,
    userName: userName ?? '',
    password: password ?? '',
    hasValidSettings: hasValidSettingsRaw === 'true',
    hasValidLogin: hasValidLoginRaw === 'true',
    currentConfigVersion,
  };
}

export async function hasValidSettingsPreference(): Promise<boolean> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.hasValidSettings);
  return value === 'true';
}

export async function hasValidLoginPreference(): Promise<boolean> {
  const value = await AsyncStorage.getItem(STORAGE_KEYS.hasValidLogin);
  return value === 'true';
}

export async function saveProtocolPreference(protocol: number): Promise<void> {
  if (protocol < HttpProtocol.Http || protocol > HttpProtocol.HttpsWithoutValidation) {
    return;
  }
  await AsyncStorage.setItem(STORAGE_KEYS.protocol, String(protocol));
}

export async function saveSettingsPreferences(settings: StorageConfigFormState): Promise<void> {
  await AsyncStorage.multiSet([
    [STORAGE_KEYS.server, settings.server],
    [STORAGE_KEYS.client, settings.client ?? ''],
    [STORAGE_KEYS.protocol, String(settings.protocol)],
  ]);
  await setSecureItemAsync(SECURE_KEYS.token, settings.token ?? '');
  await setSecureItemAsync(SECURE_KEYS.pin, settings.pin ?? '');
}

export async function saveValidSettingsPreference(isValid: boolean): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.hasValidSettings, String(isValid));
}

export async function saveValidLoginPreference(isValid: boolean): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.hasValidLogin, String(isValid));
}

export async function saveLoginPreferences(userName: string, password: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.userName, userName);
  await setSecureItemAsync(SECURE_KEYS.password, password);
}

export async function saveLocale(locale: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.locale, locale);
}

export async function getLocale(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.locale);
}

export async function saveCurrentConfigVersion(version: string): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.currentConfigVersion, version);
}

export async function getCurrentConfigVersion(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.currentConfigVersion);
}

export function hasAnySavedPreferences(prefs: StoredLoginPreferences): boolean {
  return (
    prefs.server.length > 0 ||
    prefs.client.length > 0 ||
    prefs.password.length > 0 ||
    prefs.pin.length > 0 ||
    prefs.token.length > 0
  );
}

export async function replaceDouglasServerName(): Promise<void> {
  const server = (await AsyncStorage.getItem(STORAGE_KEYS.server)) ?? '';
  if (server.toLowerCase() === DOUGLAS_OLD_SERVER) {
    await AsyncStorage.setItem(STORAGE_KEYS.server, DOUGLAS_NEW_SERVER);
  }
}

/** Test-only reset helper */
export async function clearStorageConfigForTests(): Promise<void> {
  await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  await Promise.all(Object.values(SECURE_KEYS).map((key) => deleteSecureItemAsync(key)));
}
