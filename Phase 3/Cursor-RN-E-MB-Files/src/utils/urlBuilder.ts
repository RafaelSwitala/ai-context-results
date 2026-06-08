import { URL_PATH, DEFAULT_PAGE } from '../types/appConstants';
import { protocolUsesHttps } from './storageConfigValidation';

/** MAP-014, MAP-015, MAP-024 — API-002, API-004 */

function encodeHost(server: string): string | null {
  if (server.includes('\0')) {
    return null;
  }
  try {
    return encodeURIComponent(decodeURIComponent(server));
  } catch {
    return null;
  }
}

function encodePathSegment(value: string): string | null {
  try {
    return encodeURIComponent(decodeURIComponent(value));
  } catch {
    return null;
  }
}

function serverHasScheme(server: string): boolean {
  const lower = server.toLowerCase();
  return lower.startsWith('https://') || lower.startsWith('http://');
}

export function buildCheckAccessUrl(
  server: string,
  client: string,
  protocol: number,
): string | null {
  if (server.trim().length === 0) {
    return null;
  }
  const encodedClient = encodePathSegment(client ?? '');
  if (encodedClient == null) {
    return null;
  }

  const isHttps = protocolUsesHttps(protocol);
  let base: string;

  if (serverHasScheme(server)) {
    base = server;
  } else {
    const encodedServer = encodeHost(server);
    if (encodedServer == null) {
      return null;
    }
    base = `${isHttps ? 'https' : 'http'}://${encodedServer}`;
  }

  return `${base}${URL_PATH}${encodedClient}/${DEFAULT_PAGE}`;
}

export function buildLoginUrl(
  server: string,
  client: string,
  user: string,
  encodedPassword: string,
  protocol: number,
  locale: string | null,
): string | null {
  const baseUrl = buildCheckAccessUrl(server, client, protocol);
  if (baseUrl == null) {
    return null;
  }

  const encodedUser = encodePathSegment(user);
  if (encodedUser == null) {
    return null;
  }

  let url = `${baseUrl}?user=${encodedUser}`;
  if (encodedPassword.length > 0) {
    url += `&password=${encodedPassword}`;
  }
  url += '&App=MobileBrowser';

  if (locale) {
    url += `&Culture=${encodeURIComponent(locale)}`;
  }

  return url;
}
