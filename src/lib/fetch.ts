import { GoogleAPIError, type Status } from '@client';
import type { Endpoint } from '@constants';

/**
 * Fetches the JSON object response of a Tenor API endpoint.
 * @param endpoint The API endpoint.
 * @param parameters The query string parameters.
 * @returns The fetched JSON object response.
 */
export async function fetchJSON<T extends object>(endpoint: Endpoint, parameters: URLSearchParams) {
  const response = await fetch(`https://tenor.googleapis.com/v2/${endpoint}?${parameters.toString()}`);
  const json = await response.json() as T | { error: Status };

  if ('error' in json) throw new GoogleAPIError(json.error);

  return json;
}
