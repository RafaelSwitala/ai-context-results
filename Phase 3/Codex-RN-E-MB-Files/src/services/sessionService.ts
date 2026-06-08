import { buildServiceBaseUrl } from './loginUrlService';
import { loadStorageConfig, saveValidLoginPreference } from './storageConfigStorage';

export async function getSessionToken(): Promise<string> {
  const values = await loadStorageConfig();
  return values.token;
}

export type SessionCleanup = (input: { token: string; userName: string; serviceBaseUrl: string }) => Promise<void>;

export async function logoutCurrentSession(cleanup?: SessionCleanup): Promise<void> {
  const values = await loadStorageConfig();
  await saveValidLoginPreference(false);

  if (!cleanup || !values.token || !values.userName) {
    return;
  }

  try {
    await cleanup({
      token: values.token,
      userName: values.userName,
      serviceBaseUrl: buildServiceBaseUrl(values),
    });
  } catch {
    // Legacy logout cleanup is best effort and must not block local session reset.
  }
}
