import { useCallback, useEffect, useMemo, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

import { readAuthSnapshot, saveAuthLocale } from '../services/authStorageService';
import { submitLogin } from '../services/loginService';
import { logoutCurrentSession, SessionCleanup } from '../services/sessionService';
import { HttpGet } from '../services/storageConfigService';
import { AuthCredentials, AuthSnapshot, LoginResult } from '../types/auth';

export function useAuthState(options: { httpGet?: HttpGet; sessionCleanup?: SessionCleanup; preflightEnabled?: boolean } = {}) {
  const [snapshot, setSnapshot] = useState<AuthSnapshot | null>(null);
  const [credentials, setCredentials] = useState<AuthCredentials>({ userName: '', password: '' });
  const [locale, setLocale] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<LoginResult | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const auth = await readAuthSnapshot();
    setSnapshot(auth);
    setCredentials({ userName: auth.userName, password: auth.password });
    setLocale(auth.locale);
    setLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'background') {
        void logoutCurrentSession(options.sessionCleanup).then(reload);
      }
    });

    return () => subscription.remove();
  }, [options.sessionCleanup, reload]);

  const updateCredential = useCallback(<TKey extends keyof AuthCredentials>(key: TKey, value: AuthCredentials[TKey]) => {
    setCredentials((current) => ({ ...current, [key]: value }));
  }, []);

  const updateLocale = useCallback(async (value: string | null) => {
    setLocale(value);
    await saveAuthLocale(value);
    await reload();
  }, [reload]);

  const login = useCallback(async () => {
    setSubmitting(true);
    const result = await submitLogin(
      credentials,
      { preflightEnabled: options.preflightEnabled },
      options.httpGet,
    );
    setLastResult(result);
    setSubmitting(false);
    if (result.ok) {
      await reload();
    }
    return result;
  }, [credentials, options.httpGet, options.preflightEnabled, reload]);

  return useMemo(
    () => ({
      snapshot,
      credentials,
      locale,
      loading,
      submitting,
      lastResult,
      reload,
      updateCredential,
      updateLocale,
      login,
    }),
    [credentials, lastResult, loading, locale, login, reload, snapshot, submitting, updateCredential, updateLocale],
  );
}
