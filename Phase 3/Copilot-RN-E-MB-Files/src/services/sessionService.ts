/**
 * Session Service
 * Token and session management for API authentication
 * Corresponds to Phase 1 mappings: MAP-007, MAP-016, MAP-020
 * Source IDs: API-005, SEC-001, SEC-002, STATE-007, STOR-004, STOR-008
 */

import { getSecureValue, setSecureValue } from './storageConfigStorage';
import { clearLoginSession } from './authStorageService';
import { STORAGE_KEYS } from '../types';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Get stored token for API authentication
 * Source: API-005, SEC-001, SEC-002
 * Token is stored in SecureStore (encrypted)
 * Used as OAuth/API key for license and session APIs
 * 
 * @returns Token string or null if not stored
 */
export async function getToken(): Promise<string | null> {
  try {
    return await getSecureValue(STORAGE_KEYS.TOKEN);
  } catch {
    return null;
  }
}

/**
 * Store token for later API use
 * Source: SEC-001, SEC-002, STOR-002, STOR-006
 * Stored in SecureStore (encrypted), replacing plain text storage in legacy apps
 * 
 * @param token - Token string to store
 */
export async function setToken(token: string | null): Promise<void> {
  try {
    await setSecureValue(STORAGE_KEYS.TOKEN, token);
  } catch {
    // Silently fail if storage unavailable
  }
}

/**
 * Check if valid token is stored
 * Helper to check session validity
 * 
 * @returns true if token exists and is non-empty
 */
export async function hasValidToken(): Promise<boolean> {
  const token = await getToken();
  return !!(token && token.trim() !== '');
}

/**
 * Clear token (logout behavior)
 * Source: STATE-007 (app pause/logout clears sessions)
 */
export async function clearToken(): Promise<void> {
  await setToken(null);
}

/**
 * Logout: clear all session and login data
 * Source: STATE-003, STATE-004, BEH-007, EP-005, EP-006
 * Called when app pauses or user explicitly logs out
 * Clears token, login credentials and session flags
 */
export async function logout(): Promise<void> {
  try {
    await Promise.all([
      setToken(null),
      clearLoginSession(), // Clears username, password, hasValidLogin (MAP-006)
      // Settings are preserved (belong to settings feature)
    ]);
  } catch {
    // Continue even if cleanup fails
  }
}

/**
 * Delete remote user session (best-effort cleanup)
 * Source: API-003, MAP-013
 * Called during logout to invalidate server-side sessions
 * Does not block logout if request fails
 * 
 * @param token - Optional token for authentication; may be null in some flows
 */
export async function deleteRemoteSession(token?: string | null): Promise<void> {
  try {
    // Legacy behavior: best-effort cleanup
    // Would typically make DELETE /sessions/{user} call with authentication
    // For now, this is a placeholder as full API integration is out of scope for MAP-013
    // In production, implement with fetch/axios call to delete endpoint
    
    if (token && token.trim() !== '') {
      const headers = getAuthHeaders(token);
      // Example structure (not implemented in detail):
      // const response = await fetch(`${config.server}/api/sessions`, {
      //   method: 'DELETE',
      //   headers,
      // });
      // Ignore response; best-effort
    }
  } catch {
    // Silently ignore; logout succeeds even if remote cleanup fails
  }
}

/**
 * Get authorization header for API calls
 * Source: API-005, SEC-001, SEC-002
 * 
 * Formats token as Authorization header for HTTP client
 * Token used as OAuth Consumer Key / Bearer token
 * 
 * @param token - Token string
 * @returns Authorization header value or null if no token
 */
export function getAuthorizationHeader(token: string | null): string | null {
  if (!token || token.trim() === '') {
    return null;
  }

  // Token used as Bearer or direct auth depending on API requirements
  // For legacy compatibility, often used as custom header
  return token;
}

/**
 * Prepare HTTP headers for authenticated API calls
 * 
 * @param token - Token string
 * @returns Headers object with authorization if token present
 */
export function getAuthHeaders(token: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token && token.trim() !== '') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Session state interface for context/hooks
 * Used by useSession hook and login flow
 */
export interface SessionState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}

// ============= Lifecycle Management (MAP-021) =============

/**
 * Register app state change listener for background logout
 * Source: BEH-007, STATE-003, STATE-004, EP-005, EP-006, MAP-021
 * iOS: APP_STATE_CHANGE from `background` or `inactive` triggers logout
 * Android: Lifecycle.onPause triggers logout via App.logout
 * RN: Use AppState listener to emulate both platforms' behavior
 * 
 * When app transitions to background or inactive state,
 * login credentials are cleared (hasValidLogin = false)
 * 
 * @returns Cleanup function to unsubscribe from AppState changes
 */
export function registerAppStateListener(): () => void {
  let appState = AppState.currentState;

  const subscription = AppState.addEventListener('change', handleAppStateChange);

  async function handleAppStateChange(nextAppState: AppStateStatus) {
    // If app is backgrounded or inactive
    // Source: STATE-003 (iOS), STATE-004 (Android)
    if (
      (appState.match(/inactive|background/) && nextAppState === 'background') ||
      (appState.match(/active/) && nextAppState.match(/inactive|background/))
    ) {
      // Trigger logout on background
      await logout();
    }

    appState = nextAppState;
  }

  // Return cleanup function
  return () => {
    subscription.remove();
  };
}

/**
 * Initialize session management
 * Call this once at app startup to enable background logout
 * Source: MAP-021
 */
let appStateUnsubscribe: (() => void) | null = null;

export function initializeSessionManagement(): void {
  if (!appStateUnsubscribe) {
    appStateUnsubscribe = registerAppStateListener();
  }
}

/**
 * Cleanup session management
 * Call this when app terminates
 */
export function cleanupSessionManagement(): void {
  if (appStateUnsubscribe) {
    appStateUnsubscribe();
    appStateUnsubscribe = null;
  }
}

