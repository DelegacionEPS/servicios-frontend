module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'plugin:jsx-a11y/recommended' // Add accessibility rules
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jsx-a11y'], // Include jsx-a11y plugin
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte']
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      rules: {
        // Specific accessibility rules
        'jsx-a11y/aria-props': 'error',
        'jsx-a11y/aria-proptypes': 'error',
        'jsx-a11y/aria-unsupported-elements': 'error',
        'jsx-a11y/role-has-required-aria-props': 'error',
        'jsx-a11y/aria-role': 'error',
        'jsx-a11y/no-noninteractive-tabindex': 'error',
        'jsx-a11y/no-noninteractive-element-interactions': 'error',
        'jsx-a11y/interactive-supports-focus': 'error',
        'jsx-a11y/no-static-element-interactions': 'error',
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/heading-has-content': 'error',
        'jsx-a11y/html-has-lang': 'error',
        'jsx-a11y/lang': 'error',
        'jsx-a11y/no-autofocus': 'error',
        'jsx-a11y/anchor-has-content': 'error',
        'jsx-a11y/anchor-is-valid': 'error',
        'jsx-a11y/tabindex-no-positive': 'error',
        'jsx-a11y/img-redundant-alt': 'error',
        'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
        'jsx-a11y/click-events-have-key-events': 'error',
        'jsx-a11y/aria-hidden': [
          'error',
          {
            'ignoreNonDOM': true
          }
        ],
        'jsx-a11y/no-aria-hidden-on-focusable': 'error'
      }
    }
  ]
};
