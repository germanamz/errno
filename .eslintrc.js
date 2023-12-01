/* eslint-env node */
module.exports = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@stylistic',
  ],
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/quotes': ['error', 'single'],
    'import/extensions': ['off'],
    'no-underscore-dangle': ['off'],
    'import/prefer-default-export': ['off'],
  }
};
