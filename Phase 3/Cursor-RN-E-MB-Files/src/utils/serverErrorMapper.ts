/** MAP-007 — BEH-021, BEH-025, ERRPATH-005, ERRPATH-006, ERRPATH-007 */

const SERVER_ERROR_FALLBACK =
  'Die App wurde auf dem Server nicht gefunden. Bitte geben Sie die Adresse eines anderen Servers ein.';

const ERROR_MESSAGES: Record<string, string> = {
  '-1': 'Ein Benutzer mit diesem Namen existiert nicht.',
  '-2': 'Ein Benutzer mit diesem Passwort existiert nicht.',
  '-3': 'Es sind keine freien Benutzerlizenzen verfügbar.',
  '-4': 'Der Benutzer ist gesperrt.',
  '-5': 'Der Benutzer ist vorübergehend gesperrt.',
  '-6': 'Der Benutzer ist bereits angemeldet. Warten Sie oder melden Sie sich mit einem anderen Namen an.',
};

export function mapServerError(errorCode: string | null | undefined): string {
  if (errorCode == null || errorCode.length === 0) {
    return SERVER_ERROR_FALLBACK;
  }
  if (errorCode.startsWith('-')) {
    return ERROR_MESSAGES[errorCode] ?? 'Sie wurden abgemeldet.';
  }
  return SERVER_ERROR_FALLBACK;
}
