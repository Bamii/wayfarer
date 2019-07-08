module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ],
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'warn'
  }
};
