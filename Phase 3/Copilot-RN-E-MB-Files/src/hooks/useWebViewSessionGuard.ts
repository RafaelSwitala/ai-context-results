/**
 * useWebViewSessionGuard Hook
 * MAP-016: Monitor session validity and exit WebView on invalid login
 * Phase 1 Source IDs: STATE-005, STATE-010, SEC-002, BEH-010, BEH-011, BEH-022, BEH-028, BEH-029
 *
 * Watches valid-login flag from authentication storage
 * Triggers exit to Login when session becomes invalid
 * Checks on app foreground and resume events
 *
 * Behaviors:
 * - STATE-005: Login form/logout/foreground invalid → Login route
 * - STATE-010: Similar transitions on Android
 * - BEH-029: onResume finishes WebView if valid-login is false
 * - SEC-002: Valid-login checked on foreground/resume
 * - Security: Prevents unauthorized access if login is cleared externally
 */

import { useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

/**
 * Session guard hook
 *
 * @param hasValidLogin - Current authentication state from login/auth feature
 * @param onSessionExpired - Callback when session expires (should navigate to Login)
 * @returns Hook is ready; caller should handle navigation from callback
 *
 * Traceability: STATE-005, STATE-010, BEH-029, SEC-002
 *
 * Usage in WebViewScreen:
 * ```tsx
 * useWebViewSessionGuard(authState.hasValidLogin, () => {
 *   navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
 * });
 * ```
 */
export function useWebViewSessionGuard(
  hasValidLogin: boolean,
  onSessionExpired: () => void
): void {
  const appStateListener = useRef<any>(null);
  const previousValidLoginState = useRef<boolean | null>(null);

  /**
   * Check session validity on app state change
   * BEH-029: Android onResume checks and exits if invalid
   * iOS: applicationWillEnterForeground similar behavior
   */
  const checkSessionValidity = useCallback(() => {
    // If session just became invalid, trigger exit
    if (previousValidLoginState.current === true && hasValidLogin === false) {
      console.log('[WebView] Session expired on app resume');
      onSessionExpired();
      return;
    }

    // Continuous check: if invalid, always exit
    if (!hasValidLogin) {
      console.log('[WebView] Session is invalid; exiting WebView');
      onSessionExpired();
      return;
    }

    previousValidLoginState.current = hasValidLogin;
  }, [hasValidLogin, onSessionExpired]);

  /**
   * Listen for app foreground/resume events
   * BEH-010: iOS applicationWillEnterForeground
   * BEH-029: Android onResume
   */
  useEffect(() => {
    // Check validity on initial mount
    if (!hasValidLogin) {
      console.log('[WebView] Initial session check: invalid login');
      onSessionExpired();
    }

    // Subscribe to app state changes
    const subscription = AppState.addEventListener('change', (state: AppStateStatus) => {
      if (state === 'active') {
        // App came to foreground; check session
        console.debug('[WebView] App foreground; checking session validity');
        checkSessionValidity();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [hasValidLogin, checkSessionValidity, onSessionExpired]);

  // Update ref for state change detection
  useEffect(() => {
    previousValidLoginState.current = hasValidLogin;
  }, [hasValidLogin]);
}

/**
 * Hook to handle logout action in WebView
 * BEH-011: iOS toolbar logout
 * BEH-028: Android toolbar logout
 *
 * @param onLogout - Callback when logout button pressed
 * @returns Logout handler for toolbar/menu
 *
 * Caller should:
 * 1. Call onLogout callback (which clears auth storage)
 * 2. Session guard will detect hasValidLogin=false
 * 3. Session guard will call onSessionExpired
 * 4. App navigates to Login
 */
export function useWebViewLogout(
  onLogout: () => Promise<void>
): () => Promise<void> {
  return useCallback(async () => {
    try {
      console.log('[WebView] Logout requested');
      await onLogout();
      // Session guard will handle navigation
    } catch (e) {
      console.error('[WebView] Logout error:', e);
      // Still navigate to Login on error
    }
  }, [onLogout]);
}

/**
 * Hook to validate session on specific events
 *
 * @param hasValidLogin - Current auth state
 * @returns Function to manually validate session
 *
 * Used for:
 * - Response to specific page events
 * - Form detection indicating session expiry
 * - Explicit validation after navigation
 */
export function useSessionValidation(hasValidLogin: boolean): {
  isValid: boolean;
  validate: () => boolean;
} {
  const validate = useCallback(() => {
    if (!hasValidLogin) {
      console.warn('[WebView] Session validation failed: invalid login');
      return false;
    }
    return true;
  }, [hasValidLogin]);

  return {
    isValid: hasValidLogin,
    validate,
  };
}
