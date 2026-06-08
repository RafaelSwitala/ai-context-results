import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';

import { checkAccess, HttpGet } from '../services/storageConfigService';
import {
  loadStorageConfig,
  saveLocale,
  saveProtocolPreference,
  saveSettingsPreferences,
  saveValidSettingsPreference,
} from '../services/storageConfigStorage';
import { DEFAULT_STORAGE_CONFIG, EditableStorageConfigValues, HttpProtocol } from '../types/storageConfig';

export type SaveStorageConfigResult =
  | { ok: true }
  | { ok: false; error: 'invalid-pin' | 'invalid-settings' | 'check-access-failed' };

type StorageConfigError = Exclude<SaveStorageConfigResult, { ok: true }>['error'];

function isPinValid(pin: string): boolean {
  return pin.length === 0 || pin.length === 4;
}

function isSettingsValid(values: EditableStorageConfigValues): SaveStorageConfigResult {
  if (!isPinValid(values.pin)) {
    return { ok: false, error: 'invalid-pin' };
  }

  if (!values.server.trim()) {
    return { ok: false, error: 'invalid-settings' };
  }

  return { ok: true };
}

export function useStorageConfig(httpGet?: HttpGet) {
  const [values, setValues] = useState<EditableStorageConfigValues>({
    server: DEFAULT_STORAGE_CONFIG.server,
    client: DEFAULT_STORAGE_CONFIG.client,
    token: DEFAULT_STORAGE_CONFIG.token,
    pin: DEFAULT_STORAGE_CONFIG.pin,
    protocol: DEFAULT_STORAGE_CONFIG.protocol,
    locale: DEFAULT_STORAGE_CONFIG.locale,
  });
  const [hasValidSettings, setHasValidSettings] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checkingAccess, setCheckingAccess] = useState(false);
  const [error, setError] = useState<StorageConfigError | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    const stored = await loadStorageConfig();
    setValues({
      server: stored.server,
      client: stored.client,
      token: stored.token,
      pin: stored.pin,
      protocol: stored.hasValidSettings ? stored.protocol : HttpProtocol.Https,
      locale: stored.locale,
    });
    setHasValidSettings(stored.hasValidSettings);
    setLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  const updateValue = useCallback(<TKey extends keyof EditableStorageConfigValues>(key: TKey, value: EditableStorageConfigValues[TKey]) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  const applyImportedValues = useCallback((imported: Partial<EditableStorageConfigValues>) => {
    setValues((current) => ({ ...current, ...imported }));
  }, []);

  const save = useCallback(async (): Promise<SaveStorageConfigResult> => {
    const validation = isSettingsValid(values);
    if (!validation.ok) {
      setError(validation.error);
      return validation;
    }

    setCheckingAccess(true);
    setError(null);

    await saveProtocolPreference(values.protocol);
    if (Platform.OS !== 'web') {
      const access = await checkAccess(values, httpGet);
      if (!access.ok) {
        setCheckingAccess(false);
        setError('check-access-failed');
        return { ok: false, error: 'check-access-failed' };
      }
    }

    await saveSettingsPreferences({
      server: values.server.trim(),
      client: values.client,
      token: values.token,
      pin: values.pin,
      protocol: values.protocol,
    });
    await saveLocale(values.locale);
    await saveValidSettingsPreference(true);
    setHasValidSettings(true);
    setCheckingAccess(false);

    return { ok: true };
  }, [httpGet, values]);

  return useMemo(
    () => ({
      values,
      hasValidSettings,
      loading,
      checkingAccess,
      error,
      reload,
      updateValue,
      applyImportedValues,
      save,
    }),
    [applyImportedValues, checkingAccess, error, hasValidSettings, loading, reload, save, updateValue, values],
  );
}
