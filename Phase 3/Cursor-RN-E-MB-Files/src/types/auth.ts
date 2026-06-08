/** Login feature types — MAP-004, MAP-014 */

export type AuthState = {
  userName: string;
  password: string;
  hasValidLogin: boolean;
  hasValidSettings: boolean;
  pin: string;
};

export type LoginFormState = {
  userName: string;
  password: string;
  locale: string;
};

export type LoginSubmitError =
  | 'username_empty'
  | 'password_empty'
  | 'invalid_settings'
  | 'url_build_failed'
  | 'http_failed'
  | 'server_error';

export type LoginSubmitResult =
  | { ok: true; url: string }
  | { ok: false; error: LoginSubmitError; errorCode?: string };

export type SettingsGateRoute = 'Settings' | 'Pin';

export type LoginPreflightOptions = {
  enabled?: boolean;
  fetchFn?: (url: string, init?: RequestInit) => Promise<{ status: number; url?: string }>;
};
