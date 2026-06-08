/** BEH-006 — LoginHttpLogicTest.loginHttp_blocksDuplicateRequestWhileInFlight */

export function shouldStartLoginRequest(requestInFlight: boolean): boolean {
  return !requestInFlight;
}

export function isLoginHttpSuccess(statusCode: number, errorCodeFromUrl: string | null | undefined): boolean {
  if (statusCode !== 200) {
    return false;
  }
  return errorCodeFromUrl == null || errorCodeFromUrl.length === 0;
}
