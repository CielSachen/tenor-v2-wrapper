import { endpoints } from '@constants';
import { fetchJSON } from '@lib/fetch.js';

/**
 * The content format offered by the Tenor API.
 * @see {@link https://developers.google.com/tenor/guides/response-objects-and-errors#format-typesTenor}
 */
export type CONTENT_FORMAT =
  | 'gif'
  | 'gifpreview'
  | 'mediumgif'
  | 'mediumgifpreview'
  | 'tinygif'
  | 'tinygifpreview'
  | 'nanogif'
  | 'nanogifpreview'
  | 'mp4'
  | 'loopedmp4'
  | 'tinymp4'
  | 'nanomp4'
  | 'webm'
  | 'tinywebm'
  | 'nanowebm'
  | 'webp_transparent'
  | 'webppreview_transparent'
  | 'tinywebp_transparent'
  | 'tinywebppreview_transparent'
  | 'nanowebp_transparent'
  | 'nanowebppreview_transparent'
  | 'gif_transparent'
  | 'tinygif_transparent'
  | 'nanogif_transparent'
;

/**
 * Describes the properties of a Tenor visual media.
 * @see {@link https://developers.google.com/tenor/guides/response-objects-and-errors#media-object}
 */
export interface MEDIA_OBJECT {
  /** A url to the media source. */
  readonly url: string;
  /** Width and height of the media in pixels. */
  readonly dims: number[];
  /**
   * Represents the time in seconds for one loop of the content. If the content is static, the duration
   * is set to `0`.
   */
  readonly duration: number;
  /** Size of file in bytes. */
  readonly size: number;
}

/**
 * Describes the properties of a Tenor API response object.
 * @see {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object}
 */
export interface RESPONSE_OBJECT {
  /** A Unix timestamp that represents when this post was created. */
  readonly created: number;
  /** Returns `true` if this post contains audio. */
  readonly hasaudio: boolean;
  /** Tenor result identifier. */
  readonly id: string;
  /**
   * A dictionary with a {@link CONTENT_FORMAT content format} as the key and a
   * {@link MEDIA_OBJECT Media Object} as the value.
   */
  readonly media_formats: Record<Partial<CONTENT_FORMAT>, MEDIA_OBJECT>;
  /** An array of tags for the post. */
  readonly tags: string[];
  /** The title of the post. */
  readonly title: string;
  /**
   * A textual description of the content.
   *
   * We recommend that you use `content_description` for user accessibility features.
   */
  readonly content_description: string;
  /** The full URL to view the post on {@link https://tenor.com tenor.com}. */
  readonly itemurl: string;
  /** Returns `true` if this post contains captions. */
  readonly hascaption: boolean;
  /**
   * Comma-separated list to signify whether the content is a sticker or static image, has audio, or is
   * any combination of these. If `sticker` and `static` aren't present, then the content is a GIF. A
   * blank `flags` field signifies a GIF without audio.
   */
  readonly flags: string[];
  /** The most common background pixel color of the content. */
  readonly bg_color: string;
  /** A short URL to view the post on {@link https://tenor.com tenor.com}. */
  readonly url: string;
}

/**
 * Describes the properties of a Tenor category.
 * @see {@link https://developers.google.com/tenor/guides/response-objects-and-errors#category-object}
 */
export interface CATEGORY_OBJECT {
  /**
   * The search term that corresponds to the category. The search term is translated to match the
   * `locale` of the corresponding request.
   */
  readonly searchterm: string;
  /** The search URL to request if the user selects the category. */
  readonly path: string;
  /** A URL to the media source for the category's example GIF. */
  readonly image: string;
  /**
   * Category name to overlay over the image. The name is translated to match the `locale` of the
   * corresponding request.
   */
  readonly name: string;
}

interface BaseParameters {
  /**
   * A client-specified string that represents the integration.
   *
   * A client key lets you use the same API key across different integrations but still be able to
   * differentiate them.
   *
   * For an app integration, use the same `client_key` value for all API calls.
   *
   * Any client custom behavior is triggered by the pairing of the `key` and `client_key`parameters.
   *
   * Doesn't have a default value.
   */
  client_key?: string;
}

interface LocaleParameters extends BaseParameters {
/**
 * Specify the country of origin for the request. To do so, provide its two-letter
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes ISO 3166-1} country code.
 *
 * The default value is US.
 * @default
 * { country: 'US' }
 */
  country?: string;
  /**
   * Specify the default language to interpret the search string. `xx` is the language's
   * {@link https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes ISO 639-1} language code, while
   * the optional `_YY` value is the two-letter
   * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes ISO 3166-1} country code.
   *
   * You can use the country code that you provide in `locale` to differentiate between dialects of the
   * given language.
   *
   * The default value is `en_US`.
   * @default
   * { locale: 'en_US' }
   */
  locale?: string;
}

