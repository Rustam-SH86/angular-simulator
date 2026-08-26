// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const stylisticModule = require('@stylistic/eslint-plugin');
const stylistic = stylisticModule.default ?? stylisticModule;
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

const prettierOptions = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
};

module.exports = defineConfig([
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      eslintPluginPrettierRecommended,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      'prettier/prettier': ['error', prettierOptions],

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],

      '@stylistic/padded-blocks': [
        'error',
        {
          classes: 'never',
        },
      ],

      '@stylistic/quotes': [
        'warn',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always',
        },
      ],

      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/template-curly-spacing': ['warn', 'never'],
      '@stylistic/semi': ['warn', 'always'],

      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: ['objectLiteralProperty', 'typeProperty'],
          format: null,
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],

      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],

      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },

  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      eslintPluginPrettierRecommended,
    ],
    rules: {
      'prettier/prettier': ['error', prettierOptions],
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'warn',
    },
  },
]);
