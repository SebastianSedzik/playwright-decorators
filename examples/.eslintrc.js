module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off'
  },
  overrides: [
    {
      files: ['tests/*.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ]
}
