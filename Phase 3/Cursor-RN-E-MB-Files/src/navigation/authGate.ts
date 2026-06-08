import { getStoredPin, getValidSettingsFlag } from '../services/authStorageService';
import { SettingsGateRoute } from '../types/auth';

/** MAP-002, MAP-015 — EP-003, EP-004, BEH-005, NAV-003, NAV-004 */

export async function resolveSettingsGate(): Promise<SettingsGateRoute | null> {
  const hasValidSettings = await getValidSettingsFlag();
  if (hasValidSettings) {
    return null;
  }

  const pin = await getStoredPin();
  if (pin.length > 0) {
    return 'Pin';
  }
  return 'Settings';
}

export async function resolveSettingsButtonGate(): Promise<SettingsGateRoute> {
  const pin = await getStoredPin();
  return pin.length > 0 ? 'Pin' : 'Settings';
}
