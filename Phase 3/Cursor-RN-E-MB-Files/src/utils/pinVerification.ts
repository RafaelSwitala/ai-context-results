/** BEH-006, BEH-012 — LoginPinGateTest, LoginPinValidationTests */

export function verifyPinMatch(entered: string, stored: string): boolean {
  return entered === stored;
}

export function isPinGateRequired(storedPin: string): boolean {
  return storedPin.length > 0;
}
