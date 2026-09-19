import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  entry: ['src/**/*.test.*'],
  ignoreDependencies: [
    'all-contributors-cli',
    'cspell-populate-words',
    'remove-dependencies',
    'trash-cli',
  ],
  ignoreExportsUsedInFile: { interface: true, type: true },
  project: ['src/**/*.ts'],
  treatConfigHintsAsErrors: true,
};

export default config;
