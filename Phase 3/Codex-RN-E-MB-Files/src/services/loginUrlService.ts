import { HttpProtocol, StorageConfigValues, protocolToScheme } from '../types/storageConfig';
import { DEFAULT_PAGE, MOBILE_BROWSER_PATH, buildCheckAccessUrl } from './storageConfigService';
import { loadStorageConfig } from './storageConfigStorage';

function encodePassword(password: string): string {
  if (typeof btoa === 'function') {
    return btoa(password);
  }

  return globalThis.Buffer?.from(password, 'utf8').toString('base64') ?? password;
}

export function buildLoginUrl(values: {
  server: string;
  client?: string | null;
  userName: string;
  password?: string | null;
  protocol: HttpProtocol;
  locale?: string | null;
}): string {
  if (!values.server || !values.userName) {
    return '';
  }

  const baseUrl = buildCheckAccessUrl(values.server, values.client, values.protocol);
  if (!baseUrl) {
    return '';
  }

  const params = new URLSearchParams();
  params.set('user', values.userName);
  if (values.password) {
    params.set('password', encodePassword(values.password));
  }
  params.set('App', 'MobileBrowser');
  if (values.locale) {
    params.set('Culture', values.locale);
  }

  return `${baseUrl}?${params.toString()}`;
}

export async function buildLoginUrlFromPreferences(): Promise<string> {
  const values: StorageConfigValues = await loadStorageConfig();
  return buildLoginUrl(values);
}

export function buildServiceBaseUrl(values: Pick<StorageConfigValues, 'server' | 'client' | 'protocol'>): string {
  const server = values.server.trim();
  if (!server) {
    return '';
  }

  const schemePrefix = /^https?:\/\//i.test(server) ? '' : `${protocolToScheme(values.protocol)}://`;
  return `${schemePrefix}${server}/prestigeenterprise.services${values.client}`;
}

export { DEFAULT_PAGE, MOBILE_BROWSER_PATH };
