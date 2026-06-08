/**
 * Login Service
 * Handles login API calls and credential validation
 * Corresponds to Phase 1 mappings: MAP-012, MAP-013, MAP-016
 * Source IDs: API-001, API-002, API-003, BEH-001..BEH-011, ERRPATH-005..ERRPATH-006
 */

import { buildLoginUrl } from './loginUrlService';
import {
  readUsername,
  readPassword,
  readHasValidLogin,
  readHasValidSettings,
  readPin,
  saveLoginCredentials,
} from './authStorageService';
import { Settings, Protocol } from '../types';

/**
 * Login response interface
 * Source: BEH-007, BEH-008 (response parsing)
 */
export interface LoginResponse {
  success: boolean;
  errorCode?: string;
  statusCode?: number;
  errorMessage?: string;
}

/**
 * Preflight check result
 * Source: API-001 (iOS request validation path)
 */
export interface PreflightResult {
  isValid: boolean;
  statusCode?: number;
  errorCode?: string;
}

/**
 * Check if login credentials are stored and valid
 * Source: BEH-001, UI-001, UI-002 (prefill logic)
 * 
 * @returns true if valid login session exists
 */
export async function checkLoginStatus(): Promise<boolean> {
  try {
    return await readHasValidLogin();
  } catch {
    return false;
  }
}

/**
 * Check if all prerequisites for login are met
 * Source: BEH-002, BEH-003, BEH-004 (validation checks)
 * 
 * @param settings - Current settings
 * @returns true if prerequisites met
 */
export async function checkLoginPrerequisites(settings: Settings): Promise<boolean> {
  try {
    // Check settings validity
    // Source: BEH-004, BEH-016 (settings gate)
    const hasValidSettings = settings.hasValidSettings;
    if (!hasValidSettings) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Preflight check: HTTP GET to login URL to validate before WebView
 * Source: BEH-003 (iOS request-driven path with AF.request)
 * MAP-016 decision: configurable preflight, enabled by default
 * 
 * Note: This is an iOS-style approach. Android skips this in legacy code.
 * In RN, we make it optional but recommended for robustness.
 * 
 * @param settings - Settings object with server/client/protocol
 * @param username - Username to validate
 * @param password - Password to validate
 * @param enablePreflight - Whether to perform preflight (default: true)
 * @returns Preflight result with validation details
 */
export async function checkLoginPreflight(
  settings: Settings,
  username: string,
  password: string,
  enablePreflight: boolean = true
): Promise<PreflightResult> {
  if (!enablePreflight) {
    return { isValid: true };
  }

  try {
    // Build login URL with credentials
    // Source: BEH-005 (iOS UrlUtils.buildLoginUrl), BEH-017 (Android PreferencesUtils.buildLoginUrl)
    const url = buildLoginUrl(
      settings.server,
      settings.client,
      username,
      password,
      settings.protocol,
      settings.locale // Android-specific field
    );

    if (!url) {
      return { isValid: false, errorCode: 'URL_BUILD_FAILED' };
    }

    // Perform HTTP GET request
    // Source: API-001 (iOS AF.request), API-002 (Android implicit)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache', // Source: BEH-006 (iOS header)
      },
    });

    const statusCode = response.status;

    // Parse response
    // Source: BEH-007, BEH-008 (status code and error query param checks)
    if (statusCode === 200) {
      // Check for error code in query params (legacy behavior)
      const responseUrl = response.url;
      const urlObj = new URL(responseUrl);
      const errorCode = urlObj.searchParams.get('Error');

      if (errorCode) {
        return {
          isValid: false,
          statusCode: 200,
          errorCode,
        };
      }

      return { isValid: true, statusCode: 200 };
    } else {
      return {
        isValid: false,
        statusCode,
        errorCode: `HTTP_${statusCode}`,
      };
    }
  } catch (error) {
    return {
      isValid: false,
      errorCode: 'PREFLIGHT_EXCEPTION',
    };
  }
}

