import { endpoints } from '@constants';
import { fetchJSON } from '@lib/fetch.js';

/** {@link https://developers.google.com/tenor/guides/response-objects-and-errors#format-types} */
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

/** {@link https://developers.google.com/tenor/guides/response-objects-and-errors#media-object} */
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

/** {@link https://developers.google.com/tenor/guides/response-objects-and-errors#response-object} */
export interface RESPONSE_OBJECT {
  /** A Unix timestamp that represents when this post was created. */
  readonly created: number;
  /** Returns `true` if this post contains audio. */
  readonly hasaudio: boolean;
  /** Tenor result identifier */
  readonly id: string;
  /** A dictionary with a content format as the key and a Media Object as the value. */
  readonly media_formats: Partial<Record<CONTENT_FORMAT, MEDIA_OBJECT>>;
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
   * Comma-separated list to signify whether the content is a sticker or static image, has audio,
   * or is any combination of these. If `sticker` and `static` aren't present, then the content is a
   * GIF. A blank `flags` field signifies a GIF without audio.
   */
  readonly flags: string[];
  /** The most common background pixel color of the content. */
  readonly bg_color: string;
  /** A short URL to view the post on {@link https://tenor.com tenor.com}. */
  readonly url: string;
}

/** {@link https://developers.google.com/tenor/guides/response-objects-and-errors#category-object} */
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
   * A client key lets you use the same API key across different integrations but still be able to differentiate them.
   *
   * For an app integration, use the same `client_key` value for all API calls.
   *
   * Any client custom behavior is triggered by the pairing of the key and client_key parameters.
   */
  client_key?: string;
}

interface LocaleParameters extends BaseParameters {
/**
 * Specify the country of origin for the request. To do so, provide its two-letter
 * {@link https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes ISO 3166-1} country code.
 * @default US
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
   * @default 'en_US'
   */
  locale?: string;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-search} */
export interface SearchParameters extends LocaleParameters {
  /**
   * Comma-separated list of non-GIF content types to filter the {@link RESPONSE_OBJECT Response Objects}
   * . By default, `searchfilter` returns GIF content only.
   */
  searchfilter?:
    | 'sticker'
    | 'sticker,-static'
    | 'sticker,static'
  ;
  /**
   * Specify the content safety filter level.
   * @default 'off'
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
   */
  media_filter?: string;
  /**
   * Filter the {@link RESPONSE_OBJECT Response Objects}  to only include GIFs with aspect ratios that fit within the selected
   * range.
   * @default all
   */
  ar_range?:
    | 'all'
    | 'wide'
    | 'standard'
  ;
  /**
   * Specify whether to randomly order the response.
   * @default false
   */
  random?: `${boolean}`;
  /**
   * Fetch up to the specified number of results. Maximum value of 50.
   * @default 20
   */
  limit?: `${number}`;
  /**
   * Retrieve results that start at the position "value". Use a non-zero, non-empty value from
   * `next`, returned by the API response, to fetch the next set of results. `pos` isn't an index and
   * might be an `integer`, `float`, or `string`.
   */
  pos?: string;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-featured} */
export type FeaturedParameters = Omit<SearchParameters, 'random'>;

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-categories} */
export interface CategoriesParameters extends LocaleParameters {
  /**
   * Determines the type of categories returned.
   * @default 'featured'
   */
  type?: 'featured' | 'trending';
  /**
   * Specify the content safety filter level.
   * @default 'off'
   */
  contentfilter?:
    | 'off'
    | 'low'
    | 'medium'
    | 'high'
  ;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-categsearch-suggestionsories} */
export interface SearchSuggestionsParameters extends LocaleParameters {
  /**
   * Fetch up to the specified number of results. Maximum value of 50.
   * @default 20
   */
  limit?: `${number}`;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-autocomplete} */
export type AutocompleteParameters = SearchSuggestionsParameters;

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-trending-search} */
export type TrendingSearchTermsParameters = SearchSuggestionsParameters;

/** {@link https://developers.google.com/tenor/guides/endpoints#parameters-posts} */
export interface PostParameters extends BaseParameters {
  /**
   * Comma-separated list of GIF formats to filter the {@link RESPONSE_OBJECT Response Objects}. By
   * default, `media_filter` returns all formats for each Response Object.
   */
  media_filter?: string;
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-search} */
export interface SearchResponse {
  /**
   * A position identifier to use with the next API query, through the pos field, to retrieve the next
   * set of results. If there are no further results an empty string.
   */
  readonly next: string;
  /**
   * An array of {@link RESPONSE_OBJECT Response Objects} that contains the most relevant content for the requested search
   * term. The content is sorted by its relevancy Rank.
   */
  readonly results: RESPONSE_OBJECT[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-featured} */
export interface FeaturedResponse extends SearchResponse {
  /** An array of {@link RESPONSE_OBJECT Response Objects}. */
  readonly results: RESPONSE_OBJECT[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-categories} */
export interface CategoriesResponse {
  /**
   * An array of {@link CATEGORY_OBJECT CATEGORY_OBJECTS} where the name field has been translated
   * into the locale language.
   */
  readonly tags: CATEGORY_OBJECT[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-search-suggestions} */
export interface SearchSuggestionsResponse {
  /** An array of suggested search terms. */
  readonly results: string[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-autocomplete} */
export type AutocompleteResponse = SearchSuggestionsResponse;

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-trending-search} */
export interface TrendingSearchTermsResponse extends SearchSuggestionsResponse {
  /** An array of suggested search terms. The terms are sorted by their Trending Rank. */
  readonly results: string[];
}

/** {@link https://developers.google.com/tenor/guides/endpoints#response-format-posts} */
export interface PostResponse {
  /** An array of {@link RESPONSE_OBJECT Response Objects} that correspond to those passed in the ids list. */
  readonly results: RESPONSE_OBJECT[];
}

/** The Tenor API v2 wrapper. */
export class Tenor {
  /** API key for privileged access. */
  #key: string;

  /** @param key The Google Cloud Tenor API key. */
  constructor(key: string) {
    this.#key = key;
  }

  /**
   * Fetches a JSON object that contains a list of the most relevant GIFs for a given set of search
   * terms, categories, emojis, or any combination of these.
   * @param query The query search term.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of the most relevant GIFs.
   */
  public async fetchGIFsByQuery(query: string, parameters?: SearchParameters) {
    return fetchJSON<SearchResponse>(endpoints.search, new URLSearchParams({
      key: this.#key,
      q: query,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of the current global featured GIFs. Tenor updates the
   * featured stream regularly throughout the day.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of the current global featured GIFs.
   */
  public async fetchFeaturedGIFs(parameters?: FeaturedParameters) {
    return fetchJSON<FeaturedResponse>(endpoints.featured, new URLSearchParams({
      key: this.#key,
      ...parameters,
    }));
  }

  /**
   * Fetches a JSON object that contains a list of GIF categories associated with the provided type.
   * Each category includes a corresponding search URL to use if the user clicks on the category.
   * The search URL includes any parameters from the original call to the Categories endpoint.
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
   *
   * Search suggestions help a user narrow their search or discover related search terms to find a
   * more precise GIF. The API returns results in order of what is most likely to drive a share for
   * a given term, based on historic user search and share behavior.
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
   * The list is sorted by Tenor's AI and the number of results decreases as Tenor's AI becomes more
   * certain.
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
   * Fetches a JSON object that contains a list of the current trending search terms. Tenor's AI updates the
   * list hourly.
   * @param parameters The optional parameters.
   * @returns The fetched JSON object of a list of the current trending search terms.
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
