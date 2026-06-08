import { useCallback, useEffect, useState } from 'react';

import { readAuthState, saveCredentials, getValidSettingsFlag, setValidLoginFlag } from '../services/authStorageService';
import { submitLogin } from '../services/loginService';
import { getLocale, saveLocale } from '../services/storageConfigStorage';
import { LoginFormState, LoginSubmitError, LoginSubmitResult } from '../types/auth';

/** MAP-001, MAP-014 — BEH-001..BEH-011, BEH-013..BEH-022 */

export function useLogin(onSuccess: (url: string) => void) {
  const [form, setForm] = useState<LoginFormState>({
    userName: '',
    password: '',
    locale: 'de-DE',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastError, setLastError] = useState<LoginSubmitError | null>(null);
  const [serverErrorCode, setServerErrorCode] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    try {
      const auth = await readAuthState();
      const locale = (await getLocale()) ?? 'de-DE';
      setForm({
        userName: auth.userName,
        password: auth.password,
        locale,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const submit = useCallback(async (): Promise<LoginSubmitResult | { ok: true; url: string }> => {
    setLastError(null);
    setServerErrorCode(null);
    setIsSubmitting(true);
    try {
      const hasValidSettings = await getValidSettingsFlag();
      const result = await submitLogin(form.userName, form.password, hasValidSettings, form.locale);
      if (!result.ok) {
        setLastError(result.error);
        if (result.errorCode) {
          setServerErrorCode(result.errorCode);
        }
        return result;
      }

      await saveCredentials(form.userName, form.password);
      await saveLocale(form.locale);
      await setValidLoginFlag(true);
      onSuccess(result.url);
      return result;
    } finally {
      setIsSubmitting(false);
    }
  }, [form, onSuccess]);

  return {
    form,
    isLoading,
    isSubmitting,
    lastError,
    serverErrorCode,
    setUserName: (userName: string) => setForm((current) => ({ ...current, userName })),
    setPassword: (password: string) => setForm((current) => ({ ...current, password })),
    setLocale: (locale: string) => setForm((current) => ({ ...current, locale })),
    submit,
    reload,
  };
}
