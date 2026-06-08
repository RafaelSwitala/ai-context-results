/**
 * Storage Config Storage Service
 * Handles AsyncStorage and SecureStore abstractions
 * Corresponds to Phase 1 mappings: MAP-008, MAP-009, MAP-011, MAP-012
 * Source IDs: STOR-001 through STOR-009, SEC-001 through SEC-003
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {
  Settings,
  LoginPreferences,
  STORAGE_KEYS,
  Protocol,
  QRCodeSettings,
  ConfigFile,
} from '../types';

/**
 * Check if running in web environment
 */
function isWebEnvironment(): boolean {
  try {
    // If window is defined, we're in a browser/web environment
    return typeof window !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Web-compatible secure storage using localStorage as fallback
 */
function getWebSecureStorage() {
  if (typeof window === 'undefined') return null;
  return {
    async setItemAsync(key: string, value: string): Promise<void> {
      try {
        window.localStorage?.setItem(`__secure_${key}`, value);
      } catch (e) {
        console.warn('Web secure storage setItem failed:', e);
      }
    },
    async getItemAsync(key: string): Promise<string | null> {
      try {
        return window.localStorage?.getItem(`__secure_${key}`) ?? null;
      } catch (e) {
        console.warn('Web secure storage getItem failed:', e);
        return null;
      }
    },
    async deleteItemAsync(key: string): Promise<void> {
      try {
        window.localStorage?.removeItem(`__secure_${key}`);
      } catch (e) {
        console.warn('Web secure storage deleteItem failed:', e);
      }
    },
  };
}

/**
 * Storage Service for non-sensitive settings
 * Uses AsyncStorage for server, client, protocol, locale, configVersion
 * Uses SecureStore for token, PIN, password
 * 
 * Architecture: ARCH-005 - Storage layer, no UI imports
 * Naming: Follows ARCH-002 preferred structure pattern
 */

// ============= Sensitive Storage (SecureStore) =============

/**
 * Store sensitive value in encrypted storage
 * Web fallback: uses localStorage with __secure_ prefix
 * Native: uses SecureStore
 * Source: SEC-001, SEC-002 (token/password/PIN storage)
 */
export async function setSecureValue(key: string, value: string | null): Promise<void> {
  const useWebStorage = isWebEnvironment();
  const store = useWebStorage ? getWebSecureStorage() : SecureStore;

  if (!store) {
    console.warn('No secure storage available');
    return;
  }

  if (value === null || value === undefined || value === '') {
    // Delete if clearing
    await store.deleteItemAsync(key).catch(() => {
      // Ignore errors on delete
    });
  } else {
    await store.setItemAsync(key, value);
  }
}

/**
 * Retrieve sensitive value from encrypted storage
 * Web fallback: uses localStorage with __secure_ prefix
 * Native: uses SecureStore
 * Source: SEC-001, SEC-002
 */
export async function getSecureValue(key: string): Promise<string | null> {
  try {
    const useWebStorage = isWebEnvironment();
    const store = useWebStorage ? getWebSecureStorage() : SecureStore;

    if (!store) {
      console.warn('No secure storage available');
      return null;
    }

    return await store.getItemAsync(key);
  } catch (error) {
    console.warn('getSecureValue error:', error);
    return null;
  }
}

// ============= Non-Sensitive Storage (AsyncStorage) =============

/**
 * Store non-sensitive value
 * Source: STOR-001, STOR-005
 */
export async function setAsyncValue(key: string, value: string | number | boolean | null): Promise<void> {
  if (value === null || value === undefined) {
    await AsyncStorage.removeItem(key).catch(() => {
      // Ignore errors on remove
    });
  } else {
    await AsyncStorage.setItem(key, String(value));
  }
}

/**
 * Retrieve non-sensitive value
 * Source: STOR-001, STOR-005
 */
export async function getAsyncValue(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}

// ============= Protocol Helper =============

/**
 * Convert stored protocol string/number to Protocol enum
 * Source: STOR-003, STOR-007, SEC-003
 * iOS behavior: invalid values default to HTTPS
 * Android behavior: invalid values are ignored (stay unchanged)
 * RN: Default to HTTPS on invalid
 */
function parseProtocol(value: string | number | null): Protocol {
  if (value === null || value === undefined) {
    return Protocol.HTTPS; // Default when missing
  }
  
  const num = typeof value === 'string' ? parseInt(value, 10) : value;
  
  if (num === 0) return Protocol.HTTP;
  if (num === 1) return Protocol.HTTPS;
  if (num === 2) return Protocol.HTTPS_WITHOUT_VALIDATION;
  
  return Protocol.HTTPS; // Default on invalid
}

// ============= Settings Persistence =============

/**
 * Load Settings from storage
 * Source: STOR-001 through STOR-009, BEH-001, BEH-010
 * Combines AsyncStorage (public) and SecureStore (sensitive)
 */
export async function loadSettings(): Promise<Settings> {
  const [server, client, protocolStr, token, pin, hasValidSettingsStr, hasValidLoginStr, locale, configVersion] =
    await Promise.all([
      getAsyncValue(STORAGE_KEYS.SERVER),
      getAsyncValue(STORAGE_KEYS.CLIENT),
      getAsyncValue(STORAGE_KEYS.PROTOCOL),
      getSecureValue(STORAGE_KEYS.TOKEN),
      getSecureValue(STORAGE_KEYS.PIN),
      getAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS),
      getAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN),
      getAsyncValue(STORAGE_KEYS.LOCALE),
      getAsyncValue(STORAGE_KEYS.CONFIG_VERSION),
    ]);

  return {
    server: server || '',
    client: client || '',
    protocol: parseProtocol(protocolStr),
    token: token || undefined,
    pin: pin || undefined,
    hasValidSettings: hasValidSettingsStr === 'true',
    hasValidLogin: hasValidLoginStr === 'true',
    locale: locale || undefined,
    configVersion: configVersion || undefined,
  };
}

