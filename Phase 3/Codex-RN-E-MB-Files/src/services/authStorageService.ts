import { AuthCredentials, AuthSnapshot } from '../types/auth';
import {
  loadStorageConfig,
  saveLocale,
  saveLoginPreferences,
  saveValidLoginPreference,
} from './storageConfigStorage';

export async function readAuthSnapshot(): Promise<AuthSnapshot> {
  const values = await loadStorageConfig();
  return {
    userName: values.userName,
    password: values.password,
    hasValidLogin: values.hasValidLogin,
    hasValidSettings: values.hasValidSettings,
    pin: values.pin,
    locale: values.locale,
  };
}

export async function saveAuthCredentials(credentials: AuthCredentials): Promise<void> {
  await saveLoginPreferences(credentials.userName, credentials.password);
}

export async function saveAuthLocale(locale: string | null): Promise<void> {
  await saveLocale(locale);
}

export async function setHasValidLogin(isValid: boolean): Promise<void> {
  await saveValidLoginPreference(isValid);
}
