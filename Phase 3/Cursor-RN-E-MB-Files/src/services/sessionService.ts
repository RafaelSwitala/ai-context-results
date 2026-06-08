import { getLoginPreferences, saveValidLoginPreference } from './storageConfigStorage';
import { getSecureItemAsync, setSecureItemAsync } from '../utils/secureStorage';

/** MAP-006, MAP-007, MAP-013 — API-005, SEC-001, SEC-002, BEH-007 */

const TOKEN_KEY = 'storage_config.token';

export async function getSessionToken(): Promise<string | null> {
  const token = await getSecureItemAsync(TOKEN_KEY);
  return token && token.length > 0 ? token : null;
}

export async function setSessionToken(token: string): Promise<void> {
  await setSecureItemAsync(TOKEN_KEY, token);
}

export async function logout(): Promise<void> {
  await saveValidLoginPreference(false);
  await killUserSessionsBestEffort();
}

async function killUserSessionsBestEffort(): Promise<void> {
  const prefs = await getLoginPreferences();
  const token = (await getSessionToken()) ?? prefs.token;
  if (token.length === 0 || prefs.userName.length === 0) {
    return;
  }

  try {
    const protocol = prefs.protocol === 0 ? 'http' : 'https';
    const server = prefs.server.replace(/\/$/, '');
    const client = prefs.client ?? '';
    const url = `${protocol}://${server}/prestigeenterprise.services${client}/api/Licenses`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    // best-effort cleanup; errors are non-blocking per MAP-013
  }
}
