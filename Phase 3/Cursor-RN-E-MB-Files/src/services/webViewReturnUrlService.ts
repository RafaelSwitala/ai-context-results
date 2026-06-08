/** MAP-005 — BEH-008, BEH-013, BEH-023, BEH-024, BEH-031, ERRPATH-008 */

import { deriveScannerReturnUrl } from './webViewNavigationService';

export { buildScanResultUrl } from './scannerNavigationService';

export function toBarcodeReturnUrl(url: string, isHttps: boolean): string | null {
  return deriveScannerReturnUrl(url, isHttps);
}
