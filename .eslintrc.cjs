module.exports = {
  env: {
    es2021: true,
  },
  extends: [],
  overrides: [
    {
      env: {
        browser: true,
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      env: {
        node: true,
      },
      files: ['*.js', '*.jsx', '*.mjs', '*.cjs'],
      extends: ['airbnb-base'],
      rules: {
        'import/extensions': [
          'warn',
          'ignorePackages',
        ],
        'linebreak-style': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
