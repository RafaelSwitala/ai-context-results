/**
 * useStorageConfig Hook
 * Main settings state management
 * Corresponds to Phase 1 mapping: MAP-017
 * Source IDs: STATE-001, STATE-002, STATE-005, BEH-001, BEH-010
 */

import { useEffect, useState } from 'react';
import {
  loadSettings,
  saveSettings,
  saveValidSettings,
  saveProtocolPreference,
} from '../services/storageConfigStorage';
import {
  checkAccess,
  areSettingsCompleteForCheck,
} from '../services/storageConfigService';
import {
  Settings,
  SettingsValidationError,
  StorageConfigHookState,
  Protocol,
} from '../types';
import { isValidPin, isValidServer } from '../utils/storageConfigQr';
import { getHttpClient } from '../config/envConfig';

/**
 * useStorageConfig Hook
 * Manages loading, validating, and saving settings
 * State machine: idle -> loading -> validating -> checking -> saved/error
 * 
 * @returns StorageConfigHookState with settings and control functions
 */
export function useStorageConfig() {
  const [state, setState] = useState<StorageConfigHookState>({
    settings: null,
    state: 'idle',
    isLoading: false,
    isDirty: false,
  });

  // Load settings on mount
  useEffect(() => {
    const load = async () => {
      setState((prev) => ({ ...prev, isLoading: true, state: 'loading' }));
      try {
        const loaded = await loadSettings();
        setState((prev) => ({
          ...prev,
          settings: loaded,
          state: 'idle',
          isLoading: false,
          isDirty: false,
        }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          state: 'error',
          error: {
            field: 'other',
            message: 'Failed to load settings',
          },
          isLoading: false,
        }));
      }
    };

    load();
  }, []);

  /**
   * Validate settings before save
   * Source: BEH-002, BEH-011
   * Checks: server non-empty, PIN format (optional or 4 digits)
   */
  const validateSettings = (settings: Settings): SettingsValidationError | null => {
    if (!isValidServer(settings.server)) {
      return {
        field: 'server',
        message: 'Server is required',
      };
    }

    if (!isValidPin(settings.pin)) {
      return {
        field: 'pin',
        message: 'PIN must be empty or exactly 4 digits',
      };
    }

    return null;
  };

  /**
   * Update a settings field (marks dirty)
   * Source: STATE-002
   */
  const updateSettings = (updates: Partial<Settings>) => {
    setState((prev) => {
      if (!prev.settings) {
        return prev;
      }

      return {
        ...prev,
        settings: { ...prev.settings, ...updates },
        isDirty: true,
        error: undefined, // Clear error on edit
      };
    });
  };

  /**
   * Save settings after validation
   * Source: BEH-003, BEH-012, STATE-002
   * Steps:
   * 1. Validate locally
   * 2. Build check-access URL
   * 3. Send GET request
   * 4. On 2xx response: persist settings and mark hasValidSettings=true
   * 5. On error: show error, don't persist
   * 
   * @param settingsToSave - Optional settings to save (defaults to state.settings if not provided)
   */
  const saveSettingsWithValidation = async (settingsToSave?: Settings) => {
    // Use provided settings or fallback to current state
    const settingsForValidation = settingsToSave || state.settings;
    
    if (!settingsForValidation) {
      return;
    }

    // Validate
    const validationError = validateSettings(settingsForValidation);
    if (validationError) {
      setState((prev) => ({
        ...prev,
        state: 'error',
        error: validationError,
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      state: 'validating',
      isLoading: true,
      error: undefined,
    }));

    // First save protocol (following Android pattern)
    await saveProtocolPreference(settingsForValidation.protocol);

    // Check access
    setState((prev) => ({ ...prev, state: 'checking' }));

    try {
      const httpClient = getHttpClient();
      const result = await checkAccess(
        settingsForValidation.server,
        settingsForValidation.client,
        settingsForValidation.protocol,
        httpClient
      );

      if (result.success) {
        // Settings are valid; persist them
        const finalSettings = {
          ...settingsForValidation,
          hasValidSettings: true,
        };

        await saveSettings(finalSettings);
        await saveValidSettings(true);

        setState((prev) => ({
          ...prev,
          settings: finalSettings,
          state: 'saved',
          isLoading: false,
          isDirty: false,
          error: undefined,
        }));

        // Reset to idle after a delay
        setTimeout(() => {
          setState((prev) => ({
            ...prev,
            state: 'idle',
          }));
        }, 1000);
      } else {
        setState((prev) => ({
          ...prev,
          state: 'error',
          isLoading: false,
          error: {
            field: 'checkAccess',
            message: `Settings check failed: ${result.error || 'Unknown error'}`,
          },
        }));
      }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        state: 'error',
        isLoading: false,
        error: {
          field: 'checkAccess',
          message: error instanceof Error ? error.message : 'Check access failed',
        },
      }));
    }
  };

  /**
   * Reload settings from storage (discard changes)
   */
  const reloadSettings = async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const loaded = await loadSettings();
      setState((prev) => ({
        ...prev,
        settings: loaded,
        state: 'idle',
        isLoading: false,
        isDirty: false,
        error: undefined,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        state: 'error',
        error: {
          field: 'other',
          message: 'Failed to reload settings',
        },
        isLoading: false,
      }));
    }
  };

  return {
    state,
    updateSettings,
    saveSettings: saveSettingsWithValidation,
    reloadSettings,
  };
}
