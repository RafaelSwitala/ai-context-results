/** MAP-006 — BEH-010, BEH-011, BEH-022, BEH-028, BEH-029, STOR-001, STOR-003, SEC-002 */

import { getValidLoginFlag } from './authStorageService';
import { logoutAndReset, resetToLoginIfInvalid } from './navigationAuthGuard';

export async function handleSessionExpired(): Promise<void> {
  await logoutAndReset();
}

export async function logoutFromWebView(): Promise<void> {
  await logoutAndReset();
}

export async function ensureValidLogin(): Promise<boolean> {
  return getValidLoginFlag();
}

export async function shouldExitWebViewOnInvalidLogin(): Promise<boolean> {
  return resetToLoginIfInvalid();
}
