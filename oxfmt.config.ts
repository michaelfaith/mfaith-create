import { defineConfig, type OxfmtConfig } from 'oxfmt';

const config: OxfmtConfig = defineConfig({
  ignorePatterns: [
    '/.all-contributorsrc',
    '/CHANGELOG.md',
    '/coverage',
    '/dist',
    '/pnpm-lock.yaml',
  ],
  overrides: [{ files: ['.nvmrc'], options: { parser: 'yaml' } }],
  printWidth: 80,
  singleQuote: true,
  sortImports: true,
  sortPackageJson: false,
});

export default config;
