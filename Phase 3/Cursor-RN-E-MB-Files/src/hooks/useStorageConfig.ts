import { useCallback, useEffect, useMemo, useState } from 'react';

import { checkAccess } from '../services/storageConfigService';
import {
  getLoginPreferences,
  hasAnySavedPreferences,
  replaceDouglasServerName,
  saveProtocolPreference,
  saveSettingsPreferences,
  saveValidSettingsPreference,
} from '../services/storageConfigStorage';
import { HttpProtocol, StorageConfigFormState } from '../types/storageConfig';
import { isPinValid, isSettingsInputValid } from '../utils/storageConfigValidation';

/** MAP-017 — STATE-001, STATE-002, STATE-005, BEH-001, BEH-010 */

export type StorageConfigSaveError = 'invalid_pin' | 'invalid_settings' | 'url_build' | 'check_access';

export type UseStorageConfigResult = {
  form: StorageConfigFormState;
  isLoading: boolean;
  isSaving: boolean;
  hasSavedValues: boolean;
  saveError: StorageConfigSaveError | null;
  setServer: (value: string) => void;
  setClient: (value: string) => void;
  setProtocol: (value: HttpProtocol) => void;
  setToken: (value: string) => void;
  setPin: (value: string) => void;
  setLocale: (value: string) => void;
  applyQrSettings: (settings: Partial<StorageConfigFormState>) => void;
  save: () => Promise<{ ok: boolean; error?: StorageConfigSaveError }>;
  reload: () => Promise<void>;
};

function defaultForm(hasValidSettings: boolean): StorageConfigFormState {
  return {
    server: '',
    client: '',
    protocol: hasValidSettings ? HttpProtocol.Https : HttpProtocol.Https,
    token: '',
    pin: '',
    locale: 'de-DE',
  };
}

export function useStorageConfig(): UseStorageConfigResult {
  const [form, setForm] = useState<StorageConfigFormState>(defaultForm(false));
  const [hasSavedValues, setHasSavedValues] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<StorageConfigSaveError | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    await replaceDouglasServerName();
    const prefs = await getLoginPreferences();
    const hasValid = prefs.hasValidSettings;

    setForm({
      server: prefs.server,
      client: prefs.client,
      protocol: hasValid ? prefs.protocol : HttpProtocol.Https,
      token: prefs.token,
      pin: prefs.pin,
      locale: prefs.locale ?? 'de-DE',
    });
    setHasSavedValues(hasAnySavedPreferences(prefs));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const setField = useCallback(<K extends keyof StorageConfigFormState>(key: K, value: StorageConfigFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  }, []);

  const applyQrSettings = useCallback((settings: Partial<StorageConfigFormState>) => {
    setForm((current) => ({
      ...current,
      ...settings,
    }));
  }, []);

  const save = useCallback(async (): Promise<{ ok: boolean; error?: StorageConfigSaveError }> => {
    setSaveError(null);

    if (!isSettingsInputValid(form.server, form.pin)) {
      const error: StorageConfigSaveError = isPinValid(form.pin) ? 'invalid_settings' : 'invalid_pin';
      setSaveError(error);
      return { ok: false, error };
    }

    setIsSaving(true);
    try {
      await saveProtocolPreference(form.protocol);
      const result = await checkAccess(form.server, form.client, form.protocol);
      if (!result.ok) {
        const error: StorageConfigSaveError = result.status === 0 ? 'url_build' : 'check_access';
        setSaveError(error);
        return { ok: false, error };
      }

      await saveValidSettingsPreference(true);
      await saveSettingsPreferences(form);
      setHasSavedValues(true);
      return { ok: true };
    } finally {
      setIsSaving(false);
    }
  }, [form]);

  return useMemo(
    () => ({
      form,
      isLoading,
      isSaving,
      hasSavedValues,
      saveError,
      setServer: (value) => setField('server', value),
      setClient: (value) => setField('client', value),
      setProtocol: (value) => setField('protocol', value),
      setToken: (value) => setField('token', value),
      setPin: (value) => setField('pin', value),
      setLocale: (value) => setField('locale', value),
      applyQrSettings,
      save,
      reload,
    }),
    [form, isLoading, isSaving, hasSavedValues, saveError, setField, applyQrSettings, save, reload],
  );
}
