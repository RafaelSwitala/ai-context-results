/**
 * Navigation Auth Guard Service
 * 
 * Centralized logic for authorization-based route resets and logout handling.
 * 
 * Corresponds to Phase 1 mapping: MAP-010
 * Source IDs: BEH-006, BEH-007, BEH-022, BEH-023, BEH-024, BEH-026, SEC-001
 * 
 * @file services/navigationAuthGuard.ts
 */

import { NavigationProp } from '@react-navigation/native';
import { useEffect } from 'react';
import { useAuthState } from '../hooks/useAuthState';
import { ROUTE_NAMES } from '../navigation/navigation.constants';

/**
 * Authorization Guard Result
 * 
 * Describes the action to take based on authentication state.
 */
export type AuthGuardAction =
  | { action: 'ALLOW'; reason: string }
  | { action: 'RESET_TO_LOGIN'; reason: string }
  | { action: 'LOGOUT_AND_RETURN'; reason: string }
  | { action: 'FINISH'; reason: string };

/**
 * Checks if valid login state allows WebView/Scanner access
 * 
 * Corresponds to:
 * - iOS: BEH-007 (foreground check), BEH-006 (logout flow)
 * - Android: BEH-024 (resume check), BEH-023 (logout), BEH-026 (scanner resume)
 * 
 * @param isValidLogin - Current valid-login flag from storage
 * @param currentRoute - The route that requires authorization
 * @returns AuthGuardAction indicating whether to allow, reset or finish
 * 
 * Source IDs: BEH-006, BEH-007, BEH-022, BEH-024, BEH-026, SEC-001
 */
export function evaluateAuthGuard(
  isValidLogin: boolean,
  currentRoute?: string,
): AuthGuardAction {
  if (!isValidLogin) {
    // Invalid login state detected on protected route
    if (currentRoute === ROUTE_NAMES.WEB_VIEW) {
      return {
        action: 'RESET_TO_LOGIN',
        reason: 'WebView requires valid login; session expired or user logged out',
      };
    }

    if (currentRoute === ROUTE_NAMES.BARCODE_SCANNER) {
      return {
        action: 'RESET_TO_LOGIN',
        reason: 'Barcode scanner requires valid login; session expired',
      };
    }

    return {
      action: 'RESET_TO_LOGIN',
      reason: 'Protected route requires valid login state',
    };
  }

  return {
    action: 'ALLOW',
    reason: 'Valid login state confirmed',
  };
}

/**
 * Performs logout and stack reset to Login route
 * 
 * Corresponds to:
 * - iOS: BEH-006 (barButtonTouched -> BACK_TO_LOGIN)
 * - Android: BEH-023 (toolbar logout -> finish + LoginActivity start)
 * 
 * Clears valid-login flag and resets navigation stack.
 * 
 * @param navigation - React Navigation object
 * @param onLogout - Optional callback to clear login state
 * 
 * Source IDs: BEH-006, BEH-023, SEC-001
 */
export async function logoutAndResetNavigation(
  navigation: NavigationProp<any>,
  onLogout?: () => Promise<void>,
): Promise<void> {
  try {
    // Clear login state
    if (onLogout) {
      await onLogout();
    }

    // Reset navigation stack to Login
    // commonActions.reset creates a new stack with Login as the only route
    // This prevents back navigation to WebView or scanner
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_NAMES.LOGIN }],
    });
  } catch (error) {
    console.error('Logout navigation error:', error);
    // Force navigate to Login even if logout callback fails
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_NAMES.LOGIN }],
    });
  }
}

/**
 * Resets navigation to Login if authentication becomes invalid
 * 
 * Checks current auth state and conditionally resets stack.
 * Used in foreground/resume handlers and error recovery paths.
 * 
 * @param navigation - React Navigation object
 * @param isValidLogin - Current valid-login flag
 * @param currentRoute - Route where check occurs
 * @returns true if reset was performed
 * 
 * Source IDs: BEH-007, BEH-024, BEH-026, STATE-004, STATE-010, SEC-001
 */
export function resetToLoginIfInvalid(
  navigation: NavigationProp<any>,
  isValidLogin: boolean,
  currentRoute?: string,
): boolean {
  const guard = evaluateAuthGuard(isValidLogin, currentRoute);

  if (guard.action === 'RESET_TO_LOGIN') {
    console.log('Auth guard trigger:', guard.reason);
    navigation.reset({
      index: 0,
      routes: [{ name: ROUTE_NAMES.LOGIN }],
    });
    return true;
  }

  return false;
}

/**
 * Hook to monitor auth state and reset on logout
 * 
 * Wraps useAuthState and automatically triggers reset when
 * valid-login becomes false during active route.
 * 
 * Usage:
 * ```
 * const { isValid } = useNavigationAuthGuard(navigation, 'WebView');
 * ```
 * 
 * @param navigation - React Navigation object
 * @param currentRoute - Route currently displayed
 * @returns Auth state object with isValid flag
 * 
 * Source IDs: STATE-004, STATE-010, SEC-001
 */
export function useNavigationAuthGuard(
  navigation: NavigationProp<any>,
  currentRoute: string,
): { isValid: boolean; isLoading: boolean } {
  const { isValidLogin, isLoading } = useAuthState();

  // Watch for auth state changes
  useEffect(() => {
    resetToLoginIfInvalid(navigation, isValidLogin, currentRoute);
  }, [isValidLogin, navigation, currentRoute]);

  return {
    isValid: isValidLogin,
    isLoading,
  };
}

/**
 * Evaluates if a scanner should exit on invalid auth
 * 
 * Corresponds to Android BarcodeScannerActivity.onResume behavior:
 * If valid-login becomes false during scanner operation, finish and return to Login.
 * 
 * iOS naturally dismisses scanner via unwind segue, so this is primarily Android behavior.
 * 
 * @param isValidLogin - Current valid-login flag
 * @returns true if scanner should exit
 * 
 * Source IDs: BEH-026, STATE-010, MAP-021
 */
export function shouldExitScannerOnInvalidAuth(isValidLogin: boolean): boolean {
  return !isValidLogin;
}
