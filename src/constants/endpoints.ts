export const endpoints = Object.freeze({
  search: 'search',
  featured: 'featured',
  categories: 'categories',
  searchSuggestions: 'search_suggestions',
  autocomplete: 'autocomplete',
  trendingSearchTerms: 'trending_terms',
  registerShare: 'registershare',
  posts: 'posts',
});

/** The {@link endpoints endpoint} path string available through the Tenor API. */
export type Endpoint = typeof endpoints[keyof typeof endpoints];
