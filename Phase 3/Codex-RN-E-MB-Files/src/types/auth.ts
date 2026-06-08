import { StorageConfigValues } from './storageConfig';

export type AuthCredentials = {
  userName: string;
  password: string;
};

export type AuthSnapshot = Pick<
  StorageConfigValues,
  'userName' | 'password' | 'hasValidLogin' | 'hasValidSettings' | 'pin' | 'locale'
>;

export type SettingsGateRoute = 'login' | 'settings' | 'pin';

export type LoginError =
  | 'missing-username'
  | 'missing-password'
  | 'invalid-settings'
  | 'invalid-url'
  | 'preflight-failed'
  | 'server-error';

export type LoginResult =
  | { ok: true; url: string }
  | { ok: false; error: LoginError; errorCode?: string };