/**
 * Validate username and password are not empty
 * Source: BEH-001, BEH-002, BEH-003 (iOS validation)
 * Source: BEH-013..BEH-016, BEH-020 (Android validation + prefill)
 * 
 * @param username - Username string
 * @param password - Password string
 * @returns Validation result with error details
 */
export function validateCredentials(
  username: string | null,
  password: string | null
): { valid: boolean; errorCode?: string } {
  // Check username not empty
  // Source: BEH-002 (iOS), no explicit Android check
  if (!username || username.trim() === '') {
    return {
      valid: false,
      errorCode: 'ERRPATH-001', // iOS: usernameNotFound message
    };
  }

  // Check password not empty
  // Source: BEH-003 (iOS), no explicit Android check
  if (!password || password.trim() === '') {
    return {
      valid: false,
      errorCode: 'ERRPATH-002', // iOS: passwordNotFound message
    };
  }

  return { valid: true };
}

/**
 * Perform login with username and password
 * Source: EP-001, EP-002 (iOS/Android login button tap)
 * BEH-009, BEH-010, BEH-011 (iOS success path + persist + navigate)
 * BEH-020, BEH-021, BEH-022 (Android success path + persist + navigate)
 * 
 * Note: This function performs storage updates. Navigation is handled by caller.
 * 
 * @param settings - Settings object
 * @param username - Username to authenticate
 * @param password - Password to authenticate
 * @param enablePreflight - Whether to perform iOS-style preflight (default: true)
 * @returns Login result with success/error details
 */
export async function loginWithCredentials(
  settings: Settings,
  username: string,
  password: string,
  enablePreflight: boolean = true
): Promise<LoginResponse> {
  try {
    // 1. Validate credentials are non-empty
    // Source: BEH-001, BEH-002, BEH-003
    const validation = validateCredentials(username, password);
    if (!validation.valid) {
      return {
        success: false,
        errorCode: validation.errorCode,
        errorMessage: `Credential validation failed: ${validation.errorCode}`,
      };
    }

    // 2. Validate prerequisites (settings, etc.)
    // Source: BEH-004, BEH-016
    const prereqOk = await checkLoginPrerequisites(settings);
    if (!prereqOk) {
      return {
        success: false,
        errorCode: 'INVALID_SETTINGS',
        errorMessage: 'Settings are not valid',
      };
    }

    // 3. Optional preflight check (iOS style)
    // Source: BEH-003, MAP-016 decision
    if (enablePreflight) {
      const preflightResult = await checkLoginPreflight(
        settings,
        username,
        password,
        enablePreflight
      );

      if (!preflightResult.isValid) {
        return {
          success: false,
          statusCode: preflightResult.statusCode,
          errorCode: preflightResult.errorCode,
          errorMessage: `Preflight failed: ${preflightResult.errorCode}`,
        };
      }
    }

    // 4. Save credentials to storage
    // Source: BEH-009, BEH-020 (success path)
    await saveLoginCredentials(username, password);

    // 5. Return success
    // Navigation is delegated to caller (EP-001, EP-002 entry points)
    return {
      success: true,
      statusCode: 200,
    };
  } catch (error) {
    return {
      success: false,
      errorCode: 'LOGIN_EXCEPTION',
      errorMessage: error instanceof Error ? error.message : 'Unknown login error',
    };
  }
}

/**
 * Load stored credentials for UI prefill
 * Source: UI-001 (iOS viewWillAppear), UI-002 (Android onCreate)
 * 
 * @returns Username and password tuple
 */
export async function loadStoredCredentials(): Promise<[string | null, string | null]> {
  try {
    const [username, password] = await Promise.all([
      readUsername(),
      readPassword(),
    ]);
    return [username, password];
  } catch {
    return [null, null];
  }
}

/**
 * Check if PIN is set (for UI logic)
 * Source: BEH-006, UI-003, UI-004 (PIN screen presence)
 * 
 * @returns true if PIN is stored
 */
export async function hasPinSet(): Promise<boolean> {
  try {
    const pin = await readPin();
    return !!pin && pin.trim() !== '';
  } catch {
    return false;
  }
}
