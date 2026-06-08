import {
  getLoginPreferences,
  hasValidLoginPreference,
  hasValidSettingsPreference,
  saveLoginPreferences,
  saveValidLoginPreference,
} from './storageConfigStorage';
import { AuthState } from '../types/auth';

/** MAP-004, MAP-007..MAP-011 — STOR-001..STOR-010 */

export const AUTH_STORAGE_KEYS = {
  userName: 'auth.userName', // persisted: storage_config.user_name
  password: 'auth.password', // persisted: SecureStore storage_config.password
  hasValidLogin: 'auth.hasValidLogin',
  hasValidSettings: 'auth.hasValidSettings',
  pin: 'auth.pin',
} as const;

export async function readAuthState(): Promise<AuthState> {
  const prefs = await getLoginPreferences();
  return {
    userName: prefs.userName,
    password: prefs.password,
    hasValidLogin: prefs.hasValidLogin,
    hasValidSettings: prefs.hasValidSettings,
    pin: prefs.pin,
  };
}

export async function saveCredentials(userName: string, password: string): Promise<void> {
  await saveLoginPreferences(userName, password);
}

export async function setValidLoginFlag(isValid: boolean): Promise<void> {
  await saveValidLoginPreference(isValid);
}

export async function getValidLoginFlag(): Promise<boolean> {
  return hasValidLoginPreference();
}

export async function getValidSettingsFlag(): Promise<boolean> {
  return hasValidSettingsPreference();
}

export async function getStoredPin(): Promise<string> {
  const prefs = await getLoginPreferences();
  return prefs.pin;
}
