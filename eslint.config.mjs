import js from '@eslint/js'
import json from '@eslint/json'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  stylistic.configs.customize(),
  perfectionist.configs['recommended-natural'],
  { extends: ['js/recommended'], files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js } },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  { extends: ['json/recommended'], files: ['**/*.json'], language: 'json/json', plugins: { json } },
])
