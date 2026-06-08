import { normalizeScannedQr } from '../utils/storageConfigQr';
import { SCAN_RESULT_QUERY } from '../navigation/navigation.constants';

/** MAP-011 — BEH-010, BEH-011, BEH-019, BEH-025, ERRPATH-001, ERRPATH-007 */

export function normalizeQrPayload(raw: string): string {
  return normalizeScannedQr(raw);
}

export function buildScanResultUrl(returnUrl: string, code: string | null): string {
  if (code == null) {
    return returnUrl;
  }
  return `${returnUrl}${SCAN_RESULT_QUERY}${code}`;
}

export function shouldIgnoreDuplicateScan(previous: string, current: string): boolean {
  return previous === current;
}
