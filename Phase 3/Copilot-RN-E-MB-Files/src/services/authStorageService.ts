/**
 * Auth Storage Service
 * Specialized storage for login credentials and auth flags
 * Corresponds to Phase 1 mappings: MAP-004, MAP-007 through MAP-011, MAP-017, MAP-019
 * Source IDs: STOR-001 through STOR-010, SEC-001 through SEC-003, STATE-001 through STATE-004
 */

import { getSecureValue, setSecureValue, getAsyncValue, setAsyncValue } from './storageConfigStorage';
import { STORAGE_KEYS } from '../types';

// ============= USERNAME (MAP-007) =============

/**
 * Read stored username
 * Source: STOR-001 (iOS mb_userName_key), STOR-006 (Android preference_user_key)
 * Non-sensitive, stored in AsyncStorage
 * 
 * @returns Username string or null
 */
export async function readUsername(): Promise<string | null> {
  try {
    return await getAsyncValue(STORAGE_KEYS.USERNAME);
  } catch {
    return null;
  }
}

/**
 * Write username to storage
 * Source: BEH-001, BEH-013, BEH-020
 * 
 * @param username - Username to store (or null to clear)
 */
export async function writeUsername(username: string | null): Promise<void> {
  try {
    await setAsyncValue(STORAGE_KEYS.USERNAME, username);
  } catch {
    // Silently fail if storage unavailable
  }
}

// ============= PASSWORD (MAP-008, MAP-017) =============

/**
 * Read stored password from secure storage
 * Source: STOR-002 (iOS mb_password_key, unencrypted), STOR-007 (Android preference_password_key, base64)
 * RN: Stored encrypted via expo-secure-store (MAP-019)
 * Security improvement: replaces legacy unencrypted/base64 storage
 * 
 * @returns Password string or null
 */
export async function readPassword(): Promise<string | null> {
  try {
    return await getSecureValue(STORAGE_KEYS.PASSWORD);
  } catch {
    return null;
  }
}

/**
 * Write password to secure storage
 * Source: BEH-009, BEH-020, SEC-001, SEC-002
 * Automatically encrypted by expo-secure-store
 * 
 * @param password - Plaintext password (or null to clear)
 */
export async function writePassword(password: string | null): Promise<void> {
  try {
    await setSecureValue(STORAGE_KEYS.PASSWORD, password);
  } catch {
    // Silently fail if secure storage unavailable
  }
}

// ============= HAS_VALID_LOGIN FLAG (MAP-009) =============

/**
 * Read login validity flag
 * Source: STOR-003 (iOS mb_valid_login_key), STOR-008 (Android preference_valid_login_key)
 * State flag set on successful login (STATE-001, STATE-002)
 * Cleared on background/logout (STATE-003, STATE-004)
 * 
 * @returns true if login is valid, false otherwise
 */
export async function readHasValidLogin(): Promise<boolean> {
  try {
    const value = await getAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN);
    return value === 'true';
  } catch {
    return false;
  }
}

/**
 * Write login validity flag
 * Source: STATE-001, STATE-002 (set true on success), STATE-003, STATE-004 (set false on pause/logout)
 * 
 * @param isValid - Login validity state
 */
export async function writeHasValidLogin(isValid: boolean): Promise<void> {
  try {
    await setAsyncValue(STORAGE_KEYS.HAS_VALID_LOGIN, isValid);
  } catch {
    // Silently fail
  }
}

// ============= HAS_VALID_SETTINGS FLAG (MAP-010) =============

/**
 * Read settings validity flag
 * Source: STOR-004 (iOS mb_valid_settings_key), STOR-009 (Android preference_valid_settings_key)
 * Read-only at login time; set by Settings screen (out of login scope)
 * Used for gate logic: EP-003/EP-004, BEH-005, NAV-003/NAV-004
 * 
 * @returns true if settings are valid, false otherwise
 */
export async function readHasValidSettings(): Promise<boolean> {
  try {
    const value = await getAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS);
    return value === 'true';
  } catch {
    return false;
  }
}

/**
 * Write settings validity flag
 * Note: Normally set by Settings feature, not login flow
 * Exposed for completeness and migration scenarios
 * 
 * @param isValid - Settings validity state
 */
export async function writeHasValidSettings(isValid: boolean): Promise<void> {
  try {
    await setAsyncValue(STORAGE_KEYS.HAS_VALID_SETTINGS, isValid);
  } catch {
    // Silently fail
  }
}

// ============= PIN (MAP-011) =============

/**
 * Read stored PIN from secure storage
 * Source: STOR-005 (iOS mb_pin_key), STOR-010 (Android preference_pin_key)
 * RN: Stored encrypted via expo-secure-store (MAP-019)
 * Security improvement: replaces legacy unencrypted storage
 * Used for gate logic before settings access (BEH-006, NAV-005)
 * 
 * @returns PIN string or null if not stored
 */
export async function readPin(): Promise<string | null> {
  try {
    return await getSecureValue(STORAGE_KEYS.PIN);
  } catch {
    return null;
  }
}

/**
 * Write PIN to secure storage
 * Source: Settings screen (out of scope), but exposed for completeness
 * 
 * @param pin - PIN string (or null to clear)
 */
export async function writePin(pin: string | null): Promise<void> {
  try {
    await setSecureValue(STORAGE_KEYS.PIN, pin);
  } catch {
    // Silently fail if secure storage unavailable
  }
}

// ============= COMPOSITE OPERATIONS =============

/**
 * Load all auth-related storage into a single object
 * Source: EP-001, EP-002, EP-003, EP-004 (initial screen load)
 * 
 * @returns Aggregated auth data or null on failure
 */
export interface AuthStorageState {
  username: string | null;
  password: string | null;
  hasValidLogin: boolean;
  hasValidSettings: boolean;
  pin: string | null;
}

export async function loadAuthStorage(): Promise<AuthStorageState> {
  try {
    const [username, password, hasValidLogin, hasValidSettings, pin] = await Promise.all([
      readUsername(),
      readPassword(),
      readHasValidLogin(),
      readHasValidSettings(),
      readPin(),
    ]);

    return {
      username,
      password,
      hasValidLogin,
      hasValidSettings,
      pin,
    };
  } catch {
    return {
      username: null,
      password: null,
      hasValidLogin: false,
      hasValidSettings: false,
      pin: null,
    };
  }
}

/**
 * Clear all auth storage (logout action)
 * Source: STATE-003 (iOS background), STATE-004 (Android pause)
 * Also called by sessionService.logout() for full cleanup
 */
export async function clearAuthStorage(): Promise<void> {
  try {
    await Promise.all([
      writeUsername(null),
      writePassword(null),
      writeHasValidLogin(false),
      writePin(null),
      // Note: HAS_VALID_SETTINGS is NOT cleared (belongs to settings feature)
    ]);
  } catch {
    // Continue even if some clears fail
  }
}

/**
 * Save login credentials after successful authentication
 * Source: BEH-009 (iOS success path), BEH-020 (Android success path)
 * 
 * @param username - Authenticated username
 * @param password - Authenticated password (plaintext; will be encrypted on storage)
 */
export async function saveLoginCredentials(
  username: string,
  password: string
): Promise<void> {
  try {
    await Promise.all([
      writeUsername(username),
      writePassword(password),
      writeHasValidLogin(true),
    ]);
  } catch {
    // Partial save is acceptable (e.g., storage full scenario)
  }
}

/**
 * Clear login credentials and flags on logout
 * Source: STATE-003, STATE-004 (pause/background), BEH-007 (explicit logout)
 */
export async function clearLoginSession(): Promise<void> {
  await clearAuthStorage();
}
