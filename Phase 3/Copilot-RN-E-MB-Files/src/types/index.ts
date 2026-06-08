/**
 * storage-config Feature Types
 * Corresponds to Phase 1 mappings: MAP-010, MAP-021, MAP-008
 * Source IDs: STOR-001 through STOR-010, SEC-001 through SEC-003
 */

/**
 * Protocol Enum - MAP-021
 * Source: STOR-003, STOR-007, SEC-003
 * iOS: 0=HTTP, 1=HTTPS; defaults invalid to HTTPS
 * Android: 0=HTTP, 1=HTTPS, 2=HTTPS_WITHOUT_VALIDATION; ignores invalid save
 * RN: Supports all 3 levels with explicit handling
 */
export enum Protocol {
  HTTP = 0,
  HTTPS = 1,
  HTTPS_WITHOUT_VALIDATION = 2,
}

/**
 * QR Code Settings - MAP-005, MAP-023
 * Source: BEH-004, BEH-005, BEH-013, BEH-014, STOR-009
 * Parsed from QR code query parameters
 * Valid when: server present, p=MB, v=1
 */
export interface QRCodeSettings {
  // Required fields
  server: string;
  // Optional fields with defaults
  client?: string;
  token?: string;
  pin?: string;
  https?: boolean; // defaults to HTTPS (true) when missing
  // Android divergence: optional culture field
  culture?: string;
  // Internal validation fields
  p?: string; // Should be 'MB'
  v?: string; // Should be '1'
}

/**
 * Settings - Main configuration model
 * Source: STOR-001 through STOR-009, BEH-001, BEH-010
 * Stored across AsyncStorage (non-sensitive) and SecureStore (sensitive)
 */
export interface Settings {
  // Server configuration
  server: string;
  client: string;
  protocol: Protocol;
  // Credentials (stored in SecureStore)
  token?: string;
  pin?: string;
  // Validation flags
  hasValidSettings: boolean;
  hasValidLogin: boolean;
  // Android-specific optional fields
  locale?: string;
  configVersion?: string;
}

/**
 * Login Preferences - subset for URL building
 * Source: STOR-004, STOR-008, STOR-011
 * Used by loginUrlService for building login URLs
 */
export interface LoginPreferences {
  server: string;
  client: string;
  userName?: string;
  password?: string; // Stored in SecureStore
  protocol: Protocol;
  // Android-specific
  locale?: string;
  hasValidLogin: boolean;
  hasValidSettings: boolean;
}

/**
 * Storage Keys - Compatibility mapping
 * Source: STOR-001, STOR-005
 * iOS: mb_*_key prefix
 * Android: preference_*_key prefix
 * RN: Use new semantic names with mapping to legacy keys for migration
 */
const SERVER_KEY = 'storageConfig_server';
const CLIENT_KEY = 'storageConfig_client';
const PROTOCOL_KEY = 'storageConfig_protocol';
const TOKEN_KEY = 'storageConfig_token'; // SecureStore
const PIN_KEY = 'storageConfig_pin'; // SecureStore
const USERNAME_KEY = 'login_userName';
const PASSWORD_KEY = 'login_password'; // SecureStore
const HAS_VALID_SETTINGS_KEY = 'storageConfig_hasValidSettings';
const HAS_VALID_LOGIN_KEY = 'login_hasValidLogin';
const LOCALE_KEY = 'storageConfig_locale';
const CONFIG_VERSION_KEY = 'storageConfig_configVersion';

export const STORAGE_KEYS = {
  // Settings persistence
  SERVER: SERVER_KEY,
  CLIENT: CLIENT_KEY,
  PROTOCOL: PROTOCOL_KEY,
  TOKEN: TOKEN_KEY,
  PIN: PIN_KEY,
  
  // Login persistence
  USERNAME: USERNAME_KEY,
  PASSWORD: PASSWORD_KEY,
  
  // Validation flags
  HAS_VALID_SETTINGS: HAS_VALID_SETTINGS_KEY,
  HAS_VALID_LOGIN: HAS_VALID_LOGIN_KEY,
  
  // Android-specific
  LOCALE: LOCALE_KEY,
  CONFIG_VERSION: CONFIG_VERSION_KEY,
  
  // Legacy key mapping for migration
  LEGACY_MAPPING: {
    // iOS keys
    'mb_server_key': SERVER_KEY,
    'mb_client_key': CLIENT_KEY,
    'mb_httpProtocol_key': PROTOCOL_KEY,
    'mb_token_key': TOKEN_KEY,
    'mb_pin_key': PIN_KEY,
    'mb_userName_key': USERNAME_KEY,
    'mb_password_key': PASSWORD_KEY,
    'mb_valid_settings_key': HAS_VALID_SETTINGS_KEY,
    'mb_valid_login_key': HAS_VALID_LOGIN_KEY,
    // Android keys
    'preference_server_key': SERVER_KEY,
    'preference_client_key': CLIENT_KEY,
    'preference_protocol_key': PROTOCOL_KEY,
    'preference_token_key': TOKEN_KEY,
    'preference_pin_key': PIN_KEY,
    'preference_user_key': USERNAME_KEY,
    'preference_password_key': PASSWORD_KEY,
    'preference_valid_settings_key': HAS_VALID_SETTINGS_KEY,
    'preference_valid_login_key': HAS_VALID_LOGIN_KEY,
    'preference_sel_local_key': LOCALE_KEY,
    'preference_current_config_version_key': CONFIG_VERSION_KEY,
  },
} as const;

/**
 * Check Access Result - used by storageConfigService
 * Source: API-001, API-003, ERRPATH-002, ERRPATH-003, ERRPATH-006
 */
export interface CheckAccessResult {
  success: boolean;
  statusCode?: number;
  error?: string;
  timestamp: number;
  bypassedValidation?: string; // For web dev mode CORS bypass
}

/**
 * Config File Schema - Android divergence
 * Source: STOR-010, BEH-009, ERRPATH-008
 * Optional bundled config file for flavor-specific defaults
 */
export interface ConfigFile {
  version: string;
  protocol: Protocol;
  protocolVersion?: string;
  server: string;
  mandant: string;
  https?: boolean;
  token?: string;
  culture?: string;
  pin?: string;
}

/**
 * State Machine Types for Hooks
 * Source: STATE-001 through STATE-007
 */

export type SettingsState = 'idle' | 'loading' | 'validating' | 'checking' | 'saved' | 'error';

export interface SettingsValidationError {
  field: 'server' | 'pin' | 'checkAccess' | 'other';
  message: string;
}

export interface StorageConfigHookState {
  settings: Settings | null;
  state: SettingsState;
  error?: SettingsValidationError;
  isLoading: boolean;
  isDirty: boolean;
}

export type QRImportState = 'idle' | 'scanned' | 'validating' | 'applied' | 'error';

export interface StorageConfigQRHookState {
  qrSettings: QRCodeSettings | null;
  state: QRImportState;
  error?: string;
  isLoading: boolean;
}
