/**
 * useAuthState Hook
 * Manages authentication state and login transitions
 * Corresponds to Phase 1 mappings: MAP-014
 * Source IDs: STATE-001, STATE-002, STATE-003, STATE-004, BEH-001, UI-001, UI-002
 */

import { useEffect, useState, useCallback } from 'react';
import {
  readHasValidLogin,
  readUsername,
  readPassword,
  readPin,
  readHasValidSettings,
  writeHasValidLogin,
  loadAuthStorage,
  AuthStorageState,
} from '../services/authStorageService';

/**
 * Auth state interface
 * Represents current authentication and UI state
 */
export interface AuthState extends AuthStorageState {
  isLoading: boolean;
  error?: string;
}

/**
 * useAuthState Hook
 * Loads and tracks authentication state
 * Source: STATE-001, STATE-002, STATE-003, STATE-004
 * 
 * Transitions:
 * - Initial: hasValidLogin=false (app start)
 * - After login: hasValidLogin=true (BEH-009, BEH-020)
 * - On background: hasValidLogin=false (STATE-003, STATE-004)
 * 
 * @param autoRefresh - Whether to refresh state periodically (default: false)
 * @returns Auth state and setter function
 */
export function useAuthState(autoRefresh: boolean = false) {
  const [state, setState] = useState<AuthState>({
    username: null,
    password: null,
    hasValidLogin: false,
    hasValidSettings: false,
    pin: null,
    isLoading: true,
  });

  // Load initial state
  // Source: EP-001, EP-002 (screen mount)
  useEffect(() => {
    loadState();
  }, []);

  // Auto-refresh interval (optional)
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      loadState();
    }, 5000); // Every 5 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  /**
   * Load auth storage into state
   * Source: BEH-001, UI-001, UI-002 (prefill from storage)
   */
  const loadState = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));
      const authData = await loadAuthStorage();
      setState({
        ...authData,
        isLoading: false,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load auth state',
      }));
    }
  }, []);

  /**
   * Set login state to valid
   * Source: STATE-001, STATE-002 (after login success)
   */
  const setLoginValid = useCallback(async () => {
    try {
      await writeHasValidLogin(true);
      setState((prev) => ({
        ...prev,
        hasValidLogin: true,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to set login valid',
      }));
    }
  }, []);

  /**
   * Set login state to invalid (logout)
   * Source: STATE-003, STATE-004 (on background/logout)
   */
  const setLoginInvalid = useCallback(async () => {
    try {
      await writeHasValidLogin(false);
      setState((prev) => ({
        ...prev,
        hasValidLogin: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to set login invalid',
      }));
    }
  }, []);

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: undefined,
    }));
  }, []);

  return {
    state,
    loadState,
    setLoginValid,
    setLoginInvalid,
    clearError,
  };
}

/**
 * Check if current auth state indicates valid login
 * Helper for navigation decisions
 * Source: MAP-014, NAV-001, NAV-002, BEH-001
 * 
 * @param state - Auth state from useAuthState
 * @returns true if login is valid and app can proceed to webview
 */
export function isLoginValid(state: AuthState): boolean {
  return state.hasValidLogin && !!state.username && !!state.password;
}

/**
 * Check if settings gate should block login
 * Source: BEH-005, NAV-003, NAV-004 (gate decision)
 * 
 * @param state - Auth state
 * @returns true if settings are invalid and must be configured first
 */
export function shouldShowSettingsGate(state: AuthState): boolean {
  return !state.hasValidSettings;
}

/**
 * Check if PIN gate should block login
 * Source: BEH-006, NAV-005 (PIN entry flow)
 * 
 * @param state - Auth state
 * @returns true if PIN is set and must be validated before settings
 */
export function shouldShowPINGate(state: AuthState): boolean {
  return !!state.pin && state.pin.trim() !== '';
}
