module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'eslint-config-standard',
  ],
  plugins: ['import', 'node', 'promise'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    camelcase: ['error', { allow: ['_id', 'given_name', 'family_name'] }],
  },
};
