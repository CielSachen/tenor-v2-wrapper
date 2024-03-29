/** @type {import('eslint').Linter.Config} This enables type checking. */
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsdoc/recommended-typescript-flavor',
  ],
  ignorePatterns: 'dist/',
  overrides: [{
    extends: [
      'plugin:@typescript-eslint/strict-type-checked',
      'plugin:@typescript-eslint/stylistic-type-checked',
      'plugin:import/typescript',
      'plugin:jsdoc/recommended-typescript',
    ],
    files: [
      '**/*.ts',
      '**/*.cts',
      '**/*.mts',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: true,
      tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    rules: {
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      'jsdoc/require-jsdoc': ['warn', {
        publicOnly: true,
        require: {
          ArrowFunctionExpression: true,
          ClassDeclaration: true,
          ClassExpression: true,
          FunctionDeclaration: true,
          FunctionExpression: true,
          MethodDefinition: true,
        },
        contexts: [
          'ClassPropertyDefinition',
          'TSDeclareFunction',
          'TSEnumDeclaration',
          'TSInterfaceDeclaration',
          'TSMethodSignature',
          'TSModuleDeclaration',
          'TSPropertySignature',
          'TSTypeAliasDeclaration',
        ],
      }],
    },
    settings: {
      'import/parsers': { '@typescript-eslint/parser': [
        '**/*.ts',
        '**/*.cts',
        '**/*.mts',
      ] },
      'import/resolver': { typescript: { project: './tsconfig.json' } },
    },
  }],
  parserOptions: {
    ecmaFeatures: { impliedStrict: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@stylistic',
    'import',
    'jsdoc',
    'simple-import-sort',
  ],
  root: true,
  rules: {
    curly: [
      'error',
      'multi-line',
      'consistent',
    ],
    'max-nested-callbacks': ['error', { max: 4 }],
    'no-console': 'off',
    'no-empty-function': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-shadow': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    yoda: 'error',
    '@stylistic/array-bracket-newline': ['error', { minItems: 3 }],
    '@stylistic/array-element-newline': ['error', {
      ArrayExpression: { minItems: 3 },
      ArrayPattern: { minItems: 5 },
    }],
    '@stylistic/arrow-parens': ['error', 'always'],
    '@stylistic/arrow-spacing': ['warn', {
      before: true,
      after: true,
    }],
    '@stylistic/brace-style': [
      'error',
      'stroustrup',
      { allowSingleLine: true },
    ],
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/comma-spacing': 'error',
    '@stylistic/comma-style': 'error',
    '@stylistic/dot-location': ['error', 'property'],
    '@stylistic/indent': [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/max-statements-per-line': ['error', { max: 2 }],
    '@stylistic/no-floating-decimal': 'error',
    '@stylistic/no-multi-spaces': 'error',
    '@stylistic/no-multiple-empty-lines': ['error', {
      max: 2,
      maxEOF: 1,
      maxBOF: 0,
    }],
    '@stylistic/no-tabs': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/object-curly-newline': ['error', {
      ObjectExpression: { minProperties: 2 },
      ObjectPattern: { minProperties: 5 },
      ImportDeclaration: { minProperties: 5 },
      ExportDeclaration: { minProperties: 5 },
    }],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/object-property-newline': 'error',
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    '@stylistic/space-in-parens': 'error',
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/space-unary-ops': 'error',
    '@stylistic/spaced-comment': 'error',
    'jsdoc/require-jsdoc': ['warn', {
      publicOnly: true,
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true,
      },
      contexts: ['ClassPropertyDefinition'],
    }],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
  },
};
