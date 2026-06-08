import { getLoginPreferences, getLocale } from './storageConfigStorage';
import { buildLoginUrl } from '../utils/urlBuilder';
import { encodePasswordForLoginUrl } from '../utils/passwordEncoding';

/** MAP-005 — API-002, BEH-017 */

export async function buildLoginUrlFromPreferences(): Promise<string> {
  const prefs = await getLoginPreferences();
  if (prefs.server.length === 0 || prefs.userName.length === 0) {
    return '';
  }

  const locale = prefs.locale ?? (await getLocale());
  const encodedPassword = encodePasswordForLoginUrl(prefs.password);
  const url = buildLoginUrl(
    prefs.server,
    prefs.client,
    prefs.userName,
    encodedPassword,
    prefs.protocol,
    locale,
  );
  return url ?? '';
}

export { buildLoginUrl };