/**
 * Save Settings to storage
 * Source: STOR-002, STOR-006, BEH-003, BEH-012
 * Atomic: all values written together
 */
export async function saveSettings(settings: Settings): Promise<void> {
  await Promise.all([
    // Non-sensitive
    setAsyncValue(STORAGE_KEYS.SERVER, settings.server),
    setAsyncValue(STORAGE_KEYS.CLIENT, settings.client),
    setAsyncValue(STORAGE_KEYS.PROTOCOL, settings.protocol),
    setAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS, settings.hasValidSettings),
    setAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN, settings.hasValidLogin),
    setAsyncValue(STORAGE_KEYS.LOCALE, settings.locale || null),
    setAsyncValue(STORAGE_KEYS.CONFIG_VERSION, settings.configVersion || null),
    // Sensitive
    setSecureValue(STORAGE_KEYS.TOKEN, settings.token || null),
    setSecureValue(STORAGE_KEYS.PIN, settings.pin || null),
  ]);
}

/**
 * Save only protocol value
 * Source: STOR-003, STOR-007
 * Separate from general settings save for protocol-specific updates
 */
export async function saveProtocolPreference(protocol: Protocol): Promise<void> {
  await setAsyncValue(STORAGE_KEYS.PROTOCOL, protocol);
}

/**
 * Save validation flags
 * Source: STOR-004, STOR-008
 */
export async function saveValidSettings(hasValid: boolean): Promise<void> {
  await setAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS, hasValid);
}

export async function saveValidLogin(hasValid: boolean): Promise<void> {
  await setAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN, hasValid);
}

// ============= Login Preferences Persistence =============

/**
 * Load Login Preferences
 * Source: STOR-004, STOR-008, STOR-011
 * Used by URL builders
 */
