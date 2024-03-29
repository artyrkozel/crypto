module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'airbnb', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'plugin:storybook/recommended', 'plugin:i18next/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'i18next'],
  rules: {
    "@typescript-eslint/ban-types": "off",
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'i18next/no-literal-string': [
      'error',
      {
          markupOnly: true,
          ignoreAttribute: [
              'as',
              'role',
              'data-testid',
              'to',
              'target',
              'justify',
              'align',
              'border',
              'direction',
              'gap',
          ],
      },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'max-len': ['error', { ignoreComments: true, code: 140 }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'i18next/no-literal-string': 'off',
    'react/prop-types': 'off',
    'quotes': 'off',
    'object-curly-newline': 'off',
    'react/button-has-type': 'off',
    'react/jsx-props-no-spreading': "off",
    'import/order': [
      1, 
      { "groups": 
          [
            "external", 
            "builtin", 
            "internal", 
            "sibling", 
            "parent", 
            "index"
          ], 
      } 
    ]
  },
}