/**
 * Describes the query string parameters of the `Search` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-search}
 */
export interface SearchParameters extends LocaleParameters {
  /**
   * Comma-separated list of non-GIF content types to filter the
   * {@link RESPONSE_OBJECT Response Objects}. By default, `searchfilter` returns GIF content only.
   *
   * Doesn't have a default value. The accepted values are `sticker`, `static`, and `-static`:
   *
   * - `searchfilter=sticker` returns both static and animated sticker content.
   * - `searchfilter=sticker,-static` returns only animated sticker content.
   * - `searchfilter=sticker,static` returns only static sticker content.
   * - For GIF content, either leave `searchfilter` blank or don't use it.
   */
  searchfilter?:
    | 'sticker'
    | 'sticker,-static'
    | 'sticker,static'
  ;
  /**
   * Specify the content safety filter level.
   *
   * The default value is `off`. The accepted values are `off`, `low`, `medium`, and `high`.
   * @default
   * { contentfilter: 'off' }
   */
  contentfilter?:
    | 'off'
    | 'low'
    | 'medium'
    | 'high'
  ;
  /**
   * Comma-separated list of GIF formats to filter the {@link RESPONSE_OBJECT Response Objects}. By
   * default, `media_filter` returns all formats for each Response Object.
   *
   * Example: `media_filter=gif,tinygif,mp4,tinymp4`
   *
   * Doesn't have a default value.
   * @example
   * { media_filter: 'gif,tinygif,mp4,tinymp4' }
   */
  media_filter?: string;
  /**
   * Filter the {@link RESPONSE_OBJECT Response Objects} to only include GIFs with aspect ratios that fit
   * within the selected range.
   *
   * The default value is `all`. The accepted values are `all`, `wide`, and `standard`:
   *
   * - `all`: No constraints
   * - `wide`: 0.42 <= aspect ratio <= 2.36
   * - `standard`: 0.56 <= aspect ratio <= 1.78
   * @default
   * { ar_range: 'all' }
   */
  ar_range?:
    | 'all'
    | 'wide'
    | 'standard'
  ;
  /**
   * Specify whether to randomly order the response. The default value is `false`, which orders the
   * results by Tenor's relevancy ranking.
   *
   * The accepted values are `true` and `false`.
   * @default
   * { random: 'false' }
   */
  random?: `${boolean}`;
  /**
   * Fetch up to the specified number of results.
   *
   * The default value is `20`, and the maximum value is `50`.
   * @default
   * { limit: '20' }
   */
  limit?: `${number}`;
  /**
   * Retrieve results that start at the position "value". Use a non-zero, non-empty value from `next`,
   * returned by the API response, to fetch the next set of results. `pos` isn't an index and might be an
   * `integer`, `float`, or a `string`.
   *
   * Doesn't have a default value.
   */
  pos?: string;
}

/**
 * Describes the query string parameters of the `Featured` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-featured}
 */
export type FeaturedParameters = Omit<SearchParameters, 'random'>;

/**
 * Describes the query string parameters of the `Categories` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-categories}
 */
export interface CategoriesParameters extends LocaleParameters {
  /**
   * Determines the type of categories returned.
   *
   * The default value is featured. The accepted values are featured and trending.
   * @default
   * { type: 'featured' }
   */
  type?: 'featured' | 'trending';
  /**
   * Specify the content safety filter level.
   *
   * The default value is `off`. The accepted values are `off`, `low`, `medium`, and `high`.
   * @default
   * { contentfilter: 'off' }
   */
  contentfilter?:
    | 'off'
    | 'low'
    | 'medium'
    | 'high'
  ;
}

/**
 * Describes the query string parameters of the `Search Suggestions` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-categsearch-suggestionsories}
 */
export interface SearchSuggestionsParameters extends LocaleParameters {
  /**
   * Fetch up to the specified number of results.
   *
   * The default value is `20`, and the maximum value is `50`.
   * @default
   * { limit: '20' }
   */
  limit?: `${number}`;
}

/**
 * Describes the query string parameters of the `Autocomplete` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-autocomplete}
 */
export type AutocompleteParameters = SearchSuggestionsParameters;

/**
 * Describes the query string parameters of the `Trending Search Terms` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-trending-search}
 */
export type TrendingSearchTermsParameters = SearchSuggestionsParameters;

/**
 * Describes the query string parameters of the `Posts` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#parameters-posts}
 */
export interface PostParameters extends BaseParameters {
  /**
   * Comma-separated list of GIF formats to filter the {@link RESPONSE_OBJECT Response Objects}. By
   * default, `media_filter` returns all formats for each Response Object.
   *
   * Example: `media_filter=gif,tinygif,mp4,tinymp4`
   *
   * Doesn't have a default value.
   * @example
   * { media_filter: 'gif,tinygif,mp4,tinymp4' }
   */
  media_filter?: string;
}

