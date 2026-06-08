/**
 * Login URL Service
 * Builds URLs for API calls using stored settings
 * Corresponds to Phase 1 mappings: MAP-006, MAP-015, MAP-024
 * Source IDs: API-002, API-004, BEH-008, BEH-017, SEC-001, SEC-002
 */

import { LoginPreferences, Protocol } from '../types';

/**
 * URL path constant
 * Source: API-002, API-004, BEH-008, BEH-017
 * Both iOS and Android use: /PrestigeEnterprise.MobileBrowser{client}/Default.aspx
 */
const URL_PATH = 'PrestigeEnterprise.MobileBrowser';
const URL_SUFFIX = '/Default.aspx';

/**
 * Build check-access URL
 * Source: API-001, API-003, ERRPATH-002, ERRPATH-003
 * 
 * Constructs: {scheme}://{server}/{URL_PATH}{client}{URL_SUFFIX}
 * 
 * @param server - Server hostname
 * @param client - Mandant/client identifier
 * @param protocol - Protocol selection (affects scheme)
 * @returns Full URL or null if encoding fails
 */
export function buildCheckAccessUrl(
  server: string,
  client: string | undefined,
  protocol: Protocol
): string | null {
  try {
    const scheme = getSchemeForProtocol(protocol);
    const encodedServer = encodeServerForUrl(server);
    const encodedClient = encodeClientForUrl(client);

    // Server must be present, client can be empty
    if (!encodedServer) {
      return null;
    }

    const url = `${scheme}://${encodedServer}/${URL_PATH}${encodedClient}${URL_SUFFIX}`;
    
    // Validate URL
    try {
      new URL(url);
    } catch {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

/**
 * Build login URL from stored preferences
 * Source: BEH-008, BEH-017, API-002, API-004
 * 
 * Includes: server, client, username, password, protocol
 * Android addition: culture query parameter
 * 
 * @param prefs - LoginPreferences
 * @returns Full login URL or empty string if incomplete
 */
export function buildLoginUrlFromPreferences(prefs: LoginPreferences): string {
  // Require server and username for login URL
  if (!prefs.server || !prefs.userName) {
    return '';
  }

  try {
    const scheme = getSchemeForProtocol(prefs.protocol);
    const encodedServer = encodeServerForUrl(prefs.server);
    const encodedClient = encodeClientForUrl(prefs.client);

    // Server must be present, client can be empty
    if (!encodedServer) {
      return '';
    }

    let url = `${scheme}://${encodedServer}/${URL_PATH}${encodedClient}${URL_SUFFIX}`;

    // Add query parameters
    const params = new URLSearchParams();
    params.append('user', prefs.userName);
    
    if (prefs.password) {
      params.append('password', prefs.password);
    }

    // Android divergence: add culture if present
    if (prefs.locale) {
      params.append('culture', prefs.locale);
    }

    url += `?${params.toString()}`;

    // Validate URL
    try {
      new URL(url);
    } catch {
      return '';
    }

    return url;
  } catch {
    return '';
  }
}

/**
 * Build login URL directly with parameters
 * Source: API-002, API-004, BEH-008, BEH-017
 * 
 * @param server - Server hostname
 * @param client - Mandant/client identifier
 * @param userName - Username
 * @param password - Optional password
 * @param protocol - Protocol selection
 * @param culture - Optional locale/culture (Android)
 * @returns Full login URL
 */
export function buildLoginUrl(
  server: string,
  client: string | undefined,
  userName: string,
  password?: string,
  protocol?: Protocol,
  culture?: string
): string {
  try {
    const scheme = getSchemeForProtocol(protocol || Protocol.HTTPS);
    const encodedServer = encodeServerForUrl(server);
    const encodedClient = encodeClientForUrl(client);

    // Server must be present, client can be empty
    if (!encodedServer) {
      return '';
    }

    let url = `${scheme}://${encodedServer}/${URL_PATH}${encodedClient}${URL_SUFFIX}`;

    // Add query parameters
    const params = new URLSearchParams();
    params.append('user', userName);
    
    if (password) {
      params.append('password', password);
    }

    if (culture) {
      params.append('culture', culture);
    }

    url += `?${params.toString()}`;

    // Validate URL
    try {
      new URL(url);
    } catch {
      return '';
    }

    return url;
  } catch {
    return '';
  }
}

/**
 * Get scheme for protocol
 * Source: STOR-003, STOR-007, SEC-003, API-002
 * 
 * MAP-021: 0=HTTP, 1=HTTPS, 2=HTTPS_WITHOUT_VALIDATION
 * Android divergence: protocol 2 means HTTPS but with validation disabled
 * 
 * For network calls, this function returns the scheme.
 * Validation bypass (protocol 2) must be handled at HTTP client level.
 * 
 * @param protocol - Protocol enum value
 * @returns 'http' or 'https'
 */
function getSchemeForProtocol(protocol: Protocol): 'http' | 'https' {
  switch (protocol) {
    case Protocol.HTTP:
      return 'http';
    case Protocol.HTTPS:
    case Protocol.HTTPS_WITHOUT_VALIDATION:
      return 'https'; // Both use HTTPS scheme; validation is client-level
    default:
      return 'https'; // Default to HTTPS
  }
}

/**
 * Encode server hostname for URL
 * Source: MAP-024, API-002, API-004
 * 
 * iOS: percent-encodes server
 * Android: appends raw server (unsafer)
 * RN: Use safer percent encoding (iOS behavior)
 * 
 * @param server - Server hostname
 * @returns Encoded server or null if encoding fails
 */
function encodeServerForUrl(server: string): string | null {
  if (!server) {
    return null;
  }

  try {
    // Use encodeURIComponent for safe encoding
    // This matches iOS percent-encoding behavior
    return encodeURIComponent(server);
  } catch {
    return null;
  }
}

/**
 * Encode client/mandant for URL path
 * Source: MAP-024, API-002, API-004
 * 
 * Client goes into the URL path, so use path-safe encoding
 * Client can be empty/undefined (will result in empty string)
 * 
 * @param client - Client identifier (optional)
 * @returns Encoded client or empty string if not provided
 */
function encodeClientForUrl(client: string | undefined | null): string {
  if (!client) {
    return ''; // Return empty string instead of null to allow empty clients
  }

  try {
    // encodeURIComponent handles path encoding too
    return encodeURIComponent(client);
  } catch {
    return ''; // Return empty string on error
  }
}

/**
 * Extract server from URL for validation
 * Helper function for tests and logging
 * 
 * @param url - Full URL
 * @returns Extracted server hostname or null
 */
export function extractServerFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname;
  } catch {
    return null;
  }
}

/**
 * Should skip HTTPS validation
 * Source: SEC-003, STOR-003, STOR-007
 * 
 * Returns true only when protocol is explicitly HTTPS_WITHOUT_VALIDATION
 * 
 * @param protocol - Protocol enum value
 * @returns true if HTTP client should skip certificate validation
 */
export function shouldSkipHttpsValidation(protocol: Protocol): boolean {
  return protocol === Protocol.HTTPS_WITHOUT_VALIDATION;
}
