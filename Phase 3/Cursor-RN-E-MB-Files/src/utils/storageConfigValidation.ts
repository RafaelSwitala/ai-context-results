/** BEH-002, BEH-011, LT-002, LT-003 */

export function isPinValid(pin: string | null | undefined): boolean {
  if (pin == null || pin.length === 0) {
    return true;
  }
  return pin.length === 4;
}

export function isSettingsInputValid(server: string, pin: string): boolean {
  return server.trim().length > 0 && isPinValid(pin);
}

export function isOkHttpStatusCode(status: number): boolean {
  return status >= 200 && status < 300;
}

import { HttpProtocol } from '../types/storageConfig';

export function protocolUsesHttps(protocol: number): boolean {
  return protocol === HttpProtocol.Https || protocol === HttpProtocol.HttpsWithoutValidation;
}

/** MAP-021 — BEH-019, ERRPATH-009, SEC-003 */
export function protocolAllowsSslBypass(protocol: number): boolean {
  return protocol === HttpProtocol.HttpsWithoutValidation;
}
