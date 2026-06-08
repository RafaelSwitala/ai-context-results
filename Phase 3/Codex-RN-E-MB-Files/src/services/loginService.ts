import { LoginResult } from '../types/auth';
import { Platform } from 'react-native';
import { buildLoginUrl } from './loginUrlService';
import { HttpGet } from './storageConfigService';
import { loadStorageConfig, saveLoginPreferences, saveValidLoginPreference } from './storageConfigStorage';

type LoginOptions = {
  preflightEnabled?: boolean;
};

function extractErrorCode(responseUrl: string | undefined): string | undefined {
  if (!responseUrl) {
    return undefined;
  }

  try {
    const url = new URL(responseUrl);
    return url.searchParams.get('Error') ?? undefined;
  } catch {
    const marker = 'Error=';
    const index = responseUrl.indexOf(marker);
    return index >= 0 ? responseUrl.slice(index + marker.length) : undefined;
  }
}

export async function submitLogin(
  credentials: { userName: string; password: string },
  options: LoginOptions = { preflightEnabled: true },
  httpGet: HttpGet = fetch,
): Promise<LoginResult> {
  const userName = credentials.userName.trim();
  if (!userName) {
    return { ok: false, error: 'missing-username' };
  }

  if (!credentials.password) {
    return { ok: false, error: 'missing-password' };
  }

  const settings = await loadStorageConfig();
  if (!settings.hasValidSettings) {
    return { ok: false, error: 'invalid-settings' };
  }

  const url = buildLoginUrl({
    server: settings.server,
    client: settings.client,
    userName,
    password: credentials.password,
    protocol: settings.protocol,
    locale: settings.locale,
  });

  if (!url) {
    return { ok: false, error: 'invalid-url' };
  }

  if (options.preflightEnabled !== false && Platform.OS !== 'web') {
    try {
      const response = await httpGet(url, { headers: { 'Cache-Control': 'no-cache' } });
      if (response.status !== 200) {
        return { ok: false, error: 'preflight-failed' };
      }

      const responseUrl = 'url' in response && typeof response.url === 'string' ? response.url : undefined;
      const errorCode = extractErrorCode(responseUrl);
      if (errorCode) {
        return { ok: false, error: 'server-error', errorCode };
      }
    } catch {
      return { ok: false, error: 'preflight-failed' };
    }
  }

  await saveLoginPreferences(userName, credentials.password);
  await saveValidLoginPreference(true);

  return { ok: true, url };
}
