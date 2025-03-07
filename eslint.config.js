import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Keeps browser globals for React
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    // 🔹 Add a separate ESLint config for Electron main process files
    files: ['main.js', 'preload.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // Enables require, __dirname, process, etc.
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script', // Use 'script' mode for CommonJS modules
      },
    },
    rules: {
      // You can customize Node.js rules here if needed
    },
  },
]
