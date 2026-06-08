import { HttpProtocol, protocolToScheme } from '../types/storageConfig';

export const MOBILE_BROWSER_PATH = '/PrestigeEnterprise.MobileBrowser';
export const DEFAULT_PAGE = 'Default.aspx';

export type HttpGet = (url: string, init?: RequestInit) => Promise<{ status: number }>;

export type CheckAccessResult =
  | { ok: true; url: string; status: number }
  | { ok: false; url: string | null; status: number | null; reason: 'invalid-url' | 'http-status' | 'network-error' };

function hasHttpScheme(server: string): boolean {
  return /^https?:\/\//i.test(server);
}

function encodeServer(server: string): string | null {
  try {
    return encodeURI(server);
  } catch {
    return null;
  }
}

export function buildCheckAccessUrl(server: string, client: string | null | undefined, protocol: HttpProtocol): string | null {
  const trimmedServer = server.trim();
  if (!trimmedServer) {
    return null;
  }

  const encodedServer = encodeServer(trimmedServer);
  if (!encodedServer) {
    return null;
  }

  const schemePrefix = hasHttpScheme(trimmedServer) ? '' : `${protocolToScheme(protocol)}://`;
  const encodedClient = encodeURIComponent(client ?? '');

  return `${schemePrefix}${encodedServer}${MOBILE_BROWSER_PATH}${encodedClient}/${DEFAULT_PAGE}`;
}

export function isOkHttpStatus(status: number): boolean {
  return status >= 200 && status <= 299;
}

export async function checkAccess(
  values: { server: string; client?: string | null; protocol: HttpProtocol },
  httpGet: HttpGet = fetch,
): Promise<CheckAccessResult> {
  const url = buildCheckAccessUrl(values.server, values.client, values.protocol);
  if (!url) {
    return { ok: false, url: null, status: null, reason: 'invalid-url' };
  }

  try {
    const response = await httpGet(url, { headers: { 'Cache-Control': 'no-cache' } });
    if (!isOkHttpStatus(response.status)) {
      return { ok: false, url, status: response.status, reason: 'http-status' };
    }

    return { ok: true, url, status: response.status };
  } catch {
    return { ok: false, url, status: null, reason: 'network-error' };
  }
}
