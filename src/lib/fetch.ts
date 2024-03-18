import type { Endpoint } from '@constants';

/**
 * This interface has the same semantics as `google.rpc.Status`. It uses HTTP status code instead of gRPC
 * status code. It has extra fields `status` and `errors` for backward compatibility with
 * [Google API Client Libraries](https://developers.google.com/api-client-library).
 */
export interface ErrorStatus {
  /**
   * The actual error payload. The nested message structure is for backward compatibility with
   * [Google API Client Libraries](https://developers.google.com/api-client-library). It also makes the
   * error more readable to developers.
   */
  readonly error: {
  /** The HTTP status code that corresponds to `google.rpc.Status.code`. */
    readonly code: number;
    /** This corresponds to `google.rpc.Status.message`. */
    readonly message: string;
    /** This is the enum version for `google.rpc.Status.code`. */
    readonly status: string;
    /** This corresponds to `google.rpc.Status.details`. */
    readonly details: unknown[];
  }
}

/**
 * Fetches the JSON object response of a Tenor API endpoint.
 * @param endpoint The API endpoint.
 * @param parameters The query string parameters.
 * @returns The fetched JSON object response.
 */
export async function fetchJSON<T>(endpoint: Endpoint, parameters: string) {
  const response = await fetch(`https://tenor.googleapis.com/v2/${endpoint}${parameters}`);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  return response.json() as T | ErrorStatus;
}
