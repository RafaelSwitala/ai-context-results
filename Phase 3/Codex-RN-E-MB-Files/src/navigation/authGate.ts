import { AuthSnapshot, SettingsGateRoute } from '../types/auth';

export function resolveSettingsGate(snapshot: Pick<AuthSnapshot, 'hasValidSettings' | 'pin'>): SettingsGateRoute {
  if (snapshot.hasValidSettings) {
    return 'login';
  }

  return snapshot.pin ? 'pin' : 'settings';
}

export function resolveSettingsAccessRoute(snapshot: Pick<AuthSnapshot, 'pin'>): Exclude<SettingsGateRoute, 'login'> {
  return snapshot.pin ? 'pin' : 'settings';
}
