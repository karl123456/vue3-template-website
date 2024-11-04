/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-airbnb',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: '.',
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'import/prefer-default-export': 0,
    'vuejs-accessibility/click-events-have-key-events': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'class-methods-use-this': 0,
    'vuejs-accessibility/form-control-has-label': 0,
    'vue/multi-word-component-names': 0,
  },
};
