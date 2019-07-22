/** @format */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'eslint-comments',
    'react-hooks',
    'jest',
    'promise',
    'unicorn',
    'prettier',
  ],
  settings: {
    react: {
      version: '16.8',
    },
    // "import/resolver": {
    //   "node": {
    //     "extensions": [".ts", ".tsx", ".js", ".jsx"]
    //   }
    // }
  },
  globals: {
    window: true,
    document: true,
    process: true,
    __DEV__: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-useless-constructor': 0,
    '@typescript-eslint/no-var-requires': 0,
    'no-param-reassign': 1,
    'class-methods-use-this': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    'no-underscore-dangle': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'global-require': 1,
    '@typescript-eslint/indent': [
      1,
      2,
      {
        flatTernaryExpressions: false,
        ignoreComments: true,
        VariableDeclarator: 2,
      },
    ],
    '@typescript-eslint/indent': 0,
    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
        printWidth: 80,
        singleQuote: true,
        useTabs: false,
        tabWidth: 2,
        semi: true,
        bracketSpacing: true,
        trailingComma: 'all',
        jsxBracketSameLine: false,
        arrowParens: 'always',
        insertPragma: true,
        quoteProps: 'consistent',
        jsxSingleQuote: false,
        htmlWhitespaceSensivity: 'css',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 1,
    '@typescript-eslint/no-explicit-any': 0,
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^(_|[A-Z]+)',
        varsIgnorePattern: '^(_|[A-Z]+)',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^(_|[A-Z]+)',
        varsIgnorePattern: '^(_|[A-Z]+)',
      },
    ],
    'no-debugger': 1,
    'new-cap': 'off',
    'no-extra-boolean-cast': 0,
    indent: 0,
    'react/jsx-one-expression-per-line': 'off',
    quotes: ['error', 'single'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: true,
      },
    ],
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/forbid-prop-types': 'off',
    'no-var-requires': 'off',
    'arrow-body-style': 0,
    'dot-notation': 0,
    'no-console': 'off',
    'react/jsx-key': 0,
    semi: ['error', 'always'],
    'react/sort-comp': 1,
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 1,
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    'react/no-unused-state': 1,
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: true,
        variables: true,
        typedefs: true,
      },
    ],
    'unicorn/prevent-abbreviations': 'off',
    'import/extensions': 0,
    'no-empty-function': 0,
    'import/no-default-export': 0,
    'unicorn/filename-case': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-empty-interface': 1,
    'no-empty-pattern': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-parameter-properties': [
      'error',
      {
        allows: ['private readonly'],
      },
    ],
  },
};
