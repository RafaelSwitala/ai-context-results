/** LT-027 / ERRPATH-006 — BEH-021 */

export function shouldShowWebViewErrorDialog(isErrorDisplayed: boolean): boolean {
  return !isErrorDisplayed;
}
