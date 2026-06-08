/**
 * useStorageConfigQrImport Hook
 * QR code import state management
 * Corresponds to Phase 1 mapping: MAP-018
 * Source IDs: STATE-003, STATE-006, BEH-006, BEH-015
 */

import { useState } from 'react';
import {
  parseStorageConfigQr,
  normalizeScannedQr,
  isValidQrSettings,
} from '../utils/storageConfigQr';
import { QRCodeSettings, StorageConfigQRHookState } from '../types';

/**
 * useStorageConfigQrImport Hook
 * Manages QR code scanning and validation
 * State machine: idle -> scanned -> validating -> applied/error
 * 
 * QR data is NOT persisted to storage until user saves in SettingsScreen
 * 
 * @returns StorageConfigQRHookState with QR data and control functions
 */
export function useStorageConfigQrImport() {
  const [state, setState] = useState<StorageConfigQRHookState>({
    qrSettings: null,
    state: 'idle',
    isLoading: false,
  });

  /**
   * Process scanned QR code text
   * Source: BEH-006, BEH-015, ERRPATH-004, ERRPATH-007
   * 
   * Steps:
   * 1. Normalize scanned text (prepend http://localhost? if needed)
   * 2. Parse as query string
   * 3. Validate (server, p=MB, v=1)
   * 4. Store in state but don't persist yet
   * 
   * @param scannedText - Raw scanned QR code text
   * @returns true if valid and applied
   */
  const processScannedQr = (scannedText: string): boolean => {
    setState((prev) => ({
      ...prev,
      state: 'validating',
      isLoading: true,
      error: undefined,
    }));

    try {
      // Normalize
      const normalized = normalizeScannedQr(scannedText);
      if (!normalized) {
        setState((prev) => ({
          ...prev,
          state: 'error',
          isLoading: false,
          error: 'Invalid QR code format',
        }));
        return false;
      }

      // Parse
      const qrSettings = parseStorageConfigQr(scannedText);
      if (!qrSettings) {
        setState((prev) => ({
          ...prev,
          state: 'error',
          isLoading: false,
          error: 'Failed to parse QR code',
        }));
        return false;
      }

      // Validate
      if (!isValidQrSettings(qrSettings)) {
        setState((prev) => ({
          ...prev,
          state: 'error',
          isLoading: false,
          error: 'QR code is missing required fields (server, p=MB, v=1)',
        }));
        return false;
      }

      // Valid; store in state (not persisted yet)
      setState((prev) => ({
        ...prev,
        qrSettings,
        state: 'applied',
        isLoading: false,
        error: undefined,
      }));

      return true;
    } catch (error) {
      setState((prev) => ({
        ...prev,
        state: 'error',
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }));
      return false;
    }
  };

  /**
   * Clear QR import state (user dismisses QR)
   */
  const clearQrImport = () => {
    setState({
      qrSettings: null,
      state: 'idle',
      isLoading: false,
    });
  };

  /**
   * Get current QR settings without persisting
   * Used by SettingsScreen to populate controls
   */
  const getQrSettings = (): QRCodeSettings | null => {
    return state.qrSettings;
  };

  return {
    state,
    processScannedQr,
    clearQrImport,
    getQrSettings,
  };
}
