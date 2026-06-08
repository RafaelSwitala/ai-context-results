/**
 * Auth Gate Navigation Logic
 * Decides routing between Login, Settings, PIN, and WebView screens
 * Corresponds to Phase 1 mappings: MAP-002, MAP-015
 * Source IDs: EP-003, EP-004, BEH-005, NAV-003, NAV-004, STATE-001
 */

import { AuthState } from '../hooks/useAuthState';

/**
 * Auth gate decision result
 * Determines which screen should be shown
 */
export enum AuthGateDest {
  /**
   * Settings are not configured; show Settings screen
   * Source: BEH-005 (EP-003, EP-004 routing)
   * NAV-003 (iOS), NAV-005 (Android)
   */
  SETTINGS = 'SETTINGS',
  
  /**
   * PIN is set and must be validated before settings access
   * Source: BEH-006, NAV-005 (iOS PIN gate)
   * Android also supports PIN gate
   */
  PIN = 'PIN',
  
  /**
   * Settings valid and no PIN, or PIN already validated
   * Proceed to login or webview
   * Source: STATE-001 final state
   */
  WEBVIEW = 'WEBVIEW',
  
  /**
   * Settings valid and password stored; user already logged in
   * Bypass login screen and go directly to webview
   */
  WEBVIEW_DIRECT = 'WEBVIEW_DIRECT',
}

/**
 * Resolve settings gate decision
 * Source: MAP-002, EP-003, EP-004, BEH-005, STATE-001
 * 
 * Decision logic (from Phase 1):
 * 1. If settings invalid: navigate to Settings (NAV-003, NAV-005)
 * 2. If settings valid + PIN exists: navigate to PIN (NAV-005, iOS + Android)
 * 3. If settings valid + no PIN + has login: navigate to WebView directly
 * 4. If settings valid + no PIN + no login: navigate to Login screen
 * 
 * @param state - Current auth state
 * @returns Destination screen
 */
export function resolveSettingsGate(state: AuthState): AuthGateDest {
  // 1. Check if settings are valid
  // Source: BEH-005 (iOS viewDidLoad), BEH-016 (Android onCreate)
  if (!state.hasValidSettings) {
    // Settings invalid: must configure first
    return AuthGateDest.SETTINGS;
  }

  // 2. Check if PIN is set
  // Source: BEH-006, UI-003, UI-004 (PIN screen presence)
  if (state.pin) {
    // PIN exists: must validate before settings access
    return AuthGateDest.PIN;
  }

  // 3. Check if already logged in
  // Source: STATE-001, STATE-002 (hasValidLogin flag)
  if (state.hasValidLogin && state.username && state.password) {
    // Already logged in: go directly to webview
    return AuthGateDest.WEBVIEW_DIRECT;
  }

  // 4. Default: show login screen
  // Source: EP-001, EP-002 (normal entry point)
  return AuthGateDest.WEBVIEW;
}

/**
 * Determine if PIN validation should happen before settings access
 * Source: BEH-006, NAV-005
 * 
 * iOS behavior: PIN is checked before Settings access if stored
 * Android behavior: PIN is also checked before Settings
 * RN: Unified behavior - PIN gate always required if set
 * 
 * @param pin - Stored PIN string or null
 * @returns true if PIN validation is required
 */
export function shouldRequirePin(pin: string | null): boolean {
  return !!pin && pin.trim() !== '';
}

/**
 * Validate entered PIN against stored PIN
 * Source: BEH-012, BEH-024 (PIN exact match)
 * UI-003 (iOS error display), UI-004 (Android error display)
 * 
 * @param enteredPin - PIN entered by user
 * @param storedPin - PIN from storage
 * @returns true if PIN matches
 */
export function validatePin(enteredPin: string, storedPin: string | null): boolean {
  if (!storedPin) {
    return false;
  }

  // Exact match required
  // Source: BEH-012, BEH-024
  return enteredPin === storedPin;
}

/**
 * Settings gate state for context
 * Tracks which gate screen should be shown
 */
export interface SettingsGateState {
  destination: AuthGateDest;
  requiresPin: boolean;
  errorMessage?: string;
}

/**
 * Initialize settings gate state from auth state
 * Called on app startup or auth state changes
 * 
 * @param authState - Current auth state
 * @returns Gate state for UI routing
 */
export function initializeSettingsGate(authState: AuthState): SettingsGateState {
  const destination = resolveSettingsGate(authState);
  const requiresPin = shouldRequirePin(authState.pin);

  return {
    destination,
    requiresPin,
  };
}
