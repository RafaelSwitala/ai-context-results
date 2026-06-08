import { readAuthSnapshot } from './authStorageService';
import { logoutCurrentSession, SessionCleanup } from './sessionService';

export async function isNavigationAuthenticated(): Promise<boolean> {
  const snapshot = await readAuthSnapshot();
  return snapshot.hasValidLogin;
}

export async function resetToLoginIfInvalid(onReset: () => void): Promise<boolean> {
  const isAuthenticated = await isNavigationAuthenticated();
  if (!isAuthenticated) {
    onReset();
  }

  return !isAuthenticated;
}

export async function logoutAndReset(onReset: () => void, cleanup?: SessionCleanup): Promise<void> {
  await logoutCurrentSession(cleanup);
  onReset();
}
