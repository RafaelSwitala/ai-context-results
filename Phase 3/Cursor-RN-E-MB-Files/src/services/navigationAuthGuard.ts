import { getValidLoginFlag, setValidLoginFlag } from './authStorageService';
import { logout } from './sessionService';

/** MAP-010 — BEH-006, BEH-007, BEH-022, BEH-024, BEH-026, SEC-001 */

export function requiresAuthGuard(hasValidLogin: boolean): boolean {
  return !hasValidLogin;
}

export async function resetToLoginIfInvalid(hasValidLogin?: boolean): Promise<boolean> {
  const valid = hasValidLogin ?? (await getValidLoginFlag());
  return requiresAuthGuard(valid);
}

export async function logoutAndReset(): Promise<void> {
  await logout();
  await setValidLoginFlag(false);
}
