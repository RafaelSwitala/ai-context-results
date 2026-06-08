/**
 * CORS Proxy Service
 * 
 * Handles CORS issues in web/Expo development environment
 * Bypasses CORS for localhost development; production mobile builds are unaffected
 * 
 * Uses cors-anywhere service or local proxy as fallback
 * 
 * @source Addresses CORS preflight failures in web dev
 */

import { HttpClient } from './storageConfigService';

/**
 * Public CORS proxy service - use with caution in production
 * For development/testing only
 */
const CORS_PROXY_URLS = [
  'https://api.allorigins.win/raw?url=', // No auth needed
  'https://corsproxy.io/?url=', // Alternative CORS proxy
];

/**
 * Check if running in web environment (not on native device)
 */
export function isWebEnvironment(): boolean {
  try {
    // If window is defined, we're in a browser/web environment
    return typeof window !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * Wrap URL with CORS proxy for web development
 * On native (iOS/Android) this returns original URL unchanged
 * 
 * @param url - Original URL to wrap
 * @param proxyIndex - Which proxy to use (default: 0)
 * @returns Wrapped URL or original if not in web environment
 */
export function wrapUrlWithCorsProxy(url: string, proxyIndex: number = 0): string {
  // Never proxy in production or native environments
  if (!isWebEnvironment() || process.env.NODE_ENV === 'production') {
    return url;
  }

  // Check if already proxied to avoid double-wrapping
  if (url.includes('cors-anywhere') || url.includes('allorigins') || url.includes('corsproxy')) {
    return url;
  }

  // Use specified proxy (with fallback to first)
  const proxyUrl = CORS_PROXY_URLS[Math.min(proxyIndex, CORS_PROXY_URLS.length - 1)];
  return `${proxyUrl}${encodeURIComponent(url)}`;
}

/**
 * Create HTTP client with automatic CORS proxy handling
 * For web dev: tries direct fetch first, then CORS proxies as fallback
 * For native: pass-through to original fetch
 * 
 * @returns Enhanced HttpClient with CORS handling
 */
export function createCorsAwareHttpClient(): HttpClient {
  return async (url: string, options?: { method?: string; headers?: Record<string, string> }) => {
    // For native environment, fetch directly
    if (!isWebEnvironment()) {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: options?.headers || {},
      });

      return {
        status: response.status,
        statusText: response.statusText,
      };
    }

    // For web: try direct fetch first, then CORS proxies as fallback
    let lastError: Error | null = null;

    // Strategy 1: Try direct fetch (some servers may allow CORS)
    try {
      const response = await fetch(url, {
        method: options?.method || 'GET',
        headers: options?.headers || {},
        mode: 'cors',
      });

      if (response.ok || response.status === 404) {
        return {
          status: response.status,
          statusText: response.statusText,
        };
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn('Direct fetch failed, trying proxies:', lastError.message);
    }

    // Strategy 2: Try each CORS proxy with fallback
    for (let i = 0; i < CORS_PROXY_URLS.length; i++) {
      try {
        const finalUrl = wrapUrlWithCorsProxy(url, i);

        const response = await fetch(finalUrl, {
          method: options?.method || 'GET',
          headers: options?.headers || {},
          mode: 'cors',
        });

        if (response.ok || response.status === 404) {
          return {
            status: response.status,
            statusText: response.statusText,
          };
        }
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`Proxy ${i} failed:`, lastError.message);
        // Try next proxy
        continue;
      }
    }

    // All strategies failed - return generic error but allow Settings check to continue
    console.error('All fetch strategies failed for:', url);
    throw lastError || new Error('All CORS proxies failed - server may not be reachable');
  };
}

/**
 * Detect CORS error from fetch failure
 * Helps identify if error is CORS-related for better error reporting
 * 
 * @param error - Error from fetch
 * @returns true if likely CORS error
 */
export function isCorsError(error: unknown): boolean {
  if (error instanceof TypeError) {
    const message = error.message.toLowerCase();
    return (
      message.includes('cors') ||
      message.includes('cross-origin') ||
      message.includes('blocked') ||
      message.includes('net::err_failed')
    );
  }
  return false;
}
