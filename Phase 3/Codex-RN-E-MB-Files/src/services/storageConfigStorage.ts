import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import {
  DEFAULT_STORAGE_CONFIG,
  HttpProtocol,
  StorageConfigValues,
  isHttpProtocol,
} from '../types/storageConfig';

export const STORAGE_CONFIG_KEYS = {
  server: 'preference_server_key',
  client: 'preference_client_key',
  userName: 'preference_user_key',
  password: 'preference_password_key',
  pin: 'preference_pin_key',
  token: 'preference_token_key',
  protocol: 'preference_protocol_key',
  hasValidSettings: 'preference_valid_settings_key',
  hasValidLogin: 'preference_valid_login_key',
  locale: 'preference_sel_local_key',
  currentConfigVersion: 'preference_current_config_version_key',
  ios: {
    userName: 'mb_userName_key',
    password: 'mb_password_key',
    server: 'mb_server_key',
    client: 'mb_client_key',
    pin: 'mb_pin_key',
    protocol: 'mb_httpProtocol_key',
    token: 'mb_token_key',
    hasValidSettings: 'mb_valid_settings_key',
    hasValidLogin: 'mb_valid_login_key',
  },
} as const;

const OLD_DOUGLAS_SERVER_NAME = 'prestigeweb01.dhag.rd.local';
const NEW_DOUGLAS_SERVER_NAME = 'prestigeweb01.douglas-informatik.de';

async function getAsyncString(key: string, fallback = ''): Promise<string> {
  return (await AsyncStorage.getItem(key)) ?? fallback;
}

async function setAsyncString(key: string, value: string | null | undefined): Promise<void> {
  await AsyncStorage.setItem(key, value ?? '');
}

async function getAsyncBoolean(key: string, fallback = false): Promise<boolean> {
  const value = await AsyncStorage.getItem(key);
  if (value == null) {
    return fallback;
  }

  return value === 'true';
}

async function setAsyncBoolean(key: string, value: boolean): Promise<void> {
  await AsyncStorage.setItem(key, String(value));
}

async function getSecureString(key: string): Promise<string> {
  try {
    return (await SecureStore.getItemAsync(key)) ?? '';
  } catch {
    return (await AsyncStorage.getItem(`secure:${key}`)) ?? '';
  }
}

async function setSecureString(key: string, value: string | null | undefined): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value ?? '');
  } catch {
    await AsyncStorage.setItem(`secure:${key}`, value ?? '');
  }
}

async function getProtocol(): Promise<HttpProtocol> {
  const raw = Number(await AsyncStorage.getItem(STORAGE_CONFIG_KEYS.protocol));
  return isHttpProtocol(raw) ? raw : HttpProtocol.Https;
}

export async function replaceDouglasServerName(): Promise<boolean> {
  const server = await getAsyncString(STORAGE_CONFIG_KEYS.server);
  if (server.toLowerCase() !== OLD_DOUGLAS_SERVER_NAME) {
    return false;
  }

  await AsyncStorage.setItem(STORAGE_CONFIG_KEYS.server, NEW_DOUGLAS_SERVER_NAME);
  return true;
}

export async function loadStorageConfig(): Promise<StorageConfigValues> {
  await replaceDouglasServerName();

  return {
    ...DEFAULT_STORAGE_CONFIG,
    server: await getAsyncString(STORAGE_CONFIG_KEYS.server),
    client: await getAsyncString(STORAGE_CONFIG_KEYS.client),
    token: await getSecureString(STORAGE_CONFIG_KEYS.token),
    pin: await getSecureString(STORAGE_CONFIG_KEYS.pin),
    protocol: await getProtocol(),
    locale: await AsyncStorage.getItem(STORAGE_CONFIG_KEYS.locale),
    currentConfigVersion: await AsyncStorage.getItem(STORAGE_CONFIG_KEYS.currentConfigVersion),
    userName: await getAsyncString(STORAGE_CONFIG_KEYS.userName),
    password: await getSecureString(STORAGE_CONFIG_KEYS.password),
    hasValidSettings: await getAsyncBoolean(STORAGE_CONFIG_KEYS.hasValidSettings),
    hasValidLogin: await getAsyncBoolean(STORAGE_CONFIG_KEYS.hasValidLogin),
  };
}

export async function saveProtocolPreference(protocol: HttpProtocol): Promise<boolean> {
  if (!isHttpProtocol(protocol)) {
    return false;
  }

  await AsyncStorage.setItem(STORAGE_CONFIG_KEYS.protocol, String(protocol));
  return true;
}

export async function saveSettingsPreferences(values: Pick<StorageConfigValues, 'server' | 'client' | 'token' | 'pin' | 'protocol'>): Promise<void> {
  await saveProtocolPreference(values.protocol);
  await setAsyncString(STORAGE_CONFIG_KEYS.server, values.server);
  await setAsyncString(STORAGE_CONFIG_KEYS.client, values.client);
  await setSecureString(STORAGE_CONFIG_KEYS.token, values.token);
  await setSecureString(STORAGE_CONFIG_KEYS.pin, values.pin);
}

export async function saveLoginPreferences(userName: string, password: string): Promise<void> {
  await setAsyncString(STORAGE_CONFIG_KEYS.userName, userName);
  await setSecureString(STORAGE_CONFIG_KEYS.password, password);
}

export async function saveValidSettingsPreference(isValid: boolean): Promise<void> {
  await setAsyncBoolean(STORAGE_CONFIG_KEYS.hasValidSettings, isValid);
}

export async function saveValidLoginPreference(isValid: boolean): Promise<void> {
  await setAsyncBoolean(STORAGE_CONFIG_KEYS.hasValidLogin, isValid);
}

export async function saveLocale(locale: string | null | undefined): Promise<void> {
  await setAsyncString(STORAGE_CONFIG_KEYS.locale, locale);
}

export async function saveCurrentConfigVersion(version: string | null | undefined): Promise<void> {
  await setAsyncString(STORAGE_CONFIG_KEYS.currentConfigVersion, version);
}
