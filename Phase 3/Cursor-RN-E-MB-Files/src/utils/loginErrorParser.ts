/** ERRPATH-006 — extract Error query parameter from response URL */

export function extractLoginErrorCode(responseUrl: string | undefined): string | null {
  if (!responseUrl) {
    return null;
  }
  try {
    const query = responseUrl.includes('?') ? responseUrl.slice(responseUrl.indexOf('?') + 1) : '';
    const params = new URLSearchParams(query);
    const error = params.get('Error') ?? params.get('error');
    return error && error.length > 0 ? error : null;
  } catch {
    return null;
  }
}

export function formatPeErrorMessage(errorCode: string): string {
  return `Anmeldung fehlgeschlagen (Fehlercode: ${errorCode}).`;
}
