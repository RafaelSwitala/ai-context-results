import { getLoginPreferences } from './storageConfigStorage';
import { LoginPreflightOptions, LoginSubmitResult } from '../types/auth';
import { buildLoginUrl } from '../utils/urlBuilder';
import { extractLoginErrorCode } from '../utils/loginErrorParser';
import { encodePasswordForLoginUrl } from '../utils/passwordEncoding';
import { shouldSkipRemotePreflightOnWeb } from '../utils/webDevPolicy';

/** MAP-005, MAP-012, MAP-016 — API-001, API-002, BEH-005..BEH-007 */

const DEFAULT_PREFLIGHT = true;

const defaultFetch = async (url: string, init?: RequestInit) => {
  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        'Cache-Control': 'no-cache',
        ...(init?.headers ?? {}),
      },
    });
    return { status: response.status, url: response.url };
  } catch {
    return { status: 0, url };
  }
};

export async function buildLoginUrlFromCredentials(
  userName: string,
  password: string,
  localeOverride?: string | null,
): Promise<string | null> {
  const prefs = await getLoginPreferences();
  if (prefs.server.length === 0) {
    return null;
  }

  const locale = localeOverride ?? prefs.locale;
  const encodedPassword = encodePasswordForLoginUrl(password);
  return buildLoginUrl(
    prefs.server,
    prefs.client,
    userName,
    encodedPassword,
    prefs.protocol,
    locale,
  );
}

export async function buildLoginUrlFromState(
  userName: string,
  password: string,
  locale: string | null,
): Promise<string | null> {
  return buildLoginUrlFromCredentials(userName, password, locale);
}

export async function submitLogin(
  userName: string,
  password: string,
  hasValidSettings: boolean,
  locale: string | null,
  options: LoginPreflightOptions = {},
): Promise<LoginSubmitResult> {
  if (userName.trim().length === 0) {
    return { ok: false, error: 'username_empty' };
  }
  if (password.length === 0) {
    return { ok: false, error: 'password_empty' };
  }
  if (!hasValidSettings) {
    return { ok: false, error: 'invalid_settings' };
  }

  const url = await buildLoginUrlFromCredentials(userName, password, locale);
  if (url == null) {
    return { ok: false, error: 'url_build_failed' };
  }

  const preflightEnabled = (options.enabled ?? DEFAULT_PREFLIGHT) && !shouldSkipRemotePreflightOnWeb();
  if (!preflightEnabled) {
    return { ok: true, url };
  }

  const fetchFn = options.fetchFn ?? defaultFetch;
  const response = await fetchFn(url, { method: 'GET' });
  if (response.status !== 200) {
    return { ok: false, error: 'http_failed' };
  }

  const errorCode = extractLoginErrorCode(response.url);
  if (errorCode) {
    return { ok: false, error: 'server_error', errorCode };
  }

  return { ok: true, url };
}