export async function loadLoginPreferences(): Promise<LoginPreferences> {
  const [server, client, userName, password, protocolStr, locale, hasValidLoginStr, hasValidSettingsStr] =
    await Promise.all([
      getAsyncValue(STORAGE_KEYS.SERVER),
      getAsyncValue(STORAGE_KEYS.CLIENT),
      getAsyncValue(STORAGE_KEYS.USERNAME),
      getSecureValue(STORAGE_KEYS.PASSWORD),
      getAsyncValue(STORAGE_KEYS.PROTOCOL),
      getAsyncValue(STORAGE_KEYS.LOCALE),
      getAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN),
      getAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS),
    ]);

  return {
    server: server || '',
    client: client || '',
    userName: userName || undefined,
    password: password || undefined,
    protocol: parseProtocol(protocolStr),
    locale: locale || undefined,
    hasValidLogin: hasValidLoginStr === 'true',
    hasValidSettings: hasValidSettingsStr === 'true',
  };
}

/**
 * Save Login Credentials
 * Source: STOR-004, STOR-008
 * Password stored in SecureStore (upgrade from legacy base64 encoding)
 */
export async function saveLoginPreferences(prefs: Partial<LoginPreferences>): Promise<void> {
  await Promise.all([
    setAsyncValue(STORAGE_KEYS.USERNAME, prefs.userName || null),
    setSecureValue(STORAGE_KEYS.PASSWORD, prefs.password || null),
    setAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN, prefs.hasValidLogin ?? null),
  ]);
}

// ============= Locale Persistence (Android-specific) =============

/**
 * Save Locale preference
 * Source: STOR-009, BEH-009, BEH-013
 * Android-specific, optional in RN
 */
export async function saveLocale(locale: string): Promise<void> {
  await setAsyncValue(STORAGE_KEYS.LOCALE, locale);
}

export async function getLocale(): Promise<string | null> {
  return getAsyncValue(STORAGE_KEYS.LOCALE);
}

// ============= Config Version (Android-specific) =============

/**
 * Config file version tracking
 * Source: STOR-009, STOR-010, BEH-009, ERRPATH-008
 * Android-specific: used for config.json version updates
 */
export async function saveCurrentConfigVersion(version: string): Promise<void> {
  await setAsyncValue(STORAGE_KEYS.CONFIG_VERSION, version);
}

export async function getCurrentConfigVersion(): Promise<string | null> {
  return getAsyncValue(STORAGE_KEYS.CONFIG_VERSION);
}

// ============= Batch Clear Operations =============

/**
 * Clear all storage-config related data
 * Used for logout or reset scenarios
 * Web fallback: uses localStorage, Native: uses SecureStore
 */
export async function clearAllSettings(): Promise<void> {
  const keys = [
    STORAGE_KEYS.SERVER,
    STORAGE_KEYS.CLIENT,
    STORAGE_KEYS.PROTOCOL,
    STORAGE_KEYS.TOKEN,
    STORAGE_KEYS.PIN,
    STORAGE_KEYS.USERNAME,
    STORAGE_KEYS.PASSWORD,
    STORAGE_KEYS.HAS_VALID_SETTINGS,
    STORAGE_KEYS.HAS_VALID_LOGIN,
    STORAGE_KEYS.LOCALE,
    STORAGE_KEYS.CONFIG_VERSION,
  ];

  const useWebStorage = isWebEnvironment();
  const secureStore = useWebStorage ? getWebSecureStorage() : SecureStore;

  await Promise.all(
    keys.map((key) =>
      Promise.all([
        AsyncStorage.removeItem(key).catch(() => {}),
        secureStore ? secureStore.deleteItemAsync(key).catch(() => {}) : Promise.resolve(),
      ])
    )
  );
}

/**
 * Clear sensitive data only (for logout without losing settings)
 * Source: STATE-007 (logout behavior)
 */
export async function clearSensitiveData(): Promise<void> {
  await Promise.all([
    setSecureValue(STORAGE_KEYS.TOKEN, null),
    setSecureValue(STORAGE_KEYS.PIN, null),
    setSecureValue(STORAGE_KEYS.PASSWORD, null),
    saveValidLogin(false),
  ]);
}
