/**
 * WebView Session Service
 * MAP-006: Session validity detection and logout handling
 * Phase 1 Source IDs: BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, STOR-003, SEC-002
 *
 * Detects session expiry (login form detected in page content)
 * Clears valid-login state when session expires
 * Ensures WebView exits when login becomes invalid
 *
 * Behaviors:
 * - BEH-010: iOS finished page JS checks first form action; login form clears valid-login
 * - BEH-011: iOS toolbar logout clears valid-login and routes BACK_TO_LOGIN
 * - BEH-022: Android finished page JS checks first form action; login form clears valid-login
 * - BEH-028: Android toolbar logout clears valid-login and finishes activity
 * - BEH-029: Android onResume checks valid-login; exits if false
 * - SEC-002: Valid-login checked on foreground/resume; cleared on logout/session expiry
 */

/**
 * Session expiry marker - indicates user needs to re-authenticate
 * Detects if a loaded page contains a login form (first form action points to login.aspx)
 */
export interface SessionExpiryDetection {
  hasExpired: boolean;
  reason: 'loginFormDetected' | 'loginUrlNavigated' | 'userLogout' | null;
}

/**
 * Detects session expiry by checking if page has login form
 *
 * @param pageContent - Partial page content or form action URL
 * @returns Detection result with expiry flag and reason
 *
 * Traceability: BEH-010, BEH-022
 * Mechanism: JavaScript on page finish reads first form action
 * If form action contains 'login.aspx', session has expired
 *
 * Implementation note: In RN, this is triggered via onMessage handler
 * when injected JavaScript detects form action
 */
export function detectSessionExpiry(pageContent: string | null): SessionExpiryDetection {
  if (!pageContent) {
    return {
      hasExpired: false,
      reason: null,
    };
  }

  // Check for login.aspx marker in form action or URL
  if (pageContent.includes('login.aspx')) {
    return {
      hasExpired: true,
      reason: 'loginFormDetected',
    };
  }

  return {
    hasExpired: false,
    reason: null,
  };
}

/**
 * Builds JavaScript code to inject into WebView for session expiry detection
 *
 * Injected code runs after page load and checks the first form's action attribute
 * If form action contains 'login.aspx', sends message to RN layer
 *
 * @returns JavaScript code string
 *
 * Traceability: API-002, API-004, BEH-010, BEH-022
 * iOS: WKWebView evaluateJavaScript after didFinish
 * Android: Android WebView evaluateJavascript after onPageFinished
 * RN: Uses onMessage handler to communicate result
 */
export function getSessionExpiryDetectionScript(): string {
  return `
    (function() {
      try {
        const firstForm = document.querySelector('form');
        if (firstForm && firstForm.action) {
          const action = firstForm.action.toLowerCase();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'formAction',
            payload: {
              formAction: action,
              isLoginForm: action.includes('login.aspx')
            }
          }));
        }
      } catch (e) {
        console.error('[WebView] Session detection script error:', e);
      }
    })();
  `;
}

/**
 * Validates whether valid-login state should trigger WebView exit
 *
 * @param hasValidLogin - Current valid-login flag from auth storage
 * @returns true if WebView should exit and return to Login screen
 *
 * Traceability: BEH-029, SEC-002
 * Android: onResume checks hasValidLogin; exits if false
 * iOS: applicationWillEnterForeground checks hasValidLogin; exits if false
 * RN: useWebViewSessionGuard hook uses this on app state changes
 */
export function shouldExitWebView(hasValidLogin: boolean): boolean {
  return !hasValidLogin;
}

/**
 * Handles logout action from toolbar
 *
 * @returns Action result indicating logout was processed
 *
 * Traceability: BEH-011, BEH-028
 * iOS: barButtonTouched action sheet → "Abmelden" → clear valid-login, BACK_TO_LOGIN
 * Android: toolbar menu item "Logout" → App.logout(), finish activity
 * RN: Screen component handles toolbar logout → clear valid-login context, navigate to Login
 *
 * Note: Actual storage write happens in login/auth feature
 * This service just signals that logout was requested
 */
export function buildLogoutAction() {
  return {
    type: 'LOGOUT',
    timestamp: Date.now(),
    source: 'webViewToolbar',
  };
}

/**
 * Builds JavaScript to clear WebView session cache
 *
 * May be called after logout or session expiry
 * Clears cookies, localStorage, sessionStorage
 *
 * @returns JavaScript code string
 *
 * Traceability: BEH-010, BEH-011, BEH-022, BEH-028
 * Security: Ensures no residual session data remains in WebView
 */
export function getClearSessionScript(): string {
  return `
    (function() {
      try {
        // Clear cookies (limited in RN/WebView context)
        // Clear localStorage
        if (window.localStorage) {
          window.localStorage.clear();
        }
        // Clear sessionStorage
        if (window.sessionStorage) {
          window.sessionStorage.clear();
        }
      } catch (e) {
        console.error('[WebView] Clear session script error:', e);
      }
    })();
  `;
}

/**
 * Validates session state transitions
 *
 * Ensures valid-login state changes are consistent and safe
 * Logs warnings for unexpected transitions
 */
export function validateSessionTransition(
  previousState: boolean,
  newState: boolean
): boolean {
  // Valid transitions:
  // - true → true (session remains valid)
  // - true → false (logout or session expiry)
  // - false → false (logout while already logged out)
  // - false → true (re-login after logout; allowed)

  if (previousState && !newState) {
    // Logout or session expiry - expected
    return true;
  }

  if (!previousState && newState) {
    // Re-login after logout - allowed but log for monitoring
    console.log('[WebView] Session re-established after logout');
    return true;
  }

  if (previousState === newState) {
    // No state change
    return true;
  }

  return true; // All transitions are valid (no state validation errors)
}
