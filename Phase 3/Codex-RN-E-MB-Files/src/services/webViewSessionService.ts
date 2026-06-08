import { setHasValidLogin } from './authStorageService';
import {
  isNavigationAuthenticated,
  logoutAndReset,
  resetToLoginIfInvalid,
} from './navigationAuthGuard';
import { SessionCleanup } from './sessionService';

export async function ensureValidLogin(onInvalid: () => void): Promise<boolean> {
  const didReset = await resetToLoginIfInvalid(onInvalid);
  return !didReset;
}

export async function handleSessionExpired(onReset: () => void): Promise<void> {
  await setHasValidLogin(false);
  onReset();
}

export async function logoutFromWebView(onReset: () => void, cleanup?: SessionCleanup): Promise<void> {
  await logoutAndReset(onReset, cleanup);
}

export { isNavigationAuthenticated };
