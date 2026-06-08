/**
 * useNavigationAuthGuard Hook
 * 
 * Monitors authentication state and triggers navigation resets on logout.
 * 
 * Corresponds to Phase 1 mapping: MAP-018
 * Source IDs: STATE-004, STATE-010, SEC-001
 * 
 * @file hooks/useNavigationAuthGuard.ts
 */

import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthState } from './useAuthState';
import { ROUTE_NAMES } from '../navigation/navigation.constants';

/**
 * useNavigationAuthGuard Hook
 * 
 * Monitors auth state and performs route reset when:
 * 1. User logs out (valid-login becomes false)
 * 2. Session expires during WebView/scanner operation
 * 3. Error condition requires return to Login
 * 
 * Corresponds to:
 * - iOS: BEH-007 (applicationWillEnterForeground), BEH-006 (logout)
 * - Android: BEH-024 (WebView onResume), BEH-026 (BarcodeScannerActivity onResume)
 * 
 * @param screenName - The screen that is protected (e.g., 'WebView', 'BarcodeScannerScreen')
 * @returns Object with auth state and control flags
 * 
 * Source IDs: STATE-004, STATE-010, SEC-001
 */
export function useNavigationAuthGuard(screenName?: string) {
  const navigation = useNavigation();
  const { isValidLogin, isLoading } = useAuthState();
  const previousValidLoginRef = useRef<boolean | null>(null);
  const resetPendingRef = useRef(false);

  // Monitor for logout events and trigger reset
  useEffect(() => {
    // Skip if still loading or reset already pending
    if (isLoading || resetPendingRef.current) {
      previousValidLoginRef.current = isValidLogin;
      return;
    }

    // First run initialization
    if (previousValidLoginRef.current === null) {
      previousValidLoginRef.current = isValidLogin;
      return;
    }

    // Detect logout: valid-login changed from true to false
    const wasValid = previousValidLoginRef.current;
    const isNowValid = isValidLogin;

    if (wasValid && !isNowValid) {
      // Logout detected - trigger reset
      console.log(
        `[${screenName || 'UnknownScreen'}] Logout detected, resetting to Login`,
      );
      resetPendingRef.current = true;

      navigation.reset({
        index: 0,
        routes: [{ name: ROUTE_NAMES.LOGIN }],
      });

      // Reset the pending flag after navigation completes
      setTimeout(() => {
        resetPendingRef.current = false;
      }, 100);
    }

    previousValidLoginRef.current = isNowValid;
  }, [isValidLogin, isLoading, navigation, screenName]);

  return {
    isValid: isValidLogin,
    isLoading,
    screenName,
  };
}

/**
 * Hook for WebView-specific auth guard behavior
 * 
 * Adds WebView-specific handling:
 * - Reload URL on foreground if still valid
 * - Return to Login on invalid auth
 * 
 * Corresponds to:
 * - iOS: BEH-007 (applicationWillEnterForeground)
 * - Android: BEH-024 (onResume)
 * 
 * @param onInvalidAuth - Callback when auth becomes invalid
 * @returns Auth guard state
 * 
 * Source IDs: BEH-007, BEH-024, STATE-004
 */
export function useWebViewAuthGuard(
  onInvalidAuth?: () => void,
): {
  isValid: boolean;
  isLoading: boolean;
} {
  const guardState = useNavigationAuthGuard('WebViewScreen');
  const { isValid, isLoading } = guardState;

  useEffect(() => {
    if (!isLoading && !isValid && onInvalidAuth) {
      onInvalidAuth();
    }
  }, [isValid, isLoading, onInvalidAuth]);

  return { isValid, isLoading };
}

/**
 * Hook for Scanner-specific auth guard behavior
 * 
 * Adds scanner-specific handling:
 * - Exit scanner on invalid auth
 * - Reset to Login
 * 
 * Corresponds to:
 * - iOS: No explicit resume check (unwind segue handles)
 * - Android: BEH-026 (BarcodeScannerActivity.onResume)
 * 
 * @param onInvalidAuth - Callback when auth becomes invalid
 * @returns Auth guard state
 * 
 * Source IDs: BEH-026, STATE-010
 */
export function useScannerAuthGuard(
  onInvalidAuth?: () => void,
): {
  isValid: boolean;
  isLoading: boolean;
} {
  const guardState = useNavigationAuthGuard('ScannerScreen');
  const { isValid, isLoading } = guardState;

  useEffect(() => {
    if (!isLoading && !isValid && onInvalidAuth) {
      onInvalidAuth();
    }
  }, [isValid, isLoading, onInvalidAuth]);

  return { isValid, isLoading };
}
