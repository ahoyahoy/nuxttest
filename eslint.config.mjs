// @ts-check
import {createConfigForNuxt} from '@nuxt/eslint-config'
import perfectionist from 'eslint-plugin-perfectionist'
// import unusedImports from 'eslint-plugin-unused-imports'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
})
  .append(
    {
      files: ['**/*.vue'],
      name: 'ah:vue',
      rules: {
        'vue/max-attributes-per-line': ['error', {
          multiline: {
            max: 1,
          },
        }],
      },
    },
    {
      name: 'ah:imports',
      plugins: {
        perfectionist,
        // 'unused-imports': unusedImports,
      },
      rules: {
        'perfectionist/sort-imports': ['error', {
          groups: [
            'type',
            ['builtin', 'external'],
            'internal-type',
            'internal',
            ['parent-type', 'sibling-type', 'index-type'],
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
        }],
        'import/order': 'off',
        // 'unused-imports/no-unused-vars': 'warn',
      },
    },
    {
      name: 'ah:core',
      rules: {
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'max-len': 'off',
        'curly': ['error', 'all'],
        'guard-for-in': 'error',

        '@stylistic/comma-dangle': ['error', 'always-multiline'],
        '@stylistic/eol-last': ['error', 'always'],
        '@stylistic/key-spacing': ['error', {beforeColon: false}],
        '@stylistic/no-tabs': 'error',
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/function-call-spacing': ['error', 'never'],
        '@stylistic/padding-line-between-statements': ['error', {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        }],
        '@stylistic/object-curly-spacing': ['error', 'never'],
        '@stylistic/block-spacing': ['error', 'never'],
        '@stylistic/brace-style': ['error', 'stroustrup'],
        '@stylistic/array-bracket-spacing': ['error', 'never'],
        '@stylistic/array-bracket-newline': ['error', 'consistent'],
        '@stylistic/array-element-newline': ['error', {
          ArrayExpression: 'consistent',
          ArrayPattern: {minItems: 3},
        }],
        '@stylistic/object-curly-newline': ['error', {
          consistent: true,
        }],
      },
    },
  )
