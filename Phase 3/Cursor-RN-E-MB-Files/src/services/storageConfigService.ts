import { CheckAccessResult, HttpFetchFn } from '../types/storageConfig';
import { isOkHttpStatusCode } from '../utils/storageConfigValidation';
import { buildCheckAccessUrl } from '../utils/urlBuilder';
import { shouldSkipRemotePreflightOnWeb } from '../utils/webDevPolicy';

/** MAP-004, MAP-014 — API-001, API-003 */

export type StorageConfigServiceDeps = {
  fetchFn?: HttpFetchFn;
};

const defaultFetch: HttpFetchFn = async (url, init) => {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Cache-Control': 'no-cache',
        ...(init?.headers ?? {}),
      },
    });
    return { status: response.status };
  } catch {
    return { status: 0 };
  }
};

export async function checkAccess(
  server: string,
  client: string,
  protocol: number,
  deps: StorageConfigServiceDeps = {},
): Promise<CheckAccessResult> {
  const url = buildCheckAccessUrl(server, client, protocol);
  if (url == null) {
    return { ok: false, status: 0 };
  }

  if (shouldSkipRemotePreflightOnWeb()) {
    return { ok: true, status: 200 };
  }

  const fetchFn = deps.fetchFn ?? defaultFetch;
  const { status } = await fetchFn(url, { method: 'GET' });
  return { ok: isOkHttpStatusCode(status), status };
}

export { buildCheckAccessUrl };
