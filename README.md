# tenor-v2-wrapper

[![Node.js](https://img.shields.io/badge/Node.js-20.11.0-339933?style=flat-square&logo=Node.js&logoColor=339933&labelColor=222222)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=TypeScript&logoColor=3178C6&labelColor=222222)](https://www.typescriptlang.org)

An easy way to use [Tenor's v2 API](https://developers.google.com/tenor/guides/quickstart) in a [Node.js](https://nodejs.org) project.

This wrapper was made for use in my personal projects, therefore this will not be the most robust wrapper in the world and may even be pretty bad.

___

## Install

**Node.js v20.11.0 or newer is required.**

```bash
npm install @cielsachen/tenor-v2-wrapper
```

```bash
pnpm add @cielsachen/tenor-v2-wrapper
```

## Configuration

Set the key that the wrapper will use by passing the Google Cloud Tenor API key to the class' constructor:

```typescript
import { Tenor } from '@cielsachen/tenor-v2-wrapper';

const tenor = new Tenor(process.env.TENOR_KEY);
```

## Endpoints

- **Search** (`fetchGIFsByQuery`) - Returns a list of the most relevant GIFs.
- **Featured** (`fetchFeaturedGIFs`) - Returns a list of the current global featured GIFs.
- **Categories** (`fetchGIFCategories`) - Returns a list of GIF categories.
- **Search Suggestions** (`fetchSearchSuggestionsByQuery`) - Returns a list of alternative search terms.
- **Autocomplete** (`fetchAutocompleteByQuery`) - Returns a list of completed search terms.
- **Trending Search Terms** (`fetchTrendingSearchTerms`) - Returns a list of the current trending search terms.
- **Posts** (`fetchPostsById`) - Returns GIFs, stickers, or a combination of the two.

*I had chosen to not include the **Register Share** endpoint.*

## Usage

```typescript
import { Tenor } from '@cielsachen/tenor-v2-wrapper';

const tenor = new Tenor(process.env.TENOR_KEY);
```

### Example Requests

```typescript
(async () => {
  try {
    const response = await tenor.fetchGIFsByQuery('meow');
    const randomGif = response.results[Math.floor(Math.random() * response.results.length)];

    console.log(randomGif);
  }
  catch (error) {
    console.error(error);
  }
})();

// or

tenor.fetchGIFsByQuery('meow')
  .then((response) => {
    const randomGif = response.results[Math.floor(Math.random() * response.results.length)];

    console.log(randomGif);
  })
  .catch((error) => console.error(error));
```

___

## Found an issue?

Please submit it using the [bug tracker](https://github.com/CielSachen/tenor-v2-wrapper/issues).