/**
 * Describes the JSON object response of the `Search` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-search}
 */
export interface SearchResponse {
  /**
   * A position identifier to use with the next API query, through the `pos` field, to retrieve the next
   * set of results. If there are no further results, `next` returns an empty string.
   */
  readonly next: string;
  /**
   * An array of {@link RESPONSE_OBJECT Response Objects} that contains the most relevant content for the
   * requested search term. The content is sorted by its relevancy Rank.
   */
  readonly results: RESPONSE_OBJECT[];
}

/**
 * Describes the JSON object response of the `Featured` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-featured}
 */
export interface FeaturedResponse extends SearchResponse {
  /** An array of {@link RESPONSE_OBJECT Response Objects}. */
  readonly results: RESPONSE_OBJECT[];
}

/**
 * Describes the JSON object response of the `Categories` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-categories}
 */
export interface CategoriesResponse {
  /**
   * An array of {@link CATEGORY_OBJECT CATEGORY_OBJECTS} where the `name` field has been translated into
   * the `locale` language.
   */
  readonly tags: CATEGORY_OBJECT[];
}

/**
 * Describes the JSON object response of the `Search Suggestions` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-search-suggestions}
 */
export interface SearchSuggestionsResponse {
  /** An array of suggested search terms. */
  readonly results: string[];
}

/**
 * Describes the JSON object response of the `Autocomplete` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-autocomplete}
 */
export type AutocompleteResponse = SearchSuggestionsResponse;

/**
 * Describes the JSON object response of the `Trending Search Terms` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-trending-search}
 */
export interface TrendingSearchTermsResponse extends SearchSuggestionsResponse {
  /** An array of suggested search terms. The terms are sorted by their Trending Rank. */
  readonly results: string[];
}

/**
 * Describes the JSON object response of the `Posts` endpoint.
 * @see {@link https://developers.google.com/tenor/guides/endpoints#response-format-posts}
 */
export interface PostResponse {
  /** An array of {@link RESPONSE_OBJECT Response Objects} that correspond to those passed in the `ids` list. */
  readonly results: RESPONSE_OBJECT[];
}

/** Describes a wrapper for fetching the Tenor API endpoints. */
export class Tenor {
  /** API key for privileged access. */
  #key: string;

  /**
   * Constructs a new Tenor API endpoints wrapper.
   * @param key The Tenor API key.
   */
  constructor(key: string) {
    this.#key = key;
  }

  /**
   * Fetches a JSON object that contains a list of the most relevant GIFs for a given set of search
   * terms, categories, emojis, or any combination of these.
   * @param query The query search term.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of GIFs.
   */
  public async fetchGIFsByQuery(query: string, parameters?: SearchParameters) {
    return fetchJSON<SearchResponse>(endpoints.search, new URLSearchParams({
      key: this.#key,
      q: query,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of the current global featured GIFs.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of featured GIFs.
   */
  public async fetchFeaturedGIFs(parameters?: FeaturedParameters) {
    return fetchJSON<FeaturedResponse>(endpoints.featured, new URLSearchParams({
      key: this.#key,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of GIF categories associated with the provided type.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of GIF categories.
   */
  public async fetchGIFCategories(parameters?: CategoriesParameters) {
    return fetchJSON<CategoriesResponse>(endpoints.search, new URLSearchParams({
      key: this.#key,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of alternative search terms for a given search term.
   * @param query The query search term.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of alternative search terms.
   */
  public async fetchSearchSuggestionsByQuery(query: string, parameters?: SearchSuggestionsParameters) {
    return fetchJSON<SearchSuggestionsResponse>(endpoints.searchSuggestions, new URLSearchParams({
      key: this.#key,
      q: query,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of completed search terms for a given partial search term.
   * @param query The query search term.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of completed search terms.
   */
  public async fetchAutocompleteByQuery(query: string, parameters?: AutocompleteParameters) {
    return fetchJSON<AutocompleteResponse>(endpoints.autocomplete, new URLSearchParams({
      key: this.#key,
      q: query,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of the current trending search terms.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of trending search terms.
   */
  public async fetchTrendingSearchTerms(parameters?: TrendingSearchTermsParameters) {
    return fetchJSON<TrendingSearchTermsResponse>(endpoints.trendingSearchTerms, new URLSearchParams({
      key: this.#key,
      ...parameters,
    }));
  }

  /**
   * Fetches the GIFs, stickers, or a combination of the two for the specified IDs.
   * @param ids The comma-separated list of {@link RESPONSE_OBJECT Response Objects} IDs.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of GIFs, stickers, or a combination of the two.
   */
  public async fetchPostsById(ids: string, parameters?: PostParameters) {
    return fetchJSON<PostResponse>(endpoints.posts, new URLSearchParams({
      ids,
      key: this.#key,
      ...parameters,
    }));
  }
}
