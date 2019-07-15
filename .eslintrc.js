module.exports = {
  extends: ['airbnb', 'eslint-config-prettier'],
  plugins: ['mocha'],
  parser: 'babel-eslint',
  rules: {
    strict: 0,
    'no-unused-vars': 'warn',
    'import/prefer-default-export': 'warn'
  }
};
