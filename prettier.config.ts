import type { Config } from 'prettier';

const config: Config = {
  overrides: [{ files: '.nvmrc', options: { parser: 'yaml' } }],
  plugins: [
    'prettier-plugin-curly',
    'prettier-plugin-packagejson',
    'prettier-plugin-padding-lines',
    'prettier-plugin-sentences-per-line',
    'prettier-plugin-sh',
  ],
  singleQuote: true,
};

export default config;
