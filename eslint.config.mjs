import pluginNext from '@next/eslint-plugin-next'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import jsx_a11y from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    ignores: [
      '.github/**',
      '.next/**',
      'node_modules/**',
      'public/**',
      'src/fonts/**',
      'src/images/**',
      'src/styles/**',
      './*.*',
      '*.config.mjs',
      'coverage/**',
    ],
  },

  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
      },
    },
    settings: {
      react: {
        version: '19.1.0', // Match the version in your package.json
      },
    },
    plugins: {
      '@next/next': pluginNext,
      '@typescript-eslint': typescript,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsx_a11y,
      prettier: prettierPlugin,
    },

    rules: {
      ...pluginNext.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,

      // TypeScript rules
      ...typescript.configs.recommended.rules,
      ...typescript.configs.strict.rules,

      // React rules
      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',

      // React Hooks rules
      ...reactHooksPlugin.configs.recommended.rules,

      // Accessibility rules
      ...jsx_a11y.configs.recommended.rules,
      ...jsx_a11y.configs.strict.rules,
    },
  },
]
