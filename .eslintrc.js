module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "overrides": [
    {
      "files": ["tests/*.ts"],
      "rules": {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}
