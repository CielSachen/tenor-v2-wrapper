# tenor-v2-wrapper

![Node.js Static Badge](https://img.shields.io/badge/Node.js-20.x-44883E?style=flat-square&logo=node.js)
![pnpm Static Badge](https://img.shields.io/badge/pnpm-8.x-orange?style=flat-square&logo=pnpm)
![TypeScript Static Badge](https://img.shields.io/badge/TypeScript-5.4.x-3178C6?style=flat-square&logo=typescript)

An easy way to use [Tenor's v2 API](https://developers.google.com/tenor/guides/quickstart) in a [Node.js](https://nodejs.org) project.

This wrapper was made for use in my personal projects, therefore this will not be the most robust wrapper in the world and may even be pretty bad.

*Typings and JSDoc descriptions were taken from the [Tenor API Documentation](https://developers.google.com/tenor/guides/quickstart) and the [Google Cloud APIs Errors Documentation](https://cloud.google.com/apis/design/errors).*

___

## Installation

### Requirements

- Node.js v20 or newer.
- An `.npmrc` file containing these:

  ```properties
  @cielsachen:registry=https://npm.pkg.github.com/
  # Replace ${GITHUB_PERSONAL_ACCESS_TOKEN} with the actual token.
  //npm.pkg.github.com/:_authToken=${GITHUB_PERSONAL_ACCESS_TOKEN}
  ```

### From GitHub Packages

```bash
npm install @cielsachen/tenor-v2-wrapper
```

```bash
pnpm add @cielsachen/tenor-v2-wrapper
```

## Usage

### Configuration

Set the key that the wrapper will use by passing the Google Cloud Tenor API key to the class' constructor:

```typescript
import { Tenor } from '@cielsachen/tenor-v2-wrapper';

const tenor = new Tenor(process.env.TENOR_KEY);
```

### Example

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
