/** Password base64 encoding for login URL query param — BEH-005, API-001 */

export function encodePasswordForLoginUrl(password: string): string {
  if (password.length === 0) {
    return '';
  }
  return btoa(unescape(encodeURIComponent(password)));
}
