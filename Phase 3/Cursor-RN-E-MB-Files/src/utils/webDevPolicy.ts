import { Platform } from 'react-native';

/** True when the app runs in Expo web (browser). See docs/web-platform.md. */
export function isWebPlatform(): boolean {
  return Platform.OS === 'web';
}

/**
 * Browsers block cross-origin GET preflight to PRESTIGE servers (CORS).
 * Native iOS/Android apps are not subject to this restriction.
 * On web we skip reachability checks and persist settings/login URL locally for dev preview.
 */
export function shouldSkipRemotePreflightOnWeb(): boolean {
  return isWebPlatform();
}
