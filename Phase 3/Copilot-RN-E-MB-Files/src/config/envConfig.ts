/**
 * Development Environment Configuration
 * 
 * Configures CORS handling and validation bypass based on runtime environment
 * - Web (Expo/Browser) Dev: Enable CORS proxy + Validation bypass
 * - Web (Expo/Browser) Prod: Standard fetch (will fail on CORS)
 * - Native (iOS/Android): Standard fetch (no CORS issues)
 * 
 * Usage:
 * import { getHttpClient, isDevelopmentMode } from './envConfig';
 * 
 * const client = getHttpClient();
 * const result = await checkAccess('server', 'client', Protocol.HTTP, client);
 */

import { createFetchHttpClient } from '../services/storageConfigService';
import { createCorsAwareHttpClient, isWebEnvironment } from '../services/corsProxyService';
import { HttpClient } from '../services/storageConfigService';

/**
 * Environment detection
 */
export interface EnvironmentConfig {
  isWeb: boolean;
  isNative: boolean;
  isDevelopment: boolean;
  platform?: string;
  validationBypassEnabled: boolean;
}

/**
 * Check if running in development mode
 * Web + Development: true
 * Otherwise: false
 */
export function isDevelopmentMode(): boolean {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    return true;
  }
  return process.env.NODE_ENV === 'development';
}

/**
 * Get current environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  const isWeb = isWebEnvironment();
  const isDev = isDevelopmentMode();

  return {
    isWeb,
    isNative: !isWeb,
    isDevelopment: isDev,
    platform: isWeb ? 'web' : 'native',
    validationBypassEnabled: isWeb && isDev, // Bypass validation in web dev
  };
}

/**
 * Get appropriate HTTP client for current environment
 * 
 * Web + Development: CORS-aware client with proxy
 * Web + Production: Standard client (CORS errors will occur - not recommended)
 * Native: Standard client (no CORS issues)
 * 
 * @returns HttpClient instance
 */
export function getHttpClient(): HttpClient {
  const env = getEnvironmentConfig();

  if (env.isWeb && env.isDevelopment) {
    // Use CORS proxy for local web testing
    return createCorsAwareHttpClient();
  }

  // Standard fetch for native or production
  return createFetchHttpClient();
}

/**
 * Get diagnostic information about current setup
 * Useful for debugging CORS issues
 */
export function getDiagnostics(): Record<string, unknown> {
  const env = getEnvironmentConfig();

  return {
    environment: env.platform,
    isDevelopment: env.isDevelopment,
    isNative: env.isNative,
    isWeb: env.isWeb,
    nodeEnv: process.env.NODE_ENV,
    corsProxyActive: env.isWeb && env.isDevelopment,
    validationBypassEnabled: env.validationBypassEnabled,
    message: env.isWeb
      ? `Running in web environment - CORS proxy ${env.isDevelopment ? 'ACTIVE' : 'DISABLED'}`
      : 'Running on native device - no CORS handling needed',
  };
}
